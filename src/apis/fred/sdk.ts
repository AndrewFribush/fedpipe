/**
 * @module FRED — Federal Reserve Economic Data
 *
 * Typed API client for FRED's 800K+ economic time series.
 *
 * Standalone — no MCP server required. Usage:
 *
 *   import { getObservations, searchSeries } from "fedpipe/sdk/fred";
 *
 *   const gdp = await getObservations("GDP", { start: "2024-01-01" });
 *   console.log(gdp.observations);
 *
 * Requires `FRED_API_KEY` env var. Get one free at {@link https://fredaccount.stlouisfed.org/apikeys}.
 */

import { createClient } from "../../shared/client.js";

// ─── Client ──────────────────────────────────────────────────────────

const api = createClient({
  baseUrl: "https://api.stlouisfed.org",
  name: "fred",
  auth: { type: "query", envParams: { api_key: "FRED_API_KEY" }, extraParams: { file_type: "json" } },
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000, // 1 hour — FRED data updates a few times/day at most
});

/** FRED v2 endpoints reject the `api_key` query param — they require `Authorization: Bearer <key>`. */
const apiV2 = createClient({
  baseUrl: "https://api.stlouisfed.org",
  name: "fred-v2",
  auth: { type: "header", envParams: { Authorization: "FRED_API_KEY" }, prefix: "Bearer " },
  rateLimit: { perSecond: 2, burst: 5 },
  cacheTtlMs: 60 * 60 * 1000,
});

// ─── Types ───────────────────────────────────────────────────────────

/** Metadata for a FRED economic data series. */
export interface FredSeries {
  /** Series identifier (e.g. "GDP", "UNRATE", "CPIAUCSL"). */
  id: string;
  /** Human-readable title (e.g. "Gross Domestic Product"). */
  title: string;
  /** Data frequency: "Daily", "Weekly", "Monthly", "Quarterly", "Annual". */
  frequency: string;
  /** Units of measurement (e.g. "Billions of Dollars", "Percent"). */
  units: string;
  /** Seasonal adjustment status (e.g. "Seasonally Adjusted Annual Rate"). */
  seasonal_adjustment: string;
  /** ISO timestamp of the most recent update. */
  last_updated: string;
  /** Search popularity score (0–100). */
  popularity: number;
  /** Descriptive notes about the series. */
  notes: string;
  /** Earliest available observation date (YYYY-MM-DD). */
  observation_start: string;
  /** Latest available observation date (YYYY-MM-DD). */
  observation_end: string;
}

/** FRED data transformations for observations (`units` parameter). */
export type FredUnits = "lin" | "chg" | "ch1" | "pch" | "pc1" | "pca" | "cch" | "cca" | "log";

/** A node in FRED's category tree. */
export interface FredCategory {
  id: number;
  name: string;
  parent_id: number;
  notes?: string;
}

/** A FRED release (a publication such as "Employment Situation"). */
export interface FredRelease {
  id: number;
  name: string;
  press_release: boolean;
  link?: string;
  notes?: string;
  realtime_start?: string;
  realtime_end?: string;
}

/** A FRED data source (the agency that publishes a release). */
export interface FredSource {
  id: number;
  name: string;
  link?: string;
  notes?: string;
}

/** Result of a FRED series search. */
export interface FredSearchResult {
  /** Total number of matching series. */
  count: number;
  /** Array of matching series metadata. */
  seriess: FredSeries[];
}

/** A single data point in a FRED time series. */
export interface FredObservation {
  /** Observation date (YYYY-MM-DD). */
  date: string;
  /** Observation value as a string (use `parseFloat()` to convert). A value of "." indicates missing data. */
  value: string;
}

/** Response from a FRED observations query. */
export interface FredObservations {
  /** Total number of observations in the date range. */
  count: number;
  /** Start of the observation range (YYYY-MM-DD). */
  observation_start: string;
  /** End of the observation range (YYYY-MM-DD). */
  observation_end: string;
  /** Array of date/value observation pairs. */
  observations: FredObservation[];
}

/** A series within a FRED release, including its observations. */
export interface FredReleaseSeries {
  /** Series identifier. */
  series_id: string;
  /** Human-readable title. */
  title: string;
  /** Data frequency. */
  frequency: string;
  /** Units of measurement. */
  units: string;
  /** Seasonal adjustment status. */
  seasonal_adjustment: string;
  /** Observation data points for this series. */
  observations: FredObservation[];
}

/** Result of a FRED release data query. */
export interface FredReleaseResult {
  /** Whether more series are available beyond this page. */
  has_more: boolean;
  /** Cursor for fetching the next page of series. */
  next_cursor?: string;
  /** Release metadata. */
  release: { release_id: number; name: string };
  /** Series included in this release with their observations. */
  series: FredReleaseSeries[];
}

// ─── Public API ──────────────────────────────────────────────────────

/**
 * Search FRED's 800K+ economic time series by keyword.
 *
 * @param query - Search term (e.g. "GDP", "unemployment rate", "consumer price index")
 * @param limit - Maximum results to return (default: 20)
 * @returns Matching series with metadata including title, frequency, and units
 *
 * @example
 * ```typescript
 * const results = await searchSeries("consumer price index", 10);
 * console.log(results.seriess.map(s => `${s.id}: ${s.title}`));
 * ```
 */
export async function searchSeries(query: string, limit = 20, opts: {
  /** Restrict to series carrying ALL of these tags (semicolon-separated, e.g. "usa;monthly"). */
  tagNames?: string;
  /** Exclude series carrying any of these tags. */
  excludeTagNames?: string;
  /** Sort field (default: search_rank). */
  orderBy?: "search_rank" | "series_id" | "title" | "units" | "frequency" | "seasonal_adjustment" | "realtime_start" | "realtime_end" | "last_updated" | "observation_start" | "observation_end" | "popularity" | "group_popularity";
  sortOrder?: "asc" | "desc";
  /** Pagination offset. */
  offset?: number;
  /** Filter on a metadata field, e.g. filterVariable "frequency", filterValue "Monthly". */
  filterVariable?: "frequency" | "units" | "seasonal_adjustment";
  filterValue?: string;
} = {}): Promise<FredSearchResult> {
  return api.get<FredSearchResult>("/fred/series/search", {
    search_text: query, limit, order_by: opts.orderBy ?? "search_rank",
    sort_order: opts.sortOrder, offset: opts.offset,
    tag_names: opts.tagNames, exclude_tag_names: opts.excludeTagNames,
    filter_variable: opts.filterVariable, filter_value: opts.filterValue,
  });
}

/**
 * Get metadata for a single FRED series.
 *
 * @param seriesId - FRED series ID (e.g. "GDP", "UNRATE", "FEDFUNDS")
 * @returns Series metadata, or `null` if the series does not exist
 *
 * @example
 * ```typescript
 * const info = await getSeriesInfo("GDP");
 * console.log(`${info?.title} — ${info?.frequency}, ${info?.units}`);
 * ```
 */
export async function getSeriesInfo(seriesId: string): Promise<FredSeries | null> {
  const data = await api.get<{ seriess: FredSeries[] }>("/fred/series", {
    series_id: seriesId.toUpperCase(),
  });
  return data.seriess?.[0] ?? null;
}

/**
 * Get observation values (date/value pairs) for a FRED series.
 *
 * @param seriesId - FRED series ID (e.g. "GDP", "UNRATE", "CPIAUCSL")
 * @param opts - Query options
 * @param opts.start - Start date (YYYY-MM-DD). Defaults to 10 years ago.
 * @param opts.end - End date (YYYY-MM-DD). Defaults to latest available.
 * @param opts.limit - Maximum observations to return (default: 1000)
 * @param opts.sort - Sort order: "asc" (oldest first) or "desc" (newest first, default)
 * @param opts.frequency - Aggregate to frequency: "d", "w", "bw", "m", "q", "sa", "a" (plus week-ending variants "wef", "wem", ...)
 * @param opts.units - Transformation: "lin" (levels, default), "chg", "ch1", "pch" (% change), "pc1" (% change from year ago), "pca", "cch", "cca", "log"
 * @param opts.aggregationMethod - How to aggregate when changing frequency: "avg" (default), "sum", "eop" (end of period)
 * @param opts.outputType - 1 = observations by real-time period (default), 2 = all vintages, 3 = new and revised only, 4 = initial release only
 * @param opts.vintageDates - Comma-separated vintage dates (YYYY-MM-DD) to view data as it was known on those dates
 * @param opts.realtimeStart / opts.realtimeEnd - Real-time period bounds (YYYY-MM-DD) for revision history
 * @returns Observations with date/value pairs
 *
 * @example
 * ```typescript
 * // Latest 5 GDP readings
 * const gdp = await getObservations("GDP", { sort: "desc", limit: 5 });
 * for (const obs of gdp.observations) {
 *   console.log(`${obs.date}: $${obs.value}B`);
 * }
 * ```
 */
export async function getObservations(seriesId: string, opts: {
  start?: string;
  end?: string;
  limit?: number;
  sort?: "asc" | "desc";
  frequency?: string;
  units?: FredUnits;
  aggregationMethod?: "avg" | "sum" | "eop";
  outputType?: 1 | 2 | 3 | 4;
  vintageDates?: string;
  realtimeStart?: string;
  realtimeEnd?: string;
} = {}): Promise<FredObservations> {
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

  // Vintage output types (2/3/4) need a real-time window that spans the vintages; FRED's default
  // (today→today) yields "No vintage dates exist for the specified real-time period".
  const wantsVintages = opts.outputType !== undefined && opts.outputType !== 1;
  const realtimeStart = opts.realtimeStart ?? (wantsVintages && !opts.vintageDates ? "1776-07-04" : undefined);
  const realtimeEnd = opts.realtimeEnd ?? (wantsVintages && !opts.vintageDates ? "9999-12-31" : undefined);

  return api.get<FredObservations>("/fred/series/observations", {
    series_id: seriesId.toUpperCase(),
    observation_start: opts.start ?? tenYearsAgo.toISOString().split("T")[0],
    observation_end: opts.end,
    limit: opts.limit ?? 1000,
    sort_order: opts.sort ?? "desc",
    frequency: opts.frequency,
    units: opts.units,
    aggregation_method: opts.aggregationMethod,
    output_type: opts.outputType,
    vintage_dates: opts.vintageDates,
    realtime_start: realtimeStart,
    realtime_end: realtimeEnd,
  });
}

// ─── Catalog browsing ────────────────────────────────────────────────

/**
 * Get a FRED category (root is 0) with its child categories.
 *
 * @example
 * ```typescript
 * const root = await getCategory(0);          // top-level categories
 * const money = await getCategory(24);        // "Money, Banking, & Finance" and its children
 * ```
 */
export async function getCategory(categoryId = 0): Promise<{ category: FredCategory | null; children: FredCategory[] }> {
  const [cat, kids] = await Promise.all([
    api.get<{ categories: FredCategory[] }>("/fred/category", { category_id: categoryId }),
    api.get<{ categories: FredCategory[] }>("/fred/category/children", { category_id: categoryId }),
  ]);
  return { category: cat.categories?.[0] ?? null, children: kids.categories ?? [] };
}

/** List the series in a FRED category, most popular first. */
export async function getCategorySeries(categoryId: number, opts: { limit?: number; offset?: number } = {}): Promise<FredSearchResult> {
  return api.get<FredSearchResult>("/fred/category/series", {
    category_id: categoryId, limit: opts.limit ?? 50, offset: opts.offset, order_by: "popularity", sort_order: "desc",
  });
}

/** List all FRED releases (e.g. "Gross Domestic Product", "Employment Situation"). */
export async function listReleases(opts: { limit?: number; offset?: number } = {}): Promise<{ count: number; releases: FredRelease[] }> {
  return api.get("/fred/releases", { limit: opts.limit ?? 100, offset: opts.offset, order_by: "release_id" });
}

/** List the series in a release, most popular first. */
export async function getReleaseSeries(releaseId: number, opts: { limit?: number; offset?: number } = {}): Promise<FredSearchResult> {
  return api.get<FredSearchResult>("/fred/release/series", {
    release_id: releaseId, limit: opts.limit ?? 50, offset: opts.offset, order_by: "popularity", sort_order: "desc",
  });
}

/** Past and scheduled publication dates for a release. */
export async function getReleaseDates(releaseId: number, opts: { limit?: number; includeFuture?: boolean } = {}): Promise<{ count: number; release_dates: { release_id: number; date: string }[] }> {
  return api.get("/fred/release/dates", {
    release_id: releaseId, limit: opts.limit ?? 20, sort_order: "desc",
    include_release_dates_with_no_data: opts.includeFuture ? "true" : undefined,
  });
}

/** List FRED data sources (BLS, BEA, Board of Governors, ...). */
export async function listSources(opts: { limit?: number } = {}): Promise<{ count: number; sources: FredSource[] }> {
  return api.get("/fred/sources", { limit: opts.limit ?? 100 });
}

/** Releases published by a source. */
export async function getSourceReleases(sourceId: number, opts: { limit?: number } = {}): Promise<{ count: number; releases: FredRelease[] }> {
  return api.get("/fred/source/releases", { source_id: sourceId, limit: opts.limit ?? 100 });
}

/** Series updated most recently on FRED (useful for "what just came out?"). */
export async function getRecentUpdates(opts: { limit?: number; filter?: "all" | "macro" | "regional" } = {}): Promise<FredSearchResult> {
  return api.get<FredSearchResult>("/fred/series/updates", { limit: opts.limit ?? 50, filter_value: opts.filter });
}

/**
 * Bulk fetch all series in a FRED release with their observations.
 *
 * @param releaseId - FRED release ID (e.g. 53 for GDP release)
 * @param limit - Maximum number of series to return
 * @returns Release metadata and series with observations
 *
 * @example
 * ```typescript
 * const release = await getReleaseData(53);
 * console.log(`${release.release.name}: ${release.series.length} series`);
 * ```
 */
export async function getReleaseData(releaseId: number, limit?: number): Promise<FredReleaseResult> {
  return apiV2.get<FredReleaseResult>("/fred/v2/release/observations", {
    release_id: releaseId, format: "json", ...(limit ? { limit } : {}),
  });
}

/** Clear cached responses. */
export function clearCache(): void {
  api.clearCache();
  apiV2.clearCache();
}
