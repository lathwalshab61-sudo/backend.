import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function ForensicPrototype() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pt-16 pb-24 md:pb-0">
      <main className="flex-grow flex flex-col items-center justify-center px-margin-page py-container-padding gap-gutter">
        {/* Animated fingerprint hero */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-64 h-64 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute w-48 h-48 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="w-32 h-32 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontSize: '64px', fontVariationSettings: "'FILL' 1" }}
            >
              fingerprint
            </span>
          </div>
        </div>

        <div className="text-center max-w-2xl">
          <span className="font-data-label text-data-label text-primary tracking-widest block mb-4">
            FINGERSCOPE AI // FORENSIC PROTOTYPE v0.9
          </span>
          <h1 className="font-display-lg text-display-lg mb-4">
            Precision Biometric Analysis Platform
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            AI-assisted forensic fingerprint examination and comparison for investigators, analysts, and forensic laboratories. Built on deep learning pattern recognition with human verification protocols.
          </p>

          {/* Capability tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter mb-10">
            {[
              { icon: 'biotech', label: 'Minutiae Detection', desc: 'Automated ridge characteristic extraction with confidence scoring' },
              { icon: 'compare', label: '1-to-1 Comparison', desc: 'Synchronized sample comparison with difference mapping' },
              { icon: 'school', label: 'Forensic Academy', desc: 'Case studies, practice drills and methodology training' },
            ].map((cap) => (
              <div key={cap.label} className="glass-panel p-container-padding rounded-lg text-left flex flex-col gap-stack-sm">
                <span className="material-symbols-outlined text-primary">{cap.icon}</span>
                <h3 className="font-data-value text-data-value text-on-surface">{cap.label}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{cap.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-on-primary px-8 py-3 rounded font-data-value text-data-value hover:bg-primary-fixed transition-colors shadow-[0_4px_14px_0_rgba(76,215,246,0.3)] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">dashboard</span>
              Enter Platform
            </button>
            <button
              onClick={() => navigate('/academy')}
              className="ghost-border bg-transparent text-primary px-8 py-3 rounded font-data-value text-data-value hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">school</span>
              View Academy
            </button>
          </div>

          <div className="mt-10 p-4 border border-outline-variant/30 bg-surface-container-low rounded flex items-start gap-4 text-left">
            <span className="material-symbols-outlined text-primary-container mt-0.5">shield</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <strong className="text-on-surface">Research & Training Prototype:</strong> This system provides AI-assisted observations for educational and forensic support. All results require qualified human examiner verification before any evidentiary use.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
