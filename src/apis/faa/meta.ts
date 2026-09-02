/**
 * FAA Aircraft Registry module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "faa",
  displayName: "FAA Aircraft Registry",
  category: "Transportation",
  description:
    "FAA Releasable Aircraft Database — every U.S.-registered civil aircraft (~316K) with its N-number (tail number), owner name and location, make/model/year, registrant type (individual/corp/LLC/government), and Mode S transponder code. NOTE: this is a BULK-INGEST module — the first query downloads the FAA's ~80MB dataset and indexes it into a local SQLite database (~1-2 min once), then serves fast local queries. Requires Node >= 22.5. No API key.",
  workflow:
    "faa_aircraft with an N-number for one aircraft's owner and make/model -> faa_owner_fleet with an owner/company name for its whole fleet. Join to resolve_entity: a company's aircraft appear here under its legal name.",
  tips:
    "First call triggers a one-time ~1-2min download+index; later calls are instant. Owner names are UPPERCASE as filed. N-numbers accepted with or without the leading 'N'. This is the current-registration MASTER file joined to the make/model reference; deregistered aircraft (DEREG.txt) and dealer/reserved records are separate files not yet ingested. Aircraft asset values are not in this dataset.",
  domains: ["transportation", "safety"],
  crossRef: [
    { question: "corporate structure/ownership", route: "faa_owner_fleet(name) — a company's registered aircraft, complementing resolve_entity" },
    { question: "vehicle safety", route: "faa_aircraft(n_number) for registration + make/model; pair with NTSB/NHTSA for incidents" },
  ],
  reference: {
    docs: {
      "Releasable database": "https://www.faa.gov/licenses_certificates/aircraft_certification/aircraft_registry/releasable_aircraft_download",
      "Field layout (ardata.pdf)": "https://registry.faa.gov/database/ReleasableAircraft.zip",
    },
  },
} satisfies ModuleMeta;
