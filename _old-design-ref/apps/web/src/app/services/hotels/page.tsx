'use client'
import { useState } from 'react'
import Link from 'next/link'

const HOTELS = [
  { id: 1, name: 'Pullman Saigon Centre', stars: 5, rating: '8.8', reviews: 1247, distance: '5.2 km from SGN', price: 2400000, oldPrice: 2900000, amenities: ['Pool', 'Spa', 'Breakfast', 'WiFi'], badge: 'Voyager Pick', gradient: 'linear-gradient(135deg,#1E3A5F,#2D5A8A)', cancel: true },
  { id: 2, name: 'Novotel Airport', stars: 4, rating: '8.4', reviews: 2341, distance: '1.2 km from SGN', price: 1200000, oldPrice: 1500000, amenities: ['Breakfast', 'WiFi', 'Shuttle'], gradient: 'linear-gradient(135deg,#374151,#4B5563)', cancel: true },
  { id: 3, name: 'Holiday Inn Saigon', stars: 4, rating: '8.1', reviews: 897, distance: '3.8 km from SGN', price: 980000, oldPrice: null, amenities: ['WiFi', 'Restaurant', 'Gym'], gradient: 'linear-gradient(135deg,#0C4A6E,#0EA5E9)', cancel: false },
  { id: 4, name: 'ibis Styles Airport', stars: 3, rating: '7.6', reviews: 1834, distance: '0.8 km from SGN', price: 580000, oldPrice: 720000, amenities: ['WiFi', 'Breakfast'], badge: 'Closest', gradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)', cancel: true },
]

const FILTERS = ['Near airport', 'District 1', 'District 7', 'Beach area']

export default function HotelsPage() {
  const [filter, setFilter] = useState('Near airport')

  return (
    <div className="pt-[72px]">
      <div className="relative h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8590C] via-[#C2410C] to-[#9A3412]" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <h1 className="font-display text-[40px] font-bold text-white tracking-tight mb-2">Hotels tonight</h1>
            <p className="text-[16px] text-white/60 max-w-md">Verified hotels near Vietnamese airports. Instant confirmation. Most with free cancellation.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all ${
                filter === f ? 'bg-[#E8590C] text-white' : 'bg-white border border-[var(--color-vg-border)] text-[var(--color-vg-text-2)] hover:border-[#CBD5E1]'
              }`}>{f}</button>
          ))}
          <span className="text-[13px] text-[var(--color-vg-text-3)] ml-2">{HOTELS.length} hotels found</span>
        </div>

        {/* Hotel list */}
        <div className="space-y-5">
          {HOTELS.map(h => (
            <div key={h.id} className="bg-white border border-[var(--color-vg-border)] rounded-2xl overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
              <div className="md:w-[300px] h-[200px] md:h-auto relative flex-shrink-0">
                <div className="w-full h-full" style={{ background: h.gradient }} />
                {h.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-bold bg-white/90 text-[var(--color-vg-text)]">{h.badge}</span>
                )}
              </div>
              <div className="flex-1 p-5 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-[18px] font-bold tracking-tight">{h.name}</h3>
                    <div className="text-[var(--color-vg-gold)] text-[13px] tracking-wider">{'★'.repeat(h.stars)}</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-vg-green-light)]">
                    <span className="text-[15px] font-bold text-[var(--color-vg-green-dark)]">{h.rating}</span>
                    <span className="text-[11px] text-[var(--color-vg-text-3)]">({h.reviews.toLocaleString()})</span>
                  </div>
                </div>
                <p className="text-[13px] text-[var(--color-vg-text-2)] mb-3">📍 {h.distance}</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {h.amenities.map(a => (
                    <span key={a} className="px-2.5 py-1 rounded-md text-[12px] font-medium bg-[var(--color-vg-bg-off)] text-[var(--color-vg-text-2)]">{a}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    {h.oldPrice && <span className="text-[14px] text-[var(--color-vg-text-3)] line-through mr-2">₫{h.oldPrice.toLocaleString()}</span>}
                    <span className="text-[22px] font-bold">₫{h.price.toLocaleString()}</span>
                    <span className="text-[13px] text-[var(--color-vg-text-3)]"> /night</span>
                    {h.cancel && <p className="text-[12px] text-[var(--color-vg-success)] font-medium mt-0.5">Free cancellation before 6PM</p>}
                  </div>
                  <Link href="/booking" className="px-6 py-3 bg-[#E8590C] text-white rounded-xl text-[14px] font-bold hover:bg-[#C2410C] transition-colors">
                    Book now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
