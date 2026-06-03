/**
 * Extracts web search result citations from Claude tool use content blocks.
 * Returns an array of { url, title, snippet } objects.
 */
export function parseSources(toolResults) {
  const sources = [];
  if (!Array.isArray(toolResults)) return sources;

  for (const block of toolResults) {
    if (block.type !== 'tool_result') continue;
    const content = Array.isArray(block.content) ? block.content : [];
    for (const item of content) {
      if (item.type !== 'text') continue;
      try {
        const parsed = JSON.parse(item.text);
        const results = parsed?.results || parsed?.organic_results || [];
        for (const r of results) {
          if (r.url || r.link) {
            sources.push({
              url: r.url || r.link,
              title: r.title || r.url || r.link,
              snippet: r.snippet || r.description || '',
            });
          }
        }
      } catch {
        // Not JSON — skip
      }
    }
  }

  return sources;
}

export function deduplicateSources(sources) {
  const seen = new Set();
  return sources.filter(s => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
}
