import { runGeminiAssistant } from './geminiRunner.js'
import { heuristicAssistant } from './heuristicStub.js'
import { runOpenAIAssistant } from './openaiRunner.js'

export type AssistantToolCall = { tool: string; approval_required: boolean }

export type AssistantMode = 'gemini' | 'openai' | 'heuristic'

export async function runAssistantSession(input: {
  messages: { role: string; content: string }[]
  tenant_id: string
  trace_id?: string
}): Promise<{ reply: string; tool_calls: AssistantToolCall[]; mode: AssistantMode }> {
  const lastUser = [...input.messages].reverse().find((m) => m.role === 'user')?.content ?? ''
  const msgs = input.messages.filter((m) => m.role === 'user' || m.role === 'assistant')

  if (process.env.GEMINI_API_KEY?.trim()) {
    try {
      const r = await runGeminiAssistant({
        messages: msgs,
        tenant_id: input.tenant_id,
        trace_id: input.trace_id,
      })
      return { ...r, mode: 'gemini' }
    } catch {
      if (process.env.OPENAI_API_KEY?.trim()) {
        try {
          const r = await runOpenAIAssistant({ messages: msgs, tenant_id: input.tenant_id, trace_id: input.trace_id })
          return {
            reply: `${r.reply} (Gemini 실패로 OpenAI 대체)`,
            tool_calls: r.tool_calls,
            mode: 'openai',
          }
        } catch {
          /* fall through */
        }
      }
      const h = heuristicAssistant(lastUser)
      return {
        reply: `${h.reply} (Gemini 실패로 휴리스틱 대체)`,
        tool_calls: h.tool_calls.map((t) => ({ tool: t.tool, approval_required: t.approval_required })),
        mode: 'heuristic',
      }
    }
  }

  if (process.env.OPENAI_API_KEY?.trim()) {
    try {
      const r = await runOpenAIAssistant({ messages: msgs, tenant_id: input.tenant_id, trace_id: input.trace_id })
      return { ...r, mode: 'openai' }
    } catch {
      const h = heuristicAssistant(lastUser)
      return {
        reply: `${h.reply} (OpenAI 호출 실패로 휴리스틱 대체)`,
        tool_calls: h.tool_calls.map((t) => ({ tool: t.tool, approval_required: t.approval_required })),
        mode: 'heuristic',
      }
    }
  }

  const h = heuristicAssistant(lastUser)
  return {
    reply: h.reply,
    tool_calls: h.tool_calls.map((t) => ({ tool: t.tool, approval_required: t.approval_required })),
    mode: 'heuristic',
  }
}
