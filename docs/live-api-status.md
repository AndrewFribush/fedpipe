# Live API status: October 3, 2026

This report is a dated investigation of [nightly run 37120539053](https://github.com/AndrewFribush/fedpipe/actions/runs/37120539053), based on its public `live-results-37120539053` artifact and job log. It is not a current availability guarantee. The workflow badge in the README links to newer runs.

## What ran

Vitest reported 500 normal passes, one expected failure, 19 failures, and 62 skips across 582 tests. That includes 188 argument-coverage checks. Removing those checks leaves 394 tool and resolver cases: 312 normal passes, one expected failure, 19 failures, and 62 skips. The JSON reporter counts the expected failure as a pass; the summary script reports it separately.

Seven bulk-ingest modules are excluded from nightly request checks: `form5500`, `faa`, `exempt-orgs`, `ntsb`, `ofac`, `orange-book`, and `opm`. Modules missing keys were BEA, CourtListener, DOL, EPA AQS, HUD, USDA NASS, and USPTO. These skips do not establish connectivity or correctness. BLS and FDA can run with reduced keyless access; service quotas still apply.

The recorded expected failure is `fbi_use_of_force`. The [exception file](../tests/live/known-upstream-failures.json) records the removed endpoint and runs the case with `it.fails`, so unexpected recovery fails the test and prompts removal of the exception. No new expected failures were added during this investigation.

## Failure evidence and disposition

| Source | Failed cases | Evidence | Disposition |
|---|---:|---|---|
| BTS | 1 | `bts_transport_stats` baseline expected 66 per-state capital-expenditure columns that the tool deliberately removes. | Refreshed this baseline after a successful live query. The projection is documented in [`32dc277`](https://github.com/AndrewFribush/fedpipe/commit/32dc277). |
| FDIC | 2 | `fdic_financials` and `fdic_summary` baselines expected broad schemas despite explicit compact default field lists. | Refreshed these two baselines after live queries. The field selection is documented in [`451f75a`](https://github.com/AndrewFribush/fedpipe/commit/451f75a). |
| USGS | 1 | `usgs_water_sites` baseline expected raw RDB column names; the tool returns ten projected names. | Refreshed after a live query. The projection is documented in [`32dc277`](https://github.com/AndrewFribush/fedpipe/commit/32dc277). |
| CFPB | 2 | Upstream [removed the trends and geographic routes](https://github.com/cfpb/ccdb5-api/commit/1bec7b597b9e8b943aee5d5a5e5cf1085461f472); they now return HTML. | Replaced them with supported search aggregations and exact calendar counts. Both tools pass fresh local checks. |
| EPA | 1 | `epa_facilities` lacked `AIREvalCnt` and `AIRLastFceDateEPA`; `AIRNAICSDescs` appeared. | Fresh data contained null counts and omitted the optional date. The response formatter intentionally drops all-null columns. Updated this case's baseline after checking raw data and consumers; the live check passes. |
| NOAA NCEI | 1 | `noaa_stations` returned an empty response for its smoke arguments. | The smoke test supplied no location, so the tool intentionally made no request. Added a Vermont station query; all three NOAA tools pass fresh local checks. |
| CMS Open Payments | 10 | Dataset catalog requests returned HTTP 403 with an HTML Access Denied page. | All ten tools pass locally with a fresh cache. Updated search/top baselines to the existing ten-field projection and added response-contract tests. The earlier runner-specific access denial still needs a new GitHub run; no access bypass or exception was added. |
| GFZ space weather | 1 | `space_weather_geomagnetic` received HTTP 500 from GFZ. | Default timestamps were expanded twice; GFZ also rejects fractional seconds. Corrected whole-second UTC formatting, covered it with regression tests, and passed a fresh live check. |

Only baselines with explained response changes were updated. Fresh checks ran with baseline recording disabled. No expected-failure or skip rule was added, and no credential was accessed or changed. Local CMS success does not establish that GitHub-hosted runners can reach the catalog.

CFPB trends now query the search API once per calendar interval. The default covers twelve calendar months, including the partial ending month; explicit date bounds are inclusive, with at most sixty intervals. Results state coverage and omitted series counts. Product/sub-product and issue/sub-issue drilldowns remain available; unsupported cross-lens drilldowns fail explicitly. Counts preserve exact filters and reject truncated or partial responses. Queries run sequentially and can take several minutes for longer series. The state tool returns a table of state/territory codes and complaint counts and also rejects incomplete aggregations.

Failure labels now describe the observed HTTP response. A 200 response with non-JSON content is a response-format failure, not a 5xx. A 401/403 is an access denial requiring investigation, not proof of a repository bug. Rejected requests remain failures; retry budgets stay bounded.

## Reproduce the focused checks

```bash
npm ci
npm run build
npm test
XDG_CACHE_HOME="$(mktemp -d)" npm run test:live -- -t '^(bts bts_transport_stats|fdic fdic_(financials|summary)|usgs usgs_water_sites)$'
XDG_CACHE_HOME="$(mktemp -d)" npm run test:live -- -t '^(open-payments |cfpb cfpb_(complaint_trends|state_complaints)$|epa epa_facilities$|noaa noaa_|space-weather space_weather_geomagnetic$)'
```

The first live command checks the four earlier baseline repairs. The second checks the remaining affected providers, including all NOAA and CMS tools: seventeen cases passed locally in focused runs. Both commands exclude unrelated cases. A complete keyed nightly run was not repeated locally. To verify the GitHub runner after the fix is published, dispatch the live workflow with `refresh_docs=false`, which leaves the scheduled documentation-writing step disabled.
