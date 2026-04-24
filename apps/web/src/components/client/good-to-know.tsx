'use client'

import { useT } from '@/i18n/use-t'

export function GoodToKnow() {
  const t = useT()
  const bullets = [t.goodToKnow.b1, t.goodToKnow.b2, t.goodToKnow.b3, t.goodToKnow.b4, t.goodToKnow.b5, t.goodToKnow.b6]
  return (
    <div className="bg-white rounded-xl border border-vg-border p-6">
      <h3 className="font-display text-xl font-bold text-vg-text mb-3">{t.goodToKnow.title}</h3>
      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-vg-text-muted">
        {bullets.map((b) => (
          <li key={b}>✓ {b}</li>
        ))}
      </ul>
    </div>
  )
}
