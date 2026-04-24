'use client'

/**
 * DestinationServices — "What's included" grid of the 4 service types for a
 * given destination. Each card has an Add-to-cart button that pushes a
 * CartItem into the client-side cart store.
 */
import {
  SERVICE_ORDER,
  type Destination,
  type ServiceKey,
} from '@/data/destinations'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { AddToCartButton } from './add-to-cart-button'

// Maps our domain ServiceKey to the CartItem.serviceType union.
const SERVICE_TYPE_MAP: Record<ServiceKey, 'pickup' | 'fastTrack' | 'hotel' | 'tour'> = {
  pickup: 'pickup',
  fastTrack: 'fastTrack',
  hotels: 'hotel',
  tours: 'tour',
}

export function DestinationServices({ dest }: { dest: Destination }) {
  const t = useT()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  return (
    <section className="bg-vg-bg px-6 md:px-12 pt-20 pb-28">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10 flex items-end justify-between gap-8 flex-wrap">
          <div>
            <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-3">
              {t.destination.availableServices}
            </div>
            <h2
              className="font-display font-semibold leading-none tracking-[-0.02em] text-white"
              style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}
            >
              {t.destination.whatsIncluded}
            </h2>
          </div>
          <p className="text-sm text-white/65 max-w-[320px] leading-relaxed">
            {t.destination.bundleNote}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICE_ORDER.map((key) => {
            const s = dest.services[key]
            // CartItem.productId must match the server's Product._id, which is
            // `${slug}:${serviceType}` using the normalized enum values
            // (hotel/tour — NOT the web-side plural keys hotels/tours).
            // Derive it through SERVICE_TYPE_MAP so the booking handler's
            // product lookup can find the doc.
            const serviceType = SERVICE_TYPE_MAP[key]
            const cartItem = {
              id: `${dest.slug}:${serviceType}`,
              productId: `${dest.slug}:${serviceType}`,
              destinationSlug: dest.slug,
              airportCode: dest.airportCode,
              serviceType,
              title: `${s.label} — ${dest.name}`,
              image: dest.photo,
              unitPriceVnd: s.priceVnd,
            }
            return (
              <div
                key={key}
                className="relative rounded-2xl bg-vg-surface border border-vg-border p-6 flex flex-col gap-4 hover:border-vg-border-strong transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid place-items-center w-12 h-12 rounded-xl bg-white/10 border border-white/15 text-xl">
                    {s.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/50 uppercase tracking-[0.18em]">
                      {t.service.from}
                    </div>
                    <div className="font-display text-2xl font-semibold text-white leading-none mt-1">
                      {formatFromVnd(s.priceVnd)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-display text-xl text-white font-semibold">
                    {s.label}
                  </div>
                  <div className="text-sm text-white/60 mt-1">
                    {serviceBlurb(key, t)}
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <AddToCartButton item={cartItem} label={t.common.addToCart} addedLabel={t.common.added} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function serviceBlurb(key: ServiceKey, t: { destination: { pickupBlurb: string; fastTrackBlurb: string; hotelsBlurb: string; toursBlurb: string } }): string {
  switch (key) {
    case 'pickup':   return t.destination.pickupBlurb
    case 'fastTrack': return t.destination.fastTrackBlurb
    case 'hotels':   return t.destination.hotelsBlurb
    case 'tours':    return t.destination.toursBlurb
  }
}
