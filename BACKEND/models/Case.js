const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema(
  {
    caseId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    examiner: {
      type: String,
      default: 'Unknown Examiner',
    },
    status: {
      type: String,
      enum: ['Verified', 'Pending Review', 'Anomaly'],
      default: 'Verified',
    },
    tag: {
      type: String,
      default: 'General Fingerprint',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Case', CaseSchema);
