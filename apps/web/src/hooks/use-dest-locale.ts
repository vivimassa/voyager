'use client'

import { useLocaleStore } from '@/stores/locale-store'
import type { Destination, ServiceKey } from '@/data/destinations'

/**
 * Locale-aware destination fields. VI falls back to EN when Vi field missing.
 */
export function useDestLocale() {
  const vi = useLocaleStore((s) => s.locale) === 'vi'
  return {
    vi,
    name: (d: Destination) => (vi ? d.nameVi ?? d.name : d.name),
    description: (d: Destination) => (vi ? d.descriptionVi ?? d.description : d.description),
    airportName: (d: Destination) => (vi ? d.airportNameVi ?? d.airportName : d.airportName),
    serviceLabel: (d: Destination, k: ServiceKey) =>
      vi ? d.services[k].labelVi ?? d.services[k].label : d.services[k].label,
  }
}
