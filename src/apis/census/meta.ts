/**
 * census module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "census",
  displayName: "Census Bureau",
  category: "Demographics",
  description: "Population, demographics, income, housing, business data from ACS, Decennial Census",
  auth: { envVar: "CENSUS_API_KEY", optional: true, signup: "https://api.census.gov/data/key_signup.html" },
  workflow: "census_resolve_geography ('Philadelphia, PA' → FIPS/ucgid) → census_search_tables ('median income' → B19013) → census_query with descriptive=true. census_datasets / census_geography_levels when you need a dataset path or a sub-state level.",
  tips: "Methodology: ACS values are estimates with margins of error — request the M-suffix variable (B19013_001M) alongside the E-suffix estimate when precision matters; 1-year files (areas 65k+) are current but noisy, 5-year files cover all geographies and smooth small-area noise; never compare overlapping 5-year windows. Common variables: NAME, B01001_001E (population), B19013_001E (median income), B25077_001E (home value). Datasets: 2023/acs/acs1 (1yr, areas 65k+), 2023/acs/acs5 (5yr, all geographies incl. tracts), 2020/dec/pl (Decennial). Never guess FIPS codes — resolve them.",
  domains: ["economy", "housing", "education"],
  crossRef: [
    { question: "spending/budget", route: "census_population (population for per-capita spending)" },
    { question: "state-level", route: "census_query with B01001_001E (population), B19013_001E (median income)" },
    { question: "housing", route: "census_query with B25077_001E (home value), B25064_001E (median rent)" },
    { question: "education", route: "census_query (poverty rates for education context)" },
    { question: "college", route: "census_query (educational attainment variables)" },
    { question: "workplace safety", route: "census_population (per-capita context)" },
    { question: "disasters", route: "census_population (per-capita impact calculations)" },
    { question: "economy", route: "census_query with B19013_001E (median household income), B01001_001E (population for per-capita calculations)" },
    { question: "international", route: "census_population (U.S. population for per-capita international comparisons)" },
  ],
  reference: {
    docs: {
      "API User Guide": "https://www.census.gov/data/developers/guidance/api-user-guide.html",
      "Available APIs": "https://www.census.gov/data/developers/data-sets.html",
      "ACS 5-Year": "https://www.census.gov/data/developers/data-sets/acs-5year.html",
      "Geocoder": "https://geocoding.geo.census.gov/geocoder/",
      "Dataset Discovery (data.json)": "https://api.census.gov/data.html",
    },
  },
} satisfies ModuleMeta;
