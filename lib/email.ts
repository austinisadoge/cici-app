import { Resend } from 'resend'
import { BRAND } from './brand'

let _resend: Resend | null = null
function getResend(): Resend | null {
  if (_resend) return _resend
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[email] RESEND_API_KEY missing — emails will not be sent')
    return null
  }
  _resend = new Resend(key)
  return _resend
}

// 已在 Resend 驗證 cicidailystudio.com，預設用正式網域寄
const FROM = process.env.RESEND_FROM || `${BRAND.nameFull} <${BRAND.email}>`

export type OrderEmailData = {
  to: string
  customerName: string
  orderNumber: string
  language: 'zh' | 'en'
  currency: 'TWD' | 'MYR'
  items: { name: string; quantity: number; unitPrice: number }[]
  subtotal: number
  shippingFee: number
  total: number
  paymentMethod: 'tng' | 'bank_transfer'
  paymentInstructions?: string
  trackingNo?: string
}

async function send(to: string, subject: string, html: string) {
  const r = getResend()
  if (!r) return
  try {
    // Resend SDK 出錯不會 throw，錯誤放在回傳值的 error 欄位
    const { data, error } = await r.emails.send({ from: FROM, to, subject, html })
    if (error) {
      console.error('[email] send rejected:', JSON.stringify(error))
    } else {
      console.log('[email] sent:', data?.id, '→', to)
    }
  } catch (e) {
    console.error('[email] send failed:', e)
  }
}

// 寄一封簡單的內部通知給業主（備援用）
export async function sendRawToOwner(subject: string, bodyHtml: string) {
  const to = process.env.CUSTOM_INQUIRY_EMAIL || 'austin1476@gmail.com'
  await send(to, subject, wrap(bodyHtml))
}

export async function sendOrderConfirmation(d: OrderEmailData) {
  const subj = d.language === 'zh'
    ? `${BRAND.name} 訂單確認 #${d.orderNumber}`
    : `${BRAND.name} Order Confirmation #${d.orderNumber}`
  await send(d.to, subj, renderConfirm(d))
}

export async function sendPaymentConfirmed(d: OrderEmailData) {
  const subj = d.language === 'zh'
    ? `${BRAND.name} 已收到您的款項 #${d.orderNumber}`
    : `${BRAND.name} Payment received #${d.orderNumber}`
  await send(d.to, subj, renderPaid(d))
}

export async function sendShippingNotification(d: OrderEmailData) {
  const subj = d.language === 'zh'
    ? `${BRAND.name} 您的包裹已寄出 #${d.orderNumber}`
    : `${BRAND.name} Your order has shipped #${d.orderNumber}`
  await send(d.to, subj, renderShipped(d))
}

export type CustomInquiryData = {
  name: string
  email: string
  country: 'TW' | 'MY'
  category: string
  colors: string
  stone: string
  lineId: string
  details: string
  reference: string
  language: 'zh' | 'en'
}

export async function sendCustomInquiry(d: CustomInquiryData) {
  const ownerTo = process.env.CUSTOM_INQUIRY_EMAIL || 'austin1476@gmail.com'
  const zh = d.language === 'zh'

  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 0;color:#737373;width:96px;vertical-align:top;">${label}</td><td style="padding:6px 0;">${value.replace(/\n/g, '<br>')}</td></tr>`
      : ''

  // 給工作室的通知
  const ownerHtml = wrap(`
<h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;">🧶 新客製詢問</h2>
<table width="100%" style="border-collapse:collapse;font-size:14px;margin-top:16px;">
${row('姓名', d.name)}
${row('Email', d.email)}
${row('地區', d.country === 'MY' ? '馬來西亞' : '台灣')}
${row('品類', d.category)}
${row('色系', d.colors)}
${row('來料訂製', d.stone)}
${row('LINE ID', d.lineId)}
${row('需求描述', d.details)}
${row('參考連結', d.reference)}
</table>
<p style="font-size:13px;color:#737373;margin-top:20px;">直接回覆這封信即可聯繫客人（回覆地址：${d.email}）。</p>`)
  await send(ownerTo, `🧶 新客製詢問：${d.name}`, ownerHtml)

  // 給客人的確認信
  const ackHtml = wrap(zh
    ? `<h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;">${d.name} 您好</h2>
<p style="font-size:14px;line-height:1.8;">我們收到您的客製需求了。匠人會仔細看過您想要的色系與細節，<strong>1–2 個工作天內</strong>回信與您討論設計與報價。</p>
<p style="font-size:14px;line-height:1.8;">訂製作品自下單起約 3–7 個工作天內為您寄出，謝謝您願意等待手作的時間。</p>`
    : `<h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;">Hello, ${d.name}</h2>
<p style="font-size:14px;line-height:1.8;">We have received your custom request. Our artisan will review your palette and details, and reply within <strong>1–2 business days</strong> to discuss the design and quote.</p>
<p style="font-size:14px;line-height:1.8;">Custom pieces ship within 3–7 business days of your order. Thank you for giving handcraft its time.</p>`)
  const ackSubj = zh ? `${BRAND.name} 已收到您的客製需求` : `${BRAND.name} has received your custom request`
  await send(d.email, ackSubj, ackHtml)
}

function sym(c: 'TWD' | 'MYR') { return c === 'MYR' ? 'RM' : 'NT$' }

function wrap(body: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:-apple-system,'Helvetica Neue',sans-serif;background:#FAFAFA;margin:0;padding:40px 20px;color:#171717;">
<div style="max-width:560px;margin:0 auto;background:#fff;padding:48px 32px;border:1px solid #E5E5E5;">
<div style="text-align:center;margin-bottom:32px;">
<h1 style="font-family:Georgia,serif;font-weight:400;font-size:32px;letter-spacing:.16em;margin:0;">${BRAND.name}</h1>
<div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#737373;margin-top:8px;">${BRAND.nameSub} · Taiwan</div>
</div>
${body}
<div style="margin-top:40px;padding-top:24px;border-top:1px solid #E5E5E5;text-align:center;font-size:11px;letter-spacing:.1em;color:#737373;">© 2026 ${BRAND.nameFull} · Handmade in Taiwan</div>
</div></body></html>`
}

function itemsTable(d: OrderEmailData) {
  const s = sym(d.currency)
  return `<table width="100%" style="border-collapse:collapse;margin:20px 0;font-size:13px;">
${d.items.map(it => `<tr><td style="padding:8px 0;border-bottom:1px solid #F5F5F5;">${it.name} × ${it.quantity}</td><td align="right" style="padding:8px 0;border-bottom:1px solid #F5F5F5;">${s} ${(it.unitPrice * it.quantity).toLocaleString()}</td></tr>`).join('')}
</table>
<table width="100%" style="border-collapse:collapse;font-size:13px;">
<tr><td style="padding:4px 0;">${d.language === 'zh' ? '小計' : 'Subtotal'}</td><td align="right">${s} ${d.subtotal.toLocaleString()}</td></tr>
<tr><td style="padding:4px 0;">${d.language === 'zh' ? '運費' : 'Shipping'}</td><td align="right">${d.shippingFee === 0 ? (d.language === 'zh' ? '免運' : 'Free') : `${s} ${d.shippingFee}`}</td></tr>
<tr><td style="padding:12px 0 4px;border-top:1px solid #E5E5E5;font-size:15px;"><strong>${d.language === 'zh' ? '總計' : 'Total'}</strong></td><td align="right" style="padding:12px 0 4px;border-top:1px solid #E5E5E5;font-size:18px;"><strong>${s} ${d.total.toLocaleString()}</strong></td></tr>
</table>`
}

function renderConfirm(d: OrderEmailData) {
  const zh = d.language === 'zh'
  return wrap(`
<h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;">${zh ? `${d.customerName} 您好` : `Hello, ${d.customerName}`}</h2>
<p style="color:#737373;font-size:14px;line-height:1.7;">${zh ? '感謝您的訂購。您的訂單已成立，等待付款確認。' : "Thank you for your order. We've received it and are waiting for your payment."}</p>
<div style="background:#FAF7F2;padding:16px 20px;margin:24px 0;text-align:center;letter-spacing:.1em;">${zh ? '訂單編號' : 'Order'} <strong>${d.orderNumber}</strong></div>
${itemsTable(d)}
<div style="background:#171717;color:#fff;padding:24px;margin:32px 0;">
<div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:12px;">${zh ? '付款方式' : 'Payment'}</div>
<div style="font-size:16px;margin-bottom:8px;">${d.paymentMethod === 'tng' ? 'TNG eWallet' : (zh ? '銀行匯款' : 'Bank Transfer')}</div>
<div style="font-size:13px;color:rgba(255,255,255,.85);line-height:1.7;white-space:pre-line;">${d.paymentInstructions || ''}</div>
</div>
<div style="text-align:center;margin:28px 0;">
<a href="${BRAND.url}/order/${d.orderNumber}?p=${d.paymentMethod}" style="display:inline-block;background:#171717;color:#ffffff;padding:15px 34px;font-size:13px;letter-spacing:.16em;text-decoration:none;">${zh ? '回填付款 ／ 查看訂單 →' : 'REPORT PAYMENT / VIEW ORDER →'}</a>
</div>
<p style="color:#737373;font-size:12px;line-height:1.7;text-align:center;">${zh ? '匯款／付款後，點上方按鈕回填末五碼即可。請保留這封信，隨時可以回來查看訂單。' : 'After paying, click the button above to report your last 5 digits. Keep this email to return to your order anytime.'}</p>
<p style="color:#737373;font-size:13px;line-height:1.7;">${zh ? '收到您的款項後，我們會立即安排出貨。' : "Once we verify your payment, we'll prepare your order for shipping."}</p>`)
}

function renderPaid(d: OrderEmailData) {
  const zh = d.language === 'zh'
  return wrap(`
<h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;">${zh ? `${d.customerName} 您好` : `Hello, ${d.customerName}`}</h2>
<p style="color:#737373;font-size:14px;line-height:1.7;">${zh ? '我們已確認收到您的付款，正在準備您的作品。' : "We've received your payment and are preparing your piece."}</p>
<div style="background:#FAF7F2;padding:16px 20px;margin:24px 0;text-align:center;letter-spacing:.1em;">${zh ? '訂單編號' : 'Order'} <strong>${d.orderNumber}</strong></div>
<p style="color:#737373;font-size:13px;line-height:1.7;">${zh ? '現貨 48 小時內、訂製 3～7 個工作天內為您寄出。出貨後您會收到追蹤通知。' : "In-stock pieces ship within 48 hours, custom within 3–7 business days. You'll receive a tracking notification once shipped."}</p>
<p style="color:#737373;font-size:13px;line-height:1.7;">${zh ? '感謝您支持手作。' : 'Thank you for supporting handmade craft.'}</p>`)
}

function renderShipped(d: OrderEmailData) {
  const zh = d.language === 'zh'
  return wrap(`
<h2 style="font-family:Georgia,serif;font-weight:300;font-size:24px;">${zh ? `${d.customerName} 您好` : `Hello, ${d.customerName}`}</h2>
<p style="color:#737373;font-size:14px;line-height:1.7;">${zh ? '您的包裹已寄出，期待它早日抵達您身邊。' : 'Your order is on the way.'}</p>
<div style="background:#FAF7F2;padding:16px 20px;margin:24px 0;text-align:center;letter-spacing:.1em;">${zh ? '訂單編號' : 'Order'} <strong>${d.orderNumber}</strong></div>
${d.trackingNo ? `<div style="background:#171717;color:#fff;padding:20px;margin:24px 0;text-align:center;">
<div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:8px;">${zh ? '物流單號' : 'Tracking'}</div>
<div style="font-size:18px;font-family:'SF Mono',monospace;letter-spacing:.05em;">${d.trackingNo}</div>
</div>` : ''}
<p style="color:#737373;font-size:13px;line-height:1.7;">${zh ? `感謝您讓 ${BRAND.name} 進入您的生活。` : `Thank you for letting ${BRAND.name} into your life.`}</p>`)
}
