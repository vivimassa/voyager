/**
 * Voyager cart store — browse-before-login model.
 * Cart lives entirely in the browser (zustand + localStorage) until checkout.
 * At checkout we require auth (phone OTP / Google / Facebook / biometric)
 * and POST the cart contents to create a Booking.
 *
 * All prices in VND — display conversion happens via currency-store.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ServiceType = 'pickup' | 'fastTrack' | 'hotel' | 'tour'

export type CartItem = {
  /** Stable id so we can update/remove — combine productId + travelDate + pax hash */
  id: string
  productId: string
  destinationSlug: string
  airportCode: string
  serviceType: ServiceType
  title: string
  /** Hero image URL shown in the cart drawer */
  image?: string
  /** Unit price in VND (source of truth) */
  unitPriceVnd: number
  qty: number
  /** ISO date string — travel/booking date */
  travelDate?: string
  /** Free-form details per service (flight #, room type, pax count, etc.) */
  meta?: Record<string, string | number | boolean>
}

type CartState = {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  /** Total cart value in VND. */
  totalVnd: () => number
  /** Number of distinct line items (not summed qty). */
  count: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + item.qty } : i,
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      totalVnd: () =>
        get().items.reduce((sum, i) => sum + i.unitPriceVnd * i.qty, 0),
      count: () => get().items.length,
    }),
    {
      name: 'vg-cart',
      partialize: (s) => ({ items: s.items }),
    },
  ),
)
