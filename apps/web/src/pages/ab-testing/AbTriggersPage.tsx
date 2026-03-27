import { abTriggersHistory } from '../../mock/abTesting'

export function AbTriggersPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-none mb-2">
            A/B Testing: Workflow Triggers
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Simulate behavioral variations to optimize conversion velocity and recovery revenue.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-lg text-sm font-bold border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-on-surface">
            Export Data
          </button>
          <button className="px-6 py-2.5 rounded-lg text-sm font-bold bg-primary text-white shadow-lg active:scale-95 transition-all">
            Execute All Variations
          </button>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low rounded-xl p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-outline-variant"></div>
              <div className="flex justify-between items-start mb-6">
                <span className="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Trigger A
                </span>
                <span className="material-symbols-outlined text-outline-variant">drag_handle</span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Abandoned Cart &gt; $100</h3>
              <div className="flex items-center gap-4 py-3 border-y border-outline-variant/10 mb-8">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase font-label tracking-wide">
                    Time Delay
                  </p>
                  <p className="text-lg font-bold">4 Hour Wait</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Recovery Rate</span>
                  <span className="text-lg font-bold text-on-surface">12.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Avg. Order Value</span>
                  <span className="text-lg font-bold text-on-surface">$142.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Monthly Revenue</span>
                  <span className="text-lg font-bold text-on-surface">$18.2k</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest shadow-xl rounded-xl p-8 flex flex-col relative overflow-hidden border-2 border-secondary/20">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-secondary-container/30 text-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>{' '}
                  Winning
                </span>
              </div>
              <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
              <div className="flex justify-between items-start mb-6">
                <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Trigger B
                </span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">Abandoned Cart &gt; $100</h3>
              <div className="flex items-center gap-4 py-3 border-y border-outline-variant/10 mb-8">
                <div className="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">flash_on</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant uppercase font-label tracking-wide">
                    Time Delay
                  </p>
                  <p className="text-lg font-bold">1 Hour Wait</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Recovery Rate</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-secondary">19.8%</span>
                    <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-1.5 py-0.5 rounded">
                      +7.4%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Avg. Order Value</span>
                  <span className="text-lg font-bold text-on-surface">$138.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Monthly Revenue</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-secondary">$26.4k</span>
                    <span className="text-[10px] bg-secondary/10 text-secondary font-bold px-1.5 py-0.5 rounded">
                      High Growth
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="font-headline text-xl font-bold">Simulation Results</h4>
                <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest mt-1">
                  Probability of success over 30 days
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-outline-variant"></span>
                  <span className="text-xs font-medium text-on-surface-variant">Trigger A</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-xs font-medium text-on-surface-variant">Trigger B</span>
                </div>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-4 px-4">
              <div className="flex-1 flex flex-col justify-end gap-1 h-full">
                <div className="w-full bg-outline-variant/30 rounded-t-sm" style={{ height: '35%' }} />
                <div className="w-full bg-primary/40 rounded-t-sm" style={{ height: '55%' }} />
                <p className="text-[9px] text-center mt-2 text-on-surface-variant uppercase font-bold tracking-tighter">
                  Week 1
                </p>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1 h-full">
                <div className="w-full bg-outline-variant/40 rounded-t-sm" style={{ height: '40%' }} />
                <div className="w-full bg-primary/50 rounded-t-sm" style={{ height: '65%' }} />
                <p className="text-[9px] text-center mt-2 text-on-surface-variant uppercase font-bold tracking-tighter">
                  Week 2
                </p>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1 h-full">
                <div className="w-full bg-outline-variant/50 rounded-t-sm" style={{ height: '38%' }} />
                <div className="w-full bg-primary/60 rounded-t-sm" style={{ height: '75%' }} />
                <p className="text-[9px] text-center mt-2 text-on-surface-variant uppercase font-bold tracking-tighter">
                  Week 3
                </p>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1 h-full">
                <div className="w-full bg-outline-variant/60 rounded-t-sm" style={{ height: '42%' }} />
                <div className="w-full bg-primary/80 rounded-t-sm" style={{ height: '90%' }} />
                <p className="text-[9px] text-center mt-2 text-on-surface-variant uppercase font-bold tracking-tighter">
                  Week 4
                </p>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-1 h-full">
                <div className="w-full bg-outline-variant/70 rounded-t-sm" style={{ height: '45%' }} />
                <div className="w-full bg-primary rounded-t-sm" style={{ height: '100%' }} />
                <p className="text-[9px] text-center mt-2 text-on-surface-variant uppercase font-bold tracking-tighter">
                  Predicted
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="glass-card p-8 rounded-xl border border-outline-variant/15 lg:sticky lg:top-24">
            <h4 className="font-headline text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">tune</span>
              Simulation Parameters
            </h4>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  Target Audience
                </label>
                <select className="w-full bg-surface-container-highest/50 border-none border-b border-outline-variant rounded-none text-sm focus:ring-0 focus:border-primary px-0 pb-2">
                  <option>High-LTV Shoppers</option>
                  <option>First-time Visitors</option>
                  <option>Dormant Customers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  Primary Platform
                </label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 rounded-full bg-primary text-white text-[11px] font-bold">
                    Instagram
                  </button>
                  <button className="px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[11px] font-bold">
                    Facebook
                  </button>
                  <button className="px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[11px] font-bold">
                    TikTok
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                  Simulation Budget
                </label>
                <input
                  className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                  type="range"
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-on-surface-variant">
                  <span>$1,000</span>
                  <span>$5,000</span>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/10">
                <div className="p-4 bg-secondary/5 rounded-lg mb-6">
                  <p className="text-xs text-secondary font-medium italic">
                    "Shortening the delay to 1 hour captures impulse buyers before they compare prices on
                    competitor sites."
                  </p>
                </div>
                <button className="w-full py-3 bg-on-surface text-surface rounded-lg font-bold text-sm hover:bg-on-surface/90 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm">refresh</span>
                  Recalculate Model
                </button>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white p-6 rounded-xl flex flex-col gap-4">
            <span className="material-symbols-outlined text-secondary-container">lightbulb</span>
            <h5 className="font-headline font-bold text-lg leading-tight">AI Strategy Insight</h5>
            <p className="text-xs text-on-primary-container leading-relaxed">
              Reducing the trigger wait time for carts &gt; $100 increases recovery velocity by 40% but may
              slightly decrease the average order value due to fewer up-sell opportunities in automated
              emails.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-2">
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="font-headline text-2xl font-extrabold tracking-tight">Simulation History</h3>
          <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1">
            View Detailed Log <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Experiment Name
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Variations
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Status
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Primary Metric
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {abTriggersHistory.map((row) => (
                <tr key={row.name} className="hover:bg-surface-container-low/30 transition-colors">
                  <td className="px-6 py-5">
                    <p className="font-bold text-sm">{row.name}</p>
                    <p className="text-[10px] text-on-surface-variant">Targeting: {row.targeting}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1">
                      {row.variations.map((v) => (
                        <span
                          key={v}
                          className="px-1.5 py-0.5 rounded bg-surface-container text-[9px] font-bold"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={[
                        'text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter',
                        row.statusTone === 'success'
                          ? 'bg-secondary-container/30 text-secondary'
                          : row.statusTone === 'danger'
                            ? 'bg-error-container/30 text-error'
                            : 'bg-surface-container-high text-on-surface-variant',
                      ].join(' ')}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={[
                        'text-sm font-bold',
                        row.metricTone === 'success'
                          ? 'text-secondary'
                          : row.metricTone === 'neutral'
                            ? 'text-on-surface-variant'
                            : 'text-on-surface',
                      ].join(' ')}
                    >
                      {row.metric}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right text-xs text-on-surface-variant font-medium">
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

