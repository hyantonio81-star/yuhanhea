import type { ToolCallResult } from './tools.js'
import { highRiskToolNames, toolApprovalQueueEnabled } from './toolApprovalEnv.js'
import { insertToolApproval } from '../store/toolApprovalStore.js'

/** 고위험 도구 + 큐 활성화 시 DB에 넣고 응답에 approval_id 부여 */
export function maybeQueueToolResult(
  exec: ToolCallResult,
  ctx: { tenant_id: string; trace_id?: string; toolName: string; args: Record<string, unknown> },
): ToolCallResult {
  if (!toolApprovalQueueEnabled() || !exec.approval_required || !highRiskToolNames().has(ctx.toolName)) {
    return exec
  }
  const id = insertToolApproval({
    tenant_id: ctx.tenant_id,
    trace_id: ctx.trace_id,
    tool_name: ctx.toolName,
    args_json: JSON.stringify(ctx.args),
  })
  if (id == null) return exec
  return {
    ...exec,
    result: {
      ...exec.result,
      approval_id: id,
      status: 'queued_for_human_approval',
    },
  }
}
