import { TopNav } from '@/components/client/top-nav'
import { FastTrackHero } from '@/components/client/fast-track-hero'
import { AirportCoverage } from '@/components/client/airport-coverage'
import { WhyFastTrack } from '@/components/client/why-fast-track'
import { HowItWorks } from '@/components/client/how-it-works'
import { Testimonials } from '@/components/client/testimonials'
import { StatsBand } from '@/components/client/stats-band'
import { FaqTeaser } from '@/components/client/faq-teaser'
import { SiteFooter } from '@/components/client/site-footer'
import { FxBootstrap } from '@/components/client/fx-bootstrap'

export default function HomePage() {
  return (
    <div className="bg-vg-bg text-vg-text min-h-screen">
      <FxBootstrap />
      <div className="relative">
        <TopNav variant="transparent" />
        <FastTrackHero />
      </div>
      <AirportCoverage />
      <WhyFastTrack />
      <HowItWorks />
      <Testimonials />
      <StatsBand />
      <FaqTeaser />
      <SiteFooter />
    </div>
  )
}
