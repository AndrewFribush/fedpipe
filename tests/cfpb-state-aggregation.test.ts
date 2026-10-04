import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clearCache, getStateComplaints } from "../src/apis/cfpb/sdk.js";
import { tools } from "../src/apis/cfpb/tools.js";

beforeEach(clearCache);
afterEach(() => { vi.unstubAllGlobals(); clearCache(); });

const statesTool = tools.find(tool => tool.name === "cfpb_state_complaints")!;
const execute = (args: Record<string, unknown> = {}) =>
  statesTool.execute(statesTool.parameters.parse(args), {} as never);

describe("CFPB state counts through the supported search API", () => {
  it("preserves exact filters and does not fuzzy-retry an empty company result", async () => {
    const response = { hits: { total: { value: 0, relation: "eq" }, hits: [] }, aggregations: { state: { state: { buckets: [] } } } };
    const fetchMock = vi.fn(async () => Response.json(response));
    vi.stubGlobal("fetch", fetchMock);
    await expect(getStateComplaints({ company: "Exact Company", product: "Mortgage", date_received_min: "2024-01-01", date_received_max: "2024-02-29", timely: "Yes" })).resolves.toEqual(response);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.pathname).toBe("/data-research/consumer-complaints/search/api/v1/");
    expect(Object.fromEntries(url.searchParams)).toEqual({ company: "Exact Company", product: "Mortgage", date_received_min: "2024-01-01", date_received_max: "2024-02-29", timely: "Yes", size: "0", no_aggs: "false" });
  });

  it("returns state and territory counts without unrelated search facets", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({
      hits: { total: { value: 12, relation: "eq" }, hits: [] },
      aggregations: {
        state: { state: { buckets: [{ key: "VT", doc_count: 9 }, { key: "PR", doc_count: 3 }, { key: "AK", doc_count: 0 }] } },
        product: { product: { buckets: [{ key: "Mortgage", doc_count: 12 }] } },
      },
    })));
    const result = JSON.parse(await execute() as string);
    expect(result.dataType).toBe("table");
    expect(result.data.columns).toEqual(["state", "complaints"]);
    expect(result.data.rows).toEqual([["VT", 9], ["PR", 3], ["AK", 0]]);
  });

  it.each([
    { aggregations: {} },
    { aggregations: { state: { state: { buckets: [{ key: "VT", doc_count: -1 }] } } } },
  ])("fails visibly on missing or invalid state counts", async response => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json(response)));
    await expect(execute()).rejects.toThrow(/missing its state aggregation|invalid state count/);
  });

  it.each([
    { timed_out: true },
    { _shards: { failed: 1 } },
    { aggregations: { state: { state: { buckets: [{ key: "VT", doc_count: 9 }], sum_other_doc_count: 20 } } } },
    { aggregations: { state: { state: { buckets: [{ key: "VT", doc_count: 9 }], doc_count_error_upper_bound: 5 } } } },
  ])("rejects partial upstream counts instead of returning a complete table", async partial => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({
      aggregations: { state: { state: { buckets: [{ key: "VT", doc_count: 9 }] } } }, ...partial,
    })));
    await expect(execute()).rejects.toThrow(/incomplete state counts/);
  });
});
