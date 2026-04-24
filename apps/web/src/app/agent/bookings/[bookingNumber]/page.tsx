'use client'

import { Suspense, use } from 'react'
import { BookingsListScreen } from '@/components/agent/bookings/BookingsListScreen'

type PageProps = { params: Promise<{ bookingNumber: string }> }

export default function AgentBookingDetailPage({ params }: PageProps) {
  const { bookingNumber } = use(params)
  return (
    <Suspense fallback={<div className="h-full" />}>
      <BookingsListScreen selectedBookingNumber={decodeURIComponent(bookingNumber)} />
    </Suspense>
  )
}
