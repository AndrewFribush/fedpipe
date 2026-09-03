/**
 * who module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "who",
  displayName: "WHO Global Health Observatory",
  category: "International & Health",
  description:
    "World Health Organization Global Health Observatory (GHO) — global health statistics for ~200 countries: " +
    "life expectancy, mortality, disease burden, immunization coverage, risk factors (tobacco, obesity, alcohol), " +
    "health-system capacity, and the SDG health indicators. The international complement to CDC. Keyless.",
  workflow:
    "who_search_indicators('life expectancy') to find a GHO code → who_indicator(indicator='WHOSIS_000001', " +
    "country='USA') for the series. Omit country for a cross-country comparison.",
  tips:
    "Countries are ISO-3 codes (USA, GBR, IND). Indicators are GHO codes — WHOSIS_000001 (life expectancy at birth), " +
    "many carry a sex/age dimension (returned as 'dimension'). For U.S. sub-national health use the cdc and " +
    "cdc_places_health tools; for cross-country macro use imf or world-bank.",
  domains: ["international", "health"],
  crossRef: [
    { question: "international", route: "who_indicator (life expectancy, mortality, immunization by country)" },
    { question: "health", route: "who_indicator (global risk factors & disease burden — complements CDC)" },
  ],
  reference: {
    commonIndicators: {
      WHOSIS_000001: "Life expectancy at birth (years)",
      WHOSIS_000015: "Healthy life expectancy (HALE) at birth",
      MDG_0000000001: "Infant mortality rate (per 1000 live births)",
      M_Est_tob_curr: "Tobacco use, age-standardized prevalence (%)",
      NCD_BMI_30C: "Obesity prevalence, adults (%)",
    },
    docs: { "WHO GHO OData API": "https://www.who.int/data/gho/info/gho-odata-api" },
  },
} satisfies ModuleMeta;
