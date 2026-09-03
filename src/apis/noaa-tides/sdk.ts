/**
 * NOAA Tides & Currents SDK — the CO-OPS (Center for Operational Oceanographic
 * Products and Services) API (api.tidesandcurrents.noaa.gov).
 *
 * Real-time and historical water levels, tide predictions, and coastal
 * meteorology (water/air temperature, wind, barometric pressure) from NOAA's
 * ~300 coastal and Great Lakes tide stations. The coastal-water complement to
 * USGS streamflow (inland rivers) and NWS forecasts.
 *
 * Standalone — no MCP or Zod required:
 *   import { findStations, getObservations } from "fedpipe/sdk/noaa-tides";
 *
 * Keyless: CO-OPS serves open data with no signup.
 */

import { createClient, qp } from "../../shared/client.js";

const mdApi = createClient({
  baseUrl: "https://api.tidesandcurrents.noaa.gov",
  name: "noaa-tides-md",
  cacheTtlMs: 24 * 60 * 60 * 1000, // 1d — station metadata is stable
});

const dataApi = createClient({
  baseUrl: "https://api.tidesandcurrents.noaa.gov",
  name: "noaa-tides-data",
  cacheTtlMs: 5 * 60 * 1000, // 5m — observations are near-real-time
});

// ─── Reference ───────────────────────────────────────────────────────

/** CO-OPS data products available through getObservations. */
export const PRODUCTS = {
  water_level: "Observed water level (ft, relative to datum)",
  predictions: "Predicted tide (ft) — requires a datum",
  water_temperature: "Water temperature (°F)",
  air_temperature: "Air temperature (°F)",
  wind: "Wind speed/direction/gust",
  air_pressure: "Barometric pressure (mb)",
} as const;

// ─── Types ───────────────────────────────────────────────────────────

export interface TideStation {
  id: string;
  name: string;
  state: string | null;
  lat: number;
  lng: number;
  distanceKm?: number;
}

export interface TideObservation {
  time: string;
  value: number | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────

function haversineKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function yyyymmdd(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Find CO-OPS tide stations — by state, or nearest to a lat/lon.
 */
export async function findStations(opts: {
  state?: string;
  lat?: number;
  lon?: number;
  limit?: number;
} = {}): Promise<TideStation[]> {
  const raw = await mdApi.get<any>("/mdapi/prod/webapi/stations.json", qp({ type: "waterlevels" }));
  let stations: TideStation[] = (raw?.stations ?? []).map((s: any) => ({
    id: String(s.id),
    name: s.name,
    state: s.state ?? null,
    lat: Number(s.lat),
    lng: Number(s.lng),
  }));

  if (opts.state) {
    const st = opts.state.toUpperCase();
    stations = stations.filter((s) => (s.state ?? "").toUpperCase() === st);
  }
  if (opts.lat != null && opts.lon != null) {
    for (const s of stations) s.distanceKm = Math.round(haversineKm(opts.lat, opts.lon, s.lat, s.lng) * 10) / 10;
    stations.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }
  return stations.slice(0, opts.limit ?? 25);
}

/**
 * Observations at a station.
 *
 * - `product`: one of PRODUCTS (default "water_level").
 * - `hours`: last N hours (default: latest single reading if no range given).
 * - `begin`/`end`: explicit dates (YYYY-MM-DD) — overrides `hours`.
 * - `datum`: required for water_level/predictions (default "MLLW").
 */
export async function getObservations(opts: {
  station: string;
  product?: string;
  hours?: number;
  begin?: string;
  end?: string;
  datum?: string;
}): Promise<{ metadata: Record<string, unknown>; observations: TideObservation[] }> {
  const product = opts.product ?? "water_level";
  const needsDatum = product === "water_level" || product === "predictions";

  const params: Record<string, string | number | undefined> = {
    station: opts.station,
    product,
    units: "english",
    time_zone: "lst_ldt",
    format: "json",
    datum: needsDatum ? (opts.datum ?? "MLLW") : undefined,
  };
  if (opts.begin && opts.end) {
    params.begin_date = opts.begin.replace(/-/g, "");
    params.end_date = opts.end.replace(/-/g, "");
  } else if (opts.hours != null) {
    const end = new Date();
    const begin = new Date(end.getTime() - opts.hours * 3600 * 1000);
    params.begin_date = yyyymmdd(begin);
    params.end_date = yyyymmdd(end);
  } else {
    params.date = "latest";
  }

  const raw = await dataApi.get<any>("/api/prod/datagetter", qp(params));
  if (raw?.error) throw new Error(`noaa-tides: ${raw.error.message ?? "CO-OPS error"}`);

  const key = product === "predictions" ? "predictions" : "data";
  const rows: any[] = raw?.[key] ?? [];
  const observations = rows.map((r) => ({
    time: r.t,
    value: r.v != null && r.v !== "" ? Number(r.v) : null,
  }));
  return { metadata: raw?.metadata ?? { id: opts.station }, observations };
}

/** Clear cached responses. */
export function clearCache(): void {
  mdApi.clearCache();
  dataApi.clearCache();
}
