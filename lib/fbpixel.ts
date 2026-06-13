// Meta 像素事件輔助。fbq 由 app/layout.tsx 的行內腳本全域載入。
// 每個呼叫都先確認 window.fbq 存在，SSR 或腳本未載入時安靜略過，不會報錯。
//
// 幣別策略：上層漏斗事件（看商品／加購物袋／開始結帳）統一用台幣（TWD）
// 報價，因為台幣是基準價、馬幣是換算來的，這樣 Meta 的數據才一致；
// Purchase 用實際成交幣別（台灣 TWD、馬來西亞 MYR），方便算真實營收。

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

type Params = Record<string, unknown>

export type Currency = 'TWD' | 'MYR'

function track(event: string, params?: Params) {
  if (typeof window === 'undefined') return
  if (typeof window.fbq !== 'function') return
  window.fbq('track', event, params)
}

export function pixelViewContent(p: {
  id: string
  name: string
  value: number
  currency?: Currency
}) {
  track('ViewContent', {
    content_type: 'product',
    content_ids: [p.id],
    content_name: p.name,
    value: p.value,
    currency: p.currency ?? 'TWD',
  })
}

export function pixelAddToCart(p: {
  id: string
  name: string
  value: number
  quantity?: number
  currency?: Currency
}) {
  track('AddToCart', {
    content_type: 'product',
    content_ids: [p.id],
    content_name: p.name,
    contents: [{ id: p.id, quantity: p.quantity ?? 1 }],
    value: p.value,
    currency: p.currency ?? 'TWD',
  })
}

export function pixelInitiateCheckout(p: {
  ids: string[]
  value: number
  numItems: number
  currency?: Currency
}) {
  track('InitiateCheckout', {
    content_type: 'product',
    content_ids: p.ids,
    num_items: p.numItems,
    value: p.value,
    currency: p.currency ?? 'TWD',
  })
}

export function pixelPurchase(p: {
  ids: string[]
  value: number
  numItems: number
  currency: Currency
}) {
  track('Purchase', {
    content_type: 'product',
    content_ids: p.ids,
    num_items: p.numItems,
    value: p.value,
    currency: p.currency,
  })
}

export function pixelLead(name?: string) {
  track('Lead', name ? { content_name: name } : undefined)
}

export function pixelSubscribe() {
  track('Subscribe')
}
