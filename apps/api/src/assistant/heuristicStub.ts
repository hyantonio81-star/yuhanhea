import type { ToolCallResult } from './tools.js'

/** API 키 없을 때: 키워드로 의도만 시뮬레이션 */
export function heuristicAssistant(lastUser: string): { reply: string; tool_calls: ToolCallResult[] } {
  const t = lastUser.toLowerCase()
  const tool_calls: ToolCallResult[] = []

  if (/리마인더|재방문|알림|reminder/.test(t)) {
    tool_calls.push({
      tool: 'crm_schedule_reminder',
      approval_required: true,
      result: {
        contact_id: 'ct_demo_01',
        fire_at: new Date(Date.now() + 86400000).toISOString(),
        channel: 'push',
        status: 'needs_user_confirm',
      },
    })
  }
  if (/인사이트|로컬|시장|경쟁/.test(t)) {
    tool_calls.push({
      tool: 'crm_get_local_insights',
      approval_required: false,
      result: { local_market_id: 'lmk_demo_01', summary: '주말 프로모션 여유 재고 약 12% (휴리스틱)' },
    })
  }
  if (/방문|visit/.test(t)) {
    tool_calls.push({
      tool: 'crm_get_visits',
      approval_required: false,
      result: { contact_id: 'ct_demo_01', visits: [] },
    })
  }
  if (/영상|video|mart/.test(t)) {
    tool_calls.push({
      tool: 'mart_create_video_job',
      approval_required: true,
      result: { campaign_id: 'cmp_demo', status: 'pending_approval' },
    })
  }
  if (/캠페인|슬롯|schedule/.test(t) && !tool_calls.some((x) => x.tool === 'mkt_schedule_campaign')) {
    tool_calls.push({
      tool: 'mkt_schedule_campaign',
      approval_required: true,
      result: { campaign_id: 'cmp_demo', slot: 'next_week', status: 'pending_approval' },
    })
  }

  if (tool_calls.length === 0) {
    return {
      reply:
        '요청을 이해했습니다. 구체적으로 연락처·일정·채널을 알려주시면 리마인더 도구를 제안할 수 있습니다. (데모: OpenAI 키를 설정하면 LLM이 도구를 자동 선택합니다.)',
      tool_calls: [],
    }
  }

  const names = tool_calls.map((x) => x.tool).join(', ')
  return {
    reply: `휴리스틱 매칭으로 다음 도구를 제안합니다: ${names}. 승인이 필요한 단계는 관리자·사용자 확인 게이트를 거칩니다.`,
    tool_calls,
  }
}
