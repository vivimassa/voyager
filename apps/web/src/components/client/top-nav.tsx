'use client'

/**
 * Client portal top nav — floats over the hero, glass-pill action buttons.
 * Currency + locale toggles wire into the Zustand stores.
 */
import Link from 'next/link'
import { useLocaleStore } from '@/stores/locale-store'
import { useCurrencyStore, type Currency } from '@/stores/currency-store'
import { useCartStore } from '@/stores/cart-store'
import { useBrandStore } from '@/stores/brand-store'
import { useBrand } from '@/hooks/use-brand'
import { useT } from '@/i18n/use-t'

export function TopNav() {
  const t = useT()
  const locale = useLocaleStore((s) => s.locale)
  const setLocale = useLocaleStore((s) => s.setLocale)
  const currency = useCurrencyStore((s) => s.currency)
  const setCurrency = useCurrencyStore((s) => s.setCurrency)
  // Selector returns a number, so it only re-renders TopNav when the distinct
  // line count changes — not on every qty tweak.
  const cartCount = useCartStore((s) => s.items.length)
  const brand = useBrand()
  const openBrandSettings = useBrandStore((s) => s.openSettings)

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-5">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="grid place-items-center w-[38px] h-[38px] rounded-[10px] bg-vg-accent text-white font-display font-bold text-xl">
          {brand.mark}
        </span>
        <span className="font-display font-semibold text-[22px] tracking-tight text-white">
          {brand.name}
        </span>
      </Link>

      <div className="hidden md:flex gap-9 text-sm font-medium">
        <Link href="/services" className="text-white/85 hover:text-white transition-colors">
          {t.nav.services}
        </Link>
        <Link href="/destinations" className="text-white/85 hover:text-white transition-colors">
          {t.nav.destinations}
        </Link>
        <Link href="/deals" className="text-white/85 hover:text-white transition-colors">
          {t.nav.deals}
        </Link>
        <Link href="/help" className="text-white/85 hover:text-white transition-colors">
          {t.nav.help}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {cartCount > 0 && (
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vg-cta/90 hover:bg-vg-cta text-white text-sm font-semibold shadow-[0_6px_18px_rgba(29,78,216,0.35)] transition-colors"
            aria-label={`View cart (${cartCount} item${cartCount === 1 ? '' : 's'})`}
          >
            <span>{t.common.cart}</span>
            <span className="grid place-items-center min-w-[20px] h-5 px-1.5 rounded-full bg-white text-vg-cta text-[11px] font-bold leading-none">
              {cartCount}
            </span>
          </Link>
        )}
        <CurrencyPill currency={currency} onChange={setCurrency} />
        <button
          type="button"
          onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')}
          className="px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-white/20 transition-colors"
          aria-label="Switch language"
        >
          <span className={locale === 'en' ? 'opacity-100' : 'opacity-55'}>EN</span>
          <span className="opacity-35">/</span>
          <span className={locale === 'vi' ? 'opacity-100' : 'opacity-55'}>VI</span>
        </button>
        <button
          type="button"
          onClick={openBrandSettings}
          className="w-9 h-9 grid place-items-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          aria-label="Brand settings"
          title="Brand settings"
        >
          {/* Small gear glyph — no lucide-react in this repo, so inline SVG keeps it cheap. */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
        {/* Sign in / sign up intentionally removed — consumer checkout is
         *  anonymous (name + phone). Auth code is still on disk behind
         *  `useClientAuthStore` and can be re-mounted here when we bring
         *  accounts back. */}
      </div>
    </nav>
  )
}

function CurrencyPill({
  currency,
  onChange,
}: {
  currency: Currency
  onChange: (c: Currency) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(currency === 'VND' ? 'USD' : 'VND')}
      className="px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-white/20 transition-colors"
      aria-label="Switch currency"
    >
      <span className={currency === 'VND' ? 'opacity-100' : 'opacity-55'}>₫</span>
      <span className="opacity-35">/</span>
      <span className={currency === 'USD' ? 'opacity-100' : 'opacity-55'}>$</span>
    </button>
  )
}
