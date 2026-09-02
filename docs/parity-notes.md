# Feature parity notes — vs. single-source MCP servers

On 2026-09-01 we surveyed every MCP server covering the same U.S. government data sources
(19 listed at [awesome-ai-for-economists](https://github.com/hanlulong/awesome-ai-for-economists#mcp-servers-for-economic-data),
plus a search of all 34 agency GitHub orgs and the MCP registry) and hands-on evaluated the ten
that overlap with our modules. This file records what we adopted from the good ones and — per
Andrew — **everything we deliberately skipped, and why**, so it can be revisited.

Only three sources have an official agency-published MCP server: Census Bureau, World Bank (Data360),
and GovInfo (a 2-tool public preview at `https://api.govinfo.gov/mcp`). GSA-TTS runs pilot servers for
USAspending, NIH RePORTER, openFDA, ClinicalTrials.gov, and CDC PLACES (explicitly not production).
No other agency has one. Seven of our modules (BTS, HUD, NAEP, CMS Open Payments, DOJ, USGS water,
USDA NASS) have no MCP server anywhere else.

Nothing was copied from any of these repos — several are AGPL-3.0 and this project is MIT. Features
were re-implemented from the agencies' API documentation.

Upstream (`lzinga/us-gov-open-data-mcp`, v2026.6.10) landed overlapping work in parallel while this
was in progress: `getText()` on the shared client, the USGS site-search fix, the World Bank
"first 50 indicators" search fix, and SEC `sec_company_concept` / `sec_concept_across_companies`
(XBRL frames). Those upstream versions were kept; this branch's equivalents were dropped or merged
into them (ranked search on top of upstream's paged catalog fetch; ticker and peer-set support on
upstream's frames tool).

## FRED — vs. [stefanoamorelli/fred-mcp-server](https://github.com/stefanoamorelli/fred-mcp-server) (117★, active, 95 tests)

Adopted
- `fred_series_data`: `units` (pc1/pch/chg/log…), `frequency` + `aggregation_method`, `output_type`,
  `vintage_dates`, `realtime_start/end` — FRED does the math and revision history server-side.
- `fred_search`: tag filters, metadata filters, ordering, pagination.
- `fred_browse`: category tree, category series, releases, release series/dates, sources, recent updates.

Skipped
- Request coalescing of identical in-flight calls — our shared client caches to disk; duplicate
  concurrent calls within a single tool turn are rare. Cheap to add to `src/shared/client.ts` later.
- Zod validation of FRED's *response* shape — we type responses but don't validate them at runtime.
- Per-module mocked unit tests (they have 95 for FRED alone) — we rely on `npm run test:live`.
  A recorded-fixture tier would catch shape drift offline; not built yet.
- HTTP session manager with `/healthz` — we already have the `httpStream` transport; no health endpoint.

We have that they lack: bulk release fetch (`fred_release_data`), cross-source prompts, disk cache.

## Census — vs. official [uscensusbureau/us-census-bureau-data-api-mcp](https://github.com/uscensusbureau/us-census-bureau-data-api-mcp) (92★, Docker + Postgres, 243 tests)

Adopted (without the database — all from live Census endpoints, cached)
- `census_resolve_geography`: name → FIPS for states/counties/places with ready `for`/`in`/`ucgid`;
  street address → every containing geography via the Census Geocoder.
- `census_search_tables`: ranked table search over `groups.json`; table → variable listing.
- `census_datasets`: full 1,700-dataset catalog search (`data.json`).
- `census_geography_levels`: supported levels + required parents (`geography.json`).
- `census_query`: `ucgid`, `descriptive` labels, arbitrary predicates (`NAICS2017=72&…`).

Skipped
- Their seeded Postgres of geography/table metadata — replaced by cached API lookups. Trade-off:
  our first name lookup for places is a 1.4 MB fetch (then cached); theirs is a local DB. Ours needs
  no Docker.
- Their `get_population_data` prompt — our `state_profile` prompt covers the same ground.
- Sub-place geographies by name: tracts and school districts remain geocoder-only. (ZCTAs and
  county subdivisions resolve natively as of 2026-09-02.)

Also seen in [brockwebb/census-mcp-server](https://github.com/brockwebb/census-mcp-server) (broken on install as of 2026-09-01)
- "Pragmatics" / methodology guidance bundled with every response (margin-of-error thresholds,
  small-area suppression rules, temporal-comparison caveats). Skipped for now — a good idea; could
  become a `census_methodology` tool or richer `tips` in `meta.ts`.

## SEC — vs. [stefanoamorelli/sec-edgar-mcp](https://github.com/stefanoamorelli/sec-edgar-mcp) (353★, 22 tools, AGPL, 7 tests, open bug reports on ~7 tools)

Adopted
- `sec_ticker_lookup` (official ticker table); every `sec_*` tool now accepts a ticker directly.
- `sec_recent_filings` with 8-K item codes decoded to material-event categories (their `analyze_8k`).
- `sec_insider_transactions`: Form 4 XML parsing — owner, role, code, shares, price, post-holdings,
  buy/sell summary and per-insider net (their five insider tools, minus the "sentiment" heuristic).
- `sec_filing_text`: full document as text with paging, plus 10-K/10-Q section extraction
  (risk factors, MD&A, business, legal, market risk, controls) — their `get_filing_content` +
  `get_filing_sections`.
- `sec_company_financials`: year-over-year % change on annual values (their `compare_periods`).
- `sec_concept_across_companies` (upstream's XBRL frames tool) gained a `companies` peer-set filter
  and ticker resolution; `sec_company_concept` accepts tickers. sec-edgar-mcp has no frames tool.

Skipped
- `get_segment_data` (geographic / business-segment revenue) — requires parsing the dimensional
  XBRL instance document per filing; `companyfacts` doesn't carry segments. Real gap for analysts;
  the heaviest remaining item.
- `discover_xbrl_concepts` / `get_key_metrics` — partially covered: `sec_company_financials`
  without `metric` returns key metrics; with an unknown metric it lists available concepts. No
  free-text concept search yet.
- CAGR in period comparisons — only YoY implemented. Trivial to add.
- Forms 3 and 5 — `getInsiderTransactions` accepts a `forms` option, but Form 3 (initial holdings)
  uses a different XML table; only Form 4 is parsed and exposed.
- `analyze_insider_sentiment` — a filing-frequency heuristic, not analysis. Deliberately not reproduced.
- `get_recommended_tools` meta-tool — `meta.ts` `workflow` serves this purpose in our architecture.
- Docker-first install — repo already ships a Dockerfile; not documented as the primary path.

## World Bank — vs. official [worldbank/data360-mcp](https://github.com/worldbank/data360-mcp) (34★, 931 tests, HTTP-only)

Adopted
- Country name → code resolution everywhere (`Kenya`, `KEN`, `United Kingdom`, `World`);
  `wb_countries` search/filter by region and income level.
- `wb_search` now actually searches: all ~1,500 WDI indicators by default (previously only the
  first 50 were fetched), `all_sources` for the other ~19,000, and `indicator_id` for definitions.

Skipped — Data360 is a different platform (aggregates many WB databases with its own IDs and
dimensions); our module targets the classic `api.worldbank.org/v2` indicators API on purpose.
- Data360 databases and disaggregation by SEX/AGE/etc. dimensions.
- Vega-Lite chart-spec generation.
- OpenTelemetry instrumentation, prompt-injection validator, tool-contract sync tests.
- `data360://system-prompt` resource. (Our `instructions` builder plays this role server-wide.)

The community [anshumax/world_bank_mcp_server](https://github.com/anshumax/world_bank_mcp_server) is abandoned; nothing to adopt.

## Not adopted from other multi-source servers

- [datacommonsorg/agent-toolkit](https://github.com/datacommonsorg/agent-toolkit) (Google Data Commons) — a knowledge-graph
  aggregator with its own taxonomy and ingestion lag; complementary, not a substitute. Could become
  a new `data-commons` module for cross-source discovery. Needs its own `DC_API_KEY`.
- [gvaibhav/TAM-MCP-Server](https://github.com/gvaibhav/TAM-MCP-Server) — its data tools are thinner than ours; the TAM/SAM/SOM
  market-sizing calculators are not data access and were not reproduced.
- GovInfo's official MCP endpoint — our `govinfo` module calls the REST API directly with more tools
  than the 2-tool preview exposes.

## Still open (not started)

- Recorded-fixture contract tests per module (offline shape checks). (The nightly live run is in place; this would be the offline tier.)
- SEC segment data; Form 3/5; concept search; CAGR.
- Census methodology guidance. (~~ZCTA / county-subdivision name resolution~~ — done 2026-09-02.)
- Data Commons module.
