/**
 * hmda module metadata.
 */

import { ACTIONS, LOAN_TYPES, LOAN_PURPOSES, RACES } from "./sdk.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "hmda",
  displayName: "HMDA Mortgage Lending (CFPB)",
  category: "Housing & Finance",
  description:
    "Home Mortgage Disclosure Act data via the CFPB — the near-census of U.S. mortgage lending. Loan counts and " +
    "total dollar volume for any filtered slice (state or county, year, action taken, loan type/purpose, and " +
    "applicant race/sex/ethnicity), with automatic grouping when multiple values of a dimension are passed. The " +
    "primary dataset for mortgage access and fair-lending analysis. Keyless.",
  workflow:
    "hmda_lending(county='08101', year=2022) for total originations in a county → add races=['White','Black or " +
    "African American','Asian'] (or sexes/loan_types) to group and compare approval volume across applicant groups.",
  tips:
    "Provide a state (2-letter) OR county (5-digit FIPS), a year (2018+), and at least one filter dimension " +
    "(defaults to action=originated). Returns count + dollar volume per group. To compare denial vs origination, " +
    "pass actions=['1','3']. Cross with hud (rents/income limits), census, and fema (flood risk) for housing studies.",
  domains: ["housing", "finance"],
  crossRef: [
    { question: "housing", route: "hmda_lending (originations/denials by county, grouped by race/sex/loan type)" },
    { question: "banking", route: "hmda_lending (mortgage volume & access by geography and applicant group)" },
  ],
  reference: {
    actions: ACTIONS,
    loanTypes: LOAN_TYPES,
    loanPurposes: LOAN_PURPOSES,
    races: RACES,
    docs: {
      "HMDA data browser": "https://ffiec.cfpb.gov/data-browser/",
      "HMDA API": "https://cfpb.github.io/hmda-platform/#hmda-api-documentation",
    },
  },
} satisfies ModuleMeta;
