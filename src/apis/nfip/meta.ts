import type { ModuleMeta } from "../../shared/types.js";

export default {
  name: "nfip",
  displayName: "FEMA Flood Insurance (NFIP)",
  category: "Financial",
  description:
    "FEMA National Flood Insurance Program (NFIP) claims via OpenFEMA — redacted flood-insurance claim records: where floods caused insured losses, the amounts paid on building and contents, the flood zone, and the cause of damage. The dollars-and-place view of flood damage, complementing the `fema` disaster-declarations module. Keyless.",
  workflow:
    "nfip_claims by state / year of loss / flood zone to see flood-insurance payouts. Pair with fema_disaster_declarations for the declared-disaster side and resolve_place for the geography.",
  tips:
    "Keyless (OpenFEMA). Filter by state (2-letter), yearOfLoss, and rated flood zone (e.g. 'AE', 'X', 'VE'). Amounts are dollars paid on the claim; occupancy type is FEMA-coded. Records are redacted (no PII). Claims run into the millions nationally — always filter by state and/or year.",
  domains: ["housing", "finance"],
  crossRef: [
    { question: "disasters", route: "nfip_claims(state, year) for flood-insurance payouts, alongside fema_disaster_declarations" },
    { question: "housing", route: "nfip_claims(state) for flood-damage claims and payments by place" },
  ],
  reference: {
    docs: { "OpenFEMA NfipClaims": "https://www.fema.gov/openfema-data-page/fima-nfip-redacted-claims-v2" },
  },
} satisfies ModuleMeta;
