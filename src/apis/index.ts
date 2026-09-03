/**
 * SDK barrel export — import any SDK function without running the MCP server.
 *
 * Usage:
 *   import { searchBills, getBillDetails } from "fedpipe/sdk/congress";
 *   import { searchFilings } from "fedpipe/sdk/senate-lobbying";
 *
 * Or import everything:
 *   import * as sdk from "fedpipe/sdk";
 *   const bills = await sdk.congress.searchBills({ congress: 118 });
 *
 * Each sub-module is a standalone typed client with caching, retry, and rate limiting.
 * No MCP or Zod dependency required — just set the relevant API key env var.
 */

export * as bea from "./bea/sdk.js";
export * as bls from "./bls/sdk.js";
export * as bts from "./bts/sdk.js";
export * as cdc from "./cdc/sdk.js";
export * as census from "./census/sdk.js";
export * as cftc from "./cftc/sdk.js";
export * as cfpb from "./cfpb/sdk.js";
export * as clinicalTrials from "./clinical-trials/sdk.js";
export * as cms from "./cms/sdk.js";
export * as collegeScorecard from "./college-scorecard/sdk.js";
export * as congress from "./congress/sdk.js";
export * as courtlistener from "./courtlistener/sdk.js";
export * as dojNews from "./doj-news/sdk.js";
export * as dol from "./dol/sdk.js";
export * as eia from "./eia/sdk.js";
export * as epa from "./epa/sdk.js";
export * as epaAqs from "./epa-aqs/sdk.js";
export * as exemptOrgs from "./exempt-orgs/sdk.js";
export * as fara from "./fara/sdk.js";
export * as fbi from "./fbi/sdk.js";
export * as fcc from "./fcc/sdk.js";
export * as fda from "./fda/sdk.js";
export * as fdic from "./fdic/sdk.js";
export * as faa from "./faa/sdk.js";
export * as fec from "./fec/sdk.js";
export * as federalRegister from "./federal-register/sdk.js";
export * as fema from "./fema/sdk.js";
export * as form5500 from "./form5500/sdk.js";
export * as fred from "./fred/sdk.js";
export * as gleif from "./gleif/sdk.js";
export * as govinfo from "./govinfo/sdk.js";
export * as gridDisturbances from "./grid-disturbances/sdk.js";
export * as gsaCalc from "./gsa-calc/sdk.js";
export * as hud from "./hud/sdk.js";
export * as naep from "./naep/sdk.js";
export * as nhtsa from "./nhtsa/sdk.js";
export * as nfip from "./nfip/sdk.js";
export * as nih from "./nih/sdk.js";
export * as noaa from "./noaa/sdk.js";
export * as nonprofits from "./nonprofits/sdk.js";
export * as nsf from "./nsf/sdk.js";
export * as ntsb from "./ntsb/sdk.js";
export * as nrel from "./nrel/sdk.js";
export * as nws from "./nws/sdk.js";
export * as ofac from "./ofac/sdk.js";
export * as opm from "./opm/sdk.js";
export * as openPayments from "./open-payments/sdk.js";
export * as orangeBook from "./orange-book/sdk.js";
export * as regulations from "./regulations/sdk.js";
export * as sec from "./sec/sdk.js";
export * as senateLobbying from "./senate-lobbying/sdk.js";
export * as spaceWeather from "./space-weather/sdk.js";
export * as treasury from "./treasury/sdk.js";
export * as usaspending from "./usaspending/sdk.js";
export * as usdaFooddata from "./usda-fooddata/sdk.js";
export * as usdaNass from "./usda-nass/sdk.js";
export * as usgs from "./usgs/sdk.js";
export * as uspto from "./uspto/sdk.js";
export * as worldBank from "./world-bank/sdk.js";

// ── Coverage wave 1 ──
export * as educationData from "./education-data/sdk.js";
export * as hmda from "./hmda/sdk.js";
export * as nasa from "./nasa/sdk.js";
export * as nistNvd from "./nist-nvd/sdk.js";
export * as usaceNid from "./usace-nid/sdk.js";

// ── Coverage wave 2 ──
export * as imf from "./imf/sdk.js";
export * as who from "./who/sdk.js";
export * as noaaTides from "./noaa-tides/sdk.js";
export * as femaNri from "./fema-nri/sdk.js";
