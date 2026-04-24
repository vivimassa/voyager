'use client'

/**
 * /checkout — Voyager booking form (anonymous-checkout edition).
 *
 * Flow:
 *   1. Reads the browser cart (zustand, localStorage-persisted).
 *   2. If empty → "Your cart is empty" CTA back to /destinations.
 *   3. Collect name + phone at the top of the form.
 *   4. Per cart line: travel date (required), optional time, adults/children,
 *      flight # (for pickup/fastTrack only).
 *   5. Free-text notes for the whole booking.
 *   6. Submit → POST /clients/bookings → clear cart → /checkout/success/[num].
 *
 * No auth, no OTP, no payment. Bookings are created with status:'pending' and
 * payment.status:'unpaid'. An agent picks it up on the operator side and
 * phones the customer back on the number they typed here.
 */

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TopNav } from '@/components/client/top-nav'
import { useCartStore, type CartItem } from '@/stores/cart-store'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { clientBookingsApi } from '@/lib/client-bookings-api'

/**
 * Per-line traveller details collected at checkout.
 * Keyed by cart item id so state survives cart mutations.
 */
type LineDetails = {
  travelDate: string
  travelTime: string
  adults: number
  children: number
  flightNumber: string
}

const DEFAULT_LINE: LineDetails = {
  travelDate: '',
  travelTime: '',
  adults: 1,
  children: 0,
  flightNumber: '',
}

function needsTime(serviceType: CartItem['serviceType']): boolean {
  // Hotels don't need a time; pickup/fastTrack/tour do.
  return serviceType !== 'hotel'
}

function needsFlight(serviceType: CartItem['serviceType']): boolean {
  return serviceType === 'pickup' || serviceType === 'fastTrack'
}

export default function CheckoutPage() {
  const router = useRouter()
  const t = useT()
  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const remove = useCartStore((s) => s.remove)
  const clear = useCartStore((s) => s.clear)
  const totalVnd = useCartStore((s) => s.totalVnd())
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency) // subscribe so component re-renders on currency change

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [lines, setLines] = useState<Record<string, LineDetails>>({})
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ensure every cart item has a line-detail object.
  useEffect(() => {
    setLines((prev) => {
      const next = { ...prev }
      for (const it of items) {
        if (!next[it.id]) next[it.id] = { ...DEFAULT_LINE }
      }
      // Prune details for items no longer in cart.
      for (const id of Object.keys(next)) {
        if (!items.find((i) => i.id === id)) delete next[id]
      }
      return next
    })
  }, [items])

  function updateLine(id: string, patch: Partial<LineDetails>) {
    setLines((prev) => ({ ...prev, [id]: { ...(prev[id] ?? DEFAULT_LINE), ...patch } }))
  }

  const hasDateError = useMemo(() => {
    return items.some((it) => {
      // Hotels + tours still want a date (check-in / start date).
      // We require a date on everything except genuinely flexible items.
      // For v1 we require a date on every line.
      const d = lines[it.id]?.travelDate ?? ''
      return !d
    })
  }, [items, lines])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (items.length === 0) return
    if (!customerName.trim()) {
      setError(t.checkout.errorName)
      return
    }
    if (!customerPhone.trim()) {
      setError(t.checkout.errorPhone)
      return
    }
    if (hasDateError) {
      setError(t.checkout.errorDate)
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        items: items.map((it) => {
          const d = lines[it.id] ?? DEFAULT_LINE
          return {
            productId: it.productId,
            qty: it.qty,
            travelDate: d.travelDate,
            travelTime: d.travelTime,
            adults: Math.max(0, Math.floor(d.adults)),
            children: Math.max(0, Math.floor(d.children)),
            flightNumber: d.flightNumber,
          }
        }),
        notes: notes.trim(),
      }
      const { booking } = await clientBookingsApi.create(payload)
      // Booking saved — drop the cart so the success page shows the clean state,
      // then navigate. The success page fetches the booking by number itself.
      clear()
      router.push(`/checkout/success/${encodeURIComponent(booking.bookingNumber)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-vg-bg text-white min-h-screen">
      <div className="relative">
        <TopNav />
      </div>

      <main className="max-w-[1100px] mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="mb-10">
          <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-3">
            {t.checkout.eyebrow}
          </div>
          <h1
            className="font-display font-semibold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            {t.checkout.title}
          </h1>
          <p className="text-white/65 mt-4 max-w-[600px]">
            {t.checkout.subtitle}
          </p>
        </div>

        {items.length === 0 ? (
          <EmptyCart t={t.checkout} />
        ) : (
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* ── Line items ────────────────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              {/* Contact card — always first so we see it without scrolling */}
              <div className="rounded-2xl bg-vg-surface border border-vg-border p-6 flex flex-col gap-4">
                <div>
                  <div className="font-display text-lg font-semibold text-white">
                    {t.checkout.contactTitle}
                  </div>
                  <div className="text-sm text-white/55 mt-1">
                    {t.checkout.contactSubtitle}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <Field label={t.checkout.yourName} required>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={t.checkout.namePlaceholder}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      maxLength={80}
                      className={inputClass}
                    />
                  </Field>
                  <Field label={t.checkout.phoneNumber} required>
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder={t.checkout.phonePlaceholder}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      maxLength={20}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>

              {items.map((it) => {
                const d = lines[it.id] ?? DEFAULT_LINE
                return (
                  <div
                    key={it.id}
                    className="rounded-2xl bg-vg-surface border border-vg-border p-6 flex flex-col gap-5"
                  >
                    {/* Line header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[10px] text-white/45 uppercase tracking-[0.18em]">
                          {labelForService(it.serviceType, t.service)} · {it.airportCode}
                        </div>
                        <div className="font-display text-xl text-white font-semibold mt-1">
                          {it.title}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">
                          {formatFromVnd(it.unitPriceVnd * it.qty)}
                        </div>
                        <div className="text-xs text-white/50 mt-0.5">
                          {formatFromVnd(it.unitPriceVnd)} × {it.qty}
                        </div>
                      </div>
                    </div>

                    {/* Qty + remove */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <QtyButton onClick={() => updateQty(it.id, it.qty - 1)}>−</QtyButton>
                        <span className="w-8 text-center text-sm tabular-nums">{it.qty}</span>
                        <QtyButton onClick={() => updateQty(it.id, it.qty + 1)}>+</QtyButton>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(it.id)}
                        className="text-xs text-white/50 hover:text-white/80 transition-colors"
                      >
                        {t.checkout.remove}
                      </button>
                    </div>

                    {/* Per-line traveller fields */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-white/10">
                      <Field label={t.checkout.travelDate} required>
                        <input
                          type="date"
                          required
                          value={d.travelDate}
                          onChange={(e) => updateLine(it.id, { travelDate: e.target.value })}
                          className={inputClass}
                        />
                      </Field>

                      {needsTime(it.serviceType) ? (
                        <Field label={t.checkout.time}>
                          <input
                            type="time"
                            value={d.travelTime}
                            onChange={(e) => updateLine(it.id, { travelTime: e.target.value })}
                            className={inputClass}
                          />
                        </Field>
                      ) : (
                        <Field label={t.checkout.checkIn}>
                          <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50">
                            {t.checkout.checkInNote}
                          </div>
                        </Field>
                      )}

                      <Field label={t.checkout.adults}>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={d.adults}
                          onChange={(e) =>
                            updateLine(it.id, { adults: Number(e.target.value) || 0 })
                          }
                          className={inputClass}
                        />
                      </Field>

                      <Field label={t.checkout.children}>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={d.children}
                          onChange={(e) =>
                            updateLine(it.id, { children: Number(e.target.value) || 0 })
                          }
                          className={inputClass}
                        />
                      </Field>

                      {needsFlight(it.serviceType) && (
                        <Field label={t.checkout.flightNumber} span={2}>
                          <input
                            type="text"
                            placeholder={t.checkout.flightPlaceholder}
                            value={d.flightNumber}
                            onChange={(e) =>
                              updateLine(it.id, {
                                flightNumber: e.target.value.toUpperCase(),
                              })
                            }
                            className={inputClass}
                          />
                        </Field>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Notes */}
              <div className="rounded-2xl bg-vg-surface border border-vg-border p-6">
                <label className="text-xs text-white/50 uppercase tracking-[0.18em]">
                  {t.checkout.specialRequests}
                </label>
                <textarea
                  rows={3}
                  placeholder={t.checkout.specialRequestsPlaceholder}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={1000}
                  className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-vg-accent resize-none"
                />
                <div className="text-right text-[11px] text-white/35 mt-1">
                  {notes.length}/1000
                </div>
              </div>
            </div>

            {/* ── Summary ────────────────────────────────────────────── */}
            <aside className="lg:sticky lg:top-8 h-fit">
              <div className="rounded-2xl bg-vg-surface border border-vg-border p-6 flex flex-col gap-4">
                <div className="font-display text-lg font-semibold text-white">{t.checkout.summary}</div>

                <div className="flex flex-col gap-2 text-sm">
                  {items.map((it) => (
                    <div key={it.id} className="flex justify-between gap-4">
                      <span className="text-white/75 truncate">
                        {it.title} × {it.qty}
                      </span>
                      <span className="text-white tabular-nums">
                        {formatFromVnd(it.unitPriceVnd * it.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between text-sm">
                  <span className="text-white/65">{t.checkout.subtotal}</span>
                  <span className="text-white tabular-nums">{formatFromVnd(totalVnd)}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-white font-semibold">{t.checkout.total}</span>
                  <span className="font-display text-2xl font-semibold text-white tabular-nums">
                    {formatFromVnd(totalVnd)}
                  </span>
                </div>

                <div className="rounded-xl bg-vg-accent/10 border border-vg-accent/30 px-4 py-3 text-xs text-vg-accent leading-relaxed">
                  {t.checkout.callNote}
                </div>

                {error && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-xs text-red-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || items.length === 0}
                  className="mt-2 px-6 py-4 rounded-full bg-vg-cta hover:bg-vg-cta-hover text-white font-semibold text-sm shadow-[0_8px_24px_rgba(29,78,216,0.35)] hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {submitting ? t.checkout.placingBooking : t.checkout.requestBooking}
                </button>

                <Link
                  href="/destinations"
                  className="text-center text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                  {t.checkout.keepBrowsing}
                </Link>
              </div>
            </aside>
          </form>
        )}
      </main>
    </div>
  )
}

// ─── small helpers ────────────────────────────────────────────────────────

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-vg-accent'

function Field({
  label,
  children,
  required,
  span = 1,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
  span?: 1 | 2
}) {
  return (
    <label className={`flex flex-col gap-1 ${span === 2 ? 'col-span-2' : ''}`}>
      <span className="text-[10px] text-white/45 uppercase tracking-[0.18em]">
        {label}
        {required && <span className="text-vg-accent"> *</span>}
      </span>
      {children}
    </label>
  )
}

function QtyButton({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-8 h-8 grid place-items-center rounded-full border border-white/15 text-white/80 hover:bg-white/10 hover:border-white/30 transition-colors text-base leading-none"
    >
      {children}
    </button>
  )
}

function labelForService(s: CartItem['serviceType'], t: { pickup: string; fastTrack: string; hotel: string; tour: string }): string {
  return s === 'pickup'
    ? t.pickup
    : s === 'fastTrack'
      ? t.fastTrack
      : s === 'hotel'
        ? t.hotel
        : t.tour
}

function EmptyCart({ t }: { t: { emptyTitle: string; emptyBody: string; browseDestinations: string } }) {
  return (
    <div className="rounded-2xl bg-vg-surface border border-vg-border p-12 text-center">
      <h2 className="font-display text-2xl font-semibold text-white">{t.emptyTitle}</h2>
      <p className="text-white/60 mt-2">{t.emptyBody}</p>
      <Link
        href="/destinations"
        className="inline-block mt-6 px-6 py-3 rounded-full bg-vg-cta hover:bg-vg-cta-hover text-white text-sm font-semibold transition-colors"
      >
        {t.browseDestinations}
      </Link>
    </div>
  )
}
