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
| CFPB | 2 | `cfpb_complaint_trends` and `cfpb_state_complaints` received HTTP 200 with HTML instead of JSON. | Unresolved. Inspect the aggregation endpoints and final response URLs; the log alone cannot distinguish routing changes from an access response. |
| EPA | 1 | `epa_facilities` lacked `AIREvalCnt` and `AIRLastFceDateEPA`; `AIRNAICSDescs` appeared. | Reproduced locally. Keep the failure until response semantics and missing-field handling are checked. |
| NOAA NCEI | 1 | `noaa_stations` returned an empty response for its smoke arguments. | Reproduced locally. Investigate the station search/filter behavior; this module is keyless, so supplying a CDO token is not the remedy. |
| CMS Open Payments | 10 | Dataset catalog requests returned HTTP 403 with an HTML Access Denied page. | Unresolved access denial from the service path. The log does not establish whether runner IP policy, service configuration, or the request caused it. Do not call it a proven SDK bug or bypass the restriction. |
| GFZ space weather | 1 | `space_weather_geomagnetic` received HTTP 500 from GFZ. | Server error observed in that run; persistent outage versus transient failure remains unconfirmed. |

The four repaired baselines were checked against repository history, regenerated only for those cases, then rerun with baseline recording disabled and a fresh cache. EPA's changed response and NOAA's empty result remain failures. The other services were diagnosed from the public nightly evidence; this report does not claim they recovered.

Failure labels now describe the observed HTTP response. A 200 response with non-JSON content is a response-format failure, not a 5xx. A 401/403 is an access denial requiring investigation, not proof of a repository bug. Rejected requests remain failures; retry budgets stay bounded.

## Reproduce the focused checks

```bash
npm ci
npm run build
npm test
XDG_CACHE_HOME="$(mktemp -d)" npm run test:live -- -t '^(bts bts_transport_stats|fdic fdic_(financials|summary)|usgs usgs_water_sites)$'
XDG_CACHE_HOME="$(mktemp -d)" npm run test:live -- -t '^(epa epa_facilities|noaa noaa_stations)$'
```

The first live command checks the repaired baselines. The second is expected to remain red based on this investigation. Both commands skip unrelated cases. A complete keyed nightly run was not repeated locally, and no API credentials were accessed or changed.
