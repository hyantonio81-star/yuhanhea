export function PageFallback() {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-2xl border border-outline-variant/15 bg-surface-container-low px-6 py-16"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm font-medium text-on-surface-variant">페이지를 불러오는 중…</p>
    </div>
  )
}
