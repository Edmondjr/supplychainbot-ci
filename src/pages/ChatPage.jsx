import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import ChatWindow from '../components/chat/ChatWindow';
import { useChat } from '../hooks/useChat';

const MODES = ['Formation', 'Veille', 'Calcul'];

const MODE_META = {
  Formation: { icon: '🎓', desc: 'Apprentissage guidé — Incoterms, GUCE, procédures', color: '#8b5cf6' },
  Veille: { icon: '🔍', desc: 'Actualités en temps réel avec sources vérifiées', color: '#3b82f6' },
  Calcul: { icon: '🧮', desc: 'Calcul de surestaries, droits de douane, coûts Incoterms', color: '#f59e0b' },
};

export default function ChatPage() {
  const [mode, setMode] = useState('Formation');
  const { messages, isStreaming, sources, sendMessage, clearChat, prefillMessage } = useChat(mode);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const location = useLocation();
  const prefillHandled = useRef(false);

  useEffect(() => {
    if (location.state?.prefill && !prefillHandled.current) {
      prefillHandled.current = true;
      if (location.state.mode) setMode(location.state.mode);
      setTimeout(() => prefillMessage(location.state.prefill), 100);
    }
  }, [location.state, prefillMessage]);

  function handleSend() {
    if (!input.trim() || isStreaming) return;
    sendMessage(input.trim());
    setInput('');
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const handleModeChange = useCallback((newMode) => {
    setMode(newMode);
    clearChat();
  }, [clearChat]);

  const meta = MODE_META[mode];

  return (
    <div className="flex flex-col h-full">
      {/* Mode Selector */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3"
        style={{ borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#475569' }}>Mode</span>
          {messages.length > 0 && (
            <button onClick={clearChat}
              className="ml-auto text-xs px-2 py-1 rounded cursor-pointer transition-all"
              style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.15)' }}>
              Effacer la conversation
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {MODES.map(m => {
            const active = mode === m;
            const meta = MODE_META[m];
            return (
              <button key={m} onClick={() => handleModeChange(m)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all"
                style={{
                  background: active ? `${meta.color}18` : 'rgba(255,255,255,0.03)',
                  border: active ? `1px solid ${meta.color}40` : '1px solid rgba(255,255,255,0.06)',
                  color: active ? meta.color : '#64748b',
                }}>
                <span>{meta.icon}</span>
                {m}
              </button>
            );
          })}
        </div>
        <p className="text-xs mt-2" style={{ color: '#475569' }}>
          {meta.icon} {meta.desc}
        </p>
      </div>

      {/* Messages */}
      <ChatWindow messages={messages} isStreaming={isStreaming} sources={sources} />

      {/* Input Bar */}
      <div className="flex-shrink-0 p-4"
        style={{ borderTop: '1px solid rgba(59,130,246,0.1)' }}>
        <div className="flex gap-3 items-end rounded-xl px-4 py-3"
          style={{ background: '#111d35', border: '1px solid rgba(59,130,246,0.2)' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Posez votre question en mode ${mode}…`}
            rows={1}
            disabled={isStreaming}
            className="flex-1 resize-none bg-transparent text-sm outline-none leading-relaxed"
            style={{
              color: '#e2e8f0',
              maxHeight: '120px',
              overflowY: 'auto',
              placeholderColor: '#475569',
            }}
          />
          <button onClick={handleSend} disabled={isStreaming || !input.trim()}
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white' }}>
            {isStreaming ? (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : '↑'}
          </button>
        </div>
        <p className="text-xs text-center mt-2" style={{ color: '#334155' }}>
          Entrée pour envoyer · Maj+Entrée pour nouvelle ligne
        </p>
      </div>
    </div>
  );
}
