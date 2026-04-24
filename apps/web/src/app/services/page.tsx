'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { DESTINATIONS, type ServiceKey } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { airportCity, AIRPORT_CODES } from '@/lib/airport-cities'
import { useLocaleStore } from '@/stores/locale-store'

type ServiceMeta = { key: ServiceKey; icon: React.ReactNode; bg: string; airports: ReadonlyArray<'HAN'|'SGN'|'DAD'|'CXR'|'PQC'> }

const SERVICES: ServiceMeta[] = [
  { key: 'pickup', icon: <CarIcon />, bg: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1800&q=80', airports: AIRPORT_CODES },
  { key: 'fastTrack', icon: <BoltIcon />, bg: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=80', airports: ['HAN', 'SGN', 'DAD'] },
  { key: 'hotels', icon: <HotelIcon />, bg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80', airports: AIRPORT_CODES },
  { key: 'tours', icon: <CompassIcon />, bg: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80', airports: AIRPORT_CODES },
]

type SubKey = 'pickupSub' | 'fastTrackSub' | 'hotelsSub' | 'toursSub'
type BulletsKey = 'pickupBullets' | 'fastTrackBullets' | 'hotelsBullets' | 'toursBullets'
const SUB_KEY: Record<ServiceKey, SubKey> = { pickup: 'pickupSub', fastTrack: 'fastTrackSub', hotels: 'hotelsSub', tours: 'toursSub', luggageConcierge: 'pickupSub' }
const BULLETS_KEY: Record<ServiceKey, BulletsKey> = { pickup: 'pickupBullets', fastTrack: 'fastTrackBullets', hotels: 'hotelsBullets', tours: 'toursBullets', luggageConcierge: 'pickupBullets' }

export default function ServicesPage() {
  const t = useT()
  const locale = useLocaleStore((s) => s.locale)
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  const minByService = useMemo(() => {
    const out = {} as Record<ServiceKey, number>
    for (const svc of SERVICES) out[svc.key] = Math.min(...DESTINATIONS.map((d) => d.services[svc.key].priceVnd))
    return out
  }, [])

  const labelByKey: Record<ServiceKey, string> = {
    pickup: t.service.pickup, fastTrack: t.service.fastTrack, hotels: t.service.hotel, tours: t.service.tour, luggageConcierge: t.service.pickup,
  }

  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <TopNav />
      <div className="bg-vg-surface-muted border-b border-vg-border px-6 md:px-10 py-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="text-xs text-vg-text-muted mb-2">
            <Link href="/" className="hover:underline">{t.destination.home}</Link>
            <span className="mx-1.5">›</span>
            <span className="text-vg-text">{t.nav.services}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight">{t.services.heading}</h1>
          <p className="mt-2 text-vg-text-muted max-w-[640px] text-[15px]">{t.services.sub}</p>
        </div>
      </div>

      <main className="flex-1 px-6 md:px-10 py-8 max-w-[1200px] w-full mx-auto flex flex-col gap-5">
        {SERVICES.map((svc) => (
          <section key={svc.key} id={svc.key} className="bg-white rounded-xl border border-vg-border overflow-hidden grid md:grid-cols-[380px_1fr]">
            <div className="relative h-56 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url('${svc.bg}')` }}>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="grid place-items-center w-10 h-10 rounded-lg bg-white/95 text-vg-cta shadow">{svc.icon}</div>
                <span className="px-2 py-1 rounded-md bg-white/95 text-[10px] font-bold text-vg-text">{svc.airports.map((a) => airportCity(a, locale)).join(' · ')}</span>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <div className="font-display text-2xl font-bold text-vg-text">{labelByKey[svc.key]}</div>
                <p className="mt-1 text-sm text-vg-text-muted leading-relaxed">{t.services[SUB_KEY[svc.key]]}</p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4">
                {(t.services[BULLETS_KEY[svc.key]] as string[]).map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-vg-text">
                    <span className="text-vg-accent">✓</span>{b}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-3 border-t border-vg-border">
                <div>
                  <span className="text-xs text-vg-text-muted">{t.service.from} </span>
                  <span className="font-display text-xl font-bold text-vg-text">{formatFromVnd(minByService[svc.key])}</span>
                </div>
                <Link href="/destinations" className="inline-flex items-center h-10 px-5 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm">
                  {t.common.bookNow}
                </Link>
              </div>
            </div>
          </section>
        ))}
      </main>

      <SiteFooter />
    </div>
  )
}

function CarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5"/><path d="M14 17H9"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/><path d="M23 17h-4.5"/></svg>
}
function BoltIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> }
function HotelIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V8l9-6 9 6v14"/><path d="M9 22V12h6v10"/></svg> }
function CompassIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg> }
