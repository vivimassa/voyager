'use client'

import Link from 'next/link'
import { useCartStore } from '@/stores/cart-store'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'

export function MobileReserveBar({ slug }: { slug: string }) {
  const t = useT()
  const items = useCartStore((s) => s.items.filter((i) => i.destinationSlug === slug))
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  if (items.length === 0) return null

  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((s, i) => s + i.unitPriceVnd * i.qty, 0)

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white border-t border-vg-border shadow-[0_-4px_14px_rgba(16,24,40,0.08)] flex items-center justify-between px-4 gap-3">
      <div className="min-w-0">
        <div className="text-xs text-vg-text-muted">
          {count} {count === 1 ? 'item' : 'items'}
        </div>
        <div className="font-bold text-vg-text tabular-nums text-base truncate">
          {formatFromVnd(total)}
        </div>
      </div>
      <Link
        href="/checkout"
        className="flex-shrink-0 inline-flex items-center justify-center h-11 px-5 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm transition-colors"
      >
        {t.summary.reserve} →
      </Link>
    </div>
  )
}
