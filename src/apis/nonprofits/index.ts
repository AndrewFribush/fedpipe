/**
 * IRS Form 990 nonprofits module (via ProPublica Nonprofit Explorer).
 *
 * API: https://projects.propublica.org/nonprofits/api
 */

import type { ApiModule } from "../../shared/types.js";
import meta from "./meta.js";
import { tools } from "./tools.js";
import { clearCache } from "./sdk.js";

export default { ...meta, tools, clearCache } satisfies ApiModule;
