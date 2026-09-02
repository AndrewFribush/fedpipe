# Changelog

## Unreleased — first fedpipe release

fedpipe's independent continuation of `lzinga/us-gov-open-data-mcp` (see
Credits in the README). Everything below is on top of upstream v2026.6.10.

### Added
- **Lazy loading, on by default**: a bare start registers 7 discovery tools
  (the cross-agency resolvers, `find_tools`, `load_modules`, `code_mode`,
  `clear_cache`); modules register mid-session via `load_modules` with
  `tools/list_changed` notifications, so a 360+ tool surface never floods the
  client's context. `--eager` restores full up-front registration for clients
  that ignore the notification; `--modules a,b` registers exactly those,
  eagerly. `load_modules` waits for the session to register before adding
  tools, so the notification lands even on the first call of a session.
- **4 new modules**: `gleif` (Global LEI registry — entity resolution + corporate
  ownership, keyless), `courtlistener` (federal/state court opinions + RECAP/PACER
  dockets; search keyless, detail needs a free token), `nonprofits` (IRS Form 990
  financials via ProPublica Nonprofit Explorer, keyless), and `form5500` (DOL
  employee-benefit-plan filings). 46 modules total.
- **Bulk-ingest modules**: a new module shape for datasets published as bulk
  downloads rather than live APIs. `form5500` downloads DOL's ~29MB annual Form
  5500 dataset once on first use, extracts it (built-in `zlib`, no zip dep) and
  indexes it into a local SQLite database (built-in `node:sqlite`, no native dep;
  requires Node ≥ 22.5, degrades with a clear message otherwise), then serves fast
  local queries — a company's 401(k)/pension/welfare plans by sponsor EIN or name.
- **Cross-agency resolvers**: `resolve_entity` (SEC/FEC/lobbying/USAspending/
  Open Payments/FAERS), `resolve_person` (FEC identity + fundraising +
  principal committee + BioGuide), `resolve_place` (Census/ACS/QCEW/FEMA),
  each returning ready-to-run follow-up calls.
- **Live verification**: nightly CI runs every tool against the real APIs,
  with silent-empty detection, schema-drift baselines, quota/upstream/repo-bug
  failure classification, and a `doctor --live` health summary.
- **Offline replay suite** (`npm run test:offline`): full-tool regression from
  the disk cache with the network stubbed out.
- **Upstream doc mirror** (`upstream-docs/`, `npm run docs:pull`): 210+ agency
  doc pages, OpenAPI specs, and self-described schemas, refreshed nightly with
  auto-committed diffs — this is how the NREL→NLR and FDIC→api.fdic.gov
  migrations were caught.
- **`fedpipe doctor`** (`--live`, `--fresh`, `--json`): per-module key status
  and connectivity checks.
- **Hardening layer**: strict parameter schemas with did-you-mean rejections,
  argument normalization (trim, zero-width strip, numeric/boolean coercion,
  negative-pagination clamps), and a 120KB output cap that degrades gracefully.
- **New tools**: `bls_county_wages` + `bls_industry_wages` (QCEW county
  employment/wages, keyless), `sec_concept_search`, `find_tools`; electricity
  generation by fuel on `eia_electricity`; Forms 3/5 + CAGR +
  `latest:10-K` shorthand on the SEC module; ZIP→ZCTA and county-subdivision
  resolution on `census_resolve_geography`; cursor pagination on
  `fred_release_data`; `skip` pagination on all openFDA tools.
- **Deeper FRED / Census / SEC / World Bank coverage** (browse endpoints,
  vintages/units, geocoding, table search, Form 4 parsing, XBRL frames,
  country/name resolution) — see docs/parity-notes.md.
- 43 MCP resources (per-module reference data), 55 analysis prompts.

### Fixed
- Dozens of live-verified bugs across modules, including: CMS provider-data
  queries returning nothing (DKAN metastore change), EIA petroleum returning
  the wrong commodity, EPA enforcement's state filter never applying, BTS
  silently dropping 2 of every 3 months, GovInfo collection filters ignored,
  openFDA zero-matches surfacing as errors, NAEP's invalid JSON, CDC
  state-name mismatches, SEC filing-section extraction returning
  table-of-contents fragments, and the world-bank/census empty-needle
  resolution bugs. Full inventory: docs/tool-audit.md.
- SEC request rate kept under the 10 req/s fair-access ceiling; cache no
  longer persists multi-MB entries (81MB → 21MB on disk).

### Absorbed from upstream PRs
- lzinga/us-gov-open-data-mcp#14 (DOL response envelope + retry-after work).
