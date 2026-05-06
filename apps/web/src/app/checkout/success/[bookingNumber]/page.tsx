'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { FxBootstrap } from '@/components/client/fx-bootstrap'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import {
  clientBookingsApi,
  type BookingDto,
  type BankTransferResponse,
} from '@/lib/client-bookings-api'

type PageProps = { params: Promise<{ bookingNumber: string }> }

export default function BookingSuccessPage({ params }: PageProps) {
  const { bookingNumber } = use(params)
  const search = useSearchParams()
  const t = useT()
  const formatFromUsd = useCurrencyStore((s) => s.formatFromUsd)
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  const [booking, setBooking] = useState<BookingDto | null>(null)
  const [bankInfo, setBankInfo] = useState<BankTransferResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const wantBank = search.get('method') === 'bank'

  useEffect(() => {
    let aborted = false
    clientBookingsApi
      .getByNumber(bookingNumber)
      .then(({ booking }) => {
        if (!aborted) setBooking(booking)
      })
      .catch((err: Error) => {
        if (!aborted) setError(err.message)
      })
    return () => {
      aborted = true
    }
  }, [bookingNumber, refreshKey])

  // If the user landed via bank-transfer flow (or the booking is in pending_transfer
  // state), fetch the QR + account details.
  useEffect(() => {
    if (!booking) return
    if (booking.payment.status === 'paid' || booking.payment.status === 'refunded') return
    if (!wantBank && booking.payment.method !== 'bank_transfer') return
    let aborted = false
    clientBookingsApi
      .startBankTransfer(bookingNumber)
      .then((data) => {
        if (!aborted) setBankInfo(data)
      })
      .catch(() => {})
    return () => {
      aborted = true
    }
  }, [booking, wantBank, bookingNumber])

  async function handleCancel() {
    if (!booking) return
    if (!confirm('Cancel this booking?')) return
    setCancelling(true)
    try {
      await clientBookingsApi.cancel(booking.bookingNumber)
      setRefreshKey((k) => k + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cancel failed')
    } finally {
      setCancelling(false)
    }
  }

  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <FxBootstrap />
      <TopNav />

      <main className="flex-1 max-w-[860px] w-full mx-auto px-6 md:px-10 py-10">
        {error && !booking ? (
          <div className="bg-white rounded-xl border border-red-200 p-8 text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h1 className="font-display text-xl font-bold text-vg-text">{t.success.errorTitle}</h1>
            <p className="text-vg-text-muted mt-2 text-sm">{error}</p>
            <Link href="/" className="inline-block mt-6 h-12 px-6 leading-[48px] rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm">
              {t.success.errorBack}
            </Link>
          </div>
        ) : !booking ? (
          <div className="bg-white rounded-xl border border-vg-border p-10 text-center text-vg-text-muted text-sm">
            {t.success.loading}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl border border-vg-border p-8 flex items-start gap-4">
              <div className={`flex-shrink-0 grid place-items-center w-14 h-14 rounded-full text-white text-2xl ${booking.status === 'cancelled' ? 'bg-red-500' : booking.payment.status === 'paid' ? 'bg-vg-accent' : 'bg-vg-warm'}`}>
                {booking.status === 'cancelled' ? '×' : booking.payment.status === 'paid' ? '✓' : '⌛'}
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.15em] font-bold text-vg-accent">{t.success.eyebrow}</div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-vg-text mt-1">
                  {booking.status === 'cancelled' ? t.ticket.statusCancelled : booking.payment.status === 'paid' ? t.success.title : t.ticket.statusPending}
                </h1>
                <p className="text-vg-text-muted mt-2">{t.success.subtitle}</p>
                <div className="mt-4 text-sm">
                  <span className="text-vg-text-muted">{t.success.reference}: </span>
                  <span className="font-mono font-bold text-vg-text">{booking.bookingNumber}</span>
                </div>
              </div>
            </div>

            {booking.ticketId && booking.status !== 'cancelled' && (
              <TicketCard ticketId={booking.ticketId} />
            )}

            {bankInfo && booking.payment.status !== 'paid' && booking.status !== 'cancelled' && (
              <BankTransferCard info={bankInfo} t={t.payment} />
            )}

            <div className="bg-white rounded-2xl border border-vg-border p-6 mt-4">
              <h2 className="font-display text-lg font-bold text-vg-text mb-4">{t.success.whatsNext}</h2>
              <ol className="space-y-3">
                {[t.success.next1, t.success.next2, t.success.next3].map((body, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex-shrink-0 grid place-items-center w-7 h-7 rounded-full bg-vg-cta/10 text-vg-cta font-bold text-sm">{i + 1}</div>
                    <p className="text-sm text-vg-text-muted leading-relaxed pt-0.5">{body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white rounded-2xl border border-vg-border p-6 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-vg-text">{t.success.details}</h2>
              </div>

              <div className="flex flex-col divide-y divide-vg-border">
                {booking.items.map((it, idx) => (
                  <div key={`${it.productId}-${idx}`} className="py-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-vg-text">{it.title}</div>
                      <div className="text-xs text-vg-text-muted mt-0.5">
                        {it.travelDate || t.success.dateTbc}
                        {it.travelTime ? ` · ${it.travelTime}` : ''}
                        {` · ${it.qty} pax · ${it.tier}`}
                        {it.flightNumber ? ` · ${t.success.flight} ${it.flightNumber}` : ''}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-vg-text tabular-nums">
                      {formatFromUsd(it.lineTotalUsd || it.unitPriceUsd * it.qty)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-vg-border flex justify-between items-baseline">
                <span className="font-bold text-vg-text">{t.success.total}</span>
                <span className="font-display text-2xl font-bold text-vg-text tabular-nums">
                  {formatFromUsd(booking.totalUsd || booking.totalVnd / (booking.fxRateUsdVnd || 25500))}
                </span>
              </div>

              {booking.notes && (
                <div className="mt-4 pt-4 border-t border-vg-border">
                  <div className="text-xs font-bold text-vg-text uppercase tracking-wide mb-1">{t.success.notes}</div>
                  <p className="text-sm text-vg-text-muted whitespace-pre-wrap">{booking.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link href="/" className="h-10 px-5 leading-[40px] rounded-lg border border-vg-border-strong text-vg-text text-sm font-semibold hover:bg-vg-surface-muted">
                {t.success.backHome}
              </Link>
              <Link href="/" className="h-10 px-5 leading-[40px] rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white text-sm font-bold">
                {t.success.keepBrowsing}
              </Link>
              {booking.status !== 'cancelled' && (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="h-10 px-5 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 disabled:opacity-50"
                >
                  {t.ticket.cancelCta}
                </button>
              )}
            </div>
            <p className="mt-3 text-center text-[11px] text-vg-text-muted">{t.ticket.cancelWarning}</p>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

function TicketCard({ ticketId }: { ticketId: string }) {
  const t = useT()
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(ticketId)}&margin=0`
  return (
    <div className="bg-vg-cta text-white rounded-2xl p-6 md:p-8 mt-4 grid md:grid-cols-[1fr_auto] gap-6 items-center">
      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/70">{t.ticket.ticketIdLabel}</div>
        <div className="font-mono font-bold text-3xl md:text-5xl tracking-wider mt-2">{ticketId}</div>
        <p className="mt-3 text-sm text-white/85 max-w-[420px]">{t.ticket.showAtAirport}</p>
      </div>
      <img
        src={qrSrc}
        alt="Fast Track QR"
        width={160}
        height={160}
        className="bg-white rounded-xl p-2"
      />
    </div>
  )
}

function BankTransferCard({ info, t }: { info: BankTransferResponse; t: ReturnType<typeof useT>['payment'] }) {
  return (
    <div className="bg-white rounded-2xl border border-vg-warm/40 p-6 md:p-8 mt-4">
      <h3 className="font-display text-xl font-bold text-vg-text">{t.title}</h3>
      <p className="text-sm text-vg-text-muted mt-2 leading-relaxed">{t.bankInstructions}</p>
      <div className="mt-5 grid md:grid-cols-[1fr_240px] gap-6 items-start">
        <dl className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
          <dt className="text-vg-text-muted">{t.bankName}</dt>
          <dd className="font-semibold text-vg-text">{info.bank.name}</dd>
          <dt className="text-vg-text-muted">{t.bankHolder}</dt>
          <dd className="font-semibold text-vg-text">{info.bank.accountName}</dd>
          <dt className="text-vg-text-muted">{t.bankAccount}</dt>
          <dd className="font-mono font-bold text-vg-text tracking-wide">{info.bank.accountNo}</dd>
          <dt className="text-vg-text-muted">{t.bankReference}</dt>
          <dd className="font-mono font-bold text-vg-text">{info.description}</dd>
        </dl>
        <img
          src={info.qrUrl}
          alt={t.qrAlt}
          width={220}
          height={220}
          className="border border-vg-border rounded-xl mx-auto"
        />
      </div>
    </div>
  )
}
