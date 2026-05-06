'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, type ComponentType } from 'react'
import {
  BarChart3,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Layers,
  LifeBuoy,
  LogOut,
  Map,
  Package,
  Plus,
  Settings,
  Users,
  Wallet,
} from 'lucide-react'
import { useT } from '@/i18n/use-t'
import { useOperatorAuthStore } from '@/stores/operator-auth-store'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponent = ComponentType<any>

type NavItem = {
  key: string
  label: string
  href?: string
  icon: IconComponent
  children?: Array<{ key: string; label: string; href: string }>
}

export function AgentSidebar() {
  const t = useT()
  const pathname = usePathname()
  const router = useRouter()
  const clearSession = useOperatorAuthStore((s) => s.clearSession)
  const [bookingsOpen, setBookingsOpen] = useState(true)

  const nav: NavItem[] = [
    { key: 'dashboard', label: t.agent.nav.dashboard, href: '/agent/dashboard', icon: BarChart3 },
    {
      key: 'bookings',
      label: t.agent.nav.bookings,
      icon: Calendar,
      children: [
        { key: 'all', label: t.agent.nav.bookingsAll, href: '/agent/bookings' },
        { key: 'pending', label: t.agent.nav.bookingsPending, href: '/agent/bookings?paymentStatus=pending_transfer' },
        { key: 'paid', label: t.agent.nav.bookingsPaid, href: '/agent/bookings?paymentStatus=paid' },
      ],
    },
    { key: 'inventory', label: t.agent.nav.inventory, href: '/agent/inventory', icon: Layers },
    { key: 'pricing', label: t.agent.nav.pricing, href: '/agent/pricing', icon: DollarSign },
    { key: 'customers', label: t.agent.nav.customers, href: '#', icon: Users },
    { key: 'reports', label: t.agent.nav.reports, href: '#', icon: BarChart3 },
    { key: 'support', label: t.agent.nav.support, href: '#', icon: LifeBuoy },
  ]
  // Hint to TS that Map and Package are still imported even after the
  // pickup/hotel/tour subnav was removed.
  void Map; void Package

  function isActive(href?: string) {
    if (!href || href === '#') return false
    if (href === '/agent') return pathname === '/agent'
    return pathname === href.split('?')[0] || pathname.startsWith(href.split('?')[0] + '/')
  }

  function handleLogout() {
    clearSession()
    router.replace('/agent/login')
  }

  return (
    <aside className="w-[264px] shrink-0 h-full flex flex-col bg-white border-r border-hz-border">
      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="flex items-center gap-2 px-3 pb-3">
          <div className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#3E7BFA]/10">
            <Briefcase className="h-[14px] w-[14px] text-[#3E7BFA]" />
          </div>
          <span className="text-[11px] font-semibold text-hz-text-secondary uppercase tracking-wider">
            Operations
          </span>
        </div>
        <ul className="flex flex-col gap-0.5">
          {nav.map((item) => {
            const Icon = item.icon
            if (item.children) {
              const active = item.children.some((c) => isActive(c.href))
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => setBookingsOpen((v) => !v)}
                    className={`w-full flex items-center gap-2.5 h-10 px-3 rounded-lg text-[13px] font-medium transition-colors ${
                      active
                        ? 'bg-[#3E7BFA]/10 text-[#1d4ed8]'
                        : 'text-hz-text hover:bg-hz-border/30'
                    }`}
                  >
                    <Icon className="h-[16px] w-[16px] shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {bookingsOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {bookingsOpen ? (
                    <ul className="flex flex-col gap-0.5 mt-0.5 mb-1 pl-9">
                      {item.children.map((c) => {
                        const childActive = isActive(c.href)
                        return (
                          <li key={c.key}>
                            <Link
                              href={c.href}
                              className={`block h-9 leading-9 px-3 rounded-lg text-[13px] transition-colors ${
                                childActive
                                  ? 'bg-[#3E7BFA]/10 text-[#1d4ed8] font-semibold'
                                  : 'text-hz-text-secondary hover:bg-hz-border/30'
                              }`}
                            >
                              {c.label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  ) : null}
                </li>
              )
            }
            const active = isActive(item.href)
            return (
              <li key={item.key}>
                <Link
                  href={item.href ?? '#'}
                  className={`flex items-center gap-2.5 h-10 px-3 rounded-lg text-[13px] font-medium transition-colors ${
                    active
                      ? 'bg-[#3E7BFA]/10 text-[#1d4ed8]'
                      : 'text-hz-text hover:bg-hz-border/30'
                  }`}
                >
                  <Icon className="h-[16px] w-[16px]" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Total revenue card */}
      <div className="px-3 pb-3">
        <div className="relative overflow-hidden rounded-xl p-4 text-white bg-gradient-to-br from-[#0b1220] via-[#1e3a8a] to-[#1d4ed8]">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_80%_20%,#ffffff_0%,transparent_40%)]" />
          <div className="relative flex items-center gap-2">
            <Wallet className="h-[14px] w-[14px] opacity-70" />
            <span className="text-[11px] uppercase tracking-wider opacity-70">
              {t.agent.totalRevenue}
            </span>
          </div>
          <div className="relative mt-2 flex items-center justify-between">
            <div className="font-mono font-bold text-[22px]">₫ 0</div>
            <button
              type="button"
              aria-label="Quick add"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            className="relative mt-3 text-[12px] underline opacity-80 hover:opacity-100"
          >
            {t.agent.seeAllTransactions}
          </button>
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-3 pb-4 flex flex-col gap-0.5 border-t border-hz-border pt-3">
        <button
          type="button"
          className="flex items-center gap-2.5 h-10 px-3 rounded-lg text-[13px] font-medium text-hz-text hover:bg-hz-border/30 transition-colors"
        >
          <Settings className="h-[16px] w-[16px]" />
          <span>{t.agent.nav.settings}</span>
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2.5 h-10 px-3 rounded-lg text-[13px] font-medium text-hz-text hover:bg-[#E63535]/10 hover:text-[#E63535] transition-colors"
        >
          <LogOut className="h-[16px] w-[16px]" />
          <span>{t.agent.nav.logOut}</span>
        </button>
      </div>
    </aside>
  )
}
