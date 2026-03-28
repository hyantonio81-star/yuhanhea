import { Page } from '../StitchPageShell'

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

export function ContractPerformanceMetricsDashboard2Page() {
  return (
    <Page title="Contract Performance (v2)" subtitle="Stitch reference: contract_performance_metrics_dashboard_2" icon="article">
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 min-h-[240px] flex items-center justify-center text-on-surface-variant text-sm">
        KPI grid and trend charts — port from Stitch HTML
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

export function ProjectArchiveBatchActions1Page() {
  return (
    <Page title="Project Archive — Batch Actions (1)" subtitle="Stitch reference: project_archive_batch_actions_1" icon="select_all">
      <p className="text-sm text-on-surface-variant">Bulk select and action bar — scaffold.</p>
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
