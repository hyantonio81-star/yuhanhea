import { Page } from '../StitchPageShell'

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

export function ForensicSecurityAuditDashboardPage() {
  return (
    <Page title="Forensic Security Audit" subtitle="Stitch reference: forensic_security_audit_dashboard" icon="search_check">
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 text-on-surface-variant text-sm">
        Audit timeline, findings severity, remediation — scaffold.
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

export function TemuTrendReportAiInsightsPage() {
  return (
    <Page title="Temu Trend Report (AI Insights)" subtitle="Stitch reference: temu_trend_report_ai_insights" icon="storefront">
      <div className="h-48 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-center text-on-surface-variant text-sm">
        Category velocity and AI summaries — scaffold
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
