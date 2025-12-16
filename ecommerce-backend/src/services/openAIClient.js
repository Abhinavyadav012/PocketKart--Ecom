const OpenAI = require('openai');

const OPENAI_KEY = process.env.OPENAI_API_KEY || '';

if (!OPENAI_KEY) {
  console.warn('⚠️ OPENAI_API_KEY not set. Chatbot features will be limited.');
}

let openai = null;

if (OPENAI_KEY) {
  openai = new OpenAI({
    apiKey: OPENAI_KEY
  });
}

module.exports = {
  openai,
  isConfigured: Boolean(OPENAI_KEY)
};
