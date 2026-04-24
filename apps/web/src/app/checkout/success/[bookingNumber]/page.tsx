'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { clientBookingsApi, type BookingDto } from '@/lib/client-bookings-api'

type PageProps = { params: Promise<{ bookingNumber: string }> }

export default function BookingSuccessPage({ params }: PageProps) {
  const { bookingNumber } = use(params)
  const t = useT()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  const [booking, setBooking] = useState<BookingDto | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let aborted = false
    async function load() {
      try {
        const { booking } = await clientBookingsApi.getByNumber(bookingNumber)
        if (!aborted) setBooking(booking)
      } catch (err) {
        if (!aborted) setError(err instanceof Error ? err.message : 'Failed to load booking')
      }
    }
    load()
    return () => { aborted = true }
  }, [bookingNumber])

  function paxSummary(adults: number, children: number): string {
    const parts: string[] = []
    if (adults) parts.push(`${adults} ${adults === 1 ? t.success.adult : t.success.adults}`)
    if (children) parts.push(`${children} ${children === 1 ? t.success.child : t.success.children}`)
    return parts.join(', ')
  }

  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <TopNav />

      <main className="flex-1 max-w-[800px] w-full mx-auto px-6 md:px-10 py-10">
        {error ? (
          <div className="bg-white rounded-xl border border-red-200 p-8 text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h1 className="font-display text-xl font-bold text-vg-text">{t.success.errorTitle}</h1>
            <p className="text-vg-text-muted mt-2 text-sm">{error}</p>
            <Link href="/destinations" className="inline-block mt-6 h-12 px-6 leading-[48px] rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm">
              {t.success.errorBack}
            </Link>
          </div>
        ) : !booking ? (
          <div className="bg-white rounded-xl border border-vg-border p-10 text-center text-vg-text-muted text-sm">
            {t.success.loading}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl border border-vg-border p-8 flex items-start gap-4">
              <div className="flex-shrink-0 grid place-items-center w-14 h-14 rounded-full bg-vg-accent text-white text-2xl">✓</div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.15em] font-bold text-vg-accent">{t.success.eyebrow}</div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-vg-text mt-1">{t.success.title}</h1>
                <p className="text-vg-text-muted mt-2">{t.success.subtitle}</p>
                <div className="mt-4 text-sm">
                  <span className="text-vg-text-muted">{t.success.reference}: </span>
                  <span className="font-mono font-bold text-vg-text">{booking.bookingNumber}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-vg-border p-6 mt-4">
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

            <div className="bg-white rounded-xl border border-vg-border p-6 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-vg-text">{t.success.details}</h2>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-vg-warm/10 text-vg-warm text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-vg-warm animate-pulse" />
                  {t.success.pending}
                </div>
              </div>

              <div className="flex flex-col divide-y divide-vg-border">
                {booking.items.map((it, idx) => {
                  const pax = paxSummary(it.adults, it.children)
                  return (
                    <div key={`${it.productId}-${idx}`} className="py-3 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-vg-text">{it.title}</div>
                        <div className="text-xs text-vg-text-muted mt-0.5">
                          {it.travelDate || t.success.dateTbc}
                          {it.travelTime ? ` · ${it.travelTime}` : ''}
                          {pax ? ` · ${pax}` : ''}
                          {it.flightNumber ? ` · ${t.success.flight} ${it.flightNumber}` : ''}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-vg-text tabular-nums">{formatFromVnd(it.lineTotalVnd)}</div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-vg-border flex justify-between items-baseline">
                <span className="font-bold text-vg-text">{t.success.total}</span>
                <span className="font-display text-2xl font-bold text-vg-text tabular-nums">{formatFromVnd(booking.totalVnd)}</span>
              </div>

              {booking.notes && (
                <div className="mt-4 pt-4 border-t border-vg-border">
                  <div className="text-xs font-bold text-vg-text uppercase tracking-wide mb-1">{t.success.notes}</div>
                  <p className="text-sm text-vg-text-muted whitespace-pre-wrap">{booking.notes}</p>
                </div>
              )}

              {(booking.customerName || booking.customerPhone) && (
                <div className="mt-4 pt-4 border-t border-vg-border grid sm:grid-cols-2 gap-4">
                  {booking.customerName && (
                    <div>
                      <div className="text-[11px] font-bold text-vg-text uppercase tracking-wide mb-0.5">{t.success.contactBlock}</div>
                      <div className="text-sm text-vg-text">{booking.customerName}</div>
                    </div>
                  )}
                  {booking.customerPhone && (
                    <div>
                      <div className="text-[11px] font-bold text-vg-text uppercase tracking-wide mb-0.5">{t.success.callBack}</div>
                      <div className="text-sm text-vg-text font-mono">{booking.customerPhone}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link href="/" className="h-10 px-5 leading-[40px] rounded-lg border border-vg-border-strong text-vg-text text-sm font-semibold hover:bg-vg-surface-muted">
                {t.success.backHome}
              </Link>
              <Link href="/destinations" className="h-10 px-5 leading-[40px] rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white text-sm font-bold">
                {t.success.keepBrowsing}
              </Link>
            </div>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
