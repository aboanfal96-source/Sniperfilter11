// Earnings calendar API — 3 strategies to get real data
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { symbols } = req.query;
  if (!symbols) return res.status(400).json({ error: 'No symbols' });

  const syms = symbols.split(',').map(s => s.trim().toUpperCase()).filter(Boolean).slice(0, 30);
  const results = [];
  const errors = [];

  const ua = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
  ];

  for (const sym of syms) {
    let data = null;

    // Strategy 1: quoteSummary (most data)
    for (const host of ['query1', 'query2']) {
      try {
        const url = `https://${host}.finance.yahoo.com/v10/finance/quoteSummary/${sym}?modules=calendarEvents,earningsHistory,financialData`;
        const r = await fetch(url, {
          headers: {
            'User-Agent': ua[Math.floor(Math.random() * ua.length)],
            'Accept': 'application/json,*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': `https://finance.yahoo.com/quote/${sym}/`,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
          },
          signal: AbortSignal.timeout(5000),
        });
        if (!r.ok) continue;
        const d = await r.json();
        const summary = d?.quoteSummary?.result?.[0];
        if (summary?.calendarEvents?.earnings?.earningsDate?.[0]) {
          data = processQuoteSummary(sym, summary);
          break;
        }
      } catch (e) { errors.push(`${sym} ${host}: ${e.message}`); }
    }

    // Strategy 2: v8 chart meta (has earningsTimestamp)
    if (!data) {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?range=1d&interval=1d`;
        const r = await fetch(url, {
          headers: { 'User-Agent': ua[0], 'Referer': 'https://finance.yahoo.com/' },
          signal: AbortSignal.timeout(5000),
        });
        if (r.ok) {
          const d = await r.json();
          const meta = d?.chart?.result?.[0]?.meta;
          if (meta?.earningsTimestamp) {
            data = {
              symbol: sym,
              earningsDate: meta.earningsTimestamp * 1000,
              earningsDateFmt: new Date(meta.earningsTimestamp * 1000).toISOString().slice(0, 10),
              source: 'chart_meta',
              // Basic data from meta
              currentPrice: meta.regularMarketPrice,
            };
          }
        }
      } catch (e) { errors.push(`${sym} chart: ${e.message}`); }
    }

    // Strategy 3: v7 options meta (sometimes has earnings date)
    if (!data) {
      try {
        const url = `https://query1.finance.yahoo.com/v7/finance/options/${sym}`;
        const r = await fetch(url, {
          headers: { 'User-Agent': ua[1], 'Referer': 'https://finance.yahoo.com/' },
          signal: AbortSignal.timeout(5000),
        });
        if (r.ok) {
          const d = await r.json();
          const quote = d?.optionChain?.result?.[0]?.quote;
          if (quote?.earningsTimestamp) {
            data = {
              symbol: sym,
              earningsDate: quote.earningsTimestamp * 1000,
              earningsDateFmt: new Date(quote.earningsTimestamp * 1000).toISOString().slice(0, 10),
              source: 'options_quote',
              currentPrice: quote.regularMarketPrice,
              epsTrailingTwelveMonths: quote.epsTrailingTwelveMonths,
              forwardPE: quote.forwardPE,
            };
          }
        }
      } catch (e) {}
    }

    if (data) results.push(data);
  }

  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
  return res.status(200).json({
    results,
    count: results.length,
    checked: syms.length,
    timestamp: Date.now(),
    errors: errors.length > 0 ? errors.slice(0, 5) : undefined,
  });
}

function processQuoteSummary(sym, summary) {
  const cal = summary.calendarEvents;
  const hist = summary.earningsHistory;
  const fin = summary.financialData;

  let earningsDate = null, earningsDateFmt = null;
  if (cal?.earnings?.earningsDate?.length) {
    earningsDate = cal.earnings.earningsDate[0].raw * 1000;
    earningsDateFmt = cal.earnings.earningsDate[0].fmt;
  }

  const history = (hist?.history || []).map(h => ({
    quarter: h.quarter?.fmt || '',
    epsActual: h.epsActual?.raw ?? null,
    epsEstimate: h.epsEstimate?.raw ?? null,
    surprise: h.surprisePercent?.raw ?? null,
  })).filter(h => h.epsActual !== null);

  const beats = history.filter(h => h.surprise > 0).length;
  const totalQ = history.length;

  return {
    symbol: sym,
    earningsDate, earningsDateFmt,
    source: 'quoteSummary',
    epsEstimate: cal?.earnings?.earningsAverage?.raw ?? null,
    revEstimate: cal?.earnings?.revenueAverage?.raw ?? null,
    history,
    beatRate: totalQ > 0 ? Math.round(beats / totalQ * 100) : null,
    avgSurprise: totalQ > 0 ? +(history.reduce((a, h) => a + (h.surprise || 0), 0) / totalQ).toFixed(2) : null,
    currentPrice: fin?.currentPrice?.raw ?? null,
    targetPrice: fin?.targetMeanPrice?.raw ?? null,
    revenueGrowth: fin?.revenueGrowth?.raw ?? null,
    earningsGrowth: fin?.earningsGrowth?.raw ?? null,
    recommendationMean: fin?.recommendationMean?.raw ?? null,
  };
}
