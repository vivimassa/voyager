'use client'

import Link from 'next/link'
import { DESTINATIONS } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { useDestLocale } from '@/hooks/use-dest-locale'

export function OtherDestinations({ currentSlug }: { currentSlug: string }) {
  const t = useT()
  const L = useDestLocale()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)
  const others = DESTINATIONS.filter((d) => d.slug !== currentSlug).slice(0, 4)

  return (
    <section className="bg-vg-surface-muted border-t border-vg-border px-6 md:px-10 py-14">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-vg-text">
            {t.common.otherDestinations}
          </h2>
          <Link href="/destinations" className="text-sm font-semibold text-vg-cta hover:underline">
            {t.common.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {others.map((d) => {
            const fromPrice = Math.min(...Object.values(d.services).map((s) => s.priceVnd))
            return (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-vg-border hover:shadow-[0_8px_24px_rgba(16,24,40,0.1)] transition-shadow"
              >
                <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url('${d.photo}')` }} />
                <div className="p-4">
                  <div className="font-sans font-bold text-lg text-vg-text">{L.name(d)}</div>
                  <div className="text-xs text-vg-text-subtle">{L.airportName(d)}</div>
                  <div className="mt-2 text-sm">
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
