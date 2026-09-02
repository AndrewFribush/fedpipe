/**
 * Lightweight API client factory with caching, retry, and rate limiting.
 *
 * Instead of an abstract class with 7 virtual methods, this uses a config
 * object to create a client. Each module calls createClient() once.
 *
 * Features:
 *   - Disk-backed TTL cache (survives MCP server restarts)
 *   - Timeout (30s default)
 *   - Retry with exponential backoff (429, 502, 503, 504)
 *   - Token-bucket rate limiting
 *   - Auth via query param, header, or request body
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from "node:fs";
import { writeFile, rename } from "node:fs/promises";
import { join, dirname } from "node:path";
import { homedir, tmpdir } from "node:os";

// ─── Types ───────────────────────────────────────────────────────────

export interface ClientConfig {
  baseUrl: string;
  name: string;

  /** Auth configuration — how to attach credentials to requests */
  auth?: {
    /** Where to inject credentials: query string, request header, or POST body */
    type: "query" | "header" | "body";
    /**
     * Maps param/header names to env var names. Values are read from process.env at request time.
     * If the env var is unset, that param is silently omitted (graceful degradation).
     *
     * Examples:
     *   Single key:    envParams: { api_key: "FRED_API_KEY" }
     *   Key + email:   envParams: { key: "AQS_API_KEY", email: "AQS_EMAIL" }
     *   Bearer token:  envParams: { Authorization: "HUD_USER_TOKEN" }  (with prefix: "Bearer ")
     */
    envParams: Record<string, string>;
    /** Static params included on every authenticated request (e.g. { file_type: "json" } for FRED) */
    extraParams?: Record<string, string>;
    /** For header auth: prefix prepended to the first envParams value (e.g. "Bearer ") */
    prefix?: string;
  };

  /** Rate limiting */
  rateLimit?: { perSecond: number; burst: number };

  /** Default headers on every request (e.g. User-Agent for SEC) */
  defaultHeaders?: Record<string, string>;

  /** Cache TTL in ms (default: 5 min). Government data often updates daily/weekly — set
   *  higher for infrequent data: 1 hour = 3_600_000, 1 day = 86_400_000. Set 0 to disable. */
  cacheTtlMs?: number;

  /** Timeout in ms (default: 30000) */
  timeoutMs?: number;

  /** Max retries for transient errors (429, 502, 503, 504). Default: 2.
   *  Increase for notoriously flaky upstream APIs (e.g. FBI CDE). */
  maxRetries?: number;

  /** Custom error detector — some APIs return 200 OK with errors in the body */
  checkError?: (data: unknown) => string | null;

  /** Treat successful empty/204 bodies as null instead of a JSON parse error. */
  emptyBodyAsNull?: boolean;
}

/** Param values: string, number, string[] (for repeated keys like facets[series][]), or undefined to skip */
export type ParamValue = string | number | string[] | undefined;
export type Params = Record<string, ParamValue>;

/**
 * Shorthand for building query param objects. Drops `undefined`, `null`, and `""`.
 * Booleans become `"true"`/`"false"`. Arrays pass through (for repeated keys like `facets[series][]`).
 *
 * @example
 *   const { fromDateTime, toDateTime } = opts;
 *   const params = qp({ limit: opts.limit ?? 20, fromDateTime, toDateTime });
 *
 *   // rename a key + set a default
 *   const params = qp({ limit: 50, p_zip: opts.zip, sort: opts.sort ?? "desc" });
 */
export function qp(
  obj: Record<string, string | number | boolean | string[] | undefined | null>,
): Params {
  const out: Params = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (typeof v === "boolean") { out[k] = String(v); continue; }
    out[k] = v;
  }
  return out;
}

export interface ApiClient {
  get<T = unknown>(path: string, params?: Params): Promise<T>;
  /** GET returning the raw response body as text (for non-JSON endpoints like USGS RDB). */
  getText(path: string, params?: Params): Promise<string>;
  post<T = unknown>(path: string, body?: Record<string, unknown>, params?: Params): Promise<T>;
  clearCache(): void;
}

// ─── Token Bucket Rate Limiter ───────────────────────────────────────
//
// Queue-based token bucket that guarantees:
//   - Correct rate limiting even under concurrent acquire() calls
//   - FIFO fairness: callers are served in the order they arrive
//   - No thundering-herd: a single drain loop releases waiters one at a time
//   - Batch release: if multiple tokens accumulated while sleeping, all
//     eligible waiters are released in one pass
//
// NOTE: "Token" here refers to the classic rate-limiting concept (permission
// slips for API calls), NOT LLM/AI tokens. The name follows the standard
// CS algorithm: https://en.wikipedia.org/wiki/Token_bucket

export class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  private readonly queue: Array<() => void> = [];
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly max: number, private readonly rate: number) {
    this.tokens = max;
    this.lastRefill = Date.now();
  }

  /** Refill tokens based on elapsed time since the last refill. */
  private refill(): void {
    const now = Date.now();
    this.tokens = Math.min(
      this.max,
      this.tokens + ((now - this.lastRefill) / 1000) * this.rate,
    );
    this.lastRefill = now;
  }

  /** Wait until a token is available, respecting FIFO order. */
  async acquire(): Promise<void> {
    this.refill();

    // Fast path: token available and nobody queued ahead of us
    if (this.tokens >= 1 && this.queue.length === 0) {
      this.tokens -= 1;
      return;
    }

    // Slow path: join the queue and wait for the drain loop to release us
    return new Promise<void>(resolve => {
      this.queue.push(resolve);
      this.scheduleDrain();
    });
  }

  /** Number of callers currently waiting for a token. */
  get pending(): number {
    return this.queue.length;
  }

  /** Ensure a drain timer is running to release queued callers. */
  private scheduleDrain(): void {
    if (this.timer !== null) return;

    const drain = (): void => {
      this.timer = null;
      this.refill();

      // Release as many queued callers as tokens allow
      while (this.queue.length > 0 && this.tokens >= 1) {
        this.tokens -= 1;
        this.queue.shift()!();
      }

      // Reschedule if more waiters remain
      if (this.queue.length > 0) {
        const waitMs = Math.ceil(((1 - this.tokens) / this.rate) * 1000);
        this.timer = setTimeout(drain, Math.max(waitMs, 1));
      }
    };

    const waitMs = Math.ceil(((1 - this.tokens) / this.rate) * 1000);
    this.timer = setTimeout(drain, Math.max(waitMs, 1));
  }
}

// ─── Disk-backed TTL Cache ────────────────────────────────────────────
//
// Single consolidated JSON file shared by all modules. Lazy-loaded on
// first cache miss. LRU eviction per module keeps memory bounded.
// Async writes don't block the event loop. Global write coalescing
// batches all module updates into one disk write.

function getCacheDir(): string {
  const base = process.env.XDG_CACHE_HOME || join(homedir(), ".cache");
  const dir = join(base, "fedpipe");
  try {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    return dir;
  } catch {
    const fallback = join(tmpdir(), "fedpipe");
    if (!existsSync(fallback)) mkdirSync(fallback, { recursive: true });
    return fallback;
  }
}

const CACHE_DIR = getCacheDir();
const CACHE_FILE = join(CACHE_DIR, "cache.json");
const MAX_ENTRIES_PER_MODULE = 200;

interface CacheEntry { data: unknown; expires: number; lastAccess: number; volatile?: boolean; }

/**
 * Entries whose serialized payload exceeds this stay in-memory only — still
 * cached for the session, but never written to cache.json. Without the cap a
 * few multi-MB responses (World Bank's full indicator catalog, FRED's
 * category tree) balloon the store to 80MB+, making every debounced flush
 * re-serialize it all on the event loop.
 */
const MAX_PERSISTED_ENTRY_BYTES = Number(process.env.FEDPIPE_CACHE_MAX_ENTRY_BYTES ?? 2_000_000);

// ─── Global disk store (shared by all DiskCache instances) ───────────

let _globalLoaded = false;
let _globalDirty = false;
let _globalWriteTimer: ReturnType<typeof setTimeout> | undefined;

/** namespace → key → entry */
const _globalStore = new Map<string, Map<string, CacheEntry>>();

function loadGlobal(): void {
  if (_globalLoaded) return;
  _globalLoaded = true;
  try {
    if (!existsSync(CACHE_FILE)) {
      // Migrate: try loading legacy per-module files
      migrateLegacyFiles();
      return;
    }
    const raw = JSON.parse(readFileSync(CACHE_FILE, "utf-8")) as Record<string, Record<string, CacheEntry>>;
    const now = Date.now();
    let totalLoaded = 0;
    for (const [ns, entries] of Object.entries(raw)) {
      const map = new Map<string, CacheEntry>();
      for (const [key, entry] of Object.entries(entries)) {
        if (entry.expires > now) {
          map.set(key, entry);
          totalLoaded++;
        }
      }
      if (map.size > 0) _globalStore.set(ns, map);
    }
    if (totalLoaded > 0 && process.env.DEBUG_CACHE) {
      console.error(`Cache: loaded ${totalLoaded} entries from disk (${_globalStore.size} modules)`);
    }
  } catch {
    // Corrupted — start fresh
  }
}

/** One-time migration from the old per-module *.json files to the consolidated cache.json */
function migrateLegacyFiles(): void {
  try {
    const { readdirSync, unlinkSync } = require("node:fs") as typeof import("node:fs");
    const files = readdirSync(CACHE_DIR).filter((f: string) => f.endsWith(".json") && f !== "cache.json");
    if (files.length === 0) return;

    const now = Date.now();
    let migrated = 0;
    for (const file of files) {
      try {
        const ns = file.replace(/\.json$/, "");
        const raw = JSON.parse(readFileSync(join(CACHE_DIR, file), "utf-8")) as Record<string, CacheEntry>;
        const map = new Map<string, CacheEntry>();
        for (const [key, entry] of Object.entries(raw)) {
          if (entry.expires > now) {
            // Add lastAccess if missing (legacy entries don't have it)
            if (!entry.lastAccess) entry.lastAccess = now;
            map.set(key, entry);
            migrated++;
          }
        }
        if (map.size > 0) _globalStore.set(ns, map);
        unlinkSync(join(CACHE_DIR, file)); // Remove legacy file
      } catch {
        // Skip corrupt file
      }
    }
    if (migrated > 0) {
      _globalDirty = true;
      scheduleGlobalWrite();
      if (process.env.DEBUG_CACHE) {
        console.error(`Cache: migrated ${migrated} entries from ${files.length} legacy files`);
      }
    }
  } catch {
    // Migration is best-effort
  }
}

let _exitFlushRegistered = false;

/** Synchronous flush for process exit — the debounced timer is unref'd and
 * dies with the process, which silently lost every response cached in a
 * session's final 2 seconds (short MCP sessions never warmed the cache). */

/** Merge our in-memory entries over what's currently on disk — two concurrent
 * server processes (Claude Desktop + VS Code) otherwise clobber each other's
 * cache with last-writer-wins over the whole file. */
function mergedCacheObject(now: number): Record<string, Record<string, CacheEntry>> {
  let base: Record<string, Record<string, CacheEntry>> = {};
  try {
    if (existsSync(CACHE_FILE)) {
      const disk = JSON.parse(readFileSync(CACHE_FILE, "utf-8")) as Record<string, Record<string, CacheEntry>>;
      for (const [ns, entries] of Object.entries(disk)) {
        const keep: Record<string, CacheEntry> = {};
        for (const [k, e] of Object.entries(entries)) if (e.expires > now) keep[k] = e;
        if (Object.keys(keep).length) base[ns] = keep;
      }
    }
  } catch { base = {}; }
  for (const [ns, map] of _globalStore) {
    const entries: Record<string, CacheEntry> = base[ns] ?? {};
    for (const [key, entry] of map) {
      if (entry.expires > now && !entry.volatile) entries[key] = entry;
    }
    if (Object.keys(entries).length > 0) base[ns] = entries;
    else delete base[ns];
  }
  return base;
}

function flushGlobalSync(): void {
  if (!_globalDirty) return;
  _globalDirty = false;
  try {
    mkdirSync(dirname(CACHE_FILE), { recursive: true });
    // Write-then-rename: a crash mid-write must not corrupt the cache file.
    const tmp = `${CACHE_FILE}.${process.pid}.tmp`;
    writeFileSync(tmp, JSON.stringify(mergedCacheObject(Date.now())), "utf-8");
    renameSync(tmp, CACHE_FILE);
  } catch { /* best effort */ }
}

function scheduleGlobalWrite(): void {
  if (!_exitFlushRegistered) {
    _exitFlushRegistered = true;
    process.on("exit", flushGlobalSync);
    for (const sig of ["SIGINT", "SIGTERM"] as const) {
      process.on(sig, () => { flushGlobalSync(); process.exit(sig === "SIGINT" ? 130 : 143); });
    }
  }
  if (_globalWriteTimer) return;
  _globalWriteTimer = setTimeout(() => {
    _globalWriteTimer = undefined;
    if (!_globalDirty) return;
    _globalDirty = false;
    // Async write-then-rename — non-blocking, atomic, merged over the
    // on-disk state so concurrent server processes don't clobber each other.
    const tmp = `${CACHE_FILE}.${process.pid}.tmp`;
    writeFile(tmp, JSON.stringify(mergedCacheObject(Date.now())), "utf-8")
      .then(() => rename(tmp, CACHE_FILE))
      .catch(() => {});
  }, 2000);
  if (typeof _globalWriteTimer === "object" && "unref" in _globalWriteTimer) {
    _globalWriteTimer.unref();
  }
}

// ─── Per-module cache interface ──────────────────────────────────────

class DiskCache {
  private ns: string;
  private ttlMs: number;

  constructor(ttlMs: number, name: string) {
    this.ttlMs = ttlMs;
    this.ns = name;
  }

  private getMap(): Map<string, CacheEntry> {
    loadGlobal(); // Lazy — only reads disk on first access
    let map = _globalStore.get(this.ns);
    if (!map) {
      map = new Map();
      _globalStore.set(this.ns, map);
    }
    return map;
  }

  get(key: string): unknown | undefined {
    const map = this.getMap();
    const entry = map.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expires) {
      map.delete(key);
      _globalDirty = true;
      scheduleGlobalWrite();
      return undefined;
    }
    // Update last access for LRU
    entry.lastAccess = Date.now();
    return entry.data;
  }

  set(key: string, data: unknown): void {
    if (this.ttlMs <= 0) return;
    const map = this.getMap();

    // LRU eviction if at capacity
    if (map.size >= MAX_ENTRIES_PER_MODULE && !map.has(key)) {
      let oldestKey: string | undefined;
      let oldestAccess = Infinity;
      for (const [k, e] of map) {
        const access = e.lastAccess ?? e.expires - this.ttlMs;
        if (access < oldestAccess) {
          oldestAccess = access;
          oldestKey = k;
        }
      }
      if (oldestKey) map.delete(oldestKey);
    }

    const now = Date.now();
    let volatile = false;
    try {
      volatile = JSON.stringify(data).length > MAX_PERSISTED_ENTRY_BYTES;
    } catch {
      volatile = true; // unserializable — keep off disk
    }
    map.set(key, { data, expires: now + this.ttlMs, lastAccess: now, volatile });
    if (!volatile) {
      _globalDirty = true;
      scheduleGlobalWrite();
    }
  }

  clear(): void {
    _globalStore.delete(this.ns);
    _globalDirty = true;
    scheduleGlobalWrite();
  }

  get size(): number {
    const map = _globalStore.get(this.ns);
    if (!map) return 0;
    const now = Date.now();
    let count = 0;
    for (const entry of map.values()) {
      if (now <= entry.expires) count++;
    }
    return count;
  }
}

// ─── Fetch with timeout ──────────────────────────────────────────────


/** Max response body we will buffer — a broken/runaway upstream must not
 * OOM the server. Big legit payloads (WB catalog ~20MB) fit comfortably. */
const MAX_BODY_BYTES = Number(process.env.FEDPIPE_MAX_BODY_BYTES ?? 64 * 1024 * 1024);

/** Read a response body with a deadline and a size cap — the fetch abort
 * timer stops at headers, so a stalled or unbounded body would otherwise
 * hang the call or exhaust memory. */
async function textWithTimeout(res: Response, timeoutMs: number, name: string): Promise<string> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const read = (async () => {
    if (!res.body) return res.text();
    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        reader.cancel().catch(() => {});
        throw new Error(`${name}: response body exceeded ${Math.round(MAX_BODY_BYTES / 1e6)}MB — refusing to buffer it`);
      }
      chunks.push(value);
    }
    return Buffer.concat(chunks).toString("utf-8");
  })();
  try {
    return await Promise.race([
      read,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${name}: body read timed out after ${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

async function fetchTimeout(url: string, init: RequestInit | undefined, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ─── Retry logic ─────────────────────────────────────────────────────

const RETRYABLE = [429, 502, 503, 504];

/**
 * Parse a `Retry-After` header value.
 * RFC 7231 allows either delta-seconds (an integer) or an HTTP-date.
 * Returns the wait time in ms, or null if the header is absent/unparseable.
 */
function parseRetryAfter(header: string | null): number | null {
  if (!header) return null;
  const trimmed = header.trim();
  // Delta-seconds form
  if (/^\d+$/.test(trimmed)) {
    return parseInt(trimmed, 10) * 1000;
  }
  // HTTP-date form (e.g. "Wed, 21 Oct 2026 07:28:00 GMT")
  const dateMs = Date.parse(trimmed);
  if (!isNaN(dateMs)) {
    return Math.max(0, dateMs - Date.now());
  }
  return null;
}

/** Exponential backoff with full jitter; prevents synchronized retry stampedes. */
function backoffDelay(attempt: number): number {
  const base = 1000 * 2 ** attempt;
  return Math.floor(base * (0.5 + Math.random() * 0.5));
}

async function fetchRetry(
  url: string,
  init: RequestInit | undefined,
  timeoutMs: number,
  limiter: TokenBucket,
  name: string,
  maxRetries = 2,
): Promise<Response> {
  let lastErr: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    await limiter.acquire();
    try {
      const res = await fetchTimeout(url, init, timeoutMs);
      if (RETRYABLE.includes(res.status) && attempt < maxRetries) {
        const retryAfterMs = parseRetryAfter(res.headers.get("Retry-After"));
        const delay = retryAfterMs ?? backoffDelay(attempt);
        console.error(`${name}: HTTP ${res.status}, retry in ${delay}ms (${attempt + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      return res;
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
      // Offline replay stubs fetch with this sentinel — retrying it just
      // burns backoff sleeps.
      if (lastErr.message.includes("OFFLINE_REPLAY_MISS")) throw lastErr;
      if (attempt < maxRetries) {
        const delay = backoffDelay(attempt);
        console.error(`${name}: ${lastErr.message}, retry in ${delay}ms (${attempt + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  throw lastErr ?? new Error("Request failed");
}

/** Truncate body text to a manageable size for inclusion in error messages. */
function truncateBody(body: string, max = 300): string {
  if (body.length <= max) return body;
  return body.slice(0, max) + `… (truncated, ${body.length} chars total)`;
}

// ─── Client Factory ──────────────────────────────────────────────────

export function createClient(config: ClientConfig): ApiClient {
  const {
    baseUrl, name, auth, defaultHeaders = {},
    cacheTtlMs = 5 * 60 * 1000,
    timeoutMs = 30_000,
    maxRetries: configMaxRetries = 2,
    checkError,
    emptyBodyAsNull = false,
  } = config;

  const rl = config.rateLimit ?? { perSecond: 5, burst: 10 };
  const limiter = new TokenBucket(rl.burst, rl.perSecond);
  const cache = new DiskCache(cacheTtlMs, name);

  /** Resolve all env-backed auth params. Returns empty record if none are set. */
  function resolveAuthParams(): Record<string, string> {
    if (!auth) return {};
    const resolved: Record<string, string> = {};
    const entries = Object.entries(auth.envParams);
    for (let i = 0; i < entries.length; i++) {
      const [paramName, envVar] = entries[i];
      const val = process.env[envVar];
      if (!val) continue;
      // Apply prefix to the first entry only (e.g. "Bearer " for Authorization header)
      resolved[paramName] = (i === 0 && auth.prefix ? auth.prefix : "") + val;
    }
    return resolved;
  }

  /** True if all required auth credentials are available in env. */
  function hasAuth(): boolean {
    if (!auth) return false;
    return Object.values(auth.envParams).every((ev) => !!process.env[ev]);
  }

  function buildUrl(path: string, params?: Params): string {
    const parts: string[] = [];

    // Auth via query param
    if (auth?.type === "query") {
      for (const [k, v] of Object.entries(resolveAuthParams())) {
        parts.push(`${k}=${encodeURIComponent(v)}`);
      }
      if (auth.extraParams) {
        for (const [k, v] of Object.entries(auth.extraParams)) parts.push(`${k}=${encodeURIComponent(v)}`);
      }
    }

    // User params — supports string, number, and string[] (repeated keys)
    // Keys are NOT encoded — preserves bracket syntax like page[number], facets[series][]
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === "") continue;
        if (Array.isArray(v)) {
          for (const item of v) parts.push(`${k}=${encodeURIComponent(String(item))}`);
        } else {
          parts.push(`${k}=${encodeURIComponent(String(v))}`);
        }
      }
    }

    const p = path.startsWith("/") ? path : `/${path}`;
    return parts.length ? `${baseUrl}${p}?${parts.join("&")}` : `${baseUrl}${p}`;
  }

  function buildHeaders(extra?: Record<string, string>): Record<string, string> {
    const h: Record<string, string> = { ...defaultHeaders, ...extra };
    if (auth?.type === "header") {
      Object.assign(h, resolveAuthParams());
    }
    return h;
  }

  async function request<T>(url: string, init?: RequestInit, responseType: "json" | "text" = "json"): Promise<T> {
    // Check cache (keyed by URL + body + response type so JSON and text never collide)
    const cacheKey = `${url}|${init?.body ?? ""}|${responseType}`;
    const cached = cache.get(cacheKey);
    if (cached !== undefined) return cached as T;

    const res = await fetchRetry(url, init, timeoutMs, limiter, name, configMaxRetries);

    if (!res.ok) {
      const body = await textWithTimeout(res, timeoutMs, name);

      // Friendly error for auth failures when no credentials are configured
      // 400 included: query-param-auth APIs (EPA AQS) report missing key/email as a 400.
      if ((res.status === 400 || res.status === 401 || res.status === 403) && auth && !hasAuth()) {
        const envVars = Object.values(auth.envParams).join(", ");
        throw new Error(
          `${name}: API key required (HTTP ${res.status}). ` +
          `Set the ${envVars} environment variable(s) in your .env file or MCP config.`,
        );
      }

      throw new Error(`${name}: HTTP ${res.status} — ${truncateBody(body || res.statusText)}`);
    }

    if (responseType === "text") {
      const text = await textWithTimeout(res, timeoutMs, name);
      cache.set(cacheKey, text);
      return text as T;
    }

    let data: unknown;
    const raw = await textWithTimeout(res, timeoutMs, name);
    if (emptyBodyAsNull && (res.status === 204 || raw.trim() === "")) {
      // DOL returns a bare 204 when a filter matches nothing. Treat that, or
      // any successful empty body, as no rows rather than a JSON parse error.
      cache.set(cacheKey, null);
      return null as T;
    }
    try {
      data = JSON.parse(raw);
    } catch {
      // Some APIs (BEA) answer HTTP 200 with an empty or non-JSON body when
      // the key is missing — surface what happened instead of a bare
      // "Unexpected end of JSON input".
      const keyHint = auth && !hasAuth()
        ? ` Note: ${Object.values(auth.envParams).join(", ")} is not set in env — this API likely requires it.`
        : "";
      throw new Error(`${name}: HTTP ${res.status} but the body is not valid JSON (${raw.length} bytes).${keyHint} Body: ${truncateBody(raw) || "(empty)"}`);
    }

    // Check for API-level errors in body
    if (checkError) {
      const err = checkError(data);
      if (err) throw new Error(`${name}: ${err}`);
    }

    cache.set(cacheKey, data);
    return data as T;
  }

  return {
    async get<T = unknown>(path: string, params?: Params): Promise<T> {
      const url = buildUrl(path, params);
      const headers = buildHeaders();
      return request<T>(url, Object.keys(headers).length ? { headers } : undefined);
    },

    async getText(path: string, params?: Params): Promise<string> {
      const url = buildUrl(path, params);
      const headers = buildHeaders();
      return request<string>(url, Object.keys(headers).length ? { headers } : undefined, "text");
    },

    async post<T = unknown>(
      path: string,
      body?: Record<string, unknown>,
      params?: Params,
    ): Promise<T> {
      const url = buildUrl(path, params);
      const headers = buildHeaders({ "Content-Type": "application/json" });

      // Auth via body (e.g. BLS)
      const finalBody = { ...body };
      if (auth?.type === "body") {
        const resolved = resolveAuthParams();
        if (Object.keys(resolved).length) {
          Object.assign(finalBody, resolved);
          if (auth.extraParams) Object.assign(finalBody, auth.extraParams);
        }
      }

      return request<T>(url, {
        method: "POST",
        headers,
        body: JSON.stringify(finalBody),
      });
    },

    clearCache() { cache.clear(); },
  };
}
