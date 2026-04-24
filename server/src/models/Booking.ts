import mongoose, { Schema } from 'mongoose'
import type { ProductServiceType } from './Product.js'

/**
 * Booking — a confirmed order by a Client for one or more Products.
 * State machine: pending → confirmed → fulfilled → closed
 *                                   ↘ cancelled (from pending/confirmed only)
 * Prices always stored in VND; `currency` is the display currency
 * (for surface-level rendering in receipts / emails).
 */

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'fulfilled'
  | 'cancelled'
  | 'closed'

export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'partial_refund'

export type PaymentMethod = 'card' | 'wallet' | 'bank_transfer' | 'cash'

export interface BookingItem {
  productId: string           // e.g. 'ha-long:pickup'
  destinationSlug: string
  airportCode: 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC'
  serviceType: ProductServiceType
  title: string               // denormalized at booking time (price-lock at checkout)
  icon: string
  unitPriceVnd: number
  qty: number
  lineTotalVnd: number        // unitPriceVnd * qty (denormalized)
  travelDate: string          // ISO date (YYYY-MM-DD), may be empty for flexible
  travelTime: string          // HH:mm 24-hour, may be empty (hotels/tours often don't need a time)
  adults: number              // number of adult travellers (default 1)
  children: number            // number of child travellers (default 0)
  flightNumber: string        // only meaningful for pickup / fastTrack, empty otherwise
  meta: Record<string, string>
}

export interface BookingPayment {
  method: PaymentMethod | ''
  status: PaymentStatus
  transactionId: string
  paidAt: string
  refundedAt: string
}

export interface BookingDoc {
  _id: string
  operatorId: string
  bookingNumber: string       // human-readable, e.g. 'VG-2026-000001'
  clientId: string            // '' for anonymous (phone-only) bookings
  customerName: string        // collected at checkout for anonymous bookings
  customerPhone: string       // collected at checkout — agent calls this number
  items: BookingItem[]
  currency: 'VND' | 'USD'
  subtotalVnd: number
  discountVnd: number
  totalVnd: number
  status: BookingStatus
  payment: BookingPayment
  notes: string
  createdAt: string
  updatedAt: string
}

const BookingItemSchema = new Schema<BookingItem>(
  {
    productId: { type: String, required: true },
    destinationSlug: { type: String, required: true },
    airportCode: {
      type: String,
      required: true,
      enum: ['HAN', 'SGN', 'DAD', 'CXR', 'PQC'],
    },
    serviceType: {
      type: String,
      required: true,
      enum: ['pickup', 'fastTrack', 'hotel', 'tour'],
    },
    title: { type: String, required: true },
    // NOTE: `required: true` on String fields with `default: ''` fails Mongoose
    // validation (empty string is treated as missing). Defaults alone are fine.
    icon: { type: String, default: '' },
    unitPriceVnd: { type: Number, required: true, min: 0 },
    qty: { type: Number, required: true, min: 1 },
    lineTotalVnd: { type: Number, required: true, min: 0 },
    travelDate: { type: String, default: '' },
    travelTime: { type: String, default: '' },
    adults: { type: Number, min: 0, default: 1 },
    children: { type: Number, min: 0, default: 0 },
    flightNumber: { type: String, default: '' },
    meta: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: false },
)

const BookingSchema = new Schema<BookingDoc>(
  {
    _id: { type: String, required: true },
    operatorId: { type: String, required: true, index: true },
    bookingNumber: { type: String, required: true, unique: true },
    // Anonymous-checkout pivot: bookings no longer require a client account.
    // `clientId` stays in the schema for when we reintroduce accounts, but we
    // default it to '' and drop the `required` flag. The agent identifies the
    // customer via customerName/customerPhone instead.
    clientId: { type: String, default: '', index: true },
    customerName: { type: String, default: '' },
    customerPhone: { type: String, default: '' },
    items: { type: [BookingItemSchema], required: true, default: [] },
    currency: { type: String, required: true, enum: ['VND', 'USD'], default: 'VND' },
    subtotalVnd: { type: Number, required: true, min: 0, default: 0 },
    discountVnd: { type: Number, required: true, min: 0, default: 0 },
    totalVnd: { type: Number, required: true, min: 0, default: 0 },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'fulfilled', 'cancelled', 'closed'],
      default: 'pending',
      index: true,
    },
    payment: {
      // `''` is included in the enum, so `required` technically works here,
      // but we drop it everywhere in this sub-doc to keep behaviour uniform
      // with the rest of the schema (Mongoose treats '' as missing under `required`).
      method: {
        type: String,
        enum: ['card', 'wallet', 'bank_transfer', 'cash', ''],
        default: '',
      },
      status: {
        type: String,
        required: true,
        enum: ['unpaid', 'paid', 'refunded', 'partial_refund'],
        default: 'unpaid',
      },
      transactionId: { type: String, default: '' },
      paidAt: { type: String, default: '' },
      refundedAt: { type: String, default: '' },
    },
    notes: { type: String, default: '' },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false, timestamps: false, collection: 'bookings' },
)

// Reporting indices
BookingSchema.index({ operatorId: 1, status: 1, createdAt: -1 })
BookingSchema.index({ clientId: 1, createdAt: -1 })
// Agent dashboards look up pending bookings by phone to dedupe / follow up.
BookingSchema.index({ customerPhone: 1, createdAt: -1 })

export const Booking = mongoose.model<BookingDoc>('Booking', BookingSchema)
