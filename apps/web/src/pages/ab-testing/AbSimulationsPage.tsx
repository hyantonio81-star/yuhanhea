import { abSimMetrics } from '../../mock/abTesting'

export function AbSimulationsPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <nav className="flex items-center gap-2 text-on-surface-variant text-sm mb-2">
            <span>Campaigns</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span>Summer Solstice '24</span>
          </nav>
          <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">
            Dynamic Creative Simulation
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Running
          </div>
          <div className="p-4 bg-surface-container-lowest border border-outline-variant/10 rounded-xl flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                Confidence Score
              </span>
              <span className="text-2xl font-headline font-black text-primary">98.4%</span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-sm">bolt</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-9 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img
                  alt="Variation A Creative"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRBgXgg7jKRvZvxQx7QC7spu-0K6zobf9AIAfRC2XreHuSEUmMLQsiCOcMk29mqoI7AZdL-bQt3CvbOeDQhgopSlRtQa0eG0YlxlR0v3Y2_9yTN5RUV6wKj9pcRw7i2IfrZH2OLehVN8GtfWfvIX-QhZz0UkNZWQB9TFZdDBSaBjPb14WyA_xIMyqlWdr0x02ook6p00H8yPdSs041xwcCWyO6r_ods1I37s3e7NT4pBmTAAwxVluVICGYG4EYg26UaHphFq7E2XM"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-on-surface text-surface text-xs font-bold rounded">
                  VARIATION A
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-headline font-bold text-lg mb-2">The Future of Automation</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Experience a seamless workflow with our next-gen affiliate tools. Built for scale,
                  designed for precision.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow border-2 border-secondary/20">
              <div className="aspect-video relative overflow-hidden">
                <img
                  alt="Variation B Creative"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADEq5ze2_Y3jH8ArEhCioRRtZAoLb1zSmpkOVel7STuvu2aD7KBmfjaPE8hPkU_wA_OcLbMjj1BmR-nd-hN3vgM8gniza1_Oiz3lZmLkzMXppt1s2rfxepniCIoVnEbSSyTaCSN29UcxiJaDwbgzA4OyKFOMGBu46dYPpks1IlLSvo82EhbbMXF11F_jU_G-GyG9SLVuklfiR98yTmHHA0TPGRTSsO1WEhuzK8wEv9s2VXeuqB30XktUoeW3I8LfSgUNAzBNGosow"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-white text-xs font-bold rounded flex items-center gap-1">
                  VARIATION B
                  <span
                    className="material-symbols-outlined text-[10px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    stars
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-headline font-bold text-lg mb-2">Automate Your Success</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Stop wasting hours on manual tasks. AffiliateOS handles the complexity so you can focus
                  on strategy.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8">
            <h4 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Simulated Performance Metrics
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                    <th className="px-4 pb-2">Metric</th>
                    <th className="px-4 pb-2">Variation A</th>
                    <th className="px-4 pb-2">Variation B</th>
                    <th className="px-4 pb-2">Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {abSimMetrics.map((row) => (
                    <tr key={row.metric} className="bg-surface-container-lowest rounded-lg group">
                      <td className="px-6 py-5 rounded-l-xl font-bold">{row.metric}</td>
                      <td className="px-6 py-5 text-on-surface-variant font-medium">
                        {row.aWinning ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-secondary">{row.a}</span>
                            <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] rounded-full font-bold">
                              WINNING
                            </span>
                          </div>
                        ) : (
                          row.a
                        )}
                      </td>
                      <td className="px-6 py-5">
                        {row.bWinning ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-secondary">{row.b}</span>
                            <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] rounded-full font-bold">
                              WINNING
                            </span>
                          </div>
                        ) : (
                          <span className="text-on-surface-variant font-medium">{row.b}</span>
                        )}
                      </td>
                      <td
                        className={[
                          'px-6 py-5 rounded-r-xl font-bold',
                          row.delta.startsWith('-') ? 'text-error' : 'text-secondary',
                        ].join(' ')}
                      >
                        {row.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h4 className="font-headline font-bold text-xl mb-1 text-on-surface">
                  Statistical Lift Analysis
                </h4>
                <p className="text-on-surface-variant text-sm">
                  Visualizing the expected performance distribution over 10k simulations.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-on-surface-variant font-bold uppercase block mb-1">
                  Peak Confidence
                </span>
                <span className="text-3xl font-headline font-black text-secondary">+28.4%</span>
              </div>
            </div>

            <div className="h-48 flex items-end gap-1 mb-6">
              <div className="flex-1 bg-surface-container-high rounded-t h-[20%]"></div>
              <div className="flex-1 bg-surface-container-high rounded-t h-[25%]"></div>
              <div className="flex-1 bg-surface-container-high rounded-t h-[35%]"></div>
              <div className="flex-1 bg-surface-container-high rounded-t h-[50%]"></div>
              <div className="flex-1 bg-primary/40 rounded-t h-[70%]"></div>
              <div className="flex-1 bg-primary/60 rounded-t h-[85%]"></div>
              <div className="flex-1 bg-primary rounded-t h-[100%]"></div>
              <div className="flex-1 bg-primary/80 rounded-t h-[90%]"></div>
              <div className="flex-1 bg-primary/60 rounded-t h-[75%]"></div>
              <div className="flex-1 bg-surface-container-high rounded-t h-[55%]"></div>
              <div className="flex-1 bg-surface-container-high rounded-t h-[40%]"></div>
              <div className="flex-1 bg-surface-container-high rounded-t h-[30%]"></div>
              <div className="flex-1 bg-surface-container-high rounded-t h-[20%]"></div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs font-bold text-on-surface-variant bg-surface-container p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">info</span>
                95% Confidence Interval:{' '}
                <span className="text-on-surface">+24.2% to +32.6% Lift</span>
              </div>
              <button className="text-primary hover:underline">View Detailed Math</button>
            </div>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-3 space-y-8">
          <div className="bg-surface-container-low rounded-xl p-6">
            <h4 className="font-headline font-bold text-lg mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">tune</span>
              Simulation Parameters
            </h4>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">
                  Audience Segment
                </label>
                <select className="w-full bg-surface-container-lowest border-none rounded-lg text-sm font-medium py-3 px-4 focus:ring-2 focus:ring-primary shadow-sm">
                  <option>Tech Enthusiasts (Global)</option>
                  <option>Gen Z Creative</option>
                  <option>Executive Decision Makers</option>
                  <option>Small Biz Owners</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">
                  Platform Environment
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center p-3 bg-surface-container-lowest border-2 border-primary rounded-lg">
                    <img
                      alt="FB"
                      className="w-5 h-5 opacity-80"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5z5NN6fGgauuukr5OiI0vIz5Af3QwVXVnOTHRSLLz_cjE1oVXel3ntNwE_0HihARCMJpwb-Ndjyum6KgAVBsM3Up3E0Xcvo76YStTuOwZssP2qO9r3wpKjV9N_M4Hs8u6qVFM0TEdwWp36EfBKmiYPDAhBHvXaL9PvShrZ08fusxcdWd_J-Y8xihhlkU2270cxRvzgOYkjBdc5YJUph8FnvfRnNido8CS_O4i-X_nB7dFDkiGazTiyyrOuR56xnf6341CcGNwnT8"
                    />
                  </button>
                  <button className="flex items-center justify-center p-3 bg-surface-container-lowest border-2 border-transparent hover:border-outline-variant transition-all rounded-lg">
                    <img
                      alt="TikTok"
                      className="w-5 h-5 opacity-80"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA03aXdf5Oz0ASIyRETEpfdl0g2lOC04kYzd5eRLFzRv5RTqGLy2EWBdsxggKckeX9t0J-Df1FZ092Kc41Nu21qPwrEPtyFfzDNQXoLWd8xXPaCop25mOgs-yhpQ5bsa7lhHPzWQlE9cRiW4DhkKi3rp8xhMQplUF_5hlhXof3QtwB1GcDA3YqovOSmVi5YeAGqkiwa-6MkFwyzC5tCXeC7s107XhhNPVaAMZv9VIq8MCaPRFwBdmEvRio-9KMLI0Uk1ND6repz5lg"
                    />
                  </button>
                  <button className="flex items-center justify-center p-3 bg-surface-container-lowest border-2 border-transparent hover:border-outline-variant transition-all rounded-lg">
                    <img
                      alt="Amazon"
                      className="w-5 h-5 opacity-80"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRLB0j3hu0dPZicAGj9yHEEQnkXBzaQ86j40y9pY2YsmXh9nnPBgGcvtwQKDe1m0VobnSBOSwxcXeKQ3CRTmyApXVD9IvvN_N51VOufO8FTMr2OA51TAbh6uZktcrzHGhq38ZNx9muUFCx3xhyIfGXlzA6chgye7aFcfi64tQu-ZW1ub615LGu3OctgRybyKdLtgaaxscJ7rUxeK5OQeZykEek4_9MmMtLalKBbiKsgBE7COQYr4PWU4ZDAw_92zcuXBEqgbmqiyI"
                    />
                  </button>
                  <button className="flex items-center justify-center p-3 bg-surface-container-lowest border-2 border-transparent hover:border-outline-variant transition-all rounded-lg">
                    <img
                      alt="IG"
                      className="w-5 h-5 opacity-80"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB6XKTVqcThwgLjTcW3MYOyCO8sNXbt9chF2olKRmay4rFR9z3UBnH71Z7jSy3q-RRwBAV8z0U6Q2ek7SOlDTaBEc6X1OR1DSb6e5W5oGx36uYQDn8mpjsAaYjQcKvpp5St_AOML-JNnWtW9kCT_RASt-gARGqFpHS2HmCFN7Wx9YmWqhWcXwXP_cbFtiJ82kWBJYPgDnYEg6Vly4_9B7hH6WCvaFcU66vRCeodCynsslz29JgPIXSYOtNNDycC83_n_qJtdT4HLs"
                    />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 block">
                  Sample Size (n)
                </label>
                <input
                  className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                  max={50000}
                  min={1000}
                  step={1000}
                  type="range"
                  defaultValue={25000}
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-on-surface-variant">
                  <span>1K</span>
                  <span>25,000</span>
                  <span>50K</span>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/20">
                <button className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95">
                  <span className="material-symbols-outlined">refresh</span>
                  Run New Simulation
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full py-4 bg-secondary text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined">rocket_launch</span>
              Apply Winner to Live
            </button>
            <button className="w-full py-4 bg-surface-container-highest text-on-surface font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all">
              <span className="material-symbols-outlined">download</span>
              Export Analysis
            </button>
          </div>

          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <span
              className="material-symbols-outlined text-primary mb-4"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lightbulb
            </span>
            <h5 className="font-headline font-bold text-primary mb-2">AI Architect Tip</h5>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              Variation B is outperforming Variation A primarily due to the <b>direct-response headline</b>.
              In the 'Tech Enthusiast' segment, active verbs yield a 40% higher engagement rate.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

