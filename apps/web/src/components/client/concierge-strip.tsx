'use client'

/**
 * ConciergeStrip — thin band with live-feel status phrases that rotate, plus
 * Zalo / WhatsApp quick-message CTA. Visual indicator that a real human is
 * one tap away throughout the journey.
 */
import { useEffect, useState } from 'react'
import { useT } from '@/i18n/use-t'

export function ConciergeStrip() {
  const t = useT()
  const phrases = [t.concierge.driverStatus, t.concierge.bagsStatus]
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 3800)
    return () => clearInterval(id)
  }, [phrases.length])

  return (
    <section className="px-6 md:px-10 -mt-2 mb-8">
      <div className="max-w-[1040px] mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-2xl bg-vg-text text-white px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-semibold text-white/70 shrink-0">
          <span className="relative inline-flex w-2 h-2" aria-hidden>
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
          </span>
          {t.concierge.liveLabel}
        </span>
        <div className="flex-1 text-center sm:text-left">
          <span
            key={idx}
            className="inline-block text-sm md:text-base font-medium animate-[fadeIn_0.4s_ease-out]"
          >
            {phrases[idx]}
          </span>
        </div>
        <div className="flex gap-2 shrink-0">
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-white text-vg-text text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            <ZaloMark />
            Zalo
          </a>
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors"
          >
            <WaMark />
            WhatsApp
          </a>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

function ZaloMark() {
  return (
    <span
      className="grid place-items-center w-5 h-5 rounded-[5px] bg-[#0068FF] text-white text-[10px] font-bold"
      aria-hidden
    >
      Z
    </span>
  )
}
function WaMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.5 0 .17 5.32.17 11.87c0 2.1.55 4.14 1.6 5.95L.06 24l6.36-1.67a11.86 11.86 0 0 0 5.63 1.43h.01c6.54 0 11.87-5.32 11.87-11.87 0-3.17-1.24-6.16-3.41-8.41zM12.06 21.8h-.01a9.86 9.86 0 0 1-5.03-1.37l-.36-.21-3.77 1 1-3.67-.23-.37a9.9 9.9 0 1 1 18.3-5.31c0 5.45-4.44 9.93-9.9 9.93z" />
    </svg>
  )
}
