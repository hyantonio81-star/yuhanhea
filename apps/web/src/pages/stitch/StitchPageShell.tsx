import type { ReactNode } from 'react'

export type PageProps = {
  title: string
  subtitle?: string
  icon?: string
  children?: ReactNode
}

export function Page({ title, subtitle, icon, children }: PageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            {icon ? <span className="material-symbols-outlined text-primary">{icon}</span> : null}
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">{title}</h1>
          </div>
          {subtitle ? <p className="text-on-surface-variant mt-2">{subtitle}</p> : null}
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-container-high text-on-surface font-semibold rounded hover:bg-surface-container-highest transition-colors text-sm">
            Export
          </button>
          <button className="px-4 py-2 bg-primary text-white font-semibold rounded hover:opacity-90 transition-opacity text-sm">
            Run
          </button>
        </div>
      </div>

      {children}
    </div>
  )
}
