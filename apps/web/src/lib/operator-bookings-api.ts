/**
 * Agent-side bookings HTTP wrapper. Mirrors client-bookings-api.ts but hits
 * /operator/* and attaches the operator Bearer token.
 */
import { operatorAuthedFetch } from './operator-authed-fetch'
import type { BookingDto } from './client-bookings-api'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

export type BookingStatusFilter =
  | 'all'
  | 'pending'
  | 'confirmed'
  | 'fulfilled'
  | 'cancelled'
  | 'closed'

export type PaymentStatusFilter = 'all' | 'unpaid' | 'paid' | 'pending_transfer' | 'refunded' | 'partial_refund'

export type ServiceTypeFilter = 'all' | 'fastTrack' | 'pickup' | 'hotel' | 'tour'

export type AirportFilter = 'all' | 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'HUI' | 'THD' | 'VII'
export type SegmentFilter = 'all' | 'domestic' | 'international'

export type OperatorBookingListParams = {
  status?: BookingStatusFilter
  paymentStatus?: PaymentStatusFilter
  airport?: AirportFilter
  segment?: SegmentFilter
  serviceType?: ServiceTypeFilter
  q?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  pageSize?: number
}

export type OperatorBookingListResponse = {
  items: BookingDto[]
  total: number
  page: number
  pageSize: number
}

export type DashboardStats = {
  bookings: { day: number; week: number; month: number }
  revenue: { totalUsd: number; totalVnd: number; count: number }
  byAirport: Array<{ _id: string; sales: number; revenueUsd: number }>
}

export type InventoryProduct = {
  id: string
  airportCode: string
  segment: 'domestic' | 'international'
  direction: 'arrival' | 'departure' | 'both'
  title: string
  capacity: number
}

export type InventoryCell = {
  productId: string
  date: string
  capacity: number
  sold: number
}

export type InventoryResponse = {
  dateFrom: string
  dateTo: string
  products: InventoryProduct[]
  cells: InventoryCell[]
}

function buildQuery(params: OperatorBookingListParams): string {
  const sp = new URLSearchParams()
  if (params.status && params.status !== 'all') sp.set('status', params.status)
  if (params.paymentStatus && params.paymentStatus !== 'all') sp.set('paymentStatus', params.paymentStatus)
  if (params.airport && params.airport !== 'all') sp.set('airport', params.airport)
  if (params.segment && params.segment !== 'all') sp.set('segment', params.segment)
  if (params.q) sp.set('q', params.q)
  if (params.dateFrom) sp.set('dateFrom', params.dateFrom)
  if (params.dateTo) sp.set('dateTo', params.dateTo)
  if (params.page) sp.set('page', String(params.page))
  if (params.pageSize) sp.set('pageSize', String(params.pageSize))
  const qs = sp.toString()
  return qs ? `?${qs}` : ''
}

async function jsonReq<T>(path: string, init: RequestInit & { method: string }): Promise<T> {
  const res = await operatorAuthedFetch(`${API_BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  })
  const data = (await res.json().catch(() => ({}))) as { error?: string } | Record<string, unknown>
  if (!res.ok) {
    const msg = (data as { error?: string })?.error ?? `Request failed (${res.status})`
    throw new Error(msg)
  }
  return data as T
}

export const operatorBookingsApi = {
  list(params: OperatorBookingListParams = {}) {
    return jsonReq<OperatorBookingListResponse>(`/operator/bookings${buildQuery(params)}`, { method: 'GET' })
  },
  getByNumber(bookingNumber: string) {
    return jsonReq<{ booking: BookingDto }>(
      `/operator/bookings/${encodeURIComponent(bookingNumber)}`,
      { method: 'GET' },
    )
  },
  markPaid(bookingNumber: string, transactionId?: string) {
    return jsonReq<{ booking: BookingDto }>(
      `/operator/bookings/${encodeURIComponent(bookingNumber)}/mark-paid`,
      { method: 'POST', body: JSON.stringify({ transactionId: transactionId ?? '' }) },
    )
  },
  cancel(bookingNumber: string) {
    return jsonReq<{ booking: BookingDto }>(
      `/operator/bookings/${encodeURIComponent(bookingNumber)}/cancel`,
      { method: 'POST', body: JSON.stringify({}) },
    )
  },
  dashboardStats() {
    return jsonReq<DashboardStats>(`/operator/dashboard/stats`, { method: 'GET' })
  },
  inventory(dateFrom: string, dateTo: string) {
    return jsonReq<InventoryResponse>(
      `/operator/inventory?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      { method: 'GET' },
    )
  },
  setInventoryCap(productId: string, cap: number) {
    return jsonReq<{ ok: boolean }>(`/operator/inventory/cap`, {
      method: 'POST',
      body: JSON.stringify({ productId, cap }),
    })
  },
}
