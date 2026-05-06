'use client'

import type { BookingDto } from '@/lib/client-bookings-api'
import { useT } from '@/i18n/use-t'

type Status = BookingDto['status']

const TONE: Record<Status, string> = {
  pending: 'bg-[rgba(255,136,0,0.12)] text-[#B56200]',
  confirmed: 'bg-[rgba(62,123,250,0.14)] text-[#1d4ed8]',
  fulfilled: 'bg-[rgba(6,194,112,0.14)] text-[#06853F]',
  cancelled: 'bg-[rgba(230,53,53,0.12)] text-[#B91C1C]',
  closed: 'bg-[rgba(128,128,140,0.15)] text-[#475467]',
}

export function BookingStatusPill({ status }: { status: Status }) {
  const t = useT()
  const label = t.agent.bookings.filterStatus[status]
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold leading-[18px] ${TONE[status]}`}
    >
      {label}
    </span>
  )
}

const PAY_TONE: Record<BookingDto['payment']['status'], string> = {
  unpaid: 'bg-hz-border/40 text-hz-text-secondary',
  paid: 'bg-[rgba(6,194,112,0.14)] text-[#06853F]',
  refunded: 'bg-[rgba(128,128,140,0.15)] text-[#475467]',
  partial_refund: 'bg-[rgba(255,136,0,0.12)] text-[#B56200]',
  pending_transfer: 'bg-[rgba(255,136,0,0.12)] text-[#B56200]',
}

export function PaymentStatusPill({ status }: { status: BookingDto['payment']['status'] }) {
  const t = useT()
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-[16px] ${PAY_TONE[status]}`}
    >
      {t.agent.bookings.paymentStatus[status]}
    </span>
  )
}
