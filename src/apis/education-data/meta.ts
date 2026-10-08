/**
 * education-data module metadata.
 */

import { INST_CONTROL } from "./sdk.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "education-data",
  displayName: "Education Data (IPEDS + CCD)",
  category: "Education",
  description:
    "The U.S. Department of Education's core institutional collections via the Urban Institute Education Data API: " +
    "IPEDS (every degree-granting college & university) and the Common Core of Data (every public K-12 school and " +
    "district). The comprehensive institutional backbone that College Scorecard only samples. Keyless.",
  workflow:
    "edu_colleges(state='CO') to list higher-ed institutions from IPEDS → edu_schools(state='CO', " +
    "county_fips='08101') for public K-12 schools in a county from the CCD.",
  tips:
    "State accepts a 2-letter code or numeric FIPS. edu_schools scopes to a county with a 5-digit FIPS. This is " +
    "the institutional census — for student outcomes (earnings, completion) see the College Scorecard module; " +
    "for test scores see NAEP. Cross with census demographics and cdc_places_health for community profiles.",
  domains: ["education"],
  crossRef: [
    { question: "education", route: "edu_schools (CCD K-12 by county/state), edu_colleges (IPEDS institutions)" },
    { question: "college", route: "edu_colleges (IPEDS directory — sector, level, degrees)" },
  ],
  reference: {
    instControl: INST_CONTROL,
    docs: {
      "Urban Education Data API": "https://educationdata.urban.org/documentation/",
      "IPEDS": "https://nces.ed.gov/ipeds/",
      "Common Core of Data": "https://nces.ed.gov/ccd/",
    },
  },
} satisfies ModuleMeta;
