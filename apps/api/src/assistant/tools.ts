/**
 * OpenAI 호환 tool 정의(레거시) + 서버 도구 실행기.
 * Gemini는 `geminiRunner`에 별도 선언. 고위험 도구는 approval_required: true.
 */

export type ToolCallResult = {
  tool: string
  approval_required: boolean
  result: Record<string, unknown>
}

export const OPENAI_TOOL_DEFINITIONS = [
  {
    type: 'function' as const,
    function: {
      name: 'crm_get_visits',
      description: '지정 연락처의 방문 기록을 조회합니다.',
      parameters: {
        type: 'object',
        properties: {
          contact_id: { type: 'string' },
          from: { type: 'string', description: 'ISO8601' },
          to: { type: 'string', description: 'ISO8601' },
        },
        required: ['contact_id', 'from', 'to'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'crm_get_local_insights',
      description: '로컬 시장 요약 인사이트를 가져옵니다.',
      parameters: {
        type: 'object',
        properties: {
          local_market_id: { type: 'string' },
        },
        required: ['local_market_id'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'mkt_schedule_campaign',
      description: '캠페인 슬롯 예약(관리자 승인 필요).',
      parameters: {
        type: 'object',
        properties: {
          campaign_id: { type: 'string' },
          slot: { type: 'string' },
        },
        required: ['campaign_id', 'slot'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'mart_create_video_job',
      description: 'Mart에 영상 작업 생성(관리자 승인 필요).',
      parameters: {
        type: 'object',
        properties: {
          campaign_id: { type: 'string' },
          brief_json: { type: 'object', additionalProperties: true },
        },
        required: ['campaign_id'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'crm_schedule_reminder',
      description: '옵트인 연락처에 리마인더 예약(사용자 확인 권장).',
      parameters: {
        type: 'object',
        properties: {
          contact_id: { type: 'string' },
          fire_at: { type: 'string' },
          channel: { type: 'string', enum: ['push', 'sms', 'email'] },
        },
        required: ['contact_id', 'fire_at', 'channel'],
      },
    },
  },
]

export function executeTool(name: string, args: Record<string, unknown>, tenant_id: string): ToolCallResult {
  switch (name) {
    case 'crm_get_visits':
      return {
        tool: name,
        approval_required: false,
        result: {
          contact_id: args.contact_id,
          visits: [
            { at: '2026-03-20T14:00:00Z', store_id: 'st_01', note: '데모 방문' },
          ],
        },
      }
    case 'crm_get_local_insights': {
      const id = String(args.local_market_id ?? '')
      const summary =
        id.includes('demo_02') || id === 'lmk_demo_02'
          ? '경쟁사 가격 인하 감지'
          : '주말 프로모션 여유 재고 약 12%'
      return {
        tool: name,
        approval_required: false,
        result: { local_market_id: id, tenant_id, summary },
      }
    }
    case 'mkt_schedule_campaign':
      return {
        tool: name,
        approval_required: true,
        result: { campaign_id: args.campaign_id, slot: args.slot, status: 'pending_approval' },
      }
    case 'mart_create_video_job': {
      let brief = args.brief_json
      if (typeof brief === 'string' && brief.trim()) {
        try {
          brief = JSON.parse(brief) as Record<string, unknown>
        } catch {
          brief = {}
        }
      }
      return {
        tool: name,
        approval_required: true,
        result: { campaign_id: args.campaign_id, brief_json: brief ?? {}, status: 'pending_approval', video_job_id: null },
      }
    }
    case 'crm_schedule_reminder':
      return {
        tool: name,
        approval_required: true,
        result: {
          contact_id: args.contact_id,
          fire_at: args.fire_at,
          channel: args.channel,
          status: 'needs_user_confirm',
        },
      }
    default:
      return {
        tool: name,
        approval_required: false,
        result: { error: 'unknown_tool' },
      }
  }
}
