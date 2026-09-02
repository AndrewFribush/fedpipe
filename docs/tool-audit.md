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
## nhtsa (11 tools)

- ❌→✅ `nhtsa_recalls`/`nhtsa_complaints` required NHTSA's exact registry model
  spelling ("CYBERTRUCK (ALL VARIANTS)") — 400 with a success-shaped body for
  anything else. Both now fuzzy-resolve model names via the official model list
  (fixed earlier this audit). Rest verified in smoke suite.

## nih — NIH RePORTER (4 tools)

- ✅ All 4: project search with state/year filters, publications, spending by
  category, projects by agency.
- ⚠️ `nih_projects_by_agency` takes ~25s (aggregates 61k projects via paged calls).
- ⚠️ `nih_spending_by_category` silently returns zeros for an unknown category_id —
  find valid ids in the RCDC list (module reference).

## noaa — NOAA Climate (4 tools) 🔑 / usda-nass (4 tools) 🔑 / uspto (10 tools) 🔑

- 🔑 All blocked on their keys (`NOAA_API_KEY`, `USDA_NASS_API_KEY`, `USPTO_API_KEY`);
  each verified to fail with the clean missing-key error.

## nrel (3 tools)

- ✅ All 3 verified live on the new developer.nlr.gov domain (agency rebrand,
  migrated earlier this audit).

## nws — National Weather Service (10 tools)

- ✅ All verified (Juneau end-to-end: point → forecast → stations → latest obs).

## open-payments — CMS Open Payments (10 tools)

- ✅ Verified: top doctors by state/year aggregation, by-company rollups, national
  summary. Unfiltered searches are guarded (the 14M-row dataset times out otherwise).

## regulations — Regulations.gov (5 tools)

- ❌→✅ The API rejects `pageSize < 5`; the schema allowed smaller values, so
  callers got a raw HTTP 400. Now clamped to the API minimum.
- ✅ Document/comment/docket search verified with filters.

## sec — SEC EDGAR (9 tools)

- ✅ Ticker→CIK works everywhere (COST revenue by concept verified).
- ⚠️ `sec_filing_search` (EDGAR full-text) 500s intermittently on cold queries —
  upstream flakiness; the client retries 5xx and the same query succeeds warm.
  Totals cap at 10,000 (Elasticsearch limit).

## senate-lobbying (5 tools)

- ✅ Verified: filings by client (OpenAI), contributions by contributor,
  lobbyist name search (12 Podestas).

## treasury / usaspending / usda-fooddata / usgs / world-bank

- ✅ treasury (4): dataset search, endpoint field discovery, filtered queries
  (debt > $40T first crossed 2026-08-18).
- ✅ usaspending (7+): keyword+award-type search, recipient rollups (awardType
  mixing 422 fixed pre-audit).
- ✅ usda-fooddata (3): search (branded+survey foods), nutrient detail.
- ✅ usgs (7): earthquakes (params verified strict), realtime water data;
  `usgs_water_statistics` hit an upstream 503 during audit (passes in the nightly).
- ✅ world-bank (8+): country-name resolution incl. aggregates, indicator search
  ranking, Argentina inflation spot-check (219.9% in 2024 — yikes).

---

**Audit outcome:** 352 tools across 42 modules. 305 verified live-good after
fixes; 45 blocked on 7 missing API keys (bea 13, uspto 10, dol 7, hud 5, noaa 4,
usda-nass 4, epa-aqs 3 — clean errors verified for all); 1 dead upstream
(fbi_use_of_force); 1 upstream-flaky (sec_filing_search cold queries).
**14 defects found and fixed during the audit** (cms module fully broken, eia
returning wrong commodities, govinfo filter ignored, epa state filter ignored,
openFDA 404s, NAEP invalid JSON, CDC state-name mismatches, cfpb suggest shape,
census search, congress field mappings, nhtsa model names, regulations page
minimum, silent unknown-parameter stripping, BEA keyless crash).

---

## Overnight battle-hardening addendum (2026-09-02, 01:30–08:00)

Work done after the initial audit, in roughly the order it landed:

**Suite hardening**
- Silent-empty guard: every tool's canned args must return data unless on a
  justified ALLOWED_EMPTY list. First run caught 10 silently-empty tools —
  1 real bug (congress committee-report list endpoints use the key `reports`,
  the sdk read the detail endpoint's `committeeReports`) and 9 stale canned
  args (wrong congress number on the BILL constant, an NCT with no results, a
  fake VIN, an expired GSA contract, an unindexed 2-minute FEC scan…).
- Upstream-transient retries budgeted to fit the 90s test timeout (a slow-
  walled FBI CDE was surfacing as a bare vitest timeout).

**Input hardening (all 353 tools)**
- Single quotes escaped in every SoQL/OData interpolation (cdc/fema/bts) —
  "Coeur d'Alene" no longer 400s.
- Argument normalization at the server: strings trimmed, numeric strings
  coerced for number params, "true"/"false" for booleans.
- Strict schemas' unknown-key rejections (from the previous session) now unit-tested.

**Output hardening**
- 120KB output cap wrapping every tool: string leaves truncate first, then
  the largest arrays shrink — always valid JSON with a note saying what was
  trimmed. cfpb trends/state tools digest raw Elasticsearch payloads
  (231KB → 13KB). FBI CDE chart maps digest into sorted {period, value} series.
- cdc_mortality_rates gained a state param projecting the ~50 `rate_<state>`
  columns down to one.

**Infrastructure**
- Persisted-cache entries capped at 2MB (cache.json 81MB → 21MB, load 276ms → 77ms).
- SEC's three clients now share the 10 req/s fair-access budget (was 30/s worst case).
- `fedpipe doctor` / `doctor --live` health-check CLI.
- Nightly CI refreshes the upstream doc mirror with auto-commit; after the
  first run deleted 49 pages (runner IP bot-blocked SEC/BLS/NHTSA/FRED),
  pruning is now conservative: only HTTP 404/410 or a removed link deletes.
- Doc-rot unit test: tool names referenced in metadata/prompts must exist.

**Features (parity still-open list closed)**
- census_resolve_geography: ZIP→ZCTA and county-subdivision (township) levels.
- sec_insider_transactions: Forms 3/5 (holdings parse as code "H" rows).
- sec_concept_search: keyword search over a company's actual XBRL concepts.
- sec_company_financials: CAGR over the annual series.
- Census methodology tips (MOE variables, 1yr vs 5yr, overlapping windows).
- SEC segment data documented as infeasible via public JSON APIs.

End state: 353 tools, 1055 unit tests, 480 live tests passing (+1 expected
fail, 46 key-gated), doctor --live green on 32 modules.

**Early-morning round (05:45–07:00):**
- Exotic-input probes found an ugly bug class: input that normalizes to an
  empty string makes `.includes("")` match everything. World Bank resolved
  "США" (Cyrillic) to **Cuba** (shortest country name); census resolved
  "北京" to "Parish village, New York". Both resolvers now bail to their
  no-match hints; the class was swept across all resolvers (nhtsa's empty
  model string also guarded).
- Argument normalization now strips zero-width characters ("Harv\u200bard"
  finds Harvard) and clamps negative pagination params.
- All 55 MCP prompts verified to render via prompts/get with correct tool
  references and argument interpolation.
- 43 MCP resources (was 1): every module's reference data is browsable at
  `govdata://reference/<module>`.
- Final cold-cache verification: 480 live + 1 expected fail, 1057 unit.

**Second overnight round (03:00–07:00 CDT):**
- New data: QCEW county/industry wages (bls_county_wages, bls_industry_wages —
  keyless CSV API, quarterly+annual layouts normalized); electricity
  generation by fuel on eia_electricity (TX wind: 129 TWh in 2025);
  sec_concept_search, Forms 3/5 holdings, CAGR; ZIP→ZCTA and township
  resolution in census.
- Bug class hunted to extinction: empty-needle matching ("США"→Cuba,
  "北京"→Parish village NY) guarded in every resolver.
- The strengthened silent-empty guard (all-empty rows = field-mapping bug)
  caught congress_committee_report_text (fields nested in formats[]) and
  usa_spending_over_time (tool asked the envelope for raw API keys the sdk
  had renamed — 37 periods of empty rows had passed every previous check).
- fred_release_data cursor pagination (FRED's param is next_cursor — 'cursor'
  is silently ignored); nws_glossary term filter; code_mode did-you-mean;
  doctor --fresh.
- Schema-drift baselines recorded for 308 tools ([SCHEMA DRIFT] on column
  changes); troubleshooting guide; CI doc-mirror scoped to nightly with a
  refresh_docs opt-in; doctor --live in the CI job summary.

Final tally: **42 modules, 355 tools, 1057 unit tests, 484 live tests**
(1 expected upstream failure, 46 key-gated), docs site green, package
verified from the tarball, four consecutive green CI validations.

**Final sweep (04:30–05:00 CDT):** every structured-string filter parameter
audited for silent-misparse (census predicates, scorecard/FDIC filters now
error loudly with correct syntax; FEMA/Treasury verified loud upstream); the
one call-style example embedded in a tool description was factually wrong
(wrong FEC cycle — corrected and verified live); and all 24 FRED series / World
Bank indicator IDs recommended by the routing guidance were validated against
the live sources — all current.

**Late shift (05:00–06:00 CDT) — shared-infrastructure hardening:**
- Dependencies: 8 vulnerabilities patched (axios/form-data/fast-uri high) — npm audit now clean.
- **The disk cache never persisted for short sessions** (flush timer died with
  the process — desktop clients making a few calls warmed nothing, ever) and
  concurrent clients clobbered each other's cache file. Now: synchronous
  exit-flush, per-entry merge-on-write, atomic temp+rename writes.
- **Stalled response bodies hung tool calls forever** (the fetch abort stops
  at headers) — body reads now race a deadline; and bodies stream-read
  against a 64MB budget so a runaway upstream can't exhaust memory. Both
  proved with hostile mock servers and locked in as unit tests.
- CLI: --version/--help added; keyless-capable modules no longer warned
  "tools will fail"; doctor pipes plain text; code_mode timeouts read like
  English. All 55 prompts render-tested (0 failures) + county_economy added
  and its workflow executed end-to-end (Deschutes: 93,866 jobs, $66,229 avg
  pay +6.1%). Nightly also now replays the offline suite on the warmed cache.

**Dawn find (06:40):** EDGAR full-text search silently ignores a lone date
bound — "filings since X" without an end date returned the entire corpus back
to 2018. Missing bounds now default (endDate→today, startDate→2001 FTS epoch);
verified congress/cfpb handle lone bounds correctly, so the quirk was
EFTS-specific.

**Quota-burn sprint (post-8am):** shipped the step-4 roadmap layer — three
cross-agency resolvers (`resolve_entity`: 6 sources incl. Open Payments +
FAERS for pharma; `resolve_person`: FEC identity/fundraising joined to
BioGuide via state-delegation matching; `resolve_place`: Census + ACS
demographics + QCEW area + FEMA history), each returning ready-to-run
follow-up calls, each verified live incl. absence/garbage cases, plus
nightly join tests. Building them surfaced and fixed a real FEC bug: the
financials tools could report a stale cycle as "latest" (rows aren't
date-ordered and several filing entities share coverage windows — summaries
now sort explicitly and disclose multi-filing coverage). find_tools indexes
the server-level tools; company_full_profile prompt added. 358 tools.

**Coverage expansion (2026-09-02, later):** three new modules, each live-verified.
- ✅ **gleif** (3 tools) — Global LEI registry, keyless. `gleif_search` (Boeing →
  LEI RVHJWBXLJ1RFUBSY1F30), `gleif_record`, `gleif_ownership`. A 404 on
  parent lookups is GLEIF's way of saying "no parent reported" — mapped to a
  clean absence, not an error. The LEI is the canonical entity-resolution join key.
- ✅ **courtlistener** (3 tools) — Free Law Project. `courts_search` (opinions
  type='o' and RECAP/PACER dockets type='d') is keyless and verified (2,220 hits
  for "737 MAX", 1,291 OpenAI dockets); `courts_opinion` and `courts_docket`
  need a free `COURTLISTENER_API_TOKEN` and return a clean name-the-env-var
  error without one. Module is skip-gated on the token in tokenless CI.
- ✅ **nonprofits** (2 tools) — IRS Form 990 via ProPublica Nonprofit Explorer,
  keyless. `nonprofits_search` → EIN, `nonprofit_financials` (Red Cross FY2023:
  $3.2B revenue, $4.0B assets). 990-N postcard filers have no financial extract
  (stated honestly in the summary). 366 tools across 45 modules.

**Lazy loading (`--lazy`, opt-in):** starts with 7 discovery tools; `load_modules`
registers the rest mid-session. Found a FastMCP limitation while testing: a stdio
session is registered asynchronously after the initialize handshake, so tools
added in the first moment of a session can miss the `tools/list_changed`
delivery. Invisible at human speed, but real — so lazy is opt-in, not the default.

**Keys arrived (2026-09-02, later still):** USPTO, BLS, CourtListener tokens
added and their modules audited live for the first time.
- ✅ **uspto** (10 tools) — search (191K "machine learning" applications), the
  four application-detail tools, PTAB proceedings, PTAB decisions, petition
  decisions all verified. ❌→✅ **Two real bugs, live-only:** `uspto_ptab_decisions`
  read `patentTrialDecisionDataBag` (API returns `patentTrialDocumentDataBag`) and
  `uspto_petition_decisions` read `petitionDecisionBag` (API returns
  `petitionDecisionDataBag`) — both silently returned empty for every query.
  Fixed; now 19,838 and 7,489 results respectively. Both added to live-smoke args
  as regression guards.
- ✅ **bls** — key raises the 25/day keyless cap; CPI breakdown verified.
- ✅ **courtlistener** — token unlocks `courts_opinion` (read a 20K-char opinion)
  and `courts_docket`.
- ⏳ **bea** (13 tools) — key added and activated on BEA's site ("Your key has
  been activated!"), but BEA's data endpoint lags activation propagation; audit
  pending the key going live. 43/45 modules now have working keys; DOL, HUD,
  NOAA, USDA NASS, AQS still unclaimed.
