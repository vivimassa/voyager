/**
 * Thin wrapper around Voyager client-booking + payment HTTP endpoints.
 * Anonymous-checkout edition: name + phone in body, no Bearer token.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

export type Segment = 'domestic' | 'international'
export type Direction = 'arrival' | 'departure'
export type Tier = 'FIT' | 'GIT'
export type IdType = 'passport' | 'cccd'

export type PassengerDto = {
  firstName: string
  lastName: string
  dob: string
  nationality: string
  idType: IdType
  idNumber: string
}

export type BookingItemDto = {
  productId: string
  destinationSlug: string
  airportCode: string
  segment: Segment
  direction: Direction
  tier: Tier
  serviceType: 'fastTrack' | 'pickup' | 'hotel' | 'tour'
  title: string
  icon: string
  unitPriceUsd: number
  unitPriceVnd: number
  qty: number
  lineTotalUsd: number
  lineTotalVnd: number
  travelDate: string
  travelTime: string
  flightNumber: string
  passengers: PassengerDto[]
  adults: number
  children: number
  meta: Record<string, string>
}

export type BookingDto = {
  _id: string
  bookingNumber: string
  ticketId: string
  clientId: string
  customerName: string
  customerPhone: string
  phoneCountryCode: string
  contactEmail: string
  operatorId: string
  items: BookingItemDto[]
  currency: 'VND' | 'USD'
  subtotalUsd: number
  subtotalVnd: number
  discountVnd: number
  totalUsd: number
  totalVnd: number
  fxRateUsdVnd: number
  status: 'pending' | 'confirmed' | 'fulfilled' | 'cancelled' | 'closed'
  payment: {
    method: 'card' | 'wallet' | 'bank_transfer' | 'cash' | 'vnpay' | ''
    status: 'unpaid' | 'paid' | 'refunded' | 'partial_refund' | 'pending_transfer'
    transactionId: string
    paidAt: string
    refundedAt: string
    vnpayTxnRef: string
    vnpayResponseCode: string
  }
  notes: string
  createdAt: string
  updatedAt: string
}

export type CreateBookingInput = {
  customerName: string
  customerPhone: string
  phoneCountryCode: string
  contactEmail: string
  paymentMethod: 'vnpay' | 'bank_transfer'
  items: Array<{
    productId: string
    qty: number
    direction: Direction
    travelDate: string
    travelTime: string
    flightNumber: string
    passengers: PassengerDto[]
  }>
  notes: string
}

export type VnpayCreateResponse = {
  redirectUrl: string
  txnRef: string
}

export type BankTransferResponse = {
  bookingNumber: string
  amountVnd: number
  amountUsd: number
  bank: { name: string; accountName: string; accountNo: string; bin: string }
  description: string
  qrUrl: string
}

export type InventoryResponse = {
  productId: string
  date: string
  capacity: number
  sold: number
  remaining: number
  isUnlimited: boolean
}

export type CatalogProductDto = {
  id: string
  airportCode: string
  segment: Segment
  direction: 'arrival' | 'departure' | 'both'
  title: string
  icon: string
  fitPriceUsd: number
  gitPriceUsd: number
  fitPriceVnd: number
  gitPriceVnd: number
  inclusions: { key: string; label: string }[]
  inventoryDailyCap: number
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
  cancel(bookingNumber: string) {
    return jsonFetch<{ booking: BookingDto }>(
      `/clients/bookings/${encodeURIComponent(bookingNumber)}/cancel`,
      { method: 'POST' },
    )
  },
  startVnpay(bookingNumber: string) {
    return jsonFetch<VnpayCreateResponse>('/payments/vnpay/create', {
      method: 'POST',
      body: JSON.stringify({ bookingNumber }),
    })
  },
  startBankTransfer(bookingNumber: string) {
    return jsonFetch<BankTransferResponse>('/payments/bank-transfer/start', {
      method: 'POST',
      body: JSON.stringify({ bookingNumber }),
    })
  },
  inventory(params: { airportCode: string; segment: Segment; direction: 'arrival' | 'departure' | 'both'; date: string }) {
    const search = new URLSearchParams(params as Record<string, string>)
    return jsonFetch<InventoryResponse>(`/inventory?${search.toString()}`, {
      method: 'GET',
    })
  },
  catalogProducts() {
    return jsonFetch<CatalogProductDto[]>('/catalog/products', { method: 'GET' })
  },
}
