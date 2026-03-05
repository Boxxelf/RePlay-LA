const MODEL = 'claude-sonnet-4-20250514';
const API_URL = 'https://api.anthropic.com/v1/messages';

const SYSTEM_PROMPT =
  'You are a matching assistant for RePlay LA, connecting post-LA28 Olympics surplus materials to LA community organizations. ' +
  'When given an organization profile and a list of available materials, analyze how well each item fits the organization\'s specific programs, size, and type. ' +
  'Tailor your reasoning to the organization type (e.g. a youth sports program has different needs than a public school or food bank). ' +
  'Flag whether the available quantity is likely sufficient for the organization\'s stated scale. ' +
  'Return only valid JSON with this exact shape: { matches: [{ material, reason, fit_score, quantity, venue, sufficient_quantity }], summary }. ' +
  'fit_score is an integer 1–10. sufficient_quantity is a boolean. Include only the top 5 best-fit matches, ranked by fit_score descending.';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { orgProfile, availableMaterials } = body;
  if (!orgProfile || !availableMaterials) {
    return res.status(400).json({
      error: 'Missing orgProfile or availableMaterials in request body',
    });
  }

  const userMessage =
    `Organization profile:\n${JSON.stringify(orgProfile, null, 2)}\n\n` +
    `Available materials:\n${JSON.stringify(availableMaterials, null, 2)}\n\n` +
    `Return only valid JSON with the shape { matches: [{ material, reason, fit_score, quantity, venue, sufficient_quantity }], summary }.`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const msg = err.error?.message || `API error ${response.status}`;
      return res.status(response.status >= 500 ? 502 : 400).json({ error: msg });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(502).json({ error: 'No JSON in Claude response' });
    }

    const result = JSON.parse(jsonMatch[0]);
    return res.status(200).json(result);
  } catch (e) {
    console.error('[api/match]', e);
    return res.status(500).json({
      error: e.message || 'Failed to call Claude API',
    });
  }
}
