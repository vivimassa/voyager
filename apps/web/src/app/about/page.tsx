import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'

export default function AboutPage() {
  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1 max-w-[760px] w-full mx-auto px-6 md:px-10 py-12 md:py-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-vg-text tracking-tight">About Voyager</h1>
        <p className="mt-3 text-lg text-vg-text-muted">Fast Track at every Vietnamese airport, powered by Vihat.</p>

        <div className="mt-10 prose prose-slate max-w-none">
          <p>
            Voyager is the consumer brand for Vihat’s airport priority service network — operating Fast Track lanes at HAN, SGN, DAD, CXR, HUI, THD and VII. We built Voyager because the queue at Vietnamese airports keeps getting longer, and the people we serve — frequent flyers, families, business travellers — keep losing time they don’t have.
          </p>
          <p>
            Every booking is fulfilled by a Vihat-certified greeter who knows the airport inside out. Same staff, same lanes, same standard of service whether you’re flying out of HAN at 5am or landing in CXR after a 14-hour day.
          </p>
          <p>
            We accept Vietnamese cards via VNPay, international cards, and good old-fashioned bank transfer — confirmation in seconds either way. Every Fast Track ID is unique, encrypted, and tied to your booking record so airport security can verify in one scan.
          </p>
          <p className="text-sm text-vg-text-subtle">
            Hotline: <a href="tel:+842471088888" className="font-semibold">+84 24 7108 8888</a> · Email: <a href="mailto:hello@voyager.vn" className="font-semibold">hello@voyager.vn</a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
