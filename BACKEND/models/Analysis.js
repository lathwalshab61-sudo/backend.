const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema(
  {
    caseId: {
      type: String,
      default: () => 'FS-' + Date.now().toString().slice(-6),
    },
    imageUrl: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
    },
    qualityScore: {
      type: Number,
      default: 85,
    },
    patternType: {
      type: String,
      default: 'Loop (Ulnar)',
    },
    confidence: {
      type: String,
      default: '94%',
    },
    minutiaePoints: [
      {
        id: String,
        type: { type: String },
        label: String,
        confidence: String,
        color: String,
        borderColor: String,
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'verified', 'anomaly'],
      default: 'verified',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Analysis', AnalysisSchema);
