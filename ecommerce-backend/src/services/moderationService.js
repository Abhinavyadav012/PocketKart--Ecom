const { openai } = require('./openAIClient');

const checkModeration = async (input) => {
  if (!process.env.OPENAI_MODERATION_MODEL) {
    return { flagged: false };
  }

  const response = await openai.moderations.create({
    model: process.env.OPENAI_MODERATION_MODEL,
    input
  });

  const result = response.results?.[0];
  return {
    flagged: Boolean(result?.flagged),
    categories: result?.categories || {}
  };
};

module.exports = {
  checkModeration
};
