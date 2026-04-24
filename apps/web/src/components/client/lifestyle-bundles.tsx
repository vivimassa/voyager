'use client'

/**
 * LifestyleBundles — three persona cards (Business Elite / Family Care /
 * First-Class). Each card has an in-card destination picker. The "Plan my
 * trip" CTA fans the bundle's service keys out into real cart items priced
 * off the chosen destination, then sends the user to checkout.
 */
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { BUNDLES, SERVICE_KEY_TO_CART_TYPE, type Bundle } from '@/data/bundles'
import { DESTINATIONS, type Destination } from '@/data/destinations'
import { useCartStore } from '@/stores/cart-store'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'
import { useDestLocale } from '@/hooks/use-dest-locale'

export function LifestyleBundles() {
  const t = useT()
  const L = useDestLocale()
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  return (
    <section
      id="bundles"
      className="relative px-6 md:px-10 py-14 md:py-20 bg-white"
      aria-labelledby="bundles-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-[720px] mb-8 md:mb-10">
          <div className="text-[11px] tracking-[0.22em] uppercase font-semibold text-vg-accent mb-2">
            {t.bundles.eyebrow}
          </div>
          <h2
            id="bundles-heading"
            className="font-sans text-2xl md:text-[34px] font-extrabold text-vg-text tracking-tight leading-[1.15]"
          >
            {t.bundles.heading}
          </h2>
          <p className="mt-3 text-sm md:text-[15px] text-vg-text-muted leading-relaxed max-w-[580px]">
            {t.bundles.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {BUNDLES.map((b) => (
            <BundleCard key={b.id} bundle={b} L={L} t={t} formatFromVnd={formatFromVnd} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BundleCard({
  bundle,
  L,
  t,
  formatFromVnd,
}: {
  bundle: Bundle
  L: ReturnType<typeof useDestLocale>
  t: ReturnType<typeof useT>
  formatFromVnd: (vnd: number) => string
}) {
  const router = useRouter()
  const addToCart = useCartStore((s) => s.add)
  const [destSlug, setDestSlug] = useState<string>(DESTINATIONS[0].slug)

  const destination: Destination = useMemo(
    () => DESTINATIONS.find((d) => d.slug === destSlug) ?? DESTINATIONS[0],
    [destSlug],
  )

  const priceVnd = useMemo(
    () =>
      bundle.serviceKeys.reduce(
        (sum, k) => sum + (destination.services[k]?.priceVnd ?? 0),
        0,
      ),
    [bundle.serviceKeys, destination],
  )

  function onPlan() {
    const travelDate = ''
    bundle.serviceKeys.forEach((sk) => {
      const svc = destination.services[sk]
      if (!svc) return
      addToCart({
        id: `${bundle.id}-${destination.slug}-${sk}`,
        productId: `${destination.slug}:${sk}`,
        destinationSlug: destination.slug,
        airportCode: destination.airportCode,
        serviceType: SERVICE_KEY_TO_CART_TYPE[sk],
        title: L.serviceLabel(destination, sk),
        image: destination.photo,
        unitPriceVnd: svc.priceVnd,
        qty: 1,
        travelDate,
        meta: { bundle: bundle.id },
      })
    })
    router.push('/checkout')
  }

  return (
    <article
      className={`group relative flex flex-col rounded-3xl overflow-hidden bg-white ring-1 ${bundle.accent.ring} shadow-[0_18px_60px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_72px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all`}
    >
      <div
        className="relative h-[220px] bg-cover bg-center"
        style={{ backgroundImage: `url('${bundle.heroPhoto}')` }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span
          className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-[0.14em] uppercase font-semibold ${bundle.accent.chip}`}
        >
          {t.bundles[bundle.nameKey]}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-sans text-[19px] md:text-[20px] font-bold text-vg-text tracking-tight">
          {t.bundles[bundle.nameKey]}
        </h3>
        <p className="mt-2 text-[14px] text-vg-text leading-relaxed">
          {t.bundles[bundle.taglineKey]}
        </p>

        <div className="mt-5">
          <div className="text-[10px] tracking-[0.2em] uppercase font-semibold text-vg-text-subtle mb-2">
            {t.bundles.includesLabel}
          </div>
          <ul className="space-y-1.5">
            {bundle.inclusionKeys.map((k) => (
              <li key={k} className="flex items-start gap-2 text-[14px] text-vg-text">
                <Check width={16} height={16} strokeWidth={2.5} className="mt-1 shrink-0 text-vg-accent" aria-hidden />
                <span>{t.bundles[k]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-xl bg-vg-surface-muted p-3 flex items-center gap-3">
          <label className="text-[10px] tracking-[0.16em] uppercase font-semibold text-vg-text-subtle whitespace-nowrap">
            {L.vi ? 'Điểm đến' : 'Destination'}
          </label>
          <select
            value={destSlug}
            onChange={(e) => setDestSlug(e.target.value)}
            className="flex-1 bg-transparent text-sm font-semibold text-vg-text focus:outline-none"
          >
            {DESTINATIONS.map((d) => (
              <option key={d.slug} value={d.slug}>
                {L.name(d)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-auto pt-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase font-semibold text-vg-text-subtle">
              {t.bundles.fromLabel}
            </div>
            <div className="font-display text-2xl font-bold text-vg-text tabular-nums">
              {formatFromVnd(priceVnd)}
            </div>
          </div>
          <button
            type="button"
            onClick={onPlan}
            className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-vg-cta hover:bg-vg-cta-hover text-white text-sm font-semibold shadow-[0_10px_30px_rgba(29,78,216,0.3)] transition-colors"
          >
            {t.bundles.planCta}
          </button>
        </div>
      </div>
    </article>
  )
}
