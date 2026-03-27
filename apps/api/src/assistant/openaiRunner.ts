import { executeTool, OPENAI_TOOL_DEFINITIONS } from './tools.js'
import { maybeQueueToolResult } from './toolApprovalQueue.js'

const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini'

export async function runOpenAIAssistant(params: {
  messages: { role: string; content: string }[]
  tenant_id: string
  trace_id?: string
}): Promise<{ reply: string; tool_calls: { tool: string; approval_required: boolean }[] }> {
  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY missing')
  }

  const systemContent = `You are Yuhan Suite marketing assistant. Only use provided tools. Respond in Korean when the user writes in Korean. For tools that change campaigns, video jobs, or reminders, approval may be required—mention that briefly.`

  const messages: Record<string, unknown>[] = [
    { role: 'system', content: systemContent },
    ...params.messages.map((m) => ({ role: m.role, content: m.content })),
  ]

  const tool_calls: { tool: string; approval_required: boolean }[] = []

  for (let round = 0; round < 4; round++) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        tools: OPENAI_TOOL_DEFINITIONS,
        tool_choice: 'auto',
        temperature: 0.3,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`OpenAI ${res.status}: ${errText.slice(0, 240)}`)
    }

    const data = (await res.json()) as {
      choices?: {
        message?: {
          content?: string | null
          tool_calls?: { id: string; function: { name: string; arguments: string } }[]
        }
      }[]
    }

    const choice = data.choices?.[0]?.message
    if (!choice) {
      return { reply: '응답을 생성하지 못했습니다.', tool_calls }
    }

    const tcalls = choice.tool_calls
    if (tcalls?.length) {
      messages.push({
        role: 'assistant',
        content: choice.content ?? null,
        tool_calls: tcalls.map((tc) => ({
          id: tc.id,
          type: 'function',
          function: { name: tc.function.name, arguments: tc.function.arguments },
        })),
      })

      for (const tc of tcalls) {
        let args: Record<string, unknown> = {}
        try {
          args = JSON.parse(tc.function.arguments || '{}') as Record<string, unknown>
        } catch {
          args = {}
        }
        let exec = executeTool(tc.function.name, args, params.tenant_id)
        exec = maybeQueueToolResult(exec, {
          tenant_id: params.tenant_id,
          trace_id: params.trace_id,
          toolName: tc.function.name,
          args,
        })
        tool_calls.push({ tool: exec.tool, approval_required: exec.approval_required })
        messages.push({
          role: 'tool',
          tool_call_id: tc.id,
          content: JSON.stringify({ ...exec.result, _approval_required: exec.approval_required }),
        })
      }
      continue
    }

    const reply = (choice.content ?? '').trim() || '처리 완료.'
    return { reply, tool_calls }
  }

  return { reply: '도구 호출 라운드 상한에 도달했습니다.', tool_calls }
}
