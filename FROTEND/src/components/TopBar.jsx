import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/analysis', label: 'Analysis', icon: 'biotech' },
  { to: '/comparison', label: 'Comparison', icon: 'compare' },
  { to: '/academy/archive', label: 'Cases', icon: 'folder_open' },
  { to: '/academy/quiz', label: 'Quiz (100 Qs)', icon: 'quiz' },
  { to: '/academy', label: 'Academy', icon: 'school' },
];

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 w-full bg-surface-container/60 backdrop-blur-md border-b border-outline-variant/10 flex items-center justify-between px-margin-page h-16 z-50">
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-gutter cursor-pointer hover:bg-primary/10 transition-colors p-2 rounded focus:outline-none"
      >
        <span
          className="material-symbols-outlined text-primary filled"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          fingerprint
        </span>
        <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary">
          FINGERSCOPE AI
        </span>
      </button>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-margin-page items-center">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2 cursor-pointer transition-colors pb-1 font-data-label text-data-label ${
                isActive
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {icon}
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profile / Auth CTA */}
      {currentUser ? (
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 cursor-pointer hover:bg-primary/10 transition-colors p-1.5 px-3 rounded-full border border-primary/30 bg-surface-variant/50 focus:outline-none"
        >
          <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="font-data-label text-data-label text-on-surface hidden md:block max-w-[130px] truncate">
            {currentUser.name}
          </span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-data-label text-data-label hover:bg-primary-fixed transition-colors cursor-pointer shadow"
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            <span>Sign In</span>
          </button>
        </div>
      )}
    </header>
  );
}
