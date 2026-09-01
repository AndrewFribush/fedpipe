# Upstream API doc mirror

Text snapshots of every agency API doc page referenced in module metadata
(`reference.docs` in `src/apis/*/meta.ts`). Regenerate with `npm run docs:pull`;
the git diff then shows what each agency changed. No fetch timestamps are
embedded — `git log upstream-docs/` is the history.

Not mirrored this run (PDF, binary, client-rendered JS app, or fetch error — read in a browser):

- `bea` — [Developer Page](https://apps.bea.gov/developers/) — client-rendered
- `bea` — [User Guide](https://apps.bea.gov/api/_pdf/bea_web_service_api_user_guide.pdf) — pdf
- `clinical-trials` — [API Migration Guide](https://clinicaltrials.gov/data-api/about-api/api-migration) — client-rendered
- `clinical-trials` — [API v2 Documentation](https://clinicaltrials.gov/data-api/api) — client-rendered
- `clinical-trials` — [ClinicalTrials.gov](https://clinicaltrials.gov/) — client-rendered
- `clinical-trials` — [Search Areas](https://clinicaltrials.gov/data-api/about-api/search-areas) — client-rendered
- `clinical-trials` — [Study Data Structure](https://clinicaltrials.gov/data-api/about-api/study-data-structure) — client-rendered
- `cms` — [Provider Data API](https://data.cms.gov/provider-data/docs) — client-rendered
- `cms` — [Provider Data Catalog](https://data.cms.gov/provider-data/) — client-rendered
- `college-scorecard` — [Data Dictionary](https://collegescorecard.ed.gov/assets/CollegeScorecardDataDictionary.xlsx) — binary (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)
- `congress` — [API Docs](https://api.congress.gov/) — client-rendered
- `congress` — [Interactive Docs](https://api.congress.gov/#/) — client-rendered
- `congress` — [Sign Up](https://api.congress.gov/sign-up/) — client-rendered
- `doj-news` — [DOJ Newsroom](https://www.justice.gov/news) — client-rendered
- `dol` — [DOL API User Guide](https://data.dol.gov/user-guide) — client-rendered
- `dol` — [DOL Open Data Portal](https://data.dol.gov/) — client-rendered
- `fbi` — [API Docs](https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/docApi) — client-rendered
- `fbi` — [Explorer](https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/crime-trend) — client-rendered
- `fec` — [Developers](https://api.open.fec.gov/developers/) — client-rendered
- `fec` — [Get Key](https://api.open.fec.gov/developers/) — client-rendered
- `fema` — [Disaster Declarations Summaries](https://www.fema.gov/openfema-data-page/disaster-declarations-summaries-v2) — HTTP 503
- `govinfo` — [API Docs (Swagger)](https://api.govinfo.gov/docs/) — client-rendered
- `gsa-calc` — [CALC+ app](https://buy.gsa.gov/pricing/) — client-rendered
- `hud` — [API Registration](https://www.huduser.gov/hudapi/public/register) — client-rendered
- `hud` — [FMR API](https://www.huduser.gov/portal/dataset/fmr-api.html) — client-rendered
- `hud` — [Income Limits API](https://www.huduser.gov/portal/dataset/il-api.html) — client-rendered
- `naep` — [NAEP Data Explorer](https://www.nationsreportcard.gov/ndecore/landing) — client-rendered
- `nih` — [NIH RePORTER](https://reporter.nih.gov/) — client-rendered
- `nrel` — [Alt Fuel Stations API](https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/) — error: ENOTFOUND
- `nrel` — [NREL Developer](https://developer.nrel.gov/) — error: ENOTFOUND
- `nrel` — [Solar Resource API](https://developer.nrel.gov/docs/solar/solar-resource-v1/) — error: ENOTFOUND
- `nrel` — [Utility Rates API](https://developer.nrel.gov/docs/electricity/utility-rates-v3/) — error: ENOTFOUND
- `open-payments` — [API Documentation](https://openpaymentsdata.cms.gov/about/api) — client-rendered
- `open-payments` — [Open Payments](https://openpaymentsdata.cms.gov/) — client-rendered
- `regulations` — [Regulations.gov](https://www.regulations.gov/) — client-rendered
- `sec` — [Full-Text Search](https://efts.sec.gov/LATEST/) — HTTP 403
- `uspto` — [API docs](https://data.uspto.gov/apis/getting-started) — client-rendered
- `uspto` — [Rate limits](https://data.uspto.gov/apis/api-rate-limits) — client-rendered
- `uspto` — [Swagger](https://data.uspto.gov/swagger/swagger.yaml) — client-rendered
