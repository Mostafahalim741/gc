import { Router, type IRouter } from "express";

const router: IRouter = Router();

const TROY_OUNCE_IN_GRAMS = 31.1035;
const CACHE_TTL_MS = 3 * 60 * 1000;
const FETCH_TIMEOUT_MS = 6000;

const KARATS = [
  { karat: 24, purity: 1.0 },
  { karat: 21, purity: 21 / 24 },
  { karat: 18, purity: 18 / 24 },
];

let cache: { data: { ouncePriceUsd: number; usdToEgp: number }; at: number } | null = null;

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" },
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchLiveRates(): Promise<{ ouncePriceUsd: number; usdToEgp: number }> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return cache.data;
  }

  const [goldRes, fxRes] = await Promise.all([
    fetchWithTimeout("https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=1m&range=1d"),
    fetchWithTimeout("https://query1.finance.yahoo.com/v8/finance/chart/USDEGP=X?interval=1m&range=1d"),
  ]);

  if (!goldRes.ok) throw new Error(`Yahoo Finance gold: ${goldRes.status}`);
  if (!fxRes.ok) throw new Error(`Yahoo Finance FX: ${fxRes.status}`);

  const [goldData, fxData] = await Promise.all([goldRes.json(), fxRes.json()]) as [
    { chart: { result: Array<{ meta: { regularMarketPrice: number } }> } },
    { chart: { result: Array<{ meta: { regularMarketPrice: number } }> } },
  ];

  const ouncePriceUsd = goldData?.chart?.result?.[0]?.meta?.regularMarketPrice;
  const usdToEgp = fxData?.chart?.result?.[0]?.meta?.regularMarketPrice;

  if (!ouncePriceUsd) throw new Error("No gold price in response");
  if (!usdToEgp) throw new Error("No FX rate in response");

  const data = { ouncePriceUsd, usdToEgp };
  cache = { data, at: Date.now() };
  return data;
}

router.get("/live-rates", async (req, res) => {
  try {
    const { ouncePriceUsd, usdToEgp } = await fetchLiveRates();

    res.json({
      ouncePriceUsd: Math.round(ouncePriceUsd * 100) / 100,
      usdToEgp: Math.round(usdToEgp * 100) / 100,
      source: "Yahoo Finance (GC=F, USDEGP=X)",
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch live rates");
    res.status(503).json({ error: "تعذر جلب البيانات من الإنترنت" });
  }
});

router.get("/prices", (req, res) => {
  const usdRate = parseFloat(req.query.usdRate as string);
  const ouncePriceUsd = parseFloat(req.query.ouncePriceUsd as string);
  const workmanship = parseFloat((req.query.workmanship as string) || "0");

  if (isNaN(usdRate) || usdRate <= 0) {
    res.status(400).json({ error: "سعر الدولار غير صحيح" });
    return;
  }
  if (isNaN(ouncePriceUsd) || ouncePriceUsd <= 0) {
    res.status(400).json({ error: "سعر الأونصة غير صحيح" });
    return;
  }
  if (isNaN(workmanship) || workmanship < 0) {
    res.status(400).json({ error: "أجرة الصياغة غير صحيحة" });
    return;
  }

  const ouncePriceEgp = ouncePriceUsd * usdRate;
  const pricePerGramEgp24k = ouncePriceEgp / TROY_OUNCE_IN_GRAMS;

  const karats = KARATS.map(({ karat, purity }) => {
    const pricePerGramEgp = pricePerGramEgp24k * purity;
    const pricePerGramWithWorkmanshipEgp = pricePerGramEgp + workmanship;
    return {
      karat,
      purity,
      pricePerGramEgp: Math.round(pricePerGramEgp * 100) / 100,
      pricePerGramWithWorkmanshipEgp:
        Math.round(pricePerGramWithWorkmanshipEgp * 100) / 100,
    };
  });

  res.json({
    usdRate,
    ouncePriceUsd,
    ouncePriceEgp: Math.round(ouncePriceEgp * 100) / 100,
    pricePerGramEgp24k: Math.round(pricePerGramEgp24k * 100) / 100,
    workmanship,
    karats,
  });
});

export default router;
