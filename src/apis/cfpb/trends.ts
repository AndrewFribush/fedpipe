import { qp, type ApiClient } from "../../shared/client.js";

export interface ComplaintTrendOptions {
  lens?: string;
  sub_lens?: string;
  sub_lens_depth?: number;
  focus?: string;
  search_term?: string;
  product?: string;
  company?: string;
  state?: string;
  issue?: string;
  date_received_min?: string;
  date_received_max?: string;
  tags?: string;
  submitted_via?: string;
  timely?: string;
  zip_code?: string;
  trend_interval?: string;
}

type Bucket = { key: string | number; doc_count: number; [key: string]: unknown };
type Facet = { buckets: Bucket[]; sum_other_doc_count?: number; doc_count_error_upper_bound?: number };
type SearchCounts = {
  hits: { total: number | { value: number; relation: string } };
  aggregations?: Record<string, Record<string, Facet>>;
  timed_out?: boolean;
  _shards?: { failed?: number };
};
const DAY = 86_400_000;
const MAX_INTERVALS = 60;
const SERIES_LIMIT = 10;

function dateBound(value: string): number {
  const time = Date.parse(`${value}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== value) {
    throw new Error("cfpb: trend date bounds must be valid YYYY-MM-DD dates");
  }
  return time;
}
const dateString = (time: number) => new Date(time).toISOString().slice(0, 10);

function requireCompleteFacet(facet: Facet | undefined): Bucket[] {
  if (!facet || !Array.isArray(facet.buckets)) throw new Error("cfpb: search response is missing the requested trend aggregation");
  if (facet.sum_other_doc_count || facet.doc_count_error_upper_bound) {
    throw new Error("cfpb: upstream truncated the trend aggregation; narrow the filters or date range");
  }
  if (facet.buckets.some(b => !["string", "number"].includes(typeof b.key) || !Number.isSafeInteger(b.doc_count) || b.doc_count < 0)) {
    throw new Error("cfpb: upstream returned invalid trend aggregation counts");
  }
  return facet.buckets;
}

/** Build exact calendar counts using the supported search endpoint after /trends was retired. */
export async function searchComplaintTrends(client: ApiClient, opts: ComplaintTrendOptions): Promise<unknown> {
  const {
    lens = "overview", sub_lens, sub_lens_depth = 10, focus,
    trend_interval = "month", date_received_min, date_received_max, ...filters
  } = opts;
  if (!["overview", "product", "issue", "tags"].includes(lens)) throw new Error("cfpb: lens must be overview, product, issue, or tags");
  const child = lens === "product" ? "sub_product" : lens === "issue" ? "sub_issue" : undefined;
  if (sub_lens && sub_lens !== child) {
    throw new Error("cfpb: the search API supports only product/sub_product and issue/sub_issue drilldowns; cross-lens drilldowns are no longer available");
  }
  if (!Number.isInteger(sub_lens_depth) || sub_lens_depth < 1 || sub_lens_depth > 60) throw new Error("cfpb: sub_lens_depth must be between 1 and 60");
  if (!["month", "quarter", "year"].includes(trend_interval)) throw new Error("cfpb: trend_interval must be month, quarter, or year");
  if (focus) {
    if (lens === "overview") throw new Error("cfpb: focus requires a product, issue, or tags lens");
    const field = lens as "product" | "issue" | "tags";
    const existing = filters[field];
    if (existing && existing.split("•")[0] !== focus) throw new Error(`cfpb: focus conflicts with the ${field} filter`);
    filters[field] = existing || focus;
  }

  const end = dateBound(date_received_max ?? new Date().toISOString().slice(0, 10));
  const defaultStart = new Date(end);
  // Twelve calendar months ending at the requested end date, including both bounds.
  defaultStart.setUTCMonth(defaultStart.getUTCMonth() - 11, 1);
  const start = dateBound(date_received_min ?? dateString(defaultStart.getTime()));
  if (start > end) throw new Error("cfpb: date_received_min must not be after date_received_max");
  const months = trend_interval === "year" ? 12 : trend_interval === "quarter" ? 3 : 1;
  const first = new Date(start);
  first.setUTCMonth(Math.floor(first.getUTCMonth() / months) * months, 1);
  const periods: Array<{ key: number; min: string; max: string }> = [];
  for (let cursor = first.getTime(); cursor <= end;) {
    const next = new Date(cursor);
    next.setUTCMonth(next.getUTCMonth() + months);
    periods.push({ key: cursor, min: dateString(Math.max(cursor, start)), max: dateString(Math.min(next.getTime() - DAY, end)) });
    if (periods.length > MAX_INTERVALS) throw new Error("cfpb: trends are limited to 60 intervals; narrow the date range or use a larger trend_interval");
    cursor = next.getTime();
  }

  const histogram: Bucket[] = [];
  const series = new Map<string, { values: number[]; children: Map<string, number[]> }>();
  for (const [position, period] of periods.entries()) {
    const result = await client.get<SearchCounts>("/", qp({
      ...filters, date_received_min: period.min, date_received_max: period.max,
      size: 0, no_aggs: lens === "overview", no_highlight: true,
    }));
    const total = result.hits?.total;
    const count = typeof total === "number" ? total : total?.value;
    if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0 || (typeof total === "object" && total.relation !== "eq") || result.timed_out || result._shards?.failed) {
      throw new Error("cfpb: search did not return complete exact counts for every trend interval");
    }
    histogram.push({ key: period.key, key_as_string: new Date(period.key).toISOString(), doc_count: count });
    if (lens === "overview") continue;
    const selection = filters[lens as "product" | "issue" | "tags"];
    const selected = selection ? selection.split("•") : undefined;
    // Search facets omit their own field filter. Reapply it before making series,
    // including the selected child's count when the filter drills into a product/issue.
    for (const bucket of requireCompleteFacet(result.aggregations?.[lens]?.[lens])) {
      const key = String(bucket.key);
      if (selected && key !== selected[0]) continue;
      const children = child && (sub_lens || selected?.[1])
        ? requireCompleteFacet(bucket[`${child}.raw`] as Facet | undefined).filter(b => !selected?.[1] || b.key === selected[1])
        : [];
      let entry = series.get(key);
      if (!entry) {
        entry = { values: Array(periods.length).fill(0), children: new Map() };
        series.set(key, entry);
      }
      entry.values[position] = selected?.[1] ? children.reduce((sum, b) => sum + b.doc_count, 0) : bucket.doc_count;
      if (sub_lens) for (const b of children) {
        const childKey = String(b.key);
        let values = entry.children.get(childKey);
        if (!values) entry.children.set(childKey, (values = Array(periods.length).fill(0)));
        values[position] = b.doc_count;
      }
    }
  }
  const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
  const seriesBucket = (key: string, values: number[]): Bucket => ({
    key, doc_count: sum(values),
    trend_period: { buckets: histogram.map((bucket, i) => ({ ...bucket, doc_count: values[i] })) },
  });
  const ranked = [...series].sort((a, b) => sum(b[1].values) - sum(a[1].values) || a[0].localeCompare(b[0]));
  let omittedChildren = 0;
  const buckets = ranked.slice(0, SERIES_LIMIT).map(([key, entry]) => {
    const bucket = seriesBucket(key, entry.values);
    if (sub_lens) {
      const children = [...entry.children].sort((a, b) => sum(b[1]) - sum(a[1]) || a[0].localeCompare(b[0]));
      omittedChildren += Math.max(0, children.length - sub_lens_depth);
      bucket[sub_lens] = { buckets: children.slice(0, sub_lens_depth).map(([childKey, values]) => seriesBucket(childKey, values)) };
    }
    return bucket;
  });
  return {
    hits: { total: { value: histogram.reduce((total, bucket) => total + bucket.doc_count, 0), relation: "eq" }, hits: [] },
    aggregations: {
      dateRangeArea: { dateRangeArea: { buckets: histogram } },
      ...(lens === "overview" ? {} : { [lens]: { [lens]: { buckets } } }),
    },
    _meta: {
      source: "CFPB search API, one exact count query per interval",
      date_received_min: dateString(start), date_received_max: dateString(end),
      bounds: "inclusive", trend_interval, interval_count: periods.length, max_intervals: MAX_INTERVALS,
      series_limit: SERIES_LIMIT, omitted_series: Math.max(0, ranked.length - SERIES_LIMIT),
      sub_series_limit: sub_lens_depth, omitted_sub_series: omittedChildren,
    },
  };
}
