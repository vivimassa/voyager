/**
 * Voyager locale store — English + Vietnamese from day 1.
 * Persisted to localStorage so language survives refresh.
 * Paired with i18n/dictionary.ts + i18n/use-t.ts for translation lookups.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Locale = 'en' | 'vi'

type LocaleState = {
  locale: Locale
  setLocale: (l: Locale) => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en',
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'vg-locale',
      partialize: (s) => ({ locale: s.locale }),
    },
  ),
)
