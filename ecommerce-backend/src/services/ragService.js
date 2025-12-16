const { getVectorClient } = require('../utils/vectorClient');
const { embedTexts } = require('./llmService');

const vectorClient = getVectorClient();

const ingestDocuments = async ({ chunks, metadata }) => {
  if (!chunks?.length) return [];
  const embeddings = await embedTexts(chunks);
  const records = await Promise.all(
    embeddings.map((values, index) =>
      vectorClient.upsert({
        id: `${metadata.documentId}-${index}`,
        values,
        metadata: {
          ...metadata,
          chunk: chunks[index]
        }
      })
    )
  );
  return records;
};

const queryKnowledgeBase = async ({ query, topK = 4 }) => {
  const [embedding] = await embedTexts([query]);
  const results = await vectorClient.query({ vector: embedding, topK });
  return results.map((match) => ({
    id: match.id,
    score: match.score,
    chunk: match.metadata?.chunk,
    title: match.metadata?.title,
    url: match.metadata?.url,
    type: match.metadata?.type || 'document'
  }));
};

module.exports = {
  ingestDocuments,
  queryKnowledgeBase
};
