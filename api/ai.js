// Claude API proxy — robust version with structured error handling
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, errorMsg: 'Method not allowed' });
  }

  const { prompt, max_tokens = 1500, model = 'claude-sonnet-4-20250514' } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ ok: false, errorMsg: 'No prompt provided' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      ok: false,
      errorMsg: 'ANTHROPIC_API_KEY غير مضبوط في Vercel — اذهب لـ Settings → Environment Variables',
    });
  }
  if (!apiKey.startsWith('sk-ant-')) {
    return res.status(500).json({
      ok: false,
      errorMsg: 'مفتاح API غير صحيح الصيغة (يجب أن يبدأ بـ sk-ant-)',
    });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const d = await r.json();

    // Anthropic returned an error
    if (!r.ok || d.type === 'error') {
      const errType = d?.error?.type || 'api_error';
      const errMsg = d?.error?.message || `HTTP ${r.status}`;
      let userMsg = `Claude API: ${errMsg}`;
      if (errType === 'authentication_error' || r.status === 401) {
        userMsg = 'مفتاح Claude API غير صحيح أو منتهي — أعد توليد مفتاح جديد';
      } else if (errType === 'rate_limit_error' || r.status === 429) {
        userMsg = 'تم تجاوز الحد المسموح — انتظر دقيقة وأعد المحاولة';
      } else if (errType === 'overloaded_error' || r.status === 529) {
        userMsg = 'خوادم Claude مشغولة حالياً — أعد المحاولة بعد قليل';
      } else if (errType === 'not_found_error') {
        userMsg = `النموذج ${model} غير متاح. جرّب claude-sonnet-4-20250514`;
      } else if (errType === 'permission_error') {
        userMsg = 'مفتاح API لا يملك صلاحية الوصول — تحقق من إعدادات Anthropic Console';
      } else if (errType === 'invalid_request_error') {
        userMsg = 'طلب غير صالح: ' + errMsg;
      }
      return res.status(200).json({ ok: false, errorMsg: userMsg, raw: d });
    }

    // Extract text from content blocks (skip non-text blocks safely)
    const blocks = Array.isArray(d.content) ? d.content : [];
    const text = blocks
      .filter(b => b && b.type === 'text' && typeof b.text === 'string')
      .map(b => b.text)
      .join('\n')
      .trim();

    if (!text) {
      return res.status(200).json({ ok: false, errorMsg: 'استجابة فارغة من Claude', raw: d });
    }

    return res.status(200).json({
      ok: true,
      text,
      model: d.model,
      usage: d.usage,
    });
  } catch (e) {
    return res.status(500).json({ ok: false, errorMsg: 'فشل الاتصال بـ Claude: ' + e.message });
  }
}
