const Conversation = require('../models/Conversation');
const UserMemory = require('../models/UserMemory');
const { getVectorClient } = require('../utils/vectorClient');
const { embedTexts, generateResponse } = require('./llmService');
const { MEMORY_SUMMARY_PROMPT } = require('../utils/systemPrompts');

const SHORT_TERM_LIMIT = 10;

const getOrCreateConversation = async (sessionId, user, featureFlags = {}) => {
  const existing = await Conversation.findOne({ sessionId });
  if (existing) {
    const updated = { ...existing.featureFlags.toObject(), ...featureFlags };
    existing.featureFlags = updated;
    if (user) {
      existing.user = { ...existing.user, ...user };
    }
    await existing.save();
    return existing;
  }

  const conversation = await Conversation.create({
    sessionId,
    user,
    featureFlags
  });
  return conversation;
};

const appendMessages = async (sessionId, messages = []) => {
  if (!messages.length) return;
  await Conversation.updateOne(
    { sessionId },
    {
      $push: {
        messages: { $each: messages, $slice: -SHORT_TERM_LIMIT }
      },
      $set: { lastInteractedAt: new Date() }
    }
  );
};

const getShortTermContext = async (sessionId) => {
  const conversation = await Conversation.findOne({ sessionId });
  if (!conversation) return [];
  const recent = conversation.messages.slice(-SHORT_TERM_LIMIT);
  return recent.map((msg) => ({
    role: msg.sender === 'bot' ? 'assistant' : msg.sender,
    content: msg.text
  }));
};

const getUserMemory = async (userId) => {
  if (!userId) return null;
  return UserMemory.findOne({ userId });
};

const updateUserMemory = async ({ userId, conversationHistory }) => {
  if (!userId || !conversationHistory?.length) return null;

  const response = await generateResponse({
    userMessage: conversationHistory.map((item) => `${item.sender}: ${item.text}`).join('\n'),
    contextMessages: [],
    systemPrompt: MEMORY_SUMMARY_PROMPT,
    temperature: 0.2
  });

  const summary = response.message;
  const [embedding] = await embedTexts([summary]);
  const vectorClient = getVectorClient();
  const vectorId = `memory-${userId}`;
  await vectorClient.upsert({
    id: vectorId,
    values: embedding,
    metadata: {
      userId,
      summary,
      type: 'memory_summary'
    }
  });

  await UserMemory.findOneAndUpdate(
    { userId },
    {
      summary,
      vectorId,
      lastUpdatedAt: new Date()
    },
    { upsert: true, new: true }
  );

  return summary;
};

const deleteUserMemory = async (userId) => {
  if (!userId) return;
  const memory = await UserMemory.findOne({ userId });
  if (memory?.vectorId) {
    const vectorClient = getVectorClient();
    await vectorClient.delete({ id: memory.vectorId });
  }
  await UserMemory.deleteOne({ userId });
};

module.exports = {
  getOrCreateConversation,
  appendMessages,
  getShortTermContext,
  getUserMemory,
  updateUserMemory,
  deleteUserMemory
};
