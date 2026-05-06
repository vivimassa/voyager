import crypto from 'node:crypto'

/**
 * Minimal VNPay (vpcpay.html) signing helpers.
 * Reference: https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html
 * — params sorted alphabetically, urlencoded with `+` for spaces, then
 * HMAC-SHA512 over the joined query string using the merchant secret.
 */

export type VnpayConfig = {
  tmnCode: string
  hashSecret: string
  payUrl: string
  returnUrl: string
}

export type VnpayPaymentParams = {
  bookingNumber: string
  amountVnd: number
  ipAddr: string
  orderInfo: string
  txnRef: string
  locale?: 'vn' | 'en'
}

function alphaSort(input: Record<string, string>): Record<string, string> {
  const keys = Object.keys(input).sort()
  const out: Record<string, string> = {}
  for (const k of keys) out[k] = input[k]
  return out
}

function encode(value: string): string {
  // VNPay's reference SDK uses `encodeURIComponent` then replaces ' ' with '+'.
  return encodeURIComponent(value).replace(/%20/g, '+')
}

function buildQuery(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encode(k)}=${encode(v)}`)
    .join('&')
}

function formatVnpayDate(d: Date): string {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${yyyy}${mm}${dd}${hh}${mi}${ss}`
}

export function buildVnpayPaymentUrl(config: VnpayConfig, params: VnpayPaymentParams): string {
  const now = new Date()
  const expire = new Date(now.getTime() + 15 * 60 * 1000)

  const raw: Record<string, string> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: config.tmnCode,
    vnp_Locale: params.locale ?? 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: params.txnRef,
    vnp_OrderInfo: params.orderInfo,
    vnp_OrderType: 'other',
    vnp_Amount: String(Math.round(params.amountVnd * 100)),
    vnp_ReturnUrl: config.returnUrl,
    vnp_IpAddr: params.ipAddr || '127.0.0.1',
    vnp_CreateDate: formatVnpayDate(now),
    vnp_ExpireDate: formatVnpayDate(expire),
  }

  const sorted = alphaSort(raw)
  const signData = buildQuery(sorted)
  const secureHash = crypto
    .createHmac('sha512', config.hashSecret)
    .update(Buffer.from(signData, 'utf-8'))
    .digest('hex')

  return `${config.payUrl}?${signData}&vnp_SecureHash=${secureHash}`
}

export function verifyVnpayReturn(
  config: VnpayConfig,
  query: Record<string, string>,
): { ok: boolean; responseCode: string; txnRef: string; transactionId: string; amountVnd: number } {
  const supplied = query.vnp_SecureHash ?? ''
  const filtered: Record<string, string> = {}
  for (const [k, v] of Object.entries(query)) {
    if (k === 'vnp_SecureHash' || k === 'vnp_SecureHashType') continue
    filtered[k] = String(v)
  }
  const sorted = alphaSort(filtered)
  const signData = buildQuery(sorted)
  const calculated = crypto
    .createHmac('sha512', config.hashSecret)
    .update(Buffer.from(signData, 'utf-8'))
    .digest('hex')

  const ok = calculated.toLowerCase() === String(supplied).toLowerCase()
  return {
    ok,
    responseCode: String(query.vnp_ResponseCode ?? ''),
    txnRef: String(query.vnp_TxnRef ?? ''),
    transactionId: String(query.vnp_TransactionNo ?? ''),
    amountVnd: Math.round(Number(query.vnp_Amount ?? '0') / 100),
  }
}
