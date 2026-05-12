// Earnings calendar proxy — fetches earnings dates from Yahoo Finance
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { symbols } = req.query; // comma-separated list
  if (!symbols) return res.status(400).json({ error: 'No symbols' });

  const syms = symbols.split(',').map(s => s.trim().toUpperCase()).filter(Boolean).slice(0, 30);
  const results = [];
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
    'Accept': 'application/json,*/*',
    'Referer': 'https://finance.yahoo.com/',
  };

  for (const sym of syms) {
    try {
      // Try quoteSummary for earnings data
      const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${sym}?modules=calendarEvents,defaultKeyStatistics,earningsHistory`;
      const r = await fetch(url, { headers, signal: AbortSignal.timeout(5000) });
      if (!r.ok) continue;
      const d = await r.json();
      const cal = d?.quoteSummary?.result?.[0]?.calendarEvents;
      const stats = d?.quoteSummary?.result?.[0]?.defaultKeyStatistics;
      const hist = d?.quoteSummary?.result?.[0]?.earningsHistory;

      if (cal) {
        const earnings = cal.earnings || {};
        const earningsDate = earnings.earningsDate?.[0]?.raw;
        const epsEstimate = earnings.earningsAverage?.raw;
        const revEstimate = earnings.revenueAverage?.raw;

        // Earnings history for pattern analysis
        const history = (hist?.history || []).map(h => ({
          date: h.quarter?.fmt,
          epsActual: h.epsActual?.raw,
          epsEstimate: h.epsEstimate?.raw,
          surprise: h.surprisePercent?.raw,
        }));

        results.push({
          symbol: sym,
          earningsDate: earningsDate ? earningsDate * 1000 : null,
          earningsDateFmt: earnings.earningsDate?.[0]?.fmt || null,
          epsEstimate: epsEstimate || null,
          revEstimate: revEstimate || null,
          history,
          trailingPE: stats?.trailingEps?.raw || null,
          forwardPE: stats?.forwardEps?.raw || null,
          beta: stats?.beta?.raw || null,
        });
      }
    } catch (e) { continue; }
  }

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
  return res.status(200).json({ results, count: results.length });
}
