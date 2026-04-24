'use client'

import Link from 'next/link'
import { useCartStore } from '@/stores/cart-store'
import { useCurrencyStore } from '@/stores/currency-store'
import { useT } from '@/i18n/use-t'

export function DestinationSummary({ slug }: { slug: string }) {
  const t = useT()
  const items = useCartStore((s) => s.items.filter((i) => i.destinationSlug === slug))
  const remove = useCartStore((s) => s.remove)
  const formatFromVnd = useCurrencyStore((s) => s.formatFromVnd)
  useCurrencyStore((s) => s.currency)

  const total = items.reduce((s, i) => s + i.unitPriceVnd * i.qty, 0)

  return (
    <aside className="bg-white rounded-xl border border-vg-border p-5 md:sticky md:top-20 h-fit">
      <div className="font-display text-lg font-bold text-vg-text mb-1">{t.summary.title}</div>
      <div className="text-xs text-vg-text-muted mb-4">{t.summary.hint}</div>
      {items.length === 0 ? (
        <div className="text-sm text-vg-text-muted py-6 text-center border-2 border-dashed border-vg-border rounded-lg">
          {t.summary.empty}
        </div>
      ) : (
        <>
          <div className="flex flex-col divide-y divide-vg-border">
            {items.map((it) => (
              <div key={it.id} className="py-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-vg-text truncate">{it.title}</div>
                  <div className="text-xs text-vg-text-muted">× {it.qty}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-vg-text tabular-nums">
                    {formatFromVnd(it.unitPriceVnd * it.qty)}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(it.id)}
                    className="text-[11px] text-vg-text-subtle hover:text-vg-text underline"
                  >
                    {t.summary.remove}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-vg-border flex justify-between items-baseline">
            <div className="text-sm font-bold text-vg-text">{t.common.total}</div>
            <div className="font-display text-xl font-bold text-vg-text tabular-nums">
              {formatFromVnd(total)}
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-4 w-full inline-flex items-center justify-center h-12 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm transition-colors"
          >
            {t.summary.reserve}
          </Link>
        </>
      )}
      <div className="mt-4 text-[11px] text-vg-text-muted leading-relaxed">
        <div>✓ {t.filters.freeCancel}</div>
        <div>✓ {t.filters.noPrepayment}</div>
        <div>✓ {t.checkout.securePromise}</div>
      </div>
    </aside>
  )
}
