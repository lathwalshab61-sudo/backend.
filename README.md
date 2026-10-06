# 🔬 FINGERSCOPE AI — Biometric & Forensic Laboratory

**FINGERSCOPE AI** is a modern forensic analysis platform designed for AI-assisted fingerprint examination, minutiae extraction, 1-to-1 comparison analysis, and forensic examiner training.

---

## 🏗️ Architecture Overview

- **Frontend**: React 19 + Vite + Tailwind CSS + Material Symbols + Canvas overlays
- **Backend**: Node.js + Express 5 + Mongoose + Multer
- **Database**: MongoDB Atlas (with automated in-memory fallback when offline)
- **Deployment Ready**: Unified production server with SPA routing, environment variable configuration, secure CORS, and file-upload type/size filtering.

---

## 📁 Workspace Structure

```
WEB/
├── package.json              # Unified root scripts (dev, build, start, lint)
├── .gitignore                # Protects secrets (.env), node_modules, and uploads
├── README.md                 # Project documentation & deployment guide
├── RUN_GUIDE.md              # Local execution walkthrough
│
├── BACKEND/
│   ├── .env                  # Environment variables (PORT, MONGODB_URI, etc.)
│   ├── .env.example          # Safe template for production/staging env vars
│   ├── .gitignore            # Backend ignore rules
│   ├── server.js             # Express 5 entrypoint + static SPA serving + health check
│   ├── config/
│   │   └── db.js             # Mongoose connection logic with auto-reconnect
│   ├── models/
│   │   ├── Analysis.js       # Biometric analysis scan schema
│   │   └── Case.js           # Case archive record schema
│   ├── routes/
│   │   └── api.js            # /api/analyze, /api/cases, /api/recent-analyses, /api/seed
│   └── uploads/              # Storage for uploaded forensic scans (.gitkeep preserved)
│
└── FROTEND/
    ├── .env.example          # Frontend API URL environment template (VITE_API_URL)
    ├── vite.config.js        # Vite config with dev proxy to backend port 5000
    ├── package.json
    └── src/
        ├── App.jsx           # Routing table & layout
        ├── main.jsx
        ├── components/       # GlassPanel, TopBar, BottomNav, Footer, StatusBadge
        ├── constants/        # Shared data constants & default forensic records
        ├── services/         # api.js client (handles live API with offline fallback)
        └── pages/            # Dashboard, SingleAnalysisUpload, PatternMinutiaeExamination,
                              # FingerprintComparisonMap, ForensicGallery, CaseTimeline,
                              # InvestigatorArchive, GalleryPracticeMode, ForensicPrototype
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
# In root directory
npm install

# In Backend
cd BACKEND && npm install

# In Frontend
cd ../FROTEND && npm install
```

### 2. Run Both Frontend & Backend Concurrently
```bash
# From workspace root
npm run dev
```

- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/health`

---

## 🚢 Production Deployment

### Option A: Unified Fullstack Service (Render, Railway, Heroku, VPS, Docker)
When deployed as a single service, the backend automatically serves the built frontend (`FROTEND/dist`) as static assets with full SPA client routing.

1. Set environment variables on your hosting provider:
   - `NODE_ENV=production`
   - `PORT=5000` (or provider's default `$PORT`)
   - `MONGODB_URI=mongodb+srv://<user>:<pwd>@<cluster>.mongodb.net/fingerscope_db?retryWrites=true&w=majority`
   - `CORS_ORIGIN=*` (or your domain)
2. Build & Start:
   ```bash
   npm run build
   npm start
   ```

### Option B: Separate Frontend (Vercel / Netlify) & Backend (Render / Railway)
1. Deploy `BACKEND/`:
   - Set `MONGODB_URI`, `PORT`, `CORS_ORIGIN=https://your-frontend-app.vercel.app`
   - Start command: `node server.js`
2. Deploy `FROTEND/`:
   - Set `VITE_API_URL=https://your-backend-api.onrender.com`
   - Build command: `npm run build`
   - Output directory: `dist`

---

## 🔒 Security & Quality Verification

- ✅ **Secret Protection**: `.env` files are ignored in `.gitignore` across root and backend.
- ✅ **Upload Protection**: File uploads via Multer are restricted to image MIME types (JPG, PNG, WEBP, TIFF) with a 15MB file size limit.
- ✅ **SPA Routing Fallback**: Express 5 wildcard routing handles client-side React routes without 404ing on page refresh.
- ✅ **Linting**: Oxlint verified with 0 errors and 0 warnings.
- ✅ **Resilience**: Frontend and Backend work with active MongoDB Atlas or gracefully fallback to mock data when database connection is offline.
