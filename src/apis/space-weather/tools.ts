/**
 * space-weather MCP tools.
 */

import { z } from "zod";
import type { Tool } from "fastmcp";
import { getSolarCycle, getGeomagnetic, getCurrentConditions } from "./sdk.js";
import { timeseriesResponse, recordResponse, emptyResponse } from "../../shared/response.js";

export const tools: Tool<any, any>[] = [
  {
    name: "space_weather_solar_cycle",
    description:
      "Solar activity over time — monthly international sunspot number (SSN) and F10.7 cm " +
      "radio flux, the two canonical measures of the ~11-year solar cycle. Higher values mean " +
      "more flares and coronal mass ejections, and thus more frequent geomagnetic storms.\n\n" +
      "Source: NOAA SWPC, monthly back to 1749 (SSN); F10.7 flux is carried from 2004 onward.",
    annotations: { title: "Space Weather: Solar Cycle (Sunspots & F10.7)", readOnlyHint: true },
    parameters: z.object({
      start: z.string().optional().describe("Start (YYYY or YYYY-MM). Default: 45 years ago (~4 cycles)."),
      end: z.string().optional().describe("End (YYYY or YYYY-MM). Default: latest available."),
      smoothed: z.boolean().optional().describe("Also include 13-month smoothed SSN/F10.7 (the cycle trend line)."),
    }),
    execute: async ({ start, end, smoothed }) => {
      const data = await getSolarCycle({ start, end });
      if (!data.length) return emptyResponse("No solar-cycle data in that range.");

      const rows = data.map(d =>
        smoothed
          ? { period: d.period, ssn: d.ssn, f107: d.f107, smoothed_ssn: d.smoothed_ssn, smoothed_f107: d.smoothed_f107 }
          : { period: d.period, ssn: d.ssn, f107: d.f107 },
      );
      return timeseriesResponse(`Solar cycle (SSN & F10.7): ${rows.length} months`, {
        rows,
        dateKey: "period",
        valueKey: "ssn",
        extraFields: smoothed ? ["f107", "smoothed_ssn", "smoothed_f107"] : ["f107"],
        meta: { source: "NOAA SWPC", units: { ssn: "sunspot number", f107: "sfu" } },
      });
    },
  },

  {
    name: "space_weather_geomagnetic",
    description:
      "Geomagnetic disturbance over time — the Ap (daily) or Kp (3-hourly) planetary index, the " +
      "standard measures of geomagnetic-storm intensity. Storms drive auroras and induce currents " +
      "(GICs) that stress power grids, transformers, and pipelines.\n\n" +
      "Daily-Ap storm scale: <30 quiet, 30-50 minor (G1), 50-100 moderate/strong (G2-G3), " +
      "100-200 severe (G4), 200+ extreme (G5). The March 1989 Quebec grid collapse and the " +
      "October 2003 Halloween storms peaked near Ap 200+.\n\n" +
      "Set min_ap to return only storm days at/above a threshold. Source: GFZ Potsdam (official IAGA archive), since 1932.",
    annotations: { title: "Space Weather: Geomagnetic Index (Ap/Kp)", readOnlyHint: true },
    parameters: z.object({
      start: z.string().optional().describe("Start (YYYY, YYYY-MM, or YYYY-MM-DD). Default: 12 months ago."),
      end: z.string().optional().describe("End date. Default: today."),
      index: z.enum(["Ap", "Kp"]).optional().describe("'Ap' = daily geomagnetic index (default). 'Kp' = 3-hourly planetary K-index (0-9)."),
      frequency: z.enum(["daily", "monthly"]).optional().describe("For Ap only: 'daily' (default) or 'monthly' mean. Kp is always 3-hourly."),
      min_ap: z.number().optional().describe("Return only observations at/above this value — a storm filter. E.g. 50 = G2+ storm days. Applies to whichever index is selected."),
    }),
    execute: async ({ start, end, index, frequency, min_ap }) => {
      const { points, index: idx, frequency: freq } = await getGeomagnetic({
        start, end, index, frequency, minValue: min_ap,
      });
      if (!points.length) {
        return emptyResponse(
          min_ap != null
            ? `No ${idx} observations >= ${min_ap} in that range (geomagnetically quiet).`
            : "No geomagnetic data in that range.",
        );
      }
      return timeseriesResponse(
        `Geomagnetic ${idx} (${freq}): ${points.length} points${min_ap != null ? ` with ${idx} >= ${min_ap}` : ""}`,
        {
          rows: points.map(p => ({ period: p.time, value: p.value })),
          dateKey: "period",
          valueKey: "value",
          meta: { index: idx, frequency: freq, source: "GFZ Potsdam (IAGA)" },
        },
      );
    },
  },

  {
    name: "space_weather_current",
    description:
      "Current space-weather conditions — the latest planetary Kp, the peak Kp over the last 24h, " +
      "and the current NOAA storm scales: G (geomagnetic), S (solar radiation), R (radio blackout), " +
      "each 0-5. Source: NOAA SWPC (updated hourly).",
    annotations: { title: "Space Weather: Current Conditions", readOnlyHint: true },
    parameters: z.object({}),
    execute: async () => {
      const c = await getCurrentConditions();
      return recordResponse(
        `Space weather now: Kp ${c.kpNow ?? "?"} (24h max ${c.kpMax24h ?? "?"}) — storms G=${c.gScale}, S=${c.solarRadiation}, R=${c.radioBlackout}`,
        {
          observed_at: c.observedAt,
          kp_now: c.kpNow,
          kp_max_24h: c.kpMax24h,
          geomagnetic_storm_G: c.gScale,
          solar_radiation_S: c.solarRadiation,
          radio_blackout_R: c.radioBlackout,
          recent_kp_3h: c.recent,
        },
        { source: "NOAA SWPC" },
      );
    },
  },
];
