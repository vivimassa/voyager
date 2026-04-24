/**
 * Thin wrapper around the Voyager client-auth HTTP endpoints.
 * All calls are fire-and-forget — the caller handles loading/error state.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

export type ClientProfileDto = {
  _id: string
  operatorId: string
  profile: {
    firstName: string
    lastName: string
    email: string
    phone: string
    countryCode: string
    avatarUrl: string
  }
  preferences?: { currency: 'VND' | 'USD'; locale: 'en' | 'vi' }
  isActive: boolean
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
  client: ClientProfileDto
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = (data as { error?: string })?.error ?? `Request failed (${res.status})`
    throw new Error(msg)
  }
  return data as T
}

export const clientAuthApi = {
  sendOtp(phone: string, countryCode: string, purpose: 'signin' | 'signup' = 'signin') {
    return postJson<{ ok: boolean; expiresInSec: number; phone: string }>(
      '/clients/auth/send-otp',
      { phone, countryCode, purpose },
    )
  },
  verifyOtp(phone: string, countryCode: string, code: string) {
    return postJson<AuthResponse>('/clients/auth/verify-otp', { phone, countryCode, code })
  },
  signup(email: string, password: string, firstName: string, lastName: string) {
    return postJson<AuthResponse>('/clients/auth/signup', {
      email,
      password,
      firstName,
      lastName,
    })
  },
  login(email: string, password: string) {
    return postJson<AuthResponse>('/clients/auth/login', { email, password })
  },
  refresh(refreshToken: string) {
    return postJson<{ accessToken: string; refreshToken: string }>(
      '/clients/auth/refresh',
      { refreshToken },
    )
  },
  google() {
    return postJson<AuthResponse>('/clients/auth/google', {})
  },
  facebook() {
    return postJson<AuthResponse>('/clients/auth/facebook', {})
  },
  webauthnBegin() {
    return postJson<unknown>('/clients/auth/webauthn/authenticate-begin', {})
  },
}
