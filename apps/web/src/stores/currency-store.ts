/**
 * Voyager currency store — VND (Vietnamese Dong) is the base of truth,
 * USD is a display-only conversion. Prices in the data model are ALWAYS in VND.
 *
 * Why VND as base: suppliers quote in VND, bookings settle in VND. USD is
 * a courtesy conversion so international customers can sanity-check amounts.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Currency = 'VND' | 'USD'

// Fixed display rate — good enough for v1. If we ever need live FX, wire it here.
export const VND_PER_USD = 25000

type CurrencyState = {
  currency: Currency
  setCurrency: (c: Currency) => void
  /** Format an amount (stored as VND) for display in the active currency. */
  formatFromVnd: (amountVnd: number) => string
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'VND',
      setCurrency: (currency) => set({ currency }),
      formatFromVnd: (amountVnd: number) => {
        const currency = get().currency
        if (currency === 'USD') {
          const usd = amountVnd / VND_PER_USD
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: usd < 10 ? 2 : 0,
          }).format(usd)
        }
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
          maximumFractionDigits: 0,
        }).format(amountVnd)
      },
    }),
    {
      name: 'vg-currency',
      partialize: (s) => ({ currency: s.currency }),
    },
  ),
)
