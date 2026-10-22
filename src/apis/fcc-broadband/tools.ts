/**
 * fcc-broadband MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getAsOfDates, listAvailabilityData } from "./sdk.js";
import { tableResponse, listResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "fcc_broadband_asof_dates",
    description:
      "List the available data vintages ('as-of dates') for the FCC National Broadband Map — each is a snapshot of " +
      "fixed/mobile broadband availability you can then enumerate with fcc_broadband_datasets.\n\n" +
      "Requires FCC_BDC_USERNAME + FCC_BDC_TOKEN (free).",
    annotations: { title: "FCC Broadband: Data Vintages", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const dates = await getAsOfDates();
      if (!dates.length) return emptyResponse("No as-of dates returned.");
      return listResponse(`FCC BDC: ${dates.length} data vintage(s)`, {
        items: dates, total: dates.length, meta: { source: "FCC Broadband Data Collection" },
      });
    },
  },

  {
    name: "fcc_broadband_datasets",
    description:
      "List the downloadable broadband-availability datasets published for one as-of date of the FCC National " +
      "Broadband Map — by provider, technology, and geography type. Optionally filter by category/subcategory.\n\n" +
      "Requires FCC_BDC_USERNAME + FCC_BDC_TOKEN (free).",
    annotations: { title: "FCC Broadband: Availability Datasets", readOnlyHint: true },
    parameters: z.object({
      as_of_date: z.string().describe("Data vintage, e.g. '2024-06-30' (from fcc_broadband_asof_dates)."),
      category: z.string().optional().describe("Filter by category, e.g. 'Nationwide', 'State'."),
      subcategory: z.string().optional().describe("Filter by subcategory, e.g. 'Fixed Broadband', 'Mobile Broadband'."),
    }),
    execute: async ({ as_of_date, category, subcategory }) => {
      const rows = await listAvailabilityData({ asOfDate: as_of_date, category, subcategory });
      if (!rows.length) return emptyResponse(`No availability datasets for ${as_of_date}.`);
      return tableResponse(`FCC BDC availability datasets — ${as_of_date}: ${rows.length}`, {
        rows, meta: { source: "FCC Broadband Data Collection" },
      });
    },
  },
];
