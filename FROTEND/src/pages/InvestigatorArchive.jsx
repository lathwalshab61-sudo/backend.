import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { defaultArchiveCases } from '../constants/data';
import { getCases } from '../services/api';

export default function InvestigatorArchive() {
  const navigate = useNavigate();
  const [cases, setCases] = useState(defaultArchiveCases);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');

  // Add Case Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCaseId, setNewCaseId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newExaminer, setNewExaminer] = useState('');
  const [newTag, setNewTag] = useState('Fingerprints · AFIS');
  const [newChapter, setNewChapter] = useState('Chapter Study');
  const [newSummary, setNewSummary] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newStatus, setNewStatus] = useState('Verified');
  const [modalLoading, setModalLoading] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  const apiBase = (
    import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://forensic-1-2.onrender.com' : '')
  ).replace(/\/+$/, '');

  const loadCases = async () => {
    const data = await getCases();
    if (data && Array.isArray(data) && data.length > 0) {
      setCases(data);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const handleCreateCase = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setModalMsg('');

    try {
      const res = await fetch(`${apiBase}/api/cases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: newCaseId,
          title: newTitle,
          examiner: newExaminer || 'Forensic Examiner',
          tag: newTag,
          chapter: newChapter,
          summary: newSummary,
          notes: newNotes,
          status: newStatus,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save case.');
      }
      setModalMsg('✅ Case added successfully!');
      setTimeout(() => {
        setShowAddModal(false);
        setNewCaseId('');
        setNewTitle('');
        setNewExaminer('');
        setNewSummary('');
        setNewNotes('');
        setModalMsg('');
        loadCases();
      }, 700);
    } catch (err) {
      setModalMsg('❌ Error: ' + err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const disciplines = [
    'All',
    'Fingerprints',
    'DNA',
    'Toxicology',
    'Trace Evidence',
    'Bloodstain',
    'Ballistics',
    'Crime Scene',
  ];

  const filteredCases = cases.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (c.id && c.id.toLowerCase().includes(q)) ||
      (c.title && c.title.toLowerCase().includes(q)) ||
      (c.examiner && c.examiner.toLowerCase().includes(q)) ||
      (c.tag && c.tag.toLowerCase().includes(q)) ||
      (c.chapter && c.chapter.toLowerCase().includes(q)) ||
      (c.summary && c.summary.toLowerCase().includes(q)) ||
      (c.status && c.status.toLowerCase().includes(q));

    if (selectedDiscipline === 'All') return matchesSearch;
    return matchesSearch && c.tag && c.tag.toLowerCase().includes(selectedDiscipline.toLowerCase());
  });

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pt-16 pb-24 md:pb-0">
      <main className="flex-grow flex flex-col px-margin-page py-container-padding gap-gutter w-full max-w-[1250px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="font-display-lg text-display-lg">Investigator's Case Archive</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Complete catalog of 37 textbook cases from Richard Saferstein's <em>Criminalistics</em> and ongoing laboratory examinations.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-primary text-on-primary rounded font-data-value text-data-value hover:bg-primary-fixed transition-colors flex items-center gap-2 cursor-pointer shadow-[0_4px_14px_0_rgba(76,215,246,0.3)] self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Add New Case Study</span>
          </button>
        </div>

        {/* Sub-nav */}
        <div className="flex gap-4 border-b border-outline-variant/20 pb-4 mb-2 overflow-x-auto">
          {[
            { label: 'Gallery', to: '/academy', icon: 'grid_view' },
            { label: 'Quiz Center (100 Qs)', to: '/academy/quiz', icon: 'quiz' },
            { label: 'Practice Drill', to: '/academy/practice', icon: 'sports_score' },
            { label: 'Timeline', to: '/academy/timeline', icon: 'timeline' },
            { label: 'Case Archive', to: '/academy/archive', icon: 'folder_open', active: true },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className={`flex items-center gap-2 font-data-label text-data-label px-3 py-2 rounded transition-colors whitespace-nowrap cursor-pointer ${
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

        {/* Filter Discipline Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="font-data-label text-xs uppercase text-outline flex items-center gap-1 mr-1">
            <span className="material-symbols-outlined text-sm">filter_list</span> Discipline:
          </span>
          {disciplines.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDiscipline(d)}
              className={`px-3 py-1 rounded-full font-data-label text-xs transition-colors cursor-pointer whitespace-nowrap ${
                selectedDiscipline === d
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
              }`}
            >
              {d}
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
            placeholder="Search 37 case studies by ID, title, chapter, or forensic tag (e.g., Night Stalker, Anthrax, AFIS)..."
            className="flex-grow bg-transparent font-data-value text-data-value text-on-surface placeholder:text-outline focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-outline hover:text-on-surface text-xs font-data-label cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 font-data-label text-data-label text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Case ID &amp; Chapter</div>
          <div className="col-span-5 hidden md:block">Title &amp; Forensic Focus</div>
          <div className="col-span-1 hidden md:block">Examiner</div>
          <div className="col-span-2 text-right">Status</div>
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
                key={entry.id || entry.caseId}
                className="glass-panel grid grid-cols-12 gap-4 p-4 items-center rounded-lg group cursor-pointer hover:border-primary/40 transition-all hover:-translate-y-0.5"
                onClick={() =>
                  navigate('/analysis/result', {
                    state: {
                      analysisData: {
                        caseId: entry.id || entry.caseId,
                        title: entry.title,
                        patternType: entry.tag || 'Loop (Ulnar)',
                        status: entry.status?.toLowerCase() === 'verified' ? 'verified' : 'pending',
                        qualityScore: 92,
                        confidence: '96%',
                        date: entry.date,
                        examiner: entry.examiner,
                        notes: entry.notes || entry.summary,
                        forensicFocus: entry.forensicFocus,
                        keyLesson: entry.keyLesson,
                      },
                    },
                  })
                }
              >
                <div className="col-span-1">
                  <span className="font-data-label text-data-label text-outline">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="col-span-3 md:col-span-3">
                  <div className="font-data-value text-data-value text-primary-fixed-dim font-bold">
                    {entry.id || entry.caseId}
                  </div>
                  <div className="font-data-label text-data-label text-outline text-[11px]">
                    {entry.chapter || entry.date}
                  </div>
                </div>
                <div className="col-span-6 md:col-span-5">
                  <div className="font-body-md text-body-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                    {entry.title}
                  </div>
                  <span className="font-data-label text-data-label text-[10px] text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20 mr-2">
                    {entry.tag}
                  </span>
                  {entry.keyLesson && (
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 line-clamp-1 hidden sm:block">
                      <strong>Lesson:</strong> {entry.keyLesson}
                    </p>
                  )}
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className="font-data-label text-data-label text-on-surface-variant text-xs truncate block">
                    {entry.examiner}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <span
                    className={`font-data-label text-xs px-2 py-0.5 rounded border ${
                      entry.status === 'Verified'
                        ? 'text-primary border-primary/30 bg-primary/10'
                        : entry.status === 'Anomaly'
                        ? 'text-error border-error/30 bg-error/10'
                        : 'text-secondary border-secondary/30 bg-secondary/10'
                    }`}
                  >
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

      {/* Add New Case Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl w-full max-w-lg border border-primary/30 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">post_add</span>
                Add New Case Study
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {modalMsg && (
              <div className="p-3 bg-surface-container-low border border-outline-variant/30 rounded text-sm font-data-value text-on-surface">
                {modalMsg}
              </div>
            )}

            <form onSubmit={handleCreateCase} className="flex flex-col gap-3 font-data-label text-xs">
              <div>
                <label className="text-on-surface-variant block mb-1 uppercase">Case ID *</label>
                <input
                  type="text"
                  required
                  value={newCaseId}
                  onChange={(e) => setNewCaseId(e.target.value)}
                  placeholder="e.g. CASE-BOOK-12 or CASE-2026-99"
                  className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-on-surface-variant block mb-1 uppercase">Case Study Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Madrid Bombing Detonator Bag Latent Print"
                  className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-on-surface-variant block mb-1 uppercase">Examiner / Author</label>
                  <input
                    type="text"
                    value={newExaminer}
                    onChange={(e) => setNewExaminer(e.target.value)}
                    placeholder="e.g. Richard Saferstein / State Lab"
                    className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-on-surface-variant block mb-1 uppercase">Chapter / Source</label>
                  <input
                    type="text"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    placeholder="e.g. Chapter 6"
                    className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-on-surface-variant block mb-1 uppercase">Discipline / Tag</label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="e.g. Fingerprints · Cyanoacrylate"
                    className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-on-surface-variant block mb-1 uppercase">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending Review">Pending Review</option>
                    <option value="Anomaly">Anomaly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-on-surface-variant block mb-1 uppercase">Case Summary</label>
                <textarea
                  rows="3"
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Summary of crime scene events, evidence recovered, and forensic methodology..."
                  className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-on-surface-variant block mb-1 uppercase">Forensic Focus &amp; Key Lessons</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Key scientific takeaways for students or investigators..."
                  className="w-full p-2.5 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={modalLoading}
                className="py-3 mt-2 bg-primary text-on-primary rounded font-data-value text-data-value hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_0_rgba(76,215,246,0.3)] disabled:opacity-50"
              >
                {modalLoading ? 'Saving to Database...' : 'Save Case Study to MongoDB'}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
