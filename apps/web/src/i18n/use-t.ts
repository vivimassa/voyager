/**
 * useT() — translation hook, reads the active locale from locale-store and
 * returns the matching dictionary. Components access values by property path
 * for type-safety:
 *
 *   const t = useT()
 *   t.nav.destinations          // 'Destinations' or 'Điểm đến'
 *   t.hero.airportTag('HAN')    // 'Fly into HAN' or 'Bay đến HAN'
 *
 * Returning the whole typed dictionary (not a key-string lookup) lets TS catch
 * typos and preserves autocomplete.
 */
'use client'

import { useLocaleStore } from '@/stores/locale-store'
import { dictionary, type Dictionary } from './dictionary'

export function useT(): Dictionary {
  const locale = useLocaleStore((s) => s.locale)
  return dictionary[locale]
}
