import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import '@/lib/env'
import './globals.css'
import { AppShell } from '@/components/app-shell'
import { ThemeProvider } from '@/components/theme-provider'
import { DisplayProvider } from '@/components/display-provider'
import { UserProvider } from '@/components/user-provider'
import { AuthProvider } from '@/components/auth-provider'
import { QueryProvider } from '@/components/query-provider'
import { AuthOverlay } from '@/components/client/auth-overlay'
import { BrandSettingsModal } from '@/components/client/brand-settings-modal'
import { BRAND_DEFAULTS } from '@/lib/brand'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

// SSR-safe brand defaults (env-baked). Runtime browser overrides are layered on
// top by the client-side `useBrand` hook — they can't affect <title> on first
// paint, but the hook syncs document.title after mount if needed.
export const metadata: Metadata = {
  title: BRAND_DEFAULTS.name,
  description: BRAND_DEFAULTS.tagline,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col h-screen bg-hz-bg text-hz-text font-sans">
        <QueryProvider>
          <ThemeProvider>
            <DisplayProvider>
              <AuthProvider>
                <UserProvider>
                  <AppShell>{children}</AppShell>
                  <AuthOverlay />
                  <BrandSettingsModal />
                </UserProvider>
              </AuthProvider>
            </DisplayProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
