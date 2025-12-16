import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL,
  withCredentials: false
});

export const getWebsocketUrl = () => {
  const url = new URL(baseURL);
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  url.pathname = '/ws/chat';
  return url.toString();
};

export const chatbotApi = {
  sendMessage: (payload, config) => apiClient.post('/api/chat', payload, config),
  sendMessageStream: (payload, config) => apiClient.post('/api/chat/stream', payload, config),
  upload: (formData, config) =>
    apiClient.post('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      ...(config || {})
    }),
  ragQuery: (payload, config) => apiClient.post('/api/rag-query', payload, config),
  escalate: (payload, config) => apiClient.post('/api/escalate', payload, config),
  getConversations: (config) => apiClient.get('/api/conversations', config),
  getConversation: (sessionId, config) => apiClient.get(`/api/conversations/${sessionId}`, config),
  getEscalations: (config) => apiClient.get('/api/escalations', config),
  getFeatures: (config) => apiClient.get('/api/features', config),
  updateFeatures: (payload, config) => apiClient.patch('/api/features', payload, config)
};

export default apiClient;
