/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUITE_YUAI_URL?: string
  readonly VITE_SUITE_CRM_URL?: string
  readonly VITE_SUITE_ERP_URL?: string
  /** BFF 베이스 URL (예: `/api` dev 프록시). 비우면 Suite 연동은 로컬 mockBus만 사용. */
  readonly VITE_SUITE_BFF_BASE?: string
  /**
   * 프로덕션 공개 빌드에 넣지 말 것 — 번들에 노출됨. 로컬/내부만. 권장: 동일 출처 프록시 + 쿠키/세션.
   * apps/api `BFF_API_KEY`와 동일할 때만 임시 사용.
   */
  readonly VITE_SUITE_BFF_KEY?: string
  /** `JWT_SECRET`으로 발급한 HS256 Bearer (선택) */
  readonly VITE_SUITE_BFF_JWT?: string
  /** BFF `BFF_ADMIN_KEY`와 동일 — 도구 승인 등 관리 API */
  readonly VITE_SUITE_BFF_ADMIN_KEY?: string
  /** AI 보안 허브 표시 모드: `off` | `monitoring` */
  readonly VITE_AI_SECURITY_MODE?: string
  /** (선택) 보안 상태 JSON 피드 URL */
  readonly VITE_SECURITY_UPDATES_FEED_URL?: string
  /** 사이드바: `full`(기본) | `core` 출시용 축소 */
  readonly VITE_NAV_SURFACE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
