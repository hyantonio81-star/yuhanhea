import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }

type State = { hasError: boolean; message?: string }

export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message }
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error('RouteErrorBoundary', err, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6 max-w-lg">
          <h2 className="text-lg font-bold text-on-surface">화면을 불러오지 못했습니다</h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            새로고침하거나 다른 메뉴로 이동해 보세요. 문제가 계속되면 관리자에게 알려 주세요.
          </p>
          {import.meta.env.DEV && this.state.message ? (
            <pre className="mt-4 overflow-x-auto rounded-lg bg-surface-container-highest p-3 text-xs text-on-surface-variant">
              {this.state.message}
            </pre>
          ) : null}
          <button
            type="button"
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
            onClick={() => this.setState({ hasError: false, message: undefined })}
          >
            다시 시도
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
