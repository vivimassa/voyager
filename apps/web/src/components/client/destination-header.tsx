'use client'

/**
 * DestinationHeader — the top 70vh photo hero for a destination page.
 * Airport tag, serif display title, description, and the lowest "from" price.
 * Reads currency from the store so VND/USD toggle updates live.
 */
import Link from 'next/link'
import type { Destination } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'

export function DestinationHeader({ dest }: { dest: Destination }) {
  const t = useT()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency) // subscribe for re-render

  const fromPrice = Math.min(
    ...Object.values(dest.services).map((s) => s.priceVnd),
  )

  return (
    <section className="relative w-full h-[70vh] min-h-[520px] overflow-hidden bg-vg-bg">
      <div
        className="absolute inset-0 bg-cover bg-center animate-kenburns"
        style={{ backgroundImage: `url('${dest.photo}')` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 75%), linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <div className="relative z-[5] h-full flex flex-col justify-end px-6 md:px-12 pb-16 max-w-[900px]">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-xs tracking-wide text-white/60 flex items-center gap-2"
        >
          <Link href="/" className="hover:text-white">
            {t.destination.home}
          </Link>
          <span className="opacity-50">/</span>
          <Link href="/destinations" className="hover:text-white">
            {t.nav.destinations}
          </Link>
          <span className="opacity-50">/</span>
          <span className="text-white/85">{dest.name}</span>
        </nav>

        {/* Airport tag */}
        <div className="inline-flex items-center gap-2 pl-2 pr-3 py-1.5 mb-5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/95 w-fit">
          <span className="px-2 py-0.5 rounded-full bg-vg-accent font-display text-[11px] tracking-[0.1em] text-white">
            {dest.airportCode}
          </span>
          <span>{dest.airportName}</span>
        </div>

        <h1
          className="font-display font-bold uppercase leading-[0.9] tracking-[-0.03em] text-white"
          style={{
            fontSize: 'clamp(52px, 8vw, 112px)',
            textShadow: '0 4px 28px rgba(0,0,0,0.4)',
          }}
        >
          {dest.name}
        </h1>

        <p className="mt-5 text-[15px] md:text-base leading-[1.65] text-white/90 max-w-[640px]">
          {dest.description}
        </p>

        <div className="mt-6 flex items-center gap-4 text-sm text-white/80">
          <span className="text-yellow-400 tracking-[0.2em]">
            {'★'.repeat(dest.stars)}
            <span className="text-white/30">{'☆'.repeat(5 - dest.stars)}</span>
          </span>
          <span className="opacity-50">·</span>
          <span>
            <span className="text-white/60 mr-1">{t.destination.startingFrom}</span>
            <span className="font-display text-white font-semibold">
              {formatFromVnd(fromPrice)}
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
