// Earnings calendar API — fetches real earnings data from Yahoo Finance
// Checks calendarEvents + earningsHistory for each symbol
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { symbols, mode = 'check' } = req.query;
  if (!symbols) return res.status(400).json({ error: 'No symbols provided' });

  const syms = symbols.split(',').map(s => s.trim().toUpperCase()).filter(Boolean).slice(0, 50);
  const results = [];
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    'Accept': 'application/json,*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://finance.yahoo.com/',
    'Origin': 'https://finance.yahoo.com',
  };

  // Process in parallel batches of 5
  for (let i = 0; i < syms.length; i += 5) {
    const batch = syms.slice(i, i + 5);
    const promises = batch.map(async (sym) => {
      try {
        // Fetch calendarEvents + earningsHistory + defaultKeyStatistics
        const modules = 'calendarEvents,earningsHistory,defaultKeyStatistics,financialData';
        const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${sym}?modules=${modules}`;
        const r = await fetch(url, { headers, signal: AbortSignal.timeout(6000) });
        if (!r.ok) {
          // Try query2
          const r2 = await fetch(url.replace('query1', 'query2'), { headers, signal: AbortSignal.timeout(6000) });
          if (!r2.ok) return null;
          const d2 = await r2.json();
          return processResult(sym, d2);
        }
        const d = await r.json();
        return processResult(sym, d);
      } catch (e) { return null; }
    });
    const batchResults = await Promise.allSettled(promises);
    batchResults.forEach(r => { if (r.status === 'fulfilled' && r.value) results.push(r.value); });
  }

  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
  return res.status(200).json({ results, count: results.length, timestamp: Date.now() });
}

function processResult(sym, d) {
  const summary = d?.quoteSummary?.result?.[0];
  if (!summary) return null;

  const cal = summary.calendarEvents;
  const hist = summary.earningsHistory;
  const stats = summary.defaultKeyStatistics;
  const fin = summary.financialData;

  // Extract earnings date
  let earningsDate = null, earningsDateFmt = null;
  if (cal?.earnings?.earningsDate?.length) {
    earningsDate = cal.earnings.earningsDate[0].raw * 1000;
    earningsDateFmt = cal.earnings.earningsDate[0].fmt;
  }

  // EPS estimates
  const epsEstimate = cal?.earnings?.earningsAverage?.raw ?? null;
  const epsHigh = cal?.earnings?.earningsHigh?.raw ?? null;
  const epsLow = cal?.earnings?.earningsLow?.raw ?? null;
  const revEstimate = cal?.earnings?.revenueAverage?.raw ?? null;

  // Historical earnings surprises (last 4 quarters)
  const history = (hist?.history || []).map(h => ({
    quarter: h.quarter?.fmt || '',
    epsActual: h.epsActual?.raw ?? null,
    epsEstimate: h.epsEstimate?.raw ?? null,
    surprise: h.surprisePercent?.raw ?? null,
  })).filter(h => h.epsActual !== null);

  // Calculate beat rate
  const beats = history.filter(h => h.surprise > 0).length;
  const totalQ = history.length;
  const beatRate = totalQ > 0 ? Math.round(beats / totalQ * 100) : null;

  // Average surprise
  const avgSurprise = totalQ > 0
    ? +(history.reduce((a, h) => a + (h.surprise || 0), 0) / totalQ).toFixed(2) : null;

  // Average post-earnings move (estimated from surprise magnitude)
  const avgMove = totalQ > 0
    ? +(history.reduce((a, h) => a + Math.abs(h.surprise || 0), 0) / totalQ * 0.7).toFixed(2) : null;

  // Financial health indicators
  const currentPrice = fin?.currentPrice?.raw ?? null;
  const targetPrice = fin?.targetMeanPrice?.raw ?? null;
  const revenueGrowth = fin?.revenueGrowth?.raw ?? null;
  const earningsGrowth = fin?.earningsGrowth?.raw ?? null;
  const recommendationMean = fin?.recommendationMean?.raw ?? null;
  const profitMargins = fin?.profitMargins?.raw ?? null;

  // Key stats
  const trailingPE = stats?.trailingEps?.raw ?? null;
  const forwardPE = stats?.forwardEps?.raw ?? null;
  const beta = stats?.beta?.raw ?? null;
  const shortPercentFloat = stats?.shortPercentOfFloat?.raw ?? null;

  return {
    symbol: sym,
    earningsDate, earningsDateFmt,
    epsEstimate, epsHigh, epsLow, revEstimate,
    history, beatRate, avgSurprise, avgMove,
    currentPrice, targetPrice, revenueGrowth, earningsGrowth,
    recommendationMean, profitMargins,
    trailingPE, forwardPE, beta, shortPercentFloat,
  };
}
