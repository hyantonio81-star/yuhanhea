/** 슬라이딩 윈도우: tenant + user 기준 분당 요청 수 */

const WINDOW_MS = 60_000
const DEFAULT_MAX = Number(process.env.ASSISTANT_RATE_LIMIT_PER_MIN ?? 20)

type Bucket = { timestamps: number[] }

const buckets = new Map<string, Bucket>()

function key(tenantId: string, userId: string | undefined): string {
  return `${tenantId}:${userId ?? '_anon'}`
}

export function checkAssistantRateLimit(
  tenantId: string,
  userId: string | undefined,
): { ok: true } | { ok: false; retry_after_ms: number; limit: number } {
  const k = key(tenantId, userId)
  const now = Date.now()
  const b = buckets.get(k) ?? { timestamps: [] }
  const cutoff = now - WINDOW_MS
  b.timestamps = b.timestamps.filter((t) => t > cutoff)
  if (b.timestamps.length >= DEFAULT_MAX) {
    const oldest = b.timestamps[0]!
    const retry_after_ms = WINDOW_MS - (now - oldest)
    return { ok: false, retry_after_ms: Math.max(0, Math.ceil(retry_after_ms)), limit: DEFAULT_MAX }
  }
  b.timestamps.push(now)
  buckets.set(k, b)
  return { ok: true }
}
