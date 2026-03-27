export const abTriggersHistory = [
  {
    name: 'Flash Sale Velocity Trigger',
    targeting: 'Core Influencers',
    variations: ['30m', '2h', '1d'],
    status: 'Completed',
    statusTone: 'success' as const,
    metric: '+14.2% Conv',
    metricTone: 'success' as const,
    date: 'Oct 12, 2023',
  },
  {
    name: 'Post-Purchase Upsell Delay',
    targeting: 'High-LTV Repeat',
    variations: ['Inst', '10m'],
    status: 'Completed',
    statusTone: 'success' as const,
    metric: '+5.8% AOV',
    metricTone: 'success' as const,
    date: 'Oct 08, 2023',
  },
  {
    name: 'Low-Stock Scarcity Email',
    targeting: 'Wishlist Users',
    variations: ['5 Left', '1 Left'],
    status: 'Inconclusive',
    statusTone: 'danger' as const,
    metric: '0.4% Delta',
    metricTone: 'neutral' as const,
    date: 'Sep 29, 2023',
  },
]

export const abLogicLog = [
  { time: '14:02:11', params: 'Amazon / 50k Cap / 14d', variant: 'A', shift: '+12.8%' },
  { time: '13:58:04', params: 'Temu / 100k Cap / 30d', variant: 'A', shift: '+11.2%' },
  { time: '13:45:22', params: 'Amazon / 10k Cap / 7d', variant: 'B', shift: '+0.4%' },
]

export const abSimMetrics = [
  { metric: 'Predicted CTR', a: '3.12%', b: '4.85%', delta: '+55.4%', bWinning: true },
  { metric: 'Estimated CPC', a: '$1.42', b: '$0.98', delta: '-31.0%', bWinning: true },
  { metric: 'Conv. Rate', a: '12.4%', b: '10.8%', delta: '-12.9%', aWinning: true },
  { metric: 'Projected ROI', a: '4.2x', b: '5.9x', delta: '+40.5%', bWinning: true },
]

