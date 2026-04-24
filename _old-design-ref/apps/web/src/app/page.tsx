import Link from 'next/link'
import { ServiceCard, ExperienceCard } from '@/components/voyager/cards'

const SERVICES = [
  { icon: '🚗', title: 'Airport pickup', subtitle: 'Car waiting when you land. Track your driver in real-time.', price: '₫320,000', href: '/services/airport-pickup', color: '#0C9B6A', bgColor: '#ECFDF5', badge: 'Most booked' },
  { icon: '⚡', title: 'Fast track & VIP', subtitle: 'Skip immigration queues. Private lounge access available.', price: '₫450,000', href: '/services/fast-track', color: '#1E3A5F', bgColor: '#EFF6FF', badge: 'Premium' },
  { icon: '🏨', title: 'Hotels tonight', subtitle: 'Verified hotels near your airport. Free cancellation.', price: '₫580,000', href: '/services/hotels', color: '#E8590C', bgColor: '#FFF7ED' },
  { icon: '🗺️', title: 'Tours & activities', subtitle: 'Curated day trips with local guides. Book for tomorrow.', price: '₫450,000', href: '/services/tours', color: '#7C3AED', bgColor: '#F5F3FF' },
]

const EXPERIENCES = [
  { title: 'Mekong Delta full-day', meta: 'Full day · From HCMC · Free cancel', price: '₫950,000', rating: '4.8', reviews: '2,847', badge: 'Bestseller', gradient: 'linear-gradient(135deg,#7BC8A4,#4AA87A)', href: '/services/tours' },
  { title: 'SGN Fast Track VIP', meta: 'Immigration · Meet at gate', price: '₫1,800,000', rating: '4.9', reviews: '1,204', badge: 'VIP', gradient: 'linear-gradient(135deg,#1E3A5F,#2D5A8A)', href: '/services/fast-track' },
  { title: 'Premium SUV to District 1', meta: 'Private · 6 seats · WiFi', price: '₫520,000', rating: '4.9', reviews: '3,412', badge: 'Popular', gradient: 'linear-gradient(135deg,#374151,#1F2937)', href: '/services/airport-pickup' },
  { title: 'Cu Chi Tunnels & war history', meta: '5 hours · From HCMC · Guide', price: '₫680,000', rating: '4.7', reviews: '1,623', gradient: 'linear-gradient(135deg,#E8B88A,#D4956A)', href: '/services/tours' },
]

const AIRPORTS = [
  { code: 'SGN', name: 'Tan Son Nhat', city: 'Ho Chi Minh City', services: 124, gradient: 'linear-gradient(135deg,#1A5632,#2D8A56)' },
  { code: 'HAN', name: 'Noi Bai', city: 'Hanoi', services: 86, gradient: 'linear-gradient(135deg,#2C3E7B,#5A7BC4)' },
  { code: 'DAD', name: 'Da Nang', city: 'Da Nang', services: 52, gradient: 'linear-gradient(135deg,#0C4A6E,#0EA5E9)' },
  { code: 'CXR', name: 'Cam Ranh', city: 'Nha Trang', services: 34, gradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)' },
  { code: 'PQC', name: 'Phu Quoc', city: 'Phu Quoc Island', services: 28, gradient: 'linear-gradient(135deg,#0C9B6A,#34D399)' },
]

const REVIEWS = [
  { text: "The fast track service was worth every dong. We walked through immigration in 8 minutes while the regular line was 90+ minutes. The lounge was beautiful.", name: 'Yuki Tanaka', from: 'Tokyo, Japan', initials: 'YT', color: '#3B82F6' },
  { text: "Driver was already waiting when we walked out. Clean SUV, cold water, WiFi. 35 minutes later we were at our hotel. Booked everything from the immigration queue.", name: 'Sarah Laurent', from: 'Paris, France', initials: 'SL', color: '#8B5CF6' },
  { text: "Used Voyager for pickup, hotel, and a Mekong tour — all booked in 5 minutes. Everything just worked. The hotel was exactly what we needed for one night near the airport.", name: 'Min-Jun Kim', from: 'Seoul, South Korea', initials: 'MK', color: '#EC4899' },
]

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1800&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,26,42,0.55)] via-[rgba(15,26,42,0.35)] to-[rgba(15,26,42,0.7)]" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-white/90 text-[13px] font-medium mb-7">
            <span className="w-2 h-2 rounded-full bg-[var(--color-vg-green-glow)] animate-pulse" />
            Serving 5 airports across Vietnam
          </div>
          <h1 className="font-display text-[48px] md:text-[64px] font-extrabold text-white tracking-[-2.5px] leading-[1.08] mb-5">
            Land. Tap. <em className="font-normal italic text-[var(--color-vg-green-glow)]">Sorted.</em>
          </h1>
          <p className="text-[17px] md:text-[19px] text-white/70 leading-relaxed max-w-xl mx-auto mb-10">
            Airport pickup, fast track, hotels &amp; tours — everything you need from the moment you land in Vietnam.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch overflow-hidden">
            <div className="flex-1 px-5 py-4 text-left border-b md:border-b-0 md:border-r border-[var(--color-vg-border)] cursor-pointer hover:bg-[#F8FAFC] transition-colors">
              <div className="text-[11px] text-[var(--color-vg-text-3)] font-bold uppercase tracking-wider mb-1">Airport</div>
              <div className="text-[15px] text-[var(--color-vg-text)] font-medium">SGN — Tan Son Nhat</div>
            </div>
            <div className="flex-1 px-5 py-4 text-left border-b md:border-b-0 md:border-r border-[var(--color-vg-border)] cursor-pointer hover:bg-[#F8FAFC] transition-colors">
              <div className="text-[11px] text-[var(--color-vg-text-3)] font-bold uppercase tracking-wider mb-1">Date</div>
              <div className="text-[15px] text-[var(--color-vg-text)] font-medium">Today, Apr 20</div>
            </div>
            <div className="flex-1 px-5 py-4 text-left cursor-pointer hover:bg-[#F8FAFC] transition-colors">
              <div className="text-[11px] text-[var(--color-vg-text-3)] font-bold uppercase tracking-wider mb-1">Service</div>
              <div className="text-[15px] text-[var(--color-vg-text-3)]">All services</div>
            </div>
            <Link href="/services/airport-pickup" className="px-8 py-4 bg-[var(--color-vg-green)] text-white text-[15px] font-bold hover:bg-[var(--color-vg-green-dark)] transition-colors flex items-center justify-center">
              Search
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Airport pickup', 'Fast track', 'VIP lounge', 'Hotel tonight', 'Tour tomorrow'].map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-white/10 border border-white/12 text-white/65 text-[13px] font-medium cursor-pointer hover:bg-white/18 hover:text-white transition-all">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRESS BAR ═══ */}
      <div className="flex items-center justify-center gap-12 py-8 border-b border-[var(--color-vg-border)]">
        <span className="text-[11px] text-[var(--color-vg-text-3)] font-bold uppercase tracking-widest">Featured in</span>
        {['VnExpress', 'TripAdvisor', 'Lonely Planet', 'The Saigoneer', 'Vietcetera'].map(name => (
          <span key={name} className="text-[17px] font-bold text-[#CBD5E1] tracking-tight hidden md:block">{name}</span>
        ))}
      </div>

      {/* ═══ SERVICES GRID ═══ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-md text-[12px] font-bold uppercase tracking-wider bg-[var(--color-vg-green-light)] text-[var(--color-vg-green-dark)] mb-3">Services</span>
          <h2 className="font-display text-[36px] md:text-[40px] font-bold tracking-[-1.5px] mb-3">What do you need right now?</h2>
          <p className="text-[16px] text-[var(--color-vg-text-2)]">Everything from landing to exploring — booked in 60 seconds</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
      </section>

      {/* ═══ TRENDING ═══ */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-md text-[12px] font-bold uppercase tracking-wider bg-[var(--color-vg-gold-light)] text-[#92400E] mb-3">Trending</span>
          <h2 className="font-display text-[36px] md:text-[40px] font-bold tracking-[-1.5px] mb-3">Most loved this season</h2>
          <p className="text-[16px] text-[var(--color-vg-text-2)]">Handpicked by our team and rated highest by travelers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPERIENCES.map(e => <ExperienceCard key={e.title} {...e} />)}
        </div>
      </section>

      {/* ═══ AIRPORTS ═══ */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-md text-[12px] font-bold uppercase tracking-wider bg-[#E0E7FF] text-[#3730A3] mb-3">Airports</span>
          <h2 className="font-display text-[36px] md:text-[40px] font-bold tracking-[-1.5px]">We cover Vietnam</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {AIRPORTS.map(a => (
            <Link key={a.code} href="/services/airport-pickup" className="group relative rounded-2xl overflow-hidden h-[180px] md:h-[220px] cursor-pointer">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ background: a.gradient }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <div className="text-[24px] font-bold tracking-tight">{a.code}</div>
                <div className="text-[12px] text-white/70">{a.city} · {a.services} services</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="mx-6 mb-20">
        <div className="max-w-7xl mx-auto bg-[var(--color-vg-bg-off)] rounded-3xl px-8 md:px-16 py-16">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-md text-[12px] font-bold uppercase tracking-wider bg-[var(--color-vg-green-light)] text-[var(--color-vg-green-dark)] mb-3">How it works</span>
            <h2 className="font-display text-[36px] font-bold tracking-[-1.5px]">Booked in 60 seconds</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { num: '1', title: 'Choose your airport', desc: 'Select your arrival airport and tell us your flight number. We auto-detect your landing time.' },
              { num: '2', title: 'Pick your services', desc: 'Airport pickup, fast track, hotel, tours — bundle everything or book individually. Instant pricing.' },
              { num: '3', title: 'Land and relax', desc: 'Your driver tracks your flight. Fast track staff meets you at the gate. Everything is confirmed.' },
            ].map(step => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-vg-green)] text-white inline-flex items-center justify-center font-display font-extrabold text-[22px] mb-5 shadow-[0_8px_24px_rgba(12,155,106,0.25)]">{step.num}</div>
                <h3 className="text-[17px] font-bold tracking-tight mb-2">{step.title}</h3>
                <p className="text-[14px] text-[var(--color-vg-text-2)] leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-md text-[12px] font-bold uppercase tracking-wider bg-[var(--color-vg-gold-light)] text-[#92400E] mb-3">Reviews</span>
          <h2 className="font-display text-[36px] font-bold tracking-[-1.5px]">Loved by travelers worldwide</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map(r => (
            <div key={r.name} className="rounded-2xl border border-[var(--color-vg-border)] p-7 hover:shadow-md transition-shadow">
              <div className="text-[var(--color-vg-gold)] text-[16px] tracking-widest mb-4">★★★★★</div>
              <p className="text-[15px] text-[var(--color-vg-text-2)] leading-relaxed mb-5 italic">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[14px]" style={{ background: r.color }}>{r.initials}</div>
                <div>
                  <div className="text-[14px] font-semibold">{r.name}</div>
                  <div className="text-[12px] text-[var(--color-vg-text-3)]">{r.from}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TRUST METRICS ═══ */}
      <section className="mx-6 mb-20">
        <div className="max-w-7xl mx-auto bg-[var(--color-vg-navy-dark)] rounded-3xl px-8 md:px-16 py-16 relative overflow-hidden">
          <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.12),transparent_70%)]" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { num: '12,400+', label: 'Verified reviews' },
              { num: '340+', label: 'Airport services' },
              { num: '98%', label: 'Instant confirmation' },
              { num: '5', label: 'Airports covered' },
            ].map(m => (
              <div key={m.label} className="text-center">
                <div className="font-display text-[40px] md:text-[48px] font-extrabold text-white tracking-[-2px] mb-1">{m.num}</div>
                <div className="text-[14px] text-white/50 font-medium">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="mx-6 mb-20">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[var(--color-vg-green)] via-[var(--color-vg-green-dark)] to-[#065E42] rounded-3xl px-8 md:px-16 py-16 text-center relative overflow-hidden">
          <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-white/[0.06]" />
          <h2 className="font-display text-[32px] md:text-[38px] font-bold text-white tracking-[-1px] mb-3 relative z-10">Your next arrival starts here</h2>
          <p className="text-[17px] text-white/70 mb-8 relative z-10">Book your airport services before you even board your flight</p>
          <Link href="/services/airport-pickup" className="inline-block px-9 py-4 bg-white text-[var(--color-vg-green-dark)] rounded-xl text-[16px] font-bold shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all relative z-10">
            Explore all services
          </Link>
        </div>
      </section>
    </>
  )
}
