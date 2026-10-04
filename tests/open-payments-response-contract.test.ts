import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import responseShapes from "./live/response-shapes.json" with { type: "json" };

const catalog = [
  { identifier: "general-2024", title: "2024 General Payment Data", distribution: [{ identifier: "general-2024-distribution" }] },
  { identifier: "general-2025", title: "2025 General Payment Data", distribution: [{ identifier: "general-2025-distribution" }] },
];
const payments = [
  {
    covered_recipient_first_name: "JANE",
    covered_recipient_last_name: "SMITH",
    covered_recipient_specialty_1: "Cardiology",
    recipient_city: "BURLINGTON",
    recipient_state: "VT",
    applicable_manufacturer_or_applicable_gpo_making_payment_name: "Example Pharma",
    total_amount_of_payment_usdollars: "1234.5",
    date_of_payment: "01/02/2025",
    nature_of_payment_or_transfer_of_value: "Consulting Fee",
    name_of_drug_or_biological_or_device_or_medical_supply_1: "Example Drug",
    name_of_drug_or_biological_or_device_or_medical_supply_2: "Example Device",
    program_year: "2025",
    record_id: "payment-1",
  },
  {
    teaching_hospital_name: "Example Teaching Hospital",
    recipient_city: "BURLINGTON",
    recipient_state: "VT",
    total_amount_of_payment_usdollars: "0",
    program_year: "2025",
    record_id: "payment-2",
  },
];
const projectedColumns = ["amount", "company", "date", "location", "nature", "product", "programYear", "recipient", "recordId", "specialty"];

let module: typeof import("../src/apis/open-payments/index.js");

beforeEach(async () => {
  // The SDK caches discovery separately from HTTP responses. A new module per
  // test ensures access-denial assertions always exercise a real fetch call.
  vi.resetModules();
  module = await import("../src/apis/open-payments/index.js");
  module.default.clearCache!();
});

afterEach(() => {
  module.default.clearCache!();
  vi.unstubAllGlobals();
});

async function execute(name: string, args: Record<string, unknown> = {}) {
  const tool = module.default.tools.find(tool => tool.name === name)!;
  return tool.execute(tool.parameters.parse(args), {} as never);
}

describe("Open Payments projected response contract", () => {
  it.each(["open_payments_search", "open_payments_top"] as const)("%s preserves payment details and query semantics", async name => {
    const fetchMock = vi.fn(async (input: string, init?: RequestInit) => {
      const url = new URL(input);
      if (url.pathname.endsWith("/metastore/schemas/dataset/items")) {
        expect(url.searchParams.get("show-reference-ids")).toBe("true");
        return Response.json(catalog);
      }
      expect(url.pathname).toBe("/api/1/datastore/query/general-2025-distribution");
      if (name === "open_payments_search") {
        expect(init?.method).not.toBe("POST");
        expect(url.searchParams.get("conditions[0][property]")).toBe("recipient_state");
        expect(url.searchParams.get("conditions[0][value]")).toBe("VT");
        expect(url.searchParams.get("conditions[0][operator]")).toBe("=");
        expect(url.searchParams.get("conditions[1][groupOperator]")).toBe("or");
        for (const index of [0, 1]) {
          expect(url.searchParams.get(`conditions[1][conditions][${index}][property]`))
            .toBe(`name_of_drug_or_biological_or_device_or_medical_supply_${index + 1}`);
          expect(url.searchParams.get(`conditions[1][conditions][${index}][value]`)).toBe("%Example%");
          expect(url.searchParams.get(`conditions[1][conditions][${index}][operator]`)).toBe("LIKE");
        }
        expect(url.searchParams.get("limit")).toBe("2");
      } else {
        expect(init?.method).toBe("POST");
        expect(JSON.parse(init?.body as string)).toMatchObject({
          limit: 2,
          conditions: [
            { property: "recipient_state", value: "VT", operator: "=" },
            {
              groupOperator: "or",
              conditions: [1, 2].map(index => ({
                property: `name_of_drug_or_biological_or_device_or_medical_supply_${index}`,
                value: "%Example%",
                operator: "LIKE",
              })),
            },
          ],
          sorts: [{ property: "total_amount_of_payment_usdollars", order: "desc" }],
        });
      }
      return Response.json({ results: payments, count: 500, schema: {}, query: {} });
    });
    vi.stubGlobal("fetch", fetchMock);

    const output = JSON.parse(await execute(name, { state: "vt", product: "Example", limit: 2 }) as string);
    expect(output.dataType).toBe("table");
    expect([...output.data.columns].sort()).toEqual(projectedColumns);
    const rows = output.data.rows.map((row: unknown[]) =>
      Object.fromEntries(output.data.columns.map((column: string, index: number) => [column, row[index]])),
    );
    expect(rows[0]).toEqual({
      recipient: "JANE SMITH",
      specialty: "Cardiology",
      location: "BURLINGTON, VT",
      company: "Example Pharma",
      amount: `$${Number("1234.5").toLocaleString()}`,
      date: "01/02/2025",
      nature: "Consulting Fee",
      product: "Example Drug; Example Device",
      programYear: "2025",
      recordId: "payment-1",
    });
    expect(rows[1]).toMatchObject({ recipient: "Example Teaching Hospital", amount: "$0", recordId: "payment-2" });
    expect(rows.every((row: Record<string, unknown>) => Object.values(row).some(value => value !== null))).toBe(true);
    expect(output.data.total).toBe(500);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    // These tools have deliberately projected CMS records since 3c38b62. A
    // baseline of raw CMS column names reports false upstream schema drift.
    expect(responseShapes[name]).toEqual({ dataType: "table", columns: projectedColumns });
  });
});

describe("Open Payments access denials", () => {
  it("all ten tools surface catalog HTTP 403 without a fallback or empty success", async () => {
    const fetchMock = vi.fn(async () => new Response("<html><h1>Access Denied</h1></html>", {
      status: 403,
      headers: { "Content-Type": "text/html" },
    }));
    vi.stubGlobal("fetch", fetchMock);

    for (const tool of module.default.tools) {
      fetchMock.mockClear();
      await expect(execute(tool.name, { state: "VT", limit: 2 }), tool.name)
        .rejects.toThrow(/HTTP 403.*Access Denied/);
      expect(fetchMock, tool.name).toHaveBeenCalledTimes(1);
    }
  });
});
