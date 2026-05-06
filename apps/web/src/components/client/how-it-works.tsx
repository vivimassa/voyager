'use client'

import { useT } from '@/i18n/use-t'

export function HowItWorks() {
  const t = useT()
  const steps = [
    { n: '1', title: t.home.howStep1Title, body: t.home.howStep1Body },
    { n: '2', title: t.home.howStep2Title, body: t.home.howStep2Body },
    { n: '3', title: t.home.howStep3Title, body: t.home.howStep3Body },
  ]
  return (
    <section id="how-it-works" className="bg-vg-bg px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight text-center mb-12">
          {t.home.howHeading}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="bg-white rounded-xl p-6 border border-vg-border flex gap-4">
              <div className="flex-shrink-0 grid place-items-center w-10 h-10 rounded-full bg-vg-cta/10 text-vg-cta font-display font-bold">
                {s.n}
              </div>
              <div>
                <div className="font-display text-lg font-bold text-vg-text">{s.title}</div>
                <p className="text-sm text-vg-text-muted mt-1 leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
