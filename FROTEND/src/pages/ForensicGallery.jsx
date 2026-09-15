import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const caseStudies = [
  {
    id: 1,
    category: 'MISIDENTIFICATION',
    categoryClasses: 'bg-error-container text-on-error-container',
    status: 'Completed',
    statusDot: 'bg-primary',
    statusText: 'text-primary',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMAg7HuamN99ppaqHdkZHj-j_TXvs-iZgwBkuIJ1TomuSc6cCw1FaCHY1I2axRa_eZfg-5mvM7B1cpBr7wkMxZ8XYOx5cGP3mOqhTlI2QHNccUzeE-cV0c8I-w6dliGatvYoyVbuZjdwYrqygHRs0Fo6TWJcgpI4ozHsD5K3jque7tK4sbDeIIQayGAXXqvSsM6rPXFsSjlvURt1w24ZVz8MlD1R03dqsYTQdMN9QsTFGi0fbt3Oql',
    imgAlt: 'Microscopic view of fingerprint ridges',
    title: 'The Mayfield Affair',
    subtitle: 'Latent Print Error',
    subtitleColor: 'text-error',
    desc: 'Review the 2004 Madrid train bombings case where an erroneous fingerprint identification was made by the FBI.',
    lesson: 'Cognitive Bias in Analysis',
    lessonColor: 'text-primary-fixed',
    btnLabel: 'Review Module',
    btnClasses: 'bg-primary-container text-on-primary-fixed hover:bg-primary-fixed',
    to: '/academy/archive',
  },
  {
    id: 2,
    category: 'COMPLEX COMPARISON',
    categoryClasses: 'bg-secondary-container text-on-secondary-container',
    status: 'In Progress',
    statusDot: 'bg-secondary',
    statusText: 'text-secondary',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWtjwQjajJZ5xtPFMAEk5sfSoLCt40KHVPyKXNcr4N2pN4YZI5J5AFqU0I5du9SKswbhrPtnPT-iqUpMGEZvr4dk-KJXRzIOm-YDFASE7JffTDQYE7ZIXfmRRW7XnqFuLriIdg4UC3aqHuSZ1QSqyk2CmvmiadUPN7224RcvDEQMTBq3uTCzzAJG5_GhlS3SuxsXP12PnavbfhiFCeSESq6g5gAWjnSkhgCFJozKY-44NK3_td7hEY',
    imgAlt: 'Tenprint comparison card',
    title: 'Shirley McKie Case',
    subtitle: 'Distorted Print Analysis',
    subtitleColor: 'text-secondary',
    desc: 'Analyze the Scottish case involving a disputed latent print found at a murder scene and the resulting inquiry.',
    lesson: 'Thresholds for Sufficiency',
    lessonColor: 'text-secondary-fixed',
    btnLabel: 'Continue Module',
    btnClasses: 'bg-surface-bright text-on-surface hover:bg-surface-variant ghost-border',
    to: '/academy/archive',
  },
  {
    id: 3,
    category: 'METHODOLOGY',
    categoryClasses: 'bg-tertiary-container text-on-tertiary-container',
    status: 'Not Started',
    statusDot: 'bg-outline',
    statusText: 'text-outline',
    img: null,
    imgAlt: null,
    title: 'ACE-V Protocol',
    subtitle: 'Standardized Assessment',
    subtitleColor: 'text-tertiary',
    desc: 'A structured walkthrough of the Analysis, Comparison, Evaluation, and Verification methodology.',
    lesson: 'Scientific Rigor in Forensics',
    lessonColor: 'text-tertiary-fixed',
    btnLabel: 'Start Module',
    btnClasses: 'bg-surface-bright text-on-surface hover:bg-surface-variant ghost-border',
    to: '/academy/archive',
  },
];

export default function ForensicGallery() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pt-16 pb-24 md:pb-0">
      <main className="flex-grow flex flex-col px-margin-page py-container-padding gap-gutter w-full max-w-[1920px] mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="font-display-lg text-display-lg text-on-surface">
            Interactive Forensic Gallery
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
            Explore historical cases and key learnings in latent print analysis. Review misidentifications,
            cognitive biases, and complex comparisons through our interactive modules.
          </p>
        </div>

        {/* Sub-nav */}
        <div className="flex gap-4 border-b border-outline-variant/20 pb-4 mb-2 overflow-x-auto">
          {[
            { label: 'Gallery', to: '/academy', icon: 'grid_view', active: true },
            { label: 'Practice Drill', to: '/academy/practice', icon: 'sports_score', active: false },
            { label: 'Timeline', to: '/academy/timeline', icon: 'timeline', active: false },
            { label: 'Archive', to: '/academy/archive', icon: 'folder_open', active: false },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className={`flex items-center gap-2 font-data-label text-data-label px-3 py-2 rounded transition-colors whitespace-nowrap ${
                item.active
                  ? 'text-primary bg-primary/10 border border-primary/20'
                  : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {caseStudies.map((c) => (
            <div
              key={c.id}
              className="bg-surface-container-high/60 backdrop-blur-md rounded-xl ghost-border overflow-hidden flex flex-col group cursor-pointer hover:border-primary-container transition-colors"
            >
              {/* Card Image */}
              <div className="relative h-48 bg-surface-container-highest fp-texture flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest to-transparent z-10" />
                {c.img ? (
                  <img
                    src={c.img}
                    alt={c.imgAlt}
                    className="object-cover w-full h-full opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 ridgeline-bg opacity-30" />
                )}
                <div className={`absolute top-4 left-4 z-20 font-data-label text-data-label px-2 py-1 rounded ${c.categoryClasses}`}>
                  {c.category}
                </div>
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-surface/80 rounded-full px-2 py-1 ghost-border">
                  <span className={`w-2 h-2 rounded-full ${c.statusDot}`} />
                  <span className={`font-data-label text-data-label ${c.statusText}`}>{c.status}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow gap-4">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>
                  <h4 className={`font-data-value text-data-value ${c.subtitleColor}`}>{c.subtitle}</h4>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex-grow">{c.desc}</p>
                <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/20">
                  <span className="font-data-label text-data-label text-on-surface-variant block mb-1">LESSON LEARNED</span>
                  <span className={`font-body-sm text-body-sm ${c.lessonColor}`}>{c.lesson}</span>
                </div>
                <button
                  onClick={() => navigate(c.to)}
                  className={`w-full font-data-value text-data-value py-2 rounded-lg transition-colors mt-2 ${c.btnClasses}`}
                >
                  {c.btnLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer note="Educational module for training purposes only." />
    </div>
  );
}
