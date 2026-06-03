export default function SourceCard({ source, index }) {
  const hostname = (() => {
    try { return new URL(source.url).hostname.replace('www.', ''); } catch { return source.url; }
  })();

  return (
    <a href={source.url} target="_blank" rel="noopener noreferrer"
      className="block no-underline flex-shrink-0 w-56 rounded-xl p-3 transition-all hover:-translate-y-0.5"
      style={{
        background: '#111d35',
        border: '1px solid rgba(59,130,246,0.2)',
        textDecoration: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)'}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-xs font-bold rounded px-1.5 py-0.5"
          style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa' }}>
          {index + 1}
        </span>
        <span className="text-xs truncate" style={{ color: '#60a5fa' }}>{hostname}</span>
        <span className="ml-auto text-xs" style={{ color: '#475569' }}>↗</span>
      </div>
      <p className="text-xs font-medium leading-snug mb-1 line-clamp-2" style={{ color: '#e2e8f0' }}>
        {source.title}
      </p>
      {source.snippet && (
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#64748b' }}>
          {source.snippet}
        </p>
      )}
    </a>
  );
}
