# 🚀 How to Run FINGERSCOPE AI (Frontend + Backend)

This guide provides step-by-step instructions to run both the **Node.js/Express Backend** and **React/Vite Frontend** together.

---

## 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.
Verify your installation:
```bash
node -v
npm -v
```

---

## 🗄️ Database Configuration (MongoDB Atlas)

The backend is connected to MongoDB Atlas via Mongoose. Credentials and connection string are managed in [BACKEND/.env](file:///c:/Users/Welcome/Desktop/WEB/BACKEND/.env):

```env
PORT=5000
MONGODB_URI=mongodb+srv://lathwalshab61_db_user:25HHuXMMWTHlOh2v@cluster0.cg2ykw4.mongodb.net/fingerscope_db?retryWrites=true&w=majority
```

---

## ⚡ Option 1: Run Both Together (Recommended)

You can run both Frontend and Backend concurrently with a single command from the root `WEB` folder.

### 1. Open Terminal in the root directory:
```powershell
cd c:\Users\Welcome\Desktop\WEB
```

### 2. Run the unified dev command:
```powershell
npm run dev
```
*(or `npm start`)*

### 🔗 Access the application:
- **Frontend App**: [http://localhost:5173](http://localhost:5173) (or `http://localhost:5174`)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 🛠️ Option 2: Run in Separate Terminals

If you prefer running Frontend and Backend in independent terminal windows:

### Terminal 1 — Backend (Express API):
```powershell
cd c:\Users\Welcome\Desktop\WEB\BACKEND
npm run dev
```
> *Runs on `http://localhost:5000` with hot-reloading via Nodemon and MongoDB connection.*

---

### Terminal 2 — Frontend (React + Vite):
```powershell
cd c:\Users\Welcome\Desktop\WEB\FROTEND
npm run dev
```
> *Runs on `http://localhost:5173` with Vite HMR and API proxy configured.*

---

## 📂 Project Structure Overview

```
WEB/
├── package.json          # Root runner using Concurrently
├── RUN_GUIDE.md          # Execution documentation
│
├── BACKEND/              # Node.js + Express REST API
│   ├── .env              # Environment variables & MongoDB URI
│   ├── server.js         # Server entry point (Port 5000)
│   ├── config/
│   │   └── db.js         # Mongoose connection logic
│   ├── models/           # Mongoose schemas (Analysis, Case)
│   ├── routes/
│   │   └── api.js        # Minutiae, Cases, & Upload routes
│   ├── uploads/          # Image upload storage
│   └── package.json
│
└── FROTEND/              # React + Vite Application
    ├── src/              # Pages, Components, Design System
    ├── vite.config.js    # Vite config with API proxy to localhost:5000
    └── package.json
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server status and MongoDB connection check |
| `GET` | `/api/recent-analyses` | Recent dashboard forensic scans |
| `GET` | `/api/cases` | Forensic archive records & case files |
| `POST` | `/api/analyze` | Fingerprint image upload & AI minutiae extraction |

---

## 💡 Troubleshooting Tips

1. **Folder Name Note**: Note that the frontend folder is spelled `FROTEND` in this directory.
2. **Port Conflicts**:
   - If port `5000` is busy, set an environment variable before running: `PORT=5001 npm start`.
   - If port `5173` is busy, Vite will automatically select `5174` or the next available port.
