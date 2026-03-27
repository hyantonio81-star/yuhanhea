export function OrchestratorPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Command Center</h1>
          <p className="text-on-surface-variant font-medium">
            Managing <span className="text-primary font-bold">14 Active Agent Teams</span> across 8 global
            marketplaces.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-surface-container-lowest p-4 rounded-xl min-w-[140px] shadow-[0_20px_40px_rgba(25,28,30,0.06)]">
            <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">
              Automation
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-on-surface">94%</span>
              <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-xl min-w-[140px] shadow-[0_20px_40px_rgba(25,28,30,0.06)]">
            <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">
              Sync Freq
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-on-surface">2m</span>
              <span className="material-symbols-outlined text-primary text-sm">timer</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-xl min-w-[140px] shadow-[0_20px_40px_rgba(25,28,30,0.06)]">
            <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">
              Success Rate
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-on-surface">99.8%</span>
              <span className="material-symbols-outlined text-secondary text-sm">verified</span>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="bg-surface-container-low rounded-2xl p-6 flex flex-wrap items-center gap-8 border-l-4 border-primary">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">
            Partner Connectivity
          </span>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm">
              <div className="h-2 w-2 rounded-full bg-secondary"></div>
              <span className="text-xs font-bold">Amazon</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm opacity-60">
              <div className="h-2 w-2 rounded-full bg-secondary"></div>
              <span className="text-xs font-bold">Shopify</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm">
              <div className="h-2 w-2 rounded-full bg-secondary"></div>
              <span className="text-xs font-bold">Shein</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm">
              <div className="h-2 w-2 rounded-full bg-secondary"></div>
              <span className="text-xs font-bold">Alibaba</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm">
              <div className="h-2 w-2 rounded-full bg-error"></div>
              <span className="text-xs font-bold">Temu</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-on-surface">Active Agent Teams</h3>
            <button className="text-primary text-xs font-bold hover:underline">Manage All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(25,28,30,0.06)] hover:bg-surface-container-high transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary-fixed rounded-xl text-primary">
                  <span className="material-symbols-outlined">shopping_basket</span>
                </div>
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">
                  ACTIVE
                </span>
              </div>
              <h4 className="text-lg font-bold mb-1">Product Scraper Team</h4>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Extracting pricing and inventory from Temu, Shein, and Alibaba global nodes.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                    A1
                  </div>
                  <div className="h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                    A2
                  </div>
                  <div className="h-6 w-6 rounded-full bg-blue-300 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                    A3
                  </div>
                </div>
                <span className="text-xs font-bold text-primary">12k Requests/hr</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(25,28,30,0.06)] hover:bg-surface-container-high transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-secondary-fixed rounded-xl text-secondary">
                  <span className="material-symbols-outlined">sync_alt</span>
                </div>
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">
                  ACTIVE
                </span>
              </div>
              <h4 className="text-lg font-bold mb-1">Inventory Sync Team</h4>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Real-time SKU mapping and stock status updates for Amazon and Shopify.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                    I1
                  </div>
                  <div className="h-6 w-6 rounded-full bg-emerald-200 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                    I2
                  </div>
                </div>
                <span className="text-xs font-bold text-primary">480 Updates/hr</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(25,28,30,0.06)] hover:bg-surface-container-high transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-tertiary-fixed rounded-xl text-tertiary">
                  <span className="material-symbols-outlined">share</span>
                </div>
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">
                  ACTIVE
                </span>
              </div>
              <h4 className="text-lg font-bold mb-1">Social Commerce Team</h4>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Automated post generation for Instagram, YT Shorts, and TikTok Shop.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                    S1
                  </div>
                  <div className="h-6 w-6 rounded-full bg-indigo-200 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                    S2
                  </div>
                  <div className="h-6 w-6 rounded-full bg-indigo-300 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                    S3
                  </div>
                  <div className="h-6 w-6 rounded-full bg-indigo-400 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                    S4
                  </div>
                </div>
                <span className="text-xs font-bold text-primary">65 Posts Ready</span>
              </div>
            </div>

            <div className="border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center p-6 text-on-surface-variant hover:border-primary transition-colors cursor-pointer group">
              <span className="material-symbols-outlined text-4xl mb-2 group-hover:text-primary transition-colors">
                add_circle
              </span>
              <span className="font-bold text-sm">Initialize New Team</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <h3 className="text-xl font-bold text-on-surface">Live Orchestration</h3>
          <div className="bg-surface-container-low rounded-2xl p-6 min-h-[500px]">
            <div className="space-y-4">
              <div className="bg-surface-container-lowest p-4 rounded-xl border-l-2 border-secondary">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-tight">
                    SCRAPING_TASK
                  </span>
                  <span className="text-[10px] text-on-surface-variant">2s ago</span>
                </div>
                <p className="text-sm font-medium mb-1">Agent A-42 pulling pricing data</p>
                <div className="flex items-center gap-2">
                  <img
                    alt="Amazon"
                    className="h-4 w-4 rounded-sm"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnJ7pIZ8G-RbUFxezWfDs00ZwqLndTAHaMf4GUMxL3MYMos7Fc0reJAHH_s6j76Sw9PAgJy83OHnCltfo8cLXQf43SEsK1JD5mXeEb00iuwKndLwJ7HG-LPhNxjyqX--rpGN-XvxoKcuK3E90LboXa175NRnidoAPNnffTY1ISoiTd0iMF9F9waa1QN5Mp8RVXqErrqFlOoS7dAYmgWaKfPMP0rZklrVLvAqQtgItY6TrlFYZkEmJIGSswm9hMykjlEawiM5g9G6Q"
                  />
                  <span className="text-xs text-on-surface-variant">Amazon Global → Electronics</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-xl border-l-2 border-primary">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-tight">
                    SYNC_PROCESS
                  </span>
                  <span className="text-[10px] text-on-surface-variant">14s ago</span>
                </div>
                <p className="text-sm font-medium mb-1">Stock status updated for Shopify</p>
                <div className="flex items-center gap-2">
                  <img
                    alt="Shopify"
                    className="h-4 w-4 rounded-sm"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqX6Jx40UJlRUM9dRKnzZmbmNBsIDLiwZpi43CDuX7IFnS0Ko6N8_ezFFymAh-iiBX1df336Il3p_7go4Y_Q5INXzEve87jl_gldPSa7xf_CYlkBmjnGw6--mg0oV2MIhHJ9b_G8Kb2IsotfMLq1lYdb_gALU-C2NfgAUKhrN34VOetMauAOywUZi0b8KoOWpfGyeCMmDrj9Hmh9DO9SEZRB6bvUtfzgyKY0npe1_byF4_jnH6qJWcuA7SPX3yiRLOaikFY6Zds8E"
                  />
                  <span className="text-xs text-on-surface-variant">Merchant ID: #99021</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-xl border-l-2 border-tertiary">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-tertiary uppercase tracking-tight">
                    CONTENT_GEN
                  </span>
                  <span className="text-[10px] text-on-surface-variant">1m ago</span>
                </div>
                <p className="text-sm font-medium mb-1">Generating TikTok script for 'Mini Projektor'</p>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs">videocam</span>
                  <span className="text-xs text-on-surface-variant">Viral Trend Analysis Applied</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-xl border-l-2 border-secondary">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-tight">
                    SCRAPING_TASK
                  </span>
                  <span className="text-[10px] text-on-surface-variant">3m ago</span>
                </div>
                <p className="text-sm font-medium mb-1">Agent A-12 completed Shein price audit</p>
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  <span className="text-xs font-bold">4,120 items verified</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
              <div className="inline-block p-1 px-3 bg-surface-container rounded-full animate-pulse">
                <span className="text-[10px] font-bold text-on-surface-variant">
                  MONITORING LIVE STREAMS...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

