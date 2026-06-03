import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: '⬛', label: 'Tableau de bord' },
  { to: '/chat', icon: '💬', label: 'Assistant IA' },
];

const quickTopics = [
  'Surestaries',
  'Port d\'Abidjan',
  'Incoterms',
  'GUCE',
  'Tarifs douaniers',
];

export default function Sidebar() {
  return (
    <aside className="w-60 flex-shrink-0 flex flex-col"
      style={{ background: '#0d1526', borderRight: '1px solid rgba(59,130,246,0.1)', minHeight: '100vh' }}>
      <div className="p-4 pt-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#475569' }}>Navigation</p>
        <nav className="flex flex-col gap-1">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-all ${
                  isActive
                    ? 'text-blue-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`
              }
              style={({ isActive }) => isActive ? {
                background: 'rgba(59,130,246,0.12)',
                border: '1px solid rgba(59,130,246,0.2)',
              } : {}}>
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 mt-2">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#475569' }}>Sujets fréquents</p>
        <div className="flex flex-col gap-1">
          {quickTopics.map(topic => (
            <span key={topic}
              className="text-xs px-3 py-1.5 rounded-md cursor-default"
              style={{ background: 'rgba(59,130,246,0.06)', color: '#64748b', border: '1px solid rgba(59,130,246,0.08)' }}>
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-lg p-3 text-center"
          style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.1)' }}>
          <div className="text-xs font-semibold mb-1" style={{ color: '#60a5fa' }}>NexaBridge Solutions</div>
          <div className="text-xs" style={{ color: '#475569' }}>Intelligence Supply Chain</div>
        </div>
      </div>
    </aside>
  );
}
