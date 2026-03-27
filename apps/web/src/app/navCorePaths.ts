/**
 * `VITE_NAV_SURFACE=core` 일 때 사이드바에 표시할 경로만 허용합니다.
 * 전체 라우트·i18n 키는 그대로 유지됩니다(직접 URL 입력 시 접근 가능).
 */
export const NAV_CORE_PATHS: readonly string[] = [
  '/orchestrator',
  '/ops/network-health',
  '/dashboards/principal',
  '/dashboards/personalizado',
  '/account/register',
  '/suite/yuai-hub',
  '/suite/crm/local',
  '/suite/erp/finance',
  '/suite/pipeline',
  '/suite/tool-approvals',
  '/suite/ai-security',
  '/video/ai-team',
  '/settings',
  '/setup/assistant',
  '/setup/assistant-updated',
]
