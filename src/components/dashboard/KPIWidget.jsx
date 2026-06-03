export default function KPIWidget({ title, value, unit, trend, icon, color = '#3b82f6' }) {
  const trendPositive = trend && !trend.startsWith('-');

  return (
    <div className="rounded-xl p-5 flex flex-col gap-3"
      style={{ background: '#0d1526', border: '1px solid rgba(59,130,246,0.12)' }}>
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: '#64748b' }}>{title}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <span className="text-2xl font-bold" style={{ color }}>{value}</span>
        {unit && <span className="text-sm ml-1.5" style={{ color: '#64748b' }}>{unit}</span>}
      </div>
      {trend && (
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium"
            style={{ color: trendPositive ? '#34d399' : '#f87171' }}>
            {trendPositive ? '▲' : '▼'} {trend}
          </span>
          <span className="text-xs" style={{ color: '#475569' }}>vs mois dernier</span>
        </div>
      )}
    </div>
  );
}
