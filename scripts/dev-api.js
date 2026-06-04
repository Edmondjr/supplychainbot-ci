/**
 * Minimal local dev server that mirrors api/chat.js for use with `npm run dev`.
 * Run: node scripts/dev-api.js
 * Requires: ANTHROPIC_API_KEY in .env (loaded via --env-file flag or dotenv)
 */
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Load .env manually (no dotenv dependency needed)
const __dir = dirname(fileURLToPath(import.meta.url));
try {
  const envPath = join(__dir, '..', '.env');
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key && rest.length > 0) process.env[key.trim()] = rest.join('=').trim();
  }
} catch {
  // .env not found — rely on shell environment
}

const PORT = 3001;

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(200); return res.end(); }
  if (req.url !== '/api/chat' || req.method !== 'POST') {
    res.writeHead(404);
    return res.end('Not found');
  }

  let body = '';
  for await (const chunk of req) body += chunk;

  try {
    req.body = JSON.parse(body);
  } catch {
    res.writeHead(400);
    return res.end('Invalid JSON');
  }

  // Dynamically import the Vercel handler
  const { default: handler } = await import('../api/chat.js');
  await handler(req, res);
});

server.listen(PORT, () => {
  console.log(`\n  Dev API server → http://localhost:${PORT}\n  Proxied by Vite at /api/chat\n`);
});
