'use client'

/**
 * /checkout/success/[bookingNumber]
 *
 * Post-booking confirmation screen. Fetches the booking from the server by
 * bookingNumber — the endpoint is public, but the number is unguessable
 * (~2B possibilities per year) so sharing the URL acts as a lightweight
 * confirmation link. Safe to bookmark / email to oneself.
 *
 * Shows: booking number, per-line summary, total, and a "we'll call you" note.
 */

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { TopNav } from '@/components/client/top-nav'
import { useCurrencyStore } from '@/stores/currency-store'
import { clientBookingsApi, type BookingDto } from '@/lib/client-bookings-api'

type PageProps = { params: Promise<{ bookingNumber: string }> }

export default function BookingSuccessPage({ params }: PageProps) {
  const { bookingNumber } = use(params)
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)

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
    return () => {
      aborted = true
    }
  }, [bookingNumber])

  return (
    <div className="bg-vg-bg text-white min-h-screen">
      <div className="relative">
        <TopNav />
      </div>

      <main className="max-w-[760px] mx-auto px-6 md:px-12 pt-32 pb-24">
        {error ? (
          <div className="rounded-2xl bg-vg-surface border border-red-500/30 p-8 text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <div className="font-display text-xl text-white font-semibold">
              We couldn&rsquo;t load this booking
            </div>
            <p className="text-white/60 mt-2 text-sm">{error}</p>
            <Link
              href="/destinations"
              className="inline-block mt-6 px-5 py-2.5 rounded-full bg-vg-cta text-white text-sm font-semibold hover:bg-vg-cta-hover transition-colors"
            >
              Back to destinations
            </Link>
          </div>
        ) : !booking ? (
          <div className="rounded-2xl bg-vg-surface border border-vg-border p-10 text-center text-white/50 text-sm">
            Loading booking…
          </div>
        ) : (
          <>
            {/* Hero */}
            <div className="text-center mb-10">
              <div className="inline-grid place-items-center w-16 h-16 rounded-full bg-vg-accent/20 border border-vg-accent/40 text-vg-accent text-3xl mb-6">
                ✓
              </div>
              <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-3">
                Booking confirmed
              </div>
              <h1
                className="font-display font-semibold leading-none tracking-[-0.02em] text-white"
                style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
              >
                You&rsquo;re all set
              </h1>
              <p className="text-white/65 mt-4">
                Reference{' '}
                <span className="font-mono font-semibold text-white">
                  {booking.bookingNumber}
                </span>
              </p>
            </div>

            {/* Details card */}
            <div className="rounded-2xl bg-vg-surface border border-vg-border p-8 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] text-white/45 uppercase tracking-[0.18em]">
                    Status
                  </div>
                  <div className="mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse" />
                    Pending confirmation
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-white/45 uppercase tracking-[0.18em]">
                    Total
                  </div>
                  <div className="font-display text-2xl font-semibold text-white tabular-nums mt-1">
                    {formatFromVnd(booking.totalVnd)}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
                {booking.items.map((it, idx) => (
                  <div
                    key={`${it.productId}-${idx}`}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="font-medium text-white">{it.title}</div>
                      <div className="text-xs text-white/55 mt-1">
                        {it.travelDate || 'Date TBC'}
                        {it.travelTime ? ` · ${it.travelTime}` : ''}
                        {it.adults || it.children
                          ? ` · ${it.adults} adult${it.adults === 1 ? '' : 's'}${
                              it.children
                                ? `, ${it.children} ${it.children === 1 ? 'child' : 'children'}`
                                : ''
                            }`
                          : ''}
                        {it.flightNumber ? ` · Flight ${it.flightNumber}` : ''}
                      </div>
                    </div>
                    <div className="text-sm text-white tabular-nums">
                      {formatFromVnd(it.lineTotalVnd)}
                    </div>
                  </div>
                ))}
              </div>

              {booking.notes && (
                <div className="border-t border-white/10 pt-4">
                  <div className="text-[10px] text-white/45 uppercase tracking-[0.18em] mb-2">
                    Notes
                  </div>
                  <p className="text-sm text-white/75 whitespace-pre-wrap">{booking.notes}</p>
                </div>
              )}

              {(booking.customerName || booking.customerPhone) && (
                <div className="border-t border-white/10 pt-4 grid sm:grid-cols-2 gap-4">
                  {booking.customerName && (
                    <div>
                      <div className="text-[10px] text-white/45 uppercase tracking-[0.18em] mb-1">
                        Name
                      </div>
                      <div className="text-sm text-white">{booking.customerName}</div>
                    </div>
                  )}
                  {booking.customerPhone && (
                    <div>
                      <div className="text-[10px] text-white/45 uppercase tracking-[0.18em] mb-1">
                        We&rsquo;ll call
                      </div>
                      <div className="text-sm text-white font-mono">
                        {booking.customerPhone}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="rounded-xl bg-vg-accent/10 border border-vg-accent/30 px-4 py-3 text-xs text-vg-accent leading-relaxed">
                Our local team will call you within a few hours to confirm the details
                and quote the price. You&rsquo;ll pay on arrival — no card charged today.
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/destinations"
                className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 text-sm hover:bg-white/10 hover:border-white/35 transition-colors"
              >
                Keep browsing
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
