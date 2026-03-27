import {
  FunctionCallingMode,
  GoogleGenerativeAI,
  SchemaType,
} from '@google/generative-ai'
import type { Content, FunctionDeclaration } from '@google/generative-ai'
import { executeTool } from './tools.js'
import { maybeQueueToolResult } from './toolApprovalQueue.js'

const MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash'

/** Gemini `FunctionDeclaration.parameters` 스키마 */
const DECLARATIONS: FunctionDeclaration[] = [
  {
    name: 'crm_get_visits',
    description: '지정 연락처의 방문 기록을 조회합니다.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        contact_id: { type: SchemaType.STRING },
        from: { type: SchemaType.STRING, description: 'ISO8601' },
        to: { type: SchemaType.STRING, description: 'ISO8601' },
      },
      required: ['contact_id', 'from', 'to'],
    },
  },
  {
    name: 'crm_get_local_insights',
    description: '로컬 시장 요약 인사이트를 가져옵니다.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        local_market_id: { type: SchemaType.STRING },
      },
      required: ['local_market_id'],
    },
  },
  {
    name: 'mkt_schedule_campaign',
    description: '캠페인 슬롯 예약(관리자 승인 필요).',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        campaign_id: { type: SchemaType.STRING },
        slot: { type: SchemaType.STRING },
      },
      required: ['campaign_id', 'slot'],
    },
  },
  {
    name: 'mart_create_video_job',
    description: 'Mart에 영상 작업 생성(관리자 승인 필요).',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        campaign_id: { type: SchemaType.STRING },
        brief_json: {
          type: SchemaType.STRING,
          description: '선택. brief 필드를 JSON 문자열로',
        },
      },
      required: ['campaign_id'],
    },
  },
  {
    name: 'crm_schedule_reminder',
    description: '옵트인 연락처에 리마인더 예약(사용자 확인 권장).',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        contact_id: { type: SchemaType.STRING },
        fire_at: { type: SchemaType.STRING },
        channel: {
          type: SchemaType.STRING,
          format: 'enum',
          enum: ['push', 'sms', 'email'],
        },
      },
      required: ['contact_id', 'fire_at', 'channel'],
    },
  },
]

function normalizeArgs(name: string, args: Record<string, unknown>): Record<string, unknown> {
  if (name !== 'mart_create_video_job') return args
  const b = args.brief_json
  if (typeof b === 'string' && b.trim()) {
    try {
      return { ...args, brief_json: JSON.parse(b) as Record<string, unknown> }
    } catch {
      return { ...args, brief_json: {} }
    }
  }
  return args
}

export async function runGeminiAssistant(params: {
  messages: { role: string; content: string }[]
  tenant_id: string
  trace_id?: string
}): Promise<{ reply: string; tool_calls: { tool: string; approval_required: boolean }[] }> {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY missing')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction:
      'You are Yuhan Suite marketing assistant. Only use provided tools. Respond in Korean when the user writes in Korean. For tools that change campaigns, video jobs, or reminders, approval may be required—mention that briefly.',
  })

  const turns = params.messages.filter((m) => m.role === 'user' || m.role === 'assistant')
  const history: Content[] = []
  for (let i = 0; i < Math.max(0, turns.length - 1); i++) {
    const m = turns[i]!
    if (m.role === 'user') {
      history.push({ role: 'user', parts: [{ text: m.content }] })
    } else {
      history.push({ role: 'model', parts: [{ text: m.content }] })
    }
  }

  const lastUser = turns.filter((m) => m.role === 'user').at(-1)?.content ?? ''
  if (!lastUser.trim()) {
    return { reply: '메시지가 비어 있습니다.', tool_calls: [] }
  }

  const chat = model.startChat({
    history,
    tools: [{ functionDeclarations: DECLARATIONS }],
    toolConfig: {
      functionCallingConfig: { mode: FunctionCallingMode.AUTO },
    },
  })

  const tool_calls: { tool: string; approval_required: boolean }[] = []
  let result = await chat.sendMessage(lastUser)

  for (let round = 0; round < 6; round++) {
    const response = result.response
    const calls = response.functionCalls()
    if (!calls?.length) {
      const text = response.text()
      return { reply: text.trim() || '처리 완료.', tool_calls }
    }

    const parts: { functionResponse: { name: string; response: object } }[] = []
    for (const call of calls) {
      const raw = (call.args ?? {}) as Record<string, unknown>
      const args = normalizeArgs(call.name, raw)
      let exec = executeTool(call.name, args, params.tenant_id)
      exec = maybeQueueToolResult(exec, {
        tenant_id: params.tenant_id,
        trace_id: params.trace_id,
        toolName: call.name,
        args,
      })
      tool_calls.push({ tool: exec.tool, approval_required: exec.approval_required })
      parts.push({
        functionResponse: {
          name: call.name,
          response: { ...exec.result, _approval_required: exec.approval_required },
        },
      })
    }

    result = await chat.sendMessage(parts)
  }

  return { reply: '도구 호출 라운드 상한에 도달했습니다.', tool_calls }
}
