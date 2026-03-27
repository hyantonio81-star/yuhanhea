export function toolApprovalQueueEnabled(): boolean {
  const v = process.env.ASSISTANT_TOOL_APPROVAL_QUEUE?.trim()
  return v === '1' || v === 'true'
}

export function highRiskToolNames(): Set<string> {
  const s =
    process.env.ASSISTANT_TOOL_APPROVAL_QUEUE_TOOLS?.trim() ??
    'mkt_schedule_campaign,mart_create_video_job,crm_schedule_reminder'
  return new Set(s.split(',').map((x) => x.trim()).filter(Boolean))
}
