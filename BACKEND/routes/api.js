const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Case = require('../models/Case');
const Analysis = require('../models/Analysis');

// Ensure uploads folder exists regardless of where process was spawned
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.png';
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|tiff|bmp/;
  const mimeMatch = allowedTypes.test(file.mimetype);
  const extMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeMatch || extMatch) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, WEBP, and TIFF images are permitted.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: fileFilter,
});

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
      message: isConnected ? 'MongoDB Atlas is connected and responding!' : 'MongoDB is running in offline fallback mode.',
      database: {
        status: isConnected ? 'connected' : 'disconnected',
        dbName: mongoose.connection.name || null,
        host: mongoose.connection.host || null,
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
      {
        caseId: 'CASE-2024-004',
        title: 'LAT-017 — Smudged Ridge Analysis',
        examiner: 'C. Park',
        status: 'Verified',
        tag: 'Right Middle · Loop',
        notes: 'Smudged latent print analyzed with contrast enhancement.',
      },
      {
        caseId: 'CASE-2023-099',
        title: 'CMP-088 — Cross-Reference Study',
        examiner: 'A. Reyes',
        status: 'Verified',
        tag: 'Comparative · Whorl/Loop',
        notes: 'Cross-reference benchmark study for tenprint comparison protocols.',
      },
    ];

    if (mongoose.connection.readyState === 1) {
      await Case.deleteMany({});
      const inserted = await Case.insertMany(dummyCases);
      return res.json({ success: true, message: `Seeded ${inserted.length} cases into MongoDB!`, data: inserted });
    }

    res.json({ success: true, message: 'Seeded in memory (MongoDB not connected).', data: dummyCases });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Recent analyses for dashboard (reads from MongoDB if available, fallback to mock)
router.get('/recent-analyses', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const records = await Analysis.find().sort({ createdAt: -1 }).limit(10).lean();
      if (records && records.length > 0) {
        const formatted = records.map((item, index) => ({
          id: item.caseId || `FS-${item._id.toString().slice(-4)}`,
          idx: String(index + 1).padStart(2, '0'),
          date: new Date(item.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          tag: `${item.patternType || 'Fingerprint'}`,
          status: item.status || 'verified',
          qualityScore: item.qualityScore,
          confidence: item.confidence,
          imageUrl: item.imageUrl,
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
      qualityScore: 92,
      confidence: '95%',
    },
    {
      id: 'FS-2024-080',
      idx: '02',
      date: 'Oct 24, 2024 • 11:15 Z',
      tag: 'Left Index - Loop',
      status: 'verified',
      qualityScore: 88,
      confidence: '94%',
    },
    {
      id: 'FS-2024-079',
      idx: '03',
      date: 'Oct 23, 2024 • 09:45 Z',
      tag: 'Unknown - Arch',
      status: 'anomaly',
      qualityScore: 74,
      confidence: '81%',
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
          notes: c.notes || '',
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
      notes: 'Latent print recovered from glassware. Minutiae matched with 98% confidence.',
    },
    {
      id: 'CASE-2024-002',
      title: 'REF-991 — Tenprint Comparison',
      examiner: 'A. Reyes',
      date: 'Oct 22, 2024',
      status: 'Pending Review',
      statusColor: 'text-secondary',
      tag: 'Left Index · Loop',
      notes: 'Comparison against state automated fingerprint identification system (AFIS).',
    },
    {
      id: 'CASE-2024-003',
      title: 'EXH-039 — Partial Print Recovery',
      examiner: 'J. Morrison',
      date: 'Oct 19, 2024',
      status: 'Anomaly',
      statusColor: 'text-error',
      tag: 'Unknown · Arch',
      notes: 'Distorted friction ridge pattern. Requires secondary specialist validation.',
    },
    {
      id: 'CASE-2024-004',
      title: 'LAT-017 — Smudged Ridge Analysis',
      examiner: 'C. Park',
      date: 'Oct 15, 2024',
      status: 'Verified',
      statusColor: 'text-primary',
      tag: 'Right Middle · Loop',
      notes: 'Smudged latent print analyzed with contrast enhancement.',
    },
    {
      id: 'CASE-2023-099',
      title: 'CMP-088 — Cross-Reference Study',
      examiner: 'A. Reyes',
      date: 'Dec 01, 2023',
      status: 'Verified',
      statusColor: 'text-primary',
      tag: 'Comparative · Whorl/Loop',
      notes: 'Cross-reference benchmark study for tenprint comparison protocols.',
    },
  ]);
});

// Endpoint to upload a fingerprint image and save analysis to MongoDB
router.post('/analyze', (req, res, next) => {
  upload.single('fingerprint')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds maximum allowed limit of 15MB.' });
      }
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded. Please provide a biometric fingerprint image.' });
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

  const qualityScore = Math.floor(Math.random() * 12) + 86; // 86% - 97%
  const caseId = 'FS-' + Date.now().toString().slice(-6);

  let savedRecord = null;
  if (mongoose.connection.readyState === 1) {
    try {
      savedRecord = await Analysis.create({
        caseId: caseId,
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
    caseId: savedRecord ? savedRecord.caseId : caseId,
    imageUrl: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname,
    qualityScore,
    patternType: 'Loop (Ulnar)',
    confidence: '94%',
    minutiaePoints: minutiaeList,
    savedToDatabase: !!savedRecord,
    timestamp: new Date().toISOString(),
  };

  res.json(responseData);
});

module.exports = router;
