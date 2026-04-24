'use client'

import Link from 'next/link'
import { TopNav } from '@/components/client/top-nav'
import { DESTINATIONS } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'

const AIRPORT_CITY: Record<string, string> = {
  HAN: 'Hanoi',
  SGN: 'Saigon',
  DAD: 'Da Nang',
  CXR: 'Nha Trang',
  PQC: 'Phu Quoc',
}

export default function DestinationsIndexPage() {
  const t = useT()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  return (
    <div className="bg-vg-bg text-white min-h-screen">
      <div className="relative">
        <TopNav />
        <div className="px-6 md:px-12 pt-32 pb-12 max-w-[1400px] mx-auto">
          <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-3">
            {t.destination.whereToNext}
          </div>
          <h1
            className="font-display font-semibold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            {t.nav.destinations}
          </h1>
          <p className="mt-5 text-white/70 max-w-[540px]">
            {t.destination.indexSub}
          </p>
        </div>
      </div>

      <section className="bg-vg-bg px-6 md:px-12 pb-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESTINATIONS.map((d) => {
            const fromPrice = Math.min(
              ...Object.values(d.services).map((s) => s.priceVnd),
            )
            return (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group relative aspect-[4/5] rounded-[22px] overflow-hidden bg-cover bg-center border border-white/10 hover:-translate-y-1.5 transition-transform"
                style={{ backgroundImage: `url('${d.photo}')` }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)',
                  }}
                />
                <div className="absolute top-5 left-5 right-5 z-[2] flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-[10px] font-medium text-white">
                    {AIRPORT_CITY[d.airportCode] ?? d.airportCode}
                  </span>
                  <span className="text-[11px] tracking-[0.12em] uppercase text-white/70 font-medium">
                    {d.airportName}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 z-[2]">
                  <div className="font-display text-3xl md:text-4xl font-semibold leading-none text-white">
                    {d.name}
                  </div>
                  <div className="mt-3 text-sm text-white/80 leading-relaxed line-clamp-3">
                    {d.description}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-white">
                      <span className="text-[11px] font-sans text-white/60 mr-1">
                        {t.destination.from}
                      </span>
                      <span className="font-semibold">
                        {formatFromVnd(fromPrice)}
                      </span>
                    </span>
                    <span className="grid place-items-center w-9 h-9 rounded-full bg-white/15 border border-white/20 group-hover:bg-vg-accent group-hover:border-vg-accent transition-colors">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
