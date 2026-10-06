import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { minutiaeList as defaultMinutiaeList } from '../constants/data';

const DEFAULT_SAMPLE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA5dtBeNPZcOdH7uVoLTvfoVeGLmCxBZZWBgzUEDdd2_MnCrwMJwNCuIO9AlXAVT5t-j2HpTrtuYw8C_QmjmVq3yVMjDnaoiYvz05LAYug2j1v5RpaYOSF85rLWfAqxVGGtty1ZO03Hi4Gw97993krqiqFbZjvFdWu6VrTNfZ4Hc9EhA2eTyipUEbFD0j0M7vu2ozgPWaYKy0VZecGKXGayWbjiRcZtGQOdZgghsFA46SrCmNeEcszs';

export default function PatternMinutiaeExamination() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysisData = location.state?.analysisData;

  const displayImage = analysisData?.previewUrl || analysisData?.imageUrl || DEFAULT_SAMPLE_IMG;
  const qualityScore = analysisData?.qualityScore || 88;
  const patternType = analysisData?.patternType || 'Loop (Ulnar)';
  const confidence = analysisData?.confidence || '94%';
  const minutiae = analysisData?.minutiaePoints || defaultMinutiaeList;
  const caseId = analysisData?.caseId || 'EXH-042';

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-lg selection:bg-primary/30">
      <main className="flex-1 mt-16 pb-24 md:pb-0 px-gutter md:px-margin-page py-container-padding">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter min-h-[calc(100vh-160px)]">

          {/* Left — Viewer */}
          <div className="md:col-span-8 flex flex-col gap-gutter">
            <div className="glass-panel flex-1 rounded-lg relative overflow-hidden flex items-center justify-center min-h-[500px] p-4">
              {/* Background gradient */}
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-radial-gradient from-surface-variant/20 to-transparent" />
              </div>

              {/* Top Case Bar */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded border border-outline-variant/30">
                <span className="font-data-label text-data-label text-primary">CASE RECORD:</span>
                <span className="font-data-value text-data-value text-on-surface">{caseId}</span>
              </div>

              {/* Fingerprint Image */}
              <div className="relative z-10 w-full max-w-[500px] aspect-[3/4] flex items-center justify-center">
                <img
                  src={displayImage}
                  alt="Forensic fingerprint sample under examination"
                  className="w-full h-full object-contain opacity-85 mix-blend-screen rounded"
                />
                {/* Core marker */}
                <div className="core-marker" style={{ top: '45%', left: '52%' }} />
                {/* Delta markers */}
                <div className="delta-marker" style={{ top: '65%', left: '35%' }} />
                <div className="delta-marker" style={{ top: '62%', left: '70%' }} />
                {/* Reticles */}
                <div className="reticle" style={{ top: '30%', left: '40%' }} />
                <div className="reticle" style={{ top: '25%', left: '60%' }} />
              </div>

              {/* Viewer Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                {['zoom_in', 'zoom_out', 'contrast'].map((icon) => (
                  <button key={icon} className="w-10 h-10 rounded glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" title={icon}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Analysis Panels */}
          <div className="md:col-span-4 flex flex-col gap-stack-md">

            {/* Quality Panel */}
            <div className="glass-panel rounded-lg p-container-padding flex flex-col gap-stack-sm">
              <div className="flex items-center justify-between border-b border-outline-variant/10 pb-2">
                <h2 className="font-data-label text-data-label text-on-surface-variant uppercase tracking-wider">
                  Quality Analysis
                </h2>
                <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-data-label text-[10px] text-primary uppercase">Verified</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-headline-sm text-headline-sm text-on-surface">Suitable for analysis</span>
                  <span className="font-data-value text-data-value text-primary">Score {qualityScore}%</span>
                </div>
                <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden mt-2">
                  <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${qualityScore}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[{ label: 'Resolution', value: '500 DPI' }, { label: 'Noise Level', value: 'Low' }].map((item) => (
                  <div key={item.label} className="ghost-border p-2 rounded">
                    <span className="font-data-label text-data-label text-on-surface-variant block mb-1">{item.label}</span>
                    <span className="font-data-value text-data-value text-on-surface">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pattern Panel */}
            <div className="glass-panel rounded-lg p-container-padding flex flex-col gap-stack-sm">
              <div className="flex items-center justify-between border-b border-outline-variant/10 pb-2">
                <h2 className="font-data-label text-data-label text-on-surface-variant uppercase tracking-wider">
                  Pattern Classification
                </h2>
                <span className="material-symbols-outlined text-primary text-sm">fingerprint</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-headline-md text-headline-md text-on-surface">{patternType}</span>
                <div className="text-right">
                  <span className="font-data-label text-data-label text-on-surface-variant block">Confidence</span>
                  <span className="font-data-value text-data-value text-primary">{confidence}</span>
                </div>
              </div>
            </div>

            {/* Minutiae List */}
            <div className="glass-panel rounded-lg flex-1 flex flex-col overflow-hidden min-h-[250px]">
              <div className="p-container-padding border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/50">
                <h2 className="font-data-label text-data-label text-on-surface-variant uppercase tracking-wider">
                  Identified Minutiae
                </h2>
                <span className="font-data-value text-data-value text-on-surface bg-surface-variant px-2 py-0.5 rounded">
                  {minutiae.length} Total
                </span>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[220px]">
                {minutiae.map((m) => (
                  <div key={m.id} className="flex items-center p-3 border-b border-outline-variant/10 hover:bg-surface-variant/30 transition-colors group last:border-0">
                    <span className="font-data-label text-data-label text-on-surface-variant w-8 opacity-50 group-hover:opacity-100">{m.id}</span>
                    <div className={`w-3 h-3 ${m.type === 'circle' ? 'rounded-full' : 'rotate-45'} border ${m.borderColor || 'border-primary'} mr-3 flex-shrink-0`} />
                    <div className="flex-1">
                      <span className="font-body-sm text-body-sm text-on-surface block">{m.label}</span>
                    </div>
                    <span className={`font-data-value text-data-value ${m.color || 'text-primary'}`}>{m.confidence}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning & Action */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2 bg-error-container/10 border border-error-container/30 p-3 rounded">
                <span className="material-symbols-outlined text-error text-sm mt-0.5">warning</span>
                <p className="font-data-label text-data-label text-error/90 leading-tight">
                  Pattern classification is an AI-assisted observation and must be verified by a trained examiner.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/analysis')}
                  className="flex-1 ghost-border bg-surface-container-low text-on-surface font-data-value text-data-value py-3 rounded hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Upload New
                </button>
                <button
                  onClick={() => navigate('/comparison')}
                  className="flex-1 bg-primary text-on-primary font-data-value text-data-value py-3 rounded hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">compare_arrows</span>
                  Compare
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
