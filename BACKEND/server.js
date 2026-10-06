const path = require('path');
const fs = require('fs');

// Load .env from BACKEND/.env or root .env
const envBackendPath = path.join(__dirname, '.env');
const envRootPath = path.join(__dirname, '../.env');
if (fs.existsSync(envBackendPath)) {
  require('dotenv').config({ path: envBackendPath });
} else if (fs.existsSync(envRootPath)) {
  require('dotenv').config({ path: envRootPath });
} else {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN.split(',').map((o) => o.trim()),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api', apiRoutes);

// Health check with DB status
app.get('/health', (req, res) => {
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const dbState = mongoose.connection.readyState;

  res.json({
    status: 'ok',
    message: 'FINGERSCOPE AI Backend API is running',
    environment: NODE_ENV,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatusMap[dbState] || 'unknown',
      connected: dbState === 1,
      host: mongoose.connection.host || null,
      name: mongoose.connection.name || null,
    },
  });
});

// Production: Serve React frontend static build if present
const frontendDist = path.join(__dirname, '../FROTEND/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // Express 5 compatible SPA fallback
  app.use((req, res, next) => {
    if (
      req.method === 'GET' &&
      !req.path.startsWith('/api') &&
      !req.path.startsWith('/uploads') &&
      !req.path.startsWith('/health')
    ) {
      return res.sendFile(path.join(frontendDist, 'index.html'));
    }
    next();
  });
}

// Global 404 for unhandled API requests
app.use('/api', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.originalUrl,
  });
});

// Global Error Handler Middleware
app.use((err, req, res, _next) => {
  console.error('Unhandled Error:', err.message);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: NODE_ENV === 'production' ? 'An unexpected server error occurred.' : err.message,
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 FINGERSCOPE AI Backend running on port ${PORT} [${NODE_ENV}]`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    mongoose.connection.close(false);
    console.log('HTTP server closed');
  });
});

module.exports = app;
