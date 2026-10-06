import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { defaultArchiveCases } from '../constants/data';
import { getCases } from '../services/api';

export default function InvestigatorArchive() {
  const navigate = useNavigate();
  const [cases, setCases] = useState(defaultArchiveCases);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadCases() {
      const data = await getCases();
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setCases(data);
      }
    }
    loadCases();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCases = cases.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      (c.id && c.id.toLowerCase().includes(q)) ||
      (c.title && c.title.toLowerCase().includes(q)) ||
      (c.examiner && c.examiner.toLowerCase().includes(q)) ||
      (c.tag && c.tag.toLowerCase().includes(q)) ||
      (c.status && c.status.toLowerCase().includes(q))
    );
  });

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases by ID, examiner, or tag..."
            className="flex-grow bg-transparent font-data-value text-data-value text-on-surface placeholder:text-outline focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-outline hover:text-on-surface text-xs font-data-label"
            >
              Clear
            </button>
          )}
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
          {filteredCases.length === 0 ? (
            <div className="p-8 text-center panel-glass rounded-lg text-on-surface-variant">
              No matching cases found for "{searchQuery}".
            </div>
          ) : (
            filteredCases.map((entry, i) => (
              <div
                key={entry.id}
                className="glass-panel grid grid-cols-12 gap-4 p-4 items-center rounded group cursor-pointer hover:border-primary/40 transition-colors"
                onClick={() =>
                  navigate('/analysis/result', {
                    state: {
                      analysisData: {
                        caseId: entry.id,
                        patternType: entry.tag || 'Loop (Ulnar)',
                        status: entry.status?.toLowerCase() === 'verified' ? 'verified' : 'pending',
                      },
                    },
                  })
                }
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
                  <span className={`font-data-label text-data-label ${entry.statusColor || 'text-primary'}`}>
                    {entry.status}
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
