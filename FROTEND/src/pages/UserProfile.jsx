import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [saveMsg, setSaveMsg] = useState('');

  const apiBase = (
    import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://forensic-1-2.onrender.com' : '')
  ).replace(/\/+$/, '');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token && !storedUser) {
      navigate('/login');
      return;
    }

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setName(parsed.name || '');
        setOrganization(parsed.organization || '');
        setRole(parsed.role || 'Forensic Investigator');
      } catch (e) {
        console.error(e);
      }
    }

    // Refresh profile from API
    if (token) {
      fetch(`${apiBase}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.user) {
            setUser(data.user);
            setName(data.user.name || '');
            setOrganization(data.user.organization || '');
            setRole(data.user.role || 'Forensic Investigator');
            localStorage.setItem('user', JSON.stringify(data.user));
          }
        })
        .catch(() => {});
    }
  }, [navigate, apiBase]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaveMsg('');
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const res = await fetch(`${apiBase}/api/auth/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, organization, role }),
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
          setSaveMsg('✅ Profile updated successfully!');
          setIsEditing(false);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Fallback local update
    const updated = { ...user, name, organization, role };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    setSaveMsg('✅ Profile updated locally!');
    setIsEditing(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  const stats = user.quizStats || {
    testsCompleted: 0,
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    highestPercentage: 0,
  };

  const accuracy =
    stats.totalQuestionsAnswered > 0
      ? Math.round((stats.correctAnswers / stats.totalQuestionsAnswered) * 100)
      : 0;

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pt-16 pb-24 md:pb-0">
      <main className="flex-grow flex flex-col px-margin-page py-container-padding gap-gutter w-full max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-6 mb-2">
          <div>
            <h1 className="font-display-lg text-display-lg">Investigator Profile &amp; Dashboard</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Digital identity credentials and forensic examination records.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded ghost-border bg-surface-container-low text-on-surface hover:text-primary transition-colors font-data-label text-data-label flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">edit</span>
              {isEditing ? 'Cancel Edit' : 'Edit Credentials'}
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded bg-error/15 border border-error/30 text-error hover:bg-error/25 transition-colors font-data-label text-data-label flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              Sign Out
            </button>
          </div>
        </div>

        {saveMsg && (
          <div className="p-3 bg-primary/10 border border-primary/30 rounded text-primary text-sm font-data-value">
            {saveMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column — Digital Forensic ID Badge */}
          <div className="lg:col-span-5 flex flex-col gap-gutter">
            <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-surface-container-highest via-surface-container to-surface-container-low border border-primary/30 shadow-2xl flex flex-col gap-6">
              {/* Top Badge Header */}
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-2xl">shield</span>
                  <span className="font-data-label text-xs uppercase tracking-widest font-bold">
                    OFFICIAL FORENSIC IDENTIFIER
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              </div>

              {/* Photo & Identity */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-surface-variant border-2 border-primary/40 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-primary">fingerprint</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight">
                    {user.name}
                  </h2>
                  <span className="font-data-label text-xs text-primary">{user.role}</span>
                  <span className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    {user.organization}
                  </span>
                </div>
              </div>

              {/* ID Data Grid */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-surface-container-lowest/80 rounded-lg border border-outline-variant/20 font-data-label text-xs">
                <div>
                  <span className="text-on-surface-variant block uppercase text-[10px]">Badge ID</span>
                  <span className="text-primary font-bold text-sm">{user.badgeNumber || 'FS-2026'}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block uppercase text-[10px]">Clearance</span>
                  <span className="text-on-surface font-bold text-sm">LEVEL 4 · FORENSIC</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block uppercase text-[10px]">Registered Email</span>
                  <span className="text-on-surface truncate block">{user.email}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block uppercase text-[10px]">Status</span>
                  <span className="text-primary font-bold">ACTIVE EXAMINER</span>
                </div>
              </div>

              {/* Barcode & Fingerprint Hologram */}
              <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4 opacity-75">
                <div className="font-mono text-[9px] text-outline tracking-widest">
                  ||| | ||||| || |||| ||| |||| |
                </div>
                <span className="text-[10px] font-data-label text-primary">FINGERSCOPE LAB NETWORK</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-panel p-4 rounded-xl flex flex-col gap-2">
              <button
                onClick={() => navigate('/academy/quiz')}
                className="w-full py-2.5 bg-primary text-on-primary rounded font-data-value text-sm hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">quiz</span>
                Take Fingerprint Quiz
              </button>
              <button
                onClick={() => navigate('/academy/archive')}
                className="w-full py-2.5 ghost-border text-on-surface rounded font-data-value text-sm hover:bg-surface-variant transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">folder_open</span>
                Explore 37 Case Studies
              </button>
            </div>
          </div>

          {/* Right Column — Stats & Profile Editor */}
          <div className="lg:col-span-7 flex flex-col gap-gutter">
            {/* Examination Training Metrics */}
            <div className="glass-panel p-6 rounded-xl flex flex-col gap-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant/15 pb-2">
                Dactyloscopy Training &amp; Quiz Metrics
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="ghost-border p-4 rounded-lg bg-surface-container-low text-center">
                  <span className="font-display-md text-display-md text-primary font-bold block">
                    {stats.testsCompleted || 0}
                  </span>
                  <span className="font-data-label text-[10px] uppercase text-on-surface-variant">
                    Exams Completed
                  </span>
                </div>

                <div className="ghost-border p-4 rounded-lg bg-surface-container-low text-center">
                  <span className="font-display-md text-display-md text-secondary font-bold block">
                    {stats.totalQuestionsAnswered || 0}
                  </span>
                  <span className="font-data-label text-[10px] uppercase text-on-surface-variant">
                    Questions Answered
                  </span>
                </div>

                <div className="ghost-border p-4 rounded-lg bg-surface-container-low text-center">
                  <span className="font-display-md text-display-md text-tertiary font-bold block">
                    {accuracy}%
                  </span>
                  <span className="font-data-label text-[10px] uppercase text-on-surface-variant">
                    Overall Accuracy
                  </span>
                </div>

                <div className="ghost-border p-4 rounded-lg bg-surface-container-low text-center">
                  <span className="font-display-md text-display-md text-primary-fixed-dim font-bold block">
                    {stats.highestPercentage || 0}%
                  </span>
                  <span className="font-data-label text-[10px] uppercase text-on-surface-variant">
                    Top Score
                  </span>
                </div>
              </div>

              <div className="mt-2 p-4 rounded-lg bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
                <div>
                  <h4 className="font-data-value text-data-value text-on-surface">Examiner Accreditation Rank</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    {stats.testsCompleted > 5 && accuracy >= 80
                      ? 'Certified Senior Latent Print Examiner (Level III)'
                      : stats.testsCompleted > 0
                      ? 'Apprentice Friction Ridge Analyst (Level I)'
                      : 'Candidate Examiner — Complete quizzes to rank up'}
                  </p>
                </div>
                <span className="material-symbols-outlined text-3xl text-primary">military_tech</span>
              </div>
            </div>

            {/* Profile Editor Form */}
            {isEditing && (
              <form onSubmit={handleSaveProfile} className="glass-panel p-6 rounded-xl flex flex-col gap-4 animate-fadeIn">
                <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant/15 pb-2">
                  Edit Investigator Details
                </h3>

                <div>
                  <label className="font-data-label text-xs text-on-surface-variant block mb-1 uppercase">
                    Examiner Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-data-label text-xs text-on-surface-variant block mb-1 uppercase">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-data-label text-xs text-on-surface-variant block mb-1 uppercase">
                    Agency, Laboratory, or University
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full p-3 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 bg-primary text-on-primary rounded font-data-value text-data-value hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 cursor-pointer shadow mt-2"
                >
                  <span className="material-symbols-outlined text-base">save</span>
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
