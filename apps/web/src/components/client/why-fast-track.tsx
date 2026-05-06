'use client'

import { useT } from '@/i18n/use-t'

export function WhyFastTrack() {
  const t = useT()
  const pillars = [
    {
      icon: <CheckIcon />,
      title: t.whyFastTrack.pillarCheckinTitle,
      body: t.whyFastTrack.pillarCheckinBody,
    },
    {
      icon: <BagIcon />,
      title: t.whyFastTrack.pillarBaggageTitle,
      body: t.whyFastTrack.pillarBaggageBody,
    },
    {
      icon: <ShieldIcon />,
      title: t.whyFastTrack.pillarSecurityTitle,
      body: t.whyFastTrack.pillarSecurityBody,
    },
    {
      icon: <PassportIcon />,
      title: t.whyFastTrack.pillarImmigrationTitle,
      body: t.whyFastTrack.pillarImmigrationBody,
    },
  ]

  return (
    <section className="bg-vg-bg px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto">
        <header className="text-center mb-12">
          <span className="inline-block text-[11px] tracking-[0.18em] uppercase font-semibold text-vg-cta">
            {t.whyFastTrack.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight">
            {t.whyFastTrack.heading}
          </h2>
          <p className="mt-3 text-vg-text-muted max-w-[640px] mx-auto text-[15px] leading-relaxed">
            {t.whyFastTrack.sub}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl border border-vg-border p-6 hover:border-vg-cta hover:shadow-lg transition-all">
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-vg-cta/10 text-vg-cta">
                {p.icon}
              </div>
              <div className="mt-4 font-display text-lg font-bold text-vg-text leading-tight">{p.title}</div>
              <p className="mt-2 text-sm text-vg-text-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  )
}
function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 8V6a4 4 0 0 0-8 0v2"/><rect x="4" y="8" width="16" height="14" rx="2"/>
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}
function PassportIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="11" r="3"/><path d="M9 18h6"/>
    </svg>
  )
}
