const mongoose = require('mongoose');

const SourceSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    score: Number
  },
  { _id: false }
);

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ['user', 'bot', 'system'], required: true },
    text: { type: String, required: true },
    type: { type: String, default: 'message' },
    intent: { type: String },
    sources: [SourceSchema],
    meta: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const ConversationSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    user: {
      id: { type: String },
      email: { type: String },
      name: { type: String }
    },
    featureFlags: {
      rag: { type: Boolean, default: true },
      webSearch: { type: Boolean, default: true },
      memory: { type: Boolean, default: true }
    },
    messages: [MessageSchema],
    status: { type: String, enum: ['open', 'escalated', 'closed'], default: 'open' },
    lastInteractedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
