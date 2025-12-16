import { useEffect, useMemo, useRef, useState } from 'react';
import apiClient, { getWebsocketUrl } from '../../utils/apiClient';

const QUICK_REPLIES = [
  { label: 'Track my order', value: 'Where is my order?' },
  { label: 'Return policy', value: 'What is the return policy?' },
  { label: 'Shipping time', value: 'How long does shipping take?' },
  { label: 'Talk to support', value: 'I need to talk to a human.' }
];

const INITIAL_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hi there! I am PocketBot, your AI shopping assistant. Ask me anything or upload a file for help.',
  streaming: false,
  sources: []
};

const defaultFeatureFlags = {
  rag: true,
  webSearch: true,
  memory: true
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(() =>
    window.localStorage.getItem('pocketbot:session') || crypto.randomUUID()
  );
  const [featureFlags, setFeatureFlags] = useState(defaultFeatureFlags);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [error, setError] = useState('');
  const socketRef = useRef(null);
  const clientIdRef = useRef(null);
  const pendingStreamRef = useRef(new Map());
  const reconnectTimeout = useRef(null);

  useEffect(() => {
    window.localStorage.setItem('pocketbot:session', sessionId);
  }, [sessionId]);

  const connectSocket = () => {
    const ws = new WebSocket(getWebsocketUrl());
    socketRef.current = ws;

    ws.onopen = () => {
      setError('');
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'ready') {
          clientIdRef.current = payload.clientId;
        }
        if (payload.type === 'chunk') {
          const messageId = pendingStreamRef.current.get(payload.streamId);
          if (!messageId) return;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    text: `${msg.text || ''}${payload.chunk}`,
                    streaming: true
                  }
                : msg
            )
          );
        }
        if (payload.type === 'completed') {
          const messageId = pendingStreamRef.current.get(payload.streamId);
          if (!messageId) return;
          pendingStreamRef.current.delete(payload.streamId);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === messageId
                ? {
                    ...msg,
                    text: payload.payload?.message || msg.text,
                    streaming: false
                  }
                : msg
            )
          );
        }
        if (payload.type === 'error') {
          const messageId = pendingStreamRef.current.get(payload.streamId);
          pendingStreamRef.current.delete(payload.streamId);
          if (messageId) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === messageId
                  ? {
                      ...msg,
                      text: 'Something went wrong. Let me connect you with a teammate.',
                      streaming: false
                    }
                  : msg
              )
            );
          }
        }
      } catch (err) {
        console.error('Failed to parse websocket message', err);
      }
    };

    ws.onclose = () => {
      clientIdRef.current = null;
      if (reconnectTimeout.current) return;
      reconnectTimeout.current = setTimeout(() => {
        reconnectTimeout.current = null;
        connectSocket();
      }, 1500);
    };
  };

  useEffect(() => {
    connectSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, []);

  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: trimmed,
      createdAt: Date.now()
    };
    const assistantPlaceholder = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: '',
      streaming: true,
      sources: [],
      createdAt: Date.now()
    };

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
    setInput('');
    setError('');

    try {
      if (clientIdRef.current) {
        const { data } = await apiClient.post('/api/chat/stream', {
          message: trimmed,
          sessionId,
          clientId: clientIdRef.current,
          user: { id: sessionId },
          enableRag: featureFlags.rag,
          enableWebSearch: featureFlags.webSearch,
          enableMemory: featureFlags.memory
        });

        setSessionId(data.sessionId);
        pendingStreamRef.current.set(data.streamId, assistantPlaceholder.id);
        if (data.citations?.length) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantPlaceholder.id ? { ...msg, sources: data.citations } : msg
            )
          );
        }
      } else {
        // Fallback to non-streaming
        const { data } = await apiClient.post('/api/chat', {
          message: trimmed,
          sessionId,
          user: { id: sessionId },
          enableRag: featureFlags.rag,
          enableWebSearch: featureFlags.webSearch,
          enableMemory: featureFlags.memory
        });
        setSessionId(data.sessionId);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantPlaceholder.id
              ? {
                  ...msg,
                  text: data.reply,
                  streaming: false,
                  sources: data.citations || []
                }
              : msg
          )
        );
      }
    } catch (err) {
      console.error('Chat error', err);
      setError('Something went wrong. Please try again or escalate.');
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholder.id
            ? {
                ...msg,
                text: 'I hit a snag and could not finish that. Want me to try again or connect you with a human?',
                streaming: false
              }
            : msg
        )
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend(input);
  };

  const handleQuickReply = (value) => {
    handleSend(value);
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadMessage('Uploading document...');
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('sessionId', sessionId);
    formData.append('userId', sessionId);

    try {
      const { data } = await apiClient.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadMessage(`Embedded ${data.chunks} knowledge snippets from ${file.name}.`);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: `I have learned from **${file.name}**. Ask me anything about it!`,
          streaming: false,
          sources: []
        }
      ]);
    } catch (err) {
      console.error('Upload failed', err);
      setError('Upload failed. Please ensure the file is a PDF and try again.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadMessage(''), 4000);
    }
  };

  const toggleFeature = (key) => {
    setFeatureFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const typingSkeleton = useMemo(
    () => (
      <div
        style={{
          alignSelf: 'flex-start',
          background: 'var(--card-bg)',
          color: 'var(--muted-text)',
          borderRadius: '16px 16px 16px 4px',
          padding: '10px 14px',
          border: '1px solid var(--border-color)',
          fontSize: '14px'
        }}
      >
        PocketBot is typing...
      </div>
    ),
    []
  );

  const isStreaming = messages.some((msg) => msg.streaming);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {isOpen && (
        <div
          style={{
            width: '360px',
            maxHeight: '560px',
            background: 'var(--card-bg)',
            color: 'var(--card-text)',
            borderRadius: '24px',
            boxShadow: '0 24px 65px rgba(15,23,42,0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid var(--border-color)'
          }}
        >
          <header
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff',
              padding: '18px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}
              >
                🤖
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>PocketBot</p>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.85 }}>Always-on shopping assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '16px'
              }}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </header>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              padding: '12px 20px',
              borderBottom: '1px solid var(--border-color)',
              background: 'var(--bg-color)'
            }}
          >
            {Object.entries(featureFlags).map(([key, value]) => (
              <button
                key={key}
                onClick={() => toggleFeature(key)}
                style={{
                  border: value ? '1px solid rgba(102,126,234,0.4)' : '1px solid var(--border-color)',
                  background: value ? 'rgba(102,126,234,0.12)' : 'var(--card-bg)',
                  color: 'var(--card-text)',
                  borderRadius: '16px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                  cursor: 'pointer'
                }}
              >
                {key}
              </button>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              padding: '18px 20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              background: 'var(--bg-color)'
            }}
          >
            {messages.map((message) => (
              <div key={message.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div
                  style={{
                    alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '88%',
                    background:
                      message.role === 'user'
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'var(--card-bg)',
                    color: message.role === 'user' ? '#ffffff' : 'var(--card-text)',
                    padding: '12px 16px',
                    borderRadius:
                      message.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    boxShadow: '0 12px 30px rgba(15,23,42,0.15)',
                    border: message.role === 'user' ? 'none' : '1px solid var(--border-color)',
                    fontSize: '14px',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {message.text || '...'}
                </div>
                {message.sources?.length > 0 && (
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      background: 'var(--card-bg)',
                      borderRadius: '12px',
                      padding: '8px 10px',
                      border: '1px dashed var(--border-color)',
                      fontSize: '12px',
                      color: 'var(--muted-text)'
                    }}
                  >
                    Sources: {message.sources.map((source) => source.title || source.url).join(', ')}
                  </div>
                )}
              </div>
            ))}
            {isStreaming && typingSkeleton}
          </div>

          <div
            style={{
              padding: '14px 20px',
              borderTop: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply.value}
                  onClick={() => handleQuickReply(reply.value)}
                  style={{
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-color)',
                    color: 'var(--card-text)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {reply.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => document.getElementById('chatbot-file-input')?.click()}
                style={{
                  border: '1px dashed var(--border-color)',
                  background: 'var(--bg-color)',
                  color: 'var(--muted-text)',
                  borderRadius: '12px',
                  width: '44px',
                  height: '44px',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                📎
              </button>
              <input
                id="chatbot-file-input"
                type="file"
                accept="application/pdf"
                style={{ display: 'none' }}
                onChange={handleUpload}
              />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                style={{
                  flex: 1,
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)',
                  padding: '12px 14px',
                  fontSize: '14px',
                  background: 'var(--bg-color)',
                  color: 'var(--card-text)'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '0 20px',
                  borderRadius: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </form>

            {(isUploading || uploadMessage) && (
              <p style={{ fontSize: '12px', color: 'var(--muted-text)' }}>
                {isUploading ? 'Processing file...' : uploadMessage}
              </p>
            )}
            {error && <p style={{ fontSize: '12px', color: '#ef4444' }}>{error}</p>}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff',
          fontSize: '30px',
          boxShadow: '0 18px 38px rgba(102, 126, 234, 0.45)',
          cursor: 'pointer'
        }}
        aria-label="Open chat support"
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;
