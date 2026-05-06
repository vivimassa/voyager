'use client'

import { useEffect } from 'react'
import { useCurrencyStore } from '@/stores/currency-store'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

/**
 * Pulls the current USD→VND reference rate from the server's /catalog/fx
 * endpoint and caches it on the currency store. Mounts once near the root.
 */
export function FxBootstrap() {
  const setRate = useCurrencyStore((s) => s.setRateUsdVnd)
  useEffect(() => {
    let cancelled = false
    fetch(`${API_BASE}/catalog/fx`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { rate?: number } | null) => {
        if (!cancelled && data?.rate && data.rate > 0) setRate(data.rate)
      })
      .catch(() => {
        // Silent — fallback rate already in store.
      })
    return () => {
      cancelled = true
    }
  }, [setRate])
  return null
}
