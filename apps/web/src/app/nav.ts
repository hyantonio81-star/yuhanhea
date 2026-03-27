import { NAV_CORE_PATHS } from './navCorePaths'

export type NavItem = {
  to: string
  icon: string
  section?:
    | 'ops'
    | 'ab'
    | 'ai'
    | 'trends'
    | 'analytics'
    | 'audience'
    | 'audit'
    | 'automation'
    | 'disputes'
    | 'policy'
    | 'sec'
    | 'settings'
    | 'studio'
    | 'finance'
    | 'intel'
    | 'compliance'
    | 'home'
    | 'contracts'
    | 'content'
    | 'social'
    | 'global'
    | 'legal'
    | 'campaigns'
    | 'archive'
    | 'account'
    | 'video'
    | 'suite'
}

export const navItems: NavItem[] = [
  { to: '/orchestrator', icon: 'hub', section: 'ops' },
  { to: '/ops/network-health', icon: 'network_check', section: 'ops' },
  { to: '/setup/assistant', icon: 'assistant', section: 'ops' },
  { to: '/setup/assistant-updated', icon: 'auto_awesome', section: 'ops' },

  { to: '/dashboards/principal', icon: 'dashboard', section: 'home' },
  { to: '/dashboards/personalizado', icon: 'tune', section: 'home' },

  { to: '/account/register', icon: 'person_add', section: 'account' },

  { to: '/suite/yuai-hub', icon: 'campaign', section: 'suite' },
  { to: '/suite/crm/local', icon: 'storefront', section: 'suite' },
  { to: '/suite/erp/finance', icon: 'account_balance', section: 'suite' },
  { to: '/suite/pipeline', icon: 'sync_alt', section: 'suite' },
  { to: '/suite/tool-approvals', icon: 'rule', section: 'suite' },
  { to: '/suite/ai-security', icon: 'vaccines', section: 'suite' },

  { to: '/ab-testing/triggers', icon: 'compare_arrows', section: 'ab' },
  { to: '/ab-testing/logic', icon: 'account_tree', section: 'ab' },
  { to: '/ab-testing/simulations', icon: 'science', section: 'ab' },
  { to: '/ab-testing/rule-logic-stitch', icon: 'model_training', section: 'ab' },
  { to: '/ab-testing/remediation', icon: 'healing', section: 'ab' },

  { to: '/ai/creative-analysis', icon: 'neurology', section: 'ai' },
  { to: '/ai/mediation-rules', icon: 'rule', section: 'ai' },
  { to: '/ai/product-trends', icon: 'travel_explore', section: 'ai' },
  { to: '/ai/storyteller', icon: 'auto_stories', section: 'ai' },
  { to: '/ai/upload-agent', icon: 'cloud_upload', section: 'ai' },
  { to: '/ai/registration-guide-bot', icon: 'smart_toy', section: 'ai' },

  { to: '/studio/avatar-tts', icon: 'face', section: 'studio' },
  { to: '/studio/background-music', icon: 'music_note', section: 'studio' },
  { to: '/studio/avatar-timeline', icon: 'view_timeline', section: 'studio' },
  { to: '/studio/character-styles', icon: 'palette', section: 'studio' },
  { to: '/studio/story/preview-fb-ig-1', icon: 'photo_library', section: 'studio' },
  { to: '/studio/story/preview-fb-ig-2', icon: 'collections', section: 'studio' },
  { to: '/studio/story/preview-format-resolution', icon: 'aspect_ratio', section: 'studio' },
  { to: '/studio/story/preview-full-social', icon: 'hub', section: 'studio' },
  { to: '/studio/story/preview-instagram', icon: 'photo_camera', section: 'studio' },
  { to: '/studio/story/preview-resolution', icon: 'hd', section: 'studio' },
  { to: '/studio/story/preview-social-analytics', icon: 'analytics', section: 'studio' },
  { to: '/studio/story/sequence', icon: 'view_carousel', section: 'studio' },
  { to: '/studio/story/sequence-export', icon: 'ios_share', section: 'studio' },
  { to: '/studio/storyboard', icon: 'dashboard', section: 'studio' },
  { to: '/studio/storyboard-transitions', icon: 'animation', section: 'studio' },
  { to: '/studio/voice-library', icon: 'record_voice_over', section: 'studio' },

  { to: '/video/ai-team', icon: 'groups', section: 'video' },
  { to: '/video/script-agent', icon: 'edit_note', section: 'video' },
  { to: '/video/visual-agent', icon: 'movie_filter', section: 'video' },
  { to: '/video/audio-agent', icon: 'graphic_eq', section: 'video' },
  { to: '/video/render-queue', icon: 'memory', section: 'video' },
  { to: '/video/qa-agent', icon: 'verified_user', section: 'video' },
  { to: '/video/publish-agent', icon: 'cloud_upload', section: 'video' },

  { to: '/trends/alibaba', icon: 'insights', section: 'trends' },
  { to: '/trends/amazon', icon: 'shopping_basket', section: 'trends' },
  { to: '/trends/viral-heatmap', icon: 'whatshot', section: 'trends' },
  { to: '/trends/shein-ai', icon: 'shopping_bag', section: 'trends' },
  { to: '/trends/temu-ai', icon: 'storefront', section: 'trends' },
  { to: '/trends/social-scanner', icon: 'radar', section: 'trends' },

  { to: '/social/gestion-redes', icon: 'share', section: 'social' },

  { to: '/archive/projects', icon: 'inventory_2', section: 'archive' },
  { to: '/archive/batch-actions-1', icon: 'select_all', section: 'archive' },
  { to: '/archive/batch-actions-2', icon: 'checklist', section: 'archive' },
  { to: '/archive/filter-social', icon: 'filter_alt', section: 'archive' },
  { to: '/archive/trash-restore', icon: 'restore_from_trash', section: 'archive' },

  { to: '/finance/budget-forecasting', icon: 'trending_up', section: 'finance' },
  { to: '/finance/predictive-payout', icon: 'payments', section: 'finance' },

  { to: '/contracts/performance-1', icon: 'description', section: 'contracts' },
  { to: '/contracts/performance-2', icon: 'article', section: 'contracts' },

  { to: '/analytics/detailed', icon: 'monitoring', section: 'analytics' },
  { to: '/analytics/channel-performance', icon: 'bar_chart', section: 'analytics' },
  { to: '/analytics/facebook-intelligence', icon: 'public', section: 'analytics' },
  { to: '/analytics/tiktok-intelligence', icon: 'music_note', section: 'analytics' },
  { to: '/analytics/youtube-intelligence', icon: 'smart_display', section: 'analytics' },
  { to: '/analytics/marketing-roi', icon: 'paid', section: 'analytics' },
  { to: '/analytics/performance-mom', icon: 'compare', section: 'analytics' },
  { to: '/audience/forecasting', icon: 'timeline', section: 'audience' },
  { to: '/audience/rule-targeting', icon: 'my_location', section: 'audience' },
  { to: '/audience/rule-performance', icon: 'leaderboard', section: 'audience' },

  { to: '/intel/competitor-activity', icon: 'visibility', section: 'intel' },
  { to: '/intel/competitor-ads', icon: 'ad_group', section: 'intel' },
  { to: '/intel/influencer-sentiment', icon: 'sentiment_satisfied', section: 'intel' },

  { to: '/campaigns/live-deployment', icon: 'rocket_launch', section: 'campaigns' },
  { to: '/campaigns/live-performance', icon: 'speed', section: 'campaigns' },

  { to: '/audit/simulation', icon: 'fact_check', section: 'audit' },

  { to: '/automation/bot-mitigation', icon: 'smart_toy', section: 'automation' },
  { to: '/automation/budget-adjustments', icon: 'savings', section: 'automation' },
  { to: '/automation/contract-renewal', icon: 'contract', section: 'automation' },
  { to: '/automation/counter-campaigns', icon: 'campaign', section: 'automation' },
  { to: '/automation/data-replay', icon: 'replay', section: 'automation' },
  { to: '/automation/reinvestment-rules', icon: 'currency_exchange', section: 'automation' },
  { to: '/automation/remediation-workflows', icon: 'auto_fix', section: 'automation' },
  { to: '/automation/resolution-workflows', icon: 'route', section: 'automation' },
  { to: '/automation/retargeting-workflows', icon: 'ads_click', section: 'automation' },
  { to: '/automation/omnichannel-retargeting', icon: 'sms', section: 'automation' },
  { to: '/automation/reinvestment-history', icon: 'history', section: 'automation' },
  { to: '/automation/warning-notifications', icon: 'warning', section: 'automation' },
  { to: '/automation/automatizador-de-ia', icon: 'precision_manufacturing', section: 'automation' },

  { to: '/disputes/filing', icon: 'gavel', section: 'disputes' },
  { to: '/disputes/resolution', icon: 'handshake', section: 'disputes' },
  { to: '/disputes/mediator-performance', icon: 'leaderboard', section: 'disputes' },
  { to: '/disputes/evidence-analytics', icon: 'analytics', section: 'disputes' },
  { to: '/disputes/policy-library', icon: 'library_books', section: 'disputes' },
  { to: '/disputes/resolution-analytics', icon: 'query_stats', section: 'disputes' },
  { to: '/disputes/predictive-modeling', icon: 'psychology', section: 'disputes' },

  { to: '/content/email-templates', icon: 'edit_note', section: 'content' },
  { to: '/content/sms-personalization-1', icon: 'sms', section: 'content' },
  { to: '/content/sms-personalization-2', icon: 'chat', section: 'content' },

  { to: '/legal/workflow', icon: 'account_balance', section: 'legal' },
  { to: '/legal/automated-reminders', icon: 'schedule_send', section: 'legal' },
  { to: '/legal/e-signature', icon: 'draw', section: 'legal' },
  { to: '/legal/multi-party', icon: 'groups', section: 'legal' },
  { to: '/legal/variance-reports', icon: 'difference', section: 'legal' },
  { to: '/legal/regional-templates', icon: 'gavel', section: 'legal' },
  { to: '/legal/signed-archive', icon: 'folder_special', section: 'legal' },
  { to: '/legal/signed-archive-expiration', icon: 'schedule', section: 'legal' },

  { to: '/policy/patching', icon: 'policy', section: 'policy' },
  { to: '/policy/update-alerts', icon: 'notifications_active', section: 'policy' },
  { to: '/compliance/regulatory-reporting', icon: 'assignment', section: 'policy' },
  { to: '/compliance/audit-logs', icon: 'history_edu', section: 'compliance' },
  { to: '/compliance/global-simulation', icon: 'public', section: 'compliance' },
  { to: '/compliance/region-settings', icon: 'tune', section: 'compliance' },
  { to: '/compliance/regional-heatmaps', icon: 'map', section: 'compliance' },

  { to: '/global/performance-reports', icon: 'summarize', section: 'global' },

  { to: '/security/evidence-vault', icon: 'inventory_2', section: 'sec' },
  { to: '/security/forensic-recovery', icon: 'data_recovery', section: 'sec' },
  { to: '/security/forensic-audit', icon: 'search_check', section: 'sec' },
  { to: '/security/global-policy', icon: 'admin_panel_settings', section: 'sec' },
  { to: '/security/threat-hunting-agents', icon: 'shield', section: 'sec' },
  { to: '/security/intrusion-prevention', icon: 'block', section: 'sec' },
  { to: '/security/sentinel-access', icon: 'vpn_key', section: 'sec' },
  { to: '/security/sentinel-monitor', icon: 'monitor_heart', section: 'sec' },
  { to: '/security/fraud', icon: 'gpp_maybe', section: 'sec' },
  { to: '/security/threat-intel', icon: 'radar', section: 'sec' },
  { to: '/settings/account-connections-1', icon: 'link', section: 'settings' },
  { to: '/settings/account-connections-2', icon: 'hub', section: 'settings' },
  { to: '/settings', icon: 'settings', section: 'settings' },
]

const navCoreSet = new Set(NAV_CORE_PATHS)

/** `VITE_NAV_SURFACE=core` 이면 출시용 축소 내비만 표시합니다. */
export function getVisibleNavItems(): NavItem[] {
  const surface = import.meta.env.VITE_NAV_SURFACE?.trim()
  if (surface === 'core') {
    return navItems.filter((item) => navCoreSet.has(item.to))
  }
  return navItems
}

