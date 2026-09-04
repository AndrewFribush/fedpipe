/**
 * atf module metadata.
 */

import { FFL_LISTING_PAGE } from "./sdk.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "atf",
  displayName: "ATF Firearms Data (bulk ingest)",
  category: "Justice",
  description:
    "Bureau of Alcohol, Tobacco, Firearms and Explosives data published as files rather than an API — chiefly the " +
    "monthly Listing of Federal Firearms Licensees (FFLs): every licensed firearms dealer, manufacturer, and " +
    "importer, by license type and location. ATF serves rotating, CDN-protected files, so ingestion is deliberate " +
    "and URL-driven: point ingest() at the current file and query it locally.",
  workflow:
    `Ingest once (deliberate): import { ingest } from the atf SDK and call ingest('<file url from ${FFL_LISTING_PAGE}>'). ` +
    "Then atf_dataset_info for the columns and atf_ffls(filters={...}) to query (e.g. by state or license type).",
  tips:
    "No API key, but needs Node >= 22.5 and a deliberate ingest of the current ATF file (the site blocks scripted " +
    "fetches and rotates URLs monthly). The loader is schema-generic and sniffs the delimiter, so exact columns are " +
    "confirmed on first ingest (see atf_dataset_info). License type 01 = dealer, 07 = manufacturer, 08 = importer.",
  domains: ["justice", "safety"],
  crossRef: [
    { question: "state-level", route: "atf_ffls (federal firearms licensees by state/type)" },
  ],
  reference: {
    docs: {
      "ATF FFL listings": "https://www.atf.gov/firearms/listing-federal-firearms-licensees",
      "ATF data & statistics": "https://www.atf.gov/resource-center/data-statistics",
    },
  },
} satisfies ModuleMeta;
