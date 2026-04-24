'use client'

/**
 * JourneyMap — horizontal Doorstep→Destination timeline.
 * Five touchpoints: Home → Private transfer → Airport → Flight → Destination.
 * Each node is a button opening a popover with a short service narrative and
 * a CTA that either deep-links into the destinations index filtered by service
 * or scrolls to the bundles section.
 *
 * On mobile (<md) the rail collapses to a vertical stack with inline details.
 */
import { useRef, useState, type ComponentType, type SVGProps } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Home, Car, Plane, PlaneTakeoff, Hotel } from 'lucide-react'
import { useT } from '@/i18n/use-t'

type NodeKey = 'home' | 'transfer' | 'airport' | 'flight' | 'destination'
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

type NodeDef = {
  key: NodeKey
  Icon: IconComponent
  labelKey: 'homeLabel' | 'transferLabel' | 'airportLabel' | 'flightLabel' | 'destinationLabel'
  titleKey: 'homeTitle' | 'transferTitle' | 'airportTitle' | 'flightTitle' | 'destinationTitle'
  bodyKey: 'homeBody' | 'transferBody' | 'airportBody' | 'flightBody' | 'destinationBody'
  ctaKey?: 'addToBundle' | 'pickVehicle' | 'seeBundles'
  ctaHref?: string
}

const NODES: NodeDef[] = [
  { key: 'home',        Icon: Home,         labelKey: 'homeLabel',        titleKey: 'homeTitle',        bodyKey: 'homeBody',        ctaKey: 'addToBundle', ctaHref: '#bundles' },
  { key: 'transfer',    Icon: Car,          labelKey: 'transferLabel',    titleKey: 'transferTitle',    bodyKey: 'transferBody',    ctaKey: 'pickVehicle', ctaHref: '/destinations?service=pickup' },
  { key: 'airport',     Icon: Plane,        labelKey: 'airportLabel',     titleKey: 'airportTitle',     bodyKey: 'airportBody',     ctaKey: 'addToBundle', ctaHref: '/destinations?service=fastTrack' },
  { key: 'flight',      Icon: PlaneTakeoff, labelKey: 'flightLabel',      titleKey: 'flightTitle',      bodyKey: 'flightBody' },
  { key: 'destination', Icon: Hotel,        labelKey: 'destinationLabel', titleKey: 'destinationTitle', bodyKey: 'destinationBody', ctaKey: 'seeBundles',  ctaHref: '#bundles' },
]

export function JourneyMap() {
  const t = useT()
  const [activeKey, setActiveKey] = useState<NodeKey>('home')
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 40%'],
  })
  const railFill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const active = NODES.find((n) => n.key === activeKey)!

  return (
    <section
      ref={sectionRef}
      className="relative px-6 md:px-10 py-12 md:py-16 bg-gradient-to-b from-white via-[#FAF6EF] to-white"
      aria-labelledby="journey-map-heading"
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <div className="text-[11px] tracking-[0.22em] uppercase font-semibold text-vg-accent mb-2">
            {t.journeyMap.eyebrow}
          </div>
          <h2
            id="journey-map-heading"
            className="font-display text-2xl md:text-4xl font-bold text-vg-text tracking-[-0.015em] max-w-[720px] mx-auto"
          >
            {t.journeyMap.heading}
          </h2>
          <p className="mt-3 text-sm md:text-[15px] text-vg-text-muted max-w-[520px] mx-auto leading-relaxed">
            {t.journeyMap.sub}
          </p>
        </div>

        {/* Desktop rail */}
        <div className="hidden md:block relative" aria-label="Journey steps" role="group">
          {/* Rail track */}
          <div className="absolute left-[10%] right-[10%] top-[34px] h-[2px] rounded-full bg-vg-border" aria-hidden />
          {/* Rail progress fill */}
          <motion.div
            className="absolute left-[10%] top-[34px] h-[2px] rounded-full bg-gradient-to-r from-vg-accent via-vg-cta to-amber-500"
            style={{ width: railFill, maxWidth: '80%' }}
            aria-hidden
          />

          <div className="relative grid grid-cols-5">
            {NODES.map((n, i) => {
              const isActive = n.key === activeKey
              const Icon = n.Icon
              return (
                <button
                  key={n.key}
                  type="button"
                  onClick={() => setActiveKey(n.key)}
                  onMouseEnter={() => setActiveKey(n.key)}
                  className="group flex flex-col items-center gap-2 outline-none"
                  aria-pressed={isActive}
                  aria-label={t.journeyMap[n.labelKey]}
                >
                  <div
                    className={`relative grid place-items-center w-[68px] h-[68px] rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-white ring-[3px] ring-vg-accent shadow-[0_10px_30px_rgba(14,165,95,0.22)] -translate-y-0.5 text-vg-accent'
                        : 'bg-white ring-2 ring-vg-border group-hover:ring-vg-accent/50 text-vg-text-muted group-hover:text-vg-accent'
                    }`}
                  >
                    <Icon width={26} height={26} strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-[10px] tracking-[0.18em] uppercase font-semibold ${
                        isActive ? 'text-vg-accent' : 'text-vg-text-subtle'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div
                      className={`font-display text-[13px] md:text-sm font-bold mt-0.5 ${
                        isActive ? 'text-vg-text' : 'text-vg-text-muted'
                      }`}
                    >
                      {t.journeyMap[n.labelKey]}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Detail panel */}
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 mx-auto max-w-[560px] rounded-xl bg-white border border-vg-border shadow-[0_12px_36px_rgba(15,23,42,0.06)] p-5"
            role="region"
            aria-live="polite"
          >
            <div className="text-[11px] tracking-[0.2em] uppercase font-semibold text-vg-accent">
              {t.journeyMap[active.labelKey]}
            </div>
            <div className="mt-1 font-display text-lg md:text-xl font-bold text-vg-text">
              {t.journeyMap[active.titleKey]}
            </div>
            <p className="mt-2 text-[14px] text-vg-text-muted leading-relaxed">
              {t.journeyMap[active.bodyKey]}
            </p>
            {active.ctaKey && active.ctaHref && (
              <Link
                href={active.ctaHref}
                className="inline-flex items-center gap-2 mt-4 px-4 h-9 rounded-full bg-vg-text text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                {t.journeyMap[active.ctaKey]}
              </Link>
            )}
          </motion.div>
        </div>

        {/* Mobile vertical */}
        <ol className="md:hidden relative pl-8 space-y-6">
          <div className="absolute left-[22px] top-3 bottom-3 w-[2px] bg-vg-border" aria-hidden />
          {NODES.map((n, i) => {
            const Icon = n.Icon
            return (
            <li key={n.key} className="relative">
              <div className="absolute -left-[26px] top-1 grid place-items-center w-[44px] h-[44px] rounded-full bg-white ring-2 ring-vg-accent text-vg-accent">
                <Icon width={20} height={20} strokeWidth={1.75} aria-hidden />
              </div>
              <div className="ml-6">
                <div className="text-[10px] tracking-[0.2em] uppercase font-semibold text-vg-accent">
                  {String(i + 1).padStart(2, '0')} · {t.journeyMap[n.labelKey]}
                </div>
                <div className="font-display text-lg font-bold text-vg-text mt-1">
                  {t.journeyMap[n.titleKey]}
                </div>
                <p className="text-sm text-vg-text-muted leading-relaxed mt-1">
                  {t.journeyMap[n.bodyKey]}
                </p>
                {n.ctaKey && n.ctaHref && (
                  <Link
                    href={n.ctaHref}
                    className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-vg-cta hover:underline"
                  >
                    {t.journeyMap[n.ctaKey]}
                  </Link>
                )}
              </div>
            </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
