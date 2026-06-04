export async function streamChatMessage({ mode, messages, onDelta, onSources, onDone, onError }) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, mode }),
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur: ${response.status} ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep the incomplete trailing line

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (!raw) continue;
        try {
          const event = JSON.parse(raw);
          if (event.type === 'delta') onDelta?.(event.text);
          else if (event.type === 'sources') onSources?.(event.sources);
          else if (event.type === 'done') onDone?.();
          else if (event.type === 'error') onError?.(new Error(event.message));
        } catch {
          // skip malformed SSE line
        }
      }
    }
  } catch (err) {
    onError?.(err);
  }
}

export function buildMessageHistory(chatMessages) {
  return chatMessages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role, content: m.content }));
}
