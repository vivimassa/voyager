import type { ComponentType } from 'react'
import { BedDouble, Car, Compass, Zap } from 'lucide-react'
import type { BookingDto, BookingItemDto } from '@/lib/client-bookings-api'

const VND_FMT = new Intl.NumberFormat('vi-VN')
const USD_PER_VND = 1 / 24_500

/**
 * Display the booking's monetary total in its stored currency. Prices always
 * live as VND in the DB; USD is derived on the fly at display time.
 */
export function formatMoney(amountVnd: number, currency: BookingDto['currency']): string {
  if (currency === 'USD') {
    return `$${(amountVnd * USD_PER_VND).toFixed(2)}`
  }
  return `₫${VND_FMT.format(Math.round(amountVnd))}`
}

export function earliestTravelDate(items: BookingItemDto[]): string {
  const dated = items.map((i) => i.travelDate).filter(Boolean).sort()
  return dated[0] ?? ''
}

export function earliestTravelTime(items: BookingItemDto[]): string {
  for (const i of items) {
    if (i.travelDate && i.travelTime) return i.travelTime
  }
  return ''
}

export function sumPax(items: BookingItemDto[]): number {
  return items.reduce((acc, i) => acc + (i.adults ?? 0) + (i.children ?? 0), 0)
}

/** "2h ago", "3d ago", or an absolute date for older entries. */
export function relativeFromNow(iso: string): string {
  if (!iso) return ''
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const diffSec = Math.max(0, Math.floor((Date.now() - then) / 1000))
  if (diffSec < 60) return 'just now'
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`
  if (diffSec < 86_400) return `${Math.floor(diffSec / 3600)}h ago`
  if (diffSec < 604_800) return `${Math.floor(diffSec / 86_400)}d ago`
  return new Date(iso).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })
}

export function formatTravelDate(iso: string): string {
  if (!iso) return '—'
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponent = ComponentType<any>

export function serviceIconForType(
  serviceType: BookingItemDto['serviceType'],
): IconComponent {
  switch (serviceType) {
    case 'pickup':
      return Car
    case 'fastTrack':
      return Zap
    case 'hotel':
      return BedDouble
    case 'tour':
      return Compass
    default:
      return Car
  }
}
