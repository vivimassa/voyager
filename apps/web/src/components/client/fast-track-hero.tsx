'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useT } from '@/i18n/use-t'
import { useLocaleStore } from '@/stores/locale-store'
import { AIRPORTS } from '@/data/airports'
import type { Direction, Segment } from '@/data/airports'

const HERO_IMG =
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80'

function todayIso(): string {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export function FastTrackHero() {
  const t = useT()
  const router = useRouter()
  const locale = useLocaleStore((s) => s.locale)
  const [airport, setAirport] = useState<string>(AIRPORTS[0].code)
  const [segment, setSegment] = useState<Segment>('international')
  const [direction, setDirection] = useState<'arrival' | 'departure'>('departure')
  const [travelDate, setTravelDate] = useState<string>(todayIso())
  const [pax, setPax] = useState<number>(1)

  const selectedAirport = useMemo(() => AIRPORTS.find((a) => a.code === airport) ?? AIRPORTS[0], [airport])

  const availableSegments = useMemo<Segment[]>(() => {
    const set = new Set<Segment>()
    for (const lane of selectedAirport.lanes) set.add(lane.segment)
    return Array.from(set)
  }, [selectedAirport])

  const availableDirections = useMemo<Array<'arrival' | 'departure'>>(() => {
    const set = new Set<'arrival' | 'departure'>()
    for (const lane of selectedAirport.lanes) {
      if (lane.segment !== segment) continue
      if (lane.direction === 'both') {
        set.add('arrival')
        set.add('departure')
      } else if (lane.direction === 'arrival' || lane.direction === 'departure') {
        set.add(lane.direction)
      }
    }
    return Array.from(set)
  }, [selectedAirport, segment])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({
      airport: selectedAirport.code,
      segment,
      direction,
      date: travelDate,
      pax: String(pax),
    })
    router.push(`/booking?${params.toString()}`)
  }

  function onAirportChange(code: string) {
    setAirport(code)
    const airportNext = AIRPORTS.find((a) => a.code === code)!
    if (!airportNext.lanes.some((l) => l.segment === segment)) {
      setSegment(airportNext.lanes[0].segment)
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.02]"
        style={{ backgroundImage: `url('${HERO_IMG}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/55 to-slate-900/80" />

      <div className="relative z-10 px-6 md:px-10 pt-28 md:pt-36 pb-12 md:pb-20 max-w-[1200px] mx-auto">
        <div className="text-center max-w-[760px] mx-auto">
          <span className="inline-block text-[11px] tracking-[0.18em] uppercase font-semibold text-vg-accent bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
            {t.hero.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
            {t.hero.title}
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/85 leading-relaxed max-w-[580px] mx-auto">
            {t.hero.sub}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 md:mt-14 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 p-4 md:p-6 grid md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_auto] gap-3 md:gap-4 items-end"
        >
          <Field label={t.search.airport}>
            <select
              value={airport}
              onChange={(e) => onAirportChange(e.target.value)}
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
              {availableSegments.map((s) => (
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
              {availableDirections.map((d) => (
                <option key={d} value={d}>{t.direction[d as 'arrival' | 'departure']}</option>
              ))}
            </select>
          </Field>

          <Field label={t.search.travelDate}>
            <input
              type="date"
              required
              value={travelDate}
              min={todayIso()}
              onChange={(e) => setTravelDate(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label={t.search.pax}>
            <input
              type="number"
              min={1}
              max={50}
              value={pax}
              onChange={(e) => setPax(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
              className={inputClass}
            />
          </Field>

          <button
            type="submit"
            className="md:col-start-6 h-12 px-6 rounded-xl bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.99]"
          >
            {t.search.cta}
          </button>

          <p className="md:col-span-6 text-xs text-vg-text-muted">{t.search.helper}</p>
        </form>

        <p className="mt-6 text-center text-xs text-white/70 tracking-wide">{t.hero.trustline}</p>
      </div>
    </section>
  )
}

const inputClass =
  'w-full h-12 bg-white border border-vg-border-strong rounded-lg px-3 text-sm text-vg-text placeholder:text-vg-text-subtle focus:outline-none focus:border-vg-cta'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold text-vg-text uppercase tracking-wide">{label}</span>
      {children}
    </label>
  )
}
