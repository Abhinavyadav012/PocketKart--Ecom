const fs = require('fs');
const path = require('path');
const { Pinecone } = require('@pinecone-database/pinecone');

const MEMORY_FILE = path.join(__dirname, '..', '..', 'storage', 'vector-store.json');

const ensureLocalStore = () => {
  if (!fs.existsSync(path.dirname(MEMORY_FILE))) {
    fs.mkdirSync(path.dirname(MEMORY_FILE), { recursive: true });
  }
  if (!fs.existsSync(MEMORY_FILE)) {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify({ vectors: [] }, null, 2));
  }
};

const loadLocalStore = () => {
  ensureLocalStore();
  return JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf-8'));
};

const saveLocalStore = (data) => {
  ensureLocalStore();
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2));
};

class VectorClient {
  constructor() {
    this.provider = process.env.VECTOR_DB_PROVIDER || 'local';
    this.namespace = process.env.VECTOR_DB_NAMESPACE || 'pocketkart';

    if (this.provider === 'pinecone') {
      if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX) {
        throw new Error('Pinecone configuration missing. Set PINECONE_API_KEY and PINECONE_INDEX.');
      }
      this.pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
      this.index = this.pinecone.Index(process.env.PINECONE_INDEX);
    }
  }

  async upsert({ id, values, metadata }) {
    if (this.provider === 'pinecone') {
      await this.index.upsert([{ id, values, metadata }], { namespace: this.namespace });
      return { id };
    }

    const store = loadLocalStore();
    const existingIndex = store.vectors.findIndex((vector) => vector.id === id);
    if (existingIndex >= 0) {
      store.vectors[existingIndex] = { id, values, metadata };
    } else {
      store.vectors.push({ id, values, metadata });
    }
    saveLocalStore(store);
    return { id };
  }

  async query({ vector, topK = 5, filter = {} }) {
    if (this.provider === 'pinecone') {
      const response = await this.index.query(
        {
          vector,
          topK,
          filter,
          includeMetadata: true
        },
        { namespace: this.namespace }
      );
      return response.matches || [];
    }

    const store = loadLocalStore();
    const results = store.vectors
      .map((item) => ({
        ...item,
        score: this.#cosineSimilarity(vector, item.values)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return results.map(({ id, metadata, score }) => ({ id, metadata, score }));
  }

  async delete({ id }) {
    if (this.provider === 'pinecone') {
      await this.index.deleteMany({ ids: [id] }, { namespace: this.namespace });
      return;
    }

    const store = loadLocalStore();
    store.vectors = store.vectors.filter((vector) => vector.id !== id);
    saveLocalStore(store);
  }

  #cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, value, index) => sum + value * (b[index] || 0), 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
    if (!magnitudeA || !magnitudeB) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }
}

let client;

const getVectorClient = () => {
  if (!client) {
    client = new VectorClient();
  }
  return client;
};

module.exports = {
  getVectorClient
};
