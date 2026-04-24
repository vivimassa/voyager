import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/voyager/navbar'
import { Footer } from '@/components/voyager/footer'

export const metadata: Metadata = {
  title: 'Voyager — Airport Travel Services Vietnam',
  description: 'Airport pickup, fast track, VIP lounge, hotels & tours across Vietnam. Land. Tap. Sorted.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
