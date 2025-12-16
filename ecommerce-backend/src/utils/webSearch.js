const fetch = require('node-fetch');

const webSearch = async (query) => {
  if (!process.env.WEB_SEARCH_API_URL || !process.env.WEB_SEARCH_API_KEY) {
    return [];
  }

  const response = await fetch(process.env.WEB_SEARCH_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.WEB_SEARCH_API_KEY}`
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error(`Web search failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results || [];
};

module.exports = {
  webSearch
};
