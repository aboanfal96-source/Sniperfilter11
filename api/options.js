// Yahoo Finance options chain proxy — robust version with multiple fallbacks
// Yahoo aggressively blocks datacenter IPs, so we try many approaches
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { symbol = 'AAPL', date, debug } = req.query;
  const sym = String(symbol).toUpperCase();
  const errors = [];

  // Modern realistic browser headers — these have higher pass rate
  const browserHeaders = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Origin': 'https://finance.yahoo.com',
    'Referer': `https://finance.yahoo.com/quote/${sym}/options`,
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
  };

  const qs = date ? `?date=${date}` : '';

  // Attempt 1-4: Try v7 endpoint on multiple Yahoo hosts
  const hosts = [
    'https://query1.finance.yahoo.com',
    'https://query2.finance.yahoo.com',
  ];

  for (const host of hosts) {
    try {
      const url = `${host}/v7/finance/options/${sym}${qs}`;
      const r = await fetch(url, { headers: browserHeaders });
      if (!r.ok) {
        errors.push(`${host} v7: HTTP ${r.status}`);
        continue;
      }
      const d = await r.json();
      if (!d?.optionChain?.result?.[0]) {
        errors.push(`${host} v7: no result in response`);
        continue;
      }
      const result = d.optionChain.result[0];
      if (!result.options || result.options.length === 0) {
        errors.push(`${host} v7: empty options array`);
        continue;
      }
      res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
      return res.status(200).json(d);
    } catch (e) {
      errors.push(`${host} v7: ${e.message}`);
    }
  }

  // Attempt 5: Try v6 endpoint as backup
  try {
    const url = `https://query1.finance.yahoo.com/v6/finance/options/${sym}${qs}`;
    const r = await fetch(url, { headers: browserHeaders });
    if (r.ok) {
      const d = await r.json();
      if (d?.optionChain?.result?.[0]?.options?.length) {
        res.setHeader('Cache-Control', 's-maxage=300');
        return res.status(200).json(d);
      }
      errors.push(`v6: empty result`);
    } else {
      errors.push(`v6: HTTP ${r.status}`);
    }
  } catch (e) {
    errors.push(`v6: ${e.message}`);
  }

  // All failed — return clear error
  return res.status(503).json({
    error: 'options_unavailable',
    symbol: sym,
    reason: 'Yahoo Finance blocked the request from server. This is a known limitation when deployed on shared hosting (Vercel/Netlify). Options data works locally but may be rate-limited from datacenter IPs.',
    attempts: errors,
    suggestion: 'Try again in a few minutes, or this symbol may not have options chains.',
    debug: debug === '1' ? errors : undefined,
  });
}
