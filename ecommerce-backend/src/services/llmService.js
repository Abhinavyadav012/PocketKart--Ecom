const { openai } = require('./openAIClient');
const { BASE_ASSISTANT_PROMPT } = require('../utils/systemPrompts');
const { chatStreamManager } = require('../utils/chatStreamManager');

const buildMessages = ({ systemPrompt = BASE_ASSISTANT_PROMPT, contextMessages = [], userMessage }) => {
  return [
    { role: 'system', content: systemPrompt },
    ...contextMessages,
    { role: 'user', content: userMessage }
  ];
};

const embedTexts = async (texts = []) => {
  if (!texts.length) return [];
  const response = await openai.embeddings.create({
    model: process.env.OPENAI_EMBEDDING_MODEL,
    input: texts
  });
  return response.data.map((item) => item.embedding);
};

const generateResponse = async ({
  userMessage,
  contextMessages,
  systemPrompt,
  temperature = 0.3
}) => {
  const response = await openai.responses.create({
    model: process.env.OPENAI_CHAT_MODEL,
    temperature,
    input: buildMessages({ systemPrompt, contextMessages, userMessage })
  });

  const message = response.output_text || '';
  return {
    message,
    raw: response
  };
};

const streamResponse = async ({
  userMessage,
  contextMessages,
  systemPrompt,
  streamId,
  temperature = 0.3,
  onComplete
}) => {
  const stream = await openai.responses.stream({
    model: process.env.OPENAI_CHAT_MODEL,
    temperature,
    input: buildMessages({ systemPrompt, contextMessages, userMessage })
  });

  stream.on('text.delta', (delta) => {
    chatStreamManager.sendChunk(streamId, delta);
  });

  stream.on('text.completed', (completion) => {
    chatStreamManager.sendCompletion(streamId, { message: completion });
    if (typeof onComplete === 'function') {
      onComplete(completion);
    }
  });

  stream.on('error', (error) => {
    chatStreamManager.sendError(streamId, error.message || 'Stream error');
  });

  await stream.finalMessage();
};

module.exports = {
  embedTexts,
  generateResponse,
  streamResponse
};
