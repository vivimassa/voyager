'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Plus,
  Search,
  SlidersHorizontal,
  Upload,
} from 'lucide-react'
import { useT } from '@/i18n/use-t'
import { useOperatorBookings } from '@/hooks/use-operator-bookings'
import type {
  BookingStatusFilter,
  ServiceTypeFilter,
} from '@/lib/operator-bookings-api'
import { BookingFilterChips } from './BookingFilterChips'
import { BookingsTable } from './BookingsTable'
import { BookingDetailPanel } from './BookingDetailPanel'

interface Props {
  selectedBookingNumber: string | null
}

const PAGE_SIZE_OPTIONS = [10, 25, 50]

export function BookingsListScreen({ selectedBookingNumber }: Props) {
  const t = useT()
  const router = useRouter()
  const searchParams = useSearchParams()

  const serviceParam = (searchParams.get('service') ?? 'all') as ServiceTypeFilter
  const [status, setStatus] = useState<BookingStatusFilter>('all')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)

  const params = useMemo(
    () => ({ status, serviceType: serviceParam, q, page, pageSize }),
    [status, serviceParam, q, page, pageSize],
  )

  const { data, isLoading, isError, isFetching } = useOperatorBookings(params)

  const items = data?.items ?? []
  const total = data?.total ?? 0
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const shownFrom = total === 0 ? 0 : (page - 1) * pageSize + 1
  const shownTo = Math.min(total, page * pageSize)

  function openBooking(bookingNumber: string) {
    router.push(`/agent/bookings/${encodeURIComponent(bookingNumber)}`)
  }

  function closeBooking() {
    router.push('/agent/bookings')
  }

  return (
    <div className="flex h-full gap-3 px-5 pt-4 pb-5 overflow-hidden">
      {/* Center panel */}
      <section className="flex-1 flex flex-col rounded-2xl border border-hz-border bg-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-hz-border">
          <div className="flex-1 min-w-0">
            <h1 className="text-[22px] font-semibold tracking-tight text-hz-text">
              <span className="text-hz-text">{t.agent.bookings.title.split(' ')[0]}</span>{' '}
              <span className="text-hz-text-secondary font-medium">
                {t.agent.bookings.count(total)}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <HeaderButton icon={Download} label={t.agent.bookings.export} disabled />
            <HeaderButton icon={Upload} label={t.agent.bookings.import} disabled />
            <button
              type="button"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#0b1220] text-white text-[13px] font-semibold hover:bg-[#1f2937] transition-colors"
            >
              <Plus className="h-4 w-4" />
              {t.agent.bookings.newBooking}
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-hz-border">
          <div className="flex-1 min-w-0">
            <BookingFilterChips value={status} onChange={(s) => { setStatus(s); setPage(1) }} />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-hz-text-secondary" />
              <input
                type="search"
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1) }}
                placeholder="#VG / name / phone"
                className="h-9 pl-8 pr-3 rounded-lg bg-white border border-hz-border text-[13px] text-hz-text placeholder:text-hz-text-secondary focus:outline-none focus:ring-2 focus:ring-[#3E7BFA]/40 w-56"
              />
            </div>
            <button
              type="button"
              aria-label="Filter"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hz-border text-hz-text-secondary hover:bg-hz-border/30 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Table / empty / loading */}
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="h-full flex items-center justify-center text-hz-text-secondary text-[13px]">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {t.agent.bookings.loading}
            </div>
          ) : isError ? (
            <div className="h-full flex items-center justify-center text-[#B91C1C] text-[13px]">
              {t.agent.bookings.loadError}
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="text-[15px] font-semibold text-hz-text">
                {t.agent.bookings.empty}
              </div>
              <div className="text-[13px] text-hz-text-secondary mt-1 max-w-sm">
                {t.agent.bookings.emptyHint}
              </div>
            </div>
          ) : (
            <BookingsTable
              items={items}
              selectedNumber={selectedBookingNumber}
              onSelect={openBooking}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-3 border-t border-hz-border">
          <div className="flex items-center gap-2">
            <label className="text-[12px] text-hz-text-secondary">{t.agent.bookings.pageSize}</label>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(parseInt(e.target.value, 10)); setPage(1) }}
              className="h-8 px-2 rounded-lg border border-hz-border bg-white text-[13px] text-hz-text"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="text-[12px] text-hz-text-secondary font-mono">
              {total === 0 ? '0' : `${shownFrom}–${shownTo}`} / {total}
            </span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-hz-border text-[13px] text-hz-text hover:bg-hz-border/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              {t.agent.bookings.prev}
            </button>
            <span className="px-3 text-[13px] text-hz-text-secondary font-mono">
              {page} / {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page >= pageCount}
              className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-hz-border text-[13px] text-hz-text hover:bg-hz-border/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {t.agent.bookings.next}
              <ChevronRight className="h-4 w-4" />
            </button>
            {isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin text-hz-text-secondary ml-2" />
            ) : null}
          </div>
        </div>
      </section>

      {/* Right detail panel */}
      {selectedBookingNumber ? (
        <aside className="shrink-0 w-[380px] h-full rounded-2xl border border-hz-border bg-white overflow-hidden">
          <BookingDetailPanel bookingNumber={selectedBookingNumber} onClose={closeBooking} />
        </aside>
      ) : null}
    </div>
  )
}

function HeaderButton({
  icon: Icon,
  label,
  disabled,
  onClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>
  label: string
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={disabled ? 'Coming soon' : undefined}
      className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-hz-border bg-white text-[13px] font-medium text-hz-text hover:bg-hz-border/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}
