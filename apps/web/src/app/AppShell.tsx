import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getVisibleNavItems } from './nav'
import { pathToNavKey } from '../i18n/pathToNavKey'
import { PageFallback } from './PageFallback'
import { RouteErrorBoundary } from './RouteErrorBoundary'

export type AppShellVariant = 'sidebar' | 'topnav-sidebar'

type AppShellProps = {
  variant?: AppShellVariant
  brand?: string
}

export function AppShell({ variant = 'topnav-sidebar', brand = 'Nexus Core' }: AppShellProps) {
  const { t } = useTranslation()
  const navItems = getVisibleNavItems()

  return (
    <div className="min-h-screen bg-background text-on-background">
      {variant === 'topnav-sidebar' ? (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-surface-container-high">
          <div className="mx-auto max-w-screen-2xl px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-xl font-extrabold tracking-tighter text-primary font-headline">
                {brand}
              </span>
              <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-on-surface-variant">
                <span className="opacity-70">{t('shell.headerOperations')}</span>
                <span className="opacity-70">{t('shell.headerAb')}</span>
                <span className="opacity-70">{t('shell.headerSecurity')}</span>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant"
                title={t('shell.notifications')}
              >
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant"
                onClick={() => document.documentElement.classList.toggle('dark')}
                title={t('shell.toggleDark')}
              >
                <span className="material-symbols-outlined">dark_mode</span>
              </button>
            </div>
          </div>
        </header>
      ) : null}

      <div className="flex">
        <aside className="sticky top-0 h-screen w-64 shrink-0 border-r border-surface-container-high bg-surface/80 backdrop-blur-md">
          <div className="px-4 py-6">
            {variant === 'sidebar' ? (
              <div className="mb-8 px-2">
                <h1 className="text-xl font-extrabold tracking-tight text-on-background font-headline">
                  {brand}
                </h1>
                <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-label mt-1">
                  {t('shell.brandSubtitleSidebar')}
                </p>
              </div>
            ) : (
              <div className="mb-6 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      science
                    </span>
                  </div>
                  <div>
                    <h2 className="font-headline font-extrabold text-primary leading-tight">
                      {brand}
                    </h2>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">
                      {t('shell.brandSubtitle')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <nav className="space-y-1">
              {navItems.map((item, idx) => {
                const prev = navItems[idx - 1]
                const showSection = item.section && item.section !== prev?.section
                const navKey = pathToNavKey(item.to)

                return (
                  <div key={item.to} className="space-y-1">
                    {showSection && item.section ? (
                      <div className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/80">
                        {t(`section.${item.section}`)}
                      </div>
                    ) : null}
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        [
                          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                          isActive
                            ? 'bg-surface-container-low text-primary font-bold border-r-4 border-primary'
                            : 'text-on-surface-variant hover:bg-surface-container-low',
                        ].join(' ')
                      }
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="text-sm">{t(`nav.${navKey}`)}</span>
                    </NavLink>
                  </div>
                )
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-screen-2xl p-6">
            <RouteErrorBoundary>
              <Suspense fallback={<PageFallback />}>
                <Outlet />
              </Suspense>
            </RouteErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  )
}
