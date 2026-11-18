const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      sparse: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'Forensic Investigator',
    },
    badgeNumber: {
      type: String,
      default: () => 'FS-' + Math.floor(1000 + Math.random() * 9000),
    },
    organization: {
      type: String,
      default: 'Forensic Science Division',
    },
    quizStats: {
      testsCompleted: { type: Number, default: 0 },
      totalQuestionsAnswered: { type: Number, default: 0 },
      correctAnswers: { type: Number, default: 0 },
      highestPercentage: { type: Number, default: 0 },
      lastTestedAt: { type: Date },
    },
    savedCases: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
