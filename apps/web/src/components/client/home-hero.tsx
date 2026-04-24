'use client'

/**
 * HomeHero — full-screen destination carousel.
 * Ports _mockups/home-hero-v2.html into React.
 *
 * Interaction:
 *   - activeIdx state drives which destination is foregrounded
 *   - prev/next arrow buttons + left/right keys + clicking a card
 *   - all 5 hero backgrounds are pre-rendered with opacity transitions (smooth crossfade)
 *   - ken-burns zoom animation on the active one
 *
 * Prices display via useCurrencyStore.formatFromVnd so VND/USD toggle in the
 * top nav updates the hero live.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { DESTINATIONS, SERVICE_ORDER } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'

export function HomeHero() {
  const t = useT()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  // subscribe to currency so component re-renders on toggle (formatFromVnd
  // is a store method; it doesn't change identity, so we need this hint)
  useCurrencyStore((s) => s.currency)

  const [activeIdx, setActiveIdx] = useState(0)
  const active = DESTINATIONS[activeIdx]

  const goto = useCallback((idx: number) => {
    const n = DESTINATIONS.length
    setActiveIdx(((idx % n) + n) % n)
  }, [])
  const next = useCallback(() => goto(activeIdx + 1), [activeIdx, goto])
  const prev = useCallback(() => goto(activeIdx - 1), [activeIdx, goto])

  // keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  // cards show the next 3 destinations after active (wrap)
  const cardDeck = useMemo(
    () =>
      [1, 2, 3].map((offset) => {
        const idx = (activeIdx + offset) % DESTINATIONS.length
        return { idx, dest: DESTINATIONS[idx] }
      }),
    [activeIdx],
  )

  const counterNum = String(activeIdx + 1).padStart(2, '0')
  const totalNum = String(DESTINATIONS.length).padStart(2, '0')

  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden bg-vg-bg">
      {/* Layered backgrounds — all pre-rendered, crossfaded via opacity */}
      {DESTINATIONS.map((d, i) => (
        <div
          key={d.slug}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[900ms] ease-out will-change-[opacity,transform] ${
            i === activeIdx ? 'opacity-100 animate-kenburns' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${d.photo}')` }}
          aria-hidden={i !== activeIdx}
        />
      ))}

      {/* Readability overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0) 80%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Hero content — bottom-left */}
      <div className="absolute bottom-0 left-0 z-[5] px-6 md:px-12 pb-24 md:pb-32 max-w-[780px]">
        {/* Airport tag */}
        <div className="inline-flex items-center gap-2 pl-2 pr-3 py-1.5 mb-6 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/95">
          <span className="px-2 py-0.5 rounded-full bg-vg-accent font-display text-[11px] tracking-[0.1em] text-white">
            {active.airportCode}
          </span>
          <span>{active.airportName}</span>
        </div>

        <div className="mb-5 pt-3.5 w-[70px] border-t border-white/35 font-display text-[13px] tracking-[0.12em] text-white/75">
          {t.hero.airportTag(active.airportCode)}
        </div>

        <h1
          className="font-display font-bold uppercase leading-[0.88] tracking-[-0.03em] mb-5 text-white"
          style={{
            fontSize: 'clamp(60px, 10.5vw, 150px)',
            textShadow: '0 4px 28px rgba(0,0,0,0.4)',
          }}
        >
          {active.name}
        </h1>

        <p className="text-[15px] leading-[1.65] text-white/90 max-w-[500px] mb-7">
          {active.description}
        </p>

        {/* Service chips */}
        <div className="flex flex-wrap gap-2 mb-8 max-w-[620px]">
          {SERVICE_ORDER.map((key) => {
            const s = active.services[key]
            return (
              <button
                key={key}
                type="button"
                className="group inline-flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:-translate-y-0.5 hover:border-white/35 transition-all"
              >
                <span className="grid place-items-center w-7 h-7 rounded-full bg-white/18 text-sm">
                  {s.icon}
                </span>
                <span className="flex flex-col items-start gap-px">
                  <span className="text-xs font-medium text-white/80 tracking-wide">
                    {s.label}
                  </span>
                  <span className="font-display text-sm font-semibold text-white">
                    {t.service.from} {formatFromVnd(s.priceVnd)}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3.5 items-center">
          <Link
            href={`/destinations/${active.slug}`}
            prefetch
            className="group inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-vg-cta hover:bg-vg-cta-hover text-white text-[15px] font-semibold shadow-[0_12px_40px_rgba(29,78,216,0.45)] hover:shadow-[0_16px_48px_rgba(29,78,216,0.6)] hover:-translate-y-0.5 transition-all"
          >
            {t.hero.ctaPrimary}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <button
            type="button"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2.5 px-6 py-[15px] rounded-full border border-white/30 text-white/90 text-sm font-medium hover:bg-white/10 hover:border-white/50 transition-colors"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Cards (right) */}
      <div className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 gap-4 z-[5]">
        {cardDeck.map(({ idx, dest }) => {
          const stars = '★'.repeat(dest.stars) + '☆'.repeat(5 - dest.stars)
          return (
            <button
              key={dest.slug}
              type="button"
              onClick={() => goto(idx)}
              className="relative w-[190px] h-[260px] rounded-[18px] overflow-hidden bg-cover bg-center bg-[#222] border border-white/20 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all cursor-pointer flex-shrink-0"
              style={{ backgroundImage: `url('${dest.photo}')` }}
              aria-label={`Jump to ${dest.name}`}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
                }}
              />
              <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center z-[2]">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-white/95">
                  {dest.name.toUpperCase()}
                </span>
                <span className="grid place-items-center w-[26px] h-[26px] rounded-full bg-white/25 backdrop-blur-sm text-white text-xs">
                  ♡
                </span>
              </div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-[2] text-left">
                <div className="text-[9px] tracking-[0.3em] mb-1 text-white/90">
                  {stars}
                </div>
                <div className="font-display text-[17px] font-semibold text-white">
                  <span className="text-[10px] font-normal font-sans text-white/70 mr-1">
                    {t.service.from}
                  </span>
                  {formatFromVnd(dest.headlinePriceVnd)}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Controls — centered bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-[5]">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous destination"
          className="grid place-items-center w-[46px] h-[46px] rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-lg hover:bg-white/28 transition-colors"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next destination"
          className="grid place-items-center w-[46px] h-[46px] rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-lg hover:bg-white/28 transition-colors"
        >
          ›
        </button>
      </div>

      {/* Counter — bottom right */}
      <div className="absolute bottom-[50px] right-6 md:right-12 z-[5] font-display text-white/90 flex items-baseline gap-0.5">
        <span className="text-3xl font-bold leading-none">{counterNum}</span>
        <span className="text-[15px] opacity-50">&nbsp;/ {totalNum}</span>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-6 md:left-12 z-[5] text-[11px] tracking-[0.2em] uppercase text-white/55 flex items-center gap-2.5 animate-bob">
        {t.hero.scrollHint}
      </div>
    </section>
  )
}
