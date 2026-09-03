/**
 * NOAA Climate Data SDK — weather, temperature, precipitation from NCEI.
 *
 * KEYLESS. Uses NOAA/NCEI's open Access Data + Search services rather than the
 * token-gated CDO v2 web service:
 *   - Data:     https://www.ncei.noaa.gov/access/services/data/v1
 *   - Stations: https://www.ncei.noaa.gov/access/services/search/v1/data
 *   - Datasets: https://www.ncei.noaa.gov/access/services/search/v1/datasets
 *
 * Usage:
 *   import { getClimateData, searchStations } from "fedpipe/sdk/noaa";
 *   const s = await searchStations({ state: "LA" });
 *   const d = await getClimateData({ dataset: "GHCND", stationId: "USW00012916",
 *                                    startDate: "2020-06-01", endDate: "2020-08-31" });
 *
 * Datasets: GHCND (daily), GSOM (monthly), GSOY (annual) — the familiar CDO
 * IDs are accepted and mapped to NCEI's dataset names.
 */

import { createClient } from "../../shared/client.js";

const api = createClient({
  baseUrl: "https://www.ncei.noaa.gov/access/services",
  name: "noaa",
  defaultHeaders: { "User-Agent": "fedpipe (github.com/AndrewFribush/fedpipe)" },
  rateLimit: { perSecond: 5, burst: 5 },
  cacheTtlMs: 24 * 60 * 60 * 1000, // 24h — historical weather doesn't change
});

// ─── Dataset mapping ─────────────────────────────────────────────────

/** Friendly CDO IDs → NCEI Access dataset names (native names also pass through). */
const DATASET_MAP: Record<string, string> = {
  GHCND: "daily-summaries",
  GSOM: "global-summary-of-the-month",
  GSOY: "global-summary-of-the-year",
  NORMAL_DLY: "normals-daily",
};
function nceiDataset(id: string): string {
  return DATASET_MAP[id?.toUpperCase?.()] ?? id;
}
/** Sensible default measurements per dataset when the caller names none. */
function defaultDataTypes(): string {
  return "TMAX,TMIN,TAVG,PRCP,SNOW";
}

/** Curated keyless dataset catalog (the climate-relevant NCEI datasets). */
export const DATASETS = [
  { id: "GHCND", ncei: "daily-summaries", name: "Daily Summaries (GHCN-Daily)", coverage: "1750s–present", dataTypes: "TMAX, TMIN, TAVG, PRCP, SNOW, SNWD, AWND" },
  { id: "GSOM", ncei: "global-summary-of-the-month", name: "Global Summary of the Month", coverage: "1760s–present", dataTypes: "TAVG, TMAX, TMIN, PRCP, EMXT, EMNT" },
  { id: "GSOY", ncei: "global-summary-of-the-year", name: "Global Summary of the Year", coverage: "1760s–present", dataTypes: "TAVG, PRCP, EMXT, EMNT, DP01" },
  { id: "NORMAL_DLY", ncei: "normals-daily", name: "1991–2020 Daily Climate Normals", coverage: "1991–2020 climatology", dataTypes: "DLY-TMAX-NORMAL, DLY-TMIN-NORMAL, DLY-PRCP-NORMAL" },
] as const;

// ─── Approximate US state bounding boxes [north, west, south, east] ───

export const STATE_BBOX: Record<string, [number, number, number, number]> = {
  AL: [35.0, -88.5, 30.2, -84.9], AK: [71.5, -179.1, 51.2, -129.9], AZ: [37.0, -114.8, 31.3, -109.0],
  AR: [36.5, -94.6, 33.0, -89.6], CA: [42.0, -124.5, 32.5, -114.1], CO: [41.0, -109.1, 37.0, -102.0],
  CT: [42.05, -73.7, 40.95, -71.8], DE: [39.84, -75.79, 38.45, -75.05], DC: [39.0, -77.12, 38.79, -76.91],
  FL: [31.0, -87.6, 24.4, -80.0], GA: [35.0, -85.6, 30.4, -80.8], HI: [22.3, -160.3, 18.9, -154.8],
  ID: [49.0, -117.24, 42.0, -111.04], IL: [42.5, -91.5, 37.0, -87.0], IN: [41.76, -88.1, 37.77, -84.8],
  IA: [43.5, -96.6, 40.4, -90.1], KS: [40.0, -102.05, 37.0, -94.6], KY: [39.15, -89.6, 36.5, -81.96],
  LA: [33.0, -94.0, 28.9, -88.8], ME: [47.5, -71.1, 43.0, -66.9], MD: [39.72, -79.49, 37.9, -75.05],
  MA: [42.9, -73.5, 41.2, -69.9], MI: [48.3, -90.4, 41.7, -82.4], MN: [49.4, -97.24, 43.5, -89.5],
  MS: [35.0, -91.7, 30.1, -88.1], MO: [40.6, -95.77, 35.99, -89.1], MT: [49.0, -116.05, 44.36, -104.04],
  NE: [43.0, -104.05, 40.0, -95.3], NV: [42.0, -120.0, 35.0, -114.04], NH: [45.3, -72.56, 42.7, -70.6],
  NJ: [41.36, -75.56, 38.93, -73.9], NM: [37.0, -109.05, 31.33, -103.0], NY: [45.0, -79.76, 40.5, -71.85],
  NC: [36.59, -84.32, 33.84, -75.46], ND: [49.0, -104.05, 45.93, -96.55], OH: [42.0, -84.82, 38.4, -80.52],
  OK: [37.0, -103.0, 33.6, -94.43], OR: [46.29, -124.57, 41.99, -116.46], PA: [42.27, -80.52, 39.72, -74.69],
  RI: [42.02, -71.9, 41.15, -71.12], SC: [35.22, -83.35, 32.03, -78.54], SD: [45.94, -104.06, 42.48, -96.44],
  TN: [36.68, -90.31, 34.98, -81.65], TX: [36.5, -106.65, 25.84, -93.51], UT: [42.0, -114.05, 37.0, -109.04],
  VT: [45.02, -73.44, 42.73, -71.46], VA: [39.47, -83.68, 36.54, -75.24], WA: [49.0, -124.85, 45.54, -116.92],
  WV: [40.64, -82.64, 37.2, -77.72], WI: [47.31, -92.89, 42.49, -86.8], WY: [45.0, -111.06, 41.0, -104.05],
};

// ─── Types ───────────────────────────────────────────────────────────

export interface NoaaStation {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  mindate: string | null;
  maxdate: string | null;
  dataTypes: string[];
}

export interface NoaaDataPoint {
  date: string;
  datatype: string;
  station: string;
  value: number | null;
}

// ─── Public API ──────────────────────────────────────────────────────

/** List the keyless NCEI climate datasets. */
export async function listDatasets(): Promise<typeof DATASETS[number][]> {
  return [...DATASETS];
}

/** Resolve a bounding box (N,W,S,E) from a state code, lat/lon+radius, or explicit bbox. */
function resolveBbox(opts: {
  state?: string; bbox?: string; lat?: number; lon?: number; radiusKm?: number;
}): string | undefined {
  if (opts.bbox) return opts.bbox;
  if (opts.state) {
    const b = STATE_BBOX[opts.state.toUpperCase()];
    if (b) return b.join(",");
  }
  if (opts.lat != null && opts.lon != null) {
    const r = (opts.radiusKm ?? 50) / 111; // ~km per degree
    return [opts.lat + r, opts.lon - r, opts.lat - r, opts.lon + r].map(n => n.toFixed(4)).join(",");
  }
  return undefined;
}

/** Search for weather stations by state, lat/lon, or explicit bounding box. */
export async function searchStations(opts: {
  state?: string;
  bbox?: string;           // "north,west,south,east"
  lat?: number;
  lon?: number;
  radiusKm?: number;
  dataset?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}): Promise<NoaaStation[]> {
  const bbox = resolveBbox(opts);
  const data = await api.get<{ results?: any[] }>("/search/v1/data", {
    dataset: nceiDataset(opts.dataset ?? "GHCND"),
    bbox,
    startDate: opts.startDate ?? "2020-01-01",
    endDate: opts.endDate ?? new Date().toISOString().slice(0, 10),
    limit: opts.limit ?? 25,
    offset: 0,
  });
  return (data.results ?? []).map(r => {
    const st = Array.isArray(r.stations) ? r.stations[0] : undefined;
    const coords = r.centroid?.coordinates ?? r.location?.coordinates;
    return {
      id: st?.id ?? r.id ?? "",
      name: st?.name ?? r.name ?? "",
      longitude: Array.isArray(coords) ? Number(coords[0]) : null,
      latitude: Array.isArray(coords) ? Number(coords[1]) : null,
      mindate: r.startDate ?? null,
      maxdate: r.endDate ?? null,
      dataTypes: Array.isArray(r.dataTypes) ? r.dataTypes.map((d: any) => d.id ?? d).slice(0, 20) : [],
    };
  });
}

/** Get climate observations for a station (keyless). Returns long-format points. */
export async function getClimateData(opts: {
  dataset: string;
  stationId: string;
  startDate: string;
  endDate: string;
  dataTypes?: string;   // comma-separated, e.g. "TMAX,TMIN,PRCP"
  limit?: number;
}): Promise<{ count: number; data: NoaaDataPoint[] }> {
  // NCEI wants bare station IDs (e.g. "USW00094728"), not "GHCND:USW00094728".
  const station = opts.stationId.includes(":") ? opts.stationId.split(":").pop()! : opts.stationId;
  const rows = await api.get<Array<Record<string, string>>>("/data/v1", {
    dataset: nceiDataset(opts.dataset),
    stations: station,
    startDate: opts.startDate,
    endDate: opts.endDate,
    dataTypes: opts.dataTypes ?? defaultDataTypes(),
    format: "json",
    units: "standard",
  });

  const points: NoaaDataPoint[] = [];
  for (const row of Array.isArray(rows) ? rows : []) {
    const date = row.DATE;
    const sta = row.STATION ?? station;
    for (const [k, v] of Object.entries(row)) {
      if (k === "DATE" || k === "STATION" || v === "" || v == null) continue;
      const num = Number(v);
      points.push({ date, datatype: k, station: sta, value: Number.isNaN(num) ? null : num });
    }
  }
  const limit = opts.limit ?? 1000;
  return { count: points.length, data: points.slice(0, limit) };
}

/** Clear cached responses. */
export function clearCache(): void { api.clearCache(); }
