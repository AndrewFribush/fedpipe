/**
 * Grid Disturbances SDK — U.S. electric emergency & disturbance events (DOE OE-417).
 *
 * KEYLESS. Source: Oak Ridge National Laboratory's Open Energy Data Portal,
 * which republishes the DOE OE-417 "Electric Emergency Incident and Disturbance
 * Report" annual summaries via an Opendatasoft records API.
 *
 *   https://openenergyhub.ornl.gov/api/explore/v2.1/catalog/datasets/oe-417-annual-summaries
 *
 * COVERAGE NOTE: the ORNL dataset currently exposes calendar-year 2023 only
 * (~341 events). DOE's own OE-417 host is defunct and there is no clean
 * multi-year gov API; this module is written to that source and will widen
 * automatically if ORNL adds more years.
 *
 * Usage:
 *   import { searchEvents, getSummary } from "fedpipe/sdk/grid-disturbances";
 *   const e = await searchEvents({ state: "Texas", eventType: "Severe Weather" });
 *   const s = await getSummary({});   // breakdowns by cause / region / month
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://openenergyhub.ornl.gov/api/explore/v2.1/catalog/datasets/oe-417-annual-summaries",
  name: "grid-disturbances",
  defaultHeaders: { "User-Agent": "fedpipe (github.com/AndrewFribush/fedpipe)" },
  cacheTtlMs: 12 * 60 * 60 * 1000, // 12h
});

const SELECT = [
  "date_event_began", "event_month", "date_of_restoration", "area_affected",
  "nerc_region", "event_type", "alert_criteria", "demand_loss_mw", "number_of_customers_affected",
].join(",");

// ─── Types ───────────────────────────────────────────────────────────

export interface GridEvent {
  date: string | null;
  month: string | null;
  restored: string | null;
  area: string | null;
  nerc_region: string | null;
  event_type: string | null;
  criteria: string | null;
  demand_loss_mw: number | null;
  customers_affected: number | null;
}

interface RawRecord {
  date_event_began?: string;
  event_month?: string;
  date_of_restoration?: string;
  area_affected?: string;
  nerc_region?: string;
  event_type?: string;
  alert_criteria?: string;
  demand_loss_mw?: number | string | null;
  number_of_customers_affected?: number | string | null;
}

const num = (v: unknown): number | null =>
  v == null || v === "" || Number.isNaN(Number(v)) ? null : Number(v);

function mapRecord(r: RawRecord): GridEvent {
  return {
    date: r.date_event_began ?? null,
    month: r.event_month ?? null,
    restored: r.date_of_restoration ?? null,
    area: r.area_affected ?? null,
    nerc_region: r.nerc_region ?? null,
    event_type: r.event_type ?? null,
    criteria: r.alert_criteria ?? null,
    demand_loss_mw: num(r.demand_loss_mw),
    customers_affected: num(r.number_of_customers_affected),
  };
}

// ─── Query building ──────────────────────────────────────────────────

/** Escape a double-quoted ODSQL string literal. */
const q = (s: string) => `"${String(s).replace(/"/g, '\\"')}"`;

function buildWhere(opts: {
  state?: string; eventType?: string; nercRegion?: string;
  startDate?: string; endDate?: string; minDemandLossMw?: number;
}): string | undefined {
  const clauses: string[] = [];
  if (opts.state) clauses.push(`area_affected like ${q(opts.state)}`);
  if (opts.eventType) clauses.push(`event_type like ${q(opts.eventType)}`);
  if (opts.nercRegion) clauses.push(`nerc_region like ${q(opts.nercRegion)}`);
  if (opts.startDate) clauses.push(`date_event_began >= ${q(opts.startDate)}`);
  if (opts.endDate) clauses.push(`date_event_began <= ${q(opts.endDate)}`);
  if (opts.minDemandLossMw != null) clauses.push(`demand_loss_mw >= ${opts.minDemandLossMw}`);
  return clauses.length ? clauses.join(" and ") : undefined;
}

// ─── Public API ──────────────────────────────────────────────────────

/** Search OE-417 grid disturbance events with optional filters. */
export async function searchEvents(opts: {
  state?: string;
  eventType?: string;
  nercRegion?: string;
  startDate?: string;
  endDate?: string;
  minDemandLossMw?: number;
  limit?: number;
  offset?: number;
} = {}): Promise<{ total: number; events: GridEvent[] }> {
  const res = await api.get<{ total_count?: number; results?: RawRecord[] }>("/records", {
    select: SELECT,
    where: buildWhere(opts),
    order_by: "date_event_began desc",
    limit: Math.min(opts.limit ?? 50, 100),
    offset: opts.offset ?? 0,
  });
  return { total: res.total_count ?? 0, events: (res.results ?? []).map(mapRecord) };
}

/** Fetch every event matching a filter (paginated), for aggregation. */
async function fetchAll(where?: string): Promise<GridEvent[]> {
  const all: GridEvent[] = [];
  for (let offset = 0; offset < 5000; offset += 100) {
    const res = await api.get<{ total_count?: number; results?: RawRecord[] }>("/records", {
      select: SELECT, where, limit: 100, offset,
    });
    const batch = res.results ?? [];
    all.push(...batch.map(mapRecord));
    if (batch.length < 100 || all.length >= (res.total_count ?? 0)) break;
  }
  return all;
}

/** Aggregate disturbance events into breakdowns by cause, region, and month. */
export async function getSummary(opts: {
  state?: string; eventType?: string; nercRegion?: string; startDate?: string; endDate?: string;
} = {}): Promise<{
  total: number;
  totalDemandLossMw: number;
  totalCustomersAffected: number;
  byCause: Array<{ key: string; count: number }>;
  byNercRegion: Array<{ key: string; count: number }>;
  byMonth: Array<{ key: string; count: number }>;
}> {
  const events = await fetchAll(buildWhere(opts));
  const tally = (pick: (e: GridEvent) => string | null) => {
    const m = new Map<string, number>();
    for (const e of events) {
      const k = (pick(e) ?? "Unknown").trim() || "Unknown";
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([key, count]) => ({ key, count }));
  };
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const byMonth = tally(e => e.month).sort(
    (a, b) => MONTHS.indexOf(a.key) - MONTHS.indexOf(b.key),
  );
  return {
    total: events.length,
    totalDemandLossMw: events.reduce((s, e) => s + (e.demand_loss_mw ?? 0), 0),
    totalCustomersAffected: events.reduce((s, e) => s + (e.customers_affected ?? 0), 0),
    byCause: tally(e => e.event_type),
    byNercRegion: tally(e => e.nerc_region),
    byMonth,
  };
}

/** Clear cached responses. */
export function clearCache(): void { api.clearCache(); }
