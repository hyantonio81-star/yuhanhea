const COA_PREFIX: Record<string, string> = {
  ad_spend: '6100',
  production: '6200',
  influencer: '6300',
  tooling: '6400',
}

export function spendToErpLedger(input: {
  event_id: string
  fiscal_period: string
  department_code?: string
  campaign_id?: string
  amount_cents: number
  spend_category: string
  tax_code_ref?: string
}): Record<string, unknown> {
  const coa = COA_PREFIX[input.spend_category] ?? '6100'
  return {
    external_ref: { source: 'yuai', event_id: input.event_id },
    fiscal_period: input.fiscal_period,
    department_code: input.department_code,
    campaign_id: input.campaign_id,
    lines: [
      {
        coa_code: coa,
        amount_cents: input.amount_cents,
        spend_category: input.spend_category,
        tax_code_ref: input.tax_code_ref ?? 'ITBIS_18',
      },
    ],
  }
}

export function payoutToErpStub(input: {
  event_id: string
  payout_batch_id: string
  currency: string
  total_amount_cents: number
  line_items: { payee_ref: string; amount_cents: number; coa_code: string }[]
}): Record<string, unknown> {
  return {
    external_ref: { source: 'yuai', event_id: input.event_id },
    payout_batch_id: input.payout_batch_id,
    currency: input.currency,
    total_amount_cents: input.total_amount_cents,
    ap_lines: input.line_items.map((l) => ({
      vendor_ref: l.payee_ref,
      amount_cents: l.amount_cents,
      coa_code: l.coa_code,
    })),
  }
}
