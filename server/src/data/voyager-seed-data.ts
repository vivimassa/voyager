/**
 * Voyager seed data — canonical content for initial DB bootstrap.
 *
 * KEEP IN SYNC with apps/web/src/data/destinations.ts.
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
    slug: 'ha-long', name: 'Ha Long', airportCode: 'HAN', airportName: 'Noi Bai, Hanoi',
    description: "Ha Long Bay's 1,600 limestone islands rise from emerald waters. Cruise floating villages, kayak into hidden caves.",
    headlinePriceVnd: 1_850_000, stars: 5,
    photo: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=80',
    services: [
      { serviceType: 'pickup',    icon: '🚗', title: 'HAN → Ha Long pickup',   priceVnd: 950_000 },
      { serviceType: 'fastTrack', icon: '⚡', title: 'Fast-track at HAN',      priceVnd: 380_000 },
      { serviceType: 'hotel',     icon: '🏨', title: 'Ha Long hotels',         priceVnd: 1_200_000 },
      { serviceType: 'tour',      icon: '🗺', title: 'Day tours',              priceVnd: 1_850_000 },
    ],
  },
  {
    slug: 'sapa', name: 'Sapa', airportCode: 'HAN', airportName: 'Noi Bai, Hanoi',
    description: 'Rice terraces spiral down Fansipan, threaded with Hmong and Dao villages. Trek ancestor paths, stay with a homestay.',
    headlinePriceVnd: 1_420_000, stars: 4,
    photo: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=2400&q=80',
    services: [
      { serviceType: 'pickup',    icon: '🚗', title: 'HAN → Sapa transfer',    priceVnd: 1_400_000 },
      { serviceType: 'fastTrack', icon: '⚡', title: 'Fast-track at HAN',      priceVnd: 380_000 },
      { serviceType: 'hotel',     icon: '🏨', title: 'Sapa homestays',         priceVnd: 620_000 },
      { serviceType: 'tour',      icon: '🗺', title: 'Trekking tours',         priceVnd: 1_420_000 },
    ],
  },
  {
    slug: 'ninh-binh', name: 'Ninh Binh', airportCode: 'HAN', airportName: 'Noi Bai, Hanoi',
    description: 'Inland karst rice-paddies, river caves at Trang An, and the ancient capital of Hoa Lu — "Ha Long on land."',
    headlinePriceVnd: 890_000, stars: 4,
    photo: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2400&q=80',
    services: [
      { serviceType: 'pickup',    icon: '🚗', title: 'HAN → Ninh Binh pickup', priceVnd: 780_000 },
      { serviceType: 'fastTrack', icon: '⚡', title: 'Fast-track at HAN',      priceVnd: 380_000 },
      { serviceType: 'hotel',     icon: '🏨', title: 'Tam Coc stays',          priceVnd: 720_000 },
      { serviceType: 'tour',      icon: '🗺', title: 'Sampan & temple tours',  priceVnd: 890_000 },
    ],
  },
  {
    slug: 'hue', name: 'Hue', airportCode: 'DAD', airportName: 'Da Nang Intl.',
    description: 'Imperial capital of the Nguyen dynasty. Citadel by the Perfume River, royal tombs, dragon boats, palace cuisine.',
    headlinePriceVnd: 1_060_000, stars: 5,
    photo: 'https://images.unsplash.com/photo-1599708153386-62bf3b950662?auto=format&fit=crop&w=2400&q=80',
    services: [
      { serviceType: 'pickup',    icon: '🚗', title: 'DAD → Hue pickup',       priceVnd: 780_000 },
      { serviceType: 'fastTrack', icon: '⚡', title: 'Fast-track at DAD',      priceVnd: 340_000 },
      { serviceType: 'hotel',     icon: '🏨', title: 'Riverside hotels',       priceVnd: 880_000 },
      { serviceType: 'tour',      icon: '🗺', title: 'Citadel & tomb tours',   priceVnd: 1_060_000 },
    ],
  },
  {
    slug: 'hoi-an', name: 'Hoi An', airportCode: 'DAD', airportName: 'Da Nang Intl.',
    description: 'UNESCO old town: yellow-washed merchant houses, lantern-lit streets, tailored silk by morning, river sail at dusk.',
    headlinePriceVnd: 1_100_000, stars: 5,
    photo: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2400&q=80',
    services: [
      { serviceType: 'pickup',    icon: '🚗', title: 'DAD → Hoi An pickup',    priceVnd: 520_000 },
      { serviceType: 'fastTrack', icon: '⚡', title: 'Fast-track at DAD',      priceVnd: 340_000 },
      { serviceType: 'hotel',     icon: '🏨', title: 'Old Town hotels',        priceVnd: 980_000 },
      { serviceType: 'tour',      icon: '🗺', title: 'Lantern & food tours',   priceVnd: 1_100_000 },
    ],
  },
  {
    slug: 'da-nang', name: 'Da Nang', airportCode: 'DAD', airportName: 'Da Nang Intl.',
    description: "Central Vietnam's beach city. Marble Mountains, Dragon Bridge, Ba Na Hills and the Golden Bridge above the clouds.",
    headlinePriceVnd: 940_000, stars: 4,
    photo: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=2400&q=80',
    services: [
      { serviceType: 'pickup',    icon: '🚗', title: 'DAD → city pickup',      priceVnd: 320_000 },
      { serviceType: 'fastTrack', icon: '⚡', title: 'Fast-track at DAD',      priceVnd: 340_000 },
      { serviceType: 'hotel',     icon: '🏨', title: 'Beachfront hotels',      priceVnd: 860_000 },
      { serviceType: 'tour',      icon: '🗺', title: 'Ba Na & Marble tours',   priceVnd: 940_000 },
    ],
  },
  {
    slug: 'mekong', name: 'Mekong', airportCode: 'SGN', airportName: 'Tan Son Nhat, HCMC',
    description: 'Floating markets and fruit orchards where the Mekong reaches the sea. Dawn boats at Cai Rang, tea with a coconut farmer.',
    headlinePriceVnd: 980_000, stars: 4,
    photo: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2400&q=80',
    services: [
      { serviceType: 'pickup',    icon: '🚗', title: 'SGN → Ben Tre pickup',   priceVnd: 820_000 },
      { serviceType: 'fastTrack', icon: '⚡', title: 'Fast-track at SGN',      priceVnd: 420_000 },
      { serviceType: 'hotel',     icon: '🏨', title: 'Riverside stays',        priceVnd: 780_000 },
      { serviceType: 'tour',      icon: '🗺', title: 'Delta day cruises',      priceVnd: 980_000 },
    ],
  },
  {
    slug: 'nha-trang', name: 'Nha Trang', airportCode: 'CXR', airportName: 'Cam Ranh Intl.',
    description: '6 km palm-lined bay, nine offshore islands. Reef diving, mud baths, night-market lobster, cliffside sky-bars.',
    headlinePriceVnd: 1_180_000, stars: 4,
    photo: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2400&q=80',
    services: [
      { serviceType: 'pickup',    icon: '🚗', title: 'CXR → beach pickup',     priceVnd: 380_000 },
      { serviceType: 'fastTrack', icon: '⚡', title: 'Fast-track at CXR',      priceVnd: 300_000 },
      { serviceType: 'hotel',     icon: '🏨', title: 'Oceanfront hotels',      priceVnd: 940_000 },
      { serviceType: 'tour',      icon: '🗺', title: 'Island-hop & dive tours', priceVnd: 1_180_000 },
    ],
  },
  {
    slug: 'da-lat', name: 'Da Lat', airportCode: 'CXR', airportName: 'Cam Ranh Intl.',
    description: "Pine-forested highland city at 1,500m. French villas, coffee plantations, strawberry farms, lake-side cafés.",
    headlinePriceVnd: 1_020_000, stars: 4,
    photo: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=80',
    services: [
      { serviceType: 'pickup',    icon: '🚗', title: 'CXR → Da Lat transfer',  priceVnd: 1_200_000 },
      { serviceType: 'fastTrack', icon: '⚡', title: 'Fast-track at CXR',      priceVnd: 300_000 },
      { serviceType: 'hotel',     icon: '🏨', title: 'Pine-view hotels',       priceVnd: 680_000 },
      { serviceType: 'tour',      icon: '🗺', title: 'Highland & coffee tours', priceVnd: 1_020_000 },
    ],
  },
  {
    slug: 'phu-quoc', name: 'Phu Quoc', airportCode: 'PQC', airportName: 'Phu Quoc Intl.',
    description: "Vietnam's southernmost island. White-sand beaches, pepper plantations, An Thoi coral, longtail-boat sunsets.",
    headlinePriceVnd: 2_200_000, stars: 5,
    photo: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=2400&q=80',
    services: [
      { serviceType: 'pickup',    icon: '🚗', title: 'PQC → beach resorts',    priceVnd: 450_000 },
      { serviceType: 'fastTrack', icon: '⚡', title: 'Fast-track at PQC',      priceVnd: 280_000 },
      { serviceType: 'hotel',     icon: '🏨', title: 'Beachfront resorts',     priceVnd: 1_800_000 },
      { serviceType: 'tour',      icon: '🗺', title: 'Island-hop boat tours',  priceVnd: 1_400_000 },
    ],
  },
]

export const VOYAGER_OPERATOR_ID = 'voyager'
