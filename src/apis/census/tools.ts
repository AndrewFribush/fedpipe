/**
 * census MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import {
  queryCensus,
  searchVariables,
  resolveGeography,
  resolveState,
  geocodeAddress,
  searchTables,
  getTableVariables,
  listDatasets,
  getGeographyLevels,
  commonVariables,
  datasets,
} from "./sdk.js";
import { tableResponse, listResponse, recordResponse, emptyResponse } from "../../shared/response.js";

/** Convert a row array + headers into an object, coercing numeric values. */
function rowToObject(headers: string[], row: string[]): Record<string, unknown> {
  const geoKeys = new Set(["NAME", "state", "county", "place", "tract", "block group", "zip code tabulation area"]);
  const obj: Record<string, unknown> = {};
  headers.forEach((h, i) => {
    const val = row[i];
    const num = Number(val);
    obj[h] = !geoKeys.has(h) && !isNaN(num) && val !== "" ? num : val;
  });
  return obj;
}

export const tools: Tool<any, any>[] = [
  {
    name: "census_query",
    description:
      "Query the U.S. Census Bureau Data API. Supports ACS, Decennial Census, Population Estimates, " +
      "Economic Census, and more. Returns data for specified variables and geography.\n\n" +
      "Common datasets: '2023/acs/acs1' (1yr), '2023/acs/acs5' (5yr), '2020/dec/pl' (Decennial), '2023/pep/population'\n" +
      "Common variables: NAME, B01001_001E (population), B19013_001E (median income), B25077_001E (home value), B01002_001E (median age)\n" +
      "Don't know the FIPS code? Call census_resolve_geography first ('Philadelphia, PA' → for_geo/in_geo or ucgid). " +
      "Don't know the variable? census_search_tables ('median income' → B19013) then use B19013_001E. " +
      "Set descriptive=true to get human-readable labels for every column.",
    annotations: { title: "Census: Query Data", readOnlyHint: true },
    parameters: z.object({
      dataset: z.string().describe("Census dataset path, e.g. '2023/acs/acs1', '2023/acs/acs5', '2020/dec/pl'"),
      variables: z.string().describe("Comma-separated variable names. Always include NAME. Example: 'NAME,B01001_001E,B19013_001E'. A whole table: 'group(B19013)'"),
      for_geo: z.string().optional().describe("Geography level and filter. Examples: 'state:*' (all states), 'state:06' (CA), 'county:*', 'place:60000'. Required unless ucgid is given."),
      in_geo: z.string().optional().describe("Parent geography for nested queries. Example: 'state:06' to get counties in CA; 'state:06 county:037' for tracts in LA County"),
      ucgid: z.string().optional().describe("Alternative to for/in: comma-separated Uniform Census Geography IDs, e.g. '0400000US06,0500000US06037' (from census_resolve_geography)"),
      descriptive: z.boolean().optional().describe("Include a human-readable label for each variable (default false)"),
      predicates: z.string().optional().describe("Extra API predicates as 'KEY=VALUE' pairs separated by '&', e.g. 'NAICS2017=72&EMPSZES=001' for Economic Census, or 'time=2023' for timeseries datasets"),
    }),
    execute: async ({ dataset, variables, for_geo, in_geo, ucgid, descriptive, predicates }) => {
      const extra: Record<string, string> = {};
      for (const pair of (predicates ?? "").split("&").map((s: string) => s.trim()).filter(Boolean)) {
        const [k, ...v] = pair.split("=");
        if (!k || !v.length) {
          // Silently dropping a malformed predicate returns unfiltered data
          // that looks right — fail loudly instead.
          throw new Error(
            `Malformed predicate "${pair}" — predicates are KEY=VALUE pairs joined by '&' ` +
            `(e.g. 'NAICS2017=72&EMPSZES=001'). The Census API has no comparison operators; ` +
            `filter numerically on your side or narrow the geography.`,
          );
        }
        extra[k] = v.join("=");
      }
      const data = await queryCensus(dataset, variables, for_geo, in_geo, extra, { ucgid, descriptive });
      const rows = data.rows.map(row => rowToObject(data.headers, row));
      const where = ucgid ? `ucgid=${ucgid}` : `for=${for_geo}${in_geo ? ` in=${in_geo}` : ""}`;
      return tableResponse(
        `Census ${dataset}: ${data.rows.length} records for get=${variables} ${where}`,
        {
          rows,
          columns: data.headers,
          total: data.rows.length,
          meta: {
            dataset, variables: variables.split(","), forGeo: for_geo ?? null, inGeo: in_geo ?? null, ucgid: ucgid ?? null,
            ...(data.labels ? { labels: Object.fromEntries(data.headers.map((h, i) => [h, data.labels![i]])) } : {}),
          },
        },
      );
    },
  },

  {
    name: "census_population",
    description:
      "Get population data for U.S. states using the American Community Survey. " +
      "Quick shortcut — for more flexibility use census_query directly.",
    annotations: { title: "Census: Population by State", readOnlyHint: true },
    parameters: z.object({
      year: z.number().int().optional().describe("ACS year (default: 2023). Range: 2005-2023."),
      state: z.string().optional().describe("State as FIPS code, postal abbreviation, or name: '06', 'CA', 'California'. Omit or '*' for all."),
    }),
    execute: async ({ year, state }) => {
      const y = year || 2023;
      const stateCode = !state || state === "*" ? "*" : (resolveState(state)?.fips ?? state);
      const data = await queryCensus(
        `${y}/acs/acs1`,
        "NAME,B01001_001E,B19013_001E,B01002_001E",
        `state:${stateCode}`,
      );

      const nameIdx = data.headers.indexOf("NAME");
      const popIdx = data.headers.indexOf("B01001_001E");
      const incIdx = data.headers.indexOf("B19013_001E");
      const ageIdx = data.headers.indexOf("B01002_001E");

      const states = data.rows
        .sort((a, b) => Number(b[popIdx]) - Number(a[popIdx]))
        .map(row => ({
          name: row[nameIdx],
          population: Number(row[popIdx]),
          medianIncome: Number(row[incIdx]),
          medianAge: parseFloat(row[ageIdx]),
        }));

      return tableResponse(
        `U.S. Population (${y} ACS 1-Year): ${states.length} states/territories`,
        {
          rows: states,
          columns: ["name", "population", "medianIncome", "medianAge"],
          meta: { year: y, dataset: "ACS 1-Year" },
        },
      );
    },
  },

  {
    name: "census_search_variables",
    description:
      "Search for Census variable names/codes by keyword. Helps discover what data is available " +
      "in a given dataset. Returns variable IDs you can use with census_query.\n" +
      "Margin-of-error variables aren't in the catalog: swap the E suffix for M on any estimate " +
      "(B19013_001E has MOE B19013_001M) and query it directly.",
    annotations: { title: "Census: Search Variables", readOnlyHint: true },
    parameters: z.object({
      dataset: z.string().describe("Census dataset path, e.g. '2023/acs/acs1'"),
      keyword: z.string().describe("Keyword to search for, e.g. 'income', 'poverty', 'housing', 'education'"),
      max_results: z.number().int().positive().max(50).default(20).describe("Maximum results (default: 20)"),
    }),
    execute: async ({ dataset, keyword, max_results }) => {
      const matches = await searchVariables(dataset, keyword, max_results ?? 20);
      if (!matches.length) {
        return emptyResponse(`No variables matching "${keyword}" in ${dataset}.`);
      }
      return listResponse(
        `Census variables matching "${keyword}" in ${dataset}: ${matches.length} found`,
        { items: matches, meta: { dataset, keyword } },
      );
    },
  },

  {
    name: "census_resolve_geography",
    description:
      "Turn a place name into Census FIPS codes and ready-to-use census_query parameters.\n" +
      "Handles states ('Texas', 'TX'), counties ('Cook County, IL', 'Orleans Parish'), and cities/towns/CDPs ('Philadelphia, PA', 'Austin').\n" +
      "Each result includes for_geo + in_geo and a ucgid you can pass straight to census_query.\n" +
      "Give a street address instead to get every geography containing it (tract, block, congressional district, ...).",
    annotations: { title: "Census: Resolve Geography", readOnlyHint: true },
    parameters: z.object({
      name: z.string().optional().describe("Place name, optionally with state: 'Philadelphia, PA', 'Cook County, Illinois', 'Vermont'"),
      level: z.enum(["state", "county", "place", "county-subdivision", "zcta"]).optional().describe("Restrict to one level (default: search all)"),
      state: z.string().optional().describe("Restrict to a state (abbr, FIPS, or name) — inferred from ', XX' in name when omitted"),
      address: z.string().optional().describe("Street address to geocode instead of a name: '1600 Pennsylvania Ave NW, Washington, DC'"),
      limit: z.number().int().max(50).optional().describe("Max matches (default 10)"),
    }),
    execute: async ({ name, level, state, address, limit }) => {
      if (address) {
        const g = await geocodeAddress(address);
        if (!g) return emptyResponse(`Address not found: "${address}".`);
        const summary: Record<string, unknown> = {};
        for (const [layer, feats] of Object.entries(g.geographies)) {
          const f = feats[0]; if (f) summary[layer] = { geoid: f.GEOID, name: f.NAME };
        }
        return recordResponse(`Geographies containing ${g.matchedAddress}`, { matchedAddress: g.matchedAddress, coordinates: g.coordinates, geographies: summary });
      }
      if (!name) throw new Error("census_resolve_geography: provide name or address");
      const matches = await resolveGeography(name, { level, state, limit });
      if (!matches.length) return emptyResponse(`No state, county, or place matched "${name}". Try adding the state ('Springfield, IL') or use address=.`);
      return listResponse(`${matches.length} geography match(es) for "${name}"`, { items: matches, total: matches.length });
    },
  },

  {
    name: "census_search_tables",
    description:
      "Find Census tables (variable groups) by topic — 'median household income' → B19013, 'poverty' → B17001 — " +
      "or list the variables inside a table (table_id='B19013').\n" +
      "Table IDs: B = base detail, C = collapsed, S = subject, DP = data profile. Use <table>_001E for the total estimate.",
    annotations: { title: "Census: Search Tables", readOnlyHint: true },
    parameters: z.object({
      dataset: z.string().optional().describe("Dataset path (default '2023/acs/acs5')"),
      keyword: z.string().optional().describe("Topic keywords: 'median income', 'poverty', 'housing tenure', 'educational attainment'"),
      table_id: z.string().optional().describe("List variables in this table instead of searching: 'B19013', 'B01001', 'DP05'"),
      include_all_variables: z.boolean().optional().describe("With table_id: include margins of error and annotations, not just estimates"),
      max_results: z.number().int().max(100).optional().describe("Max tables (default 20)"),
    }),
    execute: async ({ dataset, keyword, table_id, include_all_variables, max_results }) => {
      const ds = dataset ?? "2023/acs/acs5";
      if (table_id) {
        const vars = await getTableVariables(ds, table_id, { includeAll: include_all_variables });
        if (!vars.length) return emptyResponse(`No variables found for table ${table_id} in ${ds}.`);
        return listResponse(`Table ${table_id.toUpperCase()} in ${ds}: ${vars.length} variables`, { items: vars, total: vars.length, meta: { dataset: ds, tableId: table_id.toUpperCase() } });
      }
      if (!keyword) throw new Error("census_search_tables: provide keyword or table_id");
      const tables = await searchTables(ds, keyword, max_results ?? 20);
      if (!tables.length) return emptyResponse(`No tables matching "${keyword}" in ${ds}.`);
      return listResponse(`${tables.length} table(s) matching "${keyword}" in ${ds}`, { items: tables, total: tables.length, meta: { dataset: ds } });
    },
  },

  {
    name: "census_datasets",
    description:
      "Search the Census API catalog of 1,700+ datasets by keyword and/or vintage year — returns the dataset path to use with census_query.\n" +
      "Examples: keyword='american community survey 5-year', vintage=2023; keyword='county business patterns'; keyword='population estimates'.",
    annotations: { title: "Census: Dataset Catalog", readOnlyHint: true },
    parameters: z.object({
      keyword: z.string().optional().describe("Words that must all appear in the title/path/description"),
      vintage: z.number().int().optional().describe("Vintage year, e.g. 2023"),
      max_results: z.number().int().max(200).optional().describe("Max datasets (default 25)"),
    }),
    execute: async ({ keyword, vintage, max_results }) => {
      if (!keyword && !vintage) {
        return listResponse(`${datasets.length} commonly used datasets (pass keyword/vintage to search the full catalog)`, { items: datasets });
      }
      const found = await listDatasets({ keyword, vintage, maxResults: max_results });
      if (!found.length) return emptyResponse(`No datasets matching ${keyword ?? ""} ${vintage ?? ""}.`);
      return listResponse(`${found.length} dataset(s)${keyword ? ` matching "${keyword}"` : ""}${vintage ? ` (vintage ${vintage})` : ""}`, { items: found, total: found.length });
    },
  },

  {
    name: "census_geography_levels",
    description:
      "List the geography levels a dataset supports (state, county, place, tract, block group, ZCTA, congressional district, ...) " +
      "and which parent levels each requires in in_geo. Use before querying sub-state geographies.",
    annotations: { title: "Census: Geography Levels", readOnlyHint: true },
    parameters: z.object({
      dataset: z.string().optional().describe("Dataset path (default '2023/acs/acs5')"),
    }),
    execute: async ({ dataset }) => {
      const ds = dataset ?? "2023/acs/acs5";
      const levels = await getGeographyLevels(ds);
      if (!levels.length) return emptyResponse(`No geography metadata for ${ds}.`);
      return tableResponse(`${ds}: ${levels.length} geography levels`, {
        rows: levels.map(l => ({ code: l.code, level: l.name, requires: l.requires.join(" > ") || "—", wildcardOk: l.wildcard.join(", ") || "—" })),
        columns: ["code", "level", "requires", "wildcardOk"],
      });
    },
  },
];
