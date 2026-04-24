import Link from 'next/link'
import { ExperienceCard } from '@/components/voyager/cards'

const TOURS = [
  { title: 'Mekong Delta full-day adventure', meta: 'Full day · From HCMC · Free cancel', price: '₫950,000', rating: '4.8', reviews: '2,847', badge: 'Bestseller', gradient: 'linear-gradient(135deg,#7BC8A4,#4AA87A)', href: '/booking' },
  { title: 'Cu Chi Tunnels & war history', meta: '5 hours · From HCMC · Guide included', price: '₫680,000', rating: '4.7', reviews: '3,412', badge: 'Top rated', gradient: 'linear-gradient(135deg,#E8B88A,#D4956A)', href: '/booking' },
  { title: 'Ha Long Bay overnight cruise', meta: '2 days · From Hanoi · Meals included', price: '₫3,200,000', rating: '4.9', reviews: '1,623', badge: 'Premium', gradient: 'linear-gradient(135deg,#8BAAE8,#6A8AD4)', href: '/booking' },
  { title: 'Hoi An ancient town & lanterns', meta: '3 hours · Evening · Walking tour', price: '₫450,000', rating: '4.9', reviews: '987', badge: 'New', gradient: 'linear-gradient(135deg,#F5C4D4,#E88AA4)', href: '/booking' },
  { title: 'Saigon street food tour', meta: '4 hours · Evening · 10 tastings', price: '₫750,000', rating: '4.8', reviews: '1,456', gradient: 'linear-gradient(135deg,#F59E0B,#D97706)', href: '/booking' },
  { title: 'Da Nang Golden Bridge & Ba Na', meta: 'Full day · From Da Nang · Cable car', price: '₫1,100,000', rating: '4.6', reviews: '734', gradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)', href: '/booking' },
  { title: 'Sapa rice terraces 2-day trek', meta: '2 days · Homestay · Guide', price: '₫1,800,000', rating: '4.9', reviews: '521', badge: 'Adventure', gradient: 'linear-gradient(135deg,#059669,#34D399)', href: '/booking' },
  { title: 'Phu Quoc snorkeling & beaches', meta: 'Full day · Boat · Lunch included', price: '₫890,000', rating: '4.7', reviews: '892', gradient: 'linear-gradient(135deg,#0EA5E9,#38BDF8)', href: '/booking' },
]

const FILTERS = ['All tours', 'From HCMC', 'From Hanoi', 'From Da Nang', 'Full day', 'Multi-day']

export default function ToursPage() {
  return (
    <div className="pt-[72px]">
      <div className="relative h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95]" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <h1 className="font-display text-[40px] font-bold text-white tracking-tight mb-2">Tours & activities</h1>
            <p className="text-[16px] text-white/60 max-w-md">Curated day trips and multi-day adventures with verified local guides. Book today, explore tomorrow.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          {FILTERS.map((f, i) => (
            <button key={f} className={`px-5 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all ${
              i === 0 ? 'bg-[#7C3AED] text-white' : 'bg-white border border-[var(--color-vg-border)] text-[var(--color-vg-text-2)] hover:border-[#CBD5E1]'
            }`}>{f}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOURS.map(t => <ExperienceCard key={t.title} {...t} />)}
        </div>
      </div>
    </div>
  )
}
