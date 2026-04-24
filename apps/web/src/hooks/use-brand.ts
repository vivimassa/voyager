'use client'

/**
 * useBrand — the single hook every component should use when it needs to show
 * the product name, logo mark, or tagline.
 *
 * Returns a stable Brand object: runtime override if set, otherwise env default.
 * Never reads from localStorage directly — that's the store's job.
 *
 * SSR note: zustand's persist middleware rehydrates after mount, so the very
 * first render may show the env default even if an override is saved. For the
 * subsecond flash-of-default to matter visually you'd need a user with an
 * override and a slow mount. Acceptable trade-off; the alternative (blocking
 * hydration until localStorage is read) costs perceived performance.
 */

import { useMemo } from 'react'
import { BRAND_DEFAULTS, type Brand } from '@/lib/brand'
import { useBrandStore } from '@/stores/brand-store'

export function useBrand(): Brand {
  const nameOverride = useBrandStore((s) => s.nameOverride)
  const markOverride = useBrandStore((s) => s.markOverride)
  const taglineOverride = useBrandStore((s) => s.taglineOverride)

  return useMemo(
    () => ({
      name: nameOverride ?? BRAND_DEFAULTS.name,
      mark: markOverride ?? BRAND_DEFAULTS.mark,
      tagline: taglineOverride ?? BRAND_DEFAULTS.tagline,
    }),
    [nameOverride, markOverride, taglineOverride],
  )
}
