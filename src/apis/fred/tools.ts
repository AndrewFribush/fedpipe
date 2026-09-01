/**
 * FRED MCP tools — search, metadata, observations, and release data.
 *
 * Tools return raw JSON data — no markdown formatting.
 * The client decides how to present it.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  searchSeries, getSeriesInfo, getObservations, getReleaseData,
  getCategory, getCategorySeries, listReleases, getReleaseSeries, getReleaseDates,
  listSources, getSourceReleases, getRecentUpdates,
} from "./sdk.js";
import { timeseriesResponse, tableResponse, listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "fred_search",
    description:
      "Search FRED series by keyword.\nExamples: 'GDP', 'unemployment', 'CPI', 'mortgage rate'\n" +
      "Narrow with tag_names (e.g. 'usa;monthly;sa'), filter_variable/filter_value (e.g. frequency=Monthly), or order_by popularity.",
    annotations: { title: "FRED: Search", readOnlyHint: true },
    parameters: z.object({
      query: z.string().describe("Keywords"),
      limit: z.number().int().max(100).default(20).describe("Max results (default 20)"),
      offset: z.number().int().min(0).optional().describe("Skip this many results (pagination)"),
      tag_names: z.string().optional().describe("Semicolon-separated tags the series must ALL have: 'usa;monthly', 'sa;nsa', 'state'"),
      exclude_tag_names: z.string().optional().describe("Semicolon-separated tags to exclude: 'discontinued'"),
      order_by: z.enum(["search_rank", "popularity", "last_updated", "observation_start", "observation_end", "title", "series_id"]).optional().describe("Sort field (default: search_rank)"),
      sort_order: z.enum(["asc", "desc"]).optional(),
      filter_variable: z.enum(["frequency", "units", "seasonal_adjustment"]).optional().describe("Metadata field to filter on"),
      filter_value: z.string().optional().describe("Value for filter_variable: 'Monthly', 'Percent', 'Seasonally Adjusted'"),
    }),
    execute: async ({ query, limit, offset, tag_names, exclude_tag_names, order_by, sort_order, filter_variable, filter_value }) => {
      const data = await searchSeries(query, limit ?? 20, {
        offset, tagNames: tag_names, excludeTagNames: exclude_tag_names,
        orderBy: order_by, sortOrder: sort_order, filterVariable: filter_variable, filterValue: filter_value,
      });
      if (!data.seriess?.length) return emptyResponse(`No series found for "${query}".`);
      return listResponse(
        `FRED search "${query}": ${data.count} total, showing ${data.seriess.length}`,
        { items: data.seriess, total: data.count },
      );
    },
  },

  {
    name: "fred_series_info",
    description: "Get metadata for a FRED series — title, units, frequency, range, notes.",
    annotations: { title: "FRED: Series Info", readOnlyHint: true },
    parameters: z.object({
      series_id: z.string().describe("e.g. 'GDP', 'UNRATE', 'CPIAUCSL'"),
    }),
    execute: async ({ series_id }) => {
      const s = await getSeriesInfo(series_id);
      if (!s) return emptyResponse(`"${series_id}" not found.`);
      return recordResponse(
        `${s.id}: ${s.title} (${s.frequency}, ${s.units}, ${s.observation_start}–${s.observation_end})`,
        s,
      );
    },
  },

  {
    name: "fred_series_data",
    description:
      "Get observations for a FRED series.\nPopular: GDP, UNRATE, CPIAUCSL, FEDFUNDS, DGS10, MORTGAGE30US\n" +
      "Let FRED do the math: units='pc1' for year-over-year % change, 'pch' for period % change, 'chg' for period change, 'log' for natural log. " +
      "Change frequency (frequency='q' with aggregation_method='avg'|'sum'|'eop'). " +
      "Revision history: vintage_dates='2020-03-01,2020-06-01' shows the series as it was published on those dates; output_type=4 shows only initial releases.",
    annotations: { title: "FRED: Series Data", readOnlyHint: true },
    parameters: z.object({
      series_id: z.string().describe("Series ID"),
      limit: z.number().int().max(100000).default(1000).describe("Max obs (default 1000)"),
      sort_order: z.enum(["asc", "desc"]).optional().describe("default: desc"),
      frequency: z.enum(["d", "w", "bw", "m", "q", "sa", "a", "wef", "weth", "wew", "wetu", "wem", "wesu", "wesa", "bwew", "bwem"]).optional().describe("Aggregate to: d, w, bw, m, q, sa (semiannual), a; wef/wem etc. = week ending Friday/Monday"),
      aggregation_method: z.enum(["avg", "sum", "eop"]).optional().describe("When aggregating to a lower frequency: avg (default), sum, eop (end of period)"),
      units: z.enum(["lin", "chg", "ch1", "pch", "pc1", "pca", "cch", "cca", "log"]).optional().describe("lin=levels (default), chg=change, ch1=change from year ago, pch=% change, pc1=% change from year ago, pca=compounded annual rate, cch=continuously compounded change, cca=cont. comp. annual rate, log=natural log"),
      start_date: z.string().optional().describe("YYYY-MM-DD"),
      end_date: z.string().optional().describe("YYYY-MM-DD"),
      output_type: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional().describe("1=observations by real-time period (default), 2=all vintages, 3=new and revised observations only, 4=initial release only"),
      vintage_dates: z.string().optional().describe("Comma-separated YYYY-MM-DD dates — return the data as it was known on each date (revision analysis)"),
      realtime_start: z.string().optional().describe("YYYY-MM-DD start of real-time period (revision history)"),
      realtime_end: z.string().optional().describe("YYYY-MM-DD end of real-time period"),
    }),
    execute: async ({ series_id, limit, sort_order, frequency, aggregation_method, units, start_date, end_date, output_type, vintage_dates, realtime_start, realtime_end }) => {
      const data = await getObservations(series_id, {
        start: start_date, end: end_date, limit, sort: sort_order, frequency,
        aggregationMethod: aggregation_method, units, outputType: output_type,
        vintageDates: vintage_dates, realtimeStart: realtime_start, realtimeEnd: realtime_end,
      });
      if (!data.observations?.length) return emptyResponse(`No observations for "${series_id}".`);
      const transform = units && units !== "lin" ? ` [units=${units}]` : "";
      const agg = frequency ? ` [frequency=${frequency}${aggregation_method ? `/${aggregation_method}` : ""}]` : "";
      const vintage = vintage_dates ? ` [vintages: ${vintage_dates}]` : output_type && output_type !== 1 ? ` [output_type=${output_type}]` : "";
      const summary = `${series_id.toUpperCase()}: ${data.count} observations, ${data.observation_start} to ${data.observation_end}${transform}${agg}${vintage}`;
      const meta = {
        seriesId: series_id.toUpperCase(), start: data.observation_start, end: data.observation_end,
        units: units ?? "lin", frequency: frequency ?? null, aggregationMethod: aggregation_method ?? null,
        vintageDates: vintage_dates ?? null, outputType: output_type ?? 1,
      };
      // Vintage/output_type queries return one value column per vintage date (e.g. GDP_20200301), not a single "value"
      const multiVintage = Boolean(vintage_dates || (output_type && output_type !== 1));
      if (multiVintage) {
        return tableResponse(summary, { rows: data.observations as unknown as Record<string, unknown>[], total: data.count, meta });
      }
      return timeseriesResponse(summary, { rows: data.observations, dateKey: "date", valueKey: "value", total: data.count, meta });
    },
  },

  {
    name: "fred_release_data",
    description: "Bulk fetch a FRED release.\nCommon: 53 (GDP), 50 (Employment), 10 (CPI), 18 (Rates)",
    annotations: { title: "FRED: Release Data", readOnlyHint: true },
    parameters: z.object({
      release_id: z.number().int().positive().describe("e.g. 53 (GDP)"),
      limit: z.number().int().max(500000).optional().describe("Max obs"),
    }),
    execute: async ({ release_id, limit }) => {
      const data = await getReleaseData(release_id, limit);
      const series = data.series ?? [];
      if (!series.length) return emptyResponse(`No series found for release ${release_id}.`);
      return listResponse(
        `${data.release?.name ?? `Release ${release_id}`}: ${series.length} series, has_more: ${data.has_more}`,
        {
          items: series,
          meta: { release: data.release, hasMore: data.has_more, nextCursor: data.next_cursor ?? null },
        },
      );
    },
  },

  {
    name: "fred_browse",
    description:
      "Browse FRED's catalog when you don't know a series ID.\n" +
      "kind='categories' (id = category, root 0) walks the category tree; 'category_series' lists a category's series by popularity; " +
      "'releases' lists all releases; 'release_series' lists a release's series; 'release_dates' gives past/upcoming publication dates; " +
      "'sources' lists publishing agencies; 'source_releases' lists a source's releases; 'updates' shows the most recently updated series.\n" +
      "Common categories: 32991 (Money, Banking & Finance), 10 (Population, Employment & Labor Markets), 32992 (National Accounts), 1 (Production & Business Activity), 32455 (Prices), 3008 (U.S. Regional).",
    annotations: { title: "FRED: Browse Catalog", readOnlyHint: true },
    parameters: z.object({
      kind: z.enum(["categories", "category_series", "releases", "release_series", "release_dates", "sources", "source_releases", "updates"]).optional().describe("What to browse (default: categories)"),
      id: z.number().int().min(0).optional().describe("category_id, release_id, or source_id depending on kind (default 0 = root category)"),
      limit: z.number().int().max(1000).optional().describe("Max items (default 50–100 depending on kind)"),
      offset: z.number().int().min(0).optional().describe("Pagination offset (category_series, release_series, releases)"),
      include_future: z.boolean().optional().describe("release_dates only: include scheduled future release dates"),
      filter: z.enum(["all", "macro", "regional"]).optional().describe("updates only: restrict to macro or regional series"),
    }),
    execute: async ({ kind, id, limit, offset, include_future, filter }) => {
      const k = kind ?? "categories";
      switch (k) {
        case "categories": {
          const { category, children } = await getCategory(id ?? 0);
          const name = category?.name ?? "root";
          if (!children.length) return recordResponse(`Category ${id ?? 0} (${name}): no child categories — use kind='category_series' to list its series`, category ?? {});
          return listResponse(`Category ${id ?? 0} (${name}): ${children.length} child categories`, {
            items: children, total: children.length, meta: { category },
          });
        }
        case "category_series": {
          if (id == null) throw new Error("fred_browse: kind='category_series' requires id (category_id)");
          const data = await getCategorySeries(id, { limit, offset });
          if (!data.seriess?.length) return emptyResponse(`No series directly in category ${id} — series live in leaf categories. Call kind='categories' with id=${id} to list its children, then try one of those.`);
          return listResponse(`Category ${id}: ${data.count} series, showing ${data.seriess.length}`, { items: data.seriess, total: data.count });
        }
        case "releases": {
          const data = await listReleases({ limit, offset });
          return listResponse(`FRED releases: ${data.count} total, showing ${data.releases.length}`, { items: data.releases, total: data.count });
        }
        case "release_series": {
          if (id == null) throw new Error("fred_browse: kind='release_series' requires id (release_id)");
          const data = await getReleaseSeries(id, { limit, offset });
          if (!data.seriess?.length) return emptyResponse(`No series in release ${id}.`);
          return listResponse(`Release ${id}: ${data.count} series, showing ${data.seriess.length}`, { items: data.seriess, total: data.count });
        }
        case "release_dates": {
          if (id == null) throw new Error("fred_browse: kind='release_dates' requires id (release_id)");
          const data = await getReleaseDates(id, { limit, includeFuture: include_future });
          if (!data.release_dates?.length) return emptyResponse(`No release dates for release ${id}.`);
          return listResponse(`Release ${id}: ${data.count} release dates`, { items: data.release_dates, total: data.count });
        }
        case "sources": {
          const data = await listSources({ limit });
          return listResponse(`FRED sources: ${data.count}`, { items: data.sources, total: data.count });
        }
        case "source_releases": {
          if (id == null) throw new Error("fred_browse: kind='source_releases' requires id (source_id)");
          const data = await getSourceReleases(id, { limit });
          if (!data.releases?.length) return emptyResponse(`No releases for source ${id}.`);
          return listResponse(`Source ${id}: ${data.count} releases`, { items: data.releases, total: data.count });
        }
        case "updates": {
          const data = await getRecentUpdates({ limit, filter });
          return listResponse(`Recently updated FRED series: showing ${data.seriess?.length ?? 0}`, { items: data.seriess ?? [], total: data.count });
        }
      }
    },
  },
];
