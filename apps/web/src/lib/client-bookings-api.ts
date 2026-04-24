/**
 * Thin wrapper around the Voyager client-booking HTTP endpoints.
 *
 * Anonymous-checkout edition: we no longer send a Bearer token — the server
 * accepts name + phone in the body instead. If we bring accounts back later,
 * we'll re-add the Authorization header here.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

export type BookingItemDto = {
  productId: string
  destinationSlug: string
  airportCode: string
  serviceType: 'pickup' | 'fastTrack' | 'hotel' | 'tour'
  title: string
  icon: string
  unitPriceVnd: number
  qty: number
  lineTotalVnd: number
  travelDate: string
  travelTime: string
  adults: number
  children: number
  flightNumber: string
  meta: Record<string, string>
}

export type BookingDto = {
  _id: string
  bookingNumber: string
  clientId: string
  customerName: string
  customerPhone: string
  operatorId: string
  items: BookingItemDto[]
  currency: 'VND' | 'USD'
  subtotalVnd: number
  discountVnd: number
  totalVnd: number
  status: 'pending' | 'confirmed' | 'fulfilled' | 'cancelled' | 'closed'
  payment: {
    method: 'card' | 'wallet' | 'bank_transfer' | 'cash' | ''
    status: 'unpaid' | 'paid' | 'refunded' | 'partial_refund'
    transactionId: string
    paidAt: string
    refundedAt: string
  }
  notes: string
  createdAt: string
  updatedAt: string
}

export type CreateBookingInput = {
  customerName: string
  customerPhone: string
  items: Array<{
    productId: string
    qty: number
    travelDate: string
    travelTime: string
    adults: number
    children: number
    flightNumber: string
  }>
  notes: string
}

async function jsonFetch<T>(
  path: string,
  init: RequestInit & { method: string },
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      'Content-Type': 'application/json',
    },
  })

  const data = (await res.json().catch(() => ({}))) as
    | { error?: string }
    | Record<string, unknown>

  if (!res.ok) {
    const msg = (data as { error?: string })?.error ?? `Request failed (${res.status})`
    throw new Error(msg)
  }
  return data as T
}

export const clientBookingsApi = {
  create(input: CreateBookingInput) {
    return jsonFetch<{ booking: BookingDto }>('/clients/bookings', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },
  getByNumber(bookingNumber: string) {
    return jsonFetch<{ booking: BookingDto }>(
      `/clients/bookings/${encodeURIComponent(bookingNumber)}`,
      { method: 'GET' },
    )
  },
}
