/**
 * Agent-side bookings HTTP wrapper. Mirrors client-bookings-api.ts but hits
 * /operator/bookings and attaches the operator Bearer token.
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

export type ServiceTypeFilter = 'all' | 'pickup' | 'fastTrack' | 'hotel' | 'tour'

export type OperatorBookingListParams = {
  status?: BookingStatusFilter
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

function buildQuery(params: OperatorBookingListParams): string {
  const sp = new URLSearchParams()
  if (params.status && params.status !== 'all') sp.set('status', params.status)
  if (params.serviceType && params.serviceType !== 'all') sp.set('serviceType', params.serviceType)
  if (params.q) sp.set('q', params.q)
  if (params.dateFrom) sp.set('dateFrom', params.dateFrom)
  if (params.dateTo) sp.set('dateTo', params.dateTo)
  if (params.page) sp.set('page', String(params.page))
  if (params.pageSize) sp.set('pageSize', String(params.pageSize))
  const qs = sp.toString()
  return qs ? `?${qs}` : ''
}

async function jsonGet<T>(path: string): Promise<T> {
  const res = await operatorAuthedFetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
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
    return jsonGet<OperatorBookingListResponse>(`/operator/bookings${buildQuery(params)}`)
  },
  getByNumber(bookingNumber: string) {
    return jsonGet<{ booking: BookingDto }>(
      `/operator/bookings/${encodeURIComponent(bookingNumber)}`,
    )
  },
}
