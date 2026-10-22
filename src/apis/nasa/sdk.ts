/**
 * NASA SDK — two open, keyless NASA data services:
 *
 *   - POWER (power.larc.nasa.gov): Prediction Of Worldwide Energy Resources.
 *     Satellite-derived daily/monthly/climatology surface meteorology and solar
 *     radiation for ANY lat/lon on Earth — temperature, precipitation, wind, and
 *     the solar irradiance used to size PV/solar-thermal systems. Backed by MERRA-2
 *     and CERES/SRB. The global, gridded complement to NWS point forecasts and
 *     ground-station climate normals.
 *   - EONET (eonet.gsfc.nasa.gov): Earth Observatory Natural Event Tracker —
 *     a live, curated feed of ongoing natural events (wildfires, severe storms,
 *     volcanoes, floods, ice, drought) with coordinates and magnitudes, sourced
 *     from IRWIN, InciWeb, Smithsonian GVP, and others.
 *
 * Standalone — no MCP or Zod required:
 *   import { getPowerPoint, getNaturalEvents } from "fedpipe/sdk/nasa";
 *
 * Keyless: both POWER and EONET serve open data with no signup.
 */

import { createClient, qp } from "../../shared/client.js";

// ─── Clients ─────────────────────────────────────────────────────────

const power = createClient({
  baseUrl: "https://power.larc.nasa.gov",
  name: "nasa-power",
  cacheTtlMs: 24 * 60 * 60 * 1000, // 1d — reanalysis data is stable
  timeoutMs: 45_000,
});

const eonet = createClient({
  baseUrl: "https://eonet.gsfc.nasa.gov",
  name: "nasa-eonet",
  cacheTtlMs: 60 * 60 * 1000, // 1h — the live event feed refreshes often
});

// ─── Reference ───────────────────────────────────────────────────────

/** The most useful POWER parameters, keyed by short code. */
export const POWER_PARAMETERS = {
  T2M: "Temperature at 2 m (°C)",
  T2M_MAX: "Max temperature at 2 m (°C)",
  T2M_MIN: "Min temperature at 2 m (°C)",
  PRECTOTCORR: "Precipitation, bias-corrected (mm/day)",
  ALLSKY_SFC_SW_DWN: "All-sky surface shortwave (solar) irradiance (kWh/m²/day)",
  CLRSKY_SFC_SW_DWN: "Clear-sky surface shortwave irradiance (kWh/m²/day)",
  WS10M: "Wind speed at 10 m (m/s)",
  WS50M: "Wind speed at 50 m — hub height (m/s)",
  RH2M: "Relative humidity at 2 m (%)",
  T2MDEW: "Dew point at 2 m (°C)",
} as const;

/** EONET event categories. */
export const EONET_CATEGORIES = [
  "drought", "dustHaze", "earthquakes", "floods", "landslides", "manmade",
  "seaLakeIce", "severeStorms", "snow", "tempExtremes", "volcanoes",
  "waterColor", "wildfires",
] as const;

// ─── Types ───────────────────────────────────────────────────────────

export interface PowerResult {
  temporal: string;
  latitude: number;
  longitude: number;
  elevationMeters: number | null;
  units: Record<string, string>;
  /** One row per period (YYYYMMDD daily, YYYYMM monthly, or month name for climatology). */
  rows: Array<Record<string, string | number | null>>;
}

export interface NaturalEvent {
  id: string;
  title: string;
  category: string;
  closed: string | null;
  date: string | null;
  magnitude: number | null;
  magnitudeUnit: string | null;
  latitude: number | null;
  longitude: number | null;
  source: string | null;
  link: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────

const FILL = -999;
const num = (v: unknown): number | null =>
  v == null || v === FILL || Number(v) === FILL || Number.isNaN(Number(v)) ? null : Number(v);

/** Compact YYYY-MM-DD / YYYYMMDD / YYYY-MM / YYYY to POWER's expected token. */
function powerDate(v: string | undefined, temporal: string, isEnd: boolean): string | undefined {
  if (!v) return undefined;
  const digits = String(v).replace(/[^0-9]/g, "");
  if (temporal === "monthly") return digits.slice(0, 4); // POWER monthly takes YYYY
  // daily takes YYYYMMDD
  if (digits.length >= 8) return digits.slice(0, 8);
  if (digits.length === 4) return `${digits}${isEnd ? "1231" : "0101"}`;
  return digits;
}

function yyyymmdd(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Surface meteorology & solar radiation at a point, from NASA POWER.
 *
 * - `temporal`: "daily" (default), "monthly", or "climatology" (long-term
 *   monthly means, no dates needed).
 * - `parameters`: comma-separated POWER codes (see POWER_PARAMETERS).
 *   Defaults to temperature, precipitation, solar irradiance, and wind.
 * - `community`: "AG" agroclimatology (default), "RE" renewable energy, "SB" buildings.
 * - `start`/`end`: for daily (YYYY-MM-DD) or monthly (YYYY); ignored for climatology.
 *   Daily defaults to the last 30 days.
 */
export async function getPowerPoint(opts: {
  lat: number;
  lon: number;
  parameters?: string;
  temporal?: "daily" | "monthly" | "climatology";
  community?: string;
  start?: string;
  end?: string;
}): Promise<PowerResult> {
  const temporal = opts.temporal ?? "daily";
  const parameters =
    opts.parameters ?? "T2M,T2M_MAX,T2M_MIN,PRECTOTCORR,ALLSKY_SFC_SW_DWN,WS10M";
  const community = opts.community ?? "AG";

  let start = powerDate(opts.start, temporal, false);
  let end = powerDate(opts.end, temporal, true);
  if (temporal === "daily" && !start) {
    const now = new Date();
    const past = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    start = yyyymmdd(past);
    end = yyyymmdd(now);
  }
  if (temporal === "monthly" && !start) {
    const y = new Date().getUTCFullYear();
    start = String(y - 5);
    end = String(y);
  }

  const raw = await power.get<any>(`/api/temporal/${temporal}/point`, qp({
    parameters,
    community,
    longitude: opts.lon,
    latitude: opts.lat,
    format: "JSON",
    start,
    end,
  }));

  const paramBag = raw?.properties?.parameter ?? {};
  const unitsBag = raw?.parameters ?? {};
  const coords: number[] = raw?.geometry?.coordinates ?? [opts.lon, opts.lat];

  // Collect every period across all parameters, preserving order.
  const periods: string[] = [];
  const seen = new Set<string>();
  for (const p of Object.keys(paramBag)) {
    for (const period of Object.keys(paramBag[p] ?? {})) {
      if (!seen.has(period)) { seen.add(period); periods.push(period); }
    }
  }

  const rows = periods.map((period) => {
    const row: Record<string, string | number | null> = { period };
    for (const p of Object.keys(paramBag)) row[p] = num(paramBag[p]?.[period]);
    return row;
  });

  const units: Record<string, string> = {};
  for (const [k, v] of Object.entries<any>(unitsBag)) units[k] = v?.units ?? "";

  return {
    temporal,
    latitude: coords[1] ?? opts.lat,
    longitude: coords[0] ?? opts.lon,
    elevationMeters: coords[2] != null ? Math.round(coords[2]) : null,
    units,
    rows,
  };
}

/**
 * Ongoing (or recent) natural events from NASA EONET.
 *
 * - `category`: filter to one EONET_CATEGORIES value (e.g. "wildfires").
 * - `status`: "open" (default, active) or "closed" (concluded).
 * - `days`: only events updated in the last N days.
 * - `bbox`: [west, north, east, south] to restrict geographically.
 * - `limit`: max events.
 */
export async function getNaturalEvents(opts: {
  category?: string;
  status?: "open" | "closed";
  days?: number;
  bbox?: [number, number, number, number];
  limit?: number;
} = {}): Promise<NaturalEvent[]> {
  const raw = await eonet.get<any>("/api/v3/events", qp({
    status: opts.status ?? "open",
    category: opts.category,
    days: opts.days,
    limit: opts.limit ?? 50,
    bbox: opts.bbox ? opts.bbox.join(",") : undefined,
  }));

  const events: any[] = raw?.events ?? [];
  return events.map((e) => {
    const geo = Array.isArray(e.geometry) ? e.geometry[e.geometry.length - 1] : null;
    const coords = geo?.coordinates;
    return {
      id: e.id,
      title: e.title,
      category: e.categories?.[0]?.title ?? e.categories?.[0]?.id ?? "",
      closed: e.closed ?? null,
      date: geo?.date ?? null,
      magnitude: geo?.magnitudeValue != null ? Number(geo.magnitudeValue) : null,
      magnitudeUnit: geo?.magnitudeUnit ?? null,
      latitude: Array.isArray(coords) ? coords[1] ?? null : null,
      longitude: Array.isArray(coords) ? coords[0] ?? null : null,
      source: e.sources?.[0]?.id ?? null,
      link: e.link,
    };
  });
}

/** Clear cached responses (both upstreams). */
export function clearCache(): void {
  power.clearCache();
  eonet.clearCache();
}
