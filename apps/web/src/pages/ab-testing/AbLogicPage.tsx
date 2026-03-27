import { abLogicLog } from '../../mock/abTesting'

export function AbLogicPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-outline uppercase tracking-widest mb-2">
            <span>Experiments</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-primary">Rule Logic A/B Test #442</span>
          </nav>
          <h1 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
            Simulation: Growth Engine v2.4
          </h1>
          <p className="text-on-surface-variant font-medium">
            Testing reinvestment aggressiveness against scale-preserving stability.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-lg border border-outline-variant font-bold text-sm text-on-surface hover:bg-surface-container-low transition-colors">
            Export Data
          </button>
          <button className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            Run Simulation
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 xl:col-span-9 space-y-8">
          <div className="relative overflow-hidden bg-primary-container/10 rounded-2xl p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-l-4 border-primary">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shadow-xl">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">
                  Current Prediction
                </span>
                <h3 className="text-2xl font-bold text-on-primary-fixed leading-tight">
                  Winning Variation: Aggressive Reinvestment
                </h3>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-4xl font-black text-primary tracking-tighter">+12.5%</div>
              <div className="text-sm font-bold text-primary/70 uppercase">Projected ROI Lift</div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-lowest rounded-2xl p-8 border-b-2 border-transparent hover:border-primary transition-all duration-300 group">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Variation A
                  </span>
                  <h4 className="text-xl font-extrabold mt-3 text-on-surface group-hover:text-primary transition-colors">
                    Aggressive Reinvestment
                  </h4>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl opacity-20 group-hover:opacity-100 transition-opacity">
                  trending_up
                </span>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-surface-container pb-4">
                  <span className="text-on-surface-variant text-sm font-medium">Predicted ROI Lift</span>
                  <span className="text-2xl font-black text-secondary">+14.2%</span>
                </div>
                <div className="flex justify-between items-end border-b border-surface-container pb-4">
                  <span className="text-on-surface-variant text-sm font-medium">Execution Frequency</span>
                  <span className="text-lg font-bold">Daily</span>
                </div>
                <div className="flex justify-between items-end border-b border-surface-container pb-4">
                  <span className="text-on-surface-variant text-sm font-medium">Confidence Score</span>
                  <div className="text-right">
                    <span className="text-lg font-bold">94%</span>
                    <div className="w-24 h-1.5 bg-surface-container-highest rounded-full mt-1 overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: '94%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button className="w-full py-3 bg-primary text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                  Apply Winner
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-8 border-b-2 border-transparent hover:border-outline transition-all duration-300 group">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Variation B
                  </span>
                  <h4 className="text-xl font-extrabold mt-3 text-on-surface">Conservative Scaling</h4>
                </div>
                <span className="material-symbols-outlined text-outline text-3xl opacity-20 group-hover:opacity-100 transition-opacity">
                  balance
                </span>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-surface-container pb-4">
                  <span className="text-on-surface-variant text-sm font-medium">Predicted ROI Lift</span>
                  <span className="text-2xl font-black text-on-surface">+1.7%</span>
                </div>
                <div className="flex justify-between items-end border-b border-surface-container pb-4">
                  <span className="text-on-surface-variant text-sm font-medium">Execution Frequency</span>
                  <span className="text-lg font-bold">Weekly</span>
                </div>
                <div className="flex justify-between items-end border-b border-surface-container pb-4">
                  <span className="text-on-surface-variant text-sm font-medium">Confidence Score</span>
                  <div className="text-right">
                    <span className="text-lg font-bold">98%</span>
                    <div className="w-24 h-1.5 bg-surface-container-highest rounded-full mt-1 overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '98%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button className="w-full py-3 bg-surface-container-high text-on-surface-variant rounded-lg font-bold text-sm cursor-not-allowed">
                  Sub-Optimal Performance
                </button>
              </div>
            </div>
          </div>

          <section className="bg-surface-container-low rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold tracking-tight">Simulation Log</h3>
              <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">
                Clear History
              </button>
            </div>
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-surface-container border-b border-outline-variant/10">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                      Timestamp
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                      Trial Parameters
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                      Variation Result
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-right">
                      ROI Shift
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {abLogicLog.map((row) => (
                    <tr key={row.time + row.params} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">{row.time}</td>
                      <td className="px-6 py-4 text-xs font-medium text-on-surface-variant">{row.params}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={[
                              'w-2 h-2 rounded-full',
                              row.variant === 'A' ? 'bg-primary' : 'bg-outline',
                            ].join(' ')}
                          />
                          <span className="text-sm font-bold">Variation {row.variant}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={[
                            'px-2 py-1 rounded text-xs font-bold',
                            row.variant === 'A'
                              ? 'bg-secondary-container text-on-secondary-container'
                              : 'bg-surface-container-highest text-on-surface-variant',
                          ].join(' ')}
                        >
                          {row.shift}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="col-span-12 xl:col-span-3 space-y-8">
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-primary">tune</span>
              <h3 className="text-lg font-extrabold tracking-tight">Parameters</h3>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-3">
                  Network Context
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-bold flex items-center justify-center gap-2">
                    <img
                      alt="Amazon logo"
                      className="w-3 h-3 invert"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgvQtLuRr1w3RsssQ4t6Y0oGK1wxVLKxmB4PhZzwCPvjZd2r2NOiWjtVkp_AtNAhb5d4ESJjhGU0RBSubvTEPpvAaYkkNpPbMPI56DYpZrunCLWLTukJkbWILL2ClZMj7ailh3LyVOdRXvKwG0g6ss-JjQhi_aB9B5d9HPscwSuT1kgEiHeodo-578oWpx8p3TWmGpyrT0z-KmMYHkuVvtVzDXjDRiQF07NSD4mvVE178lQAbQUmz3SOI6zPb8obyziLOiYlAZyIY"
                    />
                    Amazon
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors">
                    <img
                      alt="Temu logo"
                      className="w-3 h-3"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzfm8u16tqI0XjRX7dkGGBrfdTS3F1P_jB8BGOfks0kNBhw2-DZ3WbfhxaxD-EhUQD765dOKTFXGfVju3zQrU0zY7OrrToMtPT2wxVfQ3h8W5QElTyy1nWOAwDm1a771v1fe0zqUWi4etcoorc0A4HAkPqazwHRgrfvhlt7_ZOHjRVAkaPld7Dzjf88cCMMxMALpsaLPNRZtxutSibzm9UNLkLYGNS9DCx6X2amZShZmmMPkddzn0p03LWscYTHqXVhAxgOynLjvE"
                    />
                    Temu
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Budget Scale
                  </label>
                  <span className="text-xs font-bold text-primary">$150,000</span>
                </div>
                <input
                  className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                  type="range"
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-outline">
                  <span>$10k</span>
                  <span>$500k</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-3">
                  Timeframe
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input defaultChecked className="text-primary focus:ring-primary" name="timeframe" type="radio" />
                    <span className="text-sm font-semibold">14 Days (Recommended)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input className="text-primary focus:ring-primary" name="timeframe" type="radio" />
                    <span className="text-sm font-semibold">30 Days</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input className="text-primary focus:ring-primary" name="timeframe" type="radio" />
                    <span className="text-sm font-semibold">90 Days</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-surface-container">
              <div className="bg-surface-container-low rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                  <span className="text-xs font-bold text-on-surface">Insight</span>
                </div>
                <p className="text-xs leading-relaxed text-on-surface-variant">
                  Based on historical Temu data, Aggressive Reinvestment may trigger soft-cap limits earlier
                  than expected.
                </p>
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                <span className="material-symbols-outlined">refresh</span>
                Update Simulation
              </button>
            </div>
          </section>

          <div className="bg-gradient-to-br from-tertiary to-primary rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="font-bold text-sm mb-4 opacity-80 uppercase tracking-widest">Engine Status</h4>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border-4 border-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined">sync</span>
                </div>
                <div>
                  <div className="text-lg font-black">Running Sync</div>
                  <div className="text-[10px] font-bold opacity-70">ETA: 4 MINUTES</div>
                </div>
              </div>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-xs font-bold">
                View API Health
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

