# No-API sources: ingest status

Some federal sources publish no query API. Where a machine-readable **bulk file**
exists, fedpipe ingests it into a local database (the `shared/bulk.ts` pattern:
download → parse → SQLite → query locally). Where only PDFs or access-gated
archives exist, there is nothing clean to ingest, and we say so.

## Ingested as modules (bulk file → local SQLite)

| Module | Source | Shape | Notes |
|---|---|---|---|
| `sba` | SBA 7(a) & 504 loan FOIA CSVs (data.sba.gov) | CSV, resolved from the DKAN metastore | Auto-ingests on first query (recent-era files). |
| `eoir-immigration` | EOIR case-data FOIA release | one multi-GB ZIP of delimited tables | **Deliberate** ingest only (`ingest()`); schema-generic loader. |

Both need Node ≥ 22.5 (built-in `node:sqlite`). No API keys.

## Genuine dead-ends (no machine-readable bulk source)

These were evaluated and have **no clean bulk feed** — building an ingester would
mean scraping PDFs or clearing an access wall, which is out of scope. Documented
here so the gap is explicit, with the canonical source for manual use.

- **ATF (Bureau of Alcohol, Tobacco, Firearms and Explosives)** — the Firearms
  Commerce Report, AFMER production data, and firearms-trace summaries are
  published as **PDF** (and a few XLSX) tables only, with no CSV/JSON feed and no
  API. Source: <https://www.atf.gov/resource-center/data-statistics>. Ingesting
  would require PDF table extraction per annual report.
- **BJS (Bureau of Justice Statistics)** — corrections and victimization
  microdata (NPS, NCRP, NCVS) are distributed through **ICPSR/NACJD**, which
  gates downloads behind an account/agreement; the public "analysis tools" (CSAT,
  NCVS dashboards) expose no bulk endpoint. Source:
  <https://bjs.ojp.gov/> and <https://www.icpsr.umich.edu/web/pages/NACJD/>.
  Aggregate crime counts are already covered live by the `fbi` module (UCR/NIBRS).

If either later publishes a CSV/ZIP feed, it becomes a straightforward `bulk.ts`
module like `sba`.
