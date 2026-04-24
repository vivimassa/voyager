'use client'

import { SERVICE_ORDER, type Destination, type ServiceKey } from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { useDestLocale } from '@/hooks/use-dest-locale'
import { AddToCartButton } from './add-to-cart-button'

const SERVICE_TYPE_MAP: Record<ServiceKey, 'pickup' | 'fastTrack' | 'hotel' | 'tour'> = {
  pickup: 'pickup',
  fastTrack: 'fastTrack',
  hotels: 'hotel',
  tours: 'tour',
}

export function DestinationServices({ dest }: { dest: Destination }) {
  const t = useT()
  const L = useDestLocale()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  return (
    <div className="bg-white rounded-xl border border-vg-border overflow-hidden">
      <div className="px-6 py-4 border-b border-vg-border flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-vg-text">{t.destination.whatsIncluded}</h2>
        <span className="text-xs text-vg-text-muted">{t.destination.bundleNote}</span>
      </div>

      <div className="divide-y divide-vg-border">
        {SERVICE_ORDER.map((key) => {
          const s = dest.services[key]
          const serviceType = SERVICE_TYPE_MAP[key]
          const label = L.serviceLabel(dest, key)
          const cartItem = {
            id: `${dest.slug}:${serviceType}`,
            productId: `${dest.slug}:${serviceType}`,
            destinationSlug: dest.slug,
            airportCode: dest.airportCode,
            serviceType,
            title: `${label} — ${L.name(dest)}`,
            image: dest.photo,
            unitPriceVnd: s.priceVnd,
          }
          return (
            <div key={key} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 p-5">
              <div className="flex gap-4">
                <div className="grid place-items-center w-12 h-12 rounded-lg bg-vg-surface-muted text-2xl flex-shrink-0">
                  {s.icon}
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-vg-text">{label}</div>
                  <p className="text-sm text-vg-text-muted mt-1 leading-relaxed">{serviceBlurb(key, t)}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="text-[11px] font-semibold text-vg-accent bg-vg-accent/10 px-1.5 py-0.5 rounded">
                      {t.filters.freeCancel}
                    </span>
                    <span className="text-[11px] font-semibold text-vg-accent bg-vg-accent/10 px-1.5 py-0.5 rounded">
                      {t.filters.noPrepayment}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
                <div className="text-right">
                  <div className="text-[11px] text-vg-text-muted">{t.service.from}</div>
                  <div className="font-display text-xl font-bold text-vg-text">{formatFromVnd(s.priceVnd)}</div>
                </div>
                <AddToCartButton item={cartItem} label={t.common.addToCart} addedLabel={t.common.added} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function serviceBlurb(key: ServiceKey, t: { destination: { pickupBlurb: string; fastTrackBlurb: string; hotelsBlurb: string; toursBlurb: string } }): string {
  switch (key) {
    case 'pickup': return t.destination.pickupBlurb
    case 'fastTrack': return t.destination.fastTrackBlurb
    case 'hotels': return t.destination.hotelsBlurb
    case 'tours': return t.destination.toursBlurb
  }
}
