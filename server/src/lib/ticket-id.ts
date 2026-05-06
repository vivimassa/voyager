import crypto from 'node:crypto'
import { Booking } from '../models/Booking.js'

/**
 * Generates a Fast-Track ticket id of the form 'FT-XXXXXXXX' using
 * Crockford's base32 alphabet (no I/L/O/U so airport security can't
 * misread on a printed receipt). Retries up to 5 times if a collision
 * shows up on the unique index.
 */

const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ' // Crockford base32

function randomTicketBody(len = 8): string {
  const bytes = crypto.randomBytes(len)
  let out = ''
  for (let i = 0; i < len; i++) out += ALPHABET[bytes[i] % ALPHABET.length]
  return out
}

export async function generateTicketId(): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = `FT-${randomTicketBody(8)}`
    const exists = await Booking.exists({ ticketId: candidate })
    if (!exists) return candidate
  }
  // Astronomically unlikely; fall through with random hex tail to guarantee progress.
  return `FT-${crypto.randomBytes(5).toString('hex').toUpperCase()}`
}
