import { z } from "zod";
import type { Tool } from "fastmcp";
import { agencyWorkforce, occupationWorkforce, SNAPSHOT_LABEL } from "./sdk.js";
import { listResponse, emptyResponse } from "../../shared/response.js";

const usd = (n: number) => `$${n.toLocaleString()}`;

export const tools: Tool<any, any>[] = [
  {
    name: "opm_agency_workforce",
    description:
      "Federal civilian workforce for an agency by name: total employees, average salary, and the top states by headcount. Aggregated OPM FedScope data (no individual salaries). Keyless.",
    annotations: { title: "OPM: Agency Workforce", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      agency: z.string().describe("Agency name (substring) — e.g. 'Veterans Affairs', 'Treasury', 'NASA'"),
    }),
    execute: async (args) => {
      const rows = await agencyWorkforce(args.agency);
      if (!rows.length) return emptyResponse(`No federal agency matches "${args.agency}". Try the department name as OPM files it (e.g. 'Veterans Affairs').`);
      return listResponse(
        `${rows.length} agency match(es) for "${args.agency}" (FedScope ${SNAPSHOT_LABEL})`,
        {
          items: rows.map(a => ({
            agency: a.agency,
            employees: a.employees.toLocaleString(),
            avgSalary: usd(a.avgSalary),
            topStates: a.topStates.map(s => `${s.state}: ${s.employees.toLocaleString()} (${usd(s.avgSalary)})`),
          })),
          total: rows.length,
        },
      );
    },
  },
  {
    name: "opm_occupation_workforce",
    description:
      "Government-wide federal workforce for an occupation/job series by title: total employees, average salary, and average years of service. Aggregated OPM FedScope data. Keyless.",
    annotations: { title: "OPM: Occupation Workforce", readOnlyHint: true, idempotentHint: true, openWorldHint: true },
    parameters: z.object({
      occupation: z.string().describe("Occupation title (substring) — e.g. 'Nurse', 'Economist', 'Air Traffic'"),
      limit: z.number().int().max(50).default(15).describe("Max matching occupations (default 15)"),
    }),
    execute: async (args) => {
      const rows = await occupationWorkforce(args.occupation);
      if (!rows.length) return emptyResponse(`No federal occupation matches "${args.occupation}".`);
      return listResponse(
        `${rows.length} occupation(s) match "${args.occupation}" (FedScope ${SNAPSHOT_LABEL}), most-staffed first`,
        {
          items: rows.slice(0, args.limit).map(o => ({
            occupation: o.occupation,
            family: o.family,
            employees: o.employees.toLocaleString(),
            avgSalary: usd(o.avgSalary),
            avgYearsService: o.avgYearsService,
          })),
          total: rows.length,
        },
      );
    },
  },
];
