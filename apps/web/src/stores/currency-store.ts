/**
 * Voyager currency store — USD is the canonical price source for Fast-Track
 * (matches the server). VND is a display conversion using the cached rate.
 *
 * The rate is hydrated from /catalog/fx on app boot (see fx-bootstrap.tsx)
 * and falls back to FALLBACK_USD_VND otherwise.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Currency = 'VND' | 'USD'

export const FALLBACK_USD_VND = 25500

type CurrencyState = {
  currency: Currency
  rateUsdVnd: number
  setCurrency: (c: Currency) => void
  setRateUsdVnd: (rate: number) => void
  formatFromUsd: (amountUsd: number) => string
  formatFromVnd: (amountVnd: number) => string
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'USD',
      rateUsdVnd: FALLBACK_USD_VND,
      setCurrency: (currency) => set({ currency }),
      setRateUsdVnd: (rateUsdVnd) => set({ rateUsdVnd: rateUsdVnd > 0 ? rateUsdVnd : FALLBACK_USD_VND }),
      formatFromUsd: (amountUsd: number) => {
        const { currency, rateUsdVnd } = get()
        if (currency === 'VND') {
          const vnd = amountUsd * rateUsdVnd
          return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(vnd)
        }
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: amountUsd < 10 ? 2 : 0 }).format(amountUsd)
      },
      formatFromVnd: (amountVnd: number) => {
        const { currency, rateUsdVnd } = get()
        if (currency === 'USD') {
          const usd = amountVnd / rateUsdVnd
          return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: usd < 10 ? 2 : 0 }).format(usd)
        }
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amountVnd)
      },
    }),
    {
      name: 'vg-currency',
      partialize: (s) => ({ currency: s.currency }),
    },
  ),
)
