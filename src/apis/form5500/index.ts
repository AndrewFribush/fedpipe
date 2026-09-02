/**
 * DOL Form 5500 module (bulk-ingest — see sdk.ts).
 *
 * Datasets: https://www.dol.gov/agencies/ebsa/researchers/data/form-5500-datasets
 */

import type { ApiModule } from "../../shared/types.js";
import meta from "./meta.js";
import { tools } from "./tools.js";
import { clearCache } from "./sdk.js";

export default { ...meta, tools, clearCache } satisfies ApiModule;
