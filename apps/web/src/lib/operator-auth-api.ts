/**
 * Operator auth HTTP wrapper — hits the ops-style /auth/* endpoints
 * (as opposed to /clients/auth/* used by the traveller portal).
 */

import type { OperatorProfileSnapshot } from '@/stores/operator-auth-store'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

type ServerUser = {
  _id: string
  operatorId: string
  role: string
  profile?: {
    firstName?: string
    lastName?: string
    email?: string
    avatarUrl?: string
  }
}

export type OperatorLoginResponse = {
  accessToken: string
  refreshToken: string
  user: ServerUser
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = (await res.json().catch(() => ({}))) as { error?: string } | Record<string, unknown>
  if (!res.ok) {
    const msg = (data as { error?: string })?.error ?? `Request failed (${res.status})`
    throw new Error(msg)
  }
  return data as T
}

export function toOperatorSnapshot(user: ServerUser): OperatorProfileSnapshot {
  return {
    _id: user._id,
    operatorId: user.operatorId,
    firstName: user.profile?.firstName ?? '',
    lastName: user.profile?.lastName ?? '',
    email: user.profile?.email ?? '',
    role: user.role,
    avatarUrl: user.profile?.avatarUrl ?? '',
  }
}

export const operatorAuthApi = {
  login(email: string, password: string) {
    return postJson<OperatorLoginResponse>('/auth/login', { email, password })
  },
  refresh(refreshToken: string) {
    return postJson<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
      refreshToken,
    })
  },
}
