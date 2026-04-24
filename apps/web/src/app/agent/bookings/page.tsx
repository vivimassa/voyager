import { Suspense } from 'react'
import { BookingsListScreen } from '@/components/agent/bookings/BookingsListScreen'

export default function AgentBookingsPage() {
  return (
    <Suspense fallback={<div className="h-full" />}>
      <BookingsListScreen selectedBookingNumber={null} />
    </Suspense>
  )
}
