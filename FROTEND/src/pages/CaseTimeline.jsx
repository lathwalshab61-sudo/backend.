import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const timelineEvents = [
  {
    year: '1892',
    title: 'Galton\'s Classification',
    desc: 'Sir Francis Galton publishes the first scientific study of fingerprints, establishing the basis for ridge characteristics.',
    tag: 'Foundation',
    tagColor: 'text-primary border-primary/30 bg-primary/10',
  },
  {
    year: '1901',
    title: 'Scotland Yard Fingerprint Bureau',
    desc: 'The Metropolitan Police establishes the first fingerprint bureau using the Henry Classification System.',
    tag: 'Institutional',
    tagColor: 'text-secondary border-secondary/30 bg-secondary/10',
  },
  {
    year: '1911',
    title: 'First US Conviction',
    desc: 'Thomas Jennings becomes the first person convicted of murder in the United States based on fingerprint evidence.',
    tag: 'Legal Precedent',
    tagColor: 'text-tertiary border-tertiary/30 bg-tertiary/10',
  },
  {
    year: '1986',
    title: 'AFIS Goes National',
    desc: 'The FBI deploys the Automated Fingerprint Identification System nationally, revolutionizing database matching capabilities.',
    tag: 'Technology',
    tagColor: 'text-primary border-primary/30 bg-primary/10',
  },
  {
    year: '2004',
    title: 'The Mayfield Error',
    desc: 'FBI mistakenly identifies Brandon Mayfield\'s print in the Madrid bombing — a landmark case in cognitive bias recognition.',
    tag: 'Critical Error',
    tagColor: 'text-error border-error/30 bg-error/10',
  },
  {
    year: '2024',
    title: 'AI-Assisted Analysis',
    desc: 'Deep learning models achieve expert-level pattern classification, augmenting (not replacing) trained forensic examiners.',
    tag: 'AI Era',
    tagColor: 'text-primary border-primary/30 bg-primary/10',
  },
];

export default function CaseTimeline() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pt-16 pb-24 md:pb-0">
      <main className="flex-grow flex flex-col px-margin-page py-container-padding gap-gutter w-full max-w-[1200px] mx-auto">

        <div className="flex flex-col gap-2 mb-8">
          <h1 className="font-display-lg text-display-lg">Forensic Timeline</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            A chronological history of fingerprint science, key legal milestones, and critical errors that shaped modern dactyloscopy.
          </p>
        </div>

        {/* Sub-nav */}
        <div className="flex gap-4 border-b border-outline-variant/20 pb-4 mb-6 overflow-x-auto">
          {[
            { label: 'Gallery', to: '/academy', icon: 'grid_view' },
            { label: 'Practice Drill', to: '/academy/practice', icon: 'sports_score' },
            { label: 'Timeline', to: '/academy/timeline', icon: 'timeline', active: true },
            { label: 'Archive', to: '/academy/archive', icon: 'folder_open' },
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-outline-variant/20" />

          <div className="flex flex-col gap-8">
            {timelineEvents.map((event, i) => (
              <div key={i} className="flex gap-8 group">
                {/* Year */}
                <div className="w-16 flex-shrink-0 text-right">
                  <span className="font-data-value text-data-value text-primary">{event.year}</span>
                </div>
                {/* Dot */}
                <div className="relative flex-shrink-0 -ml-2.5 mt-1.5">
                  <div className="w-4 h-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors" />
                </div>
                {/* Content */}
                <div className="flex-grow pb-4">
                  <div className="glass-panel p-container-padding rounded-lg group-hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <span className={`font-data-label text-data-label text-[10px] px-2 py-0.5 rounded border whitespace-nowrap ${event.tagColor}`}>
                        {event.tag}
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{event.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer note="Educational module for training purposes only." />
    </div>
  );
}
