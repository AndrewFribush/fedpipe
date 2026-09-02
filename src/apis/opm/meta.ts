import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "opm",
  displayName: "OPM Federal Workforce",
  category: "Economy",
  description:
    "OPM FedScope federal civilian workforce statistics — headcount and AVERAGE SALARY by agency, duty location (state), and occupation, plus average length of service. How big each agency is, where its people are, and what they're paid on average. The data is aggregated/anonymized (no individual names or salaries). Fetched from OPM's published summary tables and served from memory. Keyless.",
  workflow:
    "opm_agency_workforce by agency name for its size, average pay, and top states -> opm_occupation_workforce by occupation for government-wide staffing and pay of a job series.",
  tips:
    "Keyless. Data is a pinned FedScope snapshot (see the dataset label in results) refreshed when OPM posts a new cube. Figures are AVERAGES over aggregated groups — not individual salaries (federal individual-salary data with names is only available via third-party FOIA republishers). Agency names are as OPM files them (e.g. 'DEPARTMENT OF VETERANS AFFAIRS'); occupations are OPM job-series titles.",
  domains: ["economy"],
  crossRef: [
    { question: "economy", route: "opm_agency_workforce(agency) for federal headcount and average pay; opm_occupation_workforce(job) for a role government-wide" },
  ],
  reference: {
    docs: { "FedScope": "https://www.fedscope.opm.gov/", "OPM datasets": "https://www.opm.gov/data/datasets/" },
  },
} satisfies ModuleMeta;
