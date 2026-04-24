'use client'

import Link from 'next/link'
import type { Destination } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { useDestLocale } from '@/hooks/use-dest-locale'

export function DestinationHeader({ dest }: { dest: Destination }) {
  const t = useT()
  const L = useDestLocale()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  const fromPrice = Math.min(...Object.values(dest.services).map((s) => s.priceVnd))

  return (
    <section className="bg-vg-bg border-b border-vg-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-6">
        <nav className="text-xs text-vg-text-muted mb-3">
          <Link href="/" className="hover:underline">{t.destination.home}</Link>
          <span className="mx-1.5">›</span>
          <Link href="/destinations" className="hover:underline">{t.nav.destinations}</Link>
          <span className="mx-1.5">›</span>
          <span className="text-vg-text">{L.name(dest)}</span>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-yellow-500 text-base leading-none">
                {'★'.repeat(dest.stars)}<span className="text-vg-border-strong">{'☆'.repeat(5 - dest.stars)}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-vg-accent bg-vg-accent/10 px-1.5 py-0.5 rounded">
                ✓ {t.filters.verified}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight leading-tight">
              {L.name(dest)}
            </h1>
            <div className="mt-1.5 text-sm text-vg-text-muted">
              <span className="underline">{L.airportName(dest)}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-vg-text-muted">{t.filters.fromPrice}</div>
            <div className="font-display text-2xl font-bold text-vg-text">{formatFromVnd(fromPrice)}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 grid-rows-2 gap-2 h-[280px] md:h-[420px]">
          <div
            className="col-span-4 md:col-span-2 row-span-2 rounded-xl bg-cover bg-center cursor-pointer hover:brightness-95 transition"
            style={{ backgroundImage: `url('${dest.photo}')` }}
          />
          {[0, 1, 2, 3].map((i) => {
            const src = dest.photos?.[i] ?? dest.photo
            return (
              <div
                key={i}
                className="col-span-2 md:col-span-1 row-span-1 rounded-xl bg-cover bg-center cursor-pointer hover:brightness-95 transition"
                style={{ backgroundImage: `url('${src}')` }}
              />
            )
          })}
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-vg-text max-w-[800px]">
          {L.description(dest)}
        </p>
      </div>
    </section>
  )
}
