/**
 * bjs module metadata.
 */

import { NACJD_PAGE } from "./sdk.js";
import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "bjs",
  displayName: "Bureau of Justice Statistics (bulk ingest)",
  category: "Justice",
  description:
    "Bureau of Justice Statistics data — corrections (National Prisoner Statistics, NCRP), victimization (NCVS), and " +
    "Federal Justice Statistics. BJS publishes no query API; its datasets are downloadable or ICPSR/NACJD-gated " +
    "delimited files. This module ingests any such extract you point it at and answers queries locally. Complements " +
    "the fbi module (UCR/NIBRS crime counts) with corrections and victimization.",
  workflow:
    `Obtain a BJS/NACJD extract URL (${NACJD_PAGE}), then ingest once (deliberate): import { ingest } from the bjs SDK ` +
    "and call ingest('<url>'). Then bjs_dataset_info for the columns and bjs_data(filters={...}) to query.",
  tips:
    "No API key, but needs Node >= 22.5 and a deliberate ingest of a delimited extract (some BJS data requires an " +
    "ICPSR/NACJD access agreement to download). The loader is schema-generic and sniffs the delimiter, so exact " +
    "columns are confirmed on first ingest. For aggregate crime counts use the fbi module.",
  domains: ["justice"],
  crossRef: [
    { question: "courts/litigation", route: "bjs_data (corrections / victimization / federal-justice statistics)" },
  ],
  reference: {
    docs: { "BJS": "https://bjs.ojp.gov/", "NACJD (ICPSR)": "https://www.icpsr.umich.edu/web/pages/NACJD/" },
  },
} satisfies ModuleMeta;
