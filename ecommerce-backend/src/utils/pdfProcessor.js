const pdfParse = require('pdf-parse');

const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 120;

const chunkText = (text) => {
  const sanitized = text.replace(/\s+/g, ' ').trim();
  const chunks = [];
  let start = 0;

  while (start < sanitized.length) {
    const end = Math.min(start + CHUNK_SIZE, sanitized.length);
    const chunk = sanitized.slice(start, end);
    chunks.push(chunk);
    start += CHUNK_SIZE - CHUNK_OVERLAP;
  }
  return chunks;
};

const extractPdf = async (buffer) => {
  const { text } = await pdfParse(buffer);
  return chunkText(text);
};

module.exports = {
  extractPdf
};
