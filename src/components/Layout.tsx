import { NavLink, Outlet } from 'react-router-dom';
import ConnectionStatus from './ConnectionStatus';

const navItems = [
  { to: '/', label: 'Home', icon: '⛳' },
  { to: '/calendar', label: 'Calendar', icon: '📅' },
  { to: '/dashboard', label: 'Stats', icon: '📊' },
  { to: '/references', label: 'Drills', icon: '📖' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Layout() {
  return (
    <div className="flex flex-col h-full bg-gray-900">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between safe-top">
        <h1 className="text-lg font-bold tracking-tight text-green-400">Full Swing</h1>
        <ConnectionStatus />
      </header>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <nav className="shrink-0 bg-gray-900 border-t border-gray-800 safe-bottom">
        <div className="flex justify-around items-center h-14 max-w-lg mx-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 text-xs transition-colors ${
                  isActive ? 'text-green-400 font-semibold' : 'text-gray-300'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
