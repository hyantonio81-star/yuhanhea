import { signedWebhookHeaders } from './webhookSignature.js'

/**
 * SQLite 아웃박스 INSERT 직후 **선택적** 이중 기록 — SNS/Lambda/내부 버스 어댑터가 구독하는 HTTP 엔드포인트.
 * `OUTBOX_MIRROR_URL` 미설정 시 no-op. 실패는 무시(로컬 SQLite가 소스 오브 트루스).
 */
export function mirrorOutboxAppend(params: {
  outbox_id: number | undefined
  kind: string
  tenant_id: string
  payload: unknown
}): void {
  const url = process.env.OUTBOX_MIRROR_URL?.trim()
  if (!url) return
  const body = JSON.stringify({
    source: 'yuhan-suite-bff',
    outbox_id: params.outbox_id ?? null,
    kind: params.kind,
    tenant_id: params.tenant_id,
    payload: params.payload,
    ts: new Date().toISOString(),
  })
  void fetch(url, {
    method: 'POST',
    headers: signedWebhookHeaders(body),
    body,
  }).catch(() => {})
}
