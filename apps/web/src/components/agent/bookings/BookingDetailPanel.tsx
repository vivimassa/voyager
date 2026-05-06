'use client'

import { useState } from 'react'
import { Loader2, Phone, User, X } from 'lucide-react'
import { useT } from '@/i18n/use-t'
import { useOperatorBooking } from '@/hooks/use-operator-bookings'
import { BookingStatusPill, PaymentStatusPill } from './BookingStatusPill'
import { operatorBookingsApi } from '@/lib/operator-bookings-api'
import {
  formatMoney,
  formatTravelDate,
  relativeFromNow,
  serviceIconForType,
} from './bookings-format'

interface Props {
  bookingNumber: string
  onClose: () => void
}

export function BookingDetailPanel({ bookingNumber, onClose }: Props) {
  const t = useT()
  const { data, isLoading, isError, refetch } = useOperatorBooking(bookingNumber)
  const b = data?.booking
  const d = t.agent.bookings.detail
  const [actionError, setActionError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<'paid' | 'cancel' | null>(null)

  async function handleMarkPaid() {
    if (!b) return
    setActionLoading('paid')
    setActionError(null)
    try {
      await operatorBookingsApi.markPaid(b.bookingNumber)
      await refetch()
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Action failed')
    } finally {
      setActionLoading(null)
    }
  }

  async function handleCancel() {
    if (!b) return
    if (!confirm(`Cancel ${b.bookingNumber}? This rolls back inventory and refunds the line.`)) return
    setActionLoading('cancel')
    setActionError(null)
    try {
      await operatorBookingsApi.cancel(b.bookingNumber)
      await refetch()
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Action failed')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-hz-border">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] uppercase tracking-wider text-hz-text-secondary">
            {d.heading}
          </div>
          <div className="font-mono text-[14px] font-semibold text-hz-text truncate">
            {b ? `#${b.bookingNumber}` : bookingNumber}
          </div>
        </div>
        {b ? <BookingStatusPill status={b.status} /> : null}
        <button
          type="button"
          onClick={onClose}
          aria-label={d.close}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-hz-text-secondary hover:bg-hz-border/30 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-[13px] text-hz-text-secondary">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            {t.agent.bookings.loading}
          </div>
        ) : isError || !b ? (
          <div className="text-[13px] text-[#B91C1C]">{t.agent.bookings.loadError}</div>
        ) : (
          <div className="flex flex-col gap-5">
            <Section title={d.contact}>
              <Row icon={User} label={d.name} value={b.customerName || '—'} />
              <Row
                icon={Phone}
                label={d.phone}
                value={b.customerPhone || '—'}
                mono
              />
            </Section>

            <Section title={d.items}>
              <ul className="flex flex-col gap-2">
                {b.items.map((item, idx) => {
                  const Icon = serviceIconForType(item.serviceType)
                  return (
                  <li
                    key={idx}
                    className="rounded-lg border border-hz-border p-3 flex flex-col gap-1.5"
                  >
                    <div className="flex items-start gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#3E7BFA]/10 text-[#1d4ed8] shrink-0">
                        <Icon className="h-[15px] w-[15px]" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-hz-text truncate">
                          {item.title}
                        </div>
                        <div className="text-[12px] text-hz-text-secondary">
                          {t.agent.bookings.filterService[item.serviceType]} ·{' '}
                          {item.airportCode}
                        </div>
                      </div>
                      <div className="font-mono text-[13px] font-semibold shrink-0">
                        {formatMoney(item.lineTotalVnd, b.currency)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[12px] pl-[26px]">
                      <Kv k={d.travelDate} v={formatTravelDate(item.travelDate)} />
                      <Kv k={d.travelTime} v={item.travelTime || '—'} mono />
                      <Kv k={d.adults} v={String(item.adults)} mono />
                      <Kv k={d.children} v={String(item.children)} mono />
                      {item.flightNumber ? (
                        <Kv
                          k={d.flight}
                          v={item.flightNumber}
                          mono
                          colSpan={2}
                        />
                      ) : null}
                      <Kv
                        k={d.unitPrice}
                        v={formatMoney(item.unitPriceVnd, b.currency)}
                        mono
                      />
                      <Kv k={d.qty} v={`× ${item.qty}`} mono />
                    </div>
                  </li>
                  )
                })}
              </ul>
            </Section>

            <Section title={d.totals}>
              <Row label={d.subtotal} value={formatMoney(b.subtotalVnd, b.currency)} mono />
              {b.discountVnd > 0 ? (
                <Row
                  label={d.discount}
                  value={`− ${formatMoney(b.discountVnd, b.currency)}`}
                  mono
                />
              ) : null}
              <Row
                label={d.total}
                value={formatMoney(b.totalVnd, b.currency)}
                mono
                emphasis
              />
            </Section>

            <Section title={d.payment}>
              <Row label={d.method} value={b.payment.method || '—'} />
              <div className="flex items-center justify-between px-1 py-1.5">
                <div className="text-[12px] text-hz-text-secondary">{d.paymentStatus}</div>
                <PaymentStatusPill status={b.payment.status} />
              </div>
              {b.payment.paidAt ? (
                <Row label="Paid at" value={new Date(b.payment.paidAt).toLocaleString()} mono />
              ) : null}
              {b.ticketId ? (
                <Row label="Ticket ID" value={b.ticketId} mono emphasis />
              ) : null}

              {actionError && (
                <div className="mt-2 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-[12px] text-red-700">
                  {actionError}
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {b.payment.status !== 'paid' && b.status !== 'cancelled' && (
                  <button
                    type="button"
                    onClick={handleMarkPaid}
                    disabled={actionLoading !== null}
                    className="h-9 px-3 rounded-md bg-vg-cta text-white text-[12px] font-bold hover:bg-vg-cta-hover disabled:opacity-40"
                  >
                    {actionLoading === 'paid' ? '…' : 'Mark paid + issue ticket'}
                  </button>
                )}
                {b.status !== 'cancelled' && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={actionLoading !== null}
                    className="h-9 px-3 rounded-md border border-red-200 text-red-600 text-[12px] font-semibold hover:bg-red-50 disabled:opacity-40"
                  >
                    {actionLoading === 'cancel' ? '…' : 'Cancel booking'}
                  </button>
                )}
              </div>
            </Section>

            <Section title={d.notes}>
              <div className="text-[13px] text-hz-text whitespace-pre-wrap">
                {b.notes || (
                  <span className="text-hz-text-secondary italic">{d.noNotes}</span>
                )}
              </div>
            </Section>

            <Section title="Timeline">
              <Row label={d.createdAt} value={relativeFromNow(b.createdAt)} />
              <Row label={d.updatedAt} value={relativeFromNow(b.updatedAt)} />
            </Section>
          </div>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-hz-text-secondary mb-2">
        {title}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </section>
  )
}

function Row({
  icon: Icon,
  label,
  value,
  mono,
  emphasis,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>
  label: string
  value: string
  mono?: boolean
  emphasis?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-1 py-1.5">
      <div className="flex items-center gap-1.5 text-[12px] text-hz-text-secondary">
        {Icon ? <Icon className="h-[14px] w-[14px]" /> : null}
        {label}
      </div>
      <div
        className={`text-[13px] text-hz-text ${mono ? 'font-mono' : ''} ${emphasis ? 'font-semibold' : ''}`}
      >
        {value}
      </div>
    </div>
  )
}

function Kv({
  k,
  v,
  mono,
  colSpan,
}: {
  k: string
  v: string
  mono?: boolean
  colSpan?: 1 | 2
}) {
  return (
    <div className={`flex items-baseline justify-between gap-2 ${colSpan === 2 ? 'col-span-2' : ''}`}>
      <span className="text-hz-text-secondary">{k}</span>
      <span className={`text-hz-text ${mono ? 'font-mono' : ''}`}>{v}</span>
    </div>
  )
}
