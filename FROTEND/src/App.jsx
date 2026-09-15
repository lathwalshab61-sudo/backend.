import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';

// Pages
import Dashboard from './pages/Dashboard';
import SingleAnalysisUpload from './pages/SingleAnalysisUpload';
import PatternMinutiaeExamination from './pages/PatternMinutiaeExamination';
import FingerprintComparisonMap from './pages/FingerprintComparisonMap';
import ForensicGallery from './pages/ForensicGallery';
import PracticeMinutiaeDetectionDrill from './pages/PracticeMinutiaeDetectionDrill';
import CaseTimeline from './pages/CaseTimeline';
import InvestigatorArchive from './pages/InvestigatorArchive';
import GalleryPracticeMode from './pages/GalleryPracticeMode';
import ForensicPrototype from './pages/ForensicPrototype';

export default function App() {
  return (
    <BrowserRouter>
      {/* TopBar is always visible across all routes */}
      <TopBar />

      {/* Page content */}
      <Routes>
        {/* Core */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/analysis" element={<SingleAnalysisUpload />} />
        <Route path="/analysis/result" element={<PatternMinutiaeExamination />} />
        <Route path="/comparison" element={<FingerprintComparisonMap />} />

        {/* Academy */}
        <Route path="/academy" element={<ForensicGallery />} />
        <Route path="/academy/practice" element={<PracticeMinutiaeDetectionDrill />} />
        <Route path="/academy/timeline" element={<CaseTimeline />} />
        <Route path="/academy/archive" element={<InvestigatorArchive />} />
        <Route path="/academy/gallery-practice" element={<GalleryPracticeMode />} />

        {/* Prototype landing */}
        <Route path="/prototype" element={<ForensicPrototype />} />

        {/* 404 fallback */}
        <Route path="*" element={<Dashboard />} />
      </Routes>

      {/* Mobile bottom nav — always visible */}
      <BottomNav />
    </BrowserRouter>
  );
}
