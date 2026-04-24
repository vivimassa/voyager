'use client'

import { useQuery, keepPreviousData } from '@tanstack/react-query'
import {
  operatorBookingsApi,
  type OperatorBookingListParams,
} from '@/lib/operator-bookings-api'

export function useOperatorBookings(params: OperatorBookingListParams) {
  return useQuery({
    queryKey: ['operator-bookings', params],
    queryFn: () => operatorBookingsApi.list(params),
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  })
}

export function useOperatorBooking(bookingNumber: string | null) {
  return useQuery({
    queryKey: ['operator-booking', bookingNumber],
    queryFn: () => operatorBookingsApi.getByNumber(bookingNumber as string),
    enabled: !!bookingNumber,
    staleTime: 30_000,
  })
}
