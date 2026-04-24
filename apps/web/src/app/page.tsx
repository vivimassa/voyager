import { TopNav } from '@/components/client/top-nav'
import { HomeHero } from '@/components/client/home-hero'
import { ServicesBand } from '@/components/client/services-band'
import { TrustBand } from '@/components/client/trust-band'

/**
 * Voyager client portal — home page.
 * Destination-first editorial layout (NOT Horizon glass). Full-bleed dark
 * background; body's default `bg-hz-bg` is overridden via a wrapper class
 * so this page can stand on its own while the ops portal keeps its Horizon
 * chrome.
 */
export default function HomePage() {
  return (
    <div className="bg-vg-bg text-white min-h-screen">
      <div className="relative">
        <TopNav />
        <HomeHero />
      </div>
      <ServicesBand />
      <TrustBand />
    </div>
  )
}
