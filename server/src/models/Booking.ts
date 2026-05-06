import mongoose, { Schema } from 'mongoose'
import type { ProductServiceType, ProductSegment } from './Product.js'

/**
 * Booking — a confirmed order by a Client for one or more Fast-Track packages.
 * State machine: pending → confirmed → fulfilled → closed
 *                                    ↘ cancelled (from pending/confirmed only)
 * USD is canonical for pricing display; VND is cached.
 */

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'fulfilled'
  | 'cancelled'
  | 'closed'

export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'partial_refund' | 'pending_transfer'

export type PaymentMethod = 'card' | 'wallet' | 'bank_transfer' | 'cash' | 'vnpay'

export type Tier = 'FIT' | 'GIT'

export type Direction = 'arrival' | 'departure'

export type IdType = 'passport' | 'cccd'

export interface Passenger {
  firstName: string
  lastName: string
  dob: string             // ISO date YYYY-MM-DD
  nationality: string     // ISO 3166-1 alpha-2 (e.g. 'VN')
  idType: IdType
  idNumber: string
}

export interface BookingItem {
  productId: string                 // 'HAN-international-departure'
  destinationSlug: string           // legacy, default ''
  airportCode: 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC' | 'HUI' | 'THD' | 'VII'
  segment: ProductSegment
  direction: Direction
  tier: Tier
  serviceType: ProductServiceType
  title: string
  icon: string
  unitPriceUsd: number
  unitPriceVnd: number
  qty: number
  lineTotalUsd: number
  lineTotalVnd: number
  travelDate: string                // ISO YYYY-MM-DD
  travelTime: string                // HH:mm
  flightNumber: string
  passengers: Passenger[]           // length === qty enforced at route layer
  // legacy
  adults: number
  children: number
  meta: Record<string, string>
}

export interface BookingPayment {
  method: PaymentMethod | ''
  status: PaymentStatus
  transactionId: string
  paidAt: string
  refundedAt: string
  vnpayTxnRef: string               // local correlation id we send to VNPay
  vnpayResponseCode: string
}

export interface BookingDoc {
  _id: string
  operatorId: string
  bookingNumber: string
  ticketId: string                  // 'FT-XXXXXXXX' issued post-payment, '' before
  clientId: string
  customerName: string
  customerPhone: string
  phoneCountryCode: string
  contactEmail: string
  items: BookingItem[]
  currency: 'VND' | 'USD'
  subtotalUsd: number
  subtotalVnd: number
  discountVnd: number
  totalUsd: number
  totalVnd: number
  fxRateUsdVnd: number              // captured at booking time for receipt parity
  status: BookingStatus
  payment: BookingPayment
  notes: string
  createdAt: string
  updatedAt: string
}

const PassengerSchema = new Schema<Passenger>(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    dob: { type: String, default: '' },
    nationality: { type: String, default: '' },
    idType: { type: String, enum: ['passport', 'cccd'], default: 'passport' },
    idNumber: { type: String, default: '' },
  },
  { _id: false },
)

const BookingItemSchema = new Schema<BookingItem>(
  {
    productId: { type: String, required: true },
    destinationSlug: { type: String, default: '' },
    airportCode: {
      type: String,
      required: true,
      enum: ['HAN', 'SGN', 'DAD', 'CXR', 'PQC', 'HUI', 'THD', 'VII'],
    },
    segment: { type: String, required: true, enum: ['domestic', 'international'] },
    direction: { type: String, required: true, enum: ['arrival', 'departure'] },
    tier: { type: String, required: true, enum: ['FIT', 'GIT'], default: 'FIT' },
    serviceType: { type: String, required: true, enum: ['fastTrack'], default: 'fastTrack' },
    title: { type: String, required: true },
    icon: { type: String, default: '' },
    unitPriceUsd: { type: Number, required: true, min: 0, default: 0 },
    unitPriceVnd: { type: Number, required: true, min: 0 },
    qty: { type: Number, required: true, min: 1 },
    lineTotalUsd: { type: Number, required: true, min: 0, default: 0 },
    lineTotalVnd: { type: Number, required: true, min: 0 },
    travelDate: { type: String, default: '' },
    travelTime: { type: String, default: '' },
    flightNumber: { type: String, default: '' },
    passengers: { type: [PassengerSchema], default: [] },
    adults: { type: Number, min: 0, default: 1 },
    children: { type: Number, min: 0, default: 0 },
    meta: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: false },
)

const BookingSchema = new Schema<BookingDoc>(
  {
    _id: { type: String, required: true },
    operatorId: { type: String, required: true, index: true },
    bookingNumber: { type: String, required: true, unique: true },
    ticketId: { type: String, default: '', index: true },
    clientId: { type: String, default: '', index: true },
    customerName: { type: String, default: '' },
    customerPhone: { type: String, default: '' },
    phoneCountryCode: { type: String, default: '+84' },
    contactEmail: { type: String, default: '' },
    items: { type: [BookingItemSchema], required: true, default: [] },
    currency: { type: String, required: true, enum: ['VND', 'USD'], default: 'USD' },
    subtotalUsd: { type: Number, required: true, min: 0, default: 0 },
    subtotalVnd: { type: Number, required: true, min: 0, default: 0 },
    discountVnd: { type: Number, required: true, min: 0, default: 0 },
    totalUsd: { type: Number, required: true, min: 0, default: 0 },
    totalVnd: { type: Number, required: true, min: 0, default: 0 },
    fxRateUsdVnd: { type: Number, required: true, min: 0, default: 0 },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'fulfilled', 'cancelled', 'closed'],
      default: 'pending',
      index: true,
    },
    payment: {
      method: {
        type: String,
        enum: ['card', 'wallet', 'bank_transfer', 'cash', 'vnpay', ''],
        default: '',
      },
      status: {
        type: String,
        required: true,
        enum: ['unpaid', 'paid', 'refunded', 'partial_refund', 'pending_transfer'],
        default: 'unpaid',
      },
      transactionId: { type: String, default: '' },
      paidAt: { type: String, default: '' },
      refundedAt: { type: String, default: '' },
      vnpayTxnRef: { type: String, default: '' },
      vnpayResponseCode: { type: String, default: '' },
    },
    notes: { type: String, default: '' },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { _id: false, timestamps: false, collection: 'bookings' },
)

BookingSchema.index({ operatorId: 1, status: 1, createdAt: -1 })
BookingSchema.index({ clientId: 1, createdAt: -1 })
BookingSchema.index({ customerPhone: 1, createdAt: -1 })

export const Booking = mongoose.model<BookingDoc>('Booking', BookingSchema)
