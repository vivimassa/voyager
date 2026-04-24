'use client'

/**
 * PeaceOfMind — replaces WhyVoyager on home.
 * Four service-saturated pillars with human imagery (staff / guests) over
 * icon-tiles. Copy comes from `home.why*` keys (now peace-of-mind framing).
 */
import { useT } from '@/i18n/use-t'

const PHOTOS = [
  // 1 — greeter at arrivals
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  // 2 — concierge on phone (one contact)
  'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?auto=format&fit=crop&w=1200&q=80',
  // 3 — hands-free airport walk
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
  // 4 — porter with luggage
  'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=80',
]

export function PeaceOfMind() {
  const t = useT()
  const items = [
    { title: t.home.why1Title, body: t.home.why1Body, photo: PHOTOS[0] },
    { title: t.home.why2Title, body: t.home.why2Body, photo: PHOTOS[1] },
    { title: t.home.why3Title, body: t.home.why3Body, photo: PHOTOS[2] },
    { title: t.home.why4Title, body: t.home.why4Body, photo: PHOTOS[3] },
  ]

  return (
    <section
      className="relative px-6 md:px-10 py-14 md:py-20 bg-white"
      aria-labelledby="peace-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-[720px] mb-8 md:mb-10">
          <div className="text-[11px] tracking-[0.22em] uppercase font-semibold text-vg-accent mb-2">
            {t.seamless.eyebrow}
          </div>
          <h2
            id="peace-heading"
            className="font-sans text-2xl md:text-[34px] font-extrabold text-vg-text tracking-tight leading-[1.15]"
          >
            {t.home.whyHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {items.map((it, i) => (
            <article
              key={i}
              className="group relative rounded-3xl overflow-hidden bg-white ring-1 ring-vg-border shadow-[0_18px_60px_rgba(15,23,42,0.05)] hover:shadow-[0_24px_72px_rgba(15,23,42,0.10)] transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                <div
                  className="relative md:w-[44%] h-[200px] md:h-auto bg-cover bg-center"
                  style={{ backgroundImage: `url('${it.photo}')` }}
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 md:to-transparent" />
                </div>
                <div className="flex-1 p-6 md:p-7 flex flex-col justify-center">
                  <h3 className="font-sans text-lg md:text-[19px] font-extrabold text-vg-text tracking-tight">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-vg-text leading-relaxed">
                    {it.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
