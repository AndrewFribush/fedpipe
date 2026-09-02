import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "cftc",
  displayName: "CFTC Commitments of Traders",
  category: "Financial",
  description:
    "CFTC Commitments of Traders (COT) — the weekly report of futures market positioning, broken into commercial hedgers vs non-commercial speculators (long/short/net) per market. The standard dataset for tracking who's positioned which way in commodities, rates, and FX futures. Keyless (Socrata).",
  workflow:
    "cftc_cot with a market/commodity name for the latest positioning -> cftc_cot_history for the multi-week trend.",
  tips:
    "Keyless. Market names include the exchange, e.g. 'WHEAT-SRW - CHICAGO BOARD OF TRADE', 'GOLD - COMMODITY EXCHANGE', 'E-MINI S&P 500'. Match on a substring like 'gold' or 'crude'. Non-commercial = speculators, commercial = hedgers; net = long minus short. This is the legacy futures-only report.",
  domains: ["finance"],
  crossRef: [
    { question: "banking", route: "cftc_cot(market) for speculative vs hedger positioning in a futures market" },
  ],
  reference: {
    docs: { "CFTC public reporting": "https://publicreporting.cftc.gov/" },
  },
} satisfies ModuleMeta;
