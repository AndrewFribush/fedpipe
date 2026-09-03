/**
 * Space Weather SDK — solar and geomagnetic activity from two open, keyless
 * upstreams:
 *
 *   - NOAA SWPC (services.swpc.noaa.gov): the U.S. Space Weather Prediction
 *     Center. Monthly solar-cycle indices (international sunspot number + F10.7
 *     cm radio flux) back to 1749, the recent planetary K-index, and the
 *     current NOAA G/S/R storm scales.
 *   - GFZ Potsdam (kp.gfz.de): the official IAGA geomagnetic index archive —
 *     Kp (3-hourly) and Ap (daily) since 1932, via its date-ranged JSON
 *     webservice. This is the canonical source NOAA, NASA, and ESA all cite
 *     for the long geomagnetic record.
 *
 * Standalone — no MCP or Zod required:
 *   import { getSolarCycle, getGeomagnetic, getCurrentConditions } from "fedpipe/sdk/space-weather";
 *
 *   const storms = await getGeomagnetic({ start: "2003-10", end: "2003-11", minValue: 100 });
 *   // → the Halloween 2003 severe-storm days (Ap peaked at 204 on Oct 29)
 *
 * Keyless: both SWPC and GFZ serve open data with no signup.
 */

import { createClient } from "../../shared/client.js";

// ─── Clients ─────────────────────────────────────────────────────────

const swpc = createClient({
  baseUrl: "https://services.swpc.noaa.gov",
  name: "space-weather-swpc",
  cacheTtlMs: 60 * 60 * 1000, // 1h — SWPC products refresh roughly hourly
});

const gfz = createClient({
  baseUrl: "https://kp.gfz.de",
  name: "space-weather-gfz",
  cacheTtlMs: 24 * 60 * 60 * 1000, // 1d — the geomagnetic archive is stable
});

// ─── Types ───────────────────────────────────────────────────────────

/** One month of solar-cycle activity. */
export interface SolarCyclePoint {
  /** YYYY-MM */
  period: string;
  /** International sunspot number (SSN). */
  ssn: number | null;
  /** F10.7 cm solar radio flux (sfu); carried from 2004 in this SWPC series. */
  f107: number | null;
  /** 13-month smoothed SSN (cycle trend); null until enough surrounding months exist. */
  smoothed_ssn: number | null;
  /** 13-month smoothed F10.7. */
  smoothed_f107: number | null;
}

/** One geomagnetic-index observation (daily Ap, or 3-hourly Kp). */
export interface GeomagneticPoint {
  /** ISO date (daily Ap) or datetime (3-hourly Kp). */
  time: string;
  value: number | null;
}

/** Current space-weather snapshot. */
export interface CurrentConditions {
  observedAt: string;
  /** Most recent planetary Kp (0–9). */
  kpNow: number | null;
  /** Peak planetary Kp over the last 24h. */
  kpMax24h: number | null;
  /** NOAA G-scale (geomagnetic storm), e.g. "0 (none)".."5 (extreme)". */
  gScale: string;
  /** NOAA S-scale (solar radiation storm). */
  solarRadiation: string;
  /** NOAA R-scale (radio blackout). */
  radioBlackout: string;
  /** Recent 3-hourly Kp points (last ~2 days). */
  recent: GeomagneticPoint[];
}

// ─── Reference ───────────────────────────────────────────────────────

/** Daily-Ap storm severity bands, aligned to the NOAA G-scale. */
export const AP_STORM_SCALE = {
  quiet: "< 30",
  G1_minor: "30–50",
  G2_G3_moderate_strong: "50–100",
  G4_severe: "100–200",
  G5_extreme: "200+",
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────

const clean = (v: unknown): number | null =>
  v == null || v === -1 || v === "-1" || Number(v) < 0 ? null : Number(v);

/** Normalize a YYYY / YYYY-MM bound for month-string comparison. */
function normMonth(v: string, isEnd: boolean): string {
  const s = String(v).trim();
  if (/^\d{4}$/.test(s)) return `${s}-${isEnd ? "12" : "01"}`;
  return s.slice(0, 7);
}

/** Normalize a YYYY / YYYY-MM / YYYY-MM-DD bound to an ISO instant for GFZ. */
function toISO(v: string, isEnd: boolean): string {
  const s = String(v).trim();
  if (/^\d{4}$/.test(s)) return `${s}-${isEnd ? "12-31T23:59:59Z" : "01-01T00:00:00Z"}`;
  if (/^\d{4}-\d{2}$/.test(s)) {
    if (!isEnd) return `${s}-01T00:00:00Z`;
    // last day of the month
    const [y, m] = s.split("-").map(Number);
    const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
    return `${s}-${String(last).padStart(2, "0")}T23:59:59Z`;
  }
  return `${s}T${isEnd ? "23:59:59Z" : "00:00:00Z"}`;
}

function yearsAgo(n: number): string {
  const d = new Date();
  d.setUTCFullYear(d.getUTCFullYear() - n);
  return d.toISOString();
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Monthly solar-cycle activity — international sunspot number and F10.7 flux.
 * Source: NOAA SWPC observed solar-cycle indices (since 1749).
 * Defaults to the last 45 years (~4 solar cycles) when no range is given.
 */
export async function getSolarCycle(
  opts: { start?: string; end?: string } = {},
): Promise<SolarCyclePoint[]> {
  const raw = await swpc.get<Array<Record<string, unknown>>>(
    "/json/solar-cycle/observed-solar-cycle-indices.json",
  );
  const start = normMonth(opts.start ?? `${new Date().getUTCFullYear() - 45}`, false);
  const end = normMonth(opts.end ?? "9999-12", true);
  const out: SolarCyclePoint[] = [];
  for (const r of raw) {
    const period = String(r["time-tag"]);
    if (period < start || period > end) continue;
    out.push({
      period,
      ssn: clean(r.ssn),
      f107: clean(r["f10.7"]),
      smoothed_ssn: clean(r.smoothed_ssn),
      smoothed_f107: clean(r["smoothed_f10.7"]),
    });
  }
  return out;
}

/**
 * Geomagnetic index over time — Ap (daily) or Kp (3-hourly).
 * Source: GFZ Potsdam IAGA archive (since 1932).
 *
 * - `index`: "Ap" (daily, default) or "Kp" (3-hourly planetary K, 0–9).
 * - `frequency`: for Ap, "daily" (default) or "monthly" mean. (Kp stays 3-hourly.)
 * - `minValue`: return only observations at/above this value — a storm filter.
 *
 * Defaults to the last 12 months when no range is given.
 */
export async function getGeomagnetic(
  opts: {
    start?: string;
    end?: string;
    index?: "Ap" | "Kp";
    frequency?: "daily" | "monthly";
    minValue?: number;
  } = {},
): Promise<{ points: GeomagneticPoint[]; index: string; frequency: string }> {
  const index = opts.index === "Kp" ? "Kp" : "Ap";
  const start = toISO(opts.start ?? yearsAgo(1), false);
  const end = toISO(opts.end ?? new Date().toISOString().slice(0, 10), true);

  const raw = await gfz.get<Record<string, unknown>>("/app/json/", { start, end, index });
  const times = (raw.datetime as string[]) ?? [];
  const vals = (raw[index] as unknown[]) ?? [];

  let points: GeomagneticPoint[] = times.map((t, i) => ({ time: t, value: clean(vals[i]) }));

  let frequency = index === "Kp" ? "3-hourly" : "daily";
  if (index === "Ap" && opts.frequency === "monthly") {
    points = toMonthlyMean(points);
    frequency = "monthly";
  }
  if (opts.minValue != null) {
    points = points.filter(p => p.value != null && p.value >= opts.minValue!);
  }
  return { points, index, frequency };
}

/** Aggregate daily points to monthly means (YYYY-MM). */
function toMonthlyMean(points: GeomagneticPoint[]): GeomagneticPoint[] {
  const buckets = new Map<string, number[]>();
  for (const p of points) {
    if (p.value == null) continue;
    const ym = p.time.slice(0, 7);
    let bucket = buckets.get(ym);
    if (!bucket) buckets.set(ym, (bucket = []));
    bucket.push(p.value);
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([ym, vs]) => ({
      time: ym,
      value: Math.round((vs.reduce((s, v) => s + v, 0) / vs.length) * 10) / 10,
    }));
}

/**
 * Current space-weather conditions — latest planetary Kp, 24h peak Kp, and
 * the current NOAA G/S/R storm scales. Source: NOAA SWPC (updated hourly).
 */
export async function getCurrentConditions(): Promise<CurrentConditions> {
  const [kp, scales] = await Promise.all([
    swpc.get<Array<Record<string, unknown>>>("/products/noaa-planetary-k-index.json"),
    swpc.get<Record<string, Record<string, any>>>("/products/noaa-scales.json"),
  ]);

  const recent: GeomagneticPoint[] = kp.map(row => ({
    time: String(row.time_tag),
    value: clean(row.Kp),
  }));
  const last24 = recent.slice(-8).map(p => p.value).filter((v): v is number => v != null);

  const cur = scales["-1"] ?? {};
  const band = (o: any) => `${o?.Scale ?? "0"} (${o?.Text ?? "none"})`;

  return {
    observedAt: `${cur.DateStamp ?? ""} ${cur.TimeStamp ?? ""}`.trim() || (recent.at(-1)?.time ?? ""),
    kpNow: recent.at(-1)?.value ?? null,
    kpMax24h: last24.length ? Math.max(...last24) : null,
    gScale: band(cur.G),
    solarRadiation: band(cur.S),
    radioBlackout: band(cur.R),
    recent: recent.slice(-16),
  };
}

/** Clear cached responses (both upstreams). */
export function clearCache(): void {
  swpc.clearCache();
  gfz.clearCache();
}
