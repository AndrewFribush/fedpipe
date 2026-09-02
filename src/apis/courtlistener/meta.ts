/**
 * CourtListener (Free Law Project) module metadata.
 */

import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "courtlistener",
  displayName: "CourtListener Federal Courts",
  category: "Legal",
  description:
    "CourtListener (Free Law Project) - the open mirror of U.S. court records: 10M+ opinions from federal and state courts, plus the RECAP archive of PACER dockets and filings. Search case law and dockets by party, court, judge, or date; pull opinion text and docket metadata. 'Who is suing this company' lives here.",
  workflow:
    "courts_search (type='o' for opinions, 'd' for dockets) to find cases -> courts_opinion for a decision's text -> courts_docket for a case's parties, judge, and status.",
  tips:
    "Search is keyless; opinion/docket detail endpoints need a free COURTLISTENER_API_TOKEN. Court IDs are CourtListener slugs: scotus, ca1-ca11, cadc, cafc, and district slugs like nysd, txnd (search without a court filter to discover them). Docket search covers RECAP (PACER mirror) - complete for what users have contributed, not all of PACER. citeCount on opinions signals precedential weight.",
  domains: ["justice"],
  auth: {
    envVar: "COURTLISTENER_API_TOKEN",
    signup: "https://www.courtlistener.com/help/api/rest/ (free account -> profile -> API token)",
    optional: true,
  },
  crossRef: [
    { question: "courts/litigation", route: "courts_search(query='<party or topic>', type='d') for lawsuits/dockets, type='o' for case law, then courts_opinion / courts_docket" },
  ],
  reference: {
    docs: {
      "REST API docs": "https://www.courtlistener.com/help/api/rest/",
      "RECAP project": "https://free.law/recap/",
    },
  },
} satisfies ModuleMeta;
