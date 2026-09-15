import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const archiveEntries = [
  { id: 'CASE-2024-001', title: 'EXH-042 — Latent Lift Analysis', examiner: 'J. Morrison', date: 'Oct 24, 2024', status: 'Verified', statusColor: 'text-primary', tag: 'Right Thumb · Whorl' },
  { id: 'CASE-2024-002', title: 'REF-991 — Tenprint Comparison', examiner: 'A. Reyes', date: 'Oct 22, 2024', status: 'Pending Review', statusColor: 'text-secondary', tag: 'Left Index · Loop' },
  { id: 'CASE-2024-003', title: 'EXH-039 — Partial Print Recovery', examiner: 'J. Morrison', date: 'Oct 19, 2024', status: 'Anomaly', statusColor: 'text-error', tag: 'Unknown · Arch' },
  { id: 'CASE-2024-004', title: 'LAT-017 — Smudged Ridge Analysis', examiner: 'C. Park', date: 'Oct 15, 2024', status: 'Verified', statusColor: 'text-primary', tag: 'Right Middle · Loop' },
  { id: 'CASE-2023-099', title: 'CMP-088 — Cross-Reference Study', examiner: 'A. Reyes', date: 'Dec 01, 2023', status: 'Verified', statusColor: 'text-primary', tag: 'Comparative · Whorl/Loop' },
];

export default function InvestigatorArchive() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pt-16 pb-24 md:pb-0">
      <main className="flex-grow flex flex-col px-margin-page py-container-padding gap-gutter w-full max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="font-display-lg text-display-lg">Investigator's Archive</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Complete record of all processed cases, examinations, and comparison reports by this investigator.
          </p>
        </div>

        {/* Sub-nav */}
        <div className="flex gap-4 border-b border-outline-variant/20 pb-4 mb-2 overflow-x-auto">
          {[
            { label: 'Gallery', to: '/academy', icon: 'grid_view' },
            { label: 'Practice Drill', to: '/academy/practice', icon: 'sports_score' },
            { label: 'Timeline', to: '/academy/timeline', icon: 'timeline' },
            { label: 'Archive', to: '/academy/archive', icon: 'folder_open', active: true },
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

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-4 p-3 panel-glass rounded-lg">
          <span className="material-symbols-outlined text-outline">search</span>
          <input
            type="text"
            placeholder="Search cases by ID, examiner, or tag..."
            className="flex-grow bg-transparent font-data-value text-data-value text-on-surface placeholder:text-outline focus:outline-none"
          />
          <button className="font-data-label text-data-label text-primary hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
            Filter
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 font-data-label text-data-label text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Case ID</div>
          <div className="col-span-4 hidden md:block">Title</div>
          <div className="col-span-2 hidden md:block">Examiner</div>
          <div className="col-span-2">Status</div>
        </div>

        {/* Archive Entries */}
        <div className="flex flex-col gap-2">
          {archiveEntries.map((entry, i) => (
            <div
              key={entry.id}
              className="glass-panel grid grid-cols-12 gap-4 p-4 items-center rounded group cursor-pointer"
              onClick={() => navigate('/analysis/result')}
            >
              <div className="col-span-1">
                <span className="font-data-label text-data-label text-outline">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="col-span-3 md:col-span-3">
                <div className="font-data-value text-data-value text-primary-fixed-dim font-bold">{entry.id}</div>
                <div className="font-data-label text-data-label text-outline text-[10px]">{entry.date}</div>
              </div>
              <div className="col-span-5 md:col-span-4 hidden md:block">
                <div className="font-body-sm text-body-sm text-on-surface">{entry.title}</div>
                <span className="font-data-label text-data-label text-[10px] text-on-surface-variant">{entry.tag}</span>
              </div>
              <div className="col-span-2 hidden md:block">
                <span className="font-data-label text-data-label text-on-surface-variant">{entry.examiner}</span>
              </div>
              <div className="col-span-8 md:col-span-2 flex items-center justify-between">
                <span className={`font-data-label text-data-label ${entry.statusColor}`}>{entry.status}</span>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
