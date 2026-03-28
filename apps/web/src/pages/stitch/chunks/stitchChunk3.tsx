import { Page } from '../StitchPageShell'

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

export function DisputeResolutionAnalyticsDashboardPage() {
  return (
    <Page title="Dispute Resolution Analytics" subtitle="Stitch reference: dispute_resolution_analytics_dashboard" icon="query_stats">
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
        Funnel, median time-to-close, outcome mix — scaffold.
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

export function LegalApprovalAutomatedRemindersPage() {
  return (
    <Page title="Legal Approval + Automated Reminders" subtitle="Stitch reference: legal_approval_with_automated_reminders" icon="schedule_send">
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 text-sm text-on-surface-variant">
        Reminder cadence and escalation — scaffold (port from Stitch).
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
