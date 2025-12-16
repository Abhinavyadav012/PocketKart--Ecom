const { v4: uuidv4 } = require('uuid');
class ChatStreamManager {
  constructor() {
    this.clients = new Map();
    this.streams = new Map();
  }
  registerClient(ws) {
    const clientId = uuidv4();
    this.clients.set(clientId, ws);
    ws.on('close', () => {
      this.clients.delete(clientId);
    });
    return clientId;
  }
  registerStream(clientId) {
    const streamId = uuidv4();
    this.streams.set(streamId, { clientId, createdAt: Date.now() });
    return streamId;
  }
  sendChunk(streamId, chunk) {
    const stream = this.streams.get(streamId);
    if (!stream) return;
    const ws = this.clients.get(stream.clientId);
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: 'chunk', streamId, chunk }));
    }
  }
  sendCompletion(streamId, payload) {
    const stream = this.streams.get(streamId);
    if (!stream) return;
    const ws = this.clients.get(stream.clientId);
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: 'completed', streamId, payload }));
    }
    this.streams.delete(streamId);
  }
  sendError(streamId, error) {
    const stream = this.streams.get(streamId);
    if (!stream) return;
    const ws = this.clients.get(stream.clientId);
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: 'error', streamId, error }));
    }
    this.streams.delete(streamId);
  }
}
const manager = new ChatStreamManager();
module.exports = {
  chatStreamManager: manager
};
