// Diagnostic endpoint — visit /api/test to see what's working
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const sym = (req.query.symbol || 'AAPL').toUpperCase();
  const results = {
    symbol: sym,
    timestamp: new Date().toISOString(),
    server: 'Vercel',
    tests: {},
  };

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    'Accept': 'application/json,*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': `https://finance.yahoo.com/quote/${sym}`,
  };

  // Test 1: Chart API
  try {
    const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${sym}?range=1d&interval=5m`, { headers });
    const d = await r.json();
    results.tests.chart_api = {
      status: r.status,
      ok: r.ok,
      hasResult: !!d?.chart?.result?.[0],
      price: d?.chart?.result?.[0]?.meta?.regularMarketPrice,
      preMarket: d?.chart?.result?.[0]?.meta?.preMarketPrice,
    };
  } catch (e) {
    results.tests.chart_api = { error: e.message };
  }

  // Test 2: Options API (the one that often fails)
  try {
    const r = await fetch(`https://query1.finance.yahoo.com/v7/finance/options/${sym}`, { headers });
    const d = await r.json();
    results.tests.options_api = {
      status: r.status,
      ok: r.ok,
      hasOptions: !!d?.optionChain?.result?.[0]?.options?.length,
      expirations: d?.optionChain?.result?.[0]?.expirationDates?.length || 0,
      callsCount: d?.optionChain?.result?.[0]?.options?.[0]?.calls?.length || 0,
      putsCount: d?.optionChain?.result?.[0]?.options?.[0]?.puts?.length || 0,
      errorMsg: d?.optionChain?.error,
    };
  } catch (e) {
    results.tests.options_api = { error: e.message };
  }

  // Test 3: Anthropic API key check (without revealing it)
  results.tests.anthropic_key = {
    configured: !!process.env.ANTHROPIC_API_KEY,
    keyLength: process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.length : 0,
  };

  results.summary = {
    chartWorks: results.tests.chart_api.ok === true,
    optionsWork: results.tests.options_api.hasOptions === true,
    aiConfigured: results.tests.anthropic_key.configured,
    overall: results.tests.chart_api.ok ? '✅ Stock data works'
      : '❌ Even basic chart blocked — check Vercel region',
  };
  if (results.tests.options_api?.ok === false) {
    results.summary.overall += ' / ⚠️ Options blocked → synthetic fallback active';
  }

  return res.status(200).json(results);
}
