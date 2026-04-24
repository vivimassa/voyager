'use client'

import Link from 'next/link'
import { useState } from 'react'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { useT } from '@/i18n/use-t'

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-vg-cta/10 text-vg-cta grid place-items-center font-display font-bold">
        {num}
      </div>
      <div>
        <div className="font-display text-lg font-bold text-vg-text">{title}</div>
        <p className="text-sm text-vg-text-muted mt-1 leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-vg-border">
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-4 py-4 text-left">
        <span className="font-semibold text-vg-text text-sm">{q}</span>
        <span className={`text-vg-cta text-xl leading-none transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <p className="pb-4 text-sm text-vg-text-muted leading-relaxed">{a}</p>}
    </div>
  )
}

export default function HelpPage() {
  const t = useT()
  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <TopNav />
      <div className="bg-vg-surface-muted border-b border-vg-border px-6 md:px-10 py-8">
        <div className="max-w-[860px] mx-auto">
          <nav className="text-xs text-vg-text-muted mb-2">
            <Link href="/" className="hover:underline">{t.destination.home}</Link>
            <span className="mx-1.5">›</span>
            <span className="text-vg-text">{t.nav.help}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight">{t.help.heading}</h1>
          <p className="mt-2 text-vg-text-muted max-w-[620px]">{t.help.sub}</p>
        </div>
      </div>

      <main className="flex-1 px-6 md:px-10 py-10 max-w-[860px] w-full mx-auto flex flex-col gap-10">
        <section className="bg-white rounded-xl border border-vg-border p-6">
          <h2 className="font-display text-xl font-bold text-vg-text mb-5">{t.help.howItWorksTitle}</h2>
          <div className="flex flex-col gap-6">
            <Step num="1" title={t.help.step1Title} body={t.help.step1Body} />
            <Step num="2" title={t.help.step2Title} body={t.help.step2Body} />
            <Step num="3" title={t.help.step3Title} body={t.help.step3Body} />
          </div>
        </section>

        <section className="bg-white rounded-xl border border-vg-border p-6">
          <h2 className="font-display text-xl font-bold text-vg-text mb-2">{t.help.faqTitle}</h2>
          <div className="flex flex-col">
            <Faq q={t.help.q1} a={t.help.a1} />
            <Faq q={t.help.q2} a={t.help.a2} />
            <Faq q={t.help.q3} a={t.help.a3} />
            <Faq q={t.help.q4} a={t.help.a4} />
            <Faq q={t.help.q5} a={t.help.a5} />
          </div>
        </section>

        <section className="bg-vg-cta text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold">{t.help.contactTitle}</h2>
            <p className="text-sm text-white/85 mt-1 max-w-[440px] leading-relaxed">{t.help.contactBody}</p>
          </div>
          <Link href="https://zalo.me/84000000000" target="_blank" rel="noopener noreferrer"
            className="h-12 px-6 inline-flex items-center rounded-lg bg-white text-vg-cta font-bold text-sm hover:bg-vg-surface-muted">
            {t.help.contactCta}
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
