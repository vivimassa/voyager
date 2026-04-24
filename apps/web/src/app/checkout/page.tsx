'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { useCartStore, type CartItem } from '@/stores/cart-store'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { clientBookingsApi } from '@/lib/client-bookings-api'
import { airportCity } from '@/lib/airport-cities'
import { useLocaleStore } from '@/stores/locale-store'

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

function needsTime(s: CartItem['serviceType']): boolean { return s !== 'hotel' }
function needsFlight(s: CartItem['serviceType']): boolean { return s === 'pickup' || s === 'fastTrack' }

export default function CheckoutPage() {
  const router = useRouter()
  const t = useT()
  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const remove = useCartStore((s) => s.remove)
  const clear = useCartStore((s) => s.clear)
  const totalVnd = useCartStore((s) => s.totalVnd())
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)
  const locale = useLocaleStore((s) => s.locale)

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [lines, setLines] = useState<Record<string, LineDetails>>({})
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLines((prev) => {
      const next = { ...prev }
      for (const it of items) if (!next[it.id]) next[it.id] = { ...DEFAULT_LINE }
      for (const id of Object.keys(next)) if (!items.find((i) => i.id === id)) delete next[id]
      return next
    })
  }, [items])

  function updateLine(id: string, patch: Partial<LineDetails>) {
    setLines((prev) => ({ ...prev, [id]: { ...(prev[id] ?? DEFAULT_LINE), ...patch } }))
  }

  const hasDateError = useMemo(() => items.some((it) => !(lines[it.id]?.travelDate ?? '')), [items, lines])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (items.length === 0) return
    if (!customerName.trim()) return setError(t.checkout.errorName)
    if (!customerPhone.trim()) return setError(t.checkout.errorPhone)
    if (hasDateError) return setError(t.checkout.errorDate)

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
      clear()
      router.push(`/checkout/success/${encodeURIComponent(booking.bookingNumber)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <TopNav />

      {/* Stepper */}
      <div className="bg-white border-b border-vg-border px-6 md:px-10 py-5">
        <div className="max-w-[1100px] mx-auto flex items-center gap-2 md:gap-6 text-sm">
          <Step n={1} label={t.checkout.step1} state={items.length > 0 ? 'done' : 'active'} />
          <Line />
          <Step n={2} label={t.checkout.step2} state="active" />
          <Line />
          <Step n={3} label={t.checkout.step3} state="todo" />
        </div>
      </div>

      <main className="flex-1 max-w-[1100px] w-full mx-auto px-6 md:px-10 py-8 pb-20 md:pb-0">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-vg-text mb-6">
          {t.checkout.title}
        </h1>

        {items.length === 0 ? (
          <EmptyCart t={t.checkout} />
        ) : (
          <form id="checkout-form" onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_340px] gap-6">
            <div className="flex flex-col gap-4">
              {/* Contact */}
              <Card>
                <CardHead title={t.checkout.contactTitle} sub={t.checkout.contactSubtitle} step="1" />
                <div className="grid md:grid-cols-2 gap-3 mt-4">
                  <Field label={t.checkout.yourName} required>
                    <input
                      type="text" required autoComplete="name" placeholder={t.checkout.namePlaceholder}
                      value={customerName} onChange={(e) => setCustomerName(e.target.value)} maxLength={80}
                      className={inputClass}
                    />
                  </Field>
                  <Field label={t.checkout.phoneNumber} required>
                    <input
                      type="tel" required autoComplete="tel" inputMode="tel" placeholder={t.checkout.phonePlaceholder}
                      value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} maxLength={20}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </Card>

              {items.map((it, idx) => {
                const d = lines[it.id] ?? DEFAULT_LINE
                return (
                  <Card key={it.id}>
                    <CardHead
                      title={it.title}
                      sub={`${serviceLabel(it.serviceType, t.service)} · ${airportCity(it.airportCode, locale)}`}
                      step={String(idx + 2)}
                    />
                    <div className="flex items-center gap-3 mt-3">
                      <div className="inline-flex items-center border border-vg-border-strong rounded-lg overflow-hidden">
                        <button type="button" onClick={() => updateQty(it.id, it.qty - 1)} className="w-9 h-9 text-vg-text hover:bg-vg-surface-muted">−</button>
                        <span className="w-8 text-center text-sm font-bold tabular-nums">{it.qty}</span>
                        <button type="button" onClick={() => updateQty(it.id, it.qty + 1)} className="w-9 h-9 text-vg-text hover:bg-vg-surface-muted">+</button>
                      </div>
                      <div className="text-sm text-vg-text-muted">
                        {formatFromVnd(it.unitPriceVnd)} × {it.qty} = <span className="font-bold text-vg-text">{formatFromVnd(it.unitPriceVnd * it.qty)}</span>
                      </div>
                      <button type="button" onClick={() => remove(it.id)} className="ml-auto text-xs text-vg-text-subtle hover:text-vg-text underline">
                        {t.checkout.remove}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-vg-border">
                      <Field label={t.checkout.travelDate} required>
                        <input type="date" required value={d.travelDate} onChange={(e) => updateLine(it.id, { travelDate: e.target.value })} className={inputClass} />
                      </Field>
                      {needsTime(it.serviceType) ? (
                        <Field label={t.checkout.time}>
                          <input type="time" value={d.travelTime} onChange={(e) => updateLine(it.id, { travelTime: e.target.value })} className={inputClass} />
                        </Field>
                      ) : (
                        <Field label={t.checkout.checkIn}>
                          <div className="h-10 px-3 flex items-center rounded-lg bg-vg-surface-muted border border-vg-border text-xs text-vg-text-muted">{t.checkout.checkInNote}</div>
                        </Field>
                      )}
                      <Field label={t.checkout.adults}>
                        <input type="number" min={0} max={20} value={d.adults} onChange={(e) => updateLine(it.id, { adults: Number(e.target.value) || 0 })} className={inputClass} />
                      </Field>
                      <Field label={t.checkout.children}>
                        <input type="number" min={0} max={20} value={d.children} onChange={(e) => updateLine(it.id, { children: Number(e.target.value) || 0 })} className={inputClass} />
                      </Field>
                      {needsFlight(it.serviceType) && (
                        <Field label={t.checkout.flightNumber} span={2}>
                          <input type="text" placeholder={t.checkout.flightPlaceholder} value={d.flightNumber}
                            onChange={(e) => updateLine(it.id, { flightNumber: e.target.value.toUpperCase() })} className={inputClass} />
                        </Field>
                      )}
                    </div>
                  </Card>
                )
              })}

              <Card>
                <label className="text-xs font-bold text-vg-text uppercase tracking-wide">{t.checkout.specialRequests}</label>
                <textarea
                  rows={3} maxLength={1000} placeholder={t.checkout.specialRequestsPlaceholder}
                  value={notes} onChange={(e) => setNotes(e.target.value)}
                  className="mt-2 w-full bg-white border border-vg-border-strong rounded-lg px-3 py-2 text-sm text-vg-text placeholder:text-vg-text-subtle focus:outline-none focus:border-vg-cta resize-none"
                />
                <div className="text-right text-[11px] text-vg-text-subtle mt-1">{notes.length}/1000</div>
              </Card>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-20 h-fit flex flex-col gap-4">
              <Card>
                <div className="font-display text-lg font-bold text-vg-text mb-3">{t.checkout.yourPriceSummary}</div>
                <div className="flex flex-col gap-2 text-sm">
                  {items.map((it) => (
                    <div key={it.id} className="flex justify-between gap-3">
                      <span className="text-vg-text-muted truncate">{it.title} × {it.qty}</span>
                      <span className="text-vg-text tabular-nums">{formatFromVnd(it.unitPriceVnd * it.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-vg-border flex justify-between text-sm">
                  <span className="text-vg-text-muted">{t.checkout.subtotal}</span>
                  <span className="text-vg-text tabular-nums">{formatFromVnd(totalVnd)}</span>
                </div>
                <div className="mt-2 flex justify-between items-baseline">
                  <span className="font-bold text-vg-text">{t.checkout.total}</span>
                  <span className="font-display text-2xl font-bold text-vg-text tabular-nums">{formatFromVnd(totalVnd)}</span>
                </div>

                <div className="mt-4 rounded-lg bg-vg-warm/10 border border-vg-warm/30 px-4 py-3">
                  <div className="text-sm font-bold text-vg-text">{t.checkout.noPaymentTitle}</div>
                  <p className="text-xs text-vg-text-muted mt-1 leading-relaxed">{t.checkout.noPaymentBody}</p>
                </div>

                {error && (
                  <div className="mt-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">{error}</div>
                )}

                <button
                  type="submit" disabled={submitting || items.length === 0}
                  className="mt-4 w-full h-12 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? t.checkout.placingBooking : t.checkout.requestBooking}
                </button>

                <ul className="mt-4 space-y-1.5 text-[11px] text-vg-text-muted">
                  <li>✓ {t.checkout.freeCancel}</li>
                  <li>✓ {t.checkout.noBookingFees}</li>
                  <li>✓ {t.checkout.securePromise}</li>
                </ul>
              </Card>
              <Link href="/destinations" className="text-center text-sm text-vg-cta hover:underline">
                {t.checkout.keepBrowsing}
              </Link>
            </aside>
          </form>
        )}
      </main>

      <SiteFooter />

      {items.length > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-20 bg-white border-t border-vg-border shadow-[0_-4px_14px_rgba(16,24,40,0.08)] flex items-center justify-between px-4 gap-3">
          <div className="min-w-0">
            <div className="text-xs text-vg-text-muted">{t.checkout.total}</div>
            <div className="font-bold text-vg-text tabular-nums text-base truncate">
              {formatFromVnd(totalVnd)}
            </div>
          </div>
          <button
            form="checkout-form"
            type="submit"
            disabled={submitting}
            className="flex-shrink-0 inline-flex items-center justify-center h-12 px-5 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? t.checkout.placingBooking : t.checkout.requestBooking}
          </button>
        </div>
      )}
    </div>
  )
}

const inputClass =
  'w-full h-10 bg-white border border-vg-border-strong rounded-lg px-3 text-sm text-vg-text placeholder:text-vg-text-subtle focus:outline-none focus:border-vg-cta'

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-xl border border-vg-border p-5 md:p-6">{children}</div>
}

function CardHead({ title, sub, step }: { title: string; sub?: string; step?: string }) {
  return (
    <div className="flex items-start gap-3">
      {step && (
        <div className="flex-shrink-0 grid place-items-center w-8 h-8 rounded-full bg-vg-cta/10 text-vg-cta font-bold text-sm">
          {step}
        </div>
      )}
      <div>
        <div className="font-display text-lg font-bold text-vg-text leading-tight">{title}</div>
        {sub && <div className="text-xs text-vg-text-muted mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}

function Field({ label, children, required, span = 1 }: { label: string; children: React.ReactNode; required?: boolean; span?: 1 | 2 }) {
  return (
    <label className={`flex flex-col gap-1 ${span === 2 ? 'col-span-2' : ''}`}>
      <span className="text-[11px] font-bold text-vg-text uppercase tracking-wide">
        {label}{required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  )
}

function Step({ n, label, state }: { n: number; label: string; state: 'done' | 'active' | 'todo' }) {
  const color = state === 'active' ? 'bg-vg-cta text-white' : state === 'done' ? 'bg-vg-accent text-white' : 'bg-vg-surface-muted text-vg-text-subtle border border-vg-border'
  const labelColor = state === 'todo' ? 'text-vg-text-subtle' : 'text-vg-text font-bold'
  return (
    <div className="flex items-center gap-2">
      <div className={`grid place-items-center w-7 h-7 rounded-full text-xs font-bold ${color}`}>
        {state === 'done' ? '✓' : n}
      </div>
      <span className={`text-sm ${labelColor}`}>{label}</span>
    </div>
  )
}

function Line() {
  return <div className="flex-1 h-px bg-vg-border" />
}

function serviceLabel(s: CartItem['serviceType'], t: { pickup: string; fastTrack: string; hotel: string; tour: string }) {
  return s === 'pickup' ? t.pickup : s === 'fastTrack' ? t.fastTrack : s === 'hotel' ? t.hotel : t.tour
}

function EmptyCart({ t }: { t: { emptyTitle: string; emptyBody: string; browseDestinations: string } }) {
  return (
    <div className="bg-white rounded-xl border border-vg-border p-12 text-center">
      <h2 className="font-display text-2xl font-bold text-vg-text">{t.emptyTitle}</h2>
      <p className="text-vg-text-muted mt-2">{t.emptyBody}</p>
      <Link href="/destinations" className="inline-block mt-6 px-6 h-12 leading-[48px] rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm transition-colors">
        {t.browseDestinations}
      </Link>
    </div>
  )
}
