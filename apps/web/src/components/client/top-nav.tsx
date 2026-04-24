'use client'

import Link from 'next/link'
import { useLocaleStore } from '@/stores/locale-store'
import { useCurrencyStore, type Currency } from '@/stores/currency-store'
import { useCartStore } from '@/stores/cart-store'
import { useBrandStore } from '@/stores/brand-store'
import { useBrand } from '@/hooks/use-brand'
import { useT } from '@/i18n/use-t'

type Variant = 'solid' | 'transparent'

export function TopNav({ variant = 'solid' }: { variant?: Variant }) {
  const t = useT()
  const locale = useLocaleStore((s) => s.locale)
  const setLocale = useLocaleStore((s) => s.setLocale)
  const currency = useCurrencyStore((s) => s.currency)
  const setCurrency = useCurrencyStore((s) => s.setCurrency)
  const cartCount = useCartStore((s) => s.items.length)
  const brand = useBrand()
  const openBrandSettings = useBrandStore((s) => s.openSettings)

  const onDark = variant === 'transparent'

  return (
    <nav
      className={
        onDark
          ? 'absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 h-16'
          : 'sticky top-0 z-30 bg-white border-b border-vg-border flex items-center justify-between px-6 md:px-10 h-16'
      }
    >
      <Link href="/" className="flex items-center gap-2.5">
        <span className="grid place-items-center w-9 h-9 rounded-[10px] bg-vg-accent text-white font-display font-bold text-lg">
          {brand.mark}
        </span>
        <span
          className={`font-display font-semibold text-[20px] tracking-tight ${
            onDark ? 'text-white' : 'text-vg-text'
          }`}
        >
          {brand.name}
        </span>
      </Link>

      <div
        className={`hidden md:flex gap-7 text-sm font-medium ${
          onDark ? 'text-white/90' : 'text-vg-text'
        }`}
      >
        <Link href="/destinations" className="hover:text-vg-cta transition-colors">
          {t.nav.destinations}
        </Link>
        <Link href="/services" className="hover:text-vg-cta transition-colors">
          {t.nav.services}
        </Link>
        <Link href="/deals" className="hover:text-vg-cta transition-colors">
          {t.nav.deals}
        </Link>
        <Link href="/help" className="hover:text-vg-cta transition-colors">
          {t.nav.help}
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <CurrencyPill currency={currency} onChange={setCurrency} onDark={onDark} />
        <LocalePill
          locale={locale}
          onToggle={() => setLocale(locale === 'en' ? 'vi' : 'en')}
          onDark={onDark}
        />
        <Link
          href="/checkout"
          className={`relative inline-flex items-center gap-2 px-3.5 h-9 rounded-full text-sm font-semibold transition-colors ${
            onDark
              ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
              : 'bg-vg-surface-muted hover:bg-vg-border text-vg-text border border-vg-border'
          }`}
          aria-label={`View cart (${cartCount} item${cartCount === 1 ? '' : 's'})`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="hidden sm:inline">{t.common.cart}</span>
          {cartCount > 0 && (
            <span className="grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-vg-cta text-white text-[10px] font-bold leading-none">
              {cartCount}
            </span>
          )}
        </Link>
        <button
          type="button"
          onClick={openBrandSettings}
          className={`hidden sm:grid place-items-center w-9 h-9 rounded-full transition-colors ${
            onDark
              ? 'bg-white/15 hover:bg-white/25 text-white/90 border border-white/20'
              : 'bg-vg-surface-muted hover:bg-vg-border text-vg-text-muted border border-vg-border'
          }`}
          aria-label="Brand settings"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

function CurrencyPill({
  currency,
  onChange,
  onDark,
}: {
  currency: Currency
  onChange: (c: Currency) => void
  onDark: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(currency === 'VND' ? 'USD' : 'VND')}
      className={`px-3 h-9 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
        onDark
          ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
          : 'bg-vg-surface-muted hover:bg-vg-border text-vg-text border border-vg-border'
      }`}
      aria-label="Switch currency"
    >
      <span className={currency === 'VND' ? 'opacity-100' : 'opacity-45'}>₫ VND</span>
      <span className="opacity-35">/</span>
      <span className={currency === 'USD' ? 'opacity-100' : 'opacity-45'}>$ USD</span>
    </button>
  )
}

function LocalePill({
  locale,
  onToggle,
  onDark,
}: {
  locale: 'en' | 'vi'
  onToggle: () => void
  onDark: boolean
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-3 h-9 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
        onDark
          ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
          : 'bg-vg-surface-muted hover:bg-vg-border text-vg-text border border-vg-border'
      }`}
      aria-label="Switch language"
    >
      <span className={locale === 'en' ? 'opacity-100' : 'opacity-45'}>EN</span>
      <span className="opacity-35">/</span>
      <span className={locale === 'vi' ? 'opacity-100' : 'opacity-45'}>VI</span>
    </button>
  )
}
