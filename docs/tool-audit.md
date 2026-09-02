# Tool audit — what's there, what works, what doesn't

A stepwise hands-on audit of every tool in every module: each was called
live with novel arguments (not the smoke-suite's canned ones), plus
variations exercising optional parameters and edge inputs. Legend:
✅ works · ⚠️ works with quirks (noted) · ❌ was broken (fix noted) ·
🔑 blocked — needs an API key we don't hold (see `.env.example`).

Audit date: 2026-09-02. Re-verify with `npm run test:live`; per-tool notes
below are judgment calls from reading real responses, which the suite
doesn't capture.

## bea — Bureau of Economic Analysis (13 tools) 🔑

All 13 tools are blocked on `BEA_API_KEY` (free signup: https://apps.bea.gov/API/signup/).
Live behavior unverified; args in `tests/live/args.ts` are unvalidated guesses.
- ❌→✅ Keyless calls used to die with `Unexpected end of JSON input` (BEA answers
  HTTP 200 with an empty body when the key is missing). The shared client now says
  which env var is missing. Fixed 2026-09-02 for all keyed modules.

## bls — Bureau of Labor Statistics (4 tools)

- ✅ `bls_series_data` — works keyless (registered key optional, raises quota). State
  series work (`LASST26…` = Michigan unemployment). Recent months can be `null` (publication lag) — expected.
- ✅ `bls_search_series` — curated ID lookup (BLS has no search API); honest about that in its description.
- ✅ `bls_cpi_breakdown`, ✅ `bls_employment_by_industry` — clean component tables with YoY columns.

## bts — Bureau of Transportation Statistics (2 tools)

- ⚠️ `bts_transport_stats` — works; response is the raw Socrata row with 100+ unpivoted
  columns (`capital_expenditures_state_65`…), noisy but complete. Column meanings are in
  `upstream-docs/bts/dataset-schemas-live.md`.
- ✅ `bts_border_crossings` — all filters verified (state, border, port_name, measure).
## cdc — CDC Open Data / Socrata (13 tools)

All 13 verified live. Fixes made during audit:
- ❌→✅ State filters: CDC datasets inconsistently store "OH" vs "Ohio"; four tools
  silently returned empty for the "wrong" form. All state filters now match both
  (`state in ('OH','Ohio')`).
- ❌→✅ `cdc_birth_indicators` topic match was case-sensitive ("teen" found nothing);
  now case-insensitive (same for `cdc_nutrition_obesity`).
- ⚠️ `cdc_drug_overdose`: sex/race/age breakdowns exist **only** in the national
  rows — state rows are all-persons totals (dataset limitation, now documented in the
  tool description). Data ends 2016.
- ⚠️ `cdc_mortality_rates` returns one wide row per cause with ~60 `rate_<state>`
  columns rather than one row per state.
- ⚠️ `cdc_life_expectancy` data ends 2018; `cdc_covid` ends May 2023 (both stated in descriptions).
- ✅ `cdc_query` passes raw SoQL through — caller must know exact column values
  (full state names on most vital-statistics datasets).
## census — Census Bureau (8 tools)

- ✅ `census_resolve_geography` — place names and street addresses both verified
  (Pittsburgh → 4 ranked matches with ready-to-use forGeo/inGeo; 1600 Pennsylvania Ave
  geocodes to every containing geography).
- ✅ `census_query` — descriptive labels verified (Gini index for PA = 0.474).
- ✅ `census_search_tables`, `census_population`, `census_datasets`, `census_geography_levels`.
- ❌→✅ `census_search_variables` did whole-phrase substring matching, so "travel time
  work" found nothing (labels say "travel time TO work"). Now token-based with a
  ranked partial-match fallback for non-Census vocabulary ("commute").

## cfpb — Consumer Financial Protection Bureau (6 tools)

- ✅ `cfpb_search_complaints` — free text, company, product filters verified (13M+ records).
- ✅ `cfpb_complaint_aggregations` — verified (mortgage complaints by company).
- ❌→✅ `cfpb_suggest_company` returned empty for every input: the endpoint returns a
  bare JSON string array but the tool expected an Elasticsearch suggest envelope.
  The smoke suite missed it because "empty" isn't an error.
- ⚠️ `cfpb_complaint_trends` / `cfpb_state_complaints` work but return the raw
  Elasticsearch aggregation payload (`_shards`, nested buckets) — usable, not pretty.
- ✅ `cfpb_complaint_detail` (verified in smoke suite via derived id).
## clinical-trials — ClinicalTrials.gov v2 (10 tools)

All 10 verified live, no issues. Highlights: `clinical_trials_search` handles
intervention+phase combos; `_stats` gives status breakdowns (ALS: 919 trials);
`_by_location` does radius search; the metadata/enums/field tools make the API
self-documenting. Database: 601k studies.

## cms — CMS Provider Data (4 tools)

- ❌→✅ **The whole module was broken**: every datastore query returned empty. The
  DKAN metastore stopped honoring `show-reference-ids=` (empty value), so the
  distribution-UUID resolution produced "" and every query short-circuited to [].
  The smoke suite never caught it because empty responses aren't errors. Fixed by
  querying `/datastore/query/{datasetId}/0` directly (no resolution step at all).
- ✅ All 4 tools now verified with data: hospital infections by state, nursing home
  quality, dialysis facilities via cms_query, cms_search.

## college-scorecard — Dept. of Education (4 tools)

- ✅ All 4 verified: search, compare (name→id resolution works), top rankings,
  advanced query (range filters + sort verified: 34 sub-10%-admission schools).
- ⚠️ `scorecard_query` filters are **semicolon**-separated; a comma-separated
  string doesn't error — the API silently misparses it and returns wrong results.
  The description documents the format; callers must heed it.
## congress — Congress.gov (32 tools)

Representative probe of every endpoint family (all 32 pass the smoke suite):
- ❌→✅ `congress_crs_reports` returned only titles — the API's field is `id`
  (e.g. IF12513), not `reportNumber`, so the report number needed by
  `congress_crs_report_details` was missing. Fixed; the pair now chains.
- ❌→✅ `congress_congressional_record` returned rows of empty objects — the
  endpoint answers in PascalCase (`Issue`, `Volume`, `PublishDate`, `Links`).
  Fixed; issues now include the full-record PDF URL.
- ⚠️ `congress_search_bills` `query` only title-matches the ~250 most recently
  updated bills (the API has no text search). Description now says so and the
  empty result points to `govinfo_search` for real full-text search.
- ✅ Verified live: recent laws, senate votes (voter-ID cloture rejected Aug 2026),
  house votes, nominations, treaties, committees, member search + details.
- ⚠️ `congress_committee_bills` returns oldest-first (upstream provides no sort).

## doj-news — DOJ Newsroom (4 tools)

- ✅ All 4: title filter verified (269 antitrust releases), blog entries, both
  detail tools (fetch full text by UUID).

## dol — Dept. of Labor (7 tools) 🔑

- 🔑 All 7 blocked on `DOL_API_KEY`; the missing-key error is clean and names
  the env var. Not verifiable live until a key arrives.

## eia — Energy Information Administration (5 tools)

- ❌→✅ `eia_petroleum` was returning the wrong data for everything: "crude" set
  an invalid facet (`product=EPCWTI` — the spot route's facet is `series`), which
  EIA ignored, returning an arbitrary spot series (Gulf Coast gasoline $/GAL).
  Now: crude/wti→RWTC, brent→RBRTE, plus jet/propane/heating_oil; raw series ids
  pass through.
- ❌→✅ `eia_natural_gas` `process` was uppercased and sent as a facet code —
  "RESIDENTIAL" matches nothing (codes are PRS/PCS/PG1/…). Friendly names now map
  to codes.
- ✅ `eia_electricity` (HI residential = 52.7¢/kWh!), `eia_state_energy`, `eia_total_energy`.
## epa — EPA ECHO/Envirofacts (8 tools)

- ✅ All 8 verified: facilities (major_only works), UV index (city/state), TRI
  (county filter works), GHG, drinking water, Superfund, facility detail.
- ❌→✅ `epa_enforcement` state filter never worked (fixed earlier this audit:
  ECHO's case service wants `p_state`, not `p_st`).

## epa-aqs — EPA Air Quality System (3 tools) 🔑

- 🔑 Blocked on `AQS_API_KEY` + `AQS_EMAIL`. AQS reports missing credentials as
  HTTP 400, so the shared client's missing-key hint now covers 400s too.

## fbi — FBI Crime Data Explorer (8 tools)

- ✅ 7 verified: agencies, summarized crime, arrests, hate crime, LESDC,
  expanded homicide, LE employees.
- ⚠️ Responses are the CDE's raw period-keyed maps ("01-2020": 0.53…) — complete
  but shaped for their charts, not for reading. `fbi_lesdc` returns chart JSON
  as a string inside one cell.
- ❌ `fbi_use_of_force` — endpoint removed upstream (known failure since 2026-09-01).

## fda — openFDA (25 tools)

- ✅ All 25 pass the smoke suite; spot-checked devices, food recalls, shortages,
  counts with novel queries.
- ❌→✅ openFDA reports zero matches as **HTTP 404 NOT_FOUND** — every tool threw
  an error instead of returning an empty result. Now a clean empty.
- ⚠️ FAERS `openfda.*` fields are only populated when openFDA matched the drug;
  newer drugs (semaglutide) need `patient.drug.activesubstance.activesubstancename`
  (uppercase). Documented in the tool description.

## fdic — FDIC BankFind (6 tools)

- ✅ All 6 verified live on the new host (api.fdic.gov — migrated earlier this
  audit after banks.data.fdic.gov started 301ing). Bank-failure history includes
  July 2026 failures.

## fec — Federal Election Commission (9 tools)

- ✅ Verified: candidate search, top candidates by cycle, individual contributions.
- ⚠️ `fec_individual_contributions` name search is fuzzy upstream ("Thiel, Peter"
  matches "THIELEN, PETER" first) — check the contributor column.
- ✅ `fec_independent_expenditures` correctly refuses unfiltered queries with guidance.

## federal-register (7 tools)

- ✅ All verified: executive orders by keyword (56 tariff EOs), presidential docs
  by type, rules by agency, public inspection (pre-publication docs), suggested
  searches, agencies, document detail.

## fema — FEMA OpenFEMA (5 tools)

- ✅ All verified: declarations (state+incident filters), housing assistance,
  NFIP claims via fema_query with OData filter syntax, regions.
- Row-cap parameter is `top` (OData), not `limit`.

## fred — Federal Reserve Economic Data (8 tools)

- ✅ Heavily exercised during the parity build (v2 Bearer auth, vintages, units,
  browse). Spot-checked release_data and search this audit.
- ⚠️ `fred_search` uses FRED's API search, which is stricter than the website
  ("electric vehicle sales" → 0; simpler phrases work). Not a repo bug.

## govinfo — GovInfo (3 tools)

- ❌→✅ Collection filtering was silently ignored — the search service takes
  filters as query-string field operators (`collection:(CRPT)`), not body fields.
  `govinfo_cbo_reports` was returning presidential-debate transcripts; now
  returns committee reports. Bill-text version fallback verified earlier.

## gsa-calc — GSA CALC+ labor rates (3 tools)

- ✅ All 3: rate search with experience filters, autocomplete (100 data-science
  variants), per-contract rates.

## hud — HUD User (5 tools) 🔑

- 🔑 All blocked on `HUD_USER_TOKEN`; clean missing-key error verified.

## naep — Nation's Report Card (9 tools)

- ✅ 8 verified across scores/levels/comparisons/gaps.
- ❌→✅ `naep_available_variables` died on NAEP's **invalid JSON** (unescaped
  quotes inside survey-question labels). Added a tolerant parser that repairs
  non-terminating quotes.
- ⚠️ Some subject/year/jurisdiction combos legitimately have no data (state-level
  science exists only for certain years); empties are accurate.
