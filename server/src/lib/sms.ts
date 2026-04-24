/**
 * Voyager SMS gateway — pluggable provider abstraction.
 *
 * Exposes a single `sendSms(phone, message)` function. The concrete provider
 * is chosen at runtime from the SMS_PROVIDER env var:
 *
 *   console  — development default. Logs to server stdout, never leaves the box.
 *   twilio   — global SMS gateway. Best for dev/test + non-VN traffic.
 *   esms     — eSMS.vn Vietnamese brandname SMS. Best for production VN traffic.
 *
 * Swapping providers is an env-only change: no route code touches this file,
 * and this file is the only place that knows about specific vendors. When you
 * register a brandname with eSMS.vn and want to cut over, flip SMS_PROVIDER
 * from `twilio` to `esms` and restart the server.
 *
 * Phone format note: we normalise to E.164 with a leading '+' before dispatch,
 * regardless of how the rest of the codebase stores numbers (without '+').
 */

export type SmsResult = {
  /** true if the provider accepted the message for delivery */
  ok: boolean
  /** provider-returned message id or trace id, if any */
  messageId?: string
  /** human-readable error on failure */
  error?: string
  /** which provider handled (or tried to handle) the send */
  provider: SmsProviderName
}

type SmsProviderName = 'console' | 'twilio' | 'esms'

interface SmsProvider {
  readonly name: SmsProviderName
  send(phoneE164: string, message: string): Promise<SmsResult>
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/**
 * Normalise a phone number to E.164 with a single leading '+'. Accepts phones
 * that are already in E.164 form, or raw digits (we add '+').
 */
function toE164(phone: string): string {
  const trimmed = phone.trim()
  if (trimmed.startsWith('+')) return trimmed
  return `+${trimmed.replace(/\D/g, '')}`
}

// ─── Console provider (dev default) ────────────────────────────────────────

const consoleProvider: SmsProvider = {
  name: 'console',
  async send(phoneE164, message) {
    // Padded box so the OTP is easy to spot in server logs.
    const line = '─'.repeat(48)
    console.log(`\n${line}`)
    console.log(`  [SMS/console] to ${phoneE164}`)
    console.log(`  ${message}`)
    console.log(`${line}\n`)
    return { ok: true, provider: 'console', messageId: `console-${Date.now()}` }
  },
}

// ─── Twilio provider ───────────────────────────────────────────────────────

/**
 * Twilio integration. Lazy-requires the SDK so that a dev who hasn't run
 * `npm install twilio` yet still gets a useful runtime error rather than a
 * crash on import — AND so that choosing `console` in dev doesn't incur the
 * Twilio SDK's module load cost.
 *
 * Config is read fresh on each send so you can change env vars without
 * restarting during local experimentation. In production that's a no-op since
 * env doesn't move.
 */
const twilioProvider: SmsProvider = {
  name: 'twilio',
  async send(phoneE164, message) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_FROM_NUMBER

    if (!accountSid || !authToken || !fromNumber) {
      return {
        ok: false,
        provider: 'twilio',
        error:
          'Twilio env vars missing — set TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER in server/.env',
      }
    }

    try {
      // Dynamic import — SDK only loaded if this provider is selected.
      const twilioMod = (await import('twilio')) as unknown as {
        default: (sid: string, token: string) => {
          messages: {
            create: (args: {
              body: string
              from: string
              to: string
            }) => Promise<{ sid: string }>
          }
        }
      }
      const client = twilioMod.default(accountSid, authToken)
      const res = await client.messages.create({
        body: message,
        from: fromNumber,
        to: phoneE164,
      })
      return { ok: true, provider: 'twilio', messageId: res.sid }
    } catch (err) {
      return {
        ok: false,
        provider: 'twilio',
        error: err instanceof Error ? err.message : 'twilio send failed',
      }
    }
  },
}

// ─── eSMS.vn provider (Vietnamese brandname SMS) ──────────────────────────

/**
 * eSMS.vn integration — stub ready for production rollout in Vietnam.
 *
 * Before enabling this:
 *   1. Sign up at https://esms.vn and create a brandname (e.g. VOYAGER).
 *      Brandname registration takes 1-3 weeks and requires business docs.
 *   2. Grab ApiKey + SecretKey from the eSMS dashboard.
 *   3. Set ESMS_API_KEY, ESMS_SECRET_KEY, ESMS_BRANDNAME in server/.env.
 *   4. Set SMS_PROVIDER=esms and restart.
 *
 * eSMS HTTP contract (SMS/MultiChannel/SendMultipleMessage_V4_get):
 *   GET https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get
 *     ?ApiKey=...&SecretKey=...&Phone=84...&Content=...
 *     &Brandname=...&SmsType=2&IsUnicode=0
 * Response: { CodeResult: '100' on success, SMSID: '...', ErrorMessage: '...' }
 *
 * Vietnam regulatory note: SmsType=2 = brandname OTP. Don't send advertising
 * (SmsType=1) through the OTP pipeline — mobile carriers will block.
 */
const esmsProvider: SmsProvider = {
  name: 'esms',
  async send(phoneE164, message) {
    const apiKey = process.env.ESMS_API_KEY
    const secretKey = process.env.ESMS_SECRET_KEY
    const brandname = process.env.ESMS_BRANDNAME

    if (!apiKey || !secretKey || !brandname) {
      return {
        ok: false,
        provider: 'esms',
        error:
          'eSMS env vars missing — set ESMS_API_KEY / ESMS_SECRET_KEY / ESMS_BRANDNAME in server/.env',
      }
    }

    // eSMS expects the phone WITHOUT the leading '+'.
    const phone = phoneE164.replace(/^\+/, '')

    const params = new URLSearchParams({
      ApiKey: apiKey,
      SecretKey: secretKey,
      Phone: phone,
      Content: message,
      Brandname: brandname,
      SmsType: '2', // 2 = brandname OTP
      IsUnicode: '0',
    })

    try {
      const url = `https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get?${params.toString()}`
      const res = await fetch(url)
      const data = (await res.json()) as {
        CodeResult?: string
        SMSID?: string
        ErrorMessage?: string
      }
      if (data.CodeResult === '100') {
        return { ok: true, provider: 'esms', messageId: data.SMSID }
      }
      return {
        ok: false,
        provider: 'esms',
        error: `eSMS ${data.CodeResult ?? '?'}: ${data.ErrorMessage ?? 'unknown'}`,
      }
    } catch (err) {
      return {
        ok: false,
        provider: 'esms',
        error: err instanceof Error ? err.message : 'eSMS send failed',
      }
    }
  },
}

// ─── Registry + picker ────────────────────────────────────────────────────

const PROVIDERS: Record<SmsProviderName, SmsProvider> = {
  console: consoleProvider,
  twilio: twilioProvider,
  esms: esmsProvider,
}

function pickProvider(): SmsProvider {
  const raw = (process.env.SMS_PROVIDER ?? 'console').trim().toLowerCase()
  if (raw in PROVIDERS) return PROVIDERS[raw as SmsProviderName]
  console.warn(
    `[sms] Unknown SMS_PROVIDER="${raw}", falling back to console. ` +
      `Valid values: ${Object.keys(PROVIDERS).join(', ')}.`,
  )
  return consoleProvider
}

// ─── Public API ───────────────────────────────────────────────────────────

/**
 * Send an SMS using the configured provider. Never throws — always returns
 * an SmsResult so callers can pattern-match on ok/error cleanly.
 */
export async function sendSms(phone: string, message: string): Promise<SmsResult> {
  const provider = pickProvider()
  return provider.send(toE164(phone), message)
}

/**
 * Returns the currently configured provider's name — useful for startup
 * diagnostics and for unit tests that want to skip real sends.
 */
export function getActiveSmsProvider(): SmsProviderName {
  return pickProvider().name
}
