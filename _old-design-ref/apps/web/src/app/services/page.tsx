import Link from 'next/link'

const SERVICES = [
  { icon: '🚗', title: 'Airport pickup', desc: 'Private car waiting when you land', href: '/services/airport-pickup', color: '#ECFDF5' },
  { icon: '⚡', title: 'Fast track & VIP', desc: 'Skip queues. Private lounge access.', href: '/services/fast-track', color: '#EFF6FF' },
  { icon: '🏨', title: 'Hotels tonight', desc: 'Verified hotels near your airport', href: '/services/hotels', color: '#FFF7ED' },
  { icon: '🗺️', title: 'Tours & activities', desc: 'Curated day trips with local guides', href: '/services/tours', color: '#F5F3FF' },
]

export default function ServicesPage() {
  return (
    <div className="pt-[72px] bg-[var(--color-vg-bg-off)] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-[36px] font-bold tracking-tight text-center mb-3">All services</h1>
        <p className="text-[16px] text-[var(--color-vg-text-2)] text-center mb-12">Everything you need for your Vietnam airport arrival</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map(s => (
            <Link key={s.title} href={s.href} className="flex items-center gap-5 bg-white border border-[var(--color-vg-border)] rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: s.color }}>{s.icon}</div>
              <div>
                <h2 className="text-[17px] font-bold tracking-tight mb-1">{s.title}</h2>
                <p className="text-[14px] text-[var(--color-vg-text-2)]">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
