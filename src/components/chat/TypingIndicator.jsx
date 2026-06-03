export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 px-4 py-2">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
        SC
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
        style={{ background: '#111d35', border: '1px solid rgba(59,130,246,0.15)' }}>
        {[0, 1, 2].map(i => (
          <span key={i} className="w-2 h-2 rounded-full inline-block"
            style={{
              background: '#3b82f6',
              animation: 'bounce-dot 1.2s infinite',
              animationDelay: `${i * 0.2}s`,
            }} />
        ))}
      </div>
    </div>
  );
}
