'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@skyhub/api'
import { useBrand } from '@/hooks/use-brand'
import { useT } from '@/i18n/use-t'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vg-surface-muted" />}>
      <Inner />
    </Suspense>
  )
}

function Inner() {
  const t = useT()
  const brand = useBrand()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password || password.length < 8) { setError(t.reset.errorShort); return }
    if (password !== confirm) { setError(t.reset.errorMismatch); return }
    if (!token) { setError(t.reset.errorNoToken); return }
    setError(null); setSubmitting(true)
    try {
      await api.resetPassword(token, password)
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-vg-surface-muted grid place-items-center p-6">
      <div className="w-full max-w-[420px]">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-6">
          <span className="grid place-items-center w-11 h-11 rounded-[12px] bg-vg-accent text-white font-display font-bold text-2xl">{brand.mark}</span>
          <span className="font-display font-semibold text-2xl text-vg-text">{brand.name}</span>
        </Link>
        <div className="bg-white border border-vg-border rounded-xl p-8 shadow-[0_4px_16px_rgba(16,24,40,0.06)]">
          {!token && !done ? (
            <div className="text-center space-y-3">
              <div className="mx-auto grid place-items-center w-12 h-12 rounded-full bg-red-50 text-red-600 text-2xl">!</div>
              <h1 className="font-display text-xl font-bold text-vg-text">{t.reset.invalidTitle}</h1>
              <p className="text-sm text-vg-text-muted">{t.reset.invalidBody}</p>
              <Link href="/login/forgot-password" className="inline-block text-sm font-semibold text-vg-cta hover:underline">{t.reset.requestNew}</Link>
            </div>
          ) : done ? (
            <div className="text-center space-y-3">
              <div className="mx-auto grid place-items-center w-12 h-12 rounded-full bg-vg-accent/15 text-vg-accent text-2xl">✓</div>
              <h1 className="font-display text-xl font-bold text-vg-text">{t.reset.doneTitle}</h1>
              <p className="text-sm text-vg-text-muted">{t.reset.doneBody}</p>
              <Link href="/login" className="block w-full h-12 leading-[48px] rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm">{t.reset.signIn}</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h1 className="font-display text-2xl font-bold text-vg-text text-center">{t.reset.title}</h1>
              <p className="text-sm text-vg-text-muted text-center">{t.reset.sub}</p>
              <label className="block">
                <span className="text-[11px] font-bold text-vg-text uppercase tracking-wide">{t.reset.newPassword}</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" autoFocus
                  className="mt-1 w-full h-11 bg-white border border-vg-border-strong rounded-lg px-3 text-sm focus:outline-none focus:border-vg-cta" />
              </label>
              <label className="block">
                <span className="text-[11px] font-bold text-vg-text uppercase tracking-wide">{t.reset.confirmPassword}</span>
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password"
                  className="mt-1 w-full h-11 bg-white border border-vg-border-strong rounded-lg px-3 text-sm focus:outline-none focus:border-vg-cta" />
              </label>
              {error && <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">{error}</div>}
              <button type="submit" disabled={submitting} className="w-full h-12 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm disabled:opacity-50">
                {submitting ? t.reset.submitting : t.reset.submit}
              </button>
              <div className="text-center">
                <Link href="/login" className="text-xs text-vg-text-muted hover:text-vg-text">{t.reset.back}</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
