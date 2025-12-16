const { v4: uuidv4 } = require('uuid');
const Conversation = require('../models/Conversation');
const Escalation = require('../models/Escalation');
const { detectIntent } = require('./intentService');
const { checkModeration } = require('./moderationService');
const { generateResponse, streamResponse } = require('./llmService');
const { ingestDocuments, queryKnowledgeBase } = require('./ragService');
const memoryService = require('./memoryService');
const featureSwitchService = require('./featureSwitchService');
const { extractPdf } = require('../utils/pdfProcessor');
const { webSearch } = require('../utils/webSearch');
const { chatStreamManager } = require('../utils/chatStreamManager');

const DEFAULT_FEATURE_FLAGS = {
  rag: true,
  webSearch: true,
  memory: true
};

const buildSessionId = (sessionId) => sessionId || uuidv4();

const runModerationGuardrail = async (message) => {
  const moderation = await checkModeration(message);
  if (moderation.flagged) {
    return {
      blocked: true,
      reply:
        'I want to keep you safe, so I cannot help with that request. I can connect you with a human teammate if you need further assistance.'
    };
  }
  return { blocked: false };
};

const mockOrderStatusLookup = async ({ user, message }) => {
  const ticket = `ORD-${Math.floor(Math.random() * 900000) + 100000}`;
  return {
    status: 'in_transit',
    eta: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    carrier: 'PocketKart Logistics',
    orderId: ticket,
    instructions:
      'You can follow real-time updates from the Orders page. I have also enabled notifications for delivery day.'
  };
};

const buildCitations = (matches = []) => {
  return matches
    .filter((match) => match.score >= 0.15)
    .map((match) => ({
      title: match.title || match.metadata?.title || match.id,
      url: match.url || match.metadata?.url,
      score: match.score
    }));
};

const buildContextMessages = async ({ sessionId, userId, enableMemory }) => {
  const shortTerm = await memoryService.getShortTermContext(sessionId);
  const context = [...shortTerm];

  if (enableMemory && userId) {
    const memory = await memoryService.getUserMemory(userId);
    if (memory?.summary) {
      context.unshift({ role: 'system', content: `User profile: ${memory.summary}` });
    }
  }

  return context;
};

const assembleAnswer = async ({
  intent,
  message,
  sessionId,
  user,
  enableRag,
  enableWebSearch,
  enableMemory,
  streaming,
  streamId
}) => {
  let citations = [];
  let contextMessages = await buildContextMessages({
    sessionId,
    userId: user?.id,
    enableMemory
  });

  if (intent === 'smalltalk') {
    contextMessages.unshift({
      role: 'system',
      content: 'The user is chatting casually. Respond cheerfully and keep answers short.'
    });
  }

  if (enableRag && ['product_info', 'faq'].includes(intent)) {
    const matches = await queryKnowledgeBase({ query: message, topK: 4 });
    citations = buildCitations(matches);
    const ragContext = matches
      .map((match, index) => `Source ${index + 1}: ${match.chunk}`)
      .join('\n');
    if (ragContext) {
      contextMessages.push({
        role: 'system',
        content: `Use the following knowledge snippets when answering:\n${ragContext}`
      });
    }
  }

  if (enableWebSearch && intent === 'unknown' && /latest|today|current|202[5-9]/i.test(message)) {
    const webResults = await webSearch(message);
    if (webResults?.length) {
      const searchContext = webResults
        .map((result, index) => `Web ${index + 1}: ${result.title}\n${result.snippet}`)
        .join('\n');
      contextMessages.push({
        role: 'system',
        content: `Fresh web results available:\n${searchContext}`
      });
      citations = citations.concat(
        webResults.map((item) => ({ title: item.title, url: item.url, score: item.score || 0.5 }))
      );
    }
  }

  if (intent === 'order_status') {
    const order = await mockOrderStatusLookup({ user, message });
    return {
      reply: `Here is what I found about your order ${order.orderId}:
- Status: **${order.status.replace('_', ' ')}**
- Estimated delivery: ${new Date(order.eta).toLocaleDateString()}
- Carrier: ${order.carrier}

${order.instructions}\nIf you need any changes, I can escalate this to a teammate.`,
      citations,
      intent
    };
  }

  if (streaming) {
    await streamResponse({
      userMessage: message,
      contextMessages,
      streamId,
      onComplete: async (finalText) => {
        await memoryService.appendMessages(sessionId, [
          { sender: 'bot', text: finalText, intent, sources: citations }
        ]);
      }
    });
    return { intent, citations };
  }

  const completion = await generateResponse({
    userMessage: message,
    contextMessages
  });

  return {
    reply: completion.message,
    citations,
    intent
  };
};

const handleChatMessage = async ({
  message,
  sessionId,
  user,
  enableRag,
  enableWebSearch,
  enableMemory,
  streaming,
  clientId
}) => {
  const finalSession = buildSessionId(sessionId);
  const featureFlags = {
    ...DEFAULT_FEATURE_FLAGS,
    ...featureSwitchService.getFeatureFlags(),
    rag: enableRag ?? featureSwitchService.getFeatureFlags().rag,
    webSearch: enableWebSearch ?? featureSwitchService.getFeatureFlags().webSearch,
    memory: enableMemory ?? featureSwitchService.getFeatureFlags().memory
  };

  await memoryService.getOrCreateConversation(finalSession, user, featureFlags);

  const moderation = await runModerationGuardrail(message);
  if (moderation.blocked) {
    const botMessage = {
      sender: 'bot',
      text: moderation.reply,
      type: 'moderation'
    };
    await memoryService.appendMessages(finalSession, [
      { sender: 'user', text: message },
      botMessage
    ]);

    return {
      sessionId: finalSession,
      reply: moderation.reply,
      intent: 'blocked',
      citations: []
    };
  }

  const intent = detectIntent(message);

  if (streaming) {
    if (!clientId) {
      throw new Error('clientId is required for streaming sessions');
    }

    const streamId = chatStreamManager.registerStream(clientId);
    await memoryService.appendMessages(finalSession, [{ sender: 'user', text: message, intent }]);

    await assembleAnswer({
      intent,
      message,
      sessionId: finalSession,
      user,
      enableRag: featureFlags.rag,
      enableWebSearch: featureFlags.webSearch,
      enableMemory: featureFlags.memory,
      streaming: true,
      streamId
    });

    return {
      sessionId: finalSession,
      streamId,
      intent,
      citations: []
    };
  }

  const answer = await assembleAnswer({
    intent,
    message,
    sessionId: finalSession,
    user,
    enableRag: featureFlags.rag,
    enableWebSearch: featureFlags.webSearch,
    enableMemory: featureFlags.memory,
    streaming: false
  });

  const messagesToStore = [
    { sender: 'user', text: message, intent },
    { sender: 'bot', text: answer.reply, intent, sources: answer.citations }
  ];

  await memoryService.appendMessages(finalSession, messagesToStore);

  if (featureFlags.memory && user?.id) {
    await memoryService.updateUserMemory({
      userId: user.id,
      conversationHistory: messagesToStore
    });
  }

  return {
    sessionId: finalSession,
    ...answer
  };
};

const processUpload = async ({ fileBuffer, originalName, mimeType, sessionId, userId }) => {
  if (!/pdf$/i.test(mimeType)) {
    throw new Error('Only PDF files are supported currently');
  }

  const chunks = await extractPdf(fileBuffer);

  const documentId = uuidv4();
  await ingestDocuments({
    chunks,
    metadata: {
      documentId,
      title: originalName,
      type: 'user_upload',
      sessionId,
      userId
    }
  });

  return {
    documentId,
    chunks: chunks.length
  };
};

const searchKnowledgeBase = async ({ query, topK }) => {
  const results = await queryKnowledgeBase({ query, topK });
  return {
    query,
    results
  };
};

const createEscalation = async ({ sessionId, reason, metadata }) => {
  const conversation = await Conversation.findOne({ sessionId });
  const escalation = await Escalation.create({
    sessionId,
    reason,
    metadata,
    conversationSnapshot: conversation
  });

  if (conversation) {
    conversation.status = 'escalated';
    await conversation.save();
  }

  return escalation;
};

const listConversations = async () => {
  return Conversation.find().sort({ updatedAt: -1 }).limit(100);
};

const getConversation = async (sessionId) => {
  return Conversation.findOne({ sessionId });
};

const listEscalations = async () => {
  return Escalation.find().sort({ createdAt: -1 }).limit(100);
};

module.exports = {
  handleChatMessage,
  processUpload,
  searchKnowledgeBase,
  createEscalation,
  listConversations,
  getConversation,
  listEscalations
};
