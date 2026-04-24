'use client'

/**
 * ServicesBand — below-fold 4-tile grid showcasing the service categories.
 * Each tile links to the services hub (eventually filtered by type).
 * "From" prices derived from the cheapest priceVnd of that service across
 * all destinations — so the numbers stay honest if destinations change.
 */
import React from 'react'
import Link from 'next/link'
import { useMemo } from 'react'
import { DESTINATIONS, type ServiceKey } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'

type Tile = {
  key: ServiceKey
  icon: React.ReactNode
  bg: string
  airportTag: string
  label: string
  sub: string
}

type TileSub = 'pickupSub' | 'fastTrackSub' | 'hotelsSub' | 'toursSub'

const TILES: (Tile & { subKey: TileSub })[] = [
  {
    key: 'pickup',
    subKey: 'pickupSub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5" /><path d="M14 17H9" /><circle cx="6.5" cy="17.5" r="2.5" /><circle cx="16.5" cy="17.5" r="2.5" /><path d="M23 17h-4.5" />
      </svg>
    ),
    bg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
    airportTag: 'Hanoi · Saigon · Da Nang · Nha Trang · Phu Quoc',
    label: 'Airport pickup',
    sub: '',
  },
  {
    key: 'fastTrack',
    subKey: 'fastTrackSub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    bg: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    airportTag: 'Hanoi · Saigon · Da Nang',
    label: 'Fast-track & VIP',
    sub: '',
  },
  {
    key: 'hotels',
    subKey: 'hotelsSub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 22V8l9-6 9 6v14" /><path d="M9 22V12h6v10" />
      </svg>
    ),
    bg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    airportTag: 'All five destinations',
    label: 'Hotels',
    sub: '',
  },
  {
    key: 'tours',
    subKey: 'toursSub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    bg: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    airportTag: '340+ experiences',
    label: 'Tours & experiences',
    sub: '',
  },
]

export function ServicesBand() {
  const t = useT()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency) // subscribe for re-render on toggle

  // minimum priceVnd per service type across destinations
  const minByService = useMemo(() => {
    const out = {} as Record<ServiceKey, number>
    for (const tile of TILES) {
      const prices = DESTINATIONS.map((d) => d.services[tile.key].priceVnd)
      out[tile.key] = Math.min(...prices)
    }
    return out
  }, [])

  return (
    <section id="services" className="bg-vg-bg px-6 md:px-12 pt-24 pb-32 relative">
      <div className="max-w-[1400px] mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div>
          <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-3.5">
            {t.servicesBand.eyebrow}
          </div>
          <h2
            className="font-display font-semibold leading-none tracking-[-0.02em] max-w-[720px] text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {t.servicesBand.heading}
          </h2>
        </div>
        <p className="text-[15px] text-white/70 max-w-[380px] leading-[1.6]">
          {t.servicesBand.sub}
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TILES.map((tile) => (
          <Link
            key={tile.key}
            href={`/services#${tile.key}`}
            className="group relative aspect-[3/4] rounded-[22px] overflow-hidden bg-cover bg-center border border-white/10 hover:-translate-y-1.5 transition-transform cursor-pointer"
            style={{ backgroundImage: `url('${tile.bg}')` }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 100%)',
              }}
            />
            <div className="absolute top-5 left-5 right-5 z-[2] flex justify-between items-center">
              <div className="grid place-items-center w-11 h-11 rounded-[14px] bg-black/50 backdrop-blur-md border border-white/20 text-white">
                {tile.icon}
              </div>
              <div className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-[10px] tracking-[0.12em] text-white font-medium">
                {tile.airportTag}
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-[2]">
              <div className="font-display text-[26px] font-semibold leading-[1.1] mb-1.5 text-white">
                {tile.label}
              </div>
              <div className="text-xs text-white/75 mb-3 leading-[1.5]">{t.servicesBand[tile.subKey]}</div>
              <div className="flex items-center justify-between">
                <div className="font-display text-lg font-semibold text-white">
                  <span className="font-sans text-[11px] text-white/70 font-normal mr-1">
                    {t.service.from}
                  </span>
                  {formatFromVnd(minByService[tile.key])}
                </div>
                <div className="grid place-items-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-sm group-hover:bg-vg-accent group-hover:border-vg-accent transition-colors">
                  →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
