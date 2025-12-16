const mongoose = require('mongoose');

const UserMemorySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    summary: { type: String },
    traits: [String],
    preferences: { type: mongoose.Schema.Types.Mixed },
    vectorId: { type: String },
    lastUpdatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserMemory', UserMemorySchema);
