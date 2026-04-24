/**
 * Lifestyle bundles — persona-shaped collections of services.
 * Bundles are a display layer over the per-destination service catalogue:
 * when the user picks a destination + bundle, we fan out `serviceKeys` into
 * individual cart items using that destination's prices.
 */
import type { ServiceKey } from '@/data/destinations'
import type { ServiceType } from '@/stores/cart-store'
import type { Dictionary } from '@/i18n/dictionary'

export type BundleId = 'business' | 'family' | 'first'

type BundleCopyKey = keyof Dictionary['bundles']

export type Bundle = {
  id: BundleId
  /** i18n keys on `bundles.*` for name + tagline */
  nameKey: BundleCopyKey
  taglineKey: BundleCopyKey
  /** Service keys that fan out into real cart items (priced per destination) */
  serviceKeys: ServiceKey[]
  /** i18n keys on `bundles.*` for display-only inclusion bullets (lounge, porter, etc.) */
  inclusionKeys: BundleCopyKey[]
  /** Hero photo shown on the bundle card */
  heroPhoto: string
  /** Tailwind accent colour tokens for the card */
  accent: {
    ring: string
    chip: string
    badge: string
  }
}

export const BUNDLES: Bundle[] = [
  {
    id: 'business',
    nameKey: 'businessName',
    taglineKey: 'businessTagline',
    serviceKeys: ['pickup', 'fastTrack', 'hotels'],
    inclusionKeys: ['svcPickup', 'svcFastTrack', 'svcLounge', 'svcHotel'],
    heroPhoto:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    accent: {
      ring: 'ring-slate-900/10',
      chip: 'bg-slate-900 text-white',
      badge: 'bg-slate-900/5 text-slate-900',
    },
  },
  {
    id: 'family',
    nameKey: 'familyName',
    taglineKey: 'familyTagline',
    serviceKeys: ['pickup', 'luggageConcierge', 'hotels', 'tours'],
    inclusionKeys: ['svcVan', 'svcLuggage', 'svcChildSeat', 'svcPorter', 'svcItinerary'],
    heroPhoto:
      'https://images.unsplash.com/photo-1551838291-dd9a8ba43a0b?auto=format&fit=crop&w=1600&q=80',
    accent: {
      ring: 'ring-emerald-700/15',
      chip: 'bg-emerald-700 text-white',
      badge: 'bg-emerald-700/8 text-emerald-800',
    },
  },
  {
    id: 'first',
    nameKey: 'firstName',
    taglineKey: 'firstTagline',
    serviceKeys: ['pickup', 'fastTrack', 'luggageConcierge', 'hotels'],
    inclusionKeys: ['svcSedan', 'svcFastTrack', 'svcLounge', 'svcLuggage', 'svcWhiteGlove'],
    heroPhoto:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
    accent: {
      ring: 'ring-amber-600/20',
      chip: 'bg-amber-600 text-white',
      badge: 'bg-amber-500/10 text-amber-800',
    },
  },
]

/** Cart ServiceType mapping for each destination ServiceKey. */
export const SERVICE_KEY_TO_CART_TYPE: Record<ServiceKey, ServiceType> = {
  pickup: 'pickup',
  fastTrack: 'fastTrack',
  hotels: 'hotel',
  tours: 'tour',
  luggageConcierge: 'luggageConcierge',
}
