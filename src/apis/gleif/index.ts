/**
 * GLEIF (Global Legal Entity Identifier Foundation) module.
 *
 * API: https://api.gleif.org/api/v1
 * Docs: https://www.gleif.org/en/lei-data/gleif-api
 */

import type { ApiModule } from "../../shared/types.js";
import meta from "./meta.js";
import { tools } from "./tools.js";
import { clearCache } from "./sdk.js";

export default { ...meta, tools, clearCache } satisfies ApiModule;
