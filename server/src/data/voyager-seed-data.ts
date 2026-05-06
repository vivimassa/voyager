/**
 * Voyager seed data — canonical content for initial DB bootstrap.
 *
 * Source of truth: Vihat 2024 Fast-Track pricing guide (USD).
 * VND is derived from `FX_FALLBACK_USD_VND` at seed time; in production the
 * routes recompute via the FxRate doc.
 */

export const VOYAGER_OPERATOR_ID = 'voyager'

export type SeedAirport = {
  iataCode: 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC' | 'HUI' | 'THD' | 'VII'
  icaoCode: string
  name: string
  nameVi: string
  city: string
  cityVi: string
  isActive: boolean
}

export const SEED_AIRPORTS: SeedAirport[] = [
  { iataCode: 'HAN', icaoCode: 'VVNB', name: 'Noi Bai International',     nameVi: 'Sân bay quốc tế Nội Bài',     city: 'Hanoi',           cityVi: 'Hà Nội',         isActive: true },
  { iataCode: 'SGN', icaoCode: 'VVTS', name: 'Tan Son Nhat International', nameVi: 'Sân bay quốc tế Tân Sơn Nhất', city: 'Ho Chi Minh City', cityVi: 'TP. Hồ Chí Minh', isActive: true },
  { iataCode: 'DAD', icaoCode: 'VVDN', name: 'Da Nang International',     nameVi: 'Sân bay quốc tế Đà Nẵng',     city: 'Da Nang',         cityVi: 'Đà Nẵng',         isActive: true },
  { iataCode: 'CXR', icaoCode: 'VVCR', name: 'Cam Ranh International',    nameVi: 'Sân bay quốc tế Cam Ranh',    city: 'Nha Trang',       cityVi: 'Nha Trang',       isActive: true },
  { iataCode: 'HUI', icaoCode: 'VVPB', name: 'Phu Bai International',     nameVi: 'Sân bay quốc tế Phú Bài',     city: 'Hue',             cityVi: 'Huế',             isActive: true },
  { iataCode: 'THD', icaoCode: 'VVTX', name: 'Tho Xuan Airport',          nameVi: 'Sân bay Thọ Xuân',            city: 'Thanh Hoa',       cityVi: 'Thanh Hóa',       isActive: true },
  { iataCode: 'VII', icaoCode: 'VVVH', name: 'Vinh International',        nameVi: 'Sân bay quốc tế Vinh',        city: 'Vinh',            cityVi: 'Vinh',            isActive: true },
  { iataCode: 'PQC', icaoCode: 'VVPQ', name: 'Phu Quoc International',    nameVi: 'Sân bay quốc tế Phú Quốc',    city: 'Phu Quoc',        cityVi: 'Phú Quốc',        isActive: false },
]

export type SeedSegment = 'domestic' | 'international'
export type SeedDirection = 'arrival' | 'departure' | 'both'

export type SeedInclusion = {
  key: 'checkin' | 'baggage' | 'security' | 'immigration'
  label: string
}

export type SeedFastTrackProduct = {
  airportCode: SeedAirport['iataCode']
  segment: SeedSegment
  direction: SeedDirection
  fitPriceUsd: number
  gitPriceUsd: number
  inventoryDailyCap: number
  inclusions: SeedInclusion[]
}

const PRIORITY_BASE: SeedInclusion[] = [
  { key: 'checkin',  label: 'Priority check-in counter' },
  { key: 'baggage',  label: 'Priority baggage handling' },
  { key: 'security', label: 'Priority security screening' },
]

const PRIORITY_INTL = [...PRIORITY_BASE, { key: 'immigration' as const, label: 'Priority immigration' }]

export const SEED_FAST_TRACK_PRODUCTS: SeedFastTrackProduct[] = [
  // SGN
  { airportCode: 'SGN', segment: 'domestic',      direction: 'both',      fitPriceUsd: 20, gitPriceUsd: 20, inventoryDailyCap: 60, inclusions: PRIORITY_BASE },
  { airportCode: 'SGN', segment: 'international', direction: 'both',      fitPriceUsd: 40, gitPriceUsd: 40, inventoryDailyCap: 60, inclusions: PRIORITY_INTL },
  // HAN
  { airportCode: 'HAN', segment: 'domestic',      direction: 'both',      fitPriceUsd: 20, gitPriceUsd: 20, inventoryDailyCap: 60, inclusions: PRIORITY_BASE },
  { airportCode: 'HAN', segment: 'international', direction: 'both',      fitPriceUsd: 35, gitPriceUsd: 35, inventoryDailyCap: 60, inclusions: PRIORITY_INTL },
  // CXR (arrival vs departure split per Vihat)
  { airportCode: 'CXR', segment: 'international', direction: 'arrival',   fitPriceUsd: 20, gitPriceUsd: 0,  inventoryDailyCap: 30, inclusions: [{ key: 'immigration', label: 'Priority immigration' }] },
  { airportCode: 'CXR', segment: 'international', direction: 'departure', fitPriceUsd: 30, gitPriceUsd: 0,  inventoryDailyCap: 30, inclusions: PRIORITY_INTL },
  // DAD / HUI / THD (Vihat groups together at $30)
  { airportCode: 'DAD', segment: 'international', direction: 'both',      fitPriceUsd: 30, gitPriceUsd: 30, inventoryDailyCap: 30, inclusions: PRIORITY_INTL },
  { airportCode: 'HUI', segment: 'international', direction: 'both',      fitPriceUsd: 30, gitPriceUsd: 30, inventoryDailyCap: 20, inclusions: PRIORITY_INTL },
  { airportCode: 'THD', segment: 'international', direction: 'both',      fitPriceUsd: 30, gitPriceUsd: 30, inventoryDailyCap: 20, inclusions: PRIORITY_INTL },
  { airportCode: 'VII', segment: 'international', direction: 'both',      fitPriceUsd: 30, gitPriceUsd: 30, inventoryDailyCap: 20, inclusions: PRIORITY_INTL },
]

export function fastTrackProductId(p: { airportCode: string; segment: string; direction: string }): string {
  return `${p.airportCode}-${p.segment}-${p.direction}`
}

export function fastTrackTitle(p: { airportCode: string; segment: SeedSegment; direction: SeedDirection }): string {
  const seg = p.segment === 'international' ? 'Intl' : 'Dom'
  const dir = p.direction === 'both' ? '' : p.direction === 'arrival' ? ' Arrival' : ' Departure'
  return `Fast Track ${p.airportCode} ${seg}${dir}`
}
