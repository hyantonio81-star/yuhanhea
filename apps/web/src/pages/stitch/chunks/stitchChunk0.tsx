import { Page } from '../StitchPageShell'

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

export function DashboardPersonalizadoPage() {
  return (
    <Page title="Dashboard Personalizado" subtitle="Stitch reference: dashboard_personalizado" icon="tune">
      <p className="text-sm text-on-surface-variant">Widget layout and saved views — scaffold for Stitch widgets.</p>
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

export function GlobalViralHeatmapPage() {
  return (
    <Page title="Global Viral Heatmap" subtitle="Stitch reference: global_viral_heatmap" icon="whatshot">
      <div className="aspect-video max-w-3xl mx-auto rounded-2xl bg-surface-container-highest border border-outline-variant/10 flex items-center justify-center text-on-surface-variant text-sm">
        Heatmap canvas — port from Stitch
      </div>
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

export function SmsPersonalizationSettings2Page() {
  return (
    <Page title="SMS Personalization (2)" subtitle="Stitch reference: sms_personalization_settings_2" icon="chat">
      <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 text-sm text-on-surface-variant">
        Merge fields and tone — variant 2 scaffold
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
