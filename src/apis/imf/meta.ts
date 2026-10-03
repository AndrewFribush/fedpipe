/**
 * imf module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "imf",
  displayName: "IMF (International Monetary Fund)",
  category: "International & Economy",
  description:
    "IMF DataMapper — headline macroeconomic indicators for ~200 economies from the World Economic Outlook and " +
    "Fiscal Monitor: GDP growth, inflation, government debt and deficits, current account, unemployment, and more, " +
    "with IMF forecasts extending several years past the present. The international complement to FRED, BEA, and BLS. Keyless.",
  workflow:
    "imf_search_indicators('debt') to find an indicator code → imf_indicator(indicator='GGXWDG_NGDP', " +
    "countries=['USA','CHN']) for the series. Omit countries for all economies.",
  tips:
    "Countries are ISO-3 codes (USA, CHN, DEU). Common codes: NGDP_RPCH (real GDP growth %), PCPIPCH (inflation %), " +
    "GGXWDG_NGDP (gov gross debt %GDP), GGXCNL_NGDP (fiscal balance %GDP), BCA_NGDPD (current account %GDP), " +
    "LUR (unemployment %). Values past the current year are IMF forecasts. For U.S.-only detail use fred/bea/bls; " +
    "for development indicators use world-bank.",
  domains: ["international", "economy"],
  crossRef: [
    { question: "international", route: "imf_indicator (GDP growth, inflation, debt %GDP by country)" },
    { question: "economy", route: "imf_indicator (cross-country macro comparison & IMF forecasts)" },
    { question: "debt/deficit", route: "imf_indicator (GGXWDG_NGDP gov debt %GDP, GGXCNL_NGDP fiscal balance)" },
  ],
  reference: {
    commonIndicators: {
      NGDP_RPCH: "Real GDP growth (annual %)",
      PCPIPCH: "Inflation, avg consumer prices (annual %)",
      GGXWDG_NGDP: "General government gross debt (% of GDP)",
      GGXCNL_NGDP: "General government net lending/borrowing (% of GDP)",
      BCA_NGDPD: "Current account balance (% of GDP)",
      LUR: "Unemployment rate (%)",
    },
    docs: { "IMF DataMapper API": "https://www.imf.org/external/datamapper/api/help" },
  },
} satisfies ModuleMeta;
