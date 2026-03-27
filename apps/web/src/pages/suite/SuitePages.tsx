import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  newEventId,
  type CampaignBriefPublished,
  type MarketingSpendCommitted,
  type PayoutApproved,
  type ReminderScheduled,
  type VideoJobCompleted,
} from '../../integration/events'
import {
  approveAssistantToolApproval,
  fetchAssistantToolApprovals,
  fetchLocalMarketInsights,
  mirrorEventToDemoBus,
  patchVideoJob,
  postAssistantSession,
  postCampaignBrief,
  postCrmReminder,
  postPayout,
  postSpendCommit,
  postVideoJob,
  rejectAssistantToolApproval,
  suiteBffEnabled,
} from '../../integration/bffClient'
import { publishSuiteEvent, subscribeSuiteEvents } from '../../integration/mockBus'
import type { SuiteEvent } from '../../integration/events'

const yuai = import.meta.env.VITE_SUITE_YUAI_URL as string | undefined
const crm = import.meta.env.VITE_SUITE_CRM_URL as string | undefined
const erp = import.meta.env.VITE_SUITE_ERP_URL as string | undefined

export function SuiteYuaiHubPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Yuaimarketing (허브)</h1>
        <p className="text-on-surface-variant mt-2 text-sm leading-relaxed">
          캠페인·조직·알림의 단일 진실 공급원. 아래 환경 변수 URL이 있으면 새 탭으로 열립니다. 없으면 이 앱 내 라우트로
          연결합니다.
        </p>
      </header>
      <div className="grid gap-3">
        {yuai ? (
          <a
            href={yuai}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm font-semibold hover:border-primary/40"
          >
            <span>Yuaimarketing 프로덕션</span>
            <span className="material-symbols-outlined text-primary">open_in_new</span>
          </a>
        ) : (
          <p className="text-xs text-on-surface-variant">
            <code className="bg-surface-container-highest px-1 rounded">VITE_SUITE_YUAI_URL</code> 미설정 — 오케스트레이터로
            대체 링크.
          </p>
        )}
        <Link
          to="/orchestrator"
          className="flex items-center justify-between rounded-xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm font-semibold hover:border-primary/40"
        >
          <span>오케스트레이터 (마케팅 실행)</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
        <Link
          to="/video/ai-team"
          className="flex items-center justify-between rounded-xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm font-semibold hover:border-primary/40"
        >
          <span>Yuhan Mart — 동영상 AI 팀</span>
          <span className="material-symbols-outlined">movie</span>
        </Link>
        <Link
          to="/suite/pipeline"
          className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-semibold"
        >
          <span>통합 이벤트 파이프라인 (데모)</span>
          <span className="material-symbols-outlined text-primary">hub</span>
        </Link>
        <Link
          to="/suite/tool-approvals"
          className="flex items-center justify-between rounded-xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm font-semibold hover:border-primary/40"
        >
          <span>AI 도구 승인 큐</span>
          <span className="material-symbols-outlined">rule</span>
        </Link>
        <Link
          to="/suite/ai-security"
          className="flex items-center justify-between rounded-xl border border-outline-variant/15 bg-surface-container-low px-4 py-3 text-sm font-semibold hover:border-primary/40"
        >
          <span>AI 보안 허브 (다층 방어·업데이트 계획)</span>
          <span className="material-symbols-outlined">vaccines</span>
        </Link>
        {suiteBffEnabled() ? (
          <p className="text-xs text-on-surface-variant rounded-xl border border-outline-variant/15 bg-surface-container-low px-4 py-2">
            BFF 연결됨 (<code className="font-mono">VITE_SUITE_BFF_BASE</code>). CRM/ERP 폼은 서버로 전송 후 데모 버스에도 미러링됩니다.
          </p>
        ) : null}
      </div>
    </div>
  )
}

const ASSISTANT_TOOLS = [
  { name: 'crm_get_visits', approval: '자동', summary: 'contact_id, 기간' },
  { name: 'crm_get_local_insights', approval: '자동', summary: 'local_market_id' },
  { name: 'mkt_schedule_campaign', approval: '관리자', summary: 'campaign_id, slot' },
  { name: 'mart_create_video_job', approval: '관리자', summary: 'campaign_id, brief' },
  { name: 'crm_schedule_reminder', approval: '사용자 확인', summary: 'contact_id, fire_at, channel' },
] as const

export function SuiteCrmLocalPage() {
  const [contactId, setContactId] = useState('ct_demo_01')
  const [fireAt, setFireAt] = useState(() => new Date(Date.now() + 86400000).toISOString().slice(0, 16))
  const [channel, setChannel] = useState<ReminderScheduled['channel']>('push')
  const [insight, setInsight] = useState<{ summary: string; id: string } | null>(null)
  const [insightLoading, setInsightLoading] = useState(false)
  const [bffMsg, setBffMsg] = useState<string | null>(null)
  const [assistantInput, setAssistantInput] = useState('다음 주 재방문 리마인더 일정을 잡아줘')
  const [assistantOut, setAssistantOut] = useState<string | null>(null)

  useEffect(() => {
    if (!suiteBffEnabled()) return
    let cancelled = false
    setInsightLoading(true)
    fetchLocalMarketInsights('lmk_demo_01')
      .then((r) => {
        if (!cancelled) setInsight({ id: r.local_market_id, summary: r.summary })
      })
      .catch(() => {
        if (!cancelled) setInsight(null)
      })
      .finally(() => {
        if (!cancelled) setInsightLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const scheduleReminder = async () => {
    setBffMsg(null)
    const fireIso = new Date(fireAt).toISOString()
    if (suiteBffEnabled()) {
      try {
        const r = await postCrmReminder({
          tenant_id: 'tnt_demo',
          contact_id: contactId,
          local_market_id: 'lmk_demo_01',
          fire_at: fireIso,
          channel,
          consent_token_ref: 'consent_optin_demo',
        })
        mirrorEventToDemoBus(r.event)
        setBffMsg('BFF 수락(202). 파이프라인에 미러링됨.')
      } catch (e) {
        const err = e as Error & { status?: number; body?: { retry_after_ms?: number } }
        if (err.status === 429 && err.body?.retry_after_ms != null) {
          setBffMsg(`쿨다운: 약 ${Math.ceil(err.body.retry_after_ms / 1000)}초 후 재시도`)
        } else {
          setBffMsg(err.message || 'BFF 오류')
        }
      }
      return
    }
    const ev: ReminderScheduled = {
      type: 'ReminderScheduled',
      event_id: newEventId(),
      tenant_id: 'tnt_demo',
      contact_id: contactId,
      local_market_id: 'lmk_demo_01',
      fire_at: fireIso,
      channel,
      consent_token_ref: 'consent_optin_demo',
    }
    publishSuiteEvent(ev)
  }

  const runAssistant = async () => {
    setAssistantOut(null)
    setBffMsg(null)
    if (!suiteBffEnabled()) {
      setAssistantOut('BFF 미연결: `VITE_SUITE_BFF_BASE=/api` 로 apps/api 실행 후 사용하세요.')
      return
    }
    try {
      const r = await postAssistantSession({
        tenant_id: 'tnt_demo',
        user_id: 'usr_demo',
        messages: [{ role: 'user', content: assistantInput }],
      })
      const tools =
        r.tool_calls?.length > 0
          ? `\n도구: ${r.tool_calls.map((t) => `${t.tool}${t.approval_required ? '(승인필요)' : ''}`).join(', ')}`
          : ''
      const mode = r.mode ? `\n모드: ${r.mode}` : ''
      setAssistantOut(`[${r.audit_id}] ${r.reply}${tools}${mode}`)
    } catch (e) {
      const err = e as Error & { status?: number; body?: { retry_after_ms?: number; limit?: number } }
      if (err.status === 429 && err.body?.retry_after_ms != null) {
        setAssistantOut(
          `레이트 리밋: 약 ${Math.ceil(err.body.retry_after_ms / 1000)}초 후 재시도 (한도 ${err.body.limit ?? '?'}/분)`,
        )
      } else {
        setAssistantOut(err.message)
      }
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <header>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">로컬 CRM (오프라인)</h1>
        <p className="text-on-surface-variant mt-2 text-sm">
          지역·매장 단위 전략, 방문·동의 기반 리마인더. 상세 명세:{' '}
          <code className="text-xs bg-surface-container-highest px-1 rounded">docs/integration/crm-mobile-assistant.md</code>
        </p>
      </header>
      {crm ? (
        <a
          href={crm}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-primary font-bold text-sm"
        >
          CRM 외부 링크 열기
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </a>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-5">
          <h2 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-3">로컬 인사이트</h2>
          {suiteBffEnabled() ? (
            insightLoading ? (
              <p className="text-sm text-on-surface-variant">BFF에서 불러오는 중…</p>
            ) : insight ? (
              <p className="text-sm text-on-surface">
                <span className="font-mono text-xs text-primary">{insight.id}</span> — {insight.summary}
              </p>
            ) : (
              <p className="text-sm text-on-surface-variant">인사이트를 가져오지 못했습니다.</p>
            )
          ) : (
            <ul className="text-sm space-y-2 text-on-surface-variant">
              <li>lmk_demo_01 — 주말 프로모션 여유 재고 12%</li>
              <li>lmk_demo_02 — 경쟁사 가격 인하 감지</li>
            </ul>
          )}
        </div>
        <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-5 space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">모바일 리마인더 (데모)</h2>
          <p className="text-xs text-on-surface-variant">옵트인·쿨다운은 문서 정책 참조. 아래는 `ReminderScheduled` 발행만 시뮬레이션합니다.</p>
          <label className="block text-xs font-semibold text-on-surface">contact_id</label>
          <input
            className="w-full rounded-lg border border-outline-variant/20 bg-surface px-3 py-2 text-sm font-mono"
            value={contactId}
            onChange={(e) => setContactId(e.target.value)}
          />
          <label className="block text-xs font-semibold text-on-surface">fire_at (로컬)</label>
          <input
            type="datetime-local"
            className="w-full rounded-lg border border-outline-variant/20 bg-surface px-3 py-2 text-sm"
            value={fireAt}
            onChange={(e) => setFireAt(e.target.value)}
          />
          <label className="block text-xs font-semibold text-on-surface">channel</label>
          <select
            className="w-full rounded-lg border border-outline-variant/20 bg-surface px-3 py-2 text-sm"
            value={channel}
            onChange={(e) => setChannel(e.target.value as ReminderScheduled['channel'])}
          >
            <option value="push">push</option>
            <option value="sms">sms</option>
            <option value="email">email</option>
          </select>
          <button
            type="button"
            onClick={() => void scheduleReminder()}
            className="w-full px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:opacity-90"
          >
            ReminderScheduled 발행
          </button>
          {bffMsg ? <p className="text-xs text-on-surface-variant">{bffMsg}</p> : null}
        </div>
      </div>
      <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-5 space-y-2">
        <h2 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">AI 비서 세션 (BFF)</h2>
        <textarea
          className="w-full min-h-[72px] rounded-lg border border-outline-variant/20 bg-surface px-3 py-2 text-sm"
          value={assistantInput}
          onChange={(e) => setAssistantInput(e.target.value)}
        />
        <button
          type="button"
          onClick={() => void runAssistant()}
          className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm border border-outline-variant/20"
        >
          세션 전송 (stub)
        </button>
        {assistantOut ? <p className="text-xs text-on-surface-variant whitespace-pre-wrap">{assistantOut}</p> : null}
      </div>
      <div className="rounded-2xl border border-outline-variant/15 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-container-high">
            <tr>
              <th className="text-left p-3">AI 비서 도구</th>
              <th className="text-left p-3">승인</th>
              <th className="text-left p-3">입력 요약</th>
            </tr>
          </thead>
          <tbody>
            {ASSISTANT_TOOLS.map((t) => (
              <tr key={t.name} className="border-t border-outline-variant/10 bg-surface-container-low">
                <td className="p-3 font-mono text-xs">{t.name}</td>
                <td className="p-3 text-xs">{t.approval}</td>
                <td className="p-3 text-xs text-on-surface-variant">{t.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const COA_ROWS: [string, string, string][] = [
  ['ad_spend', '6100-광고비', 'MKT-GLOBAL-01'],
  ['production', '6200-제작비', 'MKT-PROD-02'],
  ['influencer', '6300-인플루언서', 'MKT-INF-01'],
  ['tooling', '6400-SaaS', 'OPS-SAAS-01'],
]

export function SuiteErpFinancePage() {
  const [period, setPeriod] = useState(() => new Date().toISOString().slice(0, 7))
  const [amountCents, setAmountCents] = useState('9420000')
  const [spendCategory, setSpendCategory] = useState<MarketingSpendCommitted['spend_category']>('ad_spend')
  const [departmentCode, setDepartmentCode] = useState('MKT-GLOBAL-01')
  const [bffNote, setBffNote] = useState<string | null>(null)
  const [serverLedger, setServerLedger] = useState<Record<string, unknown> | null>(null)

  const erpAdapterPreview = (): object => ({
    external_ref: { source: 'yuai', event_id: '(발행 시 채움)' },
    fiscal_period: period,
    department_code: departmentCode,
    campaign_id: 'cmp_demo',
    lines: [
      {
        coa_code: COA_ROWS.find((r) => r[0] === spendCategory)?.[1].slice(0, 4) ?? '6100',
        amount_cents: Number(amountCents) || 0,
        spend_category: spendCategory,
        tax_code_ref: 'ITBIS_18',
      },
    ],
  })

  const commitDemo = async () => {
    setBffNote(null)
    if (suiteBffEnabled()) {
      try {
        const r = await postSpendCommit({
          tenant_id: 'tnt_demo',
          period,
          amount_cents: Number(amountCents) || 0,
          spend_category: spendCategory,
          campaign_id: 'cmp_demo',
          department_code: departmentCode,
        })
        mirrorEventToDemoBus(r.event)
        setServerLedger(r.erp_ledger)
        setBffNote('BFF 수락 — ERP 어댑터 페이로드가 서버에서 생성되었습니다.')
      } catch (e) {
        setBffNote((e as Error).message)
      }
      return
    }
    const ev: MarketingSpendCommitted = {
      type: 'MarketingSpendCommitted',
      event_id: newEventId(),
      tenant_id: 'tnt_demo',
      period,
      amount_cents: Number(amountCents) || 0,
      spend_category: spendCategory,
      campaign_id: 'cmp_demo',
      department_code: departmentCode,
    }
    publishSuiteEvent(ev)
  }

  const payoutDemo = async () => {
    setBffNote(null)
    if (suiteBffEnabled()) {
      try {
        const r = await postPayout({
          tenant_id: 'tnt_demo',
          payout_batch_id: `BTCH-${period.replace('-', '')}`,
          currency: 'USD',
          total_amount_cents: 420050,
          line_items: [{ payee_ref: 'AFF_0042', amount_cents: 420050, coa_code: '2110-미지급' }],
        })
        mirrorEventToDemoBus(r.event)
        setServerLedger(r.erp_ledger)
        setBffNote('Payout BFF 수락')
      } catch (e) {
        setBffNote((e as Error).message)
      }
      return
    }
    const ev: PayoutApproved = {
      type: 'PayoutApproved',
      event_id: newEventId(),
      tenant_id: 'tnt_demo',
      payout_batch_id: `BTCH-${period.replace('-', '')}`,
      currency: 'USD',
      total_amount_cents: 420050,
      line_items: [{ payee_ref: 'AFF_0042', amount_cents: 420050, coa_code: '2110-미지급' }],
    }
    publishSuiteEvent(ev)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <header>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">ERP 재무 연동</h1>
        <p className="text-on-surface-variant mt-2 text-sm">
          COA·예산·미지급 매핑:{' '}
          <code className="text-xs bg-surface-container-highest px-1 rounded">docs/integration/erp-finance-mapping.md</code>
        </p>
      </header>
      {erp ? (
        <a href={erp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary font-bold text-sm">
          ERP 외부 링크 열기
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </a>
      ) : null}
      <div className="rounded-2xl border border-outline-variant/15 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-container-high">
            <tr>
              <th className="text-left p-3">spend_category</th>
              <th className="text-left p-3">COA (예시)</th>
              <th className="text-left p-3">department_code</th>
            </tr>
          </thead>
          <tbody>
            {COA_ROWS.map(([c, coa, dept]) => (
              <tr key={c} className="border-t border-outline-variant/10 bg-surface-container-low">
                <td className="p-3 font-mono text-xs">{c}</td>
                <td className="p-3">{coa}</td>
                <td className="p-3 font-mono text-xs">{dept}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-5 space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">MarketingSpendCommitted</h2>
          <label className="block text-xs font-semibold">period (YYYY-MM)</label>
          <input
            className="w-full rounded-lg border border-outline-variant/20 bg-surface px-3 py-2 text-sm font-mono"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
          <label className="block text-xs font-semibold">amount_cents</label>
          <input
            className="w-full rounded-lg border border-outline-variant/20 bg-surface px-3 py-2 text-sm font-mono"
            value={amountCents}
            onChange={(e) => setAmountCents(e.target.value)}
          />
          <label className="block text-xs font-semibold">spend_category</label>
          <select
            className="w-full rounded-lg border border-outline-variant/20 bg-surface px-3 py-2 text-sm font-mono"
            value={spendCategory}
            onChange={(e) => setSpendCategory(e.target.value as MarketingSpendCommitted['spend_category'])}
          >
            <option value="ad_spend">ad_spend</option>
            <option value="production">production</option>
            <option value="influencer">influencer</option>
            <option value="tooling">tooling</option>
          </select>
          <label className="block text-xs font-semibold">department_code</label>
          <input
            className="w-full rounded-lg border border-outline-variant/20 bg-surface px-3 py-2 text-sm font-mono"
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
          />
          <button
            type="button"
            onClick={() => void commitDemo()}
            className="w-full px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:opacity-90"
          >
            이벤트 발행
          </button>
          {bffNote ? <p className="text-xs text-on-surface-variant">{bffNote}</p> : null}
        </div>
        <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-5 space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">ERP 어댑터 JSON</h2>
          <p className="text-xs text-on-surface-variant">
            BFF 연결 시 서버가 생성한 페이로드를 우선 표시합니다. 그렇지 않으면 클라이언트 미리보기입니다.
          </p>
          <pre className="text-xs font-mono text-on-surface-variant whitespace-pre-wrap break-all max-h-64 overflow-auto bg-surface-container-highest/50 rounded-lg p-3">
            {JSON.stringify(serverLedger ?? erpAdapterPreview(), null, 2)}
          </pre>
          <button
            type="button"
            onClick={() => void payoutDemo()}
            className="w-full px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm border border-outline-variant/20"
          >
            PayoutApproved 데모 발행
          </button>
        </div>
      </div>
    </div>
  )
}

export function SuitePipelinePage() {
  const [log, setLog] = useState<SuiteEvent[]>([])
  const [pipelineNote, setPipelineNote] = useState<string | null>(null)
  const [bffVideoJobId, setBffVideoJobId] = useState<string | null>(null)

  useEffect(() => {
    return subscribeSuiteEvents((e) => setLog((prev) => [e, ...prev].slice(0, 50)))
  }, [])

  const demoBrief = async () => {
    setPipelineNote(null)
    if (suiteBffEnabled()) {
      try {
        const r = await postCampaignBrief(
          'cmp_demo',
          {
            tenant_id: 'tnt_demo',
            brief_json: { format: 'vertical_15s', tone: 'energetic', cta: 'shop_now' },
          },
          { idempotencyKey: 'idem-suite-pipeline-brief-v1' },
        )
        mirrorEventToDemoBus(r.event)
        setPipelineNote('BFF: CampaignBriefPublished (아웃박스·감사 기록)')
      } catch (e) {
        setPipelineNote((e as Error).message)
      }
      return
    }
    const ev: CampaignBriefPublished = {
      type: 'CampaignBriefPublished',
      event_id: newEventId(),
      tenant_id: 'tnt_demo',
      campaign_id: 'cmp_demo',
      brief_json: { format: 'vertical_15s', tone: 'energetic', cta: 'shop_now' },
    }
    publishSuiteEvent(ev)
  }

  const demoVideoJobCreate = async () => {
    setPipelineNote(null)
    if (suiteBffEnabled()) {
      try {
        const r = await postVideoJob(
          { tenant_id: 'tnt_demo', campaign_id: 'cmp_demo' },
          { idempotencyKey: `idem-suite-pipeline-vj-${Date.now()}` },
        )
        setBffVideoJobId(r.video_job_id)
        setPipelineNote(`BFF: 영상 작업 생성 → ${r.video_job_id}`)
      } catch (e) {
        setPipelineNote((e as Error).message)
      }
      return
    }
    setPipelineNote('로컬만: 아래 VideoJobCompleted로 진행하세요.')
  }

  const demoComplete = async () => {
    setPipelineNote(null)
    if (suiteBffEnabled()) {
      const vid = bffVideoJobId ?? 'vj_demo'
      try {
        const r = await patchVideoJob(vid, {
          tenant_id: 'tnt_demo',
          status: 'published',
          creative_asset_id: 'ast_demo_v1',
          campaign_id: 'cmp_demo',
        })
        if ('event' in r && r.event) {
          mirrorEventToDemoBus(r.event)
          setPipelineNote('BFF: VideoJobCompleted')
        } else {
          setPipelineNote('BFF: 상태만 갱신(필드 확인)')
        }
      } catch (e) {
        setPipelineNote((e as Error).message)
      }
      return
    }
    const ev: VideoJobCompleted = {
      type: 'VideoJobCompleted',
      event_id: newEventId(),
      tenant_id: 'tnt_demo',
      video_job_id: 'vj_demo',
      campaign_id: 'cmp_demo',
      creative_asset_id: 'ast_demo_v1',
    }
    publishSuiteEvent(ev)
  }

  const demoReminder = () => {
    const ev: ReminderScheduled = {
      type: 'ReminderScheduled',
      event_id: newEventId(),
      tenant_id: 'tnt_demo',
      contact_id: 'ct_quick',
      local_market_id: 'lmk_demo_01',
      fire_at: new Date().toISOString(),
      channel: 'push',
      consent_token_ref: 'consent_optin_demo',
    }
    publishSuiteEvent(ev)
  }

  const demoPayout = () => {
    const ev: PayoutApproved = {
      type: 'PayoutApproved',
      event_id: newEventId(),
      tenant_id: 'tnt_demo',
      payout_batch_id: 'BTCH-QUICK',
      currency: 'USD',
      total_amount_cents: 100000,
      line_items: [{ payee_ref: 'VENDOR_01', amount_cents: 100000, coa_code: '2110-미지급' }],
    }
    publishSuiteEvent(ev)
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">통합 파이프라인 (데모)</h1>
        <p className="text-on-surface-variant mt-2 text-sm max-w-3xl">
          CampaignBrief → Mart 영상 작업 · VideoJob 완료 → 캠페인 바인딩. BFF를 켜면 CRM/ERP 폼에서 같은 이벤트가 여기로도
          미러링됩니다. OpenAPI / AsyncAPI: <code className="text-xs">docs/integration/</code>
        </p>
        {pipelineNote ? <p className="text-xs text-on-surface-variant">{pipelineNote}</p> : null}
      </header>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void demoBrief()}
          className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm border border-outline-variant/20"
        >
          CampaignBriefPublished
        </button>
        <button
          type="button"
          onClick={() => void demoVideoJobCreate()}
          className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm border border-outline-variant/20"
        >
          VideoJob 생성 (BFF)
        </button>
        <button
          type="button"
          onClick={() => void demoComplete()}
          className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm border border-outline-variant/20"
        >
          VideoJobCompleted
        </button>
        <button
          type="button"
          onClick={demoReminder}
          className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm border border-outline-variant/20"
        >
          ReminderScheduled
        </button>
        <button
          type="button"
          onClick={demoPayout}
          className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm border border-outline-variant/20"
        >
          PayoutApproved
        </button>
      </div>
      <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-4 font-mono text-xs max-h-96 overflow-auto">
        {log.length === 0 ? (
          <span className="text-on-surface-variant">이벤트 없음 — 버튼을 눌러 보세요.</span>
        ) : (
          log.map((e, i) => (
            <pre key={e.event_id + i} className="text-on-surface-variant mb-3 whitespace-pre-wrap break-all">
              {JSON.stringify(e, null, 2)}
            </pre>
          ))
        )}
      </div>
    </div>
  )
}

export function SuiteToolApprovalsPage() {
  const [items, setItems] = useState<Awaited<ReturnType<typeof fetchAssistantToolApprovals>>['items']>([])
  const [note, setNote] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    if (!suiteBffEnabled()) {
      setNote('VITE_SUITE_BFF_BASE 가 없습니다.')
      return
    }
    setLoading(true)
    setNote(null)
    try {
      const r = await fetchAssistantToolApprovals({ status: 'pending', limit: 100 })
      setItems(r.items)
    } catch (e) {
      setNote((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  return (
    <div className="space-y-6 max-w-4xl">
      <header>
        <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">AI 도구 승인 큐</h1>
        <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
          BFF에서 <code className="font-mono bg-surface-container-highest px-1 rounded">ASSISTANT_TOOL_APPROVAL_QUEUE=1</code>{' '}
          일 때 고위험 도구 호출이 대기됩니다. 승인/거절은 서버 <code className="font-mono">BFF_ADMIN_KEY</code>와 웹{' '}
          <code className="font-mono">VITE_SUITE_BFF_ADMIN_KEY</code>가 필요합니다.
        </p>
      </header>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-sm disabled:opacity-50"
        >
          새로고침
        </button>
      </div>
      {note && (
        <p className="text-sm text-on-surface-variant rounded-xl border border-outline-variant/20 bg-surface-container-low px-3 py-2">
          {note}
        </p>
      )}
      <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container-high/80 text-on-surface-variant text-xs uppercase">
            <tr>
              <th className="px-3 py-2">id</th>
              <th className="px-3 py-2">tenant</th>
              <th className="px-3 py-2">tool</th>
              <th className="px-3 py-2">args</th>
              <th className="px-3 py-2 w-40" />
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-on-surface-variant text-center">
                  {loading ? '로딩…' : '대기 항목 없음'}
                </td>
              </tr>
            ) : (
              items.map((row) => (
                <tr key={row.id} className="border-t border-outline-variant/10">
                  <td className="px-3 py-2 font-mono text-xs">{row.id}</td>
                  <td className="px-3 py-2">{row.tenant_id}</td>
                  <td className="px-3 py-2 font-medium">{row.tool_name}</td>
                  <td className="px-3 py-2 font-mono text-xs max-w-md truncate" title={row.args_json}>
                    {row.args_json}
                  </td>
                  <td className="px-3 py-2 flex flex-wrap gap-1 justify-end">
                    <button
                      type="button"
                      className="px-2 py-1 rounded-lg bg-primary/90 text-on-primary text-xs font-bold"
                      onClick={async () => {
                        try {
                          await approveAssistantToolApproval(row.id)
                          await load()
                        } catch (e) {
                          setNote((e as Error).message)
                        }
                      }}
                    >
                      승인
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 rounded-lg border border-outline-variant/30 text-xs"
                      onClick={async () => {
                        try {
                          await rejectAssistantToolApproval(row.id, 'rejected')
                          await load()
                        } catch (e) {
                          setNote((e as Error).message)
                        }
                      }}
                    >
                      거절
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
