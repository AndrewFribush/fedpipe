/**
 * NTSB Aviation Accident Database module (bulk-ingest — see sdk.ts).
 *
 * Source: https://data.ntsb.gov/avdata
 */

import type { ApiModule } from "../../shared/types.js";
import meta from "./meta.js";
import { tools } from "./tools.js";
import { clearCache } from "./sdk.js";

export default { ...meta, tools, clearCache } satisfies ApiModule;
