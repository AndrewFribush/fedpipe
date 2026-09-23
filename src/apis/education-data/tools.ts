/**
 * education-data MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getColleges, getSchools } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "edu_colleges",
    description:
      "List colleges and universities in a state from IPEDS (the U.S. Department of Education's institutional " +
      "census), via the Urban Institute Education Data API. Returns each institution's name, location, sector " +
      "(public / private nonprofit / for-profit), level, and highest degree offered.\n\n" +
      "The comprehensive institutional backbone — broader than the outcome-focused College Scorecard. Keyless.",
    annotations: { title: "Education: Colleges & Universities (IPEDS)", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe("Two-letter state code (e.g. 'CO') or numeric state FIPS."),
      year: z.number().int().optional().describe("IPEDS year (default 2022)."),
      limit: z.number().int().max(500).optional().describe("Max institutions (default 100)."),
    }),
    execute: async ({ state, year, limit }) => {
      const { total, results } = await getColleges({ state, year, limit });
      if (!results.length) return emptyResponse(`No IPEDS institutions found for '${state}'.`);
      return tableResponse(`IPEDS: ${total} institution(s), showing ${results.length}`, {
        rows: results,
        columns: ["name", "city", "county", "control", "highest_degree", "unitid"],
        total,
        meta: { source: "IPEDS via Urban Institute Education Data API", year: year ?? 2022 },
      });
    },
  },

  {
    name: "edu_schools",
    description:
      "List public K-12 schools from the Common Core of Data (CCD) directory — the U.S. Department of Education's " +
      "census of every public school — via the Urban Institute Education Data API. Scope to a county (5-digit FIPS) " +
      "or a whole state. Returns school name, district, location, grade range, and coordinates.\n\n" +
      "Pairs with Census demographics and CDC PLACES for a community profile. Keyless.",
    annotations: { title: "Education: Public K-12 Schools (CCD)", readOnlyHint: true },
    parameters: z.object({
      state: z.string().describe("Two-letter state code (e.g. 'CO') or numeric state FIPS."),
      county_fips: z.string().optional().describe("5-digit county FIPS to scope to one county, e.g. '08101' (Pueblo)."),
      year: z.number().int().optional().describe("CCD year (default 2021)."),
      limit: z.number().int().max(500).optional().describe("Max schools (default 100)."),
    }),
    execute: async ({ state, county_fips, year, limit }) => {
      const { total, results } = await getSchools({ state, countyFips: county_fips, year, limit });
      if (!results.length) return emptyResponse(`No CCD schools found for '${county_fips ?? state}'.`);
      return tableResponse(`CCD: ${total} public school(s), showing ${results.length}`, {
        rows: results,
        columns: ["name", "district", "city", "lowest_grade", "highest_grade", "ncessch"],
        total,
        meta: { source: "CCD via Urban Institute Education Data API", year: year ?? 2021 },
      });
    },
  },
];
