/**
 * Canonical arguments for the live smoke suite (tests/live/tools.smoke.test.ts).
 *
 * Every tool whose schema has required params needs an entry here. Tools that accept
 * `{}` run with no args unless overridden. An entry may be:
 *   - a plain args object, or
 *   - an async function that derives args at runtime — used by "detail" tools whose IDs
 *     churn (press-release UUIDs, filing UUIDs, complaint IDs). It receives `run(tool, args)`
 *     which executes a sibling tool and returns its parsed response, plus `first(res)`.
 *
 * Keep args small (low `limit`, narrow date ranges) — these hit real government APIs.
 */

export type Args = Record<string, unknown>;
export interface DeriveCtx {
  run: (toolName: string, args?: Args) => Promise<any>;
  /** First item/row/record of a parsed tool response, as an object. */
  first: (res: any) => Record<string, any> | undefined;
}
export type ArgsEntry = Args | ((ctx: DeriveCtx) => Promise<Args>);

const BILL = { congress: 117, bill_type: "hr", bill_number: 3684 } as const; // 117 HR 3684 — the Infrastructure Investment and Jobs Act (roll-call votes, 50+ related bills, amendments)
const AMDT = { congress: 118, amendment_type: "samdt", amendment_number: 1 } as const;
const NOM = { congress: 118, nomination_number: 1 } as const;
const TREATY = { congress: 117, treaty_number: 1 } as const;
const TREATY_PART = { congress: 114, treaty_number: 13, treaty_suffix: "A" } as const; // one of the few partitioned treaties

export const TOOL_ARGS: Record<string, ArgsEntry> = {
  // ─── BEA ────────────────────────────────────────────────────────────
  bea_dataset_info: { action: "list_datasets" },
  bea_multinational_enterprises: { direction_of_investment: "Outward", classification: "Country", year: "2022" },
  bea_input_output: { table_id: "56", year: "2022" },

  // ─── BLS ────────────────────────────────────────────────────────────
  bls_series_data: { series_ids: "LNS14000000", start_year: 2024, end_year: 2024 },
  bls_search_series: { topic: "unemployment" },

  // ─── CDC ────────────────────────────────────────────────────────────
  cdc_query: { dataset_id: "bi63-dtpu", limit: 5 },

  // ─── Census ─────────────────────────────────────────────────────────
  census_query: { dataset: "2023/acs/acs1", variables: "NAME,B01001_001E", for_geo: "state:06" },
  census_search_variables: { dataset: "2023/acs/acs1", keyword: "income" },
  census_resolve_geography: { name: "Philadelphia, PA" },
  census_search_tables: { keyword: "median household income" },
  census_datasets: { keyword: "county business patterns", max_results: 3 },

  // ─── CFPB ───────────────────────────────────────────────────────────
  cfpb_complaint_aggregations: { field: "product" },
  cfpb_complaint_trends: { trend_interval: "year" },
  cfpb_complaint_detail: async ({ run, first }) => {
    const id = first(await run("cfpb_search_complaints", { limit: 1 }))?.complaint_id;
    return { complaint_id: Number(id) };
  },
  cfpb_suggest_company: { text: "wells" },

  // ─── ClinicalTrials.gov ─────────────────────────────────────────────
  clinical_trials_detail: { nct_id: "NCT00841061" },
  clinical_trials_results: { nct_id: "NCT04368728" }, // Pfizer COVID-19 vaccine trial — has posted results
  clinical_trials_stats: { condition: "semaglutide" },
  clinical_trials_by_location: { latitude: 38.9072, longitude: -77.0369, limit: 5 },
  clinical_trials_field_values: { fields: "Phase" },

  // ─── CMS ────────────────────────────────────────────────────────────
  cms_search: { keyword: "hospital" },
  cms_query: { dataset_id: "xubh-q36u", limit: 5 },

  // ─── College Scorecard ──────────────────────────────────────────────
  scorecard_compare: { schools: "Harvard,MIT" },
  scorecard_top: { ranking: "graduation", limit: 5 },
  scorecard_query: { filters: "school.state=VT", limit: 5 },

  // ─── Congress ───────────────────────────────────────────────────────
  congress_bill_details: BILL,
  congress_bill_actions: BILL,
  congress_bill_amendments: BILL,
  congress_bill_summaries: BILL,
  congress_bill_text: BILL,
  congress_bill_related: BILL,
  congress_bill_subjects: BILL,
  congress_bill_committees: BILL,
  congress_bill_titles: BILL,
  congress_bill_cosponsors: BILL,
  congress_bill_votes: BILL,
  congress_bill_full_profile: BILL,
  congress_member_bills: { bioguide_id: "S000033" },
  congress_member_details: { bioguide_id: "S000033" },
  congress_member_full_profile: { bioguide_id: "S000033" },
  congress_committee_bills: { chamber: "house", committee_code: "hsba00" },
  congress_committee_details: { chamber: "house", committee_code: "hsba00" },
  congress_committee_full_profile: { chamber: "house", committee_code: "hsba00" },
  congress_committee_details_by_congress: { congress: 118, chamber: "house", committee_code: "hsba00" },
  congress_committee_reports_for_committee: { chamber: "house", committee_code: "hsju00" },
  congress_committee_nominations_for_committee: { chamber: "senate", committee_code: "ssju00" },
  congress_committee_house_communications: { committee_code: "hsgo00" },
  congress_committee_senate_communications: { committee_code: "ssfr00" },
  congress_amendment_details: AMDT,
  congress_amendment_text: AMDT,
  congress_amendment_cosponsors: AMDT,
  congress_amendment_amendments: AMDT,
  congress_nomination_details: NOM,
  congress_nomination_committees: NOM,
  congress_nomination_hearings: NOM,
  congress_nomination_nominees: { ...NOM, ordinal: 1 },
  congress_nomination_full_profile: NOM,
  congress_treaty_details: TREATY,
  congress_treaty_committees: TREATY,
  congress_treaty_full_profile: TREATY,
  congress_treaty_partitioned_details: TREATY_PART,
  congress_treaty_partitioned_actions: TREATY_PART,
  congress_crs_report_details: { report_number: "R47175" },
  congress_law_details: { congress: 118, law_type: "pub", law_number: 274 },
  congress_committee_report_details: { congress: 118, report_type: "hrpt", report_number: 617 },
  congress_committee_report_text: { congress: 118, report_type: "hrpt", report_number: 617 },
  congress_committee_print_details: { congress: 118, chamber: "house", jacket_number: 57586 },
  congress_committee_print_text: { congress: 118, chamber: "house", jacket_number: 57586 }, // jacket with published text versions
  congress_committee_meeting_details: { congress: 118, chamber: "house", event_id: "115538" },
  congress_hearing_details: { congress: 118, chamber: "house", jacket_number: 56268 },
  congress_house_communication_details: { congress: 118, communication_type: "ec", communication_number: 1 },
  congress_senate_communication_details: { congress: 118, communication_type: "ec", communication_number: 1 },
  congress_house_requirement_details: { requirement_number: 8070 },
  congress_house_requirement_matching_communications: { requirement_number: 8070 },

  // ─── DOJ News ───────────────────────────────────────────────────────
  doj_press_release_detail: async ({ run, first }) => ({ uuid: first(await run("doj_press_releases", { limit: 1 }))?.uuid }),
  doj_blog_detail: async ({ run, first }) => ({ uuid: first(await run("doj_blog_entries", { limit: 1 }))?.uuid }),

  // ─── EPA ────────────────────────────────────────────────────────────
  epa_facilities: { state: "VT", limit: 5 },
  epa_facility_detail: { registry_id: "110071141730" },
  epa_toxic_releases: { state: "VT", limit: 5 },
  epa_greenhouse_gas: { state: "VT", limit: 5 },
  epa_drinking_water: { state: "VT", limit: 5 },
  epa_enforcement: { state: "VT", limit: 5 },
  epa_superfund: { state: "NJ", limit: 5 },
  epa_rcra: { state: "VT", limit: 5 },

  // ─── EPA AQS ────────────────────────────────────────────────────────
  epa_air_quality: { state: "06", param: "44201", bdate: "20240101", edate: "20240107" },
  epa_aqs_daily: { state: "06", param: "44201", bdate: "20240101", edate: "20240107" },
  epa_aqs_monitors: { state: "06", param: "44201", bdate: "20240101", edate: "20240107" },

  // ─── FBI ────────────────────────────────────────────────────────────
  fbi_agencies: { state: "VT" },
  fbi_crime_summarized: { offense: "V" },
  fbi_arrest_data: { offense: "11" },
  fbi_lesdc: { chart_type: "totals", year: 2022 },
  fbi_use_of_force: { scope: "federal", year: 2022 },
  fbi_nibrs: { offense: "120" },
  fbi_expanded_property: { offense: "NB" },

  // ─── FDA ────────────────────────────────────────────────────────────
  fda_drug_counts: { count_field: "patient.reaction.reactionmeddrapt.exact", limit: 5 },
  fda_count: { endpoint: "drug/ndc", count_field: "dosage_form.exact", limit: 5 },

  // ─── FEC ────────────────────────────────────────────────────────────
  fec_individual_contributions: { committee_id: "C00401224", cycle: 2026, per_page: 5 }, // ActBlue — indexed lookup, always has rows (name search is an unindexed full scan)
  fec_candidate_financials: { candidate_id: "P80001571" },
  fec_committee_financials: { committee_id: "C00703975" },
  fec_top_candidates: { office: "P", election_year: 2024 },
  fec_committee_disbursements: { committee_id: "C00016683" },
  fec_outside_spending_by_candidate: { candidate_id: "P80000722", cycle: 2024 },

  // ─── Federal Register ───────────────────────────────────────────────
  fr_document_detail: { document_number: "2024-00001" },

  // ─── FEMA ───────────────────────────────────────────────────────────
  fema_query: { dataset: "disaster_declarations", top: 5 },

  // ─── FRED ───────────────────────────────────────────────────────────
  fred_search: { query: "unemployment rate" },
  fred_series_info: { series_id: "UNRATE" },
  fred_series_data: { series_id: "UNRATE", start_date: "2024-01-01", end_date: "2024-06-01" },
  fred_release_data: { release_id: 53 },
  fred_browse: { kind: "category_series", id: 22, limit: 5 }, // 22 = Interest Rates

  // ─── GovInfo ────────────────────────────────────────────────────────
  govinfo_search: { query: "infrastructure" },
  govinfo_bill_text: { congress: 118, bill_type: "hr", bill_number: 3684 },
  govinfo_cbo_reports: { query: "reconciliation" },

  // ─── GSA CALC+ ──────────────────────────────────────────────────────
  calc_suggest: { field: "labor_category", prefix: "soft" },
  calc_contract_rates: async ({ run, first }) => {
    const row = first(await run("calc_search_rates", { keyword: "software engineer", page_size: 1 }));
    return { contract_number: row?.contract ?? "47QREA22D000R" };
  },

  // ─── HUD ────────────────────────────────────────────────────────────
  hud_list_counties: { state: "VT" },

  // ─── NAEP ───────────────────────────────────────────────────────────
  naep_scores: { subject: "math", grade: 8 },
  naep_achievement_levels: { subject: "math", grade: 8 },
  naep_compare_years: { subject: "math", grade: 8, years: "2022,2019" },
  naep_compare_states: { subject: "math", grade: 8, jurisdictions: "NP,CA,TX" },
  naep_compare_groups: { subject: "math", grade: 8, variable: "GENDER" },
  naep_gap_year_jurisdiction: { subject: "math", grade: 8, years: "2022,2019", jurisdictions: "CA,MA" },
  naep_gap_variable_years: { subject: "math", grade: 8, variable: "GENDER", years: "2022,2019" },
  naep_gap_variable_jurisdiction: { subject: "math", grade: 8, variable: "GENDER", jurisdictions: "MA,MS" },
  naep_available_variables: { subject: "math", cohort: 2, years: "2022" },

  // ─── NHTSA ──────────────────────────────────────────────────────────
  nhtsa_recalls: { make: "toyota", model: "camry", model_year: 2020 },
  nhtsa_recall_detail: { campaign_number: "23V838000" },
  nhtsa_complaints: { make: "toyota", model: "camry", model_year: 2020 },
  nhtsa_complaint_detail: async ({ run, first }) => {
    const row = first(await run("nhtsa_complaints", { make: "toyota", model: "camry", model_year: 2020 }));
    return { odi_number: Number(row?.odiNumber ?? row?.odi_number ?? 11184030) };
  },
  nhtsa_model_years: { issue_type: "r" },
  nhtsa_makes: { model_year: 2020, issue_type: "r" },
  nhtsa_models: { make: "toyota", model_year: 2020 },
  nhtsa_decode_vin: { vin: "1FTFW1ET5DFC10312" }, // real 2013 Ford F-150 (NHTSA docs example)
  nhtsa_safety_ratings: { make: "honda", model: "civic", model_year: 2020 },
  nhtsa_safety_rating_detail: async ({ run, first }) => {
    const row = first(await run("nhtsa_safety_ratings", { make: "honda", model: "civic", model_year: 2020 }));
    return { vehicle_id: Number(row?.vehicleId ?? row?.VehicleId ?? 19950) };
  },
  nhtsa_car_seat_stations: { state: "VT" },

  // ─── NWS (no key) ───────────────────────────────────────────────────
  nws_point_info: { lat: 38.8894, lon: -77.0352 },
  nws_forecast: { lat: 38.8894, lon: -77.0352 },
  nws_forecast_hourly: { lat: 38.8894, lon: -77.0352 },
  nws_stations_near: { lat: 38.8894, lon: -77.0352, limit: 3 },
  nws_observation_latest: { station_id: "KDCA" },
  nws_zone_forecast: async ({ run }) => {
    const r = await run("nws_point_info", { lat: 38.8894, lon: -77.0352 });
    const rec = r?.record ?? r?.data ?? r;
    return { zone_id: rec?.forecastZoneId ?? rec?.forecastZone ?? "DCZ001" };
  },
  nws_alert: async ({ run, first }) => {
    const a = first(await run("nws_alerts_active", { limit: 1 }));
    return { id: a?.id ?? a?.urn };
  },

  // ─── NIH ────────────────────────────────────────────────────────────
  nih_spending_by_category: { category_id: 27, fiscal_years: [2023, 2024] },
  nih_projects_by_agency: { fiscal_year: 2024 },

  // ─── NOAA ───────────────────────────────────────────────────────────
  noaa_climate_data: { dataset_id: "GHCND", start_date: "2024-01-01", end_date: "2024-01-03", station_id: "GHCND:USW00094728", limit: 10 },

  // ─── NREL ───────────────────────────────────────────────────────────
  nrel_utility_rates: { lat: 40.7128, lon: -74.006 },
  nrel_solar: { lat: 40.7128, lon: -74.006 },

  // ─── Open Payments (unfiltered sorts time out upstream — always pass a filter) ──
  open_payments_top: { state: "VT", limit: 5 },
  open_payments_top_doctors: { state: "VT", limit: 5 },

  // ─── Regulations.gov ────────────────────────────────────────────────
  regulations_document_detail: { documentId: "FDA-2009-N-0501-0012" },
  regulations_comment_detail: { commentId: "HHS-OCR-2018-0002-5313" },
  regulations_docket_detail: { docketId: "EPA-HQ-OAR-2003-0129" },

  // ─── SEC ────────────────────────────────────────────────────────────
  sec_company_search: { cik: "0000320193" },
  sec_company_financials: { cik: "0000320193" },
  sec_filing_search: { query: "Apple" },
  sec_ticker_lookup: { query: "AAPL" },
  sec_recent_filings: { cik: "AAPL", forms: "8-K", limit: 3 },
  sec_insider_transactions: { cik: "AAPL", filings: 3 },
  sec_company_concept: { cik: "AAPL", concept: "Revenues" },
  sec_concept_across_companies: { concept: "Revenues", period: "CY2023", limit: 5 },
  sec_filing_text: async ({ run, first }) => {
    const f = first(await run("sec_recent_filings", { cik: "AAPL", forms: "10-K", limit: 1 }));
    return { cik: "AAPL", accession_number: f?.accessionNumber, section: "risk_factors", max_chars: 3000 };
  },

  // ─── Senate Lobbying ────────────────────────────────────────────────
  lobbying_detail: async ({ run, first }) => ({ filing_uuid: first(await run("lobbying_search", { limit: 1, filing_year: 2024 }))?.uuid }),
  lobbying_registrants: { name: "Amazon" },

  // ─── Treasury ───────────────────────────────────────────────────────
  search_datasets: { query: "debt" },
  get_endpoint_fields: { endpoint: "/v2/accounting/od/debt_to_penny" },
  query_fiscal_data: { endpoint: "/v2/accounting/od/debt_to_penny", page_size: 5 },

  // ─── USAspending ────────────────────────────────────────────────────
  usa_agency_overview: { agency_code: "097" },
  usa_spending_by_award: { award_type: "contracts", limit: 5 },

  // ─── USDA FoodData ──────────────────────────────────────────────────
  fooddata_search: { query: "cheddar cheese" },
  fooddata_detail: async ({ run, first }) => ({ fdcId: Number(first(await run("fooddata_search", { query: "cheddar cheese" }))?.fdcId ?? 171705) }),

  // ─── USDA NASS ──────────────────────────────────────────────────────
  usda_crop_data: { commodity: "CORN", year: 2023 },
  usda_livestock: { commodity: "CATTLE", year: 2023 },
  usda_prices: { commodity: "CORN", year: 2023 },

  // ─── USGS ───────────────────────────────────────────────────────────
  usgs_water_data: { sites: "01646500", parameter_cd: "00060" },
  usgs_daily_water_data: { sites: "01646500", parameter_cd: "00060" },
  usgs_water_sites: { state_cd: "VT" },
  usgs_water_statistics: { sites: "01646500", stat_report_type: "monthly" },

  // ─── USPTO ──────────────────────────────────────────────────────────
  uspto_application_details: { application_number: "14412875" },
  uspto_application_continuity: { application_number: "14412875" },
  uspto_application_assignments: { application_number: "14412875" },
  uspto_application_transactions: { application_number: "14412875" },
  uspto_application_documents: { application_number: "14412875" },
  uspto_ptab_proceeding_details: { trial_number: "IPR2025-01319" },

  // ─── World Bank ─────────────────────────────────────────────────────
  wb_indicator: { indicator: "NY.GDP.MKTP.CD", country: "US", start_year: 2020, end_year: 2023 },
  wb_compare: { indicator: "NY.GDP.MKTP.CD", countries: "US;GB;DE" },
  wb_search: { query: "gdp" },
  wb_reference: { type: "region" },
};

/**
 * Tools allowed to return an empty result for their canned args without
 * failing the suite. Everything else is expected to produce rows — a tool
 * that "passes" by returning empty is how the CMS module stayed silently
 * broken for months. Keep this list short and justified.
 */
export const ALLOWED_EMPTY = new Set<string>([
  // Point-in-time weather alerts — the country can genuinely be quiet.
  "nws_alerts_active", "nws_alert",
  // Varies with real-world conditions.
  "fda_drug_shortages",
  // Empty on weekends/holidays (pre-publication queue).
  "fr_public_inspection",
  // Guarded by design: refuses unfiltered queries with guidance.
  "fec_independent_expenditures",
  "open_payments_search", "open_payments_research", "open_payments_ownership",
  "open_payments_by_physician", "open_payments_by_hospital",
  // Most amendments have zero cosponsors.
  "congress_amendment_cosponsors",
  // Congress: legitimately empty for many subjects (no amendments on the
  // amendment, committee with no pending nominations, recess weeks, …).
  "congress_bill_amendments", "congress_amendment_text", "congress_amendment_amendments",
  "congress_nomination_hearings", "congress_treaty_committees",
  "congress_committee_nominations_for_committee",
  "congress_committee_house_communications", "congress_committee_senate_communications",
  "congress_house_requirement_matching_communications",
  "congress_committee_meetings", "congress_committee_meeting_details",
  "congress_daily_congressional_record", "congress_bound_congressional_record",
  // Dead upstream (also in known-upstream-failures).
  "fbi_use_of_force",
]);
