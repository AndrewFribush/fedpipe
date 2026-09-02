/**
 * bls MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  getSeriesData,
  searchPopularSeries,
  getStateEmploymentSeries,
  getAvailableTopics,
  cpiSeries,
  industrySeries,
  type BlsSeries,
  getQcewArea,
  getQcewIndustry,
} from "./sdk.js";
import { tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

function summarizeSeriesData(s: BlsSeries) {
  const obs = s.data.map(d => ({
    period: `${d.year}-${d.period}`,
    periodName: d.periodName,
    year: Number(d.year),
    value: Number(d.value) || null,
    pctChange12Mo: d.calculations?.pct_changes?.["12"] ? Number(d.calculations.pct_changes["12"]) : null,
  }));
  return {
    seriesId: s.seriesID,
    observations: s.data.length,
    data: obs,
  };
}

function computeYoy(s: BlsSeries, labels: Record<string, string>) {
  const label = labels[s.seriesID] ?? s.seriesID;
  const latest = s.data[0];
  if (!latest) return { seriesId: s.seriesID, label, value: null, period: null, year: null, yoyPercent: null };

  const yearAgo = s.data.find(
    d => d.period === latest.period && d.year === String(Number(latest.year) - 1),
  );
  let yoy: number | null = null;
  if (yearAgo) {
    yoy = Number(((Number(latest.value) - Number(yearAgo.value)) / Number(yearAgo.value) * 100).toFixed(1));
  } else if (latest.calculations?.pct_changes?.["12"]) {
    yoy = Number(latest.calculations.pct_changes["12"]);
  }

  return {
    seriesId: s.seriesID,
    label,
    value: Number(latest.value) || null,
    period: `${latest.year}-${latest.period}`,
    periodName: latest.periodName ?? null,
    year: Number(latest.year),
    yoyPercent: yoy,
  };
}

function computeEmploymentYoy(s: BlsSeries, labels: Record<string, string>) {
  const label = labels[s.seriesID] ?? s.seriesID;
  const latest = s.data[0];
  if (!latest) return { seriesId: s.seriesID, label, valueThousands: null, period: null, year: null, yoyChangeThousands: null };

  const yearAgo = s.data.find(
    d => d.period === latest.period && d.year === String(Number(latest.year) - 1),
  );
  let yoyDiff: number | null = null;
  if (latest && yearAgo) {
    yoyDiff = Number((Number(latest.value) - Number(yearAgo.value)).toFixed(0));
  }

  return {
    seriesId: s.seriesID,
    label,
    valueThousands: Number(latest.value) || null,
    period: `${latest.year}-${latest.period}`,
    periodName: latest.periodName ?? null,
    year: Number(latest.year),
    yoyChangeThousands: yoyDiff,
  };
}

export const tools: Tool<any, any>[] = [
  {
    name: "bls_series_data",
    description:
      "Fetch time series data from the Bureau of Labor Statistics. " +
      "Returns monthly/quarterly/annual observations for employment, wages, prices, and more.\n\n" +
      "Popular series IDs:\n" +
      "- CES0000000001: Total nonfarm employment (thousands)\n" +
      "- LNS14000000: Unemployment rate\n" +
      "- CUUR0000SA0: CPI-U All Items\n" +
      "- CES0500000003: Average hourly earnings, total private\n" +
      "- JTS000000000000000JOR: Job openings rate (JOLTS)\n" +
      "- PRS85006092: Nonfarm business labor productivity\n\n" +
      "Series ID prefixes: CES (jobs by industry), LNS (unemployment), CU (CPI), WP (PPI), OE (wages), JT (JOLTS)",
    annotations: { title: "BLS: Get Series Data", readOnlyHint: true },
    parameters: z.object({
      series_ids: z.string().describe(
        "Comma-separated BLS series IDs (max 50). Example: 'CES0000000001,LNS14000000,CUUR0000SA0'",
      ),
      start_year: z.number().int().optional().describe("Start year (default: 3 years ago). Max 20 year range with API key, 10 without."),
      end_year: z.number().int().optional().describe("End year (default: current year)"),
    }),
    execute: async ({ series_ids, start_year, end_year }) => {
      const ids = series_ids.split(",").map((s: string) => s.trim()).filter(Boolean);
      if (!ids.length) return emptyResponse("No series IDs provided.");

      const defaultStart = new Date().getFullYear() - 3;
      const data = await getSeriesData(ids, {
        startYear: start_year ?? defaultStart,
        endYear: end_year ?? new Date().getFullYear(),
      });

      const series = data.Results?.series ?? [];
      if (!series.length) return emptyResponse("No data returned from BLS.");

      const messages = data.message?.length ? data.message.join("; ") : null;
      // Each series becomes a separate table with period+value columns
      const allObs = series.flatMap(s =>
        s.data.map(d => ({
          seriesId: s.seriesID,
          period: `${d.year}-${d.period}`,
          periodName: d.periodName,
          year: Number(d.year),
          value: Number(d.value) || null,
          pctChange12Mo: d.calculations?.pct_changes?.["12"] ? Number(d.calculations.pct_changes["12"]) : null,
        }))
      );
      return tableResponse(
        `BLS data: ${series.length} series returned${messages ? ` (${messages})` : ""}`,
        {
          rows: allObs,
          columns: ["seriesId", "period", "periodName", "year", "value", "pctChange12Mo"],
          meta: messages ? { notes: messages } : undefined,
        },
      );
    },
  },

  {
    name: "bls_search_series",
    description:
      "Look up popular BLS series IDs by topic. BLS doesn't have a search API, " +
      "so this provides curated series IDs for common topics.\n\n" +
      "Topics: employment, unemployment, wages, cpi, cpi_components, ppi, productivity, jolts, state_employment",
    annotations: { title: "BLS: Popular Series Lookup", readOnlyHint: true },
    parameters: z.object({
      topic: z.string().describe(
        "Topic to look up: 'employment', 'unemployment', 'wages', 'cpi', " +
        "'cpi_components', 'ppi', 'productivity', 'jolts', 'state_employment'",
      ),
      state: z.string().optional().describe("Two-letter state code for state-level data (e.g., 'CA', 'TX')"),
    }),
    execute: async ({ topic, state }) => {
      // State employment uses LAUS codes
      if (topic === "state_employment" && state) {
        const series = getStateEmploymentSeries(state);
        if (!series) return emptyResponse(`Unknown state code: ${state}`);
        return listResponse(
          `BLS state employment series for ${state.toUpperCase()}: ${series.length} series. Use these IDs with bls_series_data.`,
          { items: series },
        );
      }

      const series = searchPopularSeries(topic);
      if (!series.length) {
        const available = getAvailableTopics();
        return emptyResponse(`Unknown topic: "${topic}". Available: ${available.join(", ")}`);
      }

      return listResponse(
        `BLS series for "${topic}": ${series.length} series. Use these IDs with bls_series_data.`,
        { items: series },
      );
    },
  },

  {
    name: "bls_cpi_breakdown",
    description:
      "Get a breakdown of Consumer Price Index by component — food, shelter, energy, " +
      "medical care, transportation, etc. Shows which categories are driving inflation.",
    annotations: { title: "BLS: CPI Inflation Breakdown", readOnlyHint: true },
    parameters: z.object({
      start_year: z.number().int().optional().describe("Start year (default: 2 years ago)"),
      end_year: z.number().int().optional().describe("End year (default: current year)"),
    }),
    execute: async ({ start_year, end_year }) => {
      const defaultStart = new Date().getFullYear() - 2;
      const data = await getSeriesData(Object.keys(cpiSeries), {
        startYear: start_year ?? defaultStart,
        endYear: end_year ?? new Date().getFullYear(),
      });

      const series = data.Results?.series;
      if (!series?.length) return emptyResponse("No CPI data returned.");

      const components = series.map(s => computeYoy(s, cpiSeries as Record<string, string>));
      return tableResponse(
        `CPI inflation breakdown: ${components.length} components with latest values and YoY change`,
        {
          rows: components,
          columns: ["seriesId", "label", "value", "period", "periodName", "year", "yoyPercent"],
        },
      );
    },
  },

  {
    name: "bls_employment_by_industry",
    description:
      "Get employment numbers broken down by major industry sector. " +
      "Shows which sectors are growing or shrinking.",
    annotations: { title: "BLS: Employment by Industry", readOnlyHint: true },
    parameters: z.object({
      start_year: z.number().int().optional().describe("Start year (default: 3 years ago)"),
      end_year: z.number().int().optional().describe("End year (default: current year)"),
    }),
    execute: async ({ start_year, end_year }) => {
      const defaultStart = new Date().getFullYear() - 3;
      const data = await getSeriesData(Object.keys(industrySeries), {
        startYear: start_year ?? defaultStart,
        endYear: end_year ?? new Date().getFullYear(),
      });

      const series = data.Results?.series;
      if (!series?.length) return emptyResponse("No employment data returned.");

      const industries = series.map(s => computeEmploymentYoy(s, industrySeries as Record<string, string>));
      return tableResponse(
        `Employment by industry: ${industries.length} sectors with latest values (thousands) and YoY change`,
        {
          rows: industries,
          columns: ["seriesId", "label", "valueThousands", "period", "periodName", "year", "yoyChangeThousands"],
        },
      );
    },
  },
  {
    name: "bls_county_wages",
    description:
      "County/state/metro employment and wages from QCEW (Quarterly Census of Employment and Wages) — " +
      "establishment counts, employment level, total and average weekly wages, with year-over-year % changes. " +
      "No API key needed. Area: 5-digit county FIPS ('17031' = Cook County IL), 2-letter state, MSA code ('C1642'), or 'US'. " +
      "industry_code: NAICS ('10' = all industries, '722511' = restaurants, '5415' = computer services).",
    annotations: { title: "BLS: County Wages (QCEW)", readOnlyHint: true },
    parameters: z.object({
      area: z.string().describe("County FIPS, state code, MSA code, or 'US'"),
      year: z.number().int().describe("Year (data from 1990; latest quarters lag ~5 months)"),
      quarter: z.union([z.number().int().min(1).max(4), z.literal("a")]).optional().describe("Quarter 1-4, or 'a' for annual averages (default 1)"),
      industry_code: z.string().optional().describe("NAICS code filter ('10' = total all industries). Omit for the area's industry breakdown."),
      own_code: z.string().optional().describe("Ownership: '0' total, '5' private, '1' federal, '2' state, '3' local government"),
      limit: z.number().int().max(500).default(100).describe("Max rows (default 100)"),
    }),
    execute: async ({ area, year, quarter, industry_code, own_code, limit }) => {
      const rows = await getQcewArea({ area, year, quarter, industry: industry_code, ownCode: own_code, limit });
      if (!rows.length) return emptyResponse(`No QCEW data for area ${area}, ${year} Q${quarter ?? 1}. County FIPS must be 5 digits; recent quarters publish ~5 months after they end.`);
      return tableResponse(
        `QCEW ${area} ${year} Q${quarter ?? 1}: ${rows.length} rows (employment, wages by industry/ownership)`,
        { rows: rows as unknown as Record<string, unknown>[], columns: ["area_fips", "own_code", "industry_code", "qtrly_estabs", "employment", "total_wages", "avg_pay", "pay_basis", "oty_employment_pct_chg", "oty_avg_pay_pct_chg"] },
      );
    },
  },

  {
    name: "bls_industry_wages",
    description:
      "One industry's employment and wages across areas (QCEW) — compare counties or states for a NAICS industry. " +
      "No API key needed. E.g. industry_code '5415' (computer systems design) across Texas counties shows where tech jobs and pay concentrate.",
    annotations: { title: "BLS: Industry Wages by Area (QCEW)", readOnlyHint: true },
    parameters: z.object({
      industry_code: z.string().describe("NAICS industry code: '10' all, '23' construction, '5415' computer services, '722511' restaurants"),
      year: z.number().int().describe("Year"),
      quarter: z.union([z.number().int().min(1).max(4), z.literal("a")]).optional().describe("Quarter 1-4 or 'a' annual (default 1)"),
      state: z.string().optional().describe("Restrict to a state (2-letter code) — otherwise national list"),
      own_code: z.string().optional().describe("Ownership code (default '5' private)"),
      limit: z.number().int().max(500).default(100).describe("Max rows (default 100)"),
    }),
    execute: async ({ industry_code, year, quarter, state, own_code, limit }) => {
      const rows = await getQcewIndustry({ industry: industry_code, year, quarter, state, ownCode: own_code, limit });
      if (!rows.length) return emptyResponse(`No QCEW data for industry ${industry_code}, ${year} Q${quarter ?? 1}${state ? ` in ${state}` : ""}.`);
      return tableResponse(
        `QCEW industry ${industry_code} ${year} Q${quarter ?? 1}${state ? ` — ${state}` : ""}: ${rows.length} areas`,
        { rows: rows as unknown as Record<string, unknown>[], columns: ["area_fips", "agglvl_code", "qtrly_estabs", "employment", "total_wages", "avg_pay", "pay_basis", "lq_avg_pay", "oty_avg_pay_pct_chg"] },
      );
    },
  },
];
