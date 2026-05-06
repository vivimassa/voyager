'use client'

import { useEffect, useMemo, useState } from 'react'
import { useT } from '@/i18n/use-t'
import {
  operatorBookingsApi,
  type InventoryProduct,
  type InventoryCell,
} from '@/lib/operator-bookings-api'

function todayIso(): string {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function shiftIso(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function dateRange(from: string, to: string): string[] {
  const start = new Date(`${from}T00:00:00Z`)
  const end = new Date(`${to}T00:00:00Z`)
  if (end < start) return [from]
  const days: string[] = []
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

export default function AgentInventoryPage() {
  const t = useT()
  const [dateFrom, setDateFrom] = useState<string>(todayIso())
  const [dateTo, setDateTo] = useState<string>(shiftIso(todayIso(), 13))
  const [products, setProducts] = useState<InventoryProduct[]>([])
  const [cells, setCells] = useState<InventoryCell[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [savingId, setSavingId] = useState<string | null>(null)

  const days = useMemo(() => dateRange(dateFrom, dateTo), [dateFrom, dateTo])
  const cellByKey = useMemo(() => {
    const m = new Map<string, InventoryCell>()
    for (const c of cells) m.set(`${c.productId}|${c.date}`, c)
    return m
  }, [cells])

  function load() {
    setLoading(true)
    setError(null)
    operatorBookingsApi
      .inventory(dateFrom, dateTo)
      .then((data) => {
        setProducts(data.products)
        setCells(data.cells)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom, dateTo])

  async function saveCap(product: InventoryProduct, nextCap: number) {
    setSavingId(product.id)
    setError(null)
    try {
      await operatorBookingsApi.setInventoryCap(product.id, nextCap)
      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, capacity: nextCap } : p)))
    } catch (err) {
      setError(err instanceof Error ? err.message : t.agent.inventory.saveError)
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div className="h-full overflow-auto p-6 lg:p-8">
      <header className="mb-6 flex flex-wrap items-end gap-4 justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-hz-text">{t.agent.inventory.title}</h1>
          <p className="text-sm text-hz-text-secondary mt-1">{t.agent.inventory.sub}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setDateFrom(shiftIso(dateFrom, -7))
              setDateTo(shiftIso(dateTo, -7))
            }}
            className="h-9 px-3 rounded-lg border border-hz-border text-sm hover:bg-hz-border/30"
          >
            {t.agent.inventory.shiftDays(-7)}
          </button>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="h-9 px-2 rounded-lg border border-hz-border text-sm"
          />
          <span className="text-sm text-hz-text-secondary">→</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="h-9 px-2 rounded-lg border border-hz-border text-sm"
          />
          <button
            type="button"
            onClick={() => {
              setDateFrom(shiftIso(dateFrom, 7))
              setDateTo(shiftIso(dateTo, 7))
            }}
            className="h-9 px-3 rounded-lg border border-hz-border text-sm hover:bg-hz-border/30"
          >
            {t.agent.inventory.shiftDays(7)}
          </button>
        </div>
      </header>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 mb-4">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-hz-border overflow-x-auto">
        <table className="text-xs">
          <thead className="bg-hz-border/30 text-hz-text-secondary">
            <tr>
              <th className="sticky left-0 bg-hz-border/30 z-10 text-left px-3 py-2 font-semibold min-w-[260px]">{t.agent.inventory.lane}</th>
              <th className="text-right px-3 py-2 font-semibold">{t.agent.inventory.capacity}</th>
              {days.map((d) => (
                <th key={d} className="px-2 py-2 font-semibold text-center min-w-[64px]">{d.slice(5)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!loading && products.length === 0 && (
              <tr>
                <td colSpan={2 + days.length} className="px-4 py-6 text-center text-hz-text-secondary">
                  {t.agent.inventory.empty}
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p.id} className="border-t border-hz-border">
                <td className="sticky left-0 bg-white text-left px-3 py-2 align-top">
                  <div className="font-semibold text-hz-text">{p.title}</div>
                  <div className="text-[11px] text-hz-text-secondary mt-0.5 font-mono">{p.id}</div>
                </td>
                <td className="text-right px-3 py-2 align-top">
                  <CapEditor
                    initial={p.capacity}
                    saving={savingId === p.id}
                    onSave={(n) => saveCap(p, n)}
                    saveLabel={t.agent.inventory.saveCap}
                  />
                </td>
                {days.map((d) => {
                  const cell = cellByKey.get(`${p.id}|${d}`)
                  const sold = cell?.sold ?? 0
                  const cap = cell?.capacity ?? p.capacity
                  const remaining = cap > 0 ? Math.max(0, cap - sold) : '∞'
                  const isFull = cap > 0 && sold >= cap
                  return (
                    <td
                      key={d}
                      className={`px-2 py-2 text-center align-top ${isFull ? 'bg-red-50 text-red-700' : sold > 0 ? 'bg-vg-cta/5' : ''}`}
                    >
                      <div className="font-mono font-bold tabular-nums text-[12px]">{sold}/{cap || '∞'}</div>
                      <div className="text-[10px] text-hz-text-secondary">{typeof remaining === 'number' ? remaining : '∞'} left</div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CapEditor({ initial, saving, onSave, saveLabel }: { initial: number; saving: boolean; onSave: (n: number) => void; saveLabel: string }) {
  const [value, setValue] = useState<string>(String(initial))
  useEffect(() => setValue(String(initial)), [initial])
  const dirty = String(initial) !== value
  const next = Math.max(0, Math.floor(Number(value) || 0))
  return (
    <div className="inline-flex items-center gap-2">
      <input
        type="number"
        min={0}
        max={999}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-16 h-8 rounded-md border border-hz-border px-2 text-right text-[12px]"
      />
      <button
        type="button"
        disabled={!dirty || saving}
        onClick={() => onSave(next)}
        className="h-8 px-2 rounded-md bg-vg-cta text-white text-[11px] font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-vg-cta-hover"
      >
        {saving ? '...' : saveLabel}
      </button>
    </div>
  )
}
