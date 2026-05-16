// Server-side contract recommendation engine
// Tries Yahoo first; falls back to Black-Scholes synthetic chain if blocked
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    symbol,
    technicalScore = 50,
    direction = 'neutral',
    dirSource = 'technical',
    sniperScore = 0,
    sniperDir = 'محايد',
    weights = {},
    expectedMove = 0,
    underlyingPrice = 0,
    historicalVol = 0.30,
    fractal = null,
    sniperEntry = null,
    sniperTP = null,
  } = req.body || {};

  if (!symbol) return res.status(400).json({ error: 'No symbol' });
  const sym = symbol.toUpperCase();

  const W = {
    technical: weights.technical ?? 1.0,
    delta:     weights.delta     ?? 1.0,
    iv:        weights.iv        ?? 1.0,
    oi:        weights.oi        ?? 1.0,
    volume:    weights.volume    ?? 1.0,
    spread:    weights.spread    ?? 1.0,
    move:      weights.move      ?? 1.0,
  };

  const browserHeaders = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin': 'https://finance.yahoo.com',
    'Referer': `https://finance.yahoo.com/quote/${sym}/options`,
  };

  let chain = null;
  let dataSource = 'yahoo';

  // Try Yahoo
  for (const host of ['https://query1.finance.yahoo.com', 'https://query2.finance.yahoo.com']) {
    try {
      const r = await fetch(`${host}/v7/finance/options/${sym}`, { headers: browserHeaders });
      if (!r.ok) continue;
      const d = await r.json();
      if (d?.optionChain?.result?.[0]?.options?.length) {
        chain = d.optionChain.result[0];
        break;
      }
    } catch (e) {}
  }

  let options;
  let nearestExp;
  const now = Date.now();
  let spot = underlyingPrice;

  if (chain) {
    spot = underlyingPrice || chain.quote?.regularMarketPrice || 0;
    const expDates = (chain.expirationDates || []).map(t => t * 1000);
    for (const t of expDates) {
      const days = (t - now) / 86400000;
      if (days >= 0 && days <= 14) { nearestExp = t; break; }
    }
    if (!nearestExp) nearestExp = expDates[0];

    const loadedExp = chain.options?.[0]?.expirationDate * 1000;
    options = chain.options?.[0];
    if (loadedExp !== nearestExp && nearestExp) {
      try {
        const r = await fetch(
          `https://query1.finance.yahoo.com/v7/finance/options/${sym}?date=${Math.floor(nearestExp/1000)}`,
          { headers: browserHeaders }
        );
        if (r.ok) {
          const d = await r.json();
          if (d?.optionChain?.result?.[0]?.options?.[0]) {
            options = d.optionChain.result[0].options[0];
          }
        }
      } catch (e) {}
    }
  }

  // Synthetic fallback — Black-Scholes approximation when Yahoo blocked
  if (!options || !spot) {
    if (!spot) return res.status(400).json({ error: 'no_underlying_price', message: 'underlyingPrice required for synthetic fallback' });
    dataSource = 'synthetic';
    // Generate 7-day weekly expiry
    const daysToExp = 7;
    nearestExp = now + daysToExp * 86400000;

    // Use historical volatility passed from client (or 30% default)
    const iv = Math.max(0.15, Math.min(1.5, historicalVol));
    const T = daysToExp / 365;

    // Generate strikes around spot at $5 increments (or $1 for low-priced)
    const stepBase = spot < 50 ? 1 : spot < 200 ? 2.5 : spot < 500 ? 5 : 10;
    const step = Math.round(stepBase);
    const baseStrike = Math.round(spot / step) * step;
    const strikes = [];
    for (let i = -8; i <= 8; i++) strikes.push(baseStrike + i * step);

    // Black-Scholes for European options (good approx for short-dated)
    const N = (x) => {
      const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
      const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
      const sign = x < 0 ? -1 : 1;
      x = Math.abs(x) / Math.sqrt(2);
      const t = 1 / (1 + p * x);
      const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
      return 0.5 * (1 + sign * y);
    };
    const bs = (S, K, T, sigma, type) => {
      const r = 0.05; // risk-free rate ~5%
      const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
      const d2 = d1 - sigma * Math.sqrt(T);
      if (type === 'call') {
        const price = S * N(d1) - K * Math.exp(-r * T) * N(d2);
        return { price: Math.max(0.01, price), delta: N(d1) };
      } else {
        const price = K * Math.exp(-r * T) * N(-d2) - S * N(-d1);
        return { price: Math.max(0.01, price), delta: N(d1) - 1 };
      }
    };

    const calls = [], puts = [];
    for (const K of strikes) {
      const c = bs(spot, K, T, iv, 'call');
      const p = bs(spot, K, T, iv, 'put');
      // Simulate bid/ask spread (~5% of mid)
      const spreadPct = 0.05;
      calls.push({
        strike: K, lastPrice: +c.price.toFixed(2),
        bid: +(c.price * (1 - spreadPct/2)).toFixed(2),
        ask: +(c.price * (1 + spreadPct/2)).toFixed(2),
        impliedVolatility: iv,
        openInterest: Math.max(0, Math.round(2000 * Math.exp(-Math.abs(K - spot) / spot * 4))),
        volume: Math.max(0, Math.round(800 * Math.exp(-Math.abs(K - spot) / spot * 4))),
        contractSymbol: `${sym}${new Date(nearestExp).toISOString().slice(2,10).replace(/-/g,'')}C${String(Math.round(K*1000)).padStart(8,'0')}`,
      });
      puts.push({
        strike: K, lastPrice: +p.price.toFixed(2),
        bid: +(p.price * (1 - spreadPct/2)).toFixed(2),
        ask: +(p.price * (1 + spreadPct/2)).toFixed(2),
        impliedVolatility: iv,
        openInterest: Math.max(0, Math.round(1500 * Math.exp(-Math.abs(K - spot) / spot * 4))),
        volume: Math.max(0, Math.round(600 * Math.exp(-Math.abs(K - spot) / spot * 4))),
        contractSymbol: `${sym}${new Date(nearestExp).toISOString().slice(2,10).replace(/-/g,'')}P${String(Math.round(K*1000)).padStart(8,'0')}`,
      });
    }
    options = { expirationDate: Math.floor(nearestExp / 1000), calls, puts };
  }

  if (!options) return res.status(503).json({ error: 'no_options' });

  // ═══ UNIFIED DIRECTION ENFORCEMENT ═══
  // When sniper is confident (score >= 45), strictly follow its direction
  // When both technical and sniper agree ('aligned'), absolutely no mixed signals
  let wantCalls, wantPuts;
  if (dirSource === 'aligned') {
    // Both systems agree — strongest signal, only one direction
    wantCalls = direction === 'bullish';
    wantPuts = direction === 'bearish';
  } else if (dirSource === 'sniper' && sniperScore >= 50) {
    // Sniper confident — follow sniper strictly
    wantCalls = direction === 'bullish';
    wantPuts = direction === 'bearish';
  } else if (direction === 'bullish' || direction === 'شراء') {
    wantCalls = true; wantPuts = false;
  } else if (direction === 'bearish' || direction === 'بيع') {
    wantCalls = false; wantPuts = true;
  } else {
    // Neutral — pick the side with higher technical score, NEVER show mixed
    // Use expectedMove direction: positive = calls, negative = puts
    if (technicalScore >= 50 || expectedMove > 0) { wantCalls = true; wantPuts = false; }
    else if (expectedMove < 0) { wantCalls = false; wantPuts = true; }
    else { wantCalls = true; wantPuts = false; } // default to calls
  }
  const candidates = [];

  const scoreContract = (c, type) => {
    const strike = c.strike, last = c.lastPrice || c.bid || 0, bid = c.bid || 0, ask = c.ask || 0;
    const oi = c.openInterest || 0, vol = c.volume || 0;
    const iv = c.impliedVolatility || 0;
    
    // ═══ EXPERT WEEKLY OPTIONS SCORING ═══
    
    // 1. MONEYNESS — ATM/slightly ITM is KING for weeklies
    // Distance from ATM as percentage
    const moneyness = (strike - spot) / spot; // positive = OTM call, negative = ITM call
    const absMoneyness = Math.abs(moneyness);
    let s_moneyness;
    if (type === 'call') {
      // Ideal: strike at spot or up to 2% OTM
      if (moneyness >= -0.01 && moneyness <= 0.02) s_moneyness = 95; // ATM sweet spot
      else if (moneyness >= -0.03 && moneyness <= 0.04) s_moneyness = 75; // Near ATM
      else if (moneyness <= -0.03) s_moneyness = 60; // Deep ITM (expensive but safe)
      else s_moneyness = Math.max(10, 75 - absMoneyness * 800); // OTM penalty
    } else {
      // Put: ideal strike at spot or up to 2% OTM (below spot)
      if (moneyness >= -0.02 && moneyness <= 0.01) s_moneyness = 95;
      else if (moneyness >= -0.04 && moneyness <= 0.03) s_moneyness = 75;
      else if (moneyness >= 0.03) s_moneyness = 60; // Deep ITM put
      else s_moneyness = Math.max(10, 75 - absMoneyness * 800);
    }
    
    // 2. DELTA — for weeklies, want 0.45-0.60 (high probability of finishing ITM)
    const delta = type === 'call'
      ? Math.max(0, Math.min(1, 1 - (strike - spot) / (spot * (iv || 0.3) * 0.4)))
      : Math.max(0, Math.min(1, 1 - (spot - strike) / (spot * (iv || 0.3) * 0.4)));
    const idealDelta = 0.52; // slightly ITM
    const s_delta = Math.max(0, 100 - Math.abs(delta - idealDelta) * 180);
    
    // 3. IV — for buying weeklies, LOWER IV is better (cheaper premium, less IV crush risk)
    // Use relative scoring vs historical vol
    const s_iv = iv > 0 ? Math.max(0, Math.min(100, 100 - (iv - historicalVol) / historicalVol * 80)) : 50;
    
    // 4. LIQUIDITY — CRITICAL for weeklies (need to exit quickly)
    // Volume: minimum 200 for weeklies, ideal > 1000
    const s_vol = vol >= 1000 ? 95 : vol >= 500 ? 80 : vol >= 200 ? 60 : vol >= 50 ? 35 : 10;
    // OI: minimum 500 for weeklies
    const s_oi = oi >= 5000 ? 95 : oi >= 2000 ? 80 : oi >= 500 ? 60 : oi >= 100 ? 35 : 10;
    
    // 5. SPREAD — tight spread is essential (max 10% for weeklies)
    const midPrice = (ask + bid) / 2 || last;
    const spread_pct = (ask > 0 && bid > 0) ? (ask - bid) / midPrice : 1;
    const s_spread = spread_pct <= 0.03 ? 95 : spread_pct <= 0.08 ? 75 : spread_pct <= 0.15 ? 50 : spread_pct <= 0.25 ? 25 : 5;
    
    // 6. TECHNICAL ALIGNMENT
    const s_tech = technicalScore;
    
    // 7. PRICE ACTION TARGET — is strike realistic for the expected move?
    const target = type === 'call' ? spot * (1 + Math.abs(expectedMove) / 100)
                                   : spot * (1 - Math.abs(expectedMove) / 100);
    const s_move = Math.max(0, 100 - Math.abs(strike - target) / spot * 600);
    
    // 8. PREMIUM CHECK — avoid contracts that are too cheap (likely worthless) or too expensive
    const premiumPct = midPrice / spot * 100; // premium as % of stock price
    let premiumPenalty = 0;
    if (premiumPct < 0.1) premiumPenalty = -20; // Too cheap = lottery ticket
    if (premiumPct > 5) premiumPenalty = -10; // Too expensive = high risk
    
    // Fractal alignment bonus
    let fractalBonus = 0;
    if (fractal && fractal.sig) {
      const aligned = (type === 'call' && fractal.sig === 'شراء') || (type === 'put' && fractal.sig === 'بيع');
      if (aligned) {
        fractalBonus = (fractal.score || 60) * 0.12;
        if (type === 'call' && fractal.lastUp && Math.abs(strike - fractal.lastUp) / spot < 0.02) fractalBonus += 4;
        if (type === 'put' && fractal.lastDown && Math.abs(strike - fractal.lastDown) / spot < 0.02) fractalBonus += 4;
      } else if (fractal.sig !== 'محايد') {
        fractalBonus = -6;
      }
    }

    // Sniper alignment bonus
    let sniperBonus = 0;
    if (sniperScore >= 30) {
      const sniperAligned = (type === 'call' && sniperDir === 'شراء') || (type === 'put' && sniperDir === 'بيع');
      if (sniperAligned) {
        sniperBonus = Math.min(12, sniperScore * 0.10);
        if (sniperEntry && Math.abs(strike - sniperEntry) / spot < 0.015) sniperBonus += 4;
        if (sniperTP && Math.abs(strike - sniperTP) / spot < 0.02) sniperBonus += 3;
      } else if (sniperDir !== 'محايد') {
        sniperBonus = -(sniperScore * 0.12);
      }
    }

    // ═══ COMPOSITE SCORE — weighted for weekly options success ═══
    const total =
      s_moneyness * 0.20 +  // Moneyness is #1 for weeklies
      s_delta     * 0.12 +  // Delta confirmation
      s_tech      * 0.15 +  // Technical alignment
      s_spread    * 0.15 +  // Liquidity (spread)
      s_vol       * 0.10 +  // Volume
      s_oi        * 0.08 +  // Open interest
      s_iv        * 0.10 +  // IV rank
      s_move      * 0.10;   // Move alignment
    
    const score = Math.max(0, Math.min(100, Math.round(total + fractalBonus + sniperBonus + premiumPenalty)));
    
    return {
      type: type.toUpperCase(),
      strike, lastPrice: last, bid, ask, mid: +(midPrice).toFixed(2),
      openInterest: oi, volume: vol, iv: +iv.toFixed(3),
      delta: +delta.toFixed(3),
      expiry: options.expirationDate * 1000,
      contractSymbol: c.contractSymbol,
      score,
      moneyness: +(moneyness * 100).toFixed(2),
      breakdown: {
        moneyness: Math.round(s_moneyness), delta: Math.round(s_delta), technical: Math.round(s_tech),
        spread: Math.round(s_spread), volume: Math.round(s_vol), oi: Math.round(s_oi),
        iv: Math.round(s_iv), move: Math.round(s_move),
        fractal: Math.round(fractalBonus), sniper: Math.round(sniperBonus),
        premiumPenalty: Math.round(premiumPenalty),
      },
      dirSource,
      sniperAligned: sniperBonus > 0,
      target: +target.toFixed(2),
      breakeven: type === 'call' ? +(strike + midPrice).toFixed(2) : +(strike - midPrice).toFixed(2),
    };
  };

  if (wantCalls) {
    for (const c of (options.calls || [])) {
      // Weekly options: only ATM ± 5% — no deep OTM lottery tickets
      if (c.strike < spot * 0.95 || c.strike > spot * 1.05) continue;
      if (!c.bid && !c.lastPrice) continue;
      // Quality filter: skip illiquid contracts
      if ((c.volume || 0) < 10 && (c.openInterest || 0) < 50) continue;
      candidates.push(scoreContract(c, 'call'));
    }
  }
  if (wantPuts) {
    for (const p of (options.puts || [])) {
      if (p.strike < spot * 0.95 || p.strike > spot * 1.05) continue;
      if (!p.bid && !p.lastPrice) continue;
      if ((p.volume || 0) < 10 && (p.openInterest || 0) < 50) continue;
      candidates.push(scoreContract(p, 'put'));
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  const top = candidates.slice(0, 2);

  res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate=300');
  return res.status(200).json({
    symbol: sym,
    underlying: spot,
    direction,
    dirSource,
    sniperScore,
    sniperDir,
    technicalScore,
    expectedMove,
    expiry: options.expirationDate * 1000,
    daysToExpiry: Math.round((options.expirationDate * 1000 - now) / 86400000),
    recommendations: top,
    weights: W,
    dataSource,
  });
}
