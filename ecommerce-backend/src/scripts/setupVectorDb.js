const path = require('path');
const dotenv = require('dotenv');
const { getVectorClient } = require('../utils/vectorClient');

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

(async () => {
  try {
    const client = getVectorClient();
    if (client.provider === 'pinecone') {
      console.log('✅ Pinecone client initialized. Ensure the index exists in your dashboard.');
    } else {
      console.log('✅ Local vector store ready at storage/vector-store.json');
    }
  } catch (error) {
    console.error('❌ Failed to initialize vector DB:', error.message);
    process.exit(1);
  }
})();
