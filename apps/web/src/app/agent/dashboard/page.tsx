'use client'

import { useEffect, useState } from 'react'
import { useT } from '@/i18n/use-t'
import { operatorBookingsApi, type DashboardStats } from '@/lib/operator-bookings-api'
import { airportCity } from '@/lib/airport-cities'
import { useLocaleStore } from '@/stores/locale-store'

export default function AgentDashboardPage() {
  const t = useT()
  const locale = useLocaleStore((s) => s.locale)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let aborted = false
    operatorBookingsApi
      .dashboardStats()
      .then((data) => {
        if (!aborted) setStats(data)
      })
      .catch((err: Error) => {
        if (!aborted) setError(err.message)
      })
    return () => {
      aborted = true
    }
  }, [])

  return (
    <div className="h-full overflow-auto p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-hz-text">{t.agent.dashboard.title}</h1>
        <p className="text-sm text-hz-text-secondary mt-1">{t.agent.dashboard.sub}</p>
      </header>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 mb-4">{error}</div>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label={t.agent.dashboard.todayLabel} value={stats?.bookings.day ?? '—'} sub={t.agent.nav.bookings} />
        <KpiCard label={t.agent.dashboard.weekLabel} value={stats?.bookings.week ?? '—'} sub={t.agent.nav.bookings} />
        <KpiCard label={t.agent.dashboard.monthLabel} value={stats?.bookings.month ?? '—'} sub={t.agent.nav.bookings} />
        <KpiCard
          label={t.agent.dashboard.totalRevenue}
          value={stats ? `$${(stats.revenue.totalUsd ?? 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '—'}
          sub={`${stats?.revenue.count ?? 0} ${t.agent.dashboard.paidBookings.toLowerCase()}`}
        />
      </div>

      <section className="mt-8 bg-white rounded-xl border border-hz-border">
        <header className="px-5 py-4 border-b border-hz-border">
          <h2 className="font-display text-base font-bold text-hz-text">{t.agent.dashboard.bySalesAirport}</h2>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-hz-border/30 text-hz-text-secondary">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">{t.agent.dashboard.airportLabel}</th>
                <th className="text-right px-5 py-3 font-semibold">{t.agent.dashboard.salesLabel}</th>
                <th className="text-right px-5 py-3 font-semibold">{t.agent.dashboard.revenueLabel}</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.byAirport ?? []).length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-6 text-center text-hz-text-secondary">—</td>
                </tr>
              )}
              {(stats?.byAirport ?? []).map((row) => (
                <tr key={row._id} className="border-t border-hz-border">
                  <td className="px-5 py-3 text-hz-text">
                    <span className="font-mono font-bold mr-2">{row._id}</span>
                    <span className="text-hz-text-secondary">{airportCity(row._id, locale)}</span>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums">{row.sales}</td>
                  <td className="px-5 py-3 text-right tabular-nums">${(row.revenueUsd ?? 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function KpiCard({ label, value, sub }: { label: string; value: string | number; sub: string }) {
  return (
    <div className="bg-white rounded-xl border border-hz-border p-5">
      <div className="text-[11px] uppercase tracking-wide text-hz-text-secondary font-semibold">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold text-hz-text tabular-nums">{value}</div>
      <div className="mt-1 text-xs text-hz-text-secondary">{sub}</div>
    </div>
  )
}
