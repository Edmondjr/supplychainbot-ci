import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export default function Login() {
  const { user, loading, authError, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: '#0a0f1e' }}>
      <div className="w-full max-w-sm rounded-2xl p-8"
        style={{ background: '#0d1526', border: '1px solid rgba(59,130,246,0.15)' }}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
            SC
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ color: '#f1f5f9' }}>
            SupplyChainBot CI
          </h1>
          <p className="text-sm" style={{ color: '#64748b' }}>NexaBridge Solutions</p>
        </div>

        <div className="mb-6">
          <h2 className="text-base font-semibold mb-1 text-center" style={{ color: '#e2e8f0' }}>
            Connexion
          </h2>
          <p className="text-xs text-center" style={{ color: '#64748b' }}>
            Accédez à votre assistant supply chain
          </p>
        </div>

        {authError && (
          <div className="mb-4 p-3 rounded-lg text-xs" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
            {authError}
          </div>
        )}

        <button onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#e2e8f0',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
            <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
          </svg>
          Continuer avec Google
        </button>

        <p className="text-xs text-center mt-6" style={{ color: '#334155' }}>
          En vous connectant, vous acceptez les conditions d&apos;utilisation de NexaBridge Solutions.
        </p>
      </div>
    </div>
  );
}
