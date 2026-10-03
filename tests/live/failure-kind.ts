/** Describe observed failures without assigning an unverified root cause. */
export function failureKind(message: string): { kind: string; maxExtra: number } {
  if (/daily threshold|daily limit|quota/i.test(message)) {
    return { kind: "QUOTA EXHAUSTED (check key and service limits)", maxExtra: 0 };
  }
  const status = /HTTP (\d{3})/.exec(message)?.[1];
  if (status) {
    if (status.startsWith("5")) return { kind: `HTTP ${status} (server error)`, maxExtra: 2 };
    if (status === "429") return { kind: "HTTP 429 (rate limit)", maxExtra: 0 };
    if (status === "401" || status === "403") return { kind: `HTTP ${status} (access denied; investigate auth or service policy)`, maxExtra: 0 };
    if (status.startsWith("4")) return { kind: `HTTP ${status} (request rejected; investigate request and endpoint)`, maxExtra: 0 };
    return { kind: `RESPONSE FORMAT (HTTP ${status})`, maxExtra: 2 };
  }
  if (/abort|timeout|timed out/i.test(message)) return { kind: "TIMEOUT (cause unconfirmed)", maxExtra: 1 };
  if (/fetch failed|ENOTFOUND|ECONNRE|EAI_AGAIN/i.test(message)) return { kind: "NETWORK/DNS (cause unconfirmed)", maxExtra: 2 };
  return { kind: "THREW", maxExtra: 0 };
}
