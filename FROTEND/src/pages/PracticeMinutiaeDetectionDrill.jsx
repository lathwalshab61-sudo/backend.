import { useState } from 'react';

const OPTIONS = ['Ridge Ending', 'Bifurcation', 'Short Ridge', 'Dot'];
const CORRECT_ANSWER = 'Bifurcation';

const MARKERS = [
  { id: 1, top: '25%', left: '35%', active: false },
  { id: 4, top: '48%', left: '62%', active: true },
  { id: 7, top: '75%', left: '45%', active: false },
];

export default function PracticeMinutiaeDetectionDrill() {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(3);
  const total = 10;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    if (selected === CORRECT_ANSWER) {
      setScore((s) => Math.min(s + 1, total));
    }
  };
  const handleNext = () => {
    setSelected(null);
    setSubmitted(false);
  };

  const isCorrect = selected === CORRECT_ANSWER;

  return (
    <div className="bg-background text-on-background font-body-lg text-body-lg antialiased flex flex-col min-h-screen relative pb-20 selection:bg-primary-container/30">
      <main className="flex-1 flex flex-col pt-16 px-gutter gap-stack-md w-full max-w-md mx-auto relative z-10">

        {/* Header */}
        <div className="flex justify-between items-end mt-stack-md px-2">
          <div className="flex flex-col gap-1">
            <h1 className="font-headline-md text-headline-md text-on-surface leading-tight">
              Practice:<br />Minutiae Detection
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-data-label text-data-label text-primary/70">POINTS FOUND</span>
            <span className="font-data-value text-data-value text-primary tracking-widest">
              {score}/{total}
            </span>
          </div>
        </div>

        {/* Image Viewer */}
        <section className="relative w-full aspect-square rounded-xl bg-surface-container-high border border-outline-variant/30 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.03)] flex-shrink-0">
          {/* Fingerprint image */}
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-90 transition-transform duration-500 hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxLixbJIaJCW_u4fqXCFzbpYR7mkb3sn78sqF2A-ruNxCAcwT3GWwPYCRsATLNXowTnVUECI5ArBq1Kk7r3S9D_W0w7czEWVGl2wX1ZilC4RD-be7Hrptzh5grTJk47gR0-dy7JDwdISUfwE_fp598IFAFl-jioxP-tHDSKEuKrDw5E93MbvCgEtCb8AZueS-Q112nkialcAoVYIOFOjrsVIfLP4IbcuLB0TR-CdXQSJ3YecGEic7M')`,
            }}
          />

          {/* Center crosshair */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
            <div className="w-full h-[1px] bg-primary" />
            <div className="absolute h-full w-[1px] bg-primary" />
          </div>

          {/* Markers */}
          {MARKERS.map((m) =>
            m.active ? (
              <div
                key={m.id}
                className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full border border-primary flex items-center justify-center shadow-[0_0_12px_rgba(76,215,246,0.4)] bg-primary/5 z-10"
                style={{ top: m.top, left: m.left }}
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="absolute w-[120%] h-[1px] bg-primary/60" />
                <div className="absolute h-[120%] w-[1px] bg-primary/60" />
                <div className="absolute -right-8 -top-6 bg-surface-container border border-primary/30 px-1.5 py-0.5 rounded shadow-lg">
                  <span className="font-data-label text-data-label text-primary text-[9px]">#{String(m.id).padStart(2, '0')}</span>
                </div>
              </div>
            ) : (
              <div
                key={m.id}
                className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full border border-outline-variant/40 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                style={{ top: m.top, left: m.left }}
              >
                <div className="w-1.5 h-1.5 bg-outline-variant rounded-full" />
              </div>
            )
          )}
        </section>

        {/* Identification Panel */}
        <section className="flex flex-col gap-stack-md bg-surface-container/50 p-container-padding rounded-xl border border-outline-variant/20 backdrop-blur-xl mb-4">
          {/* Instruction */}
          <div className="flex items-start gap-2 border-b border-outline-variant/10 pb-stack-sm">
            <span className="material-symbols-outlined text-on-surface-variant text-sm mt-0.5">info</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Tap a highlighted point on the fingerprint to identify the ridge characteristic.
            </p>
          </div>

          {/* Detail Card */}
          <div className="flex flex-col gap-unit">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xs">my_location</span>
                <span className="font-data-label text-data-label text-primary tracking-widest">FEATURE ID: #04</span>
              </div>
              <span className={`px-2 py-0.5 border rounded font-data-label text-data-label text-[10px] ${
                submitted
                  ? isCorrect
                    ? 'bg-primary/10 border-primary/20 text-primary'
                    : 'bg-error/10 border-error/20 text-error'
                  : 'bg-primary/10 border-primary/20 text-primary'
              }`}>
                {submitted ? (isCorrect ? 'CORRECT' : 'INCORRECT') : 'ANALYZING'}
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Identify this characteristic
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-stack-sm mt-1">
            {OPTIONS.map((opt) => {
              const isSelected = selected === opt;
              const isRight = opt === CORRECT_ANSWER;
              let classes = 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:border-primary/50 hover:text-on-surface hover:bg-surface-container';
              if (submitted) {
                if (isRight) classes = 'border-primary bg-primary/10 text-primary';
                else if (isSelected && !isRight) classes = 'border-error bg-error/10 text-error';
              } else if (isSelected) {
                classes = 'border-primary bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(76,215,246,0.05)]';
              }
              return (
                <button
                  key={opt}
                  disabled={submitted}
                  onClick={() => setSelected(opt)}
                  className={`relative overflow-hidden py-3 px-3 rounded-lg border transition-all flex items-center justify-between active:scale-[0.98] group ${classes}`}
                >
                  <span className="font-data-value text-data-value text-xs">{opt}</span>
                  {isSelected && !submitted && (
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  )}
                  {submitted && isRight && (
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Button */}
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className="mt-2 w-full py-3.5 rounded-lg bg-primary text-on-primary font-data-value text-data-value hover:bg-primary-fixed transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(76,215,246,0.2)] disabled:opacity-40 disabled:cursor-not-allowed active:opacity-80"
            >
              SUBMIT OBSERVATION
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="mt-2 w-full py-3.5 rounded-lg bg-surface-bright text-on-surface font-data-value text-data-value hover:bg-surface-variant transition-all flex items-center justify-center gap-2 ghost-border active:opacity-80"
            >
              NEXT FEATURE
              <span className="material-symbols-outlined text-[18px]">navigate_next</span>
            </button>
          )}
        </section>

        <p className="font-data-label text-data-label text-[10px] text-on-surface-variant text-center opacity-50 px-4 leading-relaxed mb-4">
          Practice mode findings are for educational purposes and should be cross-referenced with the methodology guide.
        </p>
      </main>
    </div>
  );
}
