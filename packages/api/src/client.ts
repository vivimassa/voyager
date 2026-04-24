/**
 * Voyager — API Client
 * Platform-agnostic. Base URL is injected by the consuming app.
 *
 * Minimal post-strip surface: auth endpoints + token refresh. All airline
 * endpoints have been removed and will be rebuilt per Voyager domain
 * (bookings, suppliers, clients, products, wallet).
 */

let _baseUrl = 'http://localhost:3002'

export function setApiBaseUrl(url: string) {
  _baseUrl = url.replace(/\/$/, '')
}

export function getApiBaseUrl(): string {
  return _baseUrl
}

// ─── Auth callbacks (set once by the app at startup) ─────────────
interface AuthCallbacks {
  getAccessToken: () => string | null
  getRefreshToken?: () => string | null
  onTokenRefresh?: (access: string, refresh: string) => void
  onAuthFailure: () => void
}

let _callbacks: AuthCallbacks = {
  getAccessToken: () => null,
  onAuthFailure: () => {},
}

export function setAuthCallbacks(cb: AuthCallbacks) {
  _callbacks = { ..._callbacks, ...cb }
}

// ─── Types ───────────────────────────────────────────────────────
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    operatorId: string
  }
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
}

// ─── Request helpers ─────────────────────────────────────────────
async function request<T = unknown>(
  method: string,
  path: string,
  body?: unknown,
  { auth = true }: { auth?: boolean } = {},
): Promise<T> {
  const headers: Record<string, string> = { 'content-type': 'application/json' }
  if (auth) {
    const token = _callbacks.getAccessToken()
    if (token) headers.authorization = `Bearer ${token}`
  }
  const res = await fetch(`${_baseUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  if (res.status === 401 && auth) {
    _callbacks.onAuthFailure()
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`${res.status} ${res.statusText}${text ? ` — ${text}` : ''}`)
  }
  const ct = res.headers.get('content-type') ?? ''
  if (ct.includes('application/json')) {
    return (await res.json()) as T
  }
  return undefined as T
}

// ─── Public surface ──────────────────────────────────────────────
export const api = {
  login(email: string, password: string): Promise<LoginResponse> {
    return request<LoginResponse>('POST', '/auth/login', { email, password }, { auth: false })
  },
  refresh(refreshToken: string): Promise<RefreshResponse> {
    return request<RefreshResponse>('POST', '/auth/refresh', { refreshToken }, { auth: false })
  },
  forgotPassword(email: string): Promise<{ ok: true }> {
    return request<{ ok: true }>('POST', '/auth/forgot-password', { email }, { auth: false })
  },
  resetPassword(token: string, password: string): Promise<{ ok: true }> {
    return request<{ ok: true }>('POST', '/auth/reset-password', { token, password }, { auth: false })
  },
  setPassword(userId: string, password: string): Promise<{ ok: true }> {
    return request<{ ok: true }>('POST', '/auth/set-password', { userId, password }, { auth: false })
  },
}
