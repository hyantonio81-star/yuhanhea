import { Page } from '../StitchPageShell'

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

export function GlobalSecurityPolicyDashboardPage() {
  return (
    <Page title="Global Security Policy" subtitle="Stitch reference: global_security_policy_dashboard" icon="admin_panel_settings">
      <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 text-sm">
        Policy matrix by jurisdiction — scaffold.
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

export function ProjectArchiveBatchActions2Page() {
  return (
    <Page title="Project Archive — Batch Actions (2)" subtitle="Stitch reference: project_archive_batch_actions_2" icon="checklist">
      <p className="text-sm text-on-surface-variant">Alternate batch UI state — scaffold.</p>
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

export function SmsPersonalizationSettings1Page() {
  return (
    <Page title="SMS Personalization (1)" subtitle="Stitch reference: sms_personalization_settings_1" icon="sms">
      <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10 text-sm text-on-surface-variant">
        Merge fields and tone — variant 1 scaffold
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
