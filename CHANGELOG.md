# Changelog

## Unreleased — first fedpipe release

fedpipe's independent continuation of `lzinga/us-gov-open-data-mcp` (see
Credits in the README). Everything below is on top of upstream v2026.6.10.

### Added
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
