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
