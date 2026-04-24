'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * Operator (agent-side) auth store. Entirely separate from the client
 * (traveller) store so operators and customers can be logged in at the
 * same time in the same browser without clobbering each other's tokens.
 *
 * Persisted under `voyager.operator.session` in localStorage.
 */

export type OperatorProfileSnapshot = {
  _id: string
  operatorId: string
  firstName: string
  lastName: string
  email: string
  role: string
  avatarUrl: string
}

type State = {
  operator: OperatorProfileSnapshot | null
  accessToken: string | null
  refreshToken: string | null

  setSession: (args: {
    accessToken: string
    refreshToken: string
    operator: OperatorProfileSnapshot
  }) => void
  clearSession: () => void
}

export const useOperatorAuthStore = create<State>()(
  persist(
    (set) => ({
      operator: null,
      accessToken: null,
      refreshToken: null,

      setSession: ({ accessToken, refreshToken, operator }) =>
        set({ accessToken, refreshToken, operator }),

      clearSession: () =>
        set({ accessToken: null, refreshToken: null, operator: null }),
    }),
    {
      name: 'voyager.operator.session',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        operator: s.operator,
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
      }),
    },
  ),
)

export function useIsOperatorAuthed(): boolean {
  return useOperatorAuthStore((s) => !!s.accessToken && !!s.operator)
}
