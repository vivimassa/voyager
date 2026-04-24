'use client'

import { Suspense, useEffect, useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, LogIn, Plane } from 'lucide-react'
import {
  operatorAuthApi,
  toOperatorSnapshot,
} from '@/lib/operator-auth-api'
import {
  useIsOperatorAuthed,
  useOperatorAuthStore,
} from '@/stores/operator-auth-store'

/**
 * Operator sign-in for the agent dashboard. POSTs /auth/login (same endpoint
 * used by ops elsewhere) and stores the JWT pair in the operator store.
 */
export default function AgentLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b1220]" />}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') ?? '/agent/bookings'
  const isAuthed = useIsOperatorAuthed()
  const setSession = useOperatorAuthStore((s) => s.setSession)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthed) router.replace(redirect)
  }, [isAuthed, redirect, router])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await operatorAuthApi.login(email.trim(), password)
      setSession({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        operator: toOperatorSnapshot(res.user),
      })
      router.replace(redirect)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-[#0b1220]">
      <div className="w-full max-w-[400px] rounded-2xl border border-white/10 bg-[#111827] p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1d4ed8]">
            <Plane className="h-5 w-5 text-white" strokeWidth={2.25} />
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white">Voyager Agent</div>
            <div className="text-[13px] text-white/60">Concierge operations</div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-white/70">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@voyager.vn"
              className="h-11 px-3 rounded-lg bg-white/5 border border-white/10 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#3E7BFA]"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-white/70">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 px-3 rounded-lg bg-white/5 border border-white/10 text-[14px] text-white focus:outline-none focus:ring-2 focus:ring-[#3E7BFA]"
            />
          </label>

          {error ? (
            <div className="text-[13px] text-[#fca5a5] bg-[#7f1d1d]/30 border border-[#7f1d1d]/60 rounded-lg px-3 py-2">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-[#3E7BFA] text-white font-semibold hover:bg-[#2c67e4] disabled:opacity-60 transition-colors"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="h-4 w-4" />
            )}
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-[12px] text-white/40">
          Voyager concierge operations portal. Customer site visitors — head to{' '}
          <a href="/" className="underline hover:text-white/70">
            voyager.vn
          </a>
          .
        </p>
      </div>
    </div>
  )
}
