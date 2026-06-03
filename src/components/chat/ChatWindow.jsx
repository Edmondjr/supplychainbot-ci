import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SourceCard from './SourceCard';

export default function ChatWindow({ messages, isStreaming, sources }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const isTyping = isStreaming && messages.length > 0 &&
    messages[messages.length - 1]?.role === 'assistant' &&
    messages[messages.length - 1]?.content === '';

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
          SC
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: '#e2e8f0' }}>
            Comment puis-je vous aider ?
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            Posez vos questions sur la supply chain, le Port d&apos;Abidjan, les Incoterms ou le GUCE.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto py-4">
      {messages.map(msg => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {isTyping && <TypingIndicator />}

      {sources.length > 0 && (
        <div className="px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>
            Sources ({sources.length})
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {sources.map((source, i) => (
              <SourceCard key={source.url + i} source={source} index={i} />
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
