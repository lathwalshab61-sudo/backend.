import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/analysis', label: 'Analysis', icon: 'biotech' },
  { to: '/comparison', label: 'Comparison', icon: 'compare' },
  { to: '/academy', label: 'Academy', icon: 'school' },
];

export default function TopBar() {
  const navigate = useNavigate();

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

      {/* Profile */}
      <div className="flex items-center gap-gutter cursor-pointer hover:bg-primary/10 transition-colors p-2 rounded">
        <span className="font-data-label text-data-label text-on-surface-variant hidden md:block">
          Investigator Profile
        </span>
        <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant/30">
          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '18px' }}>
            person
          </span>
        </div>
      </div>
    </header>
  );
}
