/**
 * Bearer-token fetch for agent-side endpoints. Reads the access token from
 * the operator auth store and auto-refreshes once on 401.
 */
import { useOperatorAuthStore } from '@/stores/operator-auth-store'
import { operatorAuthApi } from './operator-auth-api'

let _refreshInFlight: Promise<{ accessToken: string; refreshToken: string } | null> | null = null

async function refreshOnce(): Promise<{ accessToken: string; refreshToken: string } | null> {
  const state = useOperatorAuthStore.getState()
  const refresh = state.refreshToken
  if (!refresh) return null

  if (!_refreshInFlight) {
    _refreshInFlight = (async () => {
      try {
        const pair = await operatorAuthApi.refresh(refresh)
        const s = useOperatorAuthStore.getState()
        if (s.operator) {
          s.setSession({
            accessToken: pair.accessToken,
            refreshToken: pair.refreshToken,
            operator: s.operator,
          })
        }
        return pair
      } catch {
        useOperatorAuthStore.getState().clearSession()
        return null
      }
    })().finally(() => {
      _refreshInFlight = null
    })
  }
  return _refreshInFlight
}

export async function operatorAuthedFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  const token = useOperatorAuthStore.getState().accessToken
  const headers = new Headers(init.headers)
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let res = await fetch(input, { ...init, headers })

  if (res.status === 401) {
    const pair = await refreshOnce()
    if (pair) {
      headers.set('Authorization', `Bearer ${pair.accessToken}`)
      res = await fetch(input, { ...init, headers })
    }
  }
  return res
}
