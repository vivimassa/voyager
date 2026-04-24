'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { TopNav } from '@/components/client/top-nav'
import { DESTINATIONS, type ServiceKey } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'

type ServiceMeta = {
  key: ServiceKey
  icon: React.ReactNode
  bg: string
  airports: string
}

const SERVICES: ServiceMeta[] = [
  {
    key: 'pickup',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5" /><path d="M14 17H9" /><circle cx="6.5" cy="17.5" r="2.5" /><circle cx="16.5" cy="17.5" r="2.5" /><path d="M23 17h-4.5" />
      </svg>
    ),
    bg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1800&q=80',
    airports: 'Hanoi · Ho Chi Minh City · Da Nang · Nha Trang · Phu Quoc',
  },
  {
    key: 'fastTrack',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    bg: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80',
    airports: 'Hanoi · Ho Chi Minh City · Da Nang',
  },
  {
    key: 'hotels',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 22V8l9-6 9 6v14" /><path d="M9 22V12h6v10" />
      </svg>
    ),
    bg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80',
    airports: 'Hanoi · Ho Chi Minh City · Da Nang · Nha Trang · Phu Quoc',
  },
  {
    key: 'tours',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    bg: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80',
    airports: 'Hanoi · Ho Chi Minh City · Da Nang · Nha Trang · Phu Quoc',
  },
]

type SubKey = 'pickupSub' | 'fastTrackSub' | 'hotelsSub' | 'toursSub'
type BulletsKey = 'pickupBullets' | 'fastTrackBullets' | 'hotelsBullets' | 'toursBullets'

const SUB_KEY: Record<ServiceKey, SubKey> = {
  pickup: 'pickupSub', fastTrack: 'fastTrackSub', hotels: 'hotelsSub', tours: 'toursSub',
}
const BULLETS_KEY: Record<ServiceKey, BulletsKey> = {
  pickup: 'pickupBullets', fastTrack: 'fastTrackBullets', hotels: 'hotelsBullets', tours: 'toursBullets',
}

export default function ServicesPage() {
  const t = useT()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  const minByService = useMemo(() => {
    const out = {} as Record<ServiceKey, number>
    for (const svc of SERVICES) {
      const prices = DESTINATIONS.map((d) => d.services[svc.key].priceVnd)
      out[svc.key] = Math.min(...prices)
    }
    return out
  }, [])

  const labelByKey: Record<ServiceKey, string> = {
    pickup: t.service.pickup,
    fastTrack: t.service.fastTrack,
    hotels: t.service.hotel,
    tours: t.service.tour,
  }

  return (
    <div className="bg-vg-bg text-white min-h-screen">
      <div className="relative">
        <TopNav />
        <div className="px-6 md:px-12 pt-32 pb-16 max-w-[1400px] mx-auto">
          <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-3">
            {t.nav.services}
          </div>
          <h1
            className="font-display font-semibold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            {t.services.heading}
          </h1>
          <p className="mt-5 text-white/70 max-w-[560px] text-[15px] leading-relaxed">
            {t.services.sub}
          </p>
        </div>
      </div>

      <section className="px-6 md:px-12 pb-28">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.key}
              id={svc.key}
              className="group relative rounded-[22px] overflow-hidden border border-white/10 grid md:grid-cols-[1fr_420px]"
            >
              {/* Photo */}
              <div
                className="relative h-56 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url('${svc.bg}')` }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, rgba(0,0,0,0) 60%, rgba(13,15,18,1) 100%)' }}
                />
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className="grid place-items-center w-12 h-12 rounded-[14px] bg-black/55 backdrop-blur-md border border-white/20 text-white">
                    {svc.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-[10px] tracking-[0.1em] text-white font-medium">{svc.airports}</span>
                </div>
              </div>

              {/* Content */}
              <div className="bg-vg-surface md:bg-transparent p-8 flex flex-col justify-center gap-5">
                <div>
                  <div className="font-display text-3xl font-semibold text-white leading-tight">
                    {labelByKey[svc.key]}
                  </div>
                  <p className="mt-2 text-[14px] text-white/65 leading-relaxed">
                    {t.services[SUB_KEY[svc.key]]}
                  </p>
                </div>

                <ul className="flex flex-col gap-2">
                  {(t.services[BULLETS_KEY[svc.key]] as string[]).map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-white/80">
                      <span className="text-vg-accent text-base leading-none">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-[11px] text-white/50 font-sans">{t.service.from} </span>
                    <span className="font-display text-xl font-semibold text-white">
                      {formatFromVnd(minByService[svc.key])}
                    </span>
                  </div>
                  <Link
                    href="/destinations"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-vg-cta hover:bg-vg-cta-hover text-white text-sm font-semibold transition-colors"
                  >
                    {t.common.bookNow}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
