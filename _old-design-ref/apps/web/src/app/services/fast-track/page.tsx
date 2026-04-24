'use client'
import { useState } from 'react'
import Link from 'next/link'

const SERVICES = [
  { id: 'fasttrack', name: 'Fast Track Immigration', desc: 'Skip the queue — staff meets you at the aircraft door and escorts through immigration in under 10 minutes.', price: 650000, badge: '⚡ 10 min through', rating: '4.9', reviews: '1,204', dark: false },
  { id: 'vip', name: 'VIP Terminal Lounge', desc: 'Private lounge with shower, food & drinks, fast immigration included. The ultimate arrival experience.', price: 1800000, badge: '👑 All-inclusive', rating: '4.9', reviews: '847', dark: true },
  { id: 'cip', name: 'CIP Room Access', desc: 'Comfortable seating, refreshments, priority boarding. Perfect for layovers or early arrivals.', price: 450000, badge: 'Comfortable', rating: '4.7', reviews: '623', dark: false },
  { id: 'porter', name: 'Luggage Porter', desc: 'Porter carries your bags from belt to your car. Never wrestle with luggage again.', price: 200000, badge: 'Convenient', rating: '4.8', reviews: '2,104', dark: false },
]

export default function FastTrackPage() {
  const [selected, setSelected] = useState<string[]>([])
  const [pax, setPax] = useState(2)
  const [direction, setDirection] = useState<'arrival' | 'departure'>('arrival')

  const total = selected.reduce((sum, id) => sum + (SERVICES.find(s => s.id === id)?.price || 0), 0) * pax

  return (
    <div className="pt-[72px]">
      <div className="relative h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#2C5282] to-[#1A365D]" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <span className="inline-block px-3 py-1 rounded-md text-[12px] font-bold bg-[var(--color-vg-gold)]/20 text-[var(--color-vg-gold)] mb-3">Premium</span>
            <h1 className="font-display text-[40px] font-bold text-white tracking-tight mb-2">Fast track & VIP</h1>
            <p className="text-[16px] text-white/60 max-w-md">Skip the queues. Get private lounge access. Start your trip in style.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Airport & direction */}
            <div className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-6">
              <h2 className="text-[16px] font-bold mb-4">Airport & direction</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Airport</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px] focus:outline-none focus:border-[var(--color-vg-green)]">
                    <option>SGN — Tan Son Nhat (Ho Chi Minh City)</option>
                    <option>HAN — Noi Bai (Hanoi)</option>
                    <option>DAD — Da Nang</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Number of travelers</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setPax(Math.max(1, pax - 1))} className="w-10 h-10 rounded-xl border border-[var(--color-vg-border)] flex items-center justify-center text-[18px] hover:bg-[var(--color-vg-bg-off)]">−</button>
                    <span className="text-[18px] font-bold w-8 text-center">{pax}</span>
                    <button onClick={() => setPax(pax + 1)} className="w-10 h-10 rounded-xl border border-[var(--color-vg-border)] flex items-center justify-center text-[18px] hover:bg-[var(--color-vg-bg-off)]">+</button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {(['arrival', 'departure'] as const).map(d => (
                  <button key={d} onClick={() => setDirection(d)}
                    className={`flex-1 py-3 rounded-xl text-[14px] font-semibold transition-all ${
                      direction === d ? 'bg-[#1E3A5F] text-white' : 'bg-[var(--color-vg-bg-off)] text-[var(--color-vg-text-2)] hover:bg-[var(--color-vg-border)]'
                    }`}>{d === 'arrival' ? '✈ Arrival' : '✈ Departure'}</button>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h2 className="text-[16px] font-bold">Select services</h2>
              {SERVICES.map(s => (
                <button key={s.id} onClick={() => setSelected(prev => prev.includes(s.id) ? prev.filter(x => x !== s.id) : [...prev, s.id])}
                  className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all ${
                    selected.includes(s.id) ? 'border-[var(--color-vg-green)] shadow-md' : 'border-[var(--color-vg-border)] hover:border-[#CBD5E1]'
                  } ${s.dark ? 'bg-[#1E3A5F] text-white' : 'bg-white'}`}>
                  <div className="p-5 flex gap-4">
                    <div className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                      selected.includes(s.id) ? 'bg-[var(--color-vg-green)] border-[var(--color-vg-green)]' : s.dark ? 'border-white/30' : 'border-[#CBD5E1]'
                    }`}>
                      {selected.includes(s.id) && <span className="text-white text-[11px]">✓</span>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[17px] font-bold">{s.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${s.dark ? 'bg-[var(--color-vg-gold)]/20 text-[var(--color-vg-gold)]' : 'bg-[var(--color-vg-bg-off)] text-[var(--color-vg-text-2)]'}`}>{s.badge}</span>
                      </div>
                      <p className={`text-[13px] mb-3 ${s.dark ? 'text-white/60' : 'text-[var(--color-vg-text-2)]'}`}>{s.desc}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-[18px] font-bold">₫{s.price.toLocaleString()}<span className={`text-[12px] font-normal ${s.dark ? 'text-white/40' : 'text-[var(--color-vg-text-3)]'}`}>/person</span></span>
                        <span className={`text-[13px] ${s.dark ? 'text-white/50' : 'text-[var(--color-vg-text-3)]'}`}>★ {s.rating} ({s.reviews})</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="sticky top-[88px] bg-white border border-[var(--color-vg-border)] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold mb-4">Booking summary</h3>
              {selected.length === 0 ? (
                <p className="text-[14px] text-[var(--color-vg-text-3)] py-8 text-center">Select services to see pricing</p>
              ) : (
                <div className="space-y-3 text-[14px]">
                  <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Airport</span><span className="font-medium">SGN</span></div>
                  <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Direction</span><span className="font-medium capitalize">{direction}</span></div>
                  <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Travelers</span><span className="font-medium">{pax}</span></div>
                  <div className="border-t border-[var(--color-vg-border)] pt-3">
                    {selected.map(id => {
                      const s = SERVICES.find(x => x.id === id)!
                      return <div key={id} className="flex justify-between py-1"><span className="text-[var(--color-vg-text-2)]">{s.name}</span><span className="font-medium">₫{(s.price * pax).toLocaleString()}</span></div>
                    })}
                  </div>
                  <div className="border-t border-[var(--color-vg-border)] pt-3 flex justify-between">
                    <span className="font-bold">Total ({pax} pax)</span>
                    <span className="text-[20px] font-bold text-[#1E3A5F]">₫{total.toLocaleString()}</span>
                  </div>
                </div>
              )}
              <Link href="/booking" className={`block w-full mt-5 px-6 py-3.5 text-center rounded-xl text-[15px] font-bold transition-colors ${
                selected.length > 0
                  ? 'bg-[#1E3A5F] text-white hover:bg-[#152B47] shadow-lg'
                  : 'bg-[var(--color-vg-border)] text-[var(--color-vg-text-3)] pointer-events-none'
              }`}>
                {selected.length > 0 ? 'Book now' : 'Select a service'}
              </Link>
              <p className="text-center text-[12px] text-[var(--color-vg-text-3)] mt-3">All services include meet & greet with name board</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
