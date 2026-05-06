import { z } from 'zod'

const serverEnvSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),

  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),

  PORT: z.coerce.number().default(3002),
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),

  CORS_ORIGIN: z.string().default('*'),
  CLIENT_URL: z.string().default('http://localhost:3000'),

  ML_API_URL: z.string().url().optional(),

  // VNPay (sandbox-friendly defaults so dev boots without real merchant creds)
  VNPAY_TMN_CODE: z.string().default('VOYAGER1'),
  VNPAY_HASH_SECRET: z.string().default('VOYAGERLOCALSECRETLOCALSECRETLOC'),
  VNPAY_PAY_URL: z.string().default('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'),
  VNPAY_RETURN_URL: z.string().default('http://localhost:3000/api/payments/vnpay/return'),

  // Bank transfer fallback (display-only — agent confirms manually)
  BANK_NAME: z.string().default('Vietcombank'),
  BANK_ACCOUNT_NAME: z.string().default('VIHAT TOUR CO., LTD'),
  BANK_ACCOUNT_NO: z.string().default('1234567890'),
  BANK_BIN: z.string().default('970436'),

  // Vietcombank reference rate refresh (USD -> VND)
  FX_REFRESH_HOURS: z.coerce.number().default(6),
  FX_FALLBACK_USD_VND: z.coerce.number().default(25500),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

let _serverEnv: ServerEnv | null = null

export function validateServerEnv(): ServerEnv {
  if (_serverEnv) return _serverEnv

  const result = serverEnvSchema.safeParse(process.env)
  if (!result.success) {
    console.error('\u274c Invalid server environment variables:')
    for (const issue of result.error.issues) {
      console.error(`   ${issue.path.join('.')}: ${issue.message}`)
    }
    process.exit(1)
  }

  _serverEnv = result.data
  return _serverEnv
}

export function getServerEnv(): ServerEnv {
  if (!_serverEnv) throw new Error('Call validateServerEnv() before getServerEnv()')
  return _serverEnv
}
