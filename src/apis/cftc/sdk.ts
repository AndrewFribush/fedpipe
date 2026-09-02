/**
 * CFTC Commitments of Traders (COT) SDK — typed client for the CFTC's weekly
 * futures-positioning report, served via its Socrata open-data platform.
 *
 * API: {@link https://publicreporting.cftc.gov/resource/6dca-aqww.json} (Socrata; no key)
 * Docs: {@link https://publicreporting.cftc.gov/}
 *
 * Weekly breakdown of long/short futures positions by trader category
 * (commercial hedgers vs non-commercial speculators) per market — the standard
 * dataset for tracking positioning in commodities, rates, and FX futures.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://publicreporting.cftc.gov",
  name: "cftc",
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 6 * 60 * 60 * 1000,
  timeoutMs: 30_000,
});

export interface CotReport {
  market: string;
  reportDate: string;
  openInterest: number | null;
  nonCommercialLong: number | null;
  nonCommercialShort: number | null;
  commercialLong: number | null;
  commercialShort: number | null;
  nonCommercialNet: number | null;
}

const n = (v: unknown) => { const x = Number(v); return Number.isFinite(x) ? x : null; };

function mapRow(r: Record<string, any>): CotReport {
  const ncl = n(r.noncomm_positions_long_all), ncs = n(r.noncomm_positions_short_all);
  return {
    market: String(r.market_and_exchange_names ?? "").trim(),
    reportDate: String(r.report_date_as_yyyy_mm_dd ?? "").slice(0, 10),
    openInterest: n(r.open_interest_all),
    nonCommercialLong: ncl,
    nonCommercialShort: ncs,
    commercialLong: n(r.comm_positions_long_all),
    commercialShort: n(r.comm_positions_short_all),
    nonCommercialNet: ncl != null && ncs != null ? ncl - ncs : null,
  };
}

const SELECT = "market_and_exchange_names,report_date_as_yyyy_mm_dd,open_interest_all,noncomm_positions_long_all,noncomm_positions_short_all,comm_positions_long_all,comm_positions_short_all";

/** Latest COT report(s) for markets whose name matches `market`. */
export async function latestCot(market: string, limit = 10): Promise<CotReport[]> {
  // Newest report date first; filter by market-name substring (case-insensitive).
  const rows = await api.get<Record<string, any>[]>("/resource/6dca-aqww.json", {
    $select: SELECT,
    $where: `upper(market_and_exchange_names) like upper('%${market.replace(/'/g, "''")}%')`,
    $order: "report_date_as_yyyy_mm_dd DESC",
    $limit: Math.min(limit, 50),
  });
  return Array.isArray(rows) ? rows.map(mapRow) : [];
}

/** Weekly history for one market name (most recent first). */
export async function cotHistory(market: string, weeks = 12): Promise<CotReport[]> {
  const rows = await api.get<Record<string, any>[]>("/resource/6dca-aqww.json", {
    $select: SELECT,
    $where: `upper(market_and_exchange_names) like upper('%${market.replace(/'/g, "''")}%')`,
    $order: "report_date_as_yyyy_mm_dd DESC",
    $limit: Math.min(weeks, 260),
  });
  return Array.isArray(rows) ? rows.map(mapRow) : [];
}

export function clearCache(): void {
  api.clearCache();
}
