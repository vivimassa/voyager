'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { setAuthCallbacks } from '@skyhub/api'

interface AuthUser {
  _id: string
  operatorId: string
  role: string
  profile: {
    firstName: string
    lastName: string
    email: string
    avatarUrl: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthCtx = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
})

export function useAuth() {
  return useContext(AuthCtx)
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'
const ACCESS_KEY = 'skyhub.accessToken'
const REFRESH_KEY = 'skyhub.refreshToken'

function readTokens() {
  if (typeof window === 'undefined') return { access: null, refresh: null }
  try {
    return {
      access: window.localStorage.getItem(ACCESS_KEY),
      refresh: window.localStorage.getItem(REFRESH_KEY),
    }
  } catch {
    return { access: null, refresh: null }
  }
}

function writeTokens(access: string, refresh: string) {
  try {
    window.localStorage.setItem(ACCESS_KEY, access)
    window.localStorage.setItem(REFRESH_KEY, refresh)
  } catch {}
}

function clearTokens() {
  try {
    window.localStorage.removeItem(ACCESS_KEY)
    window.localStorage.removeItem(REFRESH_KEY)
  } catch {}
}

// Customer-facing site is fully public — anonymous checkout is the default
// flow per the Vihat Fast-Track spec. The agent dashboard at /agent/* runs
// its own auth gate (see apps/web/src/app/agent/layout.tsx), so this provider
// no longer redirects to /login for any path.
function isPublicPath(_pathname: string | null | undefined): boolean {
  return true
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const bootstrapped = useRef(false)

  const loadMe = useCallback(async (accessToken: string): Promise<AuthUser | null> => {
    const res = await fetch(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!res.ok) return null
    return (await res.json()) as AuthUser
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(body?.error || 'Login failed')
    }
    writeTokens(body.accessToken, body.refreshToken)
    setUser(body.user as AuthUser)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    clearTokens()
    setUser(null)
    setIsAuthenticated(false)
    router.replace('/login')
  }, [router])

  useEffect(() => {
    if (bootstrapped.current) return
    bootstrapped.current = true

    setAuthCallbacks({
      getAccessToken: () => {
        if (typeof window === 'undefined') return null
        try {
          return window.localStorage.getItem(ACCESS_KEY)
        } catch {
          return null
        }
      },
      getRefreshToken: () => {
        if (typeof window === 'undefined') return null
        try {
          return window.localStorage.getItem(REFRESH_KEY)
        } catch {
          return null
        }
      },
      onTokenRefresh: (access, refresh) => {
        writeTokens(access, refresh)
      },
      onAuthFailure: () => {
        clearTokens()
        setUser(null)
        setIsAuthenticated(false)
      },
    })
    ;(async () => {
      const { refresh } = readTokens()
      if (!refresh) {
        setIsLoading(false)
        return
      }
      try {
        const res = await fetch(`${API_BASE}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: refresh }),
        })
        if (!res.ok) throw new Error('Refresh failed')
        const { accessToken, refreshToken } = await res.json()
        writeTokens(accessToken, refreshToken)
        const me = await loadMe(accessToken)
        if (me) {
          setUser(me)
          setIsAuthenticated(true)
        } else {
          clearTokens()
        }
      } catch {
        clearTokens()
      } finally {
        setIsLoading(false)
      }
    })()
  }, [loadMe])

  // Customer-facing site is anonymous-by-default. We still redirect already
  // authed users away from /login so they don't see the form on every visit;
  // the agent dashboard runs its own gate and is unaffected.
  useEffect(() => {
    if (isLoading) return
    if (isAuthenticated && pathname === '/login') {
      router.replace('/')
    }
  }, [isLoading, isAuthenticated, pathname, router])
  void isPublicPath

  if (isLoading) {
    return <div className="h-screen w-screen bg-hz-bg" />
  }

  return <AuthCtx.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>{children}</AuthCtx.Provider>
}
