import { Link } from 'react-router-dom'

const mode = (import.meta.env.VITE_AI_SECURITY_MODE as string | undefined)?.trim() || 'monitoring'
const feedUrl = (import.meta.env.VITE_SECURITY_UPDATES_FEED_URL as string | undefined)?.trim()

const layers = [
  { id: 'L1', title: '공급망', desc: 'PR·main CI npm audit · 주간 supply-chain 워크플로', done: true },
  { id: 'L2', title: 'BFF·API', desc: '인증, 웹훅 HMAC, AI 도구 승인 큐', done: true },
  {
    id: 'L3',
    title: '콘텐츠 스캔',
    desc: 'POST /api/v1/security/scan-upload 스텁 · 외부 엔진 연동 예정',
    done: 'partial' as const,
  },
  { id: 'L4', title: '프롬프트·도구', desc: '비서 정책·화이트리스트·감사 로그', done: 'partial' as const },
]

const updateCadence = [
  { cycle: '매주', task: 'supply-chain 워크플로 / npm audit', owner: 'DevOps' },
  { cycle: '스프린트', task: '보안 개선 플랜 Phase 항목', owner: '통합 오너' },
  { cycle: '월', task: '의존성 패치·Dependabot', owner: 'BE·FE' },
  { cycle: '분기', task: '키 회전·스모크·이해관계자 체크리스트', owner: 'Sec·PO' },
]

export function AiSecurityHubPage() {
  return (
    <div className="space-y-10 max-w-3xl">
      <header>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">AI 보안 허브</h1>
        <p className="text-on-surface-variant mt-2 text-sm leading-relaxed">
          통합 웹앱·BFF를 위한 <strong className="text-on-surface">다층 방어(백신형)</strong>와{' '}
          <strong className="text-on-surface">보안 업데이트 리듬</strong>을 한 화면에서 봅니다. 상세 기획은 저장소{' '}
          <code className="text-xs bg-surface-container-highest px-1 rounded">docs/integration/AI_ANTIVIRUS_AND_SECURITY_UPDATES.md</code>
          를 참고하세요.
        </p>
      </header>

      <section className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-5">
        <h2 className="text-sm font-bold text-on-surface uppercase tracking-wide mb-3">운영 모드</h2>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
              mode === 'off'
                ? 'bg-surface-container-highest text-on-surface-variant'
                : 'bg-primary/15 text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-base">shield_lock</span>
            {mode === 'off' ? '모니터링 꺼짐 (개발)' : '모니터링 · 단계적 강화'}
          </span>
          {feedUrl ? (
            <a
              href={feedUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              상태 피드 열기
            </a>
          ) : (
            <span className="text-xs text-on-surface-variant">VITE_SECURITY_UPDATES_FEED_URL 미설정 — 정적 안내만 표시</span>
          )}
        </div>
        <p className="text-xs text-on-surface-variant mt-3">
          <code className="font-mono">VITE_AI_SECURITY_MODE</code>로 라벨만 바꿉니다. 실제 차단은 BFF·게이트웨이·CI에서 수행합니다.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-on-surface mb-3">방어 레이어</h2>
        <ul className="space-y-2">
          {layers.map((L) => (
            <li
              key={L.id}
              className="flex gap-3 rounded-xl border border-outline-variant/12 bg-surface-container-low px-4 py-3"
            >
              <span className="font-mono text-xs text-primary font-bold pt-0.5">{L.id}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-on-surface text-sm">{L.title}</span>
                  {L.done === true && (
                    <span className="text-[10px] uppercase font-bold text-secondary">활성</span>
                  )}
                  {L.done === false && (
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">예정</span>
                  )}
                  {L.done === 'partial' && (
                    <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">부분</span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant mt-1">{L.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-on-surface mb-3">보안 업데이트 캘린더</h2>
        <div className="rounded-2xl border border-outline-variant/15 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-high/80 text-on-surface-variant text-xs uppercase">
              <tr>
                <th className="px-3 py-2">주기</th>
                <th className="px-3 py-2">작업</th>
                <th className="px-3 py-2">담당</th>
              </tr>
            </thead>
            <tbody>
              {updateCadence.map((row) => (
                <tr key={row.cycle} className="border-t border-outline-variant/10">
                  <td className="px-3 py-2 font-medium text-on-surface">{row.cycle}</td>
                  <td className="px-3 py-2 text-on-surface-variant">{row.task}</td>
                  <td className="px-3 py-2 text-on-surface-variant">{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
        <h2 className="text-sm font-bold text-on-surface mb-2">로컬·CI 명령</h2>
        <pre className="text-xs font-mono bg-surface-container-highest/80 p-3 rounded-lg overflow-x-auto text-on-surface">
          npm run security:check
        </pre>
        <p className="text-xs text-on-surface-variant mt-2">
          저장소 루트에서 실행. 고위험 취약점이 있으면 종료 코드 1입니다.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/suite/yuai-hub"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Suite 허브
        </Link>
        <Link
          to="/security/sentinel-monitor"
          className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary"
        >
          Sentinel 모니터
          <span className="material-symbols-outlined text-lg">open_in_new</span>
        </Link>
      </div>
    </div>
  )
}
