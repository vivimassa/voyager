'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useT } from '@/i18n/use-t'
import { useLocaleStore } from '@/stores/locale-store'
import { useCurrencyStore } from '@/stores/currency-store'
import { AIRPORTS, minPriceUsd } from '@/data/airports'

export function AirportCoverage() {
  const t = useT()
  const locale = useLocaleStore((s) => s.locale)
  const formatFromUsd = useCurrencyStore((s) => s.formatFromUsd)
  useCurrencyStore((s) => s.currency)
  useCurrencyStore((s) => s.rateUsdVnd)

  return (
    <section id="coverage" className="bg-white px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto">
        <header className="text-center mb-10 md:mb-14">
          <span className="inline-block text-[11px] tracking-[0.18em] uppercase font-semibold text-vg-cta">
            {t.coverage.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight">
            {t.coverage.heading}
          </h2>
          <p className="mt-3 text-vg-text-muted max-w-[640px] mx-auto text-[15px] leading-relaxed">
            {t.coverage.sub}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {AIRPORTS.map((airport) => {
            const fromUsd = minPriceUsd(airport)
            const lanes = airport.lanes
              .map((l) => `${t.segment[l.segment]}${l.direction === 'both' ? '' : ` · ${t.direction[l.direction as 'arrival' | 'departure']}`}`)
              .join(' · ')
            return (
              <Link
                key={airport.code}
                href={`/booking?airport=${airport.code}`}
                className="group block rounded-2xl overflow-hidden bg-white border border-vg-border hover:border-vg-cta hover:shadow-xl transition-all"
              >
                <div
                  className="aspect-[4/3] bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${airport.photo}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/95 text-[11px] font-bold text-vg-text">
                    {airport.code}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="font-display text-xl font-bold leading-tight">
                      {locale === 'vi' ? airport.cityVi : airport.city}
                    </div>
                    <div className="text-xs text-white/80">{locale === 'vi' ? airport.nameVi : airport.name}</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-vg-text-muted line-clamp-1">{lanes}</div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] text-vg-text-subtle uppercase tracking-wide">{t.airportCard.fromLabel}</div>
                      <div className="font-display text-lg font-bold text-vg-text tabular-nums">{formatFromUsd(fromUsd)}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-vg-cta group-hover:translate-x-0.5 transition-transform">
                      {t.airportCard.bookCta}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12h14M13 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
