'use client'

import { Plus } from 'lucide-react'
import { useT } from '@/i18n/use-t'
import type { BookingStatusFilter } from '@/lib/operator-bookings-api'

const STATUSES: BookingStatusFilter[] = [
  'all',
  'pending',
  'confirmed',
  'fulfilled',
  'cancelled',
  'closed',
]

interface Props {
  value: BookingStatusFilter
  onChange: (next: BookingStatusFilter) => void
  counts?: Partial<Record<BookingStatusFilter, number>>
}

export function BookingFilterChips({ value, onChange, counts }: Props) {
  const t = useT()
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto">
      {STATUSES.map((s) => {
        const active = s === value
        const label = t.agent.bookings.filterStatus[s]
        const count = counts?.[s]
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={`shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[13px] font-medium border transition-colors ${
              active
                ? 'bg-[#0b1220] text-white border-[#0b1220]'
                : 'bg-white text-hz-text border-hz-border hover:bg-hz-border/30'
            }`}
          >
            <span>{label}</span>
            {count !== undefined ? (
              <span
                className={`text-[11px] font-semibold ${active ? 'text-white/70' : 'text-hz-text-secondary'}`}
              >
                {count}
              </span>
            ) : null}
          </button>
        )
      })}
      <button
        type="button"
        aria-label="Add filter"
        className="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full border border-hz-border text-hz-text-secondary hover:bg-hz-border/30 transition-colors"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
