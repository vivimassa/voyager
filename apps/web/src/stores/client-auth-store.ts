'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * Client-portal auth store (traveller, NOT ops admin).
 *
 * - Tokens persisted to localStorage under `voyager.client.*`.
 * - Overlay open/close state is transient (not persisted).
 * - A shallow snapshot of the Client profile is persisted so the TopNav can
 *   render the user's name on page refresh without a round-trip.
 */

export type AuthOverlayMode = 'signin' | 'signup'

export type ClientProfileSnapshot = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatarUrl: string
}

type State = {
  // Auth state
  client: ClientProfileSnapshot | null
  accessToken: string | null
  refreshToken: string | null

  // Overlay state (transient)
  isOpen: boolean
  mode: AuthOverlayMode

  // Actions
  openAuth: (mode?: AuthOverlayMode) => void
  closeAuth: () => void
  setMode: (mode: AuthOverlayMode) => void
  setSession: (args: {
    accessToken: string
    refreshToken: string
    client: ClientProfileSnapshot
  }) => void
  clearSession: () => void
}

export const useClientAuthStore = create<State>()(
  persist(
    (set) => ({
      client: null,
      accessToken: null,
      refreshToken: null,
      isOpen: false,
      mode: 'signin',

      openAuth: (mode = 'signin') => set({ isOpen: true, mode }),
      closeAuth: () => set({ isOpen: false }),
      setMode: (mode) => set({ mode }),

      setSession: ({ accessToken, refreshToken, client }) =>
        set({ accessToken, refreshToken, client, isOpen: false }),

      clearSession: () =>
        set({ accessToken: null, refreshToken: null, client: null }),
    }),
    {
      name: 'voyager.client.session',
      storage: createJSONStorage(() => localStorage),
      // Don't persist the open/mode state — overlay should always start closed.
      partialize: (s) => ({
        client: s.client,
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
      }),
    },
  ),
)

export function useIsClientAuthed(): boolean {
  return useClientAuthStore((s) => !!s.accessToken && !!s.client)
}
