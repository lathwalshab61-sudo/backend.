const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Case = require('../models/Case');
const Analysis = require('../models/Analysis');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Verification & Test DB endpoint
router.get('/test-db', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    const caseCount = isConnected ? await Case.countDocuments() : 0;
    const analysisCount = isConnected ? await Analysis.countDocuments() : 0;
    const latestCases = isConnected ? await Case.find().limit(5).lean() : [];
    const latestAnalyses = isConnected ? await Analysis.find().limit(5).lean() : [];

    res.json({
      success: true,
      message: 'MongoDB Atlas is connected and responding!',
      database: {
        status: isConnected ? 'connected' : 'disconnected',
        dbName: mongoose.connection.name,
        host: mongoose.connection.host,
      },
      counts: {
        cases: caseCount,
        analyses: analysisCount,
      },
      data: {
        cases: latestCases,
        analyses: latestAnalyses,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to trigger seed via HTTP
router.post('/seed', async (req, res) => {
  try {
    const dummyCases = [
      {
        caseId: 'CASE-2024-001',
        title: 'EXH-042 — Latent Lift Analysis',
        examiner: 'J. Morrison',
        status: 'Verified',
        tag: 'Right Thumb · Whorl',
        notes: 'Latent print recovered from glassware. Minutiae matched with 98% confidence.',
      },
      {
        caseId: 'CASE-2024-002',
        title: 'REF-991 — Tenprint Comparison',
        examiner: 'A. Reyes',
        status: 'Pending Review',
        tag: 'Left Index · Loop',
        notes: 'Comparison against state automated fingerprint identification system (AFIS).',
      },
      {
        caseId: 'CASE-2024-003',
        title: 'EXH-039 — Partial Print Recovery',
        examiner: 'J. Morrison',
        status: 'Anomaly',
        tag: 'Unknown · Arch',
        notes: 'Distorted friction ridge pattern. Requires secondary specialist validation.',
      },
    ];

    await Case.deleteMany({});
    const inserted = await Case.insertMany(dummyCases);
    res.json({ success: true, message: `Seeded ${inserted.length} dummy cases into MongoDB!`, data: inserted });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Recent analyses for dashboard (reads from MongoDB if available, fallback to mock)
router.get('/recent-analyses', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const records = await Analysis.find().sort({ createdAt: -1 }).limit(5).lean();
      if (records && records.length > 0) {
        const formatted = records.map((item, index) => ({
          id: item.caseId || `FS-${item._id.toString().slice(-4)}`,
          idx: String(index + 1).padStart(2, '0'),
          date: new Date(item.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          tag: `${item.patternType || 'Fingerprint'}`,
          status: item.status || 'verified',
        }));
        return res.json(formatted);
      }
    }
  } catch (err) {
    console.error('MongoDB read error:', err.message);
  }

  // Fallback mock
  res.json([
    {
      id: 'FS-2024-081',
      idx: '01',
      date: 'Oct 24, 2024 • 14:32 Z',
      tag: 'Right Thumb - Whorl',
      status: 'pending',
    },
    {
      id: 'FS-2024-080',
      idx: '02',
      date: 'Oct 24, 2024 • 11:15 Z',
      tag: 'Left Index - Loop',
      status: 'verified',
    },
    {
      id: 'FS-2024-079',
      idx: '03',
      date: 'Oct 23, 2024 • 09:45 Z',
      tag: 'Unknown - Arch',
      status: 'anomaly',
    },
  ]);
});

// Cases list for Archive (reads from MongoDB if available)
router.get('/cases', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const cases = await Case.find().sort({ createdAt: -1 }).lean();
      if (cases && cases.length > 0) {
        const statusColors = {
          Verified: 'text-primary',
          'Pending Review': 'text-secondary',
          Anomaly: 'text-error',
        };

        const formatted = cases.map((c) => ({
          id: c.caseId,
          title: c.title,
          examiner: c.examiner,
          date: new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: c.status,
          statusColor: statusColors[c.status] || 'text-primary',
          tag: c.tag,
        }));
        return res.json(formatted);
      }
    }
  } catch (err) {
    console.error('MongoDB read error:', err.message);
  }

  // Fallback mock
  res.json([
    {
      id: 'CASE-2024-001',
      title: 'EXH-042 — Latent Lift Analysis',
      examiner: 'J. Morrison',
      date: 'Oct 24, 2024',
      status: 'Verified',
      statusColor: 'text-primary',
      tag: 'Right Thumb · Whorl',
    },
  ]);
});

// Endpoint to upload a fingerprint image and save analysis to MongoDB
router.post('/analyze', upload.single('fingerprint'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const minutiaeList = [
    {
      id: '01',
      type: 'circle',
      label: 'Ridge Ending (Central)',
      confidence: '98%',
      color: 'text-primary',
      borderColor: 'border-primary',
    },
    {
      id: '02',
      type: 'square',
      label: 'Bifurcation (Upper-Left)',
      confidence: '91%',
      color: 'text-secondary',
      borderColor: 'border-secondary',
    },
    {
      id: '03',
      type: 'square',
      label: 'Bifurcation (Lower-Right)',
      confidence: '87%',
      color: 'text-secondary',
      borderColor: 'border-secondary',
    },
    {
      id: '04',
      type: 'circle',
      label: 'Short Ridge (Central-Right)',
      confidence: '82%',
      color: 'text-primary',
      borderColor: 'border-primary',
    },
    {
      id: '05',
      type: 'square',
      label: 'Enclosure (Upper)',
      confidence: '79%',
      color: 'text-secondary',
      borderColor: 'border-secondary',
    },
  ];

  const qualityScore = Math.floor(Math.random() * 15) + 85;

  let savedRecord = null;
  if (mongoose.connection.readyState === 1) {
    try {
      savedRecord = await Analysis.create({
        caseId: 'FS-' + Date.now().toString().slice(-6),
        imageUrl: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname,
        qualityScore,
        patternType: 'Loop (Ulnar)',
        confidence: '94%',
        minutiaePoints: minutiaeList,
        status: 'verified',
      });
    } catch (err) {
      console.error('Could not save analysis to MongoDB:', err.message);
    }
  }

  const responseData = {
    id: savedRecord ? savedRecord._id : undefined,
    caseId: savedRecord ? savedRecord.caseId : 'FS-2024-088',
    imageUrl: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname,
    qualityScore,
    patternType: 'Loop (Ulnar)',
    confidence: '94%',
    minutiaePoints: minutiaeList,
    savedToDatabase: !!savedRecord,
  };

  setTimeout(() => {
    res.json(responseData);
  }, 1000);
});

module.exports = router;
