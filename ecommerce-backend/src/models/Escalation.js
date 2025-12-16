const mongoose = require('mongoose');

const EscalationSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    reason: { type: String },
    status: { type: String, enum: ['pending', 'in_progress', 'resolved'], default: 'pending' },
    metadata: { type: mongoose.Schema.Types.Mixed },
    conversationSnapshot: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Escalation', EscalationSchema);
