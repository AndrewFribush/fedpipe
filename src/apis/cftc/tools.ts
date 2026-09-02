import { z } from "zod";
import type { Tool } from "fastmcp";
import { latestCot, cotHistory } from "./sdk.js";
import type { CotReport } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

const fmt = (n: number | null) => (n == null ? undefined : n.toLocaleString());

function brief(r: CotReport): Record<string, unknown> {
  return {
    market: r.market,
    reportDate: r.reportDate,
    openInterest: fmt(r.openInterest),
    speculatorsLong: fmt(r.nonCommercialLong),
    speculatorsShort: fmt(r.nonCommercialShort),
    speculatorsNet: fmt(r.nonCommercialNet),
    hedgersLong: fmt(r.commercialLong),
    hedgersShort: fmt(r.commercialShort),
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "cftc_cot",
    description:
      "Latest CFTC Commitments of Traders (COT) positioning for a futures market by name — long/short/net positions of speculators (non-commercial) vs hedgers (commercial). Keyless.",
    annotations: { title: "CFTC: Latest COT", readOnlyHint: true },
    parameters: z.object({
      market: z.string().describe("Market/commodity name substring — e.g. 'gold', 'crude oil', 'E-MINI S&P', 'wheat'"),
      limit: z.number().int().max(50).default(10).describe("Max matching markets (default 10)"),
    }),
    execute: async (args) => {
      const rows = await latestCot(args.market, args.limit);
      if (!rows.length) return emptyResponse(`No COT market matches "${args.market}". Try 'gold', 'crude', 'corn', 'euro fx'.`);
      return listResponse(`${rows.length} COT market(s) match "${args.market}" (latest report)`, { items: rows.map(brief), total: rows.length });
    },
  },
  {
    name: "cftc_cot_history",
    description:
      "Weekly Commitments of Traders history for one futures market — the trend in speculator vs hedger positioning over recent weeks. Use a specific market-name substring.",
    annotations: { title: "CFTC: COT History", readOnlyHint: true },
    parameters: z.object({
      market: z.string().describe("Market-name substring (specific enough to pick one market) — e.g. 'GOLD - COMMODITY'"),
      weeks: z.number().int().max(104).default(12).describe("Weeks of history (default 12)"),
    }),
    execute: async (args) => {
      const rows = await cotHistory(args.market, args.weeks);
      if (!rows.length) return emptyResponse(`No COT history for "${args.market}".`);
      return listResponse(
        `${rows.length} weekly COT report(s) for markets matching "${args.market}" (newest first)`,
        { items: rows.map(brief), total: rows.length },
      );
    },
  },
];
