export function ThreatIntelPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Intelligence Command</h1>
          <p className="text-on-surface-variant font-medium mt-1">
            Real-time threat landscape for AffiliateOS Ecosystem
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-surface-container-high text-on-surface font-semibold rounded hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-lg">sync</span>
            Run Deep Scan
          </button>
          <button className="px-4 py-2 bg-surface-container-high text-on-surface font-semibold rounded hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-lg">block</span>
            Update Blocklists
          </button>
          <button className="px-4 py-2 bg-primary text-white font-semibold rounded hover:opacity-90 transition-opacity flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-transparent hover:border-outline-variant/20 transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-primary-fixed-dim/20 text-primary rounded">
              <span className="material-symbols-outlined">groups</span>
            </span>
            <span className="bg-secondary-container/30 text-on-secondary-container text-xs font-bold px-2 py-1 rounded-full">
              +12% Monthly
            </span>
          </div>
          <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider">
            Total Known Actors
          </p>
          <h3 className="text-4xl font-black text-on-surface mt-2 tracking-tighter">1,428</h3>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-transparent">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-secondary-fixed/20 text-secondary rounded">
              <span className="material-symbols-outlined">bolt</span>
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="text-secondary text-xs font-bold uppercase">Active</span>
            </div>
          </div>
          <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider">Feed Status</p>
          <h3 className="text-4xl font-black text-on-surface mt-2 tracking-tighter">Healthy</h3>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-transparent">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-error-container/20 text-error rounded">
              <span className="material-symbols-outlined">visibility</span>
            </span>
            <span className="text-error text-xs font-bold uppercase">Critical</span>
          </div>
          <p className="text-on-surface-variant text-sm font-semibold uppercase tracking-wider">Dark Web Mentions</p>
          <h3 className="text-4xl font-black text-on-surface mt-2 tracking-tighter">248</h3>
          <p className="text-on-surface-variant text-xs mt-2">Captured in last 24h window</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-surface-container-low p-1 rounded-2xl overflow-hidden">
            <div className="bg-surface-container-lowest p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-extrabold text-on-surface tracking-tight">
                  Real-Time Intelligence Feed
                </h2>
                <span className="text-xs font-bold text-on-surface-variant">Last Update: 14:02:41</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-on-surface-variant text-xs font-bold uppercase tracking-wider border-b border-surface-container-high">
                      <th className="pb-4 px-2">Indicator</th>
                      <th className="pb-4 px-2">Severity</th>
                      <th className="pb-4 px-2">Source</th>
                      <th className="pb-4 px-2 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low">
                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-4 px-2">
                        <div className="font-semibold text-on-surface">IP Reputation Shift</div>
                        <div className="text-[10px] font-mono text-outline">192.168.1.104 (Node_Exit)</div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="bg-error-container text-on-error-container text-[10px] font-black px-2 py-0.5 rounded">
                          HIGH
                        </span>
                      </td>
                      <td className="py-4 px-2 text-xs font-medium text-on-surface-variant">
                        Global Threat Intel
                      </td>
                      <td className="py-4 px-2 text-right text-xs text-outline font-mono">14:01:22</td>
                    </tr>

                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-4 px-2">
                        <div className="font-semibold text-on-surface">Botnet Signature Detected</div>
                        <div className="text-[10px] font-mono text-outline">MIRAI_VAR_G01</div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="bg-error-container text-on-error-container text-[10px] font-black px-2 py-0.5 rounded">
                          HIGH
                        </span>
                      </td>
                      <td className="py-4 px-2 text-xs font-medium text-on-surface-variant">Security Mesh v4</td>
                      <td className="py-4 px-2 text-right text-xs text-outline font-mono">13:58:45</td>
                    </tr>

                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-4 px-2">
                        <div className="font-semibold text-on-surface">Leaked Credential Alert</div>
                        <div className="text-[10px] font-mono text-outline">@affiliate_master_db</div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="bg-primary-container text-white text-[10px] font-black px-2 py-0.5 rounded">
                          MEDIUM
                        </span>
                      </td>
                      <td className="py-4 px-2 text-xs font-medium text-on-surface-variant">Dark Web Scan</td>
                      <td className="py-4 px-2 text-right text-xs text-outline font-mono">13:45:10</td>
                    </tr>

                    <tr className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-4 px-2">
                        <div className="font-semibold text-on-surface">API Rate Limit Breach</div>
                        <div className="text-[10px] font-mono text-outline">Endpoint: /v2/payouts</div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="bg-surface-container-highest text-on-surface-variant text-[10px] font-black px-2 py-0.5 rounded">
                          LOW
                        </span>
                      </td>
                      <td className="py-4 px-2 text-xs font-medium text-on-surface-variant">Core Gateway</td>
                      <td className="py-4 px-2 text-right text-xs text-outline font-mono">13:30:04</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-extrabold text-on-surface tracking-tight ml-1">Global Actor Tracking</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-5 rounded-xl border-l-4 border-error">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-black text-on-surface">Lazarus-AFI</h4>
                  <span className="text-[10px] font-bold bg-error-container text-on-error-container px-2 py-0.5 rounded-full">
                    ACTIVE CRITICAL
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-on-surface-variant">Primary Vector</span>
                    <span className="text-on-surface font-bold">Pixel Stuffing</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-error w-[85%]" />
                  </div>
                  <div className="flex justify-between text-[10px] text-on-surface-variant uppercase font-bold">
                    <span>Threat Level</span>
                    <span>85/100</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-xl border-l-4 border-primary">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-black text-on-surface">Void Echo</h4>
                  <span className="text-[10px] font-bold bg-primary-container text-white px-2 py-0.5 rounded-full">
                    MONITORING
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-on-surface-variant">Primary Vector</span>
                    <span className="text-on-surface font-bold">API Exploitation</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[42%]" />
                  </div>
                  <div className="flex justify-between text-[10px] text-on-surface-variant uppercase font-bold">
                    <span>Threat Level</span>
                    <span>42/100</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-xl border-l-4 border-secondary">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-black text-on-surface">Silk Shadows</h4>
                  <span className="text-[10px] font-bold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
                    DEGRADED
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-on-surface-variant">Primary Vector</span>
                    <span className="text-on-surface font-bold">Cookie Stuffing</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[18%]" />
                  </div>
                  <div className="flex justify-between text-[10px] text-on-surface-variant uppercase font-bold">
                    <span>Threat Level</span>
                    <span>18/100</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="bg-primary text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="material-symbols-outlined text-white">psychology</span>
                </div>
                <h2 className="text-lg font-bold">Nexus Core AI Assessment</h2>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-on-primary-container leading-relaxed font-medium">
                  Current global threat level is{' '}
                  <span className="text-secondary-fixed-dim font-black">ELEVATED</span>. Observed patterns
                  suggest a coordinated campaign targeting high-volume payout endpoints across Tier 1
                  networks.
                </p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-xs font-bold text-on-primary-container uppercase tracking-widest mb-2">
                    Recommendation
                  </p>
                  <p className="text-sm font-semibold italic">
                    "Implement Hardened Security Posture: Enable aggressive rate-limiting on /v2/payouts and
                    enforce 2FA for all administrative login attempts originating from unknown ASN providers."
                  </p>
                </div>
                <button className="w-full bg-white text-primary font-black py-3 rounded text-sm hover:bg-surface-container-low transition-colors">
                  Apply Mitigation Steps
                </button>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-on-surface-variant">vpn_lock</span>
              <h2 className="text-lg font-bold text-on-surface tracking-tight">Dark Web Monitor</h2>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="bg-surface-container-high px-3 py-1.5 rounded text-sm font-bold text-error">
                  Temu Exploit
                </span>
                <span className="bg-surface-container-low px-2 py-1 rounded text-xs font-semibold text-on-surface-variant">
                  Amazon API Key
                </span>
                <span className="bg-surface-container-high px-4 py-2 rounded text-lg font-black text-on-surface">
                  Pixel Laundering
                </span>
                <span className="bg-surface-container-low px-3 py-1.5 rounded text-sm font-bold text-primary">
                  Affiliate ID Leak
                </span>
                <span className="bg-surface-container-high px-2 py-1 rounded text-xs font-semibold text-on-surface">
                  Payout Hack
                </span>
                <span className="bg-surface-container-low px-3 py-1 rounded text-sm font-bold text-on-surface-variant">
                  Bot Farm V3
                </span>
                <span className="bg-surface-container-high px-2 py-1 rounded text-xs font-semibold text-on-surface-variant">
                  Ghost Clicks
                </span>
              </div>

              <div className="pt-4 border-t border-surface-container-low">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-outline">
                    Target Frequency
                  </span>
                  <span className="text-xs font-mono text-on-surface-variant">Live Stats</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-[10px] font-bold text-on-surface truncate">Pixel Laundering</div>
                    <div className="flex-1 h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-error w-[92%]" />
                    </div>
                    <div className="text-[10px] font-mono font-bold">92%</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-[10px] font-bold text-on-surface truncate">Amazon API Key</div>
                    <div className="flex-1 h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[65%]" />
                    </div>
                    <div className="text-[10px] font-mono font-bold">65%</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 text-[10px] font-bold text-on-surface truncate">Temu Exploit</div>
                    <div className="flex-1 h-2 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[48%]" />
                    </div>
                    <div className="text-[10px] font-mono font-bold">48%</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

