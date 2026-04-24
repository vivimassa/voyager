/**
 * Voyager destinations — v0 seed data (client-side).
 * Prices in VND (no string formatting — formatFromVnd handles that).
 * This will eventually be replaced by a server fetch; right now we hand-author
 * because we need something for the hero before the CMS exists.
 */

export type ServiceKey = 'pickup' | 'fastTrack' | 'hotels' | 'tours'

export type DestinationService = {
  icon: string
  label: string
  priceVnd: number
}

export type Destination = {
  slug: string
  name: string            // display-cased for hero headline (uppercase applied via CSS)
  airportCode: 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC'
  airportName: string
  description: string
  headlinePriceVnd: number  // cheapest bookable tour — the "from" price on the card
  stars: 3 | 4 | 5
  photo: string             // unsplash hero image
  services: Record<ServiceKey, DestinationService>
}

export const DESTINATIONS: Destination[] = [
  {
    slug: 'ha-long',
    name: 'Ha Long',
    airportCode: 'HAN',
    airportName: 'Noi Bai, Hanoi',
    description:
      "Ha Long Bay's 1,600 limestone islands rise from emerald waters like a scene from another world. Cruise through floating villages, kayak into hidden caves, wake up to mist-draped karsts.",
    headlinePriceVnd: 1_850_000,
    stars: 5,
    photo:
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=80',
    services: {
      pickup:    { icon: '\u{1F697}', label: 'HAN \u2192 Ha Long pickup', priceVnd: 950_000 },
      fastTrack: { icon: '\u26A1',    label: 'Fast-track at HAN',         priceVnd: 380_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Ha Long hotels',            priceVnd: 1_200_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Day tours',                 priceVnd: 1_850_000 },
    },
  },
  {
    slug: 'sapa',
    name: 'Sapa',
    airportCode: 'HAN',
    airportName: 'Noi Bai, Hanoi',
    description:
      'Emerald rice terraces spiral down the slopes of Fansipan, threaded with villages where the Hmong and Dao have lived for centuries. Trek through ancestor paths, stay with a homestay family.',
    headlinePriceVnd: 1_420_000,
    stars: 4,
    photo:
      'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=2400&q=80',
    services: {
      pickup:    { icon: '\u{1F697}', label: 'HAN \u2192 Sapa transfer',   priceVnd: 1_400_000 },
      fastTrack: { icon: '\u26A1',    label: 'Fast-track at HAN',          priceVnd: 380_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Sapa homestays',             priceVnd: 620_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Trekking tours',             priceVnd: 1_420_000 },
    },
  },
  {
    slug: 'hoi-an',
    name: 'Hoi An',
    airportCode: 'DAD',
    airportName: 'Da Nang Intl.',
    description:
      'A UNESCO old town where yellow-washed merchant houses meet lantern-lit streets and the scent of lemongrass drifts from every doorway. Sail at dusk, tailor a silk ao dai by morning.',
    headlinePriceVnd: 1_100_000,
    stars: 5,
    photo:
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2400&q=80',
    services: {
      pickup:    { icon: '\u{1F697}', label: 'DAD \u2192 Hoi An pickup',   priceVnd: 520_000 },
      fastTrack: { icon: '\u26A1',    label: 'Fast-track at DAD',          priceVnd: 340_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Old Town hotels',            priceVnd: 980_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Lantern & food tours',       priceVnd: 1_100_000 },
    },
  },
  {
    slug: 'mekong',
    name: 'Mekong',
    airportCode: 'SGN',
    airportName: 'Tan Son Nhat, HCMC',
    description:
      'Glide past floating markets and fruit orchards where the nine dragons of the Mekong reach the sea. Wake before dawn for the boats at Cai Rang, share tea with a coconut farmer.',
    headlinePriceVnd: 980_000,
    stars: 4,
    photo:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2400&q=80',
    services: {
      pickup:    { icon: '\u{1F697}', label: 'SGN \u2192 Ben Tre pickup',  priceVnd: 820_000 },
      fastTrack: { icon: '\u26A1',    label: 'Fast-track at SGN',          priceVnd: 420_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Riverside stays',            priceVnd: 780_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Delta day cruises',          priceVnd: 980_000 },
    },
  },
  {
    slug: 'phu-quoc',
    name: 'Phu Quoc',
    airportCode: 'PQC',
    airportName: 'Phu Quoc Intl.',
    description:
      "Vietnam's southernmost island, ringed by white-sand beaches and pepper plantations. Snorkel over technicolor coral at An Thoi, watch the sunset from a longtail boat.",
    headlinePriceVnd: 2_200_000,
    stars: 5,
    photo:
      'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=2400&q=80',
    services: {
      pickup:    { icon: '\u{1F697}', label: 'PQC \u2192 beach resorts',   priceVnd: 450_000 },
      fastTrack: { icon: '\u26A1',    label: 'Fast-track at PQC',          priceVnd: 280_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Beachfront resorts',         priceVnd: 1_800_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Island-hop boat tours',      priceVnd: 1_400_000 },
    },
  },
]

export const DESTINATION_SLUGS = DESTINATIONS.map((d) => d.slug)

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug)
}

export const SERVICE_ORDER: ServiceKey[] = ['pickup', 'fastTrack', 'hotels', 'tours']
