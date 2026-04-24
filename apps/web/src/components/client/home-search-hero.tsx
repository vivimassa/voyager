'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DESTINATIONS } from '@/data/destinations'
import { useT } from '@/i18n/use-t'
import { useDestLocale } from '@/hooks/use-dest-locale'
import { airportCity } from '@/lib/airport-cities'
import { useLocaleStore } from '@/stores/locale-store'

type Tab = 'hotels' | 'transfers' | 'fastTrack' | 'tours'

const TAB_TO_SERVICE: Record<Tab, string> = {
  hotels: 'hotel',
  transfers: 'pickup',
  fastTrack: 'fastTrack',
  tours: 'tour',
}

const HERO_PHOTO = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=80'

export function HomeSearchHero() {
  const t = useT()
  const L = useDestLocale()
  const locale = useLocaleStore((s) => s.locale)
  const router = useRouter()

  const [tab, setTab] = useState<Tab>('hotels')
  const [dest, setDest] = useState<string>('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [paxOpen, setPaxOpen] = useState(false)
  const paxRef = useRef<HTMLDivElement | null>(null)
  const stripRef = useRef<HTMLDivElement | null>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const updateArrows = () => {
    const el = stripRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  const scrollStrip = (dir: 1 | -1) => {
    const el = stripRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: 'smooth' })
  }

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (paxRef.current && !paxRef.current.contains(e.target as Node)) setPaxOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  function handleSearch() {
    const params = new URLSearchParams()
    params.set('service', TAB_TO_SERVICE[tab])
    if (dest) params.set('dest', dest)
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    params.set('adults', String(adults))
    params.set('children', String(children))
    if (dest) router.push(`/destinations/${dest}?${params.toString()}`)
    else router.push(`/destinations?${params.toString()}`)
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'hotels',
      label: t.search.tabHotels,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 22V8l9-6 9 6v14" /><path d="M9 22V12h6v10" />
        </svg>
      ),
    },
    {
      key: 'transfers',
      label: t.search.tabTransfers,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5" /><path d="M14 17H9" /><circle cx="6.5" cy="17.5" r="2.5" /><circle cx="16.5" cy="17.5" r="2.5" /><path d="M23 17h-4.5" />
        </svg>
      ),
    },
    {
      key: 'fastTrack',
      label: t.search.tabFastTrack,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      key: 'tours',
      label: t.search.tabTours,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ),
    },
  ]

  const activeHeroPhoto = DESTINATIONS.find((d) => d.slug === dest)?.photo ?? HERO_PHOTO

  return (
    <section className="relative w-full overflow-hidden">
      <div
        key={activeHeroPhoto}
        className="absolute inset-0 bg-cover bg-center animate-kenburns-slow"
        style={{ backgroundImage: `url('${activeHeroPhoto}')` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(10,25,50,0.55) 0%, rgba(10,25,50,0.35) 45%, rgba(10,25,50,0.55) 100%)' }}
      />

      <div className="relative z-10 pt-24 md:pt-32 pb-14 md:pb-20 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] tracking-[0.22em] uppercase font-semibold text-white/95 mb-5">
          {t.seamless.eyebrow}
        </div>
        <h1
          className="font-display font-bold text-white leading-[1.02] tracking-[-0.025em] max-w-[880px]"
          style={{ fontSize: 'clamp(34px, 5.6vw, 64px)', textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}
        >
          {t.seamless.headline}
        </h1>
        <p className="mt-4 text-[15px] md:text-[17px] text-white/90 max-w-[640px] leading-relaxed">
          {t.seamless.sub}
        </p>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((tb) => {
            const active = tab === tb.key
            return (
              <button
                key={tb.key}
                type="button"
                onClick={() => setTab(tb.key)}
                className={`inline-flex items-center gap-2 px-4 h-11 rounded-xl text-sm font-semibold border backdrop-blur-sm transition-all ${
                  active
                    ? 'bg-white text-vg-text border-white shadow-[0_8px_22px_rgba(0,0,0,0.2)]'
                    : 'bg-black/30 text-white border-white/30 hover:bg-black/45 hover:border-white/45'
                }`}
              >
                {tb.icon}
                {tb.label}
              </button>
            )
          })}
        </div>

        {/* Search bar */}
        <div className="bg-white/96 backdrop-blur-sm rounded-2xl shadow-[0_18px_44px_rgba(0,0,0,0.22)] border border-white/85 p-2.5 md:p-3 flex flex-col md:flex-row gap-2.5">
          <SearchField
            label={
              tab === 'fastTrack'
                ? (locale === 'vi' ? 'Sân bay đến' : 'Airport')
                : tab === 'transfers'
                  ? (locale === 'vi' ? 'Điểm đón' : 'Pickup point')
                  : tab === 'tours'
                    ? (locale === 'vi' ? 'Nơi muốn khám phá' : 'Where to explore')
                    : t.search.destination
            }
            icon={<DestIcon />}
            className="md:flex-[1.4]"
          >
            <select
              value={dest}
              onChange={(e) => setDest(e.target.value)}
              className="w-full bg-transparent text-[15px] font-semibold text-vg-text focus:outline-none"
            >
              <option value="">{t.search.destinationPh}</option>
              {DESTINATIONS.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {L.name(d)} · {airportCity(d.airportCode, locale)}
                </option>
              ))}
            </select>
          </SearchField>

          <SearchField
            label={tab === 'hotels' ? t.search.dates : t.checkout.travelDate}
            icon={<CalIcon />}
            className="md:flex-[1.4]"
          >
            <div className="flex items-center gap-2 w-full">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-[14px] font-semibold text-vg-text focus:outline-none"
              />
              {tab === 'hotels' && (
                <>
                  <span className="text-vg-text-subtle">→</span>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent text-[14px] font-semibold text-vg-text focus:outline-none"
                  />
                </>
              )}
            </div>
          </SearchField>

          <div ref={paxRef} className="relative md:flex-1">
            <SearchField label={t.search.travelers} icon={<PaxIcon />}>
              <button
                type="button"
                onClick={() => setPaxOpen((v) => !v)}
                className="w-full text-left bg-transparent text-[15px] font-semibold text-vg-text focus:outline-none"
              >
                {adults} {t.search.adults.toLowerCase()}
                {children > 0 ? `, ${children} ${t.search.children.toLowerCase()}` : ''}
              </button>
            </SearchField>
            {paxOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-vg-border p-5 z-20 min-w-[260px]">
                <Stepper label={t.search.adults} value={adults} min={1} max={20} onChange={setAdults} />
                <div className="h-px bg-vg-border my-3" />
                <Stepper label={t.search.children} value={children} min={0} max={10} onChange={setChildren} />
                <button
                  type="button"
                  onClick={() => setPaxOpen(false)}
                  className="w-full mt-4 h-10 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white text-sm font-semibold"
                >
                  OK
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="md:flex-[0.72] h-[62px] px-8 rounded-xl bg-vg-warm hover:bg-vg-warm-hover text-vg-text font-display font-bold text-base transition-all shadow-[0_8px_22px_rgba(245,158,11,0.42)] hover:shadow-[0_12px_28px_rgba(245,158,11,0.5)]"
          >
            {t.search.search}
          </button>
        </div>
      </div>

      {/* Photo carousel below hero */}
      <div className="relative z-10 bg-gradient-to-b from-transparent to-vg-bg pt-4">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 pb-6">
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/90 mb-3">
            {t.search.exploreStrip}
          </div>
          <div className="relative group/carousel">
            <div
              ref={stripRef}
              className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 snap-x scroll-smooth scrollbar-none"
              style={{ scrollbarWidth: 'none' }}
            >
              {DESTINATIONS.map((d) => {
                const selected = dest === d.slug
                return (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => {
                    setDest(d.slug)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  aria-pressed={selected}
                  className={`group relative snap-start shrink-0 w-[240px] h-[170px] rounded-2xl overflow-hidden transition-all bg-cover bg-center hover:-translate-y-0.5 ${
                    selected
                      ? 'border-[3px] border-vg-accent shadow-[0_14px_36px_rgba(14,165,95,0.45)] ring-2 ring-vg-accent/30'
                      : 'border-2 border-white/60 hover:border-white shadow-[0_10px_28px_rgba(0,0,0,0.25)]'
                  }`}
                  style={{ backgroundImage: `url('${d.photo}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  {selected && (
                    <span
                      className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-full bg-vg-accent text-white shadow-[0_6px_18px_rgba(0,0,0,0.35)] animate-[tickIn_0.25s_ease-out]"
                      aria-hidden
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                  <div className="absolute bottom-3 left-4 right-4 text-left">
                    <div className="font-display font-bold text-white text-xl leading-tight tracking-tight">{L.name(d)}</div>
                    <div className="text-[11px] text-white/85 tracking-wide mt-0.5">{airportCity(d.airportCode, locale)}</div>
                  </div>
                </button>
                )
              })}
            </div>

            {/* Arrow buttons — both always visible; disabled state when at edge */}
            <button
              type="button"
              onClick={() => scrollStrip(-1)}
              disabled={!canLeft}
              aria-label="Previous"
              className={`hidden md:grid absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 place-items-center w-11 h-11 rounded-full bg-white text-vg-text shadow-[0_8px_22px_rgba(0,0,0,0.25)] transition-all hover:scale-105 ${
                canLeft ? 'opacity-100' : 'opacity-40 cursor-not-allowed hover:scale-100'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollStrip(1)}
              disabled={!canRight}
              aria-label="Next"
              className={`hidden md:grid absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 place-items-center w-11 h-11 rounded-full bg-white text-vg-text shadow-[0_8px_22px_rgba(0,0,0,0.25)] transition-all hover:scale-105 ${
                canRight ? 'opacity-100' : 'opacity-40 cursor-not-allowed hover:scale-100'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SearchField({
  label,
  icon,
  children,
  className = '',
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-vg-border/70 hover:border-vg-warm/45 bg-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] transition-colors ${className}`}
    >
      <div className="text-vg-text-muted/90 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-[0.14em] text-vg-text-subtle font-semibold">{label}</div>
        {children}
      </div>
    </div>
  )
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (n: number) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm font-semibold text-vg-text">{label}</div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 rounded-full border border-vg-border-strong text-vg-text hover:bg-vg-surface-muted disabled:opacity-30"
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-semibold tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full border border-vg-border-strong text-vg-text hover:bg-vg-surface-muted disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  )
}

function DestIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function CalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function PaxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
