/**
 * Airport IATA → human-facing city name.
 * Customer-facing UI should ALWAYS show a city, never the 3-letter code.
 */

export type AirportCode = 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC'

export const AIRPORT_CITY_EN: Record<AirportCode, string> = {
  HAN: 'Hanoi',
  SGN: 'Ho Chi Minh City',
  DAD: 'Da Nang',
  CXR: 'Nha Trang',
  PQC: 'Phu Quoc',
}

export const AIRPORT_CITY_VI: Record<AirportCode, string> = {
  HAN: 'Hà Nội',
  SGN: 'TP. Hồ Chí Minh',
  DAD: 'Đà Nẵng',
  CXR: 'Nha Trang',
  PQC: 'Phú Quốc',
}

export function airportCity(code: string, locale: 'en' | 'vi'): string {
  const map = locale === 'vi' ? AIRPORT_CITY_VI : AIRPORT_CITY_EN
  return map[code as AirportCode] ?? code
}

export const AIRPORT_CODES: AirportCode[] = ['HAN', 'SGN', 'DAD', 'CXR', 'PQC']
