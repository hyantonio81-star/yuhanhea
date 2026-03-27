import { signedWebhookHeaders } from './webhookSignature.js'

export function fireReminderWebhook(event: unknown): void {
  const url = process.env.REMINDER_WEBHOOK_URL?.trim()
  if (!url) return
  const body = JSON.stringify(event)
  void fetch(url, {
    method: 'POST',
    headers: signedWebhookHeaders(body),
    body,
  }).catch(() => {})
}
