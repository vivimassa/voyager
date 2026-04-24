'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AgentTopBar } from '@/components/agent/AgentTopBar'
import { AgentSidebar } from '@/components/agent/AgentSidebar'
import { useIsOperatorAuthed } from '@/stores/operator-auth-store'

/**
 * Agent dashboard shell. Gates every /agent/* route behind operator auth;
 * the login page handles its own chrome (no sidebar/top bar) and bypasses
 * the gate.
 */
export default function AgentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isAuthed = useIsOperatorAuthed()
  const isLoginRoute = pathname?.startsWith('/agent/login')

  useEffect(() => {
    if (!isLoginRoute && !isAuthed) {
      const redirect = encodeURIComponent(pathname || '/agent/bookings')
      router.replace(`/agent/login?redirect=${redirect}`)
    }
  }, [isAuthed, isLoginRoute, pathname, router])

  if (isLoginRoute) {
    return <>{children}</>
  }

  if (!isAuthed) {
    // Avoid a flash of protected UI while the effect above redirects.
    return <div className="h-full" />
  }

  return (
    <div
      className="flex flex-col h-full bg-[#f1f3f7]"
      style={{ ['--module-accent' as string]: '#3E7BFA' }}
    >
      <AgentTopBar />
      <div className="flex-1 flex overflow-hidden">
        <AgentSidebar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
