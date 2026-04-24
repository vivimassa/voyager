'use client'

/**
 * AuthOverlay — Voyager client portal sign-in / sign-up modal.
 *
 * Flows:
 *   1. Phone OTP — the default, primary path for Vietnamese travellers
 *   2. Email + password (collapsed under "More options")
 *   3. Google / Facebook / Biometric — shown as buttons; backend currently
 *      returns 501, so they present "coming soon" toasts inline
 *
 * Design: editorial dark panel, emerald accent, not Horizon glass.
 */

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useClientAuthStore } from '@/stores/client-auth-store'
import { useBrand } from '@/hooks/use-brand'
import { clientAuthApi } from '@/lib/client-auth-api'

type Step = 'phone' | 'otp' | 'email-signin' | 'email-signup'

export function AuthOverlay() {
  const isOpen = useClientAuthStore((s) => s.isOpen)
  const mode = useClientAuthStore((s) => s.mode)
  const closeAuth = useClientAuthStore((s) => s.closeAuth)
  const setMode = useClientAuthStore((s) => s.setMode)
  const setSession = useClientAuthStore((s) => s.setSession)

  const brand = useBrand()
  const [step, setStep] = useState<Step>('phone')
  const [countryCode, setCountryCode] = useState('+84')
  const [phone, setPhone] = useState('')
  const [otpSentPhone, setOtpSentPhone] = useState('')
  const [code, setCode] = useState('')
  const [resendSec, setResendSec] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [info, setInfo] = useState<string | null>(null)

  // Email fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const rootRef = useRef<HTMLDivElement>(null)

  // Reset everything when the overlay opens/closes
  useEffect(() => {
    if (!isOpen) return
    setStep('phone')
    setCountryCode('+84')
    setPhone('')
    setCode('')
    setOtpSentPhone('')
    setError(null)
    setInfo(null)
    setBusy(false)
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }, [isOpen])

  // Resend cooldown tick
  useEffect(() => {
    if (resendSec <= 0) return
    const t = window.setInterval(() => setResendSec((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => window.clearInterval(t)
  }, [resendSec])

  // Esc closes; lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuth()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeAuth])

  if (!isOpen) return null

  const isSignup = mode === 'signup'

  async function handleSendOtp(e?: FormEvent) {
    e?.preventDefault()
    setError(null)
    setInfo(null)
    if (!phone.trim()) {
      setError('Please enter your phone number.')
      return
    }
    setBusy(true)
    try {
      const res = await clientAuthApi.sendOtp(phone, countryCode, isSignup ? 'signup' : 'signin')
      setOtpSentPhone(res.phone)
      setStep('otp')
      setResendSec(30)
      setInfo('Check the server console for the code (dev mode).')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send code.')
    } finally {
      setBusy(false)
    }
  }

  async function handleVerifyOtp(e?: FormEvent) {
    e?.preventDefault()
    setError(null)
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit code from the SMS.')
      return
    }
    setBusy(true)
    try {
      const res = await clientAuthApi.verifyOtp(phone, countryCode, code)
      setSession({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        client: {
          _id: res.client._id,
          firstName: res.client.profile.firstName,
          lastName: res.client.profile.lastName,
          email: res.client.profile.email,
          phone: res.client.profile.phone,
          avatarUrl: res.client.profile.avatarUrl,
        },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not verify code.')
    } finally {
      setBusy(false)
    }
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const res =
        step === 'email-signup'
          ? await clientAuthApi.signup(email, password, firstName, lastName)
          : await clientAuthApi.login(email, password)
      setSession({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        client: {
          _id: res.client._id,
          firstName: res.client.profile.firstName,
          lastName: res.client.profile.lastName,
          email: res.client.profile.email,
          phone: res.client.profile.phone,
          avatarUrl: res.client.profile.avatarUrl,
        },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.')
    } finally {
      setBusy(false)
    }
  }

  async function handleSocial(kind: 'google' | 'facebook' | 'webauthn') {
    setError(null)
    try {
      if (kind === 'google') await clientAuthApi.google()
      if (kind === 'facebook') await clientAuthApi.facebook()
      if (kind === 'webauthn') await clientAuthApi.webauthnBegin()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Not available yet.')
    }
  }

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-overlay-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={closeAuth}
        className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md rounded-[20px] bg-vg-surface border border-vg-border shadow-[0_30px_80px_rgba(0,0,0,0.55)] overflow-hidden">
        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-vg-border flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="grid place-items-center w-8 h-8 rounded-[8px] bg-vg-accent text-white font-display font-bold">
                {brand.mark}
              </span>
              <span className="text-xs font-medium tracking-[0.14em] text-white/50 uppercase">
                {brand.name}
              </span>
            </div>
            <h2 id="auth-overlay-title" className="font-display text-2xl font-semibold text-white">
              {isSignup ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-sm text-white/55 mt-1">
              {isSignup
                ? 'Book airport pickup, hotels & tours in one place.'
                : 'Sign in to pick up where you left off.'}
            </p>
          </div>
          <button
            type="button"
            onClick={closeAuth}
            aria-label="Close"
            className="w-9 h-9 grid place-items-center rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {/* Phone step */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <label className="block">
                <span className="block text-xs font-medium text-white/65 mb-1.5">
                  Mobile number
                </span>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 rounded-[12px] bg-black/30 border border-vg-border text-white text-sm focus:outline-none focus:border-vg-accent min-w-[90px]"
                  >
                    <option value="+84">+84 🇻🇳</option>
                    <option value="+1">+1 🇺🇸</option>
                    <option value="+44">+44 🇬🇧</option>
                    <option value="+61">+61 🇦🇺</option>
                    <option value="+65">+65 🇸🇬</option>
                    <option value="+81">+81 🇯🇵</option>
                    <option value="+82">+82 🇰🇷</option>
                  </select>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoFocus
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="912 345 678"
                    className="flex-1 px-4 py-3 rounded-[12px] bg-black/30 border border-vg-border text-white placeholder-white/30 text-sm focus:outline-none focus:border-vg-accent"
                  />
                </div>
              </label>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={busy}
                className="w-full py-3.5 rounded-[12px] bg-vg-accent hover:bg-vg-accent-hover text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {busy ? 'Sending code…' : 'Send verification code'}
              </button>

              <Divider label="or continue with" />

              <div className="grid grid-cols-3 gap-2">
                <SocialBtn label="Google" onClick={() => handleSocial('google')} icon="G" />
                <SocialBtn label="Facebook" onClick={() => handleSocial('facebook')} icon="f" />
                <SocialBtn
                  label="Biometric"
                  onClick={() => handleSocial('webauthn')}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 11a3 3 0 0 0-3 3v4" />
                      <path d="M18 20a6 6 0 0 0-12 0" />
                      <path d="M12 2a10 10 0 0 0-9.54 13" />
                      <path d="M21.54 15A10 10 0 0 0 12 2" />
                    </svg>
                  }
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(isSignup ? 'email-signup' : 'email-signin')}
                className="w-full text-center text-sm text-white/60 hover:text-white transition-colors mt-1"
              >
                Use email and password instead
              </button>
            </form>
          )}

          {/* OTP step */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-sm text-white/70">
                We sent a 6-digit code to{' '}
                <span className="font-medium text-white">+{otpSentPhone}</span>.
              </div>

              <input
                type="text"
                inputMode="numeric"
                autoFocus
                maxLength={6}
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="••••••"
                className="w-full px-4 py-3 rounded-[12px] bg-black/30 border border-vg-border text-white text-center tracking-[0.5em] font-mono text-lg focus:outline-none focus:border-vg-accent"
              />

              {error && <p className="text-xs text-red-400">{error}</p>}
              {info && !error && <p className="text-xs text-white/50">{info}</p>}

              <button
                type="submit"
                disabled={busy}
                className="w-full py-3.5 rounded-[12px] bg-vg-accent hover:bg-vg-accent-hover text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {busy ? 'Verifying…' : 'Verify & continue'}
              </button>

              <div className="flex items-center justify-between text-xs text-white/50 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="hover:text-white transition-colors"
                >
                  ← Change number
                </button>
                <button
                  type="button"
                  disabled={resendSec > 0}
                  onClick={() => handleSendOtp()}
                  className="hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {resendSec > 0 ? `Resend in ${resendSec}s` : 'Resend code'}
                </button>
              </div>
            </form>
          )}

          {/* Email forms */}
          {(step === 'email-signin' || step === 'email-signup') && (
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              {step === 'email-signup' && (
                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    label="First name"
                    value={firstName}
                    onChange={setFirstName}
                    autoFocus
                  />
                  <TextField label="Last name" value={lastName} onChange={setLastName} />
                </div>
              )}

              <TextField
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={setEmail}
                autoFocus={step === 'email-signin'}
              />

              <TextField
                label="Password"
                type="password"
                autoComplete={step === 'email-signup' ? 'new-password' : 'current-password'}
                value={password}
                onChange={setPassword}
              />

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={busy}
                className="w-full py-3.5 rounded-[12px] bg-vg-accent hover:bg-vg-accent-hover text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {busy
                  ? 'Working…'
                  : step === 'email-signup'
                  ? 'Create account'
                  : 'Sign in'}
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-center text-sm text-white/60 hover:text-white transition-colors"
              >
                ← Back to phone sign-in
              </button>
            </form>
          )}
        </div>

        {/* Footer — mode switch */}
        <div className="px-7 py-4 bg-black/20 border-t border-vg-border text-center text-sm text-white/60">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-vg-accent hover:text-vg-accent-hover font-medium transition-colors"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              New to {brand.name}?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-vg-accent hover:text-vg-accent-hover font-medium transition-colors"
              >
                Create an account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── helpers ───

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-white/35 py-1">
      <div className="flex-1 h-px bg-vg-border" />
      {label}
      <div className="flex-1 h-px bg-vg-border" />
    </div>
  )
}

function SocialBtn({
  label,
  onClick,
  icon,
}: {
  label: string
  onClick: () => void
  icon: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="flex flex-col items-center justify-center gap-1 py-3 rounded-[12px] bg-white/5 hover:bg-white/10 border border-vg-border text-white/80 hover:text-white transition-colors"
    >
      <span className="grid place-items-center w-6 h-6 text-sm font-bold">{icon}</span>
      <span className="text-[10px] tracking-wide">{label}</span>
    </button>
  )
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  autoFocus,
  autoComplete,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: 'text' | 'email' | 'password'
  autoFocus?: boolean
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-white/65 mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-[12px] bg-black/30 border border-vg-border text-white placeholder-white/30 text-sm focus:outline-none focus:border-vg-accent"
      />
    </label>
  )
}
