export type Country = 'TW' | 'MY'
export type PaymentMethod = 'tng' | 'bank_transfer'
export type Currency = 'TWD' | 'MYR'

export function generateOrderNumber(): string {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0')
  return `CICI-${yyyy}${mm}${dd}-${rand}`
}

export const BANK_INFO = {
  bank: process.env.NEXT_PUBLIC_BANK_NAME || '玉山銀行（808）',
  holder: process.env.NEXT_PUBLIC_BANK_HOLDER || '陳○○',
  account: process.env.NEXT_PUBLIC_BANK_ACCOUNT || '1234-5678-9012-3456',
}

export function paymentInstructions(method: PaymentMethod, language: 'zh' | 'en'): string {
  if (method === 'tng') {
    return language === 'zh'
      ? 'TNG eWallet 收款 QR 碼將於訂單頁面顯示。掃碼用馬幣付款後，請回到訂單頁上傳付款截圖。'
      : 'A TNG QR code will be shown on the order page. Scan to pay in MYR, then upload your payment screenshot.'
  }
  return language === 'zh'
    ? `銀行：${BANK_INFO.bank}　戶名：${BANK_INFO.holder}　帳號：${BANK_INFO.account}\n請於 ATM 或臨櫃匯款後，回到訂單頁回填末五碼。`
    : `Bank: ${BANK_INFO.bank} · Account holder: ${BANK_INFO.holder} · Account: ${BANK_INFO.account}\nAfter transfer, return to the order page and submit the last 5 digits.`
}
