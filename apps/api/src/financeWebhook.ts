import { signedWebhookHeaders } from './webhookSignature.js'

/** 재무 이벤트 즉시 전달(아웃박스와 별도, ERP 시뮬레이터용) */
export function fireFinanceWebhook(kind: string, tenant_id: string, payload: unknown): void {
  const url = process.env.ERP_FINANCE_WEBHOOK_URL?.trim()
  if (!url) return
  const body = JSON.stringify({ kind, tenant_id, payload, ts: new Date().toISOString() })
  void fetch(url, {
    method: 'POST',
    headers: signedWebhookHeaders(body),
    body,
  }).catch(() => {})
}
