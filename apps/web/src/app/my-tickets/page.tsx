'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { useT } from '@/i18n/use-t'

export default function MyTicketsLanding() {
  const t = useT()
  const router = useRouter()
  const [bookingNumber, setBookingNumber] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const trimmed = bookingNumber.trim()
    if (!trimmed) {
      setError('Please enter your booking reference (VG-…) or Fast Track ID (FT-…).')
      return
    }
    router.push(`/checkout/success/${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1 max-w-[640px] w-full mx-auto px-6 md:px-10 py-12 md:py-20">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight">{t.ticket.lookupTitle}</h1>
        <p className="mt-2 text-vg-text-muted">{t.ticket.lookupSub}</p>

        <form onSubmit={handleSubmit} className="mt-8 bg-white border border-vg-border rounded-2xl p-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-vg-text uppercase tracking-wide">Booking ref or Fast Track ID</span>
            <input
              type="text"
              value={bookingNumber}
              onChange={(e) => setBookingNumber(e.target.value.toUpperCase())}
              placeholder="VG-2026-XXXXXX or FT-XXXXXXXX"
              className="h-12 bg-white border border-vg-border-strong rounded-lg px-3 text-base text-vg-text placeholder:text-vg-text-subtle focus:outline-none focus:border-vg-cta font-mono"
            />
          </label>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            className="h-12 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm transition-colors"
          >
            Look up
          </button>
        </form>

        <p className="mt-6 text-sm text-vg-text-muted">
          Lost your reference? <Link href="/about" className="text-vg-cta hover:underline">Contact our hotline</Link> with your travel date and phone number.
        </p>
      </main>
      <SiteFooter />
    </div>
  )
}
