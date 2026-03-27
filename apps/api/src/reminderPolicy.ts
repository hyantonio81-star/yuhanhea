/** 동일 contact + channel 최소 간격 (ms). 로컬 테스트는 `BFF_REMINDER_COOLDOWN_MS=60000` */
const COOLDOWN_MS = Number(process.env.BFF_REMINDER_COOLDOWN_MS ?? 86_400_000)

const lastScheduled = new Map<string, number>()

function key(tenant: string, contact: string, channel: string): string {
  return `${tenant}:${contact}:${channel}`
}

export function checkCooldown(tenant: string, contact: string, channel: string): { ok: true } | { ok: false; retry_after_ms: number } {
  const k = key(tenant, contact, channel)
  const prev = lastScheduled.get(k)
  const now = Date.now()
  if (prev != null && now - prev < COOLDOWN_MS) {
    return { ok: false, retry_after_ms: COOLDOWN_MS - (now - prev) }
  }
  lastScheduled.set(k, now)
  return { ok: true }
}
