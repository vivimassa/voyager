'use client'

import { useT } from '@/i18n/use-t'

const STATS = [
  { num: '12,400', unit: '+', key: 'stat1' },
  { num: '340',    unit: '+', key: 'stat2' },
  { num: '98',     unit: '%', key: 'stat3' },
  { num: '5',      unit: '×', key: 'stat4' },
] as const

export function TrustBand() {
  const t = useT()

  return (
    <section className="py-20 px-6 md:px-12 bg-[#050607] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
        {STATS.map((s) => (
          <div key={s.key}>
            <div className="font-display text-[56px] font-semibold leading-none tracking-[-0.02em] text-white">
              {s.num}
              <span className="text-2xl text-vg-accent ml-1">{s.unit}</span>
            </div>
            <div className="text-[13px] text-white/65 mt-3 leading-[1.5]">{t.trust[s.key]}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
