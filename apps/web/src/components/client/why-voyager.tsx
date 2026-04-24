'use client'

import { useT } from '@/i18n/use-t'

export function WhyVoyager() {
  const t = useT()
  const items = [
    { title: t.home.why1Title, body: t.home.why1Body, icon: PhoneIcon },
    { title: t.home.why2Title, body: t.home.why2Body, icon: CardIcon },
    { title: t.home.why3Title, body: t.home.why3Body, icon: BagIcon },
    { title: t.home.why4Title, body: t.home.why4Body, icon: GlobeIcon },
  ]
  return (
    <section className="px-6 md:px-10 py-16 md:py-20 max-w-[1200px] mx-auto">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight mb-10">
        {t.home.whyHeading}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => {
          const Icon = it.icon
          return (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-vg-accent/10 text-vg-accent grid place-items-center">
                <Icon />
              </div>
              <div className="font-display text-lg font-bold text-vg-text">{it.title}</div>
              <p className="text-sm text-vg-text-muted leading-relaxed">{it.body}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function CardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
}
function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
function GlobeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
