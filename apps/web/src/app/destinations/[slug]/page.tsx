import { notFound } from 'next/navigation'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { DestinationHeader } from '@/components/client/destination-header'
import { DestinationServices } from '@/components/client/destination-services'
import { DestinationSummary } from '@/components/client/destination-summary'
import { GoodToKnow } from '@/components/client/good-to-know'
import { OtherDestinations } from '@/components/client/other-destinations'
import { MobileReserveBar } from '@/components/client/mobile-reserve-bar'
import { DESTINATION_SLUGS, getDestinationBySlug } from '@/data/destinations'
import { BRAND_DEFAULTS } from '@/lib/brand'
import { airportCity } from '@/lib/airport-cities'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return DESTINATION_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) return { title: `Destination not found — ${BRAND_DEFAULTS.name}` }
  return {
    title: `${dest.name} · Fly into ${airportCity(dest.airportCode, 'en')} — ${BRAND_DEFAULTS.name}`,
    description: dest.description,
  }
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) notFound()

  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <TopNav />
      <DestinationHeader dest={dest} />
      <main className="flex-1 px-6 md:px-10 py-8 max-w-[1280px] w-full mx-auto grid md:grid-cols-[1fr_340px] gap-8 pb-16 md:pb-0">
        <div className="flex flex-col gap-6">
          <DestinationServices dest={dest} />
          <GoodToKnow />
        </div>
        <DestinationSummary slug={dest.slug} />
      </main>
      <OtherDestinations currentSlug={dest.slug} />
      <SiteFooter />
      <MobileReserveBar slug={dest.slug} />
    </div>
  )
}
