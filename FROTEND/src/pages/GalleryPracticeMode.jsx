import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const caseCard = {
  id: 'EXH-042',
  title: 'The Mayfield Affair',
  type: 'Misidentification Case',
  difficulty: 'Advanced',
  timeLimit: '15:00',
  completionPct: 0,
};

export default function GalleryPracticeMode() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState('15:00');

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pt-16 pb-24 md:pb-0">
      <main className="flex-grow flex flex-col px-margin-page py-container-padding gap-gutter w-full max-w-[1200px] mx-auto">

        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/academy')} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-data-label text-data-label">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Gallery
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Left — Case Info */}
          <div className="lg:col-span-1 flex flex-col gap-gutter">
            <div className="glass-panel p-container-padding rounded-lg flex flex-col gap-stack-md">
              <div className="flex items-center justify-between">
                <span className="font-data-label text-data-label text-on-surface-variant uppercase">Practice Mode</span>
                <span className="font-data-label text-data-label text-[10px] px-2 py-0.5 rounded border text-error border-error/30 bg-error/10">
                  {caseCard.difficulty}
                </span>
              </div>
              <h1 className="font-headline-md text-headline-md text-on-surface">{caseCard.title}</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{caseCard.type}</p>

              <div className="border-t border-outline-variant/10 pt-4 grid grid-cols-2 gap-4">
                {[
                  { label: 'Case ID', value: caseCard.id },
                  { label: 'Time Limit', value: caseCard.timeLimit },
                  { label: 'Time Left', value: timeLeft },
                  { label: 'Completion', value: `${caseCard.completionPct}%` },
                ].map((item) => (
                  <div key={item.label} className="ghost-border p-3 rounded">
                    <span className="font-data-label text-data-label text-on-surface-variant block mb-1">{item.label}</span>
                    <span className="font-data-value text-data-value text-on-surface">{item.value}</span>
                  </div>
                ))}
              </div>

              {!started ? (
                <button
                  onClick={() => { setStarted(true); navigate('/academy/practice'); }}
                  className="w-full py-3 bg-primary text-on-primary rounded font-data-value text-data-value hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 mt-2 shadow-[0_4px_14px_0_rgba(76,215,246,0.2)]"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  Begin Practice
                </button>
              ) : (
                <button className="w-full py-3 bg-surface-bright text-on-surface rounded font-data-value text-data-value hover:bg-surface-variant transition-colors ghost-border flex items-center justify-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-sm">pause</span>
                  Pause Session
                </button>
              )}
            </div>

            {/* Instructions */}
            <div className="glass-panel p-container-padding rounded-lg flex flex-col gap-stack-sm">
              <h3 className="font-data-label text-data-label text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/10 pb-2">
                Instructions
              </h3>
              {[
                'Examine the provided fingerprint evidence carefully',
                'Identify all visible minutiae characteristics',
                'Document your findings using the annotation tool',
                'Compare with reference materials if available',
                'Submit your final assessment before the time limit',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-data-label text-data-label text-primary w-5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Preview */}
          <div className="lg:col-span-2 flex flex-col gap-gutter">
            <div className="glass-panel rounded-lg overflow-hidden flex-grow min-h-[500px] relative flex items-center justify-center">
              <div className="absolute inset-0 ridgeline-bg opacity-30" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMAg7HuamN99ppaqHdkZHj-j_TXvs-iZgwBkuIJ1TomuSc6cCw1FaCHY1I2axRa_eZfg-5mvM7B1cpBr7wkMxZ8XYOx5cGP3mOqhTlI2QHNccUzeE-cV0c8I-w6dliGatvYoyVbuZjdwYrqygHRs0Fo6TWJcgpI4ozHsD5K3jque7tK4sbDeIIQayGAXXqvSsM6rPXFsSjlvURt1w24ZVz8MlD1R03dqsYTQdMN9QsTFGi0fbt3Oql"
                alt="Case EXH-042 — Practice specimen"
                className="relative z-10 max-h-[70vh] object-contain opacity-80 mix-blend-screen"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-surface-dim/80 backdrop-blur-sm rounded p-3 border border-outline-variant/20 z-20">
                <p className="font-data-label text-data-label text-on-surface-variant text-[10px]">
                  START THE DRILL TO ENABLE ANNOTATION TOOLS AND FEATURE MARKERS
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer note="Educational module for training purposes only." />
    </div>
  );
}
