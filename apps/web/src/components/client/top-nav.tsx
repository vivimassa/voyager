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
        <Link href="/#coverage" className="hover:text-vg-cta transition-colors">
          {t.nav.coverage}
        </Link>
        <Link href="/#how-it-works" className="hover:text-vg-cta transition-colors">
          {t.nav.howItWorks}
        </Link>
        <Link href="/faq" className="hover:text-vg-cta transition-colors">
          {t.nav.faq}
        </Link>
        <Link href="/about" className="hover:text-vg-cta transition-colors">
          {t.nav.about}
        </Link>
        <Link href="/my-tickets" className="hover:text-vg-cta transition-colors">
          {t.nav.myTickets}
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
          className={`relative grid place-items-center w-9 h-9 rounded-full transition-all hover:scale-105 active:scale-95 ${
            onDark
              ? 'bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-sm'
              : 'bg-vg-surface-muted hover:bg-white text-vg-text border border-vg-border hover:border-vg-border-strong'
          }`}
          aria-label={`View cart (${cartCount} item${cartCount === 1 ? '' : 's'})`}
          title={t.common.cart}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-vg-cta text-white text-[10px] font-bold leading-none ring-2 ring-white">
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
  const symbol = currency === 'VND' ? '₫' : '$'
  const next = currency === 'VND' ? 'USD' : 'VND'
  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      className={`grid place-items-center w-9 h-9 rounded-full font-display text-[15px] font-bold leading-none transition-all hover:scale-105 active:scale-95 ${
        onDark
          ? 'bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-sm'
          : 'bg-vg-surface-muted hover:bg-white text-vg-text border border-vg-border hover:border-vg-border-strong'
      }`}
      aria-label={`Currency: ${currency}. Switch to ${next}`}
      title={`${currency} — click for ${next}`}
    >
      <span className="pointer-events-none select-none translate-y-[1px]">{symbol}</span>
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
  const iso = locale === 'vi' ? 'vn' : 'us'
  const nextLabel = locale === 'vi' ? 'English' : 'Tiếng Việt'
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`grid place-items-center w-9 h-9 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 ${
        onDark
          ? 'ring-1 ring-white/30 hover:ring-white/60'
          : 'ring-1 ring-vg-border hover:ring-vg-border-strong'
      }`}
      aria-label={`Language: ${locale.toUpperCase()}. Switch to ${nextLabel}`}
      title={`${locale.toUpperCase()} — click for ${nextLabel}`}
    >
      <img
        src={`https://flagcdn.com/${iso}.svg`}
        alt=""
        aria-hidden
        width={36}
        height={36}
        draggable={false}
        className="w-full h-full object-cover"
      />
    </button>
  )
}
