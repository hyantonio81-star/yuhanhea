import { lazy } from 'react'

export const AbTriggersPage = lazy(() =>
  import('../../pages/ab-testing/AbTriggersPage').then((m) => ({ default: m.AbTriggersPage })),
)
export const AbLogicPage = lazy(() =>
  import('../../pages/ab-testing/AbLogicPage').then((m) => ({ default: m.AbLogicPage })),
)
export const AbSimulationsPage = lazy(() =>
  import('../../pages/ab-testing/AbSimulationsPage').then((m) => ({ default: m.AbSimulationsPage })),
)
export const OrchestratorPage = lazy(() =>
  import('../../pages/orchestrator/OrchestratorPage').then((m) => ({ default: m.OrchestratorPage })),
)
export const FraudPage = lazy(() =>
  import('../../pages/security/FraudPage').then((m) => ({ default: m.FraudPage })),
)
export const ThreatIntelPage = lazy(() =>
  import('../../pages/security/ThreatIntelPage').then((m) => ({ default: m.ThreatIntelPage })),
)
export const SettingsPage = lazy(() =>
  import('../../pages/settings/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)
export const AiSecurityHubPage = lazy(() =>
  import('../../pages/suite/AiSecurityHubPage').then((m) => ({ default: m.AiSecurityHubPage })),
)
export const SuiteYuaiHubPage = lazy(() =>
  import('../../pages/suite/SuitePages').then((m) => ({ default: m.SuiteYuaiHubPage })),
)
export const SuiteCrmLocalPage = lazy(() =>
  import('../../pages/suite/SuitePages').then((m) => ({ default: m.SuiteCrmLocalPage })),
)
export const SuiteErpFinancePage = lazy(() =>
  import('../../pages/suite/SuitePages').then((m) => ({ default: m.SuiteErpFinancePage })),
)
export const SuitePipelinePage = lazy(() =>
  import('../../pages/suite/SuitePages').then((m) => ({ default: m.SuitePipelinePage })),
)
export const SuiteToolApprovalsPage = lazy(() =>
  import('../../pages/suite/SuitePages').then((m) => ({ default: m.SuiteToolApprovalsPage })),
)
export const VideoAiTeamHubPage = lazy(() =>
  import('../../pages/video/VideoAiTeamPages').then((m) => ({ default: m.VideoAiTeamHubPage })),
)
export const VideoScriptAgentPage = lazy(() =>
  import('../../pages/video/VideoAiTeamPages').then((m) => ({ default: m.VideoScriptAgentPage })),
)
export const VideoVisualAgentPage = lazy(() =>
  import('../../pages/video/VideoAiTeamPages').then((m) => ({ default: m.VideoVisualAgentPage })),
)
export const VideoAudioAgentPage = lazy(() =>
  import('../../pages/video/VideoAiTeamPages').then((m) => ({ default: m.VideoAudioAgentPage })),
)
export const VideoRenderQueuePage = lazy(() =>
  import('../../pages/video/VideoAiTeamPages').then((m) => ({ default: m.VideoRenderQueuePage })),
)
export const VideoQaAgentPage = lazy(() =>
  import('../../pages/video/VideoAiTeamPages').then((m) => ({ default: m.VideoQaAgentPage })),
)
export const VideoPublishAgentPage = lazy(() =>
  import('../../pages/video/VideoAiTeamPages').then((m) => ({ default: m.VideoPublishAgentPage })),
)
