import { afterEach, describe, expect, it, vi } from "vitest";
import type { ApiClient } from "../src/shared/client.js";
import { searchComplaintTrends, type ComplaintTrendOptions } from "../src/apis/cfpb/trends.js";
import * as sdk from "../src/apis/cfpb/sdk.js";
import { tools } from "../src/apis/cfpb/tools.js";

const countResponse = (count: number, extra = {}) => ({
  hits: { total: { value: count, relation: "eq" } }, ...extra,
});
const facet = (buckets: unknown[]) => ({ buckets, sum_other_doc_count: 0, doc_count_error_upper_bound: 0 });
const range = { date_received_min: "2024-02-28", date_received_max: "2024-03-02" };
const singleMonth = { date_received_min: "2024-02-01", date_received_max: "2024-02-29" };
function client(get = vi.fn(async () => countResponse(0))) {
  return { get, getText: vi.fn(), post: vi.fn(), clearCache: vi.fn() } as unknown as ApiClient;
}
afterEach(() => vi.restoreAllMocks());

describe("CFPB trends via supported search", () => {
  it("counts clipped leap-month buckets without gaps or double-counting boundary days", async () => {
    const observations = [
      ["2024-02-27", 100], ["2024-02-28", 1], ["2024-02-29", 2],
      ["2024-03-01", 3], ["2024-03-02", 4], ["2024-03-03", 100],
    ] as const;
    const get = vi.fn(async (_path, params) => countResponse(observations
      .filter(([day]) => day >= params.date_received_min && day <= params.date_received_max)
      .reduce((sum, [, count]) => sum + count, 0)));
    const result: any = await searchComplaintTrends(client(get as any), range);
    expect(get.mock.calls.map(([, p]) => [p.date_received_min, p.date_received_max])).toEqual([
      ["2024-02-28", "2024-02-29"], ["2024-03-01", "2024-03-02"],
    ]);
    expect(result.hits.total).toEqual({ value: 10, relation: "eq" });
    expect(result.aggregations.dateRangeArea.dateRangeArea.buckets).toEqual([
      { key: Date.parse("2024-02-01"), key_as_string: "2024-02-01T00:00:00.000Z", doc_count: 3 },
      { key: Date.parse("2024-03-01"), key_as_string: "2024-03-01T00:00:00.000Z", doc_count: 7 },
    ]);
    expect(result._meta).toMatchObject({ ...range, bounds: "inclusive", interval_count: 2 });
  });

  it.each([
    ["quarter", "2024-04-02", [["2023-12-30", "2023-12-31"], ["2024-01-01", "2024-03-31"], ["2024-04-01", "2024-04-02"]]],
    ["year", "2025-01-02", [["2023-12-30", "2023-12-31"], ["2024-01-01", "2024-12-31"], ["2025-01-01", "2025-01-02"]]],
  ])("uses calendar %s boundaries across years", async (trend_interval, end, expected) => {
    const get = vi.fn(async () => countResponse(0));
    const api = client(get);
    const result: any = await searchComplaintTrends(api, { date_received_min: "2023-12-30", date_received_max: end, trend_interval });
    expect((get.mock.calls as any[]).map(([, p]) => [p.date_received_min, p.date_received_max])).toEqual(expected);
    expect(result.aggregations.dateRangeArea.dateRangeArea.buckets).toHaveLength(3);
  });

  it("defaults to twelve calendar months and states the entire covered range", async () => {
    const get = vi.fn(async () => countResponse(1));
    const result: any = await searchComplaintTrends(client(get), { date_received_max: "2024-02-15" });
    expect(get).toHaveBeenCalledTimes(12);
    expect(result._meta).toMatchObject({ date_received_min: "2023-03-01", date_received_max: "2024-02-15", interval_count: 12 });
    expect(result.hits.total.value).toBe(12);
    const today = new Date().toISOString().slice(0, 10);
    const current: any = await searchComplaintTrends(client(), { trend_interval: "year" });
    expect(current._meta.date_received_max).toBe(today);
  });

  it("forwards every filter exactly without fuzzy company fallback or obsolete trend parameters", async () => {
    const filters = { company: "Exact & Company", product: "Mortgage", issue: "Payments", state: "CA", tags: "Servicemember", search_term: "fees", submitted_via: "Web", timely: "Yes", zip_code: "90210" };
    const get = vi.fn(async () => countResponse(0));
    await searchComplaintTrends(client(get), { ...singleMonth, ...filters });
    expect(get).toHaveBeenCalledExactlyOnceWith("/", {
      ...singleMonth, ...filters, size: 0, no_aggs: "true", no_highlight: "true",
    });
  });

  it("allows exactly sixty buckets but rejects a larger range before issuing any request", async () => {
    const get = vi.fn(async () => countResponse(0));
    await searchComplaintTrends(client(get), { date_received_min: "2019-01-01", date_received_max: "2023-12-31" });
    expect(get).toHaveBeenCalledTimes(60);
    get.mockClear();
    await expect(searchComplaintTrends(client(get), { date_received_min: "2019-01-01", date_received_max: "2024-01-01" })).rejects.toThrow("limited to 60 intervals");
    expect(get).not.toHaveBeenCalled();
  });

  it.each([
    [{ date_received_min: "2023-02-29" }, "valid YYYY-MM-DD"],
    [{ date_received_max: "not a date" }, "valid YYYY-MM-DD"],
    [{ date_received_min: "2025-01-01", date_received_max: "2024-01-01" }, "must not be after"],
    [{ lens: "unknown" }, "lens must be"],
    [{ trend_interval: "unknown" }, "trend_interval must be"],
    [{ lens: "product", sub_lens: "issue" }, "cross-lens drilldowns"],
    [{ lens: "issue", sub_lens: "product" }, "cross-lens drilldowns"],
    [{ lens: "tags", sub_lens: "tags" }, "cross-lens drilldowns"],
    [{ sub_lens: "sub_product" }, "cross-lens drilldowns"],
    [{ sub_lens_depth: 61 }, "sub_lens_depth"],
    [{ focus: "Mortgage" }, "focus requires"],
    [{ lens: "product", product: "Mortgage", focus: "Credit card" }, "focus conflicts"],
  ])("rejects unsupported or invalid options %j before fetching", async (options, message) => {
    const get = vi.fn(async () => countResponse(0));
    await expect(searchComplaintTrends(client(get), { ...singleMonth, ...options } as ComplaintTrendOptions)).rejects.toThrow(message);
    expect(get).not.toHaveBeenCalled();
  });

  it.each([["product", "sub_product"], ["issue", "sub_issue"]])("preserves the %s filter and native child counts despite self-excluding facets", async (lens, child) => {
    const get = vi.fn()
      .mockResolvedValueOnce(countResponse(2, { aggregations: { [lens]: { [lens]: facet([
        { key: "Selected", doc_count: 9, [`${child}.raw`]: facet([{ key: "Child", doc_count: 2 }, { key: "Other child", doc_count: 7 }]) },
        { key: "Other parent", doc_count: 20, [`${child}.raw`]: facet([]) },
      ]) } } }))
      .mockResolvedValueOnce(countResponse(0, { aggregations: { [lens]: { [lens]: facet([]) } } }));
    const result: any = await searchComplaintTrends(client(get), { ...range, lens, sub_lens: child, [lens]: "Selected•Child", focus: "Selected" });
    expect(get.mock.calls[0][1][lens]).toBe("Selected•Child");
    const series = result.aggregations[lens][lens].buckets;
    expect(series).toHaveLength(1);
    expect(series[0]).toMatchObject({ key: "Selected", doc_count: 2 });
    expect(series[0].trend_period.buckets.map((b: any) => b.doc_count)).toEqual([2, 0]);
    expect(series[0][child].buckets).toHaveLength(1);
    expect(series[0][child].buckets[0].trend_period.buckets.map((b: any) => b.doc_count)).toEqual([2, 0]);
  });

  it("applies focus as an exact tags filter and returns only the focused series", async () => {
    const get = vi.fn(async () => countResponse(3, { aggregations: { tags: { tags: facet([
      { key: "Servicemember", doc_count: 3 }, { key: "Older American", doc_count: 8 },
    ]) } } }));
    const result: any = await searchComplaintTrends(client(get), { ...singleMonth, lens: "tags", focus: "Servicemember" });
    expect((get.mock.calls as any[])[0][1].tags).toBe("Servicemember");
    expect(result.aggregations.tags.tags.buckets.map((b: any) => b.key)).toEqual(["Servicemember"]);
  });

  it("applies focus when the optional same-field filter is an empty string", async () => {
    const get = vi.fn(async () => countResponse(0, { aggregations: { product: { product: facet([]) } } }));
    await searchComplaintTrends(client(get), { ...singleMonth, lens: "product", product: "", focus: "Mortgage" });
    expect((get.mock.calls as any[])[0][1].product).toBe("Mortgage");
  });

  it("reports series and child limits, preserving the retained child's time series in the tool", async () => {
    const get = vi.fn(async () => countResponse(138, { aggregations: { product: { product: facet(
      Array.from({ length: 12 }, (_, i) => ({ key: `Product ${i}`, doc_count: i + 6, "sub_product.raw": facet([
        { key: "A", doc_count: 3 }, { key: "B", doc_count: 2 }, { key: "C", doc_count: 1 },
      ]) })),
    ) } } }));
    const result: any = await searchComplaintTrends(client(get), { ...singleMonth, lens: "product", sub_lens: "sub_product", sub_lens_depth: 1 });
    expect(result.aggregations.product.product.buckets).toHaveLength(10);
    expect(result._meta).toMatchObject({ omitted_series: 2, omitted_sub_series: 20, sub_series_limit: 1 });
    vi.spyOn(sdk, "getComplaintTrends").mockResolvedValue(result);
    const tool = tools.find(t => t.name === "cfpb_complaint_trends")!;
    const output = JSON.parse(await tool.execute!({ lens: "product" }, {} as never) as string);
    expect(output.meta).toMatchObject({ ...singleMonth, omitted_series: 2 });
    expect(output.record.aggregations.product[0].sub_product[0].trend_period[0].count).toBe(3);
  });

  it.each([
    [countResponse(5, { timed_out: true }), "complete exact counts"],
    [countResponse(5, { _shards: { failed: 1 } }), "complete exact counts"],
    [{ hits: { total: { value: 10000, relation: "gte" } } }, "complete exact counts"],
    [countResponse(-1), "complete exact counts"],
    [countResponse(5), "missing the requested trend aggregation"],
    [countResponse(5, { aggregations: { product: { product: { buckets: [], sum_other_doc_count: 1 } } } }), "upstream truncated"],
    [countResponse(5, { aggregations: { product: { product: facet([{ key: "Mortgage", doc_count: "5" }]) } } }), "invalid trend aggregation counts"],
    [countResponse(5, { aggregations: { product: { product: facet([{ key: "Mortgage", doc_count: 5, "sub_product.raw": { buckets: [], doc_count_error_upper_bound: 1 } }]) } } }), "upstream truncated"],
  ])("refuses partial or inexact upstream results %j", async (response, message) => {
    const get = vi.fn(async () => response);
    await expect(searchComplaintTrends(client(get as any), { ...singleMonth, lens: "product", sub_lens: "sub_product" })).rejects.toThrow(message);
  });

  it("fails the entire series when a later period fails upstream", async () => {
    const get = vi.fn().mockResolvedValueOnce(countResponse(5)).mockRejectedValueOnce(new Error("upstream unavailable"));
    await expect(searchComplaintTrends(client(get), range)).rejects.toThrow("upstream unavailable");
    expect(get).toHaveBeenCalledTimes(2);
  });
});
