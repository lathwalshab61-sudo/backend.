import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/analysis', label: 'Analysis', icon: 'biotech' },
  { to: '/comparison', label: 'Comparison', icon: 'compare' },
  { to: '/academy', label: 'Academy', icon: 'school' },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-stack-sm px-4 pb-4 bg-surface-dim/90 backdrop-blur-xl border-t border-outline-variant/10 z-50">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center active:scale-95 transition-transform cursor-pointer w-16 ${
              isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <div className="bg-primary/20 px-3 py-0.5 rounded-full mb-0.5">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                </div>
              ) : (
                <span className="material-symbols-outlined text-[22px] mb-1">{icon}</span>
              )}
              <span className="font-data-label text-data-label text-[10px]">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
