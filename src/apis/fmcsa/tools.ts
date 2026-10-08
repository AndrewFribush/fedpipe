/**
 * fmcsa MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { searchCarriers, getCarrier, getCarrierSafety } from "./sdk.js";
import { tableResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "fmcsa_search_carriers",
    description:
      "Search interstate trucking/bus carriers by name in the FMCSA SAFER system. Returns each carrier's USDOT " +
      "number, legal/DBA name, location, fleet size, and safety rating. Use the USDOT number with fmcsa_carrier " +
      "or fmcsa_carrier_safety.\n\nRequires FMCSA_WEBKEY (free).",
    annotations: { title: "FMCSA: Search Carriers", readOnlyHint: true },
    parameters: z.object({
      name: z.string().describe("Carrier name (partial), e.g. 'Swift Transportation'."),
      limit: z.number().int().max(100).optional().describe("Max carriers (default 25)."),
    }),
    execute: async ({ name, limit }) => {
      const carriers = await searchCarriers(name, limit);
      if (!carriers.length) return emptyResponse(`No carriers match '${name}'.`);
      return tableResponse(`FMCSA: ${carriers.length} carrier(s) matching '${name}'`, {
        rows: carriers,
        columns: ["dotNumber", "legalName", "city", "state", "totalPowerUnits", "safetyRating"],
        meta: { source: "FMCSA QCMobile / SAFER" },
      });
    },
  },

  {
    name: "fmcsa_carrier",
    description:
      "Full SAFER company snapshot for one carrier by USDOT number — legal/DBA name, location, operation type, " +
      "fleet size (drivers, power units), safety rating, and whether it is allowed to operate.\n\n" +
      "Requires FMCSA_WEBKEY (free).",
    annotations: { title: "FMCSA: Carrier Snapshot", readOnlyHint: true },
    parameters: z.object({
      dot_number: z.union([z.number(), z.string()]).describe("USDOT number, e.g. 76830."),
    }),
    execute: async ({ dot_number }) => {
      const c = await getCarrier(dot_number);
      if (!c) return emptyResponse(`No carrier found for USDOT ${dot_number}.`);
      return recordResponse(`${c.legalName ?? "Carrier"} (USDOT ${c.dotNumber}) — ${c.state ?? "?"}`, c, {
        source: "FMCSA QCMobile / SAFER",
      });
    },
  },

  {
    name: "fmcsa_carrier_safety",
    description:
      "BASIC safety-measurement scores for one carrier by USDOT number (Unsafe Driving, Hours-of-Service, Vehicle " +
      "Maintenance, Controlled Substances, Driver Fitness, Crash Indicator) from FMCSA's Safety Measurement System.\n\n" +
      "Requires FMCSA_WEBKEY (free).",
    annotations: { title: "FMCSA: Carrier Safety (BASICs)", readOnlyHint: true },
    parameters: z.object({
      dot_number: z.union([z.number(), z.string()]).describe("USDOT number, e.g. 76830."),
    }),
    execute: async ({ dot_number }) => {
      const basics = await getCarrierSafety(dot_number);
      if (!basics.length) return emptyResponse(`No BASIC scores for USDOT ${dot_number}.`);
      return tableResponse(`FMCSA BASIC safety scores — USDOT ${dot_number}`, {
        rows: basics,
        meta: { source: "FMCSA Safety Measurement System" },
      });
    },
  },
];
