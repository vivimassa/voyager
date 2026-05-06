import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Booking } from '../models/Booking.js'
import { Inventory } from '../models/Inventory.js'
import { generateTicketId } from '../lib/ticket-id.js'
import { buildVnpayPaymentUrl, verifyVnpayReturn, type VnpayConfig } from '../lib/vnpay.js'
import { vietQrImageUrl } from '../lib/vietqr.js'
import { getServerEnv } from '@skyhub/env/server'

/**
 * Voyager payment endpoints (public, but state changes require a valid
 * bookingNumber as the shared secret).
 *
 *   POST /payments/vnpay/create        — return redirect URL to VNPay
 *   GET  /payments/vnpay/return        — VNPay calls back here w/ signed params
 *   POST /payments/bank-transfer/start — get QR + bank instructions for a booking
 *
 * On payment success we:
 *   - flip booking.status to 'confirmed', payment.status to 'paid'
 *   - issue a ticketId 'FT-XXXXXXXX' (Crockford base32) — used by airport security
 *
 * On payment failure / cancellation we roll back the inventory reservation so
 * a retry can re-grab the slot.
 */

function vnpayConfigFromEnv(): VnpayConfig {
  const env = getServerEnv()
  return {
    tmnCode: env.VNPAY_TMN_CODE,
    hashSecret: env.VNPAY_HASH_SECRET,
    payUrl: env.VNPAY_PAY_URL,
    returnUrl: env.VNPAY_RETURN_URL,
  }
}

async function rollbackInventory(items: Array<{ productId: string; travelDate: string; qty: number }>): Promise<void> {
  const now = new Date().toISOString()
  for (const it of items) {
    if (!it.travelDate) continue
    await Inventory.updateOne(
      { _id: `${it.productId}|${it.travelDate}` },
      { $inc: { sold: -it.qty }, $set: { updatedAt: now } },
    ).catch(() => {})
  }
}

export async function paymentsRoutes(app: FastifyInstance) {
  // ═══ POST /payments/vnpay/create ═══
  app.post<{ Body: { bookingNumber?: string } }>(
    '/payments/vnpay/create',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const body = (req.body ?? {}) as { bookingNumber?: string }
      const bookingNumber = (body.bookingNumber ?? '').trim()
      if (!bookingNumber) return reply.code(400).send({ error: 'bookingNumber is required' })

      const booking = await Booking.findOne({ bookingNumber })
      if (!booking) return reply.code(404).send({ error: 'Booking not found' })
      if (booking.status === 'cancelled') {
        return reply.code(409).send({ error: 'Booking is cancelled' })
      }
      if (booking.payment.status === 'paid') {
        return reply.code(409).send({ error: 'Booking is already paid' })
      }

      const txnRef = `${bookingNumber}-${Date.now().toString(36).toUpperCase()}`
      booking.payment.method = 'vnpay'
      booking.payment.status = 'unpaid'
      booking.payment.vnpayTxnRef = txnRef
      booking.updatedAt = new Date().toISOString()
      await booking.save()

      const config = vnpayConfigFromEnv()
      const ipAddr = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ?? req.ip ?? '127.0.0.1'

      const redirectUrl = buildVnpayPaymentUrl(config, {
        bookingNumber,
        amountVnd: booking.totalVnd,
        ipAddr,
        orderInfo: `Voyager Fast Track ${bookingNumber}`,
        txnRef,
        locale: 'vn',
      })

      return reply.send({ redirectUrl, txnRef })
    },
  )

  // ═══ GET /payments/vnpay/return ═══ — public callback
  app.get<{ Querystring: Record<string, string> }>(
    '/payments/vnpay/return',
    async (req, reply) => {
      const config = vnpayConfigFromEnv()
      const result = verifyVnpayReturn(config, req.query)

      if (!result.ok) {
        return reply.code(400).send({ ok: false, error: 'Invalid signature' })
      }

      const txnRef = result.txnRef
      const booking = await Booking.findOne({ 'payment.vnpayTxnRef': txnRef })
      if (!booking) return reply.code(404).send({ ok: false, error: 'Booking not found for txnRef' })

      const now = new Date().toISOString()

      if (result.responseCode === '00') {
        // Success
        if (!booking.ticketId) booking.ticketId = await generateTicketId()
        booking.status = 'confirmed'
        booking.payment.status = 'paid'
        booking.payment.transactionId = result.transactionId
        booking.payment.vnpayResponseCode = result.responseCode
        booking.payment.paidAt = now
        booking.updatedAt = now
        await booking.save()
        return reply.send({
          ok: true,
          bookingNumber: booking.bookingNumber,
          ticketId: booking.ticketId,
          status: booking.status,
        })
      }

      // Failure — roll back inventory so the slot frees up.
      booking.payment.status = 'unpaid'
      booking.payment.vnpayResponseCode = result.responseCode
      booking.updatedAt = now
      await booking.save()
      await rollbackInventory(
        booking.items.map((it) => ({ productId: it.productId, travelDate: it.travelDate, qty: it.qty })),
      )
      return reply.code(402).send({ ok: false, responseCode: result.responseCode })
    },
  )

  // ═══ POST /payments/bank-transfer/start ═══
  app.post<{ Body: { bookingNumber?: string } }>(
    '/payments/bank-transfer/start',
    async (req, reply) => {
      const env = getServerEnv()
      const body = (req.body ?? {}) as { bookingNumber?: string }
      const bookingNumber = (body.bookingNumber ?? '').trim()
      if (!bookingNumber) return reply.code(400).send({ error: 'bookingNumber is required' })

      const booking = await Booking.findOne({ bookingNumber })
      if (!booking) return reply.code(404).send({ error: 'Booking not found' })
      if (booking.payment.status === 'paid') {
        return reply.code(409).send({ error: 'Already paid' })
      }

      booking.payment.method = 'bank_transfer'
      booking.payment.status = 'pending_transfer'
      booking.updatedAt = new Date().toISOString()
      await booking.save()

      const description = `VG ${bookingNumber}`
      const qrUrl = vietQrImageUrl({
        bankBin: env.BANK_BIN,
        accountNo: env.BANK_ACCOUNT_NO,
        accountName: env.BANK_ACCOUNT_NAME,
        amountVnd: booking.totalVnd,
        description,
      })

      return reply.send({
        bookingNumber,
        amountVnd: booking.totalVnd,
        amountUsd: booking.totalUsd,
        bank: {
          name: env.BANK_NAME,
          accountName: env.BANK_ACCOUNT_NAME,
          accountNo: env.BANK_ACCOUNT_NO,
          bin: env.BANK_BIN,
        },
        description,
        qrUrl,
      })
    },
  )

  // ═══ POST /clients/bookings/:number/cancel ═══
  app.post<{ Params: { bookingNumber: string } }>(
    '/clients/bookings/:bookingNumber/cancel',
    async (req, reply) => {
      const { bookingNumber } = req.params
      const booking = await Booking.findOne({ bookingNumber })
      if (!booking) return reply.code(404).send({ error: 'Booking not found' })
      if (booking.status === 'cancelled') return reply.send({ booking: booking.toObject() })

      // Cancel window: must be at least 24h before the earliest travelDate.
      const earliest = booking.items
        .map((it) => it.travelDate)
        .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
        .sort()[0]
      if (earliest) {
        const cutoff = new Date(`${earliest}T00:00:00Z`).getTime() - 24 * 60 * 60 * 1000
        if (Date.now() > cutoff) {
          return reply.code(400).send({ error: 'Cancellations must be made at least 24h before travel.' })
        }
      }

      const now = new Date().toISOString()
      booking.status = 'cancelled'
      if (booking.payment.status === 'paid') {
        booking.payment.status = 'refunded'
        booking.payment.refundedAt = now
      } else {
        booking.payment.status = 'unpaid'
      }
      booking.updatedAt = now
      await booking.save()

      await rollbackInventory(
        booking.items.map((it) => ({ productId: it.productId, travelDate: it.travelDate, qty: it.qty })),
      )

      return reply.send({ booking: booking.toObject() })
    },
  )
}
