'use client'

import { useEffect, useState } from 'react'
import { useT } from '@/i18n/use-t'
import { operatorBookingsApi, type InventoryProduct } from '@/lib/operator-bookings-api'
import { airportCity } from '@/lib/airport-cities'
import { useLocaleStore } from '@/stores/locale-store'

type ProductRow = InventoryProduct & {
  fitPriceUsd: number
  gitPriceUsd: number
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'

export default function AgentPricingPage() {
  const t = useT()
  const locale = useLocaleStore((s) => s.locale)
  const [rows, setRows] = useState<ProductRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)

  useEffect(() => {
    let aborted = false
    fetch(`${API_BASE}/catalog/products`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((products: ProductRow[]) => {
        if (!aborted) setRows(products.map((p) => ({ ...p })))
      })
      .catch((err: Error) => !aborted && setError(err.message))
    return () => {
      aborted = true
    }
  }, [])

  async function saveCap(row: ProductRow, nextCap: number) {
    setSavingId(row.id)
    setError(null)
    try {
      await operatorBookingsApi.setInventoryCap(row.id, nextCap)
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, inventoryDailyCap: nextCap, capacity: nextCap } : r)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div className="h-full overflow-auto p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-hz-text">{t.agent.pricing.title}</h1>
        <p className="text-sm text-hz-text-secondary mt-1">{t.agent.pricing.sub}</p>
      </header>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 mb-4">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-hz-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-hz-border/30 text-hz-text-secondary">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">{t.agent.pricing.airportCol}</th>
              <th className="text-left px-4 py-3 font-semibold">{t.agent.pricing.segmentCol}</th>
              <th className="text-left px-4 py-3 font-semibold">{t.agent.pricing.directionCol}</th>
              <th className="text-right px-4 py-3 font-semibold">{t.agent.pricing.fitCol}</th>
              <th className="text-right px-4 py-3 font-semibold">{t.agent.pricing.gitCol}</th>
              <th className="text-right px-4 py-3 font-semibold">{t.agent.pricing.capCol}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-6 text-center text-hz-text-secondary">—</td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-hz-border">
                <td className="px-4 py-3 text-hz-text">
                  <span className="font-mono font-bold mr-2">{row.airportCode}</span>
                  <span className="text-hz-text-secondary">{airportCity(row.airportCode, locale)}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-md bg-hz-border/30 text-[11px] font-semibold uppercase">{row.segment}</span>
                </td>
                <td className="px-4 py-3 capitalize">{row.direction}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums font-bold">${row.fitPriceUsd}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">{row.gitPriceUsd > 0 ? `$${row.gitPriceUsd}` : '—'}</td>
                <td className="px-4 py-3 text-right">
                  <CapEditor initial={row.capacity} saving={savingId === row.id} onSave={(n) => saveCap(row, n)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-hz-text-secondary">
        FIT/GIT USD pricing is sourced from the seed; to change it permanently update <code>server/src/data/voyager-seed-data.ts</code> and run <code>npm run seed:voyager</code>.
      </p>
    </div>
  )
}

function CapEditor({ initial, saving, onSave }: { initial: number; saving: boolean; onSave: (n: number) => void }) {
  const [value, setValue] = useState<string>(String(initial))
  useEffect(() => setValue(String(initial)), [initial])
  const dirty = String(initial) !== value
  return (
    <div className="inline-flex items-center gap-2">
      <input
        type="number"
        min={0}
        max={999}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-20 h-9 rounded-md border border-hz-border px-2 text-right text-sm tabular-nums"
      />
      <button
        type="button"
        disabled={!dirty || saving}
        onClick={() => onSave(Math.max(0, Math.floor(Number(value) || 0)))}
        className="h-9 px-3 rounded-md bg-vg-cta text-white text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-vg-cta-hover"
      >
        {saving ? '…' : 'Save'}
      </button>
    </div>
  )
}
