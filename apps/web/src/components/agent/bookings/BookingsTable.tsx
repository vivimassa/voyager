'use client'

import type { BookingDto } from '@/lib/client-bookings-api'
import { useT } from '@/i18n/use-t'
import { BookingStatusPill, PaymentStatusPill } from './BookingStatusPill'
import {
  earliestTravelDate,
  earliestTravelTime,
  formatMoney,
  formatTravelDate,
  relativeFromNow,
  serviceIconForType,
  sumPax,
} from './bookings-format'

interface Props {
  items: BookingDto[]
  selectedNumber: string | null
  onSelect: (bookingNumber: string) => void
}

export function BookingsTable({ items, selectedNumber, onSelect }: Props) {
  const t = useT()
  const c = t.agent.bookings.col

  return (
    <div className="min-w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left">
            <th className="w-10 py-3 px-4">
              <input
                type="checkbox"
                aria-label="Select all"
                className="h-4 w-4 rounded border-hz-border"
              />
            </th>
            <Th>{c.booking}</Th>
            <Th>{c.status}</Th>
            <Th>{c.customer}</Th>
            <Th>{c.service}</Th>
            <Th>{c.travel}</Th>
            <Th className="text-right">{c.pax}</Th>
            <Th className="text-right">{c.total}</Th>
            <Th>{c.payment}</Th>
            <Th>{c.created}</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((b) => {
            const active = b.bookingNumber === selectedNumber
            const services = Array.from(new Set(b.items.map((i) => i.serviceType)))
            const travelDate = earliestTravelDate(b.items)
            const travelTime = earliestTravelTime(b.items)

            return (
              <tr
                key={b._id}
                onClick={() => onSelect(b.bookingNumber)}
                className={`cursor-pointer border-t border-hz-border transition-colors ${
                  active ? 'bg-[#3E7BFA]/5' : 'hover:bg-hz-border/20'
                }`}
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    aria-label={`Select ${b.bookingNumber}`}
                    onClick={(e) => e.stopPropagation()}
                    className="h-4 w-4 rounded border-hz-border"
                  />
                </td>
                <td className="py-3 px-4">
                  <span className="font-mono text-[13px] font-semibold text-[#1d4ed8] underline-offset-2 hover:underline">
                    #{b.bookingNumber}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <BookingStatusPill status={b.status} />
                </td>
                <td className="py-3 px-4">
                  <div className="text-[13px] font-medium text-hz-text">
                    {b.customerName || '—'}
                  </div>
                  <div className="text-[12px] text-hz-text-secondary font-mono">
                    {b.customerPhone || ''}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 flex-wrap">
                    {services.map((s) => {
                      const Icon = serviceIconForType(s)
                      return (
                        <span
                          key={s}
                          title={t.agent.bookings.filterService[s]}
                          className="inline-flex items-center gap-1.5 h-6 px-2 rounded-full bg-hz-border/30 text-[12px] text-hz-text"
                        >
                          <Icon className="h-[13px] w-[13px] text-hz-text-secondary" />
                          <span>{t.agent.bookings.filterService[s]}</span>
                        </span>
                      )
                    })}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-[13px] text-hz-text">{formatTravelDate(travelDate)}</div>
                  <div className="text-[12px] text-hz-text-secondary font-mono">
                    {travelTime || ''}
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-mono text-[13px]">{sumPax(b.items)}</td>
                <td className="py-3 px-4 text-right font-mono text-[13px] font-semibold">
                  {formatMoney(b.totalVnd, b.currency)}
                </td>
                <td className="py-3 px-4">
                  <PaymentStatusPill status={b.payment.status} />
                </td>
                <td className="py-3 px-4 text-[12px] text-hz-text-secondary">
                  {relativeFromNow(b.createdAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={`py-2.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-hz-text-secondary ${className}`}
    >
      {children}
    </th>
  )
}
