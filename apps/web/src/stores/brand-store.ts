'use client'

/**
 * Brand runtime overrides — per-browser, persisted to localStorage.
 *
 * This store layers ON TOP of the static defaults in `lib/brand.ts`. When a
 * user opens the Brand settings modal and types a new name, we save it here;
 * when they clear it, the UI falls back to the env defaults.
 *
 * Scope limits (intentional, for now):
 *   • Per-browser, not per-tenant. Switching devices → sees defaults again.
 *   • Doesn't affect SSR-rendered <title> on first paint (env default shows),
 *     but the `use-brand` hook syncs document.title on the client after mount.
 *   • Doesn't affect the server's SMS body. Server has its own BRAND_NAME env.
 *     If you want server + web synchronised, set both. Future work: a DB-backed
 *     /brand endpoint both sides read from.
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  // null means "use the default"; a string means "override with this"
  nameOverride: string | null
  markOverride: string | null
  taglineOverride: string | null

  // Settings modal UI state (transient — not persisted).
  isSettingsOpen: boolean

  setOverride: (patch: {
    name?: string | null
    mark?: string | null
    tagline?: string | null
  }) => void
  reset: () => void
  openSettings: () => void
  closeSettings: () => void
}

export const useBrandStore = create<State>()(
  persist(
    (set) => ({
      nameOverride: null,
      markOverride: null,
      taglineOverride: null,
      isSettingsOpen: false,

      setOverride: (patch) =>
        set((s) => ({
          nameOverride:
            patch.name !== undefined
              ? normaliseOverride(patch.name)
              : s.nameOverride,
          markOverride:
            patch.mark !== undefined
              ? normaliseOverride(patch.mark)
              : s.markOverride,
          taglineOverride:
            patch.tagline !== undefined
              ? normaliseOverride(patch.tagline)
              : s.taglineOverride,
        })),

      reset: () =>
        set({
          nameOverride: null,
          markOverride: null,
          taglineOverride: null,
        }),

      openSettings: () => set({ isSettingsOpen: true }),
      closeSettings: () => set({ isSettingsOpen: false }),
    }),
    {
      name: 'voyager.brand',
      storage: createJSONStorage(() => localStorage),
      // Only persist the override fields — modal state should always start closed.
      partialize: (s) => ({
        nameOverride: s.nameOverride,
        markOverride: s.markOverride,
        taglineOverride: s.taglineOverride,
      }),
    },
  ),
)

/**
 * Coerce incoming override values into either `null` (= use default) or a
 * non-empty trimmed string. Prevents "I saved an empty override, now nothing
 * falls back to default" footguns.
 */
function normaliseOverride(v: string | null): string | null {
  if (v === null) return null
  const trimmed = v.trim()
  return trimmed.length === 0 ? null : trimmed
}
