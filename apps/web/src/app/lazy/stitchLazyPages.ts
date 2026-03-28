import { lazy, type ComponentType } from 'react'

function stitchLazyFrom(
  name: string,
  importer: () => Promise<Record<string, ComponentType<object>>>,
) {
  return lazy(() =>
    importer().then((m) => {
      const C = (m as Record<string, ComponentType<object>>)[name]
      if (!C) throw new Error(`Stitch chunk missing export: ${name}`)
      return { default: C }
    }),
  )
}

export const AiCreativeAnalysisPage = stitchLazyFrom('AiCreativeAnalysisPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const AiMediationRulesPage = stitchLazyFrom('AiMediationRulesPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const AiProductTrendsDeployedPage = stitchLazyFrom('AiProductTrendsDeployedPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const AiStorytellerAssistantPage = stitchLazyFrom('AiStorytellerAssistantPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const AiUploadAgentPage = stitchLazyFrom('AiUploadAgentPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const AlibabaTrendReportPage = stitchLazyFrom('AlibabaTrendReportPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const AmazonAffiliateHubTrendReportPage = stitchLazyFrom('AmazonAffiliateHubTrendReportPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const AnaliticaDetalladaPage = stitchLazyFrom('AnaliticaDetalladaPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const AudienceBehaviorForecastingPage = stitchLazyFrom('AudienceBehaviorForecastingPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const AudienceSpecificRuleTargetingPage = stitchLazyFrom('AudienceSpecificRuleTargetingPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const AuditSimulationDashboardPage = stitchLazyFrom('AuditSimulationDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const AutomatedBotMitigationRulesPage = stitchLazyFrom('AutomatedBotMitigationRulesPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const AutomatedBudgetAdjustmentsPage = stitchLazyFrom('AutomatedBudgetAdjustmentsPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const AutomatedContractRenewalRulesPage = stitchLazyFrom('AutomatedContractRenewalRulesPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const AutomatedCounterCampaignsPage = stitchLazyFrom('AutomatedCounterCampaignsPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const AutomatedDataReplayEnginePage = stitchLazyFrom('AutomatedDataReplayEnginePage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const AutomatedDisputeFilingPage = stitchLazyFrom('AutomatedDisputeFilingPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const AutomatedDisputeResolutionDashboardPage = stitchLazyFrom('AutomatedDisputeResolutionDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const AutomatedMediatorPerformanceReportPage = stitchLazyFrom('AutomatedMediatorPerformanceReportPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const AutomatedPolicyPatchingDashboardPage = stitchLazyFrom('AutomatedPolicyPatchingDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const AutomatedPolicyUpdateAlertsPage = stitchLazyFrom('AutomatedPolicyUpdateAlertsPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const AutomatedRegulatoryReportingDashboardPage = stitchLazyFrom('AutomatedRegulatoryReportingDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const AutomatedReinvestmentRulesPage = stitchLazyFrom('AutomatedReinvestmentRulesPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const AutomatedRemediationWorkflowsDashboardPage = stitchLazyFrom('AutomatedRemediationWorkflowsDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const AutomatedResolutionWorkflowsPage = stitchLazyFrom('AutomatedResolutionWorkflowsPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const AutomatedRetargetingWorkflowsPage = stitchLazyFrom('AutomatedRetargetingWorkflowsPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const AutomatedThreatHuntingAgentsDashboardPage = stitchLazyFrom('AutomatedThreatHuntingAgentsDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const AutomatedWarningNotificationsPage = stitchLazyFrom('AutomatedWarningNotificationsPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const AutomatizadorDeIaPage = stitchLazyFrom('AutomatizadorDeIaPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const AvatarCreatorTtsPage = stitchLazyFrom('AvatarCreatorTtsPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const BackgroundMusicCreatorPage = stitchLazyFrom('BackgroundMusicCreatorPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const AvatarCreatorTimelinePage = stitchLazyFrom('AvatarCreatorTimelinePage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const BudgetForecastingNextMonthPage = stitchLazyFrom('BudgetForecastingNextMonthPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const ChainOfCustodyEvidenceVaultPage = stitchLazyFrom('ChainOfCustodyEvidenceVaultPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const ChannelPerformanceDetailedReportPage = stitchLazyFrom('ChannelPerformanceDetailedReportPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const CharacterCreatorMultiStylePage = stitchLazyFrom('CharacterCreatorMultiStylePage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const CompetitorActivityTrackingPage = stitchLazyFrom('CompetitorActivityTrackingPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const CompetitorAdCreativePreviewsPage = stitchLazyFrom('CompetitorAdCreativePreviewsPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const ComplianceAuditLogsPage = stitchLazyFrom('ComplianceAuditLogsPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const ContractPerformanceMetricsDashboard1Page = stitchLazyFrom('ContractPerformanceMetricsDashboard1Page', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const ContractPerformanceMetricsDashboard2Page = stitchLazyFrom('ContractPerformanceMetricsDashboard2Page', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const DashboardPrincipalPage = stitchLazyFrom('DashboardPrincipalPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const DashboardPersonalizadoPage = stitchLazyFrom('DashboardPersonalizadoPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const DisputeEvidenceAnalyticsPage = stitchLazyFrom('DisputeEvidenceAnalyticsPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const DisputePolicyLibraryPage = stitchLazyFrom('DisputePolicyLibraryPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const DisputeResolutionAnalyticsDashboardPage = stitchLazyFrom('DisputeResolutionAnalyticsDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const EmailTemplateEditorPage = stitchLazyFrom('EmailTemplateEditorPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const FacebookPerformanceIntelligenceReportPage = stitchLazyFrom('FacebookPerformanceIntelligenceReportPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const ForensicEvidenceRecoveryDashboardPage = stitchLazyFrom('ForensicEvidenceRecoveryDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const ForensicSecurityAuditDashboardPage = stitchLazyFrom('ForensicSecurityAuditDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const GestionRedesPage = stitchLazyFrom('GestionRedesPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const GlobalComplianceSimulationDashboardPage = stitchLazyFrom('GlobalComplianceSimulationDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const GlobalPerformanceReportsPage = stitchLazyFrom('GlobalPerformanceReportsPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const GlobalSecurityPolicyDashboardPage = stitchLazyFrom('GlobalSecurityPolicyDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const GlobalViralHeatmapPage = stitchLazyFrom('GlobalViralHeatmapPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const InfluencerSentimentAnalysisPage = stitchLazyFrom('InfluencerSentimentAnalysisPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const LegalApprovalWorkflowPage = stitchLazyFrom('LegalApprovalWorkflowPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const LegalApprovalAutomatedRemindersPage = stitchLazyFrom('LegalApprovalAutomatedRemindersPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const LegalApprovalESignatureSignOffPage = stitchLazyFrom('LegalApprovalESignatureSignOffPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const LegalApprovalMultiPartySigningPage = stitchLazyFrom('LegalApprovalMultiPartySigningPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const LegalVarianceReportsDashboardPage = stitchLazyFrom('LegalVarianceReportsDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const LiveCampaignDeploymentPage = stitchLazyFrom('LiveCampaignDeploymentPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const LiveCampaignPerformanceDashboardPage = stitchLazyFrom('LiveCampaignPerformanceDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const MarketingAnalyticsRoiDashboardPage = stitchLazyFrom('MarketingAnalyticsRoiDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const NetworkHealthMonitorPage = stitchLazyFrom('NetworkHealthMonitorPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const OmnichannelRetargetingSmsEmailPage = stitchLazyFrom('OmnichannelRetargetingSmsEmailPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const PerformanceComparisonMomPage = stitchLazyFrom('PerformanceComparisonMomPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const PredictiveDisputeModelingDashboardPage = stitchLazyFrom('PredictiveDisputeModelingDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const PredictivePayoutTrackingDashboardPage = stitchLazyFrom('PredictivePayoutTrackingDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const ProjectArchivePage = stitchLazyFrom('ProjectArchivePage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const ProjectArchiveBatchActions1Page = stitchLazyFrom('ProjectArchiveBatchActions1Page', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const ProjectArchiveBatchActions2Page = stitchLazyFrom('ProjectArchiveBatchActions2Page', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const ProjectArchiveFilterBySocialNetworkPage = stitchLazyFrom('ProjectArchiveFilterBySocialNetworkPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const ProjectArchiveTrashRestorePage = stitchLazyFrom('ProjectArchiveTrashRestorePage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const RealTimeIntrusionPreventionDashboardPage = stitchLazyFrom('RealTimeIntrusionPreventionDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const RegionSpecificComplianceSettingsPage = stitchLazyFrom('RegionSpecificComplianceSettingsPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const RegionalComplianceHeatmapsPage = stitchLazyFrom('RegionalComplianceHeatmapsPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const RegionalLegalTemplateManagementPage = stitchLazyFrom('RegionalLegalTemplateManagementPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const RegistrationGuideBotPage = stitchLazyFrom('RegistrationGuideBotPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const ReinvestmentHistoryLogsPage = stitchLazyFrom('ReinvestmentHistoryLogsPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const RemediationAbTestingDashboardPage = stitchLazyFrom('RemediationAbTestingDashboardPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const RuleLogicAbTestingSimulationStitchPage = stitchLazyFrom('RuleLogicAbTestingSimulationStitchPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const RulePerformanceComparisonPage = stitchLazyFrom('RulePerformanceComparisonPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const SentinelAiAccessControlPage = stitchLazyFrom('SentinelAiAccessControlPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const SentinelAiSecurityMonitorPage = stitchLazyFrom('SentinelAiSecurityMonitorPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const SetupAssistantPage = stitchLazyFrom('SetupAssistantPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const SheinTrendReportAiInsightsPage = stitchLazyFrom('SheinTrendReportAiInsightsPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const SignedDocumentArchivePage = stitchLazyFrom('SignedDocumentArchivePage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const SignedDocumentArchiveExpirationAlertsPage = stitchLazyFrom('SignedDocumentArchiveExpirationAlertsPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const SmsPersonalizationSettings1Page = stitchLazyFrom('SmsPersonalizationSettings1Page', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const SmsPersonalizationSettings2Page = stitchLazyFrom('SmsPersonalizationSettings2Page', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const SocialMediaTrendScannerReportPage = stitchLazyFrom('SocialMediaTrendScannerReportPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const StoryPreviewFacebookInstagramSharing1Page = stitchLazyFrom('StoryPreviewFacebookInstagramSharing1Page', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const StoryPreviewFacebookInstagramSharing2Page = stitchLazyFrom('StoryPreviewFacebookInstagramSharing2Page', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const StoryPreviewFormatResolutionSettingsPage = stitchLazyFrom('StoryPreviewFormatResolutionSettingsPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const StoryPreviewFullSocialSharingYoutubePage = stitchLazyFrom('StoryPreviewFullSocialSharingYoutubePage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const StoryPreviewInstagramSharingPage = stitchLazyFrom('StoryPreviewInstagramSharingPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const StoryPreviewResolutionSettingsPage = stitchLazyFrom('StoryPreviewResolutionSettingsPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const StoryPreviewSocialAnalyticsSummaryPage = stitchLazyFrom('StoryPreviewSocialAnalyticsSummaryPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const StorySequencePreviewPage = stitchLazyFrom('StorySequencePreviewPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const StorySequencePreviewWithExportPage = stitchLazyFrom('StorySequencePreviewWithExportPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const StoryboardEditorPage = stitchLazyFrom('StoryboardEditorPage', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const StoryboardEditorTransitionsPage = stitchLazyFrom('StoryboardEditorTransitionsPage', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const TemuTrendReportAiInsightsPage = stitchLazyFrom('TemuTrendReportAiInsightsPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const TiktokPerformanceIntelligenceReportPage = stitchLazyFrom('TiktokPerformanceIntelligenceReportPage', () => import('../../pages/stitch/chunks/stitchChunk2'))

export const UpdatedSetupAssistantPage = stitchLazyFrom('UpdatedSetupAssistantPage', () => import('../../pages/stitch/chunks/stitchChunk3'))

export const UserRegistrationPage = stitchLazyFrom('UserRegistrationPage', () => import('../../pages/stitch/chunks/stitchChunk4'))

export const UserSettingsAccountConnections1Page = stitchLazyFrom('UserSettingsAccountConnections1Page', () => import('../../pages/stitch/chunks/stitchChunk5'))

export const UserSettingsAccountConnections2Page = stitchLazyFrom('UserSettingsAccountConnections2Page', () => import('../../pages/stitch/chunks/stitchChunk0'))

export const VoiceLibraryPage = stitchLazyFrom('VoiceLibraryPage', () => import('../../pages/stitch/chunks/stitchChunk1'))

export const YoutubePerformanceIntelligenceReportPage = stitchLazyFrom('YoutubePerformanceIntelligenceReportPage', () => import('../../pages/stitch/chunks/stitchChunk2'))
