# No-API sources: ingest status

Some federal sources publish no query API — only bulk files. fedpipe ingests
each into a local database (the `shared/bulk.ts` pattern: download → parse →
SQLite → query locally). None of these is a dead end; where access or a URL is
needed, the module is a ready-to-run **ingest scaffold** you point at the file.

| Module | Source | Shape | Ingest |
|---|---|---|---|
| `sba` | SBA 7(a) & 504 loan FOIA CSVs (data.sba.gov) | CSV, resolved from the DKAN metastore | **Auto** on first query (recent-era files). |
| `eoir-immigration` | EOIR case-data FOIA release | ~4.5 GB **ZIP64** of delimited tables | **Deliberate** `ingest()` — disk-based, streams `A_TblCase` via python3 (macOS unzip 6.00 can't read ZIP64). Verified: 3M rows / 39 cols. |
| `atf` | ATF Federal Firearms Licensee (FFL) listings | rotating monthly delimited files | **Deliberate** `ingest(url)` — CDN blocks scripted fetch, so pass the current file URL. |
| `bjs` | BJS corrections/victimization extracts (NPS, NCRP, NCVS, FJSP) | delimited files, some ICPSR/NACJD-gated | **Deliberate** `ingest(url)` — pass the extract URL (may require ICPSR access). |

All need Node ≥ 22.5 (built-in `node:sqlite`). No API keys.

## How the deliberate ones work

The `eoir-immigration`, `atf`, and `bjs` loaders are **schema-generic**: they read
the file's own header row, sniff the delimiter (tab / pipe / comma), and build the
SQLite table from whatever columns are present — so they don't depend on a
hard-coded schema, and the exact columns are surfaced by each module's
`*_dataset_info` tool after the first ingest.

- `eoir-immigration`: `await ingest()` downloads the 4.5 GB ZIP once and streams
  the case table in via python3 (system unzip 6.00 can't read ZIP64). Large and
  slow; run it deliberately. `FEDPIPE_EOIR_MAX_ROWS` bounds the local table
  (default 3,000,000 of ~12M).
- `atf`: `await ingest('<file url from atf.gov FFL listing page>')`.
- `bjs`: `await ingest('<BJS/NACJD extract url>')`.

## Access notes (being arranged)

- **ATF** rotates its FFL file URLs monthly and blocks scripted requests at the
  CDN; grab the current URL from
  <https://www.atf.gov/firearms/listing-federal-firearms-licensees> and pass it in.
- **BJS** distributes some datasets through ICPSR/NACJD behind an access
  agreement; once you have the extract URL, ingest it. Aggregate crime counts are
  already covered live by the `fbi` module (UCR/NIBRS).
