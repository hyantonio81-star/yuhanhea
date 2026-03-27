export function FraudPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border-b-2 border-primary/10">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Security Health Index</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-extrabold text-on-surface">98.4%</h3>
            <span className="text-secondary font-bold text-sm mb-1">+0.2%</span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-4">
            <div className="bg-primary h-full rounded-full" style={{ width: '98.4%' }} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Prevented Fraud</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-extrabold text-on-surface">$142.8k</h3>
          </div>
          <div className="flex gap-1 mt-4">
            <div className="h-8 flex-1 bg-secondary/10 rounded-sm" />
            <div className="h-6 mt-2 flex-1 bg-secondary/20 rounded-sm" />
            <div className="h-10 -mt-2 flex-1 bg-secondary/30 rounded-sm" />
            <div className="h-7 mt-1 flex-1 bg-secondary/40 rounded-sm" />
            <div className="h-9 -mt-1 flex-1 bg-secondary/50 rounded-sm" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Active Threat Level</p>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
            <h3 className="text-3xl font-extrabold text-on-surface">Low</h3>
          </div>
          <p className="text-xs text-on-surface-variant mt-4 italic">
            No critical anomalies detected in last 24h
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <p className="text-on-surface-variant text-sm font-medium mb-1">Mitigation Actions</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-extrabold text-on-surface">12</h3>
            <span className="text-on-surface-variant text-sm mb-1">Manual/Auto</span>
          </div>
          <div className="flex -space-x-2 mt-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs ring-2 ring-white">
              AI
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs ring-2 ring-white">
              SH
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant text-xs ring-2 ring-white">
              +10
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-8 relative overflow-hidden min-h-[400px]">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-xl font-bold">Real-Time Threat Monitor</h2>
                <p className="text-on-surface-variant text-sm">Global Affiliate Traffic Nodes</p>
              </div>
              <div className="bg-surface-container-lowest px-4 py-1.5 rounded-full text-xs font-bold border border-outline-variant flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" />
                LIVE STREAMING
              </div>
            </div>

            <div className="relative w-full h-64 rounded-xl bg-on-surface overflow-hidden">
              <img
                alt="Global Cyber Map"
                className="w-full h-full object-cover opacity-40"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUzpS64agA7wOOulI-qpyHQyoRc6e0w2Ie75a_U9jaXWMr_CS4hCwK9heaSpa6vzuhebvSoGAe3Os8ICwIgaePnMjq0W-Lc15NBwtIjgFvzNk3jtk_soYyrut58ulCdaPuql5CRiN47BaIexCvzrNv8gAC2PH0feYt9s8NXnXznYf8ztKCOHmQFdDrwYA5Qc40TfKkjfySt2P7TIZtGLK3hY8YtPw_ffHgjcsvvB8XfRD2ywAime3DnRFv4DNBXkQlmAZ7jOOell4"
              />
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-error rounded-full blur-md opacity-70 animate-ping"></div>
              <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-secondary-fixed-dim rounded-full blur-sm opacity-60"></div>
              <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-error rounded-full blur-sm opacity-80 animate-pulse"></div>
              <div className="absolute bottom-4 left-4 bg-on-surface/80 backdrop-blur-md p-3 rounded-lg border border-outline">
                <p className="text-[10px] text-outline uppercase tracking-widest mb-1">Detected Anomaly</p>
                <p className="text-sm font-mono text-white">IP: 185.212.11.42 [Moscow]</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-container-high">
          <h2 className="text-xl font-bold mb-6">Fraud Pattern Analysis</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">Cookie Stuffing</span>
                <span className="text-xs bg-error-container text-on-error-container px-2 py-0.5 rounded">
                  High Risk
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="bg-error h-full" style={{ width: '74%' }} />
                </div>
                <span className="text-xs font-bold text-on-surface w-8 text-right">74%</span>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-1">
                AI Confidence: 99.2% • Impact: $4,200/day
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">Click Injection</span>
                <span className="text-xs bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded">
                  Moderate
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: '32%' }} />
                </div>
                <span className="text-xs font-bold text-on-surface w-8 text-right">32%</span>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-1">
                AI Confidence: 87.5% • Impact: $1,100/day
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">Pixel Laundering</span>
                <span className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded">
                  Low
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '12%' }} />
                </div>
                <span className="text-xs font-bold text-on-surface w-8 text-right">12%</span>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-1">
                AI Confidence: 94.1% • Impact: $240/day
              </p>
            </div>
          </div>

          <button className="w-full mt-8 py-2 text-primary font-bold text-sm border-2 border-primary/10 rounded-lg hover:bg-primary/5 transition-colors">
            View Full Pattern Library
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-on-surface text-surface rounded-2xl p-6 h-[450px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                terminal
              </span>
              <h2 className="font-bold">Sentinel AI Logs</h2>
            </div>
            <span className="text-[10px] font-mono opacity-50">V4.2.0-STABLE</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 font-mono text-xs pr-2">
            <div className="opacity-80 border-l-2 border-secondary pl-3 py-1">
              <p className="text-secondary">[09:42:11] ACTION: BLOCK_IP</p>
              <p>Source: 213.14.99.102. Reason: Rapid_Click_Burst</p>
            </div>
            <div className="opacity-60 border-l-2 border-outline pl-3 py-1">
              <p className="text-primary-fixed">[09:42:05] SCAN: NODE_SYNC</p>
              <p>Integrity check passed on Amazon_US_Node</p>
            </div>
            <div className="opacity-80 border-l-2 border-error pl-3 py-1">
              <p className="text-error">[09:41:58] ALERT: DOMAIN_BLACKLIST</p>
              <p>Found 4 patterns matching 'aff-scam-track.ru'</p>
            </div>
            <div className="opacity-80 border-l-2 border-secondary pl-3 py-1">
              <p className="text-secondary">[09:41:42] ACTION: RATE_LIMIT</p>
              <p>Applied to sub-affiliate: 'SilverTrack_7'</p>
            </div>
            <div className="opacity-60 border-l-2 border-outline pl-3 py-1">
              <p className="text-primary-fixed">[09:41:30] SCAN: PAYLOAD_INTEGRITY</p>
              <p>Verified 1,042 transactions for Temu Global</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-8 border border-surface-container-high flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Network Risk Comparison</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-bold bg-surface-container-high rounded-full">24H</button>
              <button className="px-3 py-1 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-full">
                7D
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-on-surface-variant text-[10px] uppercase tracking-wider border-b border-surface-container">
                  <th className="pb-4 font-bold">Network</th>
                  <th className="pb-4 font-bold">Total Events</th>
                  <th className="pb-4 font-bold">Risk Score</th>
                  <th className="pb-4 font-bold">Mitigated</th>
                  <th className="pb-4 font-bold">Trend</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="group hover:bg-surface-container-low transition-colors">
                  <td className="py-5 font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-[10px]">
                      AMZ
                    </div>
                    Amazon Associates
                  </td>
                  <td className="py-5">4,821</td>
                  <td className="py-5">
                    <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-bold">
                      CRITICAL
                    </span>
                  </td>
                  <td className="py-5 font-mono">99.1%</td>
                  <td className="py-5">
                    <span className="material-symbols-outlined text-error">trending_up</span>
                  </td>
                </tr>
                <tr className="group hover:bg-surface-container-low transition-colors">
                  <td className="py-5 font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-[10px]">
                      TMU
                    </div>
                    Temu Global
                  </td>
                  <td className="py-5">1,244</td>
                  <td className="py-5">
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                      LOW
                    </span>
                  </td>
                  <td className="py-5 font-mono">100%</td>
                  <td className="py-5">
                    <span className="material-symbols-outlined text-secondary">trending_down</span>
                  </td>
                </tr>
                <tr className="group hover:bg-surface-container-low transition-colors">
                  <td className="py-5 font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-[10px]">
                      SHN
                    </div>
                    Shein Partners
                  </td>
                  <td className="py-5">902</td>
                  <td className="py-5">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold">
                      STABLE
                    </span>
                  </td>
                  <td className="py-5 font-mono">98.4%</td>
                  <td className="py-5">
                    <span className="material-symbols-outlined text-outline">trending_flat</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

