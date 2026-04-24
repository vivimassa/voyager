'use client'

import Link from 'next/link'
import { useState } from 'react'
import { TopNav } from '@/components/client/top-nav'
import { useT } from '@/i18n/use-t'

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-vg-accent/15 border border-vg-accent/30 grid place-items-center font-display font-bold text-vg-accent text-lg">
        {num}
      </div>
      <div className="pt-1.5">
        <div className="font-display text-xl font-semibold text-white mb-1">{title}</div>
        <p className="text-[15px] text-white/65 leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-white text-[15px]">{q}</span>
        <span className={`text-vg-accent text-xl leading-none transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <p className="pb-5 text-[14px] text-white/65 leading-relaxed">{a}</p>
      )}
    </div>
  )
}

export default function HelpPage() {
  const t = useT()

  return (
    <div className="bg-vg-bg text-white min-h-screen">
      <div className="relative">
        <TopNav />
        <div className="px-6 md:px-12 pt-32 pb-16 max-w-[860px] mx-auto">
          <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-3">
            {t.help.eyebrow}
          </div>
          <h1
            className="font-display font-semibold leading-[1.05] tracking-[-0.02em] text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {t.help.heading}
          </h1>
          <p className="mt-5 text-white/65 max-w-[580px] text-[15px] leading-relaxed">
            {t.help.sub}
          </p>
        </div>
      </div>

      <div className="px-6 md:px-12 pb-28 max-w-[860px] mx-auto flex flex-col gap-20">

        {/* How it works */}
        <section>
          <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-8">
            {t.help.howItWorksTitle}
          </div>
          <div className="flex flex-col gap-8">
            <Step num="1" title={t.help.step1Title} body={t.help.step1Body} />
            <div className="ml-[22px] w-px h-6 bg-white/10" />
            <Step num="2" title={t.help.step2Title} body={t.help.step2Body} />
            <div className="ml-[22px] w-px h-6 bg-white/10" />
            <Step num="3" title={t.help.step3Title} body={t.help.step3Body} />
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-8">
            {t.help.faqTitle}
          </div>
          <div className="flex flex-col">
            <Faq q={t.help.q1} a={t.help.a1} />
            <Faq q={t.help.q2} a={t.help.a2} />
            <Faq q={t.help.q3} a={t.help.a3} />
            <Faq q={t.help.q4} a={t.help.a4} />
            <Faq q={t.help.q5} a={t.help.a5} />
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-[22px] bg-vg-surface border border-vg-border p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white mb-2">
              {t.help.contactTitle}
            </h2>
            <p className="text-[14px] text-white/65 max-w-[440px] leading-relaxed">
              {t.help.contactBody}
            </p>
          </div>
          <Link
            href="https://zalo.me/84000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-vg-accent hover:bg-vg-accent-hover text-white font-semibold text-sm transition-colors"
          >
            {t.help.contactCta}
          </Link>
        </section>

        {/* Back to browsing */}
        <div className="text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-vg-cta hover:bg-vg-cta-hover text-white font-semibold text-sm transition-colors shadow-[0_8px_24px_rgba(29,78,216,0.35)]"
          >
            {t.common.bookNow}
          </Link>
        </div>
      </div>
    </div>
  )
}
