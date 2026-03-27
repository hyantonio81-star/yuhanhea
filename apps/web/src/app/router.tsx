import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from './AppShell'
import * as P from './lazy'

export const router = createBrowserRouter([
  {
    element: <AppShell variant="topnav-sidebar" brand="Nexus Core" />,
    children: [
      { index: true, element: <Navigate to="/orchestrator" replace /> },
      { path: '/orchestrator', element: <P.OrchestratorPage /> },
      { path: '/ops/network-health', element: <P.NetworkHealthMonitorPage /> },
      { path: '/setup/assistant', element: <P.SetupAssistantPage /> },
      { path: '/setup/assistant-updated', element: <P.UpdatedSetupAssistantPage /> },

      { path: '/dashboards/principal', element: <P.DashboardPrincipalPage /> },
      { path: '/dashboards/personalizado', element: <P.DashboardPersonalizadoPage /> },

      { path: '/account/register', element: <P.UserRegistrationPage /> },

      { path: '/suite/yuai-hub', element: <P.SuiteYuaiHubPage /> },
      { path: '/suite/crm/local', element: <P.SuiteCrmLocalPage /> },
      { path: '/suite/erp/finance', element: <P.SuiteErpFinancePage /> },
      { path: '/suite/pipeline', element: <P.SuitePipelinePage /> },
      { path: '/suite/tool-approvals', element: <P.SuiteToolApprovalsPage /> },
      { path: '/suite/ai-security', element: <P.AiSecurityHubPage /> },

      { path: '/ab-testing/triggers', element: <P.AbTriggersPage /> },
      { path: '/ab-testing/logic', element: <P.AbLogicPage /> },
      { path: '/ab-testing/simulations', element: <P.AbSimulationsPage /> },
      { path: '/ab-testing/rule-logic-stitch', element: <P.RuleLogicAbTestingSimulationStitchPage /> },
      { path: '/ab-testing/remediation', element: <P.RemediationAbTestingDashboardPage /> },

      { path: '/ai/creative-analysis', element: <P.AiCreativeAnalysisPage /> },
      { path: '/ai/mediation-rules', element: <P.AiMediationRulesPage /> },
      { path: '/ai/product-trends', element: <P.AiProductTrendsDeployedPage /> },
      { path: '/ai/storyteller', element: <P.AiStorytellerAssistantPage /> },
      { path: '/ai/upload-agent', element: <P.AiUploadAgentPage /> },
      { path: '/ai/registration-guide-bot', element: <P.RegistrationGuideBotPage /> },

      { path: '/studio/avatar-tts', element: <P.AvatarCreatorTtsPage /> },
      { path: '/studio/background-music', element: <P.BackgroundMusicCreatorPage /> },
      { path: '/studio/avatar-timeline', element: <P.AvatarCreatorTimelinePage /> },
      { path: '/studio/character-styles', element: <P.CharacterCreatorMultiStylePage /> },
      { path: '/studio/story/preview-fb-ig-1', element: <P.StoryPreviewFacebookInstagramSharing1Page /> },
      { path: '/studio/story/preview-fb-ig-2', element: <P.StoryPreviewFacebookInstagramSharing2Page /> },
      { path: '/studio/story/preview-format-resolution', element: <P.StoryPreviewFormatResolutionSettingsPage /> },
      { path: '/studio/story/preview-full-social', element: <P.StoryPreviewFullSocialSharingYoutubePage /> },
      { path: '/studio/story/preview-instagram', element: <P.StoryPreviewInstagramSharingPage /> },
      { path: '/studio/story/preview-resolution', element: <P.StoryPreviewResolutionSettingsPage /> },
      { path: '/studio/story/preview-social-analytics', element: <P.StoryPreviewSocialAnalyticsSummaryPage /> },
      { path: '/studio/story/sequence', element: <P.StorySequencePreviewPage /> },
      { path: '/studio/story/sequence-export', element: <P.StorySequencePreviewWithExportPage /> },
      { path: '/studio/storyboard', element: <P.StoryboardEditorPage /> },
      { path: '/studio/storyboard-transitions', element: <P.StoryboardEditorTransitionsPage /> },
      { path: '/studio/voice-library', element: <P.VoiceLibraryPage /> },

      { path: '/video/ai-team', element: <P.VideoAiTeamHubPage /> },
      { path: '/video/script-agent', element: <P.VideoScriptAgentPage /> },
      { path: '/video/visual-agent', element: <P.VideoVisualAgentPage /> },
      { path: '/video/audio-agent', element: <P.VideoAudioAgentPage /> },
      { path: '/video/render-queue', element: <P.VideoRenderQueuePage /> },
      { path: '/video/qa-agent', element: <P.VideoQaAgentPage /> },
      { path: '/video/publish-agent', element: <P.VideoPublishAgentPage /> },

      { path: '/trends/alibaba', element: <P.AlibabaTrendReportPage /> },
      { path: '/trends/amazon', element: <P.AmazonAffiliateHubTrendReportPage /> },
      { path: '/trends/viral-heatmap', element: <P.GlobalViralHeatmapPage /> },
      { path: '/trends/shein-ai', element: <P.SheinTrendReportAiInsightsPage /> },
      { path: '/trends/temu-ai', element: <P.TemuTrendReportAiInsightsPage /> },
      { path: '/trends/social-scanner', element: <P.SocialMediaTrendScannerReportPage /> },

      { path: '/social/gestion-redes', element: <P.GestionRedesPage /> },

      { path: '/archive/projects', element: <P.ProjectArchivePage /> },
      { path: '/archive/batch-actions-1', element: <P.ProjectArchiveBatchActions1Page /> },
      { path: '/archive/batch-actions-2', element: <P.ProjectArchiveBatchActions2Page /> },
      { path: '/archive/filter-social', element: <P.ProjectArchiveFilterBySocialNetworkPage /> },
      { path: '/archive/trash-restore', element: <P.ProjectArchiveTrashRestorePage /> },

      { path: '/finance/budget-forecasting', element: <P.BudgetForecastingNextMonthPage /> },
      { path: '/finance/predictive-payout', element: <P.PredictivePayoutTrackingDashboardPage /> },

      { path: '/contracts/performance-1', element: <P.ContractPerformanceMetricsDashboard1Page /> },
      { path: '/contracts/performance-2', element: <P.ContractPerformanceMetricsDashboard2Page /> },

      { path: '/analytics/detailed', element: <P.AnaliticaDetalladaPage /> },
      { path: '/analytics/channel-performance', element: <P.ChannelPerformanceDetailedReportPage /> },
      { path: '/analytics/facebook-intelligence', element: <P.FacebookPerformanceIntelligenceReportPage /> },
      { path: '/analytics/tiktok-intelligence', element: <P.TiktokPerformanceIntelligenceReportPage /> },
      { path: '/analytics/youtube-intelligence', element: <P.YoutubePerformanceIntelligenceReportPage /> },
      { path: '/analytics/marketing-roi', element: <P.MarketingAnalyticsRoiDashboardPage /> },
      { path: '/analytics/performance-mom', element: <P.PerformanceComparisonMomPage /> },
      { path: '/audience/forecasting', element: <P.AudienceBehaviorForecastingPage /> },
      { path: '/audience/rule-targeting', element: <P.AudienceSpecificRuleTargetingPage /> },
      { path: '/audience/rule-performance', element: <P.RulePerformanceComparisonPage /> },

      { path: '/intel/competitor-activity', element: <P.CompetitorActivityTrackingPage /> },
      { path: '/intel/competitor-ads', element: <P.CompetitorAdCreativePreviewsPage /> },
      { path: '/intel/influencer-sentiment', element: <P.InfluencerSentimentAnalysisPage /> },

      { path: '/campaigns/live-deployment', element: <P.LiveCampaignDeploymentPage /> },
      { path: '/campaigns/live-performance', element: <P.LiveCampaignPerformanceDashboardPage /> },

      { path: '/audit/simulation', element: <P.AuditSimulationDashboardPage /> },

      { path: '/automation/bot-mitigation', element: <P.AutomatedBotMitigationRulesPage /> },
      { path: '/automation/budget-adjustments', element: <P.AutomatedBudgetAdjustmentsPage /> },
      { path: '/automation/contract-renewal', element: <P.AutomatedContractRenewalRulesPage /> },
      { path: '/automation/counter-campaigns', element: <P.AutomatedCounterCampaignsPage /> },
      { path: '/automation/data-replay', element: <P.AutomatedDataReplayEnginePage /> },
      { path: '/automation/reinvestment-rules', element: <P.AutomatedReinvestmentRulesPage /> },
      { path: '/automation/remediation-workflows', element: <P.AutomatedRemediationWorkflowsDashboardPage /> },
      { path: '/automation/resolution-workflows', element: <P.AutomatedResolutionWorkflowsPage /> },
      { path: '/automation/retargeting-workflows', element: <P.AutomatedRetargetingWorkflowsPage /> },
      { path: '/automation/omnichannel-retargeting', element: <P.OmnichannelRetargetingSmsEmailPage /> },
      { path: '/automation/reinvestment-history', element: <P.ReinvestmentHistoryLogsPage /> },
      { path: '/automation/warning-notifications', element: <P.AutomatedWarningNotificationsPage /> },
      { path: '/automation/automatizador-de-ia', element: <P.AutomatizadorDeIaPage /> },

      { path: '/disputes/filing', element: <P.AutomatedDisputeFilingPage /> },
      { path: '/disputes/resolution', element: <P.AutomatedDisputeResolutionDashboardPage /> },
      { path: '/disputes/mediator-performance', element: <P.AutomatedMediatorPerformanceReportPage /> },
      { path: '/disputes/evidence-analytics', element: <P.DisputeEvidenceAnalyticsPage /> },
      { path: '/disputes/policy-library', element: <P.DisputePolicyLibraryPage /> },
      { path: '/disputes/resolution-analytics', element: <P.DisputeResolutionAnalyticsDashboardPage /> },
      { path: '/disputes/predictive-modeling', element: <P.PredictiveDisputeModelingDashboardPage /> },

      { path: '/content/email-templates', element: <P.EmailTemplateEditorPage /> },
      { path: '/content/sms-personalization-1', element: <P.SmsPersonalizationSettings1Page /> },
      { path: '/content/sms-personalization-2', element: <P.SmsPersonalizationSettings2Page /> },

      { path: '/legal/workflow', element: <P.LegalApprovalWorkflowPage /> },
      { path: '/legal/automated-reminders', element: <P.LegalApprovalAutomatedRemindersPage /> },
      { path: '/legal/e-signature', element: <P.LegalApprovalESignatureSignOffPage /> },
      { path: '/legal/multi-party', element: <P.LegalApprovalMultiPartySigningPage /> },
      { path: '/legal/variance-reports', element: <P.LegalVarianceReportsDashboardPage /> },
      { path: '/legal/regional-templates', element: <P.RegionalLegalTemplateManagementPage /> },
      { path: '/legal/signed-archive', element: <P.SignedDocumentArchivePage /> },
      { path: '/legal/signed-archive-expiration', element: <P.SignedDocumentArchiveExpirationAlertsPage /> },

      { path: '/policy/patching', element: <P.AutomatedPolicyPatchingDashboardPage /> },
      { path: '/policy/update-alerts', element: <P.AutomatedPolicyUpdateAlertsPage /> },
      { path: '/compliance/regulatory-reporting', element: <P.AutomatedRegulatoryReportingDashboardPage /> },
      { path: '/compliance/audit-logs', element: <P.ComplianceAuditLogsPage /> },
      { path: '/compliance/global-simulation', element: <P.GlobalComplianceSimulationDashboardPage /> },
      { path: '/compliance/region-settings', element: <P.RegionSpecificComplianceSettingsPage /> },
      { path: '/compliance/regional-heatmaps', element: <P.RegionalComplianceHeatmapsPage /> },

      { path: '/global/performance-reports', element: <P.GlobalPerformanceReportsPage /> },

      { path: '/security/evidence-vault', element: <P.ChainOfCustodyEvidenceVaultPage /> },
      { path: '/security/forensic-recovery', element: <P.ForensicEvidenceRecoveryDashboardPage /> },
      { path: '/security/forensic-audit', element: <P.ForensicSecurityAuditDashboardPage /> },
      { path: '/security/global-policy', element: <P.GlobalSecurityPolicyDashboardPage /> },
      { path: '/security/threat-hunting-agents', element: <P.AutomatedThreatHuntingAgentsDashboardPage /> },
      { path: '/security/intrusion-prevention', element: <P.RealTimeIntrusionPreventionDashboardPage /> },
      { path: '/security/sentinel-access', element: <P.SentinelAiAccessControlPage /> },
      { path: '/security/sentinel-monitor', element: <P.SentinelAiSecurityMonitorPage /> },

      { path: '/security/fraud', element: <P.FraudPage /> },
      { path: '/security/threat-intel', element: <P.ThreatIntelPage /> },
      { path: '/settings/account-connections-1', element: <P.UserSettingsAccountConnections1Page /> },
      { path: '/settings/account-connections-2', element: <P.UserSettingsAccountConnections2Page /> },
      { path: '/settings', element: <P.SettingsPage /> },
    ],
  },
])

