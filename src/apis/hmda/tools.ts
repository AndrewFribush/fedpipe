/**
 * hmda MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getLendingAggregations, ACTIONS, LOAN_TYPES, LOAN_PURPOSES, RACES, SEXES } from "./sdk.js";
import { tableResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "hmda_lending",
    description:
      "Home-mortgage lending from HMDA (Home Mortgage Disclosure Act) — the near-census of U.S. mortgage " +
      "applications, via the CFPB. Returns loan COUNT and total dollar VOLUME for a filtered slice.\n\n" +
      "Pass multiple comma-separated values of a dimension to GROUP by it — e.g. races='White,Black or African " +
      "American,Asian' returns one row per race, the standard fair-lending cut. Filter by state or county, year, " +
      "action taken (originated/denied/...), loan type, purpose, and applicant race/sex/ethnicity.\n\n" +
      "Examples: county='08101', year=2022 → all originations in Pueblo County; states via 2-letter code. " +
      "Pairs with HUD rents, Census demographics, and FEMA flood risk. Keyless.",
    annotations: { title: "HMDA: Mortgage Lending", readOnlyHint: true },
    parameters: z.object({
      year: z.number().int().describe("Year of the loan data (HMDA modern era: 2018 onward)."),
      state: z.string().optional().describe("Two-letter state code, e.g. 'CO'. Provide state OR county."),
      county: z.string().optional().describe("5-digit county FIPS, e.g. '08101' (Pueblo County, CO)."),
      actions: z.array(z.string()).optional().describe(`Action(s) taken. Codes: ${Object.entries(ACTIONS).map(([k, v]) => `${k}=${v}`).join("; ")}. Default: ["1"] (originated).`),
      loan_types: z.array(z.string()).optional().describe(`Loan type(s). Codes: ${Object.entries(LOAN_TYPES).map(([k, v]) => `${k}=${v}`).join("; ")}.`),
      loan_purposes: z.array(z.string()).optional().describe(`Loan purpose(s). Codes: ${Object.entries(LOAN_PURPOSES).map(([k, v]) => `${k}=${v}`).join("; ")}.`),
      races: z.array(z.enum(RACES as unknown as [string, ...string[]])).optional().describe("Applicant race(s) — pass several to group by race."),
      sexes: z.array(z.enum(SEXES as unknown as [string, ...string[]])).optional().describe("Applicant sex(es)."),
      ethnicities: z.array(z.string()).optional().describe("Applicant ethnicity(ies), e.g. 'Hispanic or Latino'."),
    }),
    execute: async ({ year, state, county, actions, loan_types, loan_purposes, races, sexes, ethnicities }) => {
      if (!state && !county) return emptyResponse("Provide a state (2-letter) or county (5-digit FIPS).");
      const { parameters, groups } = await getLendingAggregations({
        year, state, county,
        actions, loanTypes: loan_types, loanPurposes: loan_purposes, races, sexes, ethnicities,
      });
      if (!groups.length) return emptyResponse("No HMDA records match those filters.");

      // Column order: put grouping dimensions first, then the metrics.
      const dimCols = Object.keys(groups[0]).filter(k => k !== "count" && k !== "loanVolumeUsd");
      return tableResponse(
        `HMDA ${year} — ${groups.length} group(s) for ${county ? `county ${county}` : state?.toUpperCase()}`,
        {
          rows: groups,
          columns: [...dimCols, "count", "loanVolumeUsd"],
          meta: { source: "HMDA via CFPB data browser", parameters, loanVolumeUsd: "sum of loan amounts, USD" },
        },
      );
    },
  },
];
