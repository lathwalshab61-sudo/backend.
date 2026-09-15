# forensic.1

## FINGERSCOPE AI — Forensic Fingerprint Analysis Lab

FINGERSCOPE AI is an AI-powered forensic laboratory platform for automated fingerprint classification, minutiae extraction, and forensic case archiving.

### 🚀 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, Multer
- **Database**: MongoDB Atlas with Mongoose

### ⚡ Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   cd BACKEND && npm install
   cd ../FROTEND && npm install
   ```

2. **Configure Environment Variables**:
   Copy `BACKEND/.env.example` to `BACKEND/.env` and supply your `MONGODB_URI`.

3. **Run Both Frontend & Backend Concurrently**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Frontend: [http://localhost:5173](http://localhost:5173) (or `http://localhost:5174`)
   - Backend: [http://localhost:5000](http://localhost:5000)
   - API Health: [http://localhost:5000/health](http://localhost:5000/health)
