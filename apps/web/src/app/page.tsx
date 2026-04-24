import { TopNav } from '@/components/client/top-nav'
import { HomeSearchHero } from '@/components/client/home-search-hero'
import { JourneyMap } from '@/components/client/journey-map'
import { ConciergeStrip } from '@/components/client/concierge-strip'
import { LifestyleBundles } from '@/components/client/lifestyle-bundles'
import { BrowseDestinations } from '@/components/client/browse-destinations'
import { PeaceOfMind } from '@/components/client/peace-of-mind'
import { HowItWorks } from '@/components/client/how-it-works'
import { OffersTeaser } from '@/components/client/offers-teaser'
import { SiteFooter } from '@/components/client/site-footer'

export default function HomePage() {
  return (
    <div className="bg-vg-bg text-vg-text min-h-screen">
      <div className="relative">
        <TopNav variant="transparent" />
        <HomeSearchHero />
      </div>
      <JourneyMap />
      <ConciergeStrip />
      <LifestyleBundles />
      <BrowseDestinations />
      <PeaceOfMind />
      <HowItWorks />
      <OffersTeaser />
      <SiteFooter />
    </div>
  )
}
