export type ShippingCurrency = 'nt' | 'rm'

/**
 * 運費規則：
 *   台灣（NT$）：NT$60，滿 NT$1,500 免運
 *   馬來西亞（RM）：RM35，滿 RM300 免運
 */
const RULES = {
  nt: { fee: 60, freeAt: 1500 },
  rm: { fee: 35, freeAt: 300 },
} as const

export function calcShipping(currency: ShippingCurrency, subtotal: number): number {
  const { fee, freeAt } = RULES[currency]
  return subtotal >= freeAt ? 0 : fee
}

export function freeShippingThreshold(currency: ShippingCurrency): number {
  return RULES[currency].freeAt
}

export function amountToFreeShipping(currency: ShippingCurrency, subtotal: number): number {
  return Math.max(0, RULES[currency].freeAt - subtotal)
}
