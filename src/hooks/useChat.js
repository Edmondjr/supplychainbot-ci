import { useState, useCallback, useRef } from 'react';
import { streamChatMessage, buildMessageHistory } from '../services/claudeApi';

export function useChat(mode) {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sources, setSources] = useState([]);
  const abortRef = useRef(false);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isStreaming) return;

    const userMessage = { id: Date.now(), role: 'user', content: text };
    const assistantId = Date.now() + 1;

    setMessages(prev => [...prev, userMessage, {
      id: assistantId,
      role: 'assistant',
      content: '',
      streaming: true,
    }]);
    setSources([]);
    setIsStreaming(true);
    abortRef.current = false;

    const history = buildMessageHistory([...messages, userMessage]);

    let accumulated = '';

    await streamChatMessage({
      mode,
      messages: history,
      onDelta: (delta) => {
        if (abortRef.current) return;
        accumulated += delta;
        setMessages(prev => prev.map(m =>
          m.id === assistantId ? { ...m, content: accumulated } : m
        ));
      },
      onSources: (newSources) => {
        setSources(newSources);
      },
      onDone: () => {
        setMessages(prev => prev.map(m =>
          m.id === assistantId ? { ...m, streaming: false } : m
        ));
        setIsStreaming(false);
      },
      onError: (err) => {
        const errorText = `**Erreur:** ${err.message || 'Une erreur est survenue.'}`;
        setMessages(prev => prev.map(m =>
          m.id === assistantId ? { ...m, content: errorText, streaming: false, error: true } : m
        ));
        setIsStreaming(false);
      },
    });
  }, [messages, mode, isStreaming]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setSources([]);
  }, []);

  const prefillMessage = useCallback((text) => {
    sendMessage(text);
  }, [sendMessage]);

  return { messages, isStreaming, sources, sendMessage, clearChat, prefillMessage };
}
