import { Link } from 'react-router-dom'

const AGENTS: {
  to: string
  icon: string
  titleKo: string
  titleEs: string
  role: string
  status: 'idle' | 'running' | 'queued'
}[] = [
  {
    to: '/video/script-agent',
    icon: 'edit_note',
    titleKo: '스크립트 에이전트',
    titleEs: 'Agente de guion',
    role: 'Brief → 씬별 대본·자막 초안',
    status: 'idle',
  },
  {
    to: '/video/visual-agent',
    icon: 'movie_filter',
    titleKo: '비주얼 에이전트',
    titleEs: 'Agente visual',
    role: '스토리보드·이미지·영상 클립 생성',
    status: 'running',
  },
  {
    to: '/video/audio-agent',
    icon: 'graphic_eq',
    titleKo: '오디오 에이전트',
    titleEs: 'Agente de audio',
    role: 'TTS·더빙·BGM·효과음 믹스',
    status: 'queued',
  },
  {
    to: '/video/render-queue',
    icon: 'memory',
    titleKo: '렌더·합성 큐',
    titleEs: 'Cola de render',
    role: '타임라인 합성·인코딩·프리뷰',
    status: 'running',
  },
  {
    to: '/video/qa-agent',
    icon: 'verified_user',
    titleKo: '품질·검수 에이전트',
    titleEs: 'Agente de calidad',
    role: '정책·브랜드·기술 스펙 검사',
    status: 'idle',
  },
  {
    to: '/video/publish-agent',
    icon: 'cloud_upload',
    titleKo: '배포 에이전트',
    titleEs: 'Agente de publicación',
    role: '플랫폼별 메타·썸네일·업로드',
    status: 'idle',
  },
]

function StatusBadge({ status }: { status: (typeof AGENTS)[0]['status'] }) {
  const map = {
    idle: { label: '대기', className: 'bg-surface-container-highest text-on-surface-variant' },
    running: { label: '실행 중', className: 'bg-primary-container/40 text-primary font-bold' },
    queued: { label: '큐', className: 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200' },
  }
  const x = map[status]
  return <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${x.className}`}>{x.label}</span>
}

export function VideoAiTeamHubPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            groups
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">동영상 자동 생성 AI 팀</h1>
        </div>
        <p className="text-on-surface-variant max-w-3xl text-sm leading-relaxed">
          기획부터 배포까지 파이프라인을 역할별 에이전트가 나누어 처리합니다. 각 카드를 눌러 에이전트 콘솔로 이동하세요. (백엔드 연동 시 작업 큐·상태가 실시간으로 갱신됩니다.)
        </p>
      </header>

      <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-6">
        <h2 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-4">파이프라인</h2>
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-on-surface-variant">
          {['브리프', '스크립트', '비주얼', '오디오', '렌더', '검수', '배포'].map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-surface-container-highest border border-outline-variant/10 text-on-surface">
                {step}
              </span>
              {i < 6 ? <span className="text-on-surface-variant/50">→</span> : null}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {AGENTS.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="group rounded-2xl border border-outline-variant/15 bg-surface-container-low p-5 hover:border-primary/40 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">{a.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">{a.titleKo}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{a.titleEs}</p>
                </div>
              </div>
              <StatusBadge status={a.status} />
            </div>
            <p className="text-sm text-on-surface-variant mt-4 leading-relaxed">{a.role}</p>
            <div className="mt-4 text-xs font-bold text-primary flex items-center gap-1">
              콘솔 열기
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

type AgentPageProps = {
  title: string
  subtitle: string
  icon: string
  tasks: string[]
}

function AgentConsole({ title, subtitle, icon, tasks }: AgentPageProps) {
  return (
    <div className="space-y-6">
      <header className="flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
        <div>
          <h1 className="text-2xl font-extrabold text-on-surface">{title}</h1>
          <p className="text-sm text-on-surface-variant mt-1">{subtitle}</p>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">작업 큐 (샘플)</h2>
          {tasks.map((t) => (
            <div
              key={t}
              className="flex items-center justify-between rounded-xl border border-outline-variant/10 bg-surface-container-low px-4 py-3 text-sm"
            >
              <span>{t}</span>
              <span className="text-xs text-on-surface-variant">자동</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-outline-variant/15 bg-surface-container-low p-5">
          <h2 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-3">에이전트 설정</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            모델 버전, 출력 포맷, 승인 게이트는 여기에서 구성합니다. API 연결 후 저장됩니다.
          </p>
          <button
            type="button"
            className="mt-4 w-full py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:opacity-90"
          >
            작업 시작 (모의)
          </button>
        </div>
      </div>
    </div>
  )
}

export function VideoScriptAgentPage() {
  return (
    <AgentConsole
      title="스크립트 에이전트"
      subtitle="브리프와 톤·길이 제약을 반영한 씬별 대본·자막 초안"
      icon="edit_note"
      tasks={['캠페인 #1042 — 15초 숏츠 3편', '제품 런칭 — 롱폼 인트로 리라이트', '다국어 자막 — ES 우선 검수 대기']}
    />
  )
}

export function VideoVisualAgentPage() {
  return (
    <AgentConsole
      title="비주얼 에이전트"
      subtitle="스토리보드, B-roll, 생성 이미지·클립을 씬에 매핑"
      icon="movie_filter"
      tasks={['씬 4–7 스틸 생성 중', '브랜드 팔레트 적용 — 배치 2', '인물 일관성 체크 — 시드 고정']}
    />
  )
}

export function VideoAudioAgentPage() {
  return (
    <AgentConsole
      title="오디오 에이전트"
      subtitle="TTS, 더빙 트랙, BGM 덕킹, 효과음 타이밍"
      icon="graphic_eq"
      tasks={['보이스: Neutral KO — 씬 전체', 'BGM: Upbeat retail — 라우드니스 -14 LUFS', '효과음: 전환 3건 삽입']}
    />
  )
}

export function VideoRenderQueuePage() {
  return (
    <AgentConsole
      title="렌더·합성 큐"
      subtitle="타임라인 합성, 해상도·코덱, 워터마크·로고 번인"
      icon="memory"
      tasks={['Job #8821 — 1080p H.264 — 62%', 'Job #8819 — 4K ProRes — 대기', '프리뷰 프록시 — 완료']}
    />
  )
}

export function VideoQaAgentPage() {
  return (
    <AgentConsole
      title="품질·검수 에이전트"
      subtitle="정책 위반, 브랜드 가이드, 기술 스펙(길이, 안전구역) 자동 검사"
      icon="verified_user"
      tasks={['금칙어 스캔 — 통과', '로고 최소 크기 — 경고 1건', '플랫폼 세이프존 — 통과']}
    />
  )
}

export function VideoPublishAgentPage() {
  return (
    <AgentConsole
      title="배포 에이전트"
      subtitle="제목·설명·태그·썸네일 변형, 채널별 업로드 스케줄"
      icon="cloud_upload"
      tasks={['YouTube — 예약 3/28 10:00', 'Instagram Reels — 초안 업로드', 'TikTok — 캡션 A/B 후보 2개']}
    />
  )
}
