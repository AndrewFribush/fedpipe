import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "orange-book",
  displayName: "FDA Orange Book",
  category: "Health",
  description:
    "FDA Orange Book — approved drug products with therapeutic-equivalence (TE) codes, plus their patent and exclusivity data. Look up a drug's applicant, approval date, brand/generic status, and the patents (with expiry dates) that protect it — the reference for generic-entry and patent-cliff analysis. The Orange Book ships only as a small ZIP; it's fetched and parsed into memory (no API key, any Node).",
  workflow:
    "orange_book_search by trade name or ingredient to find approved products and their application numbers -> orange_book_patents by application number for the patents and expiry dates.",
  tips:
    "Keyless; first call fetches the ~1MB dataset (cached in memory). Appl_Type N = brand NDA, A = generic ANDA. marketingStatus: RX / OTC / DISCN (discontinued). TE codes (AB, etc.) mark therapeutic equivalents. Patent expiry dates drive the generic 'patent cliff'. Pair with the `fda` module (openFDA) for labels and adverse events, and `uspto` for the patents themselves.",
  domains: ["health"],
  crossRef: [
    { question: "drug investigation", route: "orange_book_search(drug) for approval + TE code, orange_book_patents(appl_no) for patent expiry" },
    { question: "patents", route: "orange_book_patents(appl_no) — the pharma patents protecting an approved drug, then uspto for patent detail" },
  ],
  reference: {
    docs: { "Orange Book data files": "https://www.fda.gov/drugs/drug-approvals-and-databases/orange-book-data-files" },
  },
} satisfies ModuleMeta;
