import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nsf",
  displayName: "NSF Research Awards",
  category: "Science",
  description:
    "National Science Foundation awards — federal research grants by keyword, awardee institution, or principal investigator, with funding amounts, dates, and abstracts. Complements NIH RePORTER (in the `nih` module) for the non-biomedical side of federal research funding. Keyless.",
  workflow:
    "nsf_search_awards by keyword/institution/PI to find grants -> nsf_award for one award's full detail.",
  tips:
    "Keyless. Results cap at 25 per page (use offset to page). awardeeName matches the grantee institution; pdPIName matches the principal investigator. Funding is 'funds obligated' for the award. For biomedical/NIH grants use the `nih` module instead.",
  domains: ["education"],
  crossRef: [
    { question: "college", route: "nsf_search_awards(awardee='<university>') for its NSF research funding" },
  ],
  reference: {
    docs: { "Awards API": "https://www.research.gov/common/webapi/awardapisearch-v1.htm" },
  },
} satisfies ModuleMeta;
