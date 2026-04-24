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

// Client portal: let visitors browse destinations and services before login.
// Auth is only required for /account, /booking, /checkout-confirm.
// Exact '/' is listed because a startsWith('/') check would match everything.
const PUBLIC_EXACT = new Set(['/'])
const PUBLIC_PREFIX = [
  '/login',
  '/destinations',
  '/services',
  '/help',
  '/deals',
  '/cart',
  '/checkout',
  '/signup',
  '/auth',
]
function isPublicPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  if (PUBLIC_EXACT.has(pathname)) return true
  return PUBLIC_PREFIX.some((p) => pathname.startsWith(p))
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

  // Redirect unauthenticated users to /login (unless already on a public path)
  useEffect(() => {
    if (isLoading) return
    const onPublic = isPublicPath(pathname)
    if (!isAuthenticated && !onPublic) {
      router.replace('/login')
    }
    if (isAuthenticated && pathname === '/login') {
      router.replace('/')
    }
  }, [isLoading, isAuthenticated, pathname, router])

  const onPublicPath = isPublicPath(pathname)

  if (isLoading) {
    return <div className="h-screen w-screen bg-hz-bg" />
  }
  if (!isAuthenticated && !onPublicPath) {
    return <div className="h-screen w-screen bg-hz-bg" />
  }

  return <AuthCtx.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>{children}</AuthCtx.Provider>
}
