/**
 * Claude API 通过 Vercel serverless /api/match 调用，API key 仅保存在服务端。
 * 本地开发请使用 vercel dev 以同时运行前端与 API。
 */

export async function chat() {
  throw new Error('chat() is not implemented via API; use getMatches or add /api/chat');
}

export async function getMatches(orgProfile, availableMaterials) {
  const res = await fetch('/api/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orgProfile, availableMaterials }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `API error ${res.status}`);
  }

  return data;
}
