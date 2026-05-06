/**
 * Voyager airports — Fast-Track marketplace lanes (USD canonical).
 * Mirrors server/src/data/voyager-seed-data.ts. Keep in sync.
 */

export type AirportCode = 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'HUI' | 'THD' | 'VII'

export type Segment = 'domestic' | 'international'
export type Direction = 'arrival' | 'departure' | 'both'

export type AirportLane = {
  segment: Segment
  direction: Direction
  fitPriceUsd: number
  gitPriceUsd: number
  /** What's included (visible on the lane card). */
  inclusions: ('checkin' | 'baggage' | 'security' | 'immigration')[]
}

export type Airport = {
  code: AirportCode
  name: string
  nameVi: string
  city: string
  cityVi: string
  /** Hero photo for the airport coverage card. */
  photo: string
  lanes: AirportLane[]
}

const PRIORITY_DOM: AirportLane['inclusions'] = ['checkin', 'baggage', 'security']
const PRIORITY_INTL: AirportLane['inclusions'] = ['checkin', 'baggage', 'security', 'immigration']
const ARRIVAL_ONLY: AirportLane['inclusions'] = ['immigration']

export const AIRPORTS: Airport[] = [
  {
    code: 'SGN',
    name: 'Tan Son Nhat',
    nameVi: 'Tân Sơn Nhất',
    city: 'Ho Chi Minh City',
    cityVi: 'TP. Hồ Chí Minh',
    photo: 'https://images.unsplash.com/photo-1527161153332-99adcc6f2966?auto=format&fit=crop&w=1600&q=80',
    lanes: [
      { segment: 'domestic',      direction: 'both', fitPriceUsd: 20, gitPriceUsd: 20, inclusions: PRIORITY_DOM },
      { segment: 'international', direction: 'both', fitPriceUsd: 40, gitPriceUsd: 40, inclusions: PRIORITY_INTL },
    ],
  },
  {
    code: 'HAN',
    name: 'Noi Bai',
    nameVi: 'Nội Bài',
    city: 'Hanoi',
    cityVi: 'Hà Nội',
    photo: 'https://images.unsplash.com/photo-1465256240712-d7df3c14c43b?auto=format&fit=crop&w=1600&q=80',
    lanes: [
      { segment: 'domestic',      direction: 'both', fitPriceUsd: 20, gitPriceUsd: 20, inclusions: PRIORITY_DOM },
      { segment: 'international', direction: 'both', fitPriceUsd: 35, gitPriceUsd: 35, inclusions: PRIORITY_INTL },
    ],
  },
  {
    code: 'DAD',
    name: 'Da Nang',
    nameVi: 'Đà Nẵng',
    city: 'Da Nang',
    cityVi: 'Đà Nẵng',
    photo: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=80',
    lanes: [
      { segment: 'international', direction: 'both', fitPriceUsd: 30, gitPriceUsd: 30, inclusions: PRIORITY_INTL },
    ],
  },
  {
    code: 'CXR',
    name: 'Cam Ranh',
    nameVi: 'Cam Ranh',
    city: 'Nha Trang',
    cityVi: 'Nha Trang',
    photo: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1600&q=80',
    lanes: [
      { segment: 'international', direction: 'arrival',   fitPriceUsd: 20, gitPriceUsd: 0, inclusions: ARRIVAL_ONLY },
      { segment: 'international', direction: 'departure', fitPriceUsd: 30, gitPriceUsd: 0, inclusions: PRIORITY_INTL },
    ],
  },
  {
    code: 'HUI',
    name: 'Phu Bai',
    nameVi: 'Phú Bài',
    city: 'Hue',
    cityVi: 'Huế',
    photo: 'https://images.unsplash.com/photo-1540866225557-9e4c58100c67?auto=format&fit=crop&w=1600&q=80',
    lanes: [
      { segment: 'international', direction: 'both', fitPriceUsd: 30, gitPriceUsd: 30, inclusions: PRIORITY_INTL },
    ],
  },
  {
    code: 'THD',
    name: 'Tho Xuan',
    nameVi: 'Thọ Xuân',
    city: 'Thanh Hoa',
    cityVi: 'Thanh Hóa',
    photo: 'https://images.unsplash.com/photo-1507666405895-422eee7d517f?auto=format&fit=crop&w=1600&q=80',
    lanes: [
      { segment: 'international', direction: 'both', fitPriceUsd: 30, gitPriceUsd: 30, inclusions: PRIORITY_INTL },
    ],
  },
  {
    code: 'VII',
    name: 'Vinh',
    nameVi: 'Vinh',
    city: 'Vinh',
    cityVi: 'Vinh',
    photo: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1600&q=80',
    lanes: [
      { segment: 'international', direction: 'both', fitPriceUsd: 30, gitPriceUsd: 30, inclusions: PRIORITY_INTL },
    ],
  },
]

export function airportByCode(code: string): Airport | undefined {
  return AIRPORTS.find((a) => a.code === code)
}

export function fastTrackProductId(p: { airportCode: string; segment: Segment; direction: Direction }): string {
  return `${p.airportCode}-${p.segment}-${p.direction}`
}

export function pickLaneForRequest(
  airport: Airport,
  segment: Segment,
  direction: 'arrival' | 'departure',
): AirportLane | undefined {
  return airport.lanes.find(
    (l) => l.segment === segment && (l.direction === 'both' || l.direction === direction),
  )
}

export function minPriceUsd(airport: Airport): number {
  return Math.min(...airport.lanes.map((l) => l.fitPriceUsd))
}
