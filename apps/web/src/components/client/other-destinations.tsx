'use client'

import Link from 'next/link'
import { DESTINATIONS } from '@/data/destinations'
import { useT } from '@/i18n/use-t'

const AIRPORT_CITY: Record<string, string> = {
  HAN: 'Hanoi',
  SGN: 'Saigon',
  DAD: 'Da Nang',
  CXR: 'Nha Trang',
  PQC: 'Phu Quoc',
}

export function OtherDestinations({ currentSlug }: { currentSlug: string }) {
  const t = useT()
  const others = DESTINATIONS.filter((d) => d.slug !== currentSlug).slice(0, 4)

  return (
    <section className="bg-vg-bg px-6 md:px-12 pt-20 pb-28 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-3">
              {t.common.keepExploring}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">
              {t.common.otherDestinations}
            </h2>
          </div>
          <Link
            href="/destinations"
            className="text-sm text-white/70 hover:text-white underline underline-offset-4"
          >
            {t.common.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-cover bg-center border border-white/10 hover:-translate-y-1 transition-transform"
              style={{ backgroundImage: `url('${d.photo}')` }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)',
                }}
              />
              <div className="absolute top-4 left-4 right-4 z-[2]">
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-[10px] font-medium tracking-wide text-white">
                  {AIRPORT_CITY[d.airportCode] ?? d.airportCode}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-[2]">
                <div className="font-display text-xl font-semibold text-white">
                  {d.name}
                </div>
                <div className="text-[11px] text-white/60 mt-0.5">
                  {d.airportName}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
