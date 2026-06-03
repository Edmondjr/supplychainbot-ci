import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6"
      style={{ background: 'rgba(10,15,30,0.95)', borderBottom: '1px solid rgba(59,130,246,0.15)', backdropFilter: 'blur(12px)' }}>

      <Link to="/" className="flex items-center gap-3 no-underline">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
          SC
        </div>
        <div>
          <div className="text-white font-semibold text-sm leading-tight">SupplyChainBot CI</div>
          <div className="text-xs" style={{ color: '#60a5fa' }}>NexaBridge Solutions</div>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <NavLink to="/" active={location.pathname === '/'}>Tableau de bord</NavLink>
        <NavLink to="/chat" active={location.pathname === '/chat'}>Assistant IA</NavLink>

        {user ? (
          <div className="flex items-center gap-3 ml-4">
            <div className="flex items-center gap-2">
              {user.photoURL && (
                <img src={user.photoURL} alt={user.displayName} className="w-7 h-7 rounded-full" />
              )}
              <span className="text-sm" style={{ color: '#94a3b8' }}>
                {user.displayName?.split(' ')[0] || user.email}
              </span>
            </div>
            <button onClick={logout}
              className="text-xs px-3 py-1.5 rounded-md cursor-pointer transition-all"
              style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>
              Déconnexion
            </button>
          </div>
        ) : (
          <Link to="/login"
            className="ml-4 text-xs px-3 py-1.5 rounded-md no-underline transition-all"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white' }}>
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link to={to}
      className="text-sm px-4 py-2 rounded-md no-underline transition-all"
      style={{
        color: active ? '#60a5fa' : '#94a3b8',
        background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
        border: active ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
      }}>
      {children}
    </Link>
  );
}
