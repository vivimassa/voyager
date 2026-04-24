'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'
import { useBrand } from '@/hooks/use-brand'
import { useT } from '@/i18n/use-t'

export default function LoginPage() {
  const t = useT()
  const { login } = useAuth()
  const brand = useBrand()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      setError(t.login.errorMissing)
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      await login(email.trim(), password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-vg-surface-muted grid place-items-center p-6">
      <div className="w-full max-w-[420px]">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-6">
          <span className="grid place-items-center w-11 h-11 rounded-[12px] bg-vg-accent text-white font-display font-bold text-2xl">
            {brand.mark}
          </span>
          <span className="font-display font-semibold text-2xl text-vg-text">{brand.name}</span>
        </Link>

        <form onSubmit={handleSubmit} className="bg-white border border-vg-border rounded-xl p-8 shadow-[0_4px_16px_rgba(16,24,40,0.06)]">
          <h1 className="font-display text-2xl font-bold text-vg-text text-center">{t.login.title}</h1>
          <p className="text-sm text-vg-text-muted text-center mt-1">{t.login.sub}</p>

          <div className="mt-6 space-y-4">
            <Field label={t.login.email}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" autoComplete="email" disabled={submitting}
                className={inputClass} />
            </Field>
            <Field label={t.login.password}>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" autoComplete="current-password" disabled={submitting}
                className={inputClass} />
              <div className="mt-1.5 text-right">
                <Link href="/login/forgot-password" className="text-xs text-vg-cta font-semibold hover:underline">{t.login.forgotLink}</Link>
              </div>
            </Field>
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">{error}</div>
          )}

          <button type="submit" disabled={submitting}
            className="mt-5 w-full h-12 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm disabled:opacity-50">
            {submitting ? t.login.submitting : t.login.submit}
          </button>

          <div className="mt-4 text-center text-xs text-vg-text-muted">
            {t.login.guestPrompt} <Link href="/destinations" className="text-vg-cta font-semibold hover:underline">{t.login.guestCta}</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputClass =
  'w-full h-11 bg-white border border-vg-border-strong rounded-lg px-3 text-sm text-vg-text placeholder:text-vg-text-subtle focus:outline-none focus:border-vg-cta'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold text-vg-text uppercase tracking-wide">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}
