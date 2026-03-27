/** 한 줄 JSON — 로그 수집기에서 `trace_id`·`audit_id`로 필터 */
export function suiteLog(
  level: 'info' | 'warn' | 'error',
  msg: string,
  fields: Record<string, unknown>,
): void {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    msg,
    service: 'yuhan-suite-bff',
    ...fields,
  })
  if (level === 'error') console.error(line)
  else console.log(line)
}
