import { TopNav } from '@/components/client/top-nav'
import { HomeSearchHero } from '@/components/client/home-search-hero'
import { BrowseDestinations } from '@/components/client/browse-destinations'
import { HowItWorks } from '@/components/client/how-it-works'
import { WhyVoyager } from '@/components/client/why-voyager'
import { OffersTeaser } from '@/components/client/offers-teaser'
import { SiteFooter } from '@/components/client/site-footer'

export default function HomePage() {
  return (
    <div className="bg-vg-bg text-vg-text min-h-screen">
      <div className="relative">
        <TopNav variant="transparent" />
        <HomeSearchHero />
      </div>
      <BrowseDestinations />
      <HowItWorks />
      <WhyVoyager />
      <OffersTeaser />
      <SiteFooter />
    </div>
  )
}
