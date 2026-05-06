'use client'

import Link from 'next/link'
import { useT } from '@/i18n/use-t'

export function FaqTeaser() {
  const t = useT()
  return (
    <section className="bg-vg-bg px-6 md:px-10 py-14 md:py-16">
      <div className="max-w-[1100px] mx-auto bg-white border border-vg-border rounded-2xl p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <span className="inline-block text-[11px] tracking-[0.18em] uppercase font-semibold text-vg-cta">
            {t.faqTeaser.eyebrow}
          </span>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-vg-text tracking-tight">
            {t.faqTeaser.heading}
          </h2>
          <p className="mt-2 text-sm md:text-[15px] text-vg-text-muted max-w-[560px] leading-relaxed">
            {t.faqTeaser.sub}
          </p>
        </div>
        <Link
          href="/faq"
          className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-vg-text hover:bg-vg-text/90 text-white font-bold text-sm transition-all whitespace-nowrap"
        >
          {t.faqTeaser.cta}
        </Link>
      </div>
    </section>
  )
}
