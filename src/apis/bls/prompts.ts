/**
 * bls MCP prompts.
 */

import type { InputPrompt } from "fastmcp";

export const prompts: InputPrompt<any, any>[] = [
  {
    name: "jobs_report",
    description: "Get a comprehensive labor market overview — employment by industry, unemployment demographics, wages, and job openings.",
    load: async () =>
      "Generate a comprehensive labor market report using BLS data.\n\n" +
      "1. **Employment by industry** — use bls_employment_by_industry for sector breakdown with YoY changes\n" +
      "2. **CPI breakdown** — use bls_cpi_breakdown to show cost-of-living pressure on workers\n" +
      "3. **Wages** — use bls_series_data for CES0500000003 (average hourly earnings)\n" +
      "4. **Broader unemployment** — use bls_series_data for LNS13023621 (U-6) and LNS11300000 (participation rate)\n\n" +
      "Compare wages to CPI: are real wages rising or falling?\n" +
      "Which industries are growing vs shrinking?\n" +
      "Present the full picture of the labor market.",
  },
  {
    name: "county_economy",
    description: "Profile a county's economy: employment, wages, industry mix, demographics, and housing — QCEW + Census, no API keys required for the wage data.",
    arguments: [
      { name: "county", description: "County name with state (e.g. 'Cook County, IL' or 'Deschutes County, Oregon')", required: true },
    ],
    load: async ({ county }) => {
      return `Build an economic profile of ${county}:\n\n` +
        "1. **Resolve the county** — census_resolve_geography(name='" + county + "', level='county') to get its 5-digit FIPS code\n" +
        "2. **Employment & wages** — bls_county_wages(area=<fips>, year=<latest full year>, quarter='a', industry_code='10') for totals, then omit industry_code for the industry breakdown (avg_pay, oty_avg_pay_pct_chg show wage levels and growth)\n" +
        "3. **Dominant industries** — from the breakdown, identify the top private sectors by employment and any with location quotient lq_avg_pay well above 1\n" +
        "4. **Demographics** — census_query with B01001_001E (population), B19013_001E (median household income), B25077_001E (median home value) using the resolved forGeo/inGeo\n" +
        "5. **Context** — compare avg annual pay (QCEW) to median household income (ACS); note that QCEW covers jobs located in the county while ACS covers residents\n\n" +
        "Summarize: what drives this county's economy, how do its wages compare to its cost of living, and is it growing?";
    },
  },
];
