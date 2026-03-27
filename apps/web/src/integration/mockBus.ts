/**
 * 브라우저 데모용 in-memory 이벤트 버스.
 * 프로덕션에서는 RabbitMQ / SNS / PubSub 등으로 교체.
 */
import type { SuiteEvent } from './events'

type Handler = (e: SuiteEvent) => void

const handlers: Handler[] = []

export function subscribeSuiteEvents(handler: Handler): () => void {
  handlers.push(handler)
  return () => {
    const i = handlers.indexOf(handler)
    if (i >= 0) handlers.splice(i, 1)
  }
}

export function publishSuiteEvent(event: SuiteEvent): void {
  for (const h of handlers) {
    try {
      h(event)
    } catch {
      /* demo */
    }
  }
}
