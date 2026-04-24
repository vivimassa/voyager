/**
 * Voyager seed data — canonical content for initial DB bootstrap.
 *
 * KEEP IN SYNC with apps/web/src/data/destinations.ts. The client currently
 * reads from a hardcoded TS module for SSR; once the API has read endpoints
 * wired up, the client will fetch from /destinations and this file becomes
 * the single source of truth.
 *
 * Prices in VND. Pickup/fastTrack/hotel/tour are the 4 service types.
 */

export type SeedAirport = {
  iataCode: 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC'
  icaoCode: string
  name: string
  city: string
}

export const SEED_AIRPORTS: SeedAirport[] = [
  { iataCode: 'HAN', icaoCode: 'VVNB', name: 'Noi Bai International',       city: 'Hanoi' },
  { iataCode: 'SGN', icaoCode: 'VVTS', name: 'Tan Son Nhat International',  city: 'Ho Chi Minh City' },
  { iataCode: 'DAD', icaoCode: 'VVDN', name: 'Da Nang International',       city: 'Da Nang' },
  { iataCode: 'CXR', icaoCode: 'VVCR', name: 'Cam Ranh International',      city: 'Nha Trang' },
  { iataCode: 'PQC', icaoCode: 'VVPQ', name: 'Phu Quoc International',      city: 'Phu Quoc' },
]

export type SeedServiceType = 'pickup' | 'fastTrack' | 'hotel' | 'tour'

export type SeedService = {
  serviceType: SeedServiceType
  icon: string
  title: string
  priceVnd: number
}

export type SeedDestination = {
  slug: string
  name: string
  airportCode: 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC'
  airportName: string
  description: string
  headlinePriceVnd: number
  stars: 3 | 4 | 5
  photo: string
  services: SeedService[]
}

export const SEED_DESTINATIONS: SeedDestination[] = [
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
    services: [
      { serviceType: 'pickup',    icon: '\u{1F697}', title: 'HAN \u2192 Ha Long pickup', priceVnd: 950_000 },
      { serviceType: 'fastTrack', icon: '\u26A1',    title: 'Fast-track at HAN',         priceVnd: 380_000 },
      { serviceType: 'hotel',     icon: '\u{1F3E8}', title: 'Ha Long hotels',            priceVnd: 1_200_000 },
      { serviceType: 'tour',      icon: '\u{1F5FA}', title: 'Day tours',                 priceVnd: 1_850_000 },
    ],
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
    services: [
      { serviceType: 'pickup',    icon: '\u{1F697}', title: 'HAN \u2192 Sapa transfer',  priceVnd: 1_400_000 },
      { serviceType: 'fastTrack', icon: '\u26A1',    title: 'Fast-track at HAN',         priceVnd: 380_000 },
      { serviceType: 'hotel',     icon: '\u{1F3E8}', title: 'Sapa homestays',            priceVnd: 620_000 },
      { serviceType: 'tour',      icon: '\u{1F5FA}', title: 'Trekking tours',            priceVnd: 1_420_000 },
    ],
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
    services: [
      { serviceType: 'pickup',    icon: '\u{1F697}', title: 'DAD \u2192 Hoi An pickup',  priceVnd: 520_000 },
      { serviceType: 'fastTrack', icon: '\u26A1',    title: 'Fast-track at DAD',         priceVnd: 340_000 },
      { serviceType: 'hotel',     icon: '\u{1F3E8}', title: 'Old Town hotels',           priceVnd: 980_000 },
      { serviceType: 'tour',      icon: '\u{1F5FA}', title: 'Lantern & food tours',      priceVnd: 1_100_000 },
    ],
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
    services: [
      { serviceType: 'pickup',    icon: '\u{1F697}', title: 'SGN \u2192 Ben Tre pickup', priceVnd: 820_000 },
      { serviceType: 'fastTrack', icon: '\u26A1',    title: 'Fast-track at SGN',         priceVnd: 420_000 },
      { serviceType: 'hotel',     icon: '\u{1F3E8}', title: 'Riverside stays',           priceVnd: 780_000 },
      { serviceType: 'tour',      icon: '\u{1F5FA}', title: 'Delta day cruises',         priceVnd: 980_000 },
    ],
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
    services: [
      { serviceType: 'pickup',    icon: '\u{1F697}', title: 'PQC \u2192 beach resorts',  priceVnd: 450_000 },
      { serviceType: 'fastTrack', icon: '\u26A1',    title: 'Fast-track at PQC',         priceVnd: 280_000 },
      { serviceType: 'hotel',     icon: '\u{1F3E8}', title: 'Beachfront resorts',        priceVnd: 1_800_000 },
      { serviceType: 'tour',      icon: '\u{1F5FA}', title: 'Island-hop boat tours',     priceVnd: 1_400_000 },
    ],
  },
]

export const VOYAGER_OPERATOR_ID = 'voyager'
