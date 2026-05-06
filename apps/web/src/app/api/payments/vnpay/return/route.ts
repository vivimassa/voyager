import { NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

/**
 * VNPay redirects the customer's browser back here after payment. We forward
 * the entire query string to the Fastify server which validates the signature
 * and updates the booking, then redirect the customer to the booking success
 * page (or to a failure landing page).
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const upstream = `${API_BASE}/payments/vnpay/return${url.search}`
  try {
    const res = await fetch(upstream, { method: 'GET' })
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean
      bookingNumber?: string
      ticketId?: string
      responseCode?: string
      error?: string
    }
    if (data.ok && data.bookingNumber) {
      return NextResponse.redirect(new URL(`/checkout/success/${encodeURIComponent(data.bookingNumber)}`, url.origin))
    }
    const msg = encodeURIComponent(data.error ?? 'Payment failed')
    return NextResponse.redirect(new URL(`/?paymentError=${msg}`, url.origin))
  } catch {
    return NextResponse.redirect(new URL('/?paymentError=network', url.origin))
  }
}
