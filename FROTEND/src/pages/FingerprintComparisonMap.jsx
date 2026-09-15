import { useState } from 'react';
import Footer from '../components/Footer';

export default function FingerprintComparisonMap() {
  const [syncZoom, setSyncZoom] = useState(true);
  const [diffMap, setDiffMap] = useState(false);

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pt-16 pb-24 md:pb-0">
      <main className="flex-grow flex flex-col md:flex-row px-margin-page py-container-padding gap-gutter w-full max-w-[1920px] mx-auto">

        {/* Left Controls */}
        <div className="w-full md:w-72 flex-shrink-0 flex flex-col gap-4">

          {/* Sync Controls */}
          <div className="bg-surface-container-high/60 backdrop-blur-md rounded-lg ghost-border p-4 flex flex-col gap-4 focus-border">
            <h2 className="font-data-label text-data-label text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/20 pb-2">
              Sync Controls
            </h2>

            {/* Synchronized Zoom Toggle */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={syncZoom}
                  onChange={(e) => setSyncZoom(e.target.checked)}
                />
                <div className="block bg-surface-dim w-10 h-6 rounded-full border border-outline-variant/30" />
                <div
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-200 ${
                    syncZoom ? 'bg-primary translate-x-4' : 'bg-on-surface-variant translate-x-0'
                  }`}
                />
              </div>
              <span className="font-body-sm text-body-sm group-hover:text-primary transition-colors">
                Synchronized Zoom/Pan
              </span>
            </label>

            {/* Difference Map Toggle */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={diffMap}
                  onChange={(e) => setDiffMap(e.target.checked)}
                />
                <div className="block bg-surface-dim w-10 h-6 rounded-full border border-outline-variant/30" />
                <div
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-200 ${
                    diffMap ? 'bg-primary translate-x-4' : 'bg-on-surface-variant translate-x-0'
                  }`}
                />
              </div>
              <span className="font-body-sm text-body-sm group-hover:text-primary transition-colors">
                Difference Map
              </span>
            </label>
          </div>

          {/* Comparison Data */}
          <div className="bg-surface-container-high/60 backdrop-blur-md rounded-lg ghost-border p-4 flex flex-col gap-4 flex-grow">
            <h2 className="font-data-label text-data-label text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/20 pb-2">
              Comparison Data
            </h2>
            <ul className="flex flex-col gap-2 font-data-value text-data-value">
              {[
                { label: 'Pattern', value: 'Similar', color: 'text-secondary' },
                { label: 'Core', value: 'Matching', color: 'text-primary-container' },
                { label: 'Minutiae', value: '14 Corresponding', color: 'text-tertiary' },
              ].map((item) => (
                <li key={item.label} className="flex justify-between items-center py-1 border-b border-outline-variant/10">
                  <span className="text-on-surface-variant">{item.label}</span>
                  <span className={item.color}>{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto p-3 bg-surface-dim/50 rounded border border-outline-variant/10">
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Observed similarities and differences are displayed for examiner review. The system does not establish personal identity.
              </p>
            </div>
          </div>

          <button className="bg-primary-container text-on-primary-fixed font-data-value text-data-value py-3 rounded-lg hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">summarize</span>
            Export Report
          </button>
        </div>

        {/* Comparison Area */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-gutter min-h-[500px]">

          {/* Sample A — Latent */}
          <div className="relative bg-surface-container-highest/40 backdrop-blur-md rounded-lg ghost-border overflow-hidden group">
            <div className="absolute top-0 w-full p-2 bg-surface-container/80 backdrop-blur z-10 flex justify-between items-center border-b border-outline-variant/20">
              <span className="font-data-label text-data-label text-primary">SAMPLE A: LATENT</span>
              <span className="font-data-label text-data-label text-on-surface-variant">EXH-042</span>
            </div>
            <div className="absolute inset-0 pt-8 p-4 flex items-center justify-center ridgeline-bg reticle-cursor">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMAg7HuamN99ppaqHdkZHj-j_TXvs-iZgwBkuIJ1TomuSc6cCw1FaCHY1I2axRa_eZfg-5mvM7B1cpBr7wkMxZ8XYOx5cGP3mOqhTlI2QHNccUzeE-cV0c8I-w6dliGatvYoyVbuZjdwYrqygHRs0Fo6TWJcgpI4ozHsD5K3jque7tK4sbDeIIQayGAXXqvSsM6rPXFsSjlvURt1w24ZVz8MlD1R03dqsYTQdMN9QsTFGi0fbt3Oql"
                alt="Sample A: Latent fingerprint EXH-042"
                className="object-contain w-full h-full opacity-80 mix-blend-screen"
              />
              {/* Grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 border-[0.5px] border-primary/30"
                style={{
                  backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
            </div>
          </div>

          {/* Sample B — Tenprint */}
          <div className="relative bg-surface-container-highest/40 backdrop-blur-md rounded-lg ghost-border overflow-hidden group">
            <div className="absolute top-0 w-full p-2 bg-surface-container/80 backdrop-blur z-10 flex justify-between items-center border-b border-outline-variant/20">
              <span className="font-data-label text-data-label text-secondary">SAMPLE B: TENPRINT</span>
              <span className="font-data-label text-data-label text-on-surface-variant">REF-991</span>
            </div>
            <div className="absolute inset-0 pt-8 p-4 flex items-center justify-center ridgeline-bg reticle-cursor">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWtjwQjajJZ5xtPFMAEk5sfSoLCt40KHVPyKXNcr4N2pN4YZI5J5AFqU0I5du9SKswbhrPtnPT-iqUpMGEZvr4dk-KJXRzIOm-YDFASE7JffTDQYE7ZIXfmRRW7XnqFuLriIdg4UC3aqHuSZ1QSqyk2CmvmiadUPN7224RcvDEQMTBq3uTCzzAJG5_GhlS3SuxsXP12PnavbfhiFCeSESq6g5gAWjnSkhgCFJozKY-44NK3_td7hEY"
                alt="Sample B: Tenprint card REF-991"
                className="object-contain w-full h-full opacity-80 mix-blend-screen"
              />
              {/* Diff overlay — React-controlled */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-300 bg-surface/50 mix-blend-overlay ${
                  diffMap ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {/* Grid overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 border-[0.5px] border-primary/30"
                style={{
                  backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
