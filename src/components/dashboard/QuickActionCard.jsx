import { useNavigate } from 'react-router-dom';

export default function QuickActionCard({ title, description, icon, prompt, mode = 'Formation', accentColor = '#3b82f6' }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/chat', { state: { prefill: prompt, mode } });
  }

  return (
    <button onClick={handleClick}
      className="text-left rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition-all w-full"
      style={{
        background: '#0d1526',
        border: `1px solid rgba(59,130,246,0.12)`,
        outline: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accentColor}40`;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 24px ${accentColor}15`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.12)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
        style={{ background: `${accentColor}18` }}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold mb-1" style={{ color: '#e2e8f0' }}>{title}</div>
        <div className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{description}</div>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium mt-auto"
        style={{ color: accentColor }}>
        Démarrer <span>→</span>
      </div>
    </button>
  );
}
