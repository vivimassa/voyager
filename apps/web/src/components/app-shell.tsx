'use client'

import { useAuth } from './auth-provider'

/**
 * Minimal app shell — renders children in a full-height main.
 * Voyager-specific nav (sidebar, portal tabs) will be added as we build
 * out the ops/client/supplier portals.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  void isAuthenticated
  return <main className="flex-1 overflow-y-auto">{children}</main>
}
