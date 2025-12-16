const { WebSocketServer } = require('ws');
const { chatStreamManager } = require('./chatStreamManager');

const setupChatSocket = (server) => {
  const wss = new WebSocketServer({ server, path: '/ws/chat' });

  wss.on('connection', (ws) => {
    const clientId = chatStreamManager.registerClient(ws);
    ws.send(JSON.stringify({ type: 'ready', clientId }));
  });

  return wss;
};

module.exports = {
  setupChatSocket
};
