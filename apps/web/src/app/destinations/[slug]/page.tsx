import { notFound } from 'next/navigation'
import { TopNav } from '@/components/client/top-nav'
import { DestinationHeader } from '@/components/client/destination-header'
import { DestinationServices } from '@/components/client/destination-services'
import { OtherDestinations } from '@/components/client/other-destinations'
import {
  DESTINATION_SLUGS,
  getDestinationBySlug,
} from '@/data/destinations'
import { BRAND_DEFAULTS } from '@/lib/brand'

/**
 * /destinations/[slug] — overview page for a single destination.
 * - Pre-renders all destination slugs statically at build.
 * - TopNav floats over the 70vh photo hero.
 * - Below the hero: service grid (Add to cart) + cross-sell strip.
 */

// Next.js 15+: params is a Promise in App Router when dynamic.
type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return DESTINATION_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) return { title: `Destination not found — ${BRAND_DEFAULTS.name}` }
  return {
    title: `${dest.name} (${dest.airportCode}) — ${BRAND_DEFAULTS.name}`,
    description: dest.description,
  }
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) notFound()

  return (
    <div className="bg-vg-bg text-white min-h-screen">
      <div className="relative">
        <TopNav />
        <DestinationHeader dest={dest} />
      </div>
      <DestinationServices dest={dest} />
      <OtherDestinations currentSlug={dest.slug} />
    </div>
  )
}
