/**
 * IRS Exempt Organizations Business Master File module (bulk-ingest — see sdk.ts).
 *
 * Source: https://www.irs.gov/charities-non-profits/exempt-organizations-business-master-file-extract-eo-bmf
 */

import type { ApiModule } from "../../shared/types.js";
import meta from "./meta.js";
import { tools } from "./tools.js";
import { clearCache } from "./sdk.js";

export default { ...meta, tools, clearCache } satisfies ApiModule;
