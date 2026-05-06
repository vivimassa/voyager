'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { FxBootstrap } from '@/components/client/fx-bootstrap'
import { useT } from '@/i18n/use-t'
import { useLocaleStore } from '@/stores/locale-store'
import { useCurrencyStore } from '@/stores/currency-store'
import { useCartStore } from '@/stores/cart-store'
import {
  AIRPORTS,
  airportByCode,
  pickLaneForRequest,
  fastTrackProductId,
  type AirportCode,
  type Direction,
  type Segment,
} from '@/data/airports'
import { airportCity } from '@/lib/airport-cities'
import { clientBookingsApi } from '@/lib/client-bookings-api'

function todayIso(): string {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export default function BookingPage() {
  const t = useT()
  const router = useRouter()
  const params = useSearchParams()
  const locale = useLocaleStore((s) => s.locale)
  const formatFromUsd = useCurrencyStore((s) => s.formatFromUsd)
  const rateUsdVnd = useCurrencyStore((s) => s.rateUsdVnd)
  useCurrencyStore((s) => s.currency)
  const addOrReplace = useCartStore((s) => s.addOrReplace)

  const initialAirport = (params.get('airport') ?? AIRPORTS[0].code) as AirportCode
  const initialSegment = ((params.get('segment') ?? 'international') as Segment)
  const initialDirection = ((params.get('direction') ?? 'departure') as 'arrival' | 'departure')
  const initialDate = params.get('date') ?? todayIso()
  const initialPax = Math.max(1, Math.min(50, Number(params.get('pax')) || 1))

  const [airportCode, setAirportCode] = useState<AirportCode>(initialAirport)
  const [segment, setSegment] = useState<Segment>(initialSegment)
  const [direction, setDirection] = useState<'arrival' | 'departure'>(initialDirection)
  const [travelDate, setTravelDate] = useState<string>(initialDate)
  const [travelTime, setTravelTime] = useState<string>('')
  const [flightNumber, setFlightNumber] = useState<string>('')
  const [pax, setPax] = useState<number>(initialPax)

  const airport = useMemo(() => airportByCode(airportCode) ?? AIRPORTS[0], [airportCode])

  const segments = useMemo<Segment[]>(() => {
    const set = new Set<Segment>()
    for (const lane of airport.lanes) set.add(lane.segment)
    return Array.from(set)
  }, [airport])

  const directions = useMemo<Array<'arrival' | 'departure'>>(() => {
    const set = new Set<'arrival' | 'departure'>()
    for (const lane of airport.lanes) {
      if (lane.segment !== segment) continue
      if (lane.direction === 'both') {
        set.add('arrival')
        set.add('departure')
      } else if (lane.direction === 'arrival' || lane.direction === 'departure') {
        set.add(lane.direction)
      }
    }
    return Array.from(set)
  }, [airport, segment])

  const lane = useMemo(() => pickLaneForRequest(airport, segment, direction), [airport, segment, direction])

  const tier: 'FIT' | 'GIT' = pax >= 6 ? 'GIT' : 'FIT'
  const unitPriceUsd = lane
    ? tier === 'GIT' && lane.gitPriceUsd > 0
      ? lane.gitPriceUsd
      : lane.fitPriceUsd
    : 0
  const totalUsd = unitPriceUsd * pax

  const [inventory, setInventory] = useState<{ remaining: number; isUnlimited: boolean } | null>(null)
  const [inventoryError, setInventoryError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Probe inventory whenever the lane key changes.
  useEffect(() => {
    if (!lane) return
    setInventoryError(null)
    setInventory(null)
    let cancelled = false
    const productLaneDirection = lane.direction === 'both' ? 'both' : direction
    clientBookingsApi
      .inventory({
        airportCode,
        segment,
        direction: productLaneDirection,
        date: travelDate,
      })
      .then((data) => {
        if (cancelled) return
        setInventory({ remaining: data.remaining, isUnlimited: data.isUnlimited })
      })
      .catch((err: Error) => {
        if (cancelled) return
        setInventoryError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [airportCode, segment, direction, travelDate, lane])

  function handleAirportChange(code: string) {
    const next = airportByCode(code)
    if (!next) return
    setAirportCode(next.code)
    if (!next.lanes.some((l) => l.segment === segment)) {
      setSegment(next.lanes[0].segment)
    }
  }

  function handleProceed() {
    if (!lane) return
    if (inventory && !inventory.isUnlimited && inventory.remaining < pax) return
    setSubmitting(true)
    const productLaneDirection = lane.direction === 'both' ? direction : lane.direction
    addOrReplace({
      productId: fastTrackProductId({ airportCode, segment, direction: lane.direction }),
      airportCode,
      segment,
      direction: productLaneDirection as 'arrival' | 'departure',
      title: `Fast Track ${airportCode} ${segment === 'international' ? 'Intl' : 'Dom'}`,
      unitPriceUsd,
      unitPriceVnd: Math.round(unitPriceUsd * rateUsdVnd),
      qty: pax,
      travelDate,
      travelTime,
      flightNumber: flightNumber.toUpperCase(),
    })
    router.push('/checkout')
  }

  const soldOut = inventory && !inventory.isUnlimited && inventory.remaining <= 0
  const overCap = inventory && !inventory.isUnlimited && inventory.remaining < pax && !soldOut

  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <FxBootstrap />
      <TopNav />
      <main className="flex-1 max-w-[1100px] w-full mx-auto px-6 md:px-10 py-10 md:py-16">
        <nav className="text-xs text-vg-text-muted mb-3">
          <Link href="/" className="hover:underline">{t.common.home}</Link>
          <span className="mx-1.5">›</span>
          <span className="text-vg-text">{t.booking.title}</span>
        </nav>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight">{t.booking.title}</h1>

        <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="bg-white rounded-2xl border border-vg-border p-6 md:p-8 flex flex-col gap-6">
            <header>
              <div className="text-xs text-vg-text-muted uppercase tracking-wide">{t.booking.laneTitle}</div>
              <h2 className="mt-1 font-display text-xl font-bold text-vg-text">
                Fast Track · {locale === 'vi' ? airport.nameVi : airport.name} · {airportCity(airportCode, locale)}
              </h2>
            </header>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t.search.airport}>
                <select
                  value={airportCode}
                  onChange={(e) => handleAirportChange(e.target.value)}
                  className={inputClass}
                >
                  {AIRPORTS.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.code} · {locale === 'vi' ? a.cityVi : a.city}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={t.search.segment}>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value as Segment)}
                  className={inputClass}
                >
                  {segments.map((s) => (
                    <option key={s} value={s}>{t.segment[s]}</option>
                  ))}
                </select>
              </Field>

              <Field label={t.search.direction}>
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as 'arrival' | 'departure')}
                  className={inputClass}
                >
                  {directions.map((d) => (
                    <option key={d} value={d}>{t.direction[d]}</option>
                  ))}
                </select>
              </Field>

              <Field label={t.search.travelDate}>
                <input
                  type="date"
                  required
                  min={todayIso()}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label={t.booking.travelTimeLabel}>
                <input
                  type="time"
                  value={travelTime}
                  onChange={(e) => setTravelTime(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label={t.booking.flightLabel}>
                <input
                  type="text"
                  placeholder="VN123"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                  className={inputClass}
                />
              </Field>

              <Field label={t.booking.paxLabel} span={2}>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="-"
                    onClick={() => setPax(Math.max(1, pax - 1))}
                    className="grid place-items-center w-10 h-10 rounded-lg border border-vg-border-strong hover:bg-vg-surface-muted text-lg font-bold"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={pax}
                    onChange={(e) => setPax(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                    className={`${inputClass} text-center w-20`}
                  />
                  <button
                    type="button"
                    aria-label="+"
                    onClick={() => setPax(Math.min(50, pax + 1))}
                    className="grid place-items-center w-10 h-10 rounded-lg border border-vg-border-strong hover:bg-vg-surface-muted text-lg font-bold"
                  >
                    +
                  </button>
                  <span className="text-xs text-vg-text-muted">{tier} pricing</span>
                </div>
              </Field>
            </div>

            {lane && (
              <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-4 mt-2 pt-4 border-t border-vg-border">
                {lane.inclusions.map((key) => (
                  <li key={key} className="flex items-center gap-2 text-sm text-vg-text">
                    <span className="text-vg-accent">✓</span>
                    {t.inclusion[key]}
                  </li>
                ))}
              </ul>
            )}

            {inventoryError && (
              <p className="text-xs text-red-600">{inventoryError}</p>
            )}
            {inventory && !inventory.isUnlimited && inventory.remaining > 0 && inventory.remaining <= 10 && (
              <p className="text-xs text-vg-warm">{t.booking.inventoryRemaining(inventory.remaining)}</p>
            )}
            {soldOut && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                <strong>{t.booking.soldOut}</strong> — {t.booking.soldOutNote}
              </div>
            )}
            {overCap && (
              <div className="rounded-lg bg-vg-warm/10 border border-vg-warm/40 px-3 py-2 text-sm text-vg-text">
                Only {inventory?.remaining} slot{inventory?.remaining === 1 ? '' : 's'} left for that date.
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-20 h-fit bg-white rounded-2xl border border-vg-border p-6 md:p-8">
            <div className="text-xs text-vg-text-muted uppercase tracking-wide">{t.checkout.yourPriceSummary}</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-sm text-vg-text-muted">
                {pax} × {formatFromUsd(unitPriceUsd)}
              </span>
              <span className="font-display text-2xl font-bold text-vg-text tabular-nums">
                {formatFromUsd(totalUsd)}
              </span>
            </div>
            <div className="mt-1 text-[11px] text-vg-text-subtle">{tier === 'GIT' ? 'Group / GIT pricing applied' : 'Individual / FIT pricing'}</div>
            <button
              type="button"
              disabled={!lane || submitting || soldOut === true || overCap === true}
              onClick={handleProceed}
              className="mt-6 w-full h-12 rounded-xl bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.booking.proceed}
            </button>
            <p className="mt-3 text-[11px] text-vg-text-muted leading-relaxed">{t.checkout.freeCancel} · {t.checkout.securePromise}</p>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

const inputClass =
  'w-full h-11 bg-white border border-vg-border-strong rounded-lg px-3 text-sm text-vg-text placeholder:text-vg-text-subtle focus:outline-none focus:border-vg-cta'

function Field({ label, span = 1, children }: { label: string; span?: 1 | 2; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1.5 ${span === 2 ? 'sm:col-span-2' : ''}`}>
      <span className="text-[11px] font-bold text-vg-text uppercase tracking-wide">{label}</span>
      {children}
    </label>
  )
}
