/**
 * Voyager cart store — Fast-Track-only.
 * USD is canonical for prices (mirrors the server). VND is cached at line
 * creation using the current FX rate; if the rate refreshes mid-session the
 * line still shows the snapshot until the user re-adds, which keeps display
 * stable even when the global rate moves.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AirportCode } from '@/lib/airport-cities'

export type Segment = 'domestic' | 'international'
export type Direction = 'arrival' | 'departure'
export type Tier = 'FIT' | 'GIT'
export type IdType = 'passport' | 'cccd'

export type Passenger = {
  firstName: string
  lastName: string
  dob: string                 // YYYY-MM-DD
  nationality: string         // ISO3166-1 alpha-2 (e.g. 'VN')
  idType: IdType
  idNumber: string
}

export type CartItem = {
  /** Stable line id — productId + travelDate + direction. */
  id: string
  productId: string           // 'HAN-international-departure'
  airportCode: AirportCode
  segment: Segment
  direction: Direction
  tier: Tier
  title: string
  unitPriceUsd: number
  unitPriceVnd: number        // snapshot
  qty: number
  travelDate: string          // YYYY-MM-DD
  travelTime: string          // HH:mm
  flightNumber: string
  passengers: Passenger[]
}

export type AddCartLine = Omit<CartItem, 'id' | 'tier' | 'passengers'> & {
  passengers?: Passenger[]
}

export const FALLBACK_USD_VND = 25500

function buildId(p: { productId: string; travelDate: string; direction: Direction }): string {
  return `${p.productId}|${p.travelDate}|${p.direction}`
}

function tierFor(qty: number): Tier {
  return qty >= 6 ? 'GIT' : 'FIT'
}

function blankPassenger(idType: IdType): Passenger {
  return { firstName: '', lastName: '', dob: '', nationality: '', idType, idNumber: '' }
}

function paddedPassengers(prev: Passenger[], qty: number, idType: IdType): Passenger[] {
  if (prev.length === qty) return prev
  if (prev.length > qty) return prev.slice(0, qty)
  return [...prev, ...Array.from({ length: qty - prev.length }, () => blankPassenger(idType))]
}

type CartState = {
  items: CartItem[]
  addOrReplace: (line: AddCartLine) => void
  setQty: (id: string, qty: number) => void
  setPassenger: (id: string, index: number, patch: Partial<Passenger>) => void
  setLineMeta: (id: string, patch: Partial<Pick<CartItem, 'travelDate' | 'travelTime' | 'flightNumber'>>) => void
  remove: (id: string) => void
  clear: () => void
  totalUsd: () => number
  totalVnd: () => number
  count: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addOrReplace: (line) => {
        set((state) => {
          const id = buildId({ productId: line.productId, travelDate: line.travelDate, direction: line.direction })
          const tier = tierFor(line.qty)
          const idType: IdType = line.segment === 'international' ? 'passport' : 'cccd'
          const seedPassengers = line.passengers ?? []
          const passengers = paddedPassengers(seedPassengers, line.qty, idType)
          const next: CartItem = { ...line, id, tier, passengers }
          const existing = state.items.findIndex((i) => i.id === id)
          if (existing >= 0) {
            const updated = [...state.items]
            updated[existing] = next
            return { items: updated }
          }
          return { items: [...state.items, next] }
        })
      },
      setQty: (id, qty) =>
        set((state) => {
          const safeQty = Math.max(1, Math.floor(qty))
          return {
            items: state.items.map((i) => {
              if (i.id !== id) return i
              const idType: IdType = i.segment === 'international' ? 'passport' : 'cccd'
              return { ...i, qty: safeQty, tier: tierFor(safeQty), passengers: paddedPassengers(i.passengers, safeQty, idType) }
            }),
          }
        }),
      setPassenger: (id, index, patch) =>
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id !== id) return i
            const passengers = i.passengers.map((p, idx) => (idx === index ? { ...p, ...patch } : p))
            return { ...i, passengers }
          }),
        })),
      setLineMeta: (id, patch) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        })),
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      totalUsd: () => get().items.reduce((sum, i) => sum + i.unitPriceUsd * i.qty, 0),
      totalVnd: () => get().items.reduce((sum, i) => sum + i.unitPriceVnd * i.qty, 0),
      count: () => get().items.length,
    }),
    {
      name: 'vg-cart-v2',
      partialize: (s) => ({ items: s.items }),
    },
  ),
)
