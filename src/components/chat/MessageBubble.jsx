import ReactMarkdown from 'react-markdown';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end px-4 py-2 animate-fade-in">
        <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-br-sm text-sm"
          style={{
            background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
            color: 'white',
            lineHeight: '1.6',
          }}>
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-3 px-4 py-2 animate-fade-in">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 self-start mt-1"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
        SC
      </div>
      <div className="flex-1 min-w-0">
        <div className="max-w-[90%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm"
          style={{
            background: '#111d35',
            border: message.error
              ? '1px solid rgba(239,68,68,0.3)'
              : '1px solid rgba(59,130,246,0.15)',
            color: message.error ? '#fca5a5' : '#e2e8f0',
          }}>
          <div className="markdown-content">
            <ReactMarkdown>{message.content || '​'}</ReactMarkdown>
          </div>
          {message.streaming && message.content && (
            <span className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
              style={{ background: '#3b82f6' }} />
          )}
        </div>
      </div>
    </div>
  );
}
