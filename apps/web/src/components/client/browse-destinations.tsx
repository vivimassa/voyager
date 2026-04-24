'use client'

import Link from 'next/link'
import { DESTINATIONS } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { useDestLocale } from '@/hooks/use-dest-locale'

export function BrowseDestinations() {
  const t = useT()
  const L = useDestLocale()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  return (
    <section className="bg-vg-bg py-16 md:py-20">
      <div className="px-6 md:px-10 max-w-[1280px] mx-auto">
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight">
            {t.home.browseHeading}
          </h2>
          <p className="mt-2 text-vg-text-muted">{t.home.browseSub}</p>
        </div>
        <Link href="/destinations" className="text-sm font-semibold text-vg-cta hover:underline">
          {t.common.viewAll}
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {DESTINATIONS.map((d) => {
          const fromPrice = Math.min(...Object.values(d.services).map((s) => s.priceVnd))
          return (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="group rounded-xl overflow-hidden bg-white border border-vg-border hover:shadow-[0_8px_24px_rgba(16,24,40,0.1)] transition-shadow"
            >
              <div
                className="aspect-[4/3] bg-cover bg-center"
                style={{ backgroundImage: `url('${d.photo}')` }}
              />
              <div className="p-4">
                <div className="font-sans font-bold text-lg text-vg-text leading-tight">{L.name(d)}</div>
                <div className="text-xs text-vg-text-subtle mt-0.5">{L.airportName(d)}</div>
                <div className="mt-3 text-sm">
                  <span className="text-vg-text-muted">{t.destination.from} </span>
                  <span className="font-bold text-vg-text">{formatFromVnd(fromPrice)}</span>
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
