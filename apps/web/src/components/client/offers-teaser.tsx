'use client'

import Link from 'next/link'
import { useT } from '@/i18n/use-t'

export function OffersTeaser() {
  const t = useT()
  return (
    <section className="bg-vg-bg px-6 md:px-10 py-16">
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-vg-warm mb-2">
            {t.offers.eyebrow}
          </div>
          <h3 className="font-display text-3xl font-bold text-vg-text">{t.offers.heading}</h3>
          <p className="mt-2 text-vg-text-muted max-w-[520px]">{t.offers.sub}</p>
        </div>
        <Link
          href="/deals"
          className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-vg-cta hover:bg-vg-cta-hover text-white font-semibold text-sm shadow-[0_4px_14px_rgba(29,78,216,0.3)]"
        >
          {t.offers.cta}
        </Link>
      </div>
    </section>
  )
}
