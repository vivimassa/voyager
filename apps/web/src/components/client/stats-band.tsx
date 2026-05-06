'use client'

import { useT } from '@/i18n/use-t'

export function StatsBand() {
  const t = useT()
  const stats = [
    { value: t.stats.customersValue, label: t.stats.customers },
    { value: t.stats.satisfactionValue, label: t.stats.satisfaction },
    { value: t.stats.repeatValue, label: t.stats.repeat },
  ]
  return (
    <section className="relative bg-slate-900 text-white px-6 md:px-10 py-14 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-vg-cta/15 via-transparent to-vg-accent/15 pointer-events-none" />
      <div className="relative max-w-[1100px] mx-auto">
        <header className="text-center mb-10">
          <span className="inline-block text-[11px] tracking-[0.18em] uppercase font-semibold text-vg-accent">
            {t.stats.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
            {t.stats.heading}
          </h2>
        </header>
        <dl className="grid grid-cols-3 gap-4 md:gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-3xl md:text-5xl font-bold text-white tabular-nums">{s.value}</dt>
              <dd className="mt-2 text-xs md:text-sm text-white/70 uppercase tracking-wide">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
