import Link from 'next/link'

const BOOKINGS = [
  { id: 'VH-24095', service: 'Premium SUV Pickup', type: 'Airport pickup', airport: 'SGN', date: 'Apr 20, 2026', status: 'confirmed', statusLabel: 'Confirmed', price: '₫670,000', detail: 'SGN Terminal 2 → District 1' },
  { id: 'VH-24094', service: 'Fast Track Immigration', type: 'Fast track', airport: 'SGN', date: 'Apr 20, 2026', status: 'confirmed', statusLabel: 'Confirmed', price: '₫1,300,000', detail: '2 passengers · Arrival' },
  { id: 'VH-24088', service: 'Mekong Delta Adventure', type: 'Tour', airport: '—', date: 'Apr 21, 2026', status: 'pending', statusLabel: 'Confirming...', price: '₫1,900,000', detail: 'Full day · 2 pax · From HCMC' },
  { id: 'VH-24072', service: 'Standard Sedan Pickup', type: 'Airport pickup', airport: 'HAN', date: 'Mar 15, 2026', status: 'completed', statusLabel: 'Completed', price: '₫320,000', detail: 'HAN → Old Quarter' },
  { id: 'VH-24065', service: 'ibis Styles Airport', type: 'Hotel', airport: 'SGN', date: 'Mar 14, 2026', status: 'completed', statusLabel: 'Completed', price: '₫580,000', detail: '1 night · Near airport' },
]

const statusStyles: Record<string, string> = {
  confirmed: 'bg-[#ECFDF5] text-[#065F46]',
  pending: 'bg-[#FFF7ED] text-[#9A3412]',
  completed: 'bg-[#F1F5F9] text-[#475569]',
  cancelled: 'bg-[#FEF2F2] text-[#991B1B]',
}

export default function BookingsPage() {
  return (
    <div className="pt-[72px] bg-[var(--color-vg-bg-off)] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-display text-[28px] font-bold tracking-tight mb-2">My bookings</h1>
        <p className="text-[14px] text-[var(--color-vg-text-2)] mb-8">Track all your airport services and travel bookings</p>

        <div className="flex gap-2 mb-6">
          {['All', 'Upcoming', 'Completed', 'Cancelled'].map((tab, i) => (
            <button key={tab} className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all ${
              i === 0 ? 'bg-[var(--color-vg-green)] text-white' : 'bg-white border border-[var(--color-vg-border)] text-[var(--color-vg-text-2)] hover:border-[#CBD5E1]'
            }`}>{tab}</button>
          ))}
        </div>

        <div className="space-y-4">
          {BOOKINGS.map(b => (
            <div key={b.id} className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[15px] font-bold">{b.service}</span>
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${statusStyles[b.status]}`}>{b.statusLabel}</span>
                </div>
                <p className="text-[13px] text-[var(--color-vg-text-2)] mb-1">{b.detail}</p>
                <div className="flex items-center gap-3 text-[12px] text-[var(--color-vg-text-3)]">
                  <span>{b.id}</span>
                  <span>·</span>
                  <span>{b.date}</span>
                  {b.airport !== '—' && <><span>·</span><span>{b.airport}</span></>}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[17px] font-bold">{b.price}</span>
                <Link href="#" className="px-4 py-2 rounded-lg text-[13px] font-semibold border border-[var(--color-vg-border)] hover:bg-[var(--color-vg-bg-off)] transition-colors">
                  {b.status === 'completed' ? 'Rebook' : 'Details'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
