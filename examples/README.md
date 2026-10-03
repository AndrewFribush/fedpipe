# Hurricane Ian: declaration, notices, and contracts

Run `node examples/hurricane-ian.mjs` from the repository root after `npm ci` and `npm run build`. The script uses three public APIs without keys: FEMA's OpenFEMA, the Office of the Federal Register's document search, and Treasury's USAspending. It queries fresh responses in a temporary cache and writes JSON to stdout. Network errors and unexpected empty results exit nonzero.

## Recorded run

The [October 3, 2026 output](hurricane-ian.2026-10-03.json) was fetched at approximately 21:20 UTC using SDK code from [`66a8b87`](https://github.com/AndrewFribush/fedpipe/tree/66a8b87). All three HTTP responses were 200. The output includes the request URLs, POST body, fetch times, and SHA-256 hashes of the decoded response bodies. Hashes identify the retrieved payloads; later revisions or response metadata can change them even if the selected results stay the same.

| Query | Observed result |
|---|---|
| OpenFEMA disaster 4673, Florida | Hurricane Ian, declared September 29, 2022; 69 designated areas: 67 county areas and two other areas |
| Federal Register `FEMA-4673-DR`, September 2022 through December 2023 | 16 matching notices; the three most recently published are returned |
| USAspending DHS contracts, Florida, `Hurricane Ian`, same date window | Three largest matching awards shown; more matches exist |

The returned cumulative award values were $115,969,886.24 for Fluor Federal Services, $19,888,784.67 for American Medical Response, and $2,517,235.01 for Vanguard Inspection Services. The Fluor description explicitly covers both Ian and Nicole. Those amounts must not be summed or labeled as the cost of Hurricane Ian. They are current values of matching awards, which can change after the selected dates; a time filter does not turn an award value into spending during that period.

## What the links establish

The disaster number joins the declaration to the notices. The USAspending query uses keywords, agency, geography, and dates, so it supplies candidate contracts to inspect. It does not establish a complete disaster-specific contract set. FEMA rows identify designated areas rather than separate disasters or households served.

The SDK currently omits USAspending award IDs in its normalized `Award` result. The example preserves the actual API request and a response hash, but individual award identifiers require inspecting the original API response.
