'use client'

import { useState } from 'react'
import Link from 'next/link'
import { api } from '@skyhub/api'
import { useBrand } from '@/hooks/use-brand'
import { useT } from '@/i18n/use-t'

export default function ForgotPasswordPage() {
  const t = useT()
  const brand = useBrand()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) { setError(t.forgot.errorMissing); return }
    setError(null); setSubmitting(true)
    try {
      await api.forgotPassword(email.trim())
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
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
          {sent ? (
            <div className="text-center space-y-3">
              <div className="mx-auto grid place-items-center w-12 h-12 rounded-full bg-vg-accent/15 text-vg-accent text-2xl">✓</div>
              <h1 className="font-display text-xl font-bold text-vg-text">{t.forgot.sentTitle}</h1>
              <p className="text-sm text-vg-text-muted">{t.forgot.sentBody(email)}</p>
              <Link href="/login" className="inline-block text-sm font-semibold text-vg-cta hover:underline">{t.forgot.back}</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h1 className="font-display text-2xl font-bold text-vg-text text-center">{t.forgot.title}</h1>
              <p className="text-sm text-vg-text-muted text-center">{t.forgot.sub}</p>
              <label className="block">
                <span className="text-[11px] font-bold text-vg-text uppercase tracking-wide">{t.forgot.email}</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" autoFocus
                  className="mt-1 w-full h-11 bg-white border border-vg-border-strong rounded-lg px-3 text-sm text-vg-text focus:outline-none focus:border-vg-cta" />
              </label>
              {error && <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">{error}</div>}
              <button type="submit" disabled={submitting} className="w-full h-12 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm disabled:opacity-50">
                {submitting ? t.forgot.submitting : t.forgot.submit}
              </button>
              <div className="text-center">
                <Link href="/login" className="text-xs text-vg-text-muted hover:text-vg-text">{t.forgot.back}</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
