type PageProps = {
  title: string
  subtitle?: string
  icon?: string
  children?: React.ReactNode
}

function Page({ title, subtitle, icon, children }: PageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            {icon ? <span className="material-symbols-outlined text-primary">{icon}</span> : null}
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">{title}</h1>
          </div>
          {subtitle ? <p className="text-on-surface-variant mt-2">{subtitle}</p> : null}
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-container-high text-on-surface font-semibold rounded hover:bg-surface-container-highest transition-colors text-sm">
            Export
          </button>
          <button className="px-4 py-2 bg-primary text-white font-semibold rounded hover:opacity-90 transition-opacity text-sm">
            Run
          </button>
        </div>
      </div>

      {children}
    </div>
  )
}

export function AiCreativeAnalysisPage() {
  return (
    <Page
      title="AI Creative Analysis (Ad Copy Intelligence)"
      subtitle="Stitch reference: ai_creative_analysis_ad_copy_intelligence"
      icon="neurology"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline font-extrabold text-on-surface">Creative Scoreboard</h2>
            <span className="text-xs font-bold text-on-surface-variant">Last run: 14:02</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { k: 'Hook Strength', v: '92/100', tone: 'text-secondary' },
              { k: 'Clarity', v: '87/100', tone: 'text-secondary' },
              { k: 'Risk Flags', v: '2', tone: 'text-error' },
            ].map((m) => (
              <div key={m.k} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10">
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{m.k}</div>
                <div className={`mt-2 text-3xl font-black ${m.tone}`}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high">
          <h2 className="font-headline font-extrabold mb-3">AI Notes</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Replace generic claims with quantified outcomes, and front-load the direct-response verb for
            mobile-first placements.
          </p>
          <div className="mt-5 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
              <span>Headline variant B: best engagement</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-error text-[18px]">error</span>
              <span>Policy: avoid “guaranteed” language</span>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export function AiMediationRulesPage() {
  return (
    <Page title="AI Mediation Rules Dashboard" subtitle="Stitch reference: ai_mediation_rules_dashboard" icon="rule">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-6">
          <h2 className="font-headline font-extrabold mb-4">Active Rules</h2>
          <div className="space-y-3">
            {[
              { name: 'Auto-approve low-risk disputes', status: 'On', tone: 'bg-secondary-container/30 text-secondary' },
              { name: 'Escalate high-value claims', status: 'On', tone: 'bg-secondary-container/30 text-secondary' },
              { name: 'Cooldown after repeated filings', status: 'Draft', tone: 'bg-surface-container-high text-on-surface-variant' },
            ].map((r) => (
              <div key={r.name} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
                <div className="font-semibold">{r.name}</div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${r.tone}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high">
          <h2 className="font-headline font-extrabold mb-3">Rule Simulator</h2>
          <p className="text-sm text-on-surface-variant">Run sample cases to validate routing, escalation, and SLAs.</p>
          <button className="mt-5 w-full py-3 bg-on-surface text-surface rounded-lg font-bold text-sm hover:bg-on-surface/90 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">science</span>
            Simulate Case
          </button>
        </div>
      </div>
    </Page>
  )
}

export function AiProductTrendsDeployedPage() {
  return (
    <Page title="AI Orchestrator: Product Trends (Deployed)" subtitle="Stitch reference: ai_orchestrator_product_trends_deployed" icon="travel_explore">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-surface-container-low rounded-2xl p-6">
          <h2 className="font-headline font-extrabold mb-4">Trend Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { k: 'Signals ingested', v: '1.2M/day' },
              { k: 'New winners', v: '34' },
              { k: 'Deploy latency', v: '2m' },
            ].map((m) => (
              <div key={m.k} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10">
                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{m.k}</div>
                <div className="mt-2 text-2xl font-black text-primary">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high">
          <h2 className="font-headline font-extrabold mb-3">Deploy Queue</h2>
          <div className="space-y-3">
            {['Mini Projector', 'Car Vacuum', 'LED Strip'].map((x) => (
              <div key={x} className="flex items-center justify-between bg-surface-container p-3 rounded-lg">
                <span className="font-semibold text-sm">{x}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">queued</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  )
}

export function AiStorytellerAssistantPage() {
  return (
    <Page title="AI Storyteller Assistant" subtitle="Stitch reference: ai_storyteller_assistant" icon="auto_stories">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-6">
          <h2 className="font-headline font-extrabold mb-4">Storyboard Draft</h2>
          <div className="space-y-3">
            {[
              { t: 'Hook', d: 'Open with a problem + fast visual proof.' },
              { t: 'Value', d: 'Show 2–3 concrete outcomes in under 7 seconds.' },
              { t: 'CTA', d: 'One action, one incentive, one timeframe.' },
            ].map((s) => (
              <div key={s.t} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
                <div className="text-xs font-black uppercase tracking-widest text-on-surface-variant">{s.t}</div>
                <div className="mt-2 text-sm">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high">
          <h2 className="font-headline font-extrabold mb-3">Generate</h2>
          <textarea
            className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg p-3 text-sm"
            rows={6}
            placeholder="Product + audience + tone..."
          />
          <button className="mt-4 w-full py-3 bg-primary text-white rounded-lg font-bold text-sm">
            Generate Script
          </button>
        </div>
      </div>
    </Page>
  )
}

export function AiUploadAgentPage() {
  return (
    <Page title="AI Upload Agent" subtitle="Stitch reference: ai_upload_agent" icon="cloud_upload">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-6">
          <h2 className="font-headline font-extrabold mb-4">Upload Jobs</h2>
          <div className="space-y-3">
            {[
              { n: 'Shorts Batch #12', s: 'running', tone: 'text-secondary' },
              { n: 'TikTok Batch #08', s: 'queued', tone: 'text-on-surface-variant' },
              { n: 'YouTube Longform #03', s: 'failed', tone: 'text-error' },
            ].map((j) => (
              <div key={j.n} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
                <div className="font-semibold">{j.n}</div>
                <div className={`text-xs font-bold uppercase tracking-widest ${j.tone}`}>{j.s}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high">
          <h2 className="font-headline font-extrabold mb-3">New Upload</h2>
          <button className="w-full py-10 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant font-bold">
            Drop files here
          </button>
          <button className="mt-4 w-full py-3 bg-secondary text-white rounded-lg font-bold text-sm">
            Start Upload
          </button>
        </div>
      </div>
    </Page>
  )
}

export function AlibabaTrendReportPage() {
  return (
    <Page title="Alibaba Trend Report (AI Insights)" subtitle="Stitch reference: alibaba_trend_report_ai_insights" icon="insights">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Top Movers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Mini Projector', 'Portable Blender', 'Wireless Mic'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10">
              <div className="text-sm font-bold">{x}</div>
              <div className="mt-2 text-xs text-on-surface-variant">AI confidence: 0.82</div>
              <div className="mt-4 text-secondary font-black">+28%</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AmazonAffiliateHubTrendReportPage() {
  return (
    <Page title="Amazon Affiliate Hub Trend Report" subtitle="Stitch reference: amazon_affiliate_hub_trend_report" icon="shopping_basket">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Hub Signals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { k: 'Search lift', v: '+14.2%' },
            { k: 'Conversion lift', v: '+5.8%' },
            { k: 'Refund risk', v: 'Low' },
            { k: 'Inventory risk', v: 'Moderate' },
          ].map((m) => (
            <div key={m.k} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 flex items-center justify-between">
              <div className="text-sm font-bold">{m.k}</div>
              <div className="text-sm font-black text-primary">{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AnaliticaDetalladaPage() {
  return (
    <Page title="Analítica Detallada" subtitle="Stitch reference: anal_tica_detallada" icon="monitoring">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-6">
          <h2 className="font-headline font-extrabold mb-4">Channel Breakdown</h2>
          <div className="space-y-3">
            {[
              { c: 'YouTube Shorts', v: '1.2M views' },
              { c: 'TikTok', v: '840k views' },
              { c: 'Instagram', v: '420k views' },
            ].map((x) => (
              <div key={x.c} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
                <div className="font-semibold">{x.c}</div>
                <div className="text-sm font-black text-primary">{x.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high">
          <h2 className="font-headline font-extrabold mb-3">Insights</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Best-performing creatives share a direct-response headline and a 2-step proof sequence.
          </p>
        </div>
      </div>
    </Page>
  )
}

export function AudienceBehaviorForecastingPage() {
  return (
    <Page title="Audience Behavior Forecasting" subtitle="Stitch reference: audience_behavior_forecasting" icon="timeline">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Forecast Window</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['7d', '14d', '30d', '90d'].map((w) => (
            <button
              key={w}
              className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl py-4 font-black text-primary hover:bg-surface-container-high transition-colors"
            >
              {w}
            </button>
          ))}
        </div>
        <div className="mt-6 h-48 bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex items-center justify-center text-on-surface-variant font-bold">
          Forecast chart placeholder
        </div>
      </div>
    </Page>
  )
}

export function AudienceSpecificRuleTargetingPage() {
  return (
    <Page title="Audience Specific Rule Targeting" subtitle="Stitch reference: audience_specific_rule_targeting" icon="my_location">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-6">
          <h2 className="font-headline font-extrabold mb-4">Segments</h2>
          <div className="space-y-3">
            {['High-LTV Shoppers', 'First-time Visitors', 'Dormant Customers'].map((s) => (
              <div key={s} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
                <div className="font-semibold">{s}</div>
                <button className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-black">Target</button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high">
          <h2 className="font-headline font-extrabold mb-3">Rule</h2>
          <p className="text-sm text-on-surface-variant">Attach a workflow rule variant to the selected segment.</p>
          <button className="mt-5 w-full py-3 bg-secondary text-white rounded-lg font-bold text-sm">Attach Rule</button>
        </div>
      </div>
    </Page>
  )
}

export function AuditSimulationDashboardPage() {
  return (
    <Page title="Audit Simulation Dashboard" subtitle="Stitch reference: audit_simulation_dashboard" icon="fact_check">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-extrabold">Scenario Runner</h2>
          <span className="text-xs font-bold text-on-surface-variant">Mode: Dry-run</span>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Policy drift', 'Fraud spike', 'Dispute backlog'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10">
              <div className="text-sm font-bold">{x}</div>
              <div className="mt-2 text-xs text-on-surface-variant">Simulation seed: 10k events</div>
              <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg font-bold text-sm">Simulate</button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedBotMitigationRulesPage() {
  return (
    <Page title="Automated Bot Mitigation Rules" subtitle="Stitch reference: automated_bot_mitigation_rules_dashboard" icon="smart_toy">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Rules</h2>
        <div className="space-y-3">
          {[
            { n: 'Rate-limit burst clicks', s: 'On' },
            { n: 'Block suspicious ASN', s: 'On' },
            { n: 'Challenge unknown device', s: 'Draft' },
          ].map((r) => (
            <div key={r.n} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
              <div className="font-semibold">{r.n}</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{r.s}</span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedBudgetAdjustmentsPage() {
  return (
    <Page title="Automated Budget Adjustments" subtitle="Stitch reference: automated_budget_adjustments" icon="savings">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-6">
          <h2 className="font-headline font-extrabold mb-4">Rules Engine</h2>
          <div className="h-40 bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex items-center justify-center text-on-surface-variant font-bold">
            Budget curve placeholder
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high">
          <h2 className="font-headline font-extrabold mb-3">Parameters</h2>
          <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Cap</label>
          <input className="mt-2 w-full" type="range" />
          <button className="mt-5 w-full py-3 bg-primary text-white rounded-lg font-bold text-sm">Apply</button>
        </div>
      </div>
    </Page>
  )
}

export function AutomatedContractRenewalRulesPage() {
  return (
    <Page title="Automated Contract Renewal Rules" subtitle="Stitch reference: automated_contract_renewal_rules" icon="contract">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Renewal Queue</h2>
        <div className="space-y-3">
          {['Partner A (30d)', 'Partner B (7d)', 'Partner C (Today)'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
              <div className="font-semibold">{x}</div>
              <button className="px-3 py-1.5 rounded-full bg-secondary text-white text-xs font-black">Renew</button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedCounterCampaignsPage() {
  return (
    <Page title="Automated Counter Campaigns" subtitle="Stitch reference: automated_counter_campaigns" icon="campaign">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Playbooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Defensive CPC', 'Brand Recovery', 'Competitor Sweep'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10">
              <div className="text-sm font-bold">{x}</div>
              <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg font-bold text-sm">Deploy</button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedDataReplayEnginePage() {
  return (
    <Page title="Automated Data Replay Engine" subtitle="Stitch reference: automated_data_replay_engine" icon="replay">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Replays</h2>
        <div className="space-y-3">
          {['Replay #1201 (Temu)', 'Replay #1198 (Amazon)', 'Replay #1189 (Shopify)'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
              <div className="font-semibold">{x}</div>
              <button className="px-3 py-1.5 rounded-full bg-on-surface text-surface text-xs font-black">Run</button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedDisputeFilingPage() {
  return (
    <Page title="Automated Dispute Filing" subtitle="Stitch reference: automated_dispute_filing" icon="gavel">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Filing Automation</h2>
        <p className="text-sm text-on-surface-variant">Generate and submit disputes from detected anomalies.</p>
        <button className="mt-5 px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm">Create Filing</button>
      </div>
    </Page>
  )
}

export function AutomatedDisputeResolutionDashboardPage() {
  return (
    <Page title="Automated Dispute Resolution Dashboard" subtitle="Stitch reference: automated_dispute_resolution_dashboard" icon="handshake">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Resolution Backlog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { k: 'Open', v: '42' },
            { k: 'In mediation', v: '11' },
            { k: 'Resolved (24h)', v: '18' },
          ].map((m) => (
            <div key={m.k} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10">
              <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{m.k}</div>
              <div className="mt-2 text-3xl font-black text-primary">{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedMediatorPerformanceReportPage() {
  return (
    <Page title="Automated Mediator Performance Report" subtitle="Stitch reference: automated_mediator_performance_report" icon="leaderboard">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Top Mediators</h2>
        <div className="space-y-3">
          {['Mediator A (98%)', 'Mediator B (94%)', 'Mediator C (91%)'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
              <div className="font-semibold">{x}</div>
              <span className="text-xs font-black text-secondary">healthy</span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedPolicyPatchingDashboardPage() {
  return (
    <Page title="Automated Policy Patching Dashboard" subtitle="Stitch reference: automated_policy_patching_dashboard" icon="policy">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Patch Stream</h2>
        <div className="space-y-3">
          {['Patch #221 (copy rules)', 'Patch #219 (fraud heuristics)', 'Patch #214 (rate limits)'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
              <div className="font-semibold">{x}</div>
              <button className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-black">Apply</button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedPolicyUpdateAlertsPage() {
  return (
    <Page title="Automated Policy Update Alerts" subtitle="Stitch reference: automated_policy_update_alerts" icon="notifications_active">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Alerts</h2>
        <div className="space-y-3">
          {[
            { t: 'Meta: restricted claims', s: 'new' },
            { t: 'TikTok: disclosure changes', s: 'review' },
            { t: 'YouTube: shorts metadata', s: 'archived' },
          ].map((a) => (
            <div key={a.t} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
              <div className="font-semibold">{a.t}</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{a.s}</span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedRegulatoryReportingDashboardPage() {
  return (
    <Page title="Automated Regulatory Reporting" subtitle="Stitch reference: automated_regulatory_reporting_dashboard" icon="assignment">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Weekly', 'Monthly', 'Quarterly'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10">
              <div className="text-sm font-bold">{x}</div>
              <button className="mt-4 w-full py-2 bg-secondary text-white rounded-lg font-bold text-sm">Generate</button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedReinvestmentRulesPage() {
  return (
    <Page title="Automated Reinvestment Rules" subtitle="Stitch reference: automated_reinvestment_rules" icon="currency_exchange">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Reinvestment Modes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Aggressive', 'Conservative', 'Balanced', 'Capped'].map((x) => (
            <button
              key={x}
              className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl py-5 font-black text-primary hover:bg-surface-container-high transition-colors"
            >
              {x}
            </button>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedRemediationWorkflowsDashboardPage() {
  return (
    <Page title="Automated Remediation Workflows" subtitle="Stitch reference: automated_remediation_workflows_dashboard" icon="auto_fix">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Workflows</h2>
        <div className="space-y-3">
          {['Block IP', 'Rate-limit affiliate', 'Require 2FA'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
              <div className="font-semibold">{x}</div>
              <button className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-black">Run</button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedResolutionWorkflowsPage() {
  return (
    <Page title="Automated Resolution Workflows" subtitle="Stitch reference: automated_resolution_workflows" icon="route">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Routing</h2>
        <p className="text-sm text-on-surface-variant">
          Configure auto-routing of cases to mediation, auto-approval, or manual review.
        </p>
      </div>
    </Page>
  )
}

export function AutomatedRetargetingWorkflowsPage() {
  return (
    <Page title="Automated Retargeting Workflows" subtitle="Stitch reference: automated_retargeting_workflows" icon="ads_click">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Sequences</h2>
        <div className="space-y-3">
          {['Cart > $100', 'Viewed 2+ times', 'Dormant 14d'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
              <div className="font-semibold">{x}</div>
              <span className="text-xs font-black text-secondary">active</span>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedThreatHuntingAgentsDashboardPage() {
  return (
    <Page title="Automated Threat Hunting Agents" subtitle="Stitch reference: automated_threat_hunting_agents_dashboard" icon="shield">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Sentinel', 'Crawler', 'Forensics'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10">
              <div className="text-sm font-bold">{x}</div>
              <div className="mt-2 text-xs text-on-surface-variant">Status: running</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatedWarningNotificationsPage() {
  return (
    <Page title="Automated Warning Notifications" subtitle="Stitch reference: automated_warning_notifications" icon="warning">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Notification Rules</h2>
        <div className="space-y-3">
          {['Slack: Fraud spike', 'Email: Policy update', 'SMS: Critical payouts'].map((x) => (
            <div key={x} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 flex items-center justify-between">
              <div className="font-semibold">{x}</div>
              <button className="px-3 py-1.5 rounded-full bg-secondary text-white text-xs font-black">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function AutomatizadorDeIaPage() {
  return (
    <Page title="Automatizador de IA" subtitle="Stitch reference: automatizador_de_ia" icon="precision_manufacturing">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Automation Builder</h2>
        <div className="h-48 bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex items-center justify-center text-on-surface-variant font-bold">
          Flow builder placeholder
        </div>
      </div>
    </Page>
  )
}

export function AvatarCreatorTtsPage() {
  return (
    <Page title="Avatar Creator + TTS" subtitle="Stitch reference: avatar_creator_tts" icon="face">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-6">
          <h2 className="font-headline font-extrabold mb-4">Avatar Preview</h2>
          <div className="aspect-video bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex items-center justify-center text-on-surface-variant">
            Avatar canvas
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="py-3 bg-primary text-white rounded-lg font-bold text-sm">Generate Voice</button>
            <button className="py-3 bg-surface-container-high text-on-surface font-bold text-sm rounded-lg">Sync Lip</button>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high space-y-4">
          <h2 className="font-headline font-extrabold">TTS</h2>
          <label className="text-xs font-black uppercase text-on-surface-variant">Script</label>
          <textarea className="w-full bg-surface-container-highest rounded-lg p-3 text-sm border border-outline-variant/20" rows={6} placeholder="Paste narration..." />
          <label className="text-xs font-black uppercase text-on-surface-variant">Voice</label>
          <select className="w-full bg-surface-container-highest rounded-lg p-3 text-sm border border-outline-variant/20">
            <option>Neutral EN</option>
            <option>Warm ES</option>
          </select>
        </div>
      </div>
    </Page>
  )
}

export function BackgroundMusicCreatorPage() {
  return (
    <Page title="Background Music Creator" subtitle="Stitch reference: background_music_creator" icon="music_note">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-surface-container-low rounded-2xl p-6">
          <h2 className="font-headline font-extrabold mb-4">Waveform</h2>
          <div className="h-40 bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex items-end gap-1 px-4 pb-4">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="flex-1 bg-primary/40 rounded-t" style={{ height: `${20 + (i % 7) * 10}%` }} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high">
          <h2 className="font-headline font-extrabold mb-4">Mood</h2>
          {['Uplifting', 'Cinematic', 'Lo-fi'].map((m) => (
            <button
              key={m}
              className="w-full mb-2 py-3 rounded-lg border border-outline-variant/20 font-bold text-sm hover:bg-surface-container-high"
            >
              {m}
            </button>
          ))}
          <button className="w-full mt-2 py-3 bg-secondary text-white rounded-lg font-bold text-sm">Render</button>
        </div>
      </div>
    </Page>
  )
}

export function AvatarCreatorTimelinePage() {
  return (
    <Page title="Avatar Creator (Timeline)" subtitle="Stitch reference: avatar_creator_with_timeline" icon="view_timeline">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Timeline</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Intro', 'Hook', 'Demo', 'CTA'].map((seg, i) => (
            <div
              key={seg}
              className="min-w-[140px] bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10"
            >
              <div className="text-xs font-black text-on-surface-variant">{seg}</div>
              <div className="mt-2 text-sm font-bold">0:{i}0–0:{i + 1}5</div>
            </div>
          ))}
        </div>
        <div className="mt-6 aspect-video bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex items-center justify-center text-on-surface-variant">
          Scene preview
        </div>
      </div>
    </Page>
  )
}

export function BudgetForecastingNextMonthPage() {
  return (
    <Page title="Budget Forecasting (Next Month)" subtitle="Stitch reference: budget_forecasting_next_month_projections" icon="trending_up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { k: 'Projected spend', v: '$48.2k', d: '+6.1% vs last month' },
          { k: 'ROAS (est.)', v: '4.1x', d: 'Confidence 82%' },
          { k: 'Risk buffer', v: '$3.5k', d: 'Recommended hold' },
        ].map((m) => (
          <div key={m.k} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10">
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{m.k}</div>
            <div className="mt-2 text-3xl font-black text-primary">{m.v}</div>
            <div className="mt-1 text-xs text-on-surface-variant">{m.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 h-56 bg-surface-container-low rounded-2xl border border-outline-variant/10 flex items-center justify-center text-on-surface-variant font-bold">
        Monthly projection chart placeholder
      </div>
    </Page>
  )
}

export function ChainOfCustodyEvidenceVaultPage() {
  return (
    <Page title="Chain of Custody — Evidence Vault" subtitle="Stitch reference: chain_of_custody_tracking_evidence_vault" icon="inventory_2">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <h2 className="font-headline font-extrabold mb-4">Artifacts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[10px] font-black uppercase text-on-surface-variant border-b border-outline-variant/20">
                <th className="pb-3 pr-4">ID</th>
                <th className="pb-3 pr-4">Hash</th>
                <th className="pb-3 pr-4">Custodian</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {[
                { id: 'EV-1042', h: 'sha256…a1f', c: 'Legal Bot', s: 'Sealed' },
                { id: 'EV-1041', h: 'sha256…9ce', c: 'Analyst', s: 'In review' },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-lowest/50">
                  <td className="py-4 font-bold">{row.id}</td>
                  <td className="py-4 font-mono text-xs text-on-surface-variant">{row.h}</td>
                  <td className="py-4">{row.c}</td>
                  <td className="py-4">
                    <span className="text-[10px] font-black uppercase px-2 py-1 rounded-full bg-secondary-container/30 text-secondary">
                      {row.s}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  )
}

export function ChannelPerformanceDetailedReportPage() {
  return (
    <Page title="Channel Performance (Detailed)" subtitle="Stitch reference: channel_performance_detailed_report" icon="bar_chart">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { k: 'YouTube', v: '1.2M' },
            { k: 'TikTok', v: '890k' },
            { k: 'Meta', v: '540k' },
            { k: 'Amazon', v: '210k' },
          ].map((x) => (
            <div key={x.k} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
              <div className="text-xs font-bold text-on-surface-variant">{x.k}</div>
              <div className="text-xl font-black text-primary mt-1">{x.v}</div>
              <div className="text-[10px] text-on-surface-variant">impressions (7d)</div>
            </div>
          ))}
        </div>
        <div className="h-48 bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex items-center justify-center text-on-surface-variant font-bold">
          Channel comparison chart
        </div>
      </div>
    </Page>
  )
}

export function CharacterCreatorMultiStylePage() {
  return (
    <Page title="Character Creator (Multi-style)" subtitle="Stitch reference: character_creator_multi_style" icon="palette">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Realistic', 'Anime', '3D Toon', 'Pixel'].map((style) => (
          <div
            key={style}
            className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 text-center hover:border-primary transition-colors cursor-pointer"
          >
            <div className="h-32 bg-surface-container-high rounded-lg mb-3 flex items-center justify-center text-on-surface-variant text-xs">
              {style}
            </div>
            <div className="font-bold text-sm">{style}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm">Apply Style</button>
      </div>
    </Page>
  )
}

export function CompetitorActivityTrackingPage() {
  return (
    <Page title="Competitor Activity Tracking" subtitle="Stitch reference: competitor_activity_tracking" icon="visibility">
      <div className="space-y-4">
        {[
          { name: 'Brand X', action: 'New landing + 12 creatives', t: '2h ago' },
          { name: 'Brand Y', action: 'Price drop campaign', t: '6h ago' },
        ].map((x) => (
          <div
            key={x.name + x.t}
            className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
          >
            <div>
              <div className="font-bold">{x.name}</div>
              <div className="text-sm text-on-surface-variant">{x.action}</div>
            </div>
            <span className="text-xs font-mono text-outline">{x.t}</span>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function CompetitorAdCreativePreviewsPage() {
  return (
    <Page title="Competitor Ad Creative Previews" subtitle="Stitch reference: competitor_ad_creative_previews" icon="ad_group">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Variant A', 'Variant B', 'Variant C'].map((v) => (
          <div key={v} className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
            <div className="aspect-[4/5] bg-surface-container-highest flex items-center justify-center text-on-surface-variant text-sm">
              Creative preview
            </div>
            <div className="p-4">
              <div className="font-bold">{v}</div>
              <div className="text-xs text-on-surface-variant mt-1">CTR est. 3.2%</div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function ComplianceAuditLogsPage() {
  return (
    <Page title="Compliance Audit Logs" subtitle="Stitch reference: compliance_audit_logs" icon="history_edu">
      <div className="bg-surface-container-low rounded-2xl p-6">
        <div className="space-y-3 font-mono text-xs">
          {[
            '[10:02:11] ACCESS user:admin resource:policy_v2 READ OK',
            '[10:01:44] EXPORT user:analyst scope:affiliates APPROVED',
            '[09:58:02] DENY user:guest resource:payouts',
          ].map((line) => (
            <div key={line} className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/10">
              {line}
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function ContractPerformanceMetricsDashboard1Page() {
  return (
    <Page title="Contract Performance Metrics" subtitle="Stitch reference: contract_performance_metrics_dashboard_1" icon="description">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['SLA adherence', 'Renewal rate', 'Revenue at risk'].map((k) => (
          <div key={k} className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
            <div className="text-xs text-on-surface-variant uppercase tracking-wide">{k}</div>
            <div className="text-2xl font-extrabold mt-2">—</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function ContractPerformanceMetricsDashboard2Page() {
  return (
    <Page title="Contract Performance (v2)" subtitle="Stitch reference: contract_performance_metrics_dashboard_2" icon="article">
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 min-h-[240px] flex items-center justify-center text-on-surface-variant text-sm">
        KPI grid and trend charts — port from Stitch HTML
      </div>
    </Page>
  )
}

export function DashboardPrincipalPage() {
  return (
    <Page title="Dashboard Principal" subtitle="Stitch reference: dashboard_principal" icon="dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 h-48" />
        <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 h-48" />
      </div>
    </Page>
  )
}

export function DashboardPersonalizadoPage() {
  return (
    <Page title="Dashboard Personalizado" subtitle="Stitch reference: dashboard_personalizado" icon="tune">
      <p className="text-sm text-on-surface-variant">Widget layout and saved views — scaffold for Stitch widgets.</p>
    </Page>
  )
}

export function DisputeEvidenceAnalyticsPage() {
  return (
    <Page title="Dispute Evidence Analytics" subtitle="Stitch reference: dispute_evidence_analytics" icon="analytics">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
          <div className="font-bold text-sm mb-3">Evidence volume</div>
          <div className="h-32 bg-surface-container-highest rounded-xl" />
        </div>
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
          <div className="font-bold text-sm mb-3">Resolution correlation</div>
          <div className="h-32 bg-surface-container-highest rounded-xl" />
        </div>
      </div>
    </Page>
  )
}

export function DisputePolicyLibraryPage() {
  return (
    <Page title="Dispute Policy Library" subtitle="Stitch reference: dispute_policy_library" icon="library_books">
      <ul className="divide-y divide-outline-variant/10 rounded-2xl border border-outline-variant/10 bg-surface-container-low">
        {['EU consumer', 'Platform TOS v4', 'Affiliate payout'].map((p) => (
          <li key={p} className="px-4 py-3 flex justify-between items-center text-sm">
            <span>{p}</span>
            <span className="text-on-surface-variant text-xs">Policy pack</span>
          </li>
        ))}
      </ul>
    </Page>
  )
}

export function DisputeResolutionAnalyticsDashboardPage() {
  return (
    <Page title="Dispute Resolution Analytics" subtitle="Stitch reference: dispute_resolution_analytics_dashboard" icon="query_stats">
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
        Funnel, median time-to-close, outcome mix — scaffold.
      </div>
    </Page>
  )
}

export function EmailTemplateEditorPage() {
  return (
    <Page title="Email Template Editor" subtitle="Stitch reference: email_template_editor" icon="edit_note">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-4 font-mono text-xs min-h-[200px]">
          {'{{subject}}\n{{body}}\n{{cta_url}}'}
        </div>
        <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-4 min-h-[200px] text-on-surface-variant text-sm">
          Preview pane
        </div>
      </div>
    </Page>
  )
}

export function FacebookPerformanceIntelligenceReportPage() {
  return (
    <Page
      title="Facebook Performance Intelligence"
      subtitle="Stitch reference: facebook_performance_detailed_performance_intelligence_report"
      icon="public"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['Spend', 'ROAS', 'CPA', 'Reach'].map((m) => (
          <div key={m} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 text-center">
            <div className="text-xs text-on-surface-variant">{m}</div>
            <div className="text-lg font-bold mt-1">—</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function ForensicEvidenceRecoveryDashboardPage() {
  return (
    <Page title="Forensic Evidence Recovery" subtitle="Stitch reference: forensic_evidence_recovery_dashboard" icon="data_recovery">
      <div className="space-y-2 text-sm">
        {['Job #8821 — restore S3 shard', 'Job #8819 — log replay'].map((j) => (
          <div key={j} className="bg-surface-container-low rounded-lg px-4 py-3 border border-outline-variant/10">
            {j}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function ForensicSecurityAuditDashboardPage() {
  return (
    <Page title="Forensic Security Audit" subtitle="Stitch reference: forensic_security_audit_dashboard" icon="search_check">
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 text-on-surface-variant text-sm">
        Audit timeline, findings severity, remediation — scaffold.
      </div>
    </Page>
  )
}

export function GestionRedesPage() {
  return (
    <Page title="Gestión de Redes" subtitle="Stitch reference: gesti_n_de_redes" icon="share">
      <div className="flex flex-wrap gap-3">
        {['Meta', 'X', 'LinkedIn', 'TikTok'].map((c) => (
          <div key={c} className="px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/10 text-sm font-semibold">
            {c}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function GlobalComplianceSimulationDashboardPage() {
  return (
    <Page title="Global Compliance Simulation" subtitle="Stitch reference: global_compliance_simulation_dashboard" icon="public">
      <div className="h-40 rounded-2xl bg-gradient-to-r from-primary-container/30 to-secondary-container/30 border border-outline-variant/10 flex items-center justify-center text-sm text-on-surface-variant">
        Region scenarios and risk heat — scaffold
      </div>
    </Page>
  )
}

export function GlobalPerformanceReportsPage() {
  return (
    <Page title="Global Performance Reports" subtitle="Stitch reference: global_performance_reports" icon="summarize">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['AMER', 'EMEA', 'APAC'].map((r) => (
          <div key={r} className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
            <div className="font-bold">{r}</div>
            <div className="text-xs text-on-surface-variant mt-2">Revenue / growth — placeholder</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function GlobalSecurityPolicyDashboardPage() {
  return (
    <Page title="Global Security Policy" subtitle="Stitch reference: global_security_policy_dashboard" icon="admin_panel_settings">
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 text-sm">
        Policy matrix by jurisdiction — scaffold.
      </div>
    </Page>
  )
}

export function GlobalViralHeatmapPage() {
  return (
    <Page title="Global Viral Heatmap" subtitle="Stitch reference: global_viral_heatmap" icon="whatshot">
      <div className="aspect-video max-w-3xl mx-auto rounded-2xl bg-surface-container-highest border border-outline-variant/10 flex items-center justify-center text-on-surface-variant text-sm">
        Heatmap canvas — port from Stitch
      </div>
    </Page>
  )
}

export function InfluencerSentimentAnalysisPage() {
  return (
    <Page title="Influencer Sentiment Analysis" subtitle="Stitch reference: influencer_sentiment_analysis" icon="sentiment_satisfied">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
          <div className="text-xs font-bold uppercase text-on-surface-variant mb-3">Sentiment mix</div>
          <div className="h-36 bg-surface-container-highest rounded-xl" />
        </div>
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
          <div className="text-xs font-bold uppercase text-on-surface-variant mb-3">Top voices</div>
          <ul className="space-y-2 text-sm">
            {['@creator_a', '@creator_b', '@creator_c'].map((h) => (
              <li key={h} className="flex justify-between py-2 border-b border-outline-variant/10 last:border-0">
                <span>{h}</span>
                <span className="text-on-surface-variant">—</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  )
}

export function LegalApprovalWorkflowPage() {
  return (
    <Page title="Legal Approval Workflow" subtitle="Stitch reference: legal_approval_workflow" icon="account_balance">
      <div className="flex flex-wrap gap-2">
        {['Draft', 'Review', 'Approve', 'Archive'].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/10 text-sm font-semibold">{s}</span>
            {i < 3 ? <span className="text-on-surface-variant">→</span> : null}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function LegalApprovalAutomatedRemindersPage() {
  return (
    <Page title="Legal Approval + Automated Reminders" subtitle="Stitch reference: legal_approval_with_automated_reminders" icon="schedule_send">
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 text-sm text-on-surface-variant">
        Reminder cadence and escalation — scaffold (port from Stitch).
      </div>
    </Page>
  )
}

export function LegalApprovalESignatureSignOffPage() {
  return (
    <Page title="Legal Approval + E-Signature Sign-Off" subtitle="Stitch reference: legal_approval_with_e_signature_sign_off" icon="draw">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 min-h-[160px]">Document preview</div>
        <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 min-h-[160px]">Signature status</div>
      </div>
    </Page>
  )
}

export function LegalApprovalMultiPartySigningPage() {
  return (
    <Page title="Legal Approval + Multi-Party Signing" subtitle="Stitch reference: legal_approval_with_multi_party_signing" icon="groups">
      <ul className="rounded-2xl border border-outline-variant/10 divide-y divide-outline-variant/10 bg-surface-container-low">
        {['Legal', 'Finance', 'Brand'].map((r) => (
          <li key={r} className="px-4 py-3 flex justify-between text-sm">
            <span>{r}</span>
            <span className="text-on-surface-variant">Pending</span>
          </li>
        ))}
      </ul>
    </Page>
  )
}

export function LegalVarianceReportsDashboardPage() {
  return (
    <Page title="Legal Variance Reports" subtitle="Stitch reference: legal_variance_reports_dashboard" icon="difference">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {['Contractual', 'Policy', 'Jurisdiction'].map((v) => (
          <div key={v} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10">
            <div className="text-xs text-on-surface-variant">{v}</div>
            <div className="text-xl font-extrabold mt-1">—</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function LiveCampaignDeploymentPage() {
  return (
    <Page title="Live Campaign Deployment" subtitle="Stitch reference: live_campaign_deployment" icon="rocket_launch">
      <div className="space-y-3">
        {['Staging', 'Canary', 'Production'].map((env) => (
          <div key={env} className="flex items-center justify-between bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant/10">
            <span className="font-semibold text-sm">{env}</span>
            <span className="text-xs text-on-surface-variant">Ready</span>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function LiveCampaignPerformanceDashboardPage() {
  return (
    <Page title="Live Campaign Performance" subtitle="Stitch reference: live_campaign_performance_dashboard" icon="speed">
      <div className="h-48 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-center text-on-surface-variant text-sm">
        Real-time metrics — scaffold
      </div>
    </Page>
  )
}

export function MarketingAnalyticsRoiDashboardPage() {
  return (
    <Page title="Marketing Analytics — ROI" subtitle="Stitch reference: marketing_analytics_roi_dashboard" icon="paid">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {['Spend', 'Revenue', 'ROAS', 'CAC'].map((k) => (
          <div key={k} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10">
            <div className="text-[10px] uppercase tracking-wide text-on-surface-variant">{k}</div>
            <div className="text-lg font-bold mt-1">—</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function NetworkHealthMonitorPage() {
  return (
    <Page title="Network Health Monitor" subtitle="Stitch reference: network_health_monitor" icon="network_check">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['API', 'CDN', 'Webhooks'].map((n) => (
          <div key={n} className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
            <div className="flex items-center justify-between">
              <span className="font-bold">{n}</span>
              <span className="text-xs text-green-700 dark:text-green-400 font-semibold">OK</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full w-[92%] bg-primary rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function OmnichannelRetargetingSmsEmailPage() {
  return (
    <Page title="Omnichannel Retargeting (SMS + Email)" subtitle="Stitch reference: omnichannel_retargeting_sms_email" icon="sms">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 text-sm">SMS journey</div>
        <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 text-sm">Email journey</div>
      </div>
    </Page>
  )
}

export function PerformanceComparisonMomPage() {
  return (
    <Page
      title="Performance: This Month vs Last"
      subtitle="Stitch reference: performance_comparison_this_month_vs_last_month"
      icon="compare"
    >
      <div className="h-44 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-center text-on-surface-variant text-sm">
        Side-by-side KPI comparison — scaffold
      </div>
    </Page>
  )
}

export function PredictiveDisputeModelingDashboardPage() {
  return (
    <Page title="Predictive Dispute Modeling" subtitle="Stitch reference: predictive_dispute_modeling_dashboard" icon="psychology">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 text-sm">Model confidence</div>
        <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 text-sm">Risk cohorts</div>
      </div>
    </Page>
  )
}

export function PredictivePayoutTrackingDashboardPage() {
  return (
    <Page title="Predictive Payout Tracking" subtitle="Stitch reference: predictive_payout_tracking_dashboard" icon="payments">
      <div className="space-y-2 text-sm">
        {['Forecast window', 'Variance vs actual', 'Anomaly flags'].map((row) => (
          <div key={row} className="bg-surface-container-low rounded-lg px-4 py-3 border border-outline-variant/10">
            {row}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function ProjectArchivePage() {
  return (
    <Page title="Project Archive" subtitle="Stitch reference: project_archive" icon="inventory_2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {['Campaign A', 'Campaign B', 'Draft pack'].map((p) => (
          <div key={p} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 text-sm font-semibold">
            {p}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function ProjectArchiveBatchActions1Page() {
  return (
    <Page title="Project Archive — Batch Actions (1)" subtitle="Stitch reference: project_archive_batch_actions_1" icon="select_all">
      <p className="text-sm text-on-surface-variant">Bulk select and action bar — scaffold.</p>
    </Page>
  )
}

export function ProjectArchiveBatchActions2Page() {
  return (
    <Page title="Project Archive — Batch Actions (2)" subtitle="Stitch reference: project_archive_batch_actions_2" icon="checklist">
      <p className="text-sm text-on-surface-variant">Alternate batch UI state — scaffold.</p>
    </Page>
  )
}

export function ProjectArchiveFilterBySocialNetworkPage() {
  return (
    <Page title="Archive — Filter by Social" subtitle="Stitch reference: project_archive_filter_by_social_network" icon="filter_alt">
      <div className="flex flex-wrap gap-2">
        {['All', 'Meta', 'X', 'TikTok'].map((f) => (
          <button
            key={f}
            type="button"
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-surface-container-low border border-outline-variant/10"
          >
            {f}
          </button>
        ))}
      </div>
    </Page>
  )
}

export function ProjectArchiveTrashRestorePage() {
  return (
    <Page title="Archive — Trash & Restore" subtitle="Stitch reference: project_archive_trash_restore" icon="restore_from_trash">
      <ul className="rounded-xl border border-outline-variant/10 divide-y divide-outline-variant/10 bg-surface-container-low text-sm">
        {['Deleted item #1', 'Deleted item #2'].map((x) => (
          <li key={x} className="px-4 py-3 flex justify-between">
            <span>{x}</span>
            <span className="text-primary font-semibold text-xs">Restore</span>
          </li>
        ))}
      </ul>
    </Page>
  )
}

export function RealTimeIntrusionPreventionDashboardPage() {
  return (
    <Page title="Real-Time Intrusion Prevention" subtitle="Stitch reference: real_time_intrusion_prevention_dashboard" icon="block">
      <div className="font-mono text-xs space-y-2 bg-surface-container-low rounded-xl p-4 border border-outline-variant/10">
        {['BLOCK tcp/443 anomaly', 'ALLOW trusted ASN'].map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </Page>
  )
}

export function RegionSpecificComplianceSettingsPage() {
  return (
    <Page title="Region-Specific Compliance" subtitle="Stitch reference: region_specific_compliance_settings" icon="tune">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {['EU', 'US', 'LATAM'].map((r) => (
          <div key={r} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10">
            {r} toggles — scaffold
          </div>
        ))}
      </div>
    </Page>
  )
}

export function RegionalComplianceHeatmapsPage() {
  return (
    <Page title="Regional Compliance Heatmaps" subtitle="Stitch reference: regional_compliance_heatmaps" icon="map">
      <div className="aspect-[21/9] max-w-4xl rounded-2xl bg-surface-container-highest border border-outline-variant/10 flex items-center justify-center text-on-surface-variant text-sm">
        Map heat layer — port from Stitch
      </div>
    </Page>
  )
}

export function RegionalLegalTemplateManagementPage() {
  return (
    <Page title="Regional Legal Templates" subtitle="Stitch reference: regional_legal_template_management" icon="gavel">
      <table className="w-full text-sm border border-outline-variant/10 rounded-xl overflow-hidden">
        <thead className="bg-surface-container-high">
          <tr>
            <th className="text-left p-3">Region</th>
            <th className="text-left p-3">Template</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['EU', 'Affiliate TOS v3'],
            ['US', 'Disclosure pack'],
          ].map(([a, b]) => (
            <tr key={a} className="border-t border-outline-variant/10 bg-surface-container-low">
              <td className="p-3">{a}</td>
              <td className="p-3">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  )
}

export function RegistrationGuideBotPage() {
  return (
    <Page title="Registration Guide Bot" subtitle="Stitch reference: registration_guide_bot" icon="smart_toy">
      <div className="max-w-lg space-y-3">
        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10 text-sm">Bot: step 1 of 4…</div>
        <div className="bg-primary-container/20 rounded-2xl p-4 border border-outline-variant/10 text-sm">User reply area — scaffold</div>
      </div>
    </Page>
  )
}

export function ReinvestmentHistoryLogsPage() {
  return (
    <Page title="Reinvestment History Logs" subtitle="Stitch reference: reinvestment_history_logs" icon="history">
      <div className="space-y-2 font-mono text-xs">
        {['2025-03-01 rule:auto_scale amount:+$1.2k', '2025-02-28 rule:hold steady'].map((e) => (
          <div key={e} className="bg-surface-container-low rounded-lg px-3 py-2 border border-outline-variant/10">
            {e}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function RemediationAbTestingDashboardPage() {
  return (
    <Page title="Remediation A/B Testing" subtitle="Stitch reference: remediation_a_b_testing_dashboard" icon="healing">
      <div className="h-40 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-center text-on-surface-variant text-sm">
        Variant lift vs control — scaffold
      </div>
    </Page>
  )
}

export function RuleLogicAbTestingSimulationStitchPage() {
  return (
    <Page
      title="Rule Logic A/B Simulation (Stitch)"
      subtitle="Stitch reference: rule_logic_a_b_testing_simulation — primary app route is /ab-testing/logic"
      icon="model_training"
    >
      <p className="text-sm text-on-surface-variant">
        Duplicate scaffold for the Stitch export; use A/B Logic for the fully ported screen.
      </p>
    </Page>
  )
}

export function RulePerformanceComparisonPage() {
  return (
    <Page title="Rule Performance Comparison" subtitle="Stitch reference: rule_performance_comparison" icon="leaderboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 h-32">Rule set A</div>
        <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 h-32">Rule set B</div>
      </div>
    </Page>
  )
}

export function SentinelAiAccessControlPage() {
  return (
    <Page title="Sentinel AI — Access Control" subtitle="Stitch reference: sentinel_ai_access_control" icon="vpn_key">
      <ul className="text-sm space-y-2">
        {['Role: analyst → datasets:read', 'Role: admin → *'].map((r) => (
          <li key={r} className="bg-surface-container-low rounded-lg px-4 py-2 border border-outline-variant/10">
            {r}
          </li>
        ))}
      </ul>
    </Page>
  )
}

export function SentinelAiSecurityMonitorPage() {
  return (
    <Page title="Sentinel AI — Security Monitor" subtitle="Stitch reference: sentinel_ai_security_monitor" icon="monitor_heart">
      <div className="grid grid-cols-2 gap-3">
        {['Alerts', 'Models', 'Policies', 'Uptime'].map((k) => (
          <div key={k} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 text-center text-sm font-semibold">
            {k}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function SetupAssistantPage() {
  return (
    <Page title="Setup Assistant" subtitle="Stitch reference: setup_assistant" icon="assistant">
      <ol className="space-y-3 text-sm max-w-md">
        {['Connect accounts', 'Import catalog', 'Verify webhooks'].map((step, i) => (
          <li key={step} className="flex gap-3 items-center bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant/10">
            <span className="font-black text-primary">{i + 1}</span>
            {step}
          </li>
        ))}
      </ol>
    </Page>
  )
}

export function SheinTrendReportAiInsightsPage() {
  return (
    <Page title="SHEIN Trend Report (AI Insights)" subtitle="Stitch reference: shein_trend_report_ai_insights" icon="shopping_bag">
      <div className="h-48 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-center text-on-surface-variant text-sm">
        Trend chart and AI callouts — scaffold
      </div>
    </Page>
  )
}

export function SignedDocumentArchivePage() {
  return (
    <Page title="Signed Document Archive" subtitle="Stitch reference: signed_document_archive" icon="folder_special">
      <ul className="divide-y divide-outline-variant/10 rounded-xl border border-outline-variant/10 bg-surface-container-low text-sm">
        {['NDA_2025_03.pdf', 'Partner_addendum.pdf'].map((f) => (
          <li key={f} className="px-4 py-3 flex justify-between">
            <span>{f}</span>
            <span className="text-on-surface-variant text-xs">Signed</span>
          </li>
        ))}
      </ul>
    </Page>
  )
}

export function SignedDocumentArchiveExpirationAlertsPage() {
  return (
    <Page
      title="Signed Documents + Expiration Alerts"
      subtitle="Stitch reference: signed_document_archive_with_expiration_alerts"
      icon="schedule"
    >
      <div className="space-y-2 text-sm">
        {[
          { doc: 'MSA_v2.pdf', days: '14d' },
          { doc: 'DPA_eu.pdf', days: '3d' },
        ].map((row) => (
          <div key={row.doc} className="flex justify-between bg-surface-container-low rounded-lg px-4 py-2 border border-outline-variant/10">
            <span>{row.doc}</span>
            <span className="text-amber-700 dark:text-amber-400 font-semibold">{row.days}</span>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function SmsPersonalizationSettings1Page() {
  return (
    <Page title="SMS Personalization (1)" subtitle="Stitch reference: sms_personalization_settings_1" icon="sms">
      <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 text-sm text-on-surface-variant">
        Merge fields and tone — variant 1 scaffold
      </div>
    </Page>
  )
}

export function SmsPersonalizationSettings2Page() {
  return (
    <Page title="SMS Personalization (2)" subtitle="Stitch reference: sms_personalization_settings_2" icon="chat">
      <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 text-sm text-on-surface-variant">
        Merge fields and tone — variant 2 scaffold
      </div>
    </Page>
  )
}

export function SocialMediaTrendScannerReportPage() {
  return (
    <Page title="Social Media Trend Scanner" subtitle="Stitch reference: social_media_trend_scanner_report" icon="radar">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {['Rising hashtags', 'Velocity', 'Cross-network'].map((c) => (
          <div key={c} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 text-sm font-semibold">
            {c}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function StoryPreviewFacebookInstagramSharing1Page() {
  return (
    <Page
      title="Story Preview — Facebook + Instagram (1)"
      subtitle="Stitch reference: story_preview_with_facebook_instagram_sharing_1"
      icon="photo_library"
    >
      <div className="aspect-[9/16] max-w-[200px] mx-auto rounded-xl bg-surface-container-highest border border-outline-variant/10" />
    </Page>
  )
}

export function StoryPreviewFacebookInstagramSharing2Page() {
  return (
    <Page
      title="Story Preview — Facebook + Instagram (2)"
      subtitle="Stitch reference: story_preview_with_facebook_instagram_sharing_2"
      icon="collections"
    >
      <div className="aspect-[9/16] max-w-[200px] mx-auto rounded-xl bg-surface-container-highest border border-outline-variant/10" />
    </Page>
  )
}

export function StoryPreviewFormatResolutionSettingsPage() {
  return (
    <Page
      title="Story Preview — Format + Resolution"
      subtitle="Stitch reference: story_preview_with_format_resolution_settings"
      icon="aspect_ratio"
    >
      <div className="flex gap-4 flex-wrap text-sm">
        {['9:16', '4:5', '1080p'].map((x) => (
          <span key={x} className="px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/10 font-semibold">
            {x}
          </span>
        ))}
      </div>
    </Page>
  )
}

export function StoryPreviewFullSocialSharingYoutubePage() {
  return (
    <Page
      title="Story Preview — Full Social + YouTube"
      subtitle="Stitch reference: story_preview_with_full_social_sharing_incl._youtube"
      icon="hub"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {['FB', 'IG', 'YT', 'X'].map((p) => (
          <div key={p} className="w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant/10 flex items-center justify-center text-xs font-bold">
            {p}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function StoryPreviewInstagramSharingPage() {
  return (
    <Page title="Story Preview — Instagram" subtitle="Stitch reference: story_preview_with_instagram_sharing" icon="photo_camera">
      <div className="aspect-[9/16] max-w-[200px] mx-auto rounded-xl bg-surface-container-highest border border-outline-variant/10" />
    </Page>
  )
}

export function StoryPreviewResolutionSettingsPage() {
  return (
    <Page title="Story Preview — Resolution" subtitle="Stitch reference: story_preview_with_resolution_settings" icon="hd">
      <div className="grid grid-cols-2 gap-3 max-w-sm">
        {['720p', '1080p', '4K'].map((r) => (
          <button
            key={r}
            type="button"
            className="py-2 rounded-lg bg-surface-container-low border border-outline-variant/10 text-sm font-semibold"
          >
            {r}
          </button>
        ))}
      </div>
    </Page>
  )
}

export function StoryPreviewSocialAnalyticsSummaryPage() {
  return (
    <Page
      title="Story Preview — Social Analytics"
      subtitle="Stitch reference: story_preview_with_social_analytics_summary"
      icon="analytics"
    >
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        {['Views', 'Saves', 'CTR'].map((m) => (
          <div key={m} className="bg-surface-container-low rounded-lg py-3 border border-outline-variant/10">
            <div className="text-on-surface-variant text-xs">{m}</div>
            <div className="font-bold mt-1">—</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function StorySequencePreviewPage() {
  return (
    <Page title="Story Sequence Preview" subtitle="Stitch reference: story_sequence_preview" icon="view_carousel">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="shrink-0 w-24 aspect-[9/16] rounded-lg bg-surface-container-highest border border-outline-variant/10" />
        ))}
      </div>
    </Page>
  )
}

export function StorySequencePreviewWithExportPage() {
  return (
    <Page title="Story Sequence + Export" subtitle="Stitch reference: story_sequence_preview_with_export" icon="ios_share">
      <div className="flex gap-4 items-start">
        <div className="flex gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-20 aspect-[9/16] rounded-lg bg-surface-container-highest border border-outline-variant/10" />
          ))}
        </div>
        <span className="text-sm text-on-surface-variant">Export MP4 / ZIP — scaffold</span>
      </div>
    </Page>
  )
}

export function StoryboardEditorPage() {
  return (
    <Page title="Storyboard Editor" subtitle="Stitch reference: storyboard_editor" icon="dashboard">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {['Shot 1', 'Shot 2', 'Shot 3', 'Shot 4'].map((s) => (
          <div key={s} className="aspect-video bg-surface-container-low rounded-lg border border-outline-variant/10 flex items-center justify-center text-xs">
            {s}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function StoryboardEditorTransitionsPage() {
  return (
    <Page title="Storyboard Editor — Transitions" subtitle="Stitch reference: storyboard_editor_transitions" icon="animation">
      <div className="flex flex-wrap gap-2 text-sm">
        {['Cut', 'Dissolve', 'Slide'].map((t) => (
          <span key={t} className="px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/10 font-semibold">
            {t}
          </span>
        ))}
      </div>
    </Page>
  )
}

export function TemuTrendReportAiInsightsPage() {
  return (
    <Page title="Temu Trend Report (AI Insights)" subtitle="Stitch reference: temu_trend_report_ai_insights" icon="storefront">
      <div className="h-48 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-center text-on-surface-variant text-sm">
        Category velocity and AI summaries — scaffold
      </div>
    </Page>
  )
}

export function TiktokPerformanceIntelligenceReportPage() {
  return (
    <Page title="TikTok Performance Intelligence" subtitle="Stitch reference: tiktok_performance_intelligence_report" icon="music_note">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['Views', 'Engagement', 'CPA', 'Spark Ads'].map((k) => (
          <div key={k} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 text-center text-sm">
            <div className="text-on-surface-variant text-xs">{k}</div>
            <div className="font-bold mt-1">—</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function UpdatedSetupAssistantPage() {
  return (
    <Page title="Setup Assistant (Updated)" subtitle="Stitch reference: updated_setup_assistant" icon="auto_awesome">
      <ol className="space-y-3 text-sm max-w-lg">
        {['Workspace defaults', 'Compliance profile', 'Channel linking', 'Review & launch'].map((step, i) => (
          <li key={step} className="flex gap-3 items-start bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant/10">
            <span className="font-black text-primary shrink-0">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </Page>
  )
}

export function UserRegistrationPage() {
  return (
    <Page title="User Registration" subtitle="Stitch reference: user_registration" icon="person_add">
      <div className="max-w-md space-y-3">
        {['Email', 'Password', 'Organization'].map((field) => (
          <div key={field} className="h-10 rounded-lg bg-surface-container-low border border-outline-variant/10 px-3 flex items-center text-xs text-on-surface-variant">
            {field}
          </div>
        ))}
        <div className="h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-bold text-primary">
          Create account — scaffold
        </div>
      </div>
    </Page>
  )
}

export function UserSettingsAccountConnections1Page() {
  return (
    <Page title="Account Connections (1)" subtitle="Stitch reference: user_settings_account_connections_1" icon="link">
      <ul className="divide-y divide-outline-variant/10 rounded-xl border border-outline-variant/10 bg-surface-container-low text-sm">
        {['Meta Business', 'Google Ads'].map((p) => (
          <li key={p} className="px-4 py-3 flex justify-between items-center">
            <span>{p}</span>
            <span className="text-xs font-semibold text-primary">Connect</span>
          </li>
        ))}
      </ul>
    </Page>
  )
}

export function UserSettingsAccountConnections2Page() {
  return (
    <Page title="Account Connections (2)" subtitle="Stitch reference: user_settings_account_connections_2" icon="hub">
      <p className="text-sm text-on-surface-variant mb-3">Alternate layout / state — scaffold.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {['Shopify', 'TikTok Ads'].map((p) => (
          <div key={p} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 text-sm font-semibold">
            {p}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function VoiceLibraryPage() {
  return (
    <Page title="Voice Library" subtitle="Stitch reference: voice_library" icon="record_voice_over">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {['Neutral EN', 'Warm ES', 'Bold promo'].map((v) => (
          <div key={v} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10">
            <div className="font-bold text-sm">{v}</div>
            <div className="text-xs text-on-surface-variant mt-2">Preview / clone — scaffold</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function YoutubePerformanceIntelligenceReportPage() {
  return (
    <Page title="YouTube Performance Intelligence" subtitle="Stitch reference: youtube_performance_intelligence_report" icon="smart_display">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['Watch time', 'CTR', 'RPM', 'Shorts'].map((k) => (
          <div key={k} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10 text-center text-sm">
            <div className="text-on-surface-variant text-xs">{k}</div>
            <div className="font-bold mt-1">—</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

