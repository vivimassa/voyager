'use client'

import { Bell, Plane, Search } from 'lucide-react'
import { useT } from '@/i18n/use-t'
import { useOperatorAuthStore } from '@/stores/operator-auth-store'

export function AgentTopBar() {
  const t = useT()
  const operator = useOperatorAuthStore((s) => s.operator)

  const initials = operator
    ? `${(operator.firstName[0] ?? '').toUpperCase()}${(operator.lastName[0] ?? '').toUpperCase()}`
    : 'VA'
  const displayName = operator
    ? `${operator.firstName} ${operator.lastName}`.trim() || operator.email
    : ''

  return (
    <header className="h-16 shrink-0 flex items-center gap-4 px-5 bg-[#0b1220] text-white">
      <div className="flex items-center gap-2.5 shrink-0 pr-4 border-r border-white/10">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d4ed8]">
          <Plane className="h-[18px] w-[18px] text-white" strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <div className="text-[14px] font-semibold">{t.agent.brand}</div>
          <div className="text-[11px] text-white/50 uppercase tracking-wider">
            {t.agent.brandSub}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[640px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="search"
            placeholder={t.agent.searchPlaceholder}
            className="w-full h-10 pl-9 pr-16 rounded-lg bg-white/5 border border-white/10 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#3E7BFA]"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-white/40 border border-white/15 rounded px-1.5 py-0.5">
            ⌘K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          aria-label="Notifications"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <Bell className="h-[18px] w-[18px]" />
        </button>

        <div className="inline-flex items-center gap-2 h-10 pl-3 pr-1 rounded-lg bg-white/5 border border-white/10">
          <span className="text-[13px] font-medium text-white/90 max-w-[140px] truncate">
            {displayName || '—'}
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#22c55e] text-[11px] font-bold text-[#052e16]">
            {initials || 'VA'}
          </span>
        </div>
      </div>
    </header>
  )
}
