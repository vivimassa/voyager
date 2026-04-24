'use client'
import { useState } from 'react'
import Link from 'next/link'

const VEHICLES = [
  { id: 'sedan', name: 'Standard Sedan', desc: '4 seats · 2 luggage · Toyota Vios', price: 320000, time: '~15 min', img: '🚗' },
  { id: 'suv', name: 'Premium SUV', desc: '6 seats · 4 luggage · Ford Everest', price: 520000, time: '~15 min', img: '🚙', popular: true },
  { id: 'van', name: 'VIP Van', desc: '10 seats · 8 luggage · Mercedes Sprinter', price: 850000, time: '~20 min', img: '🚐' },
]

const DESTINATIONS = [
  'District 1 (center)', 'District 2 (Thu Duc)', 'District 7 (Phu My Hung)',
  'Binh Thanh', 'Tan Binh (near airport)', 'Custom address'
]

const ADDONS = [
  { id: 'meet', label: 'Meet & greet at gate', desc: 'Staff holds name board at arrival gate', price: 150000 },
  { id: 'child', label: 'Child car seat', desc: 'Ages 0-4, rear-facing', price: 80000 },
  { id: 'wifi', label: 'Portable WiFi', desc: '4G unlimited for 24h', price: 120000 },
]

export default function AirportPickupPage() {
  const [selected, setSelected] = useState('suv')
  const [destination, setDestination] = useState('')
  const [flight, setFlight] = useState('')
  const [addons, setAddons] = useState<string[]>([])

  const vehicle = VEHICLES.find(v => v.id === selected)!
  const addonTotal = addons.reduce((sum, id) => sum + (ADDONS.find(a => a.id === id)?.price || 0), 0)
  const total = vehicle.price + addonTotal

  const toggleAddon = (id: string) => {
    setAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <div className="relative h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#2D3748] to-[#1A202C]" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <span className="inline-block px-3 py-1 rounded-md text-[12px] font-bold bg-[var(--color-vg-green)]/20 text-[var(--color-vg-green-glow)] mb-3">Most booked</span>
            <h1 className="font-display text-[40px] font-bold text-white tracking-tight mb-2">Airport pickup</h1>
            <p className="text-[16px] text-white/60 max-w-md">Your driver tracks your flight and waits at arrivals. No surge pricing, no waiting.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight info */}
            <div className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-6">
              <h2 className="text-[16px] font-bold mb-4">Flight details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Flight number</label>
                  <input type="text" placeholder="e.g. VN302" value={flight} onChange={e => setFlight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px] focus:outline-none focus:border-[var(--color-vg-green)] transition-colors" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Arrival date</label>
                  <input type="date" defaultValue="2026-04-20"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px] focus:outline-none focus:border-[var(--color-vg-green)] transition-colors" />
                </div>
              </div>
              {flight && (
                <div className="mt-3 flex items-center gap-2 text-[13px] text-[var(--color-vg-success)] font-medium">
                  <span className="w-4 h-4 rounded-full bg-[var(--color-vg-success)] text-white text-[10px] flex items-center justify-center">✓</span>
                  Arriving Apr 20, 14:35 — Terminal 2 (SGN)
                </div>
              )}
            </div>

            {/* Destination */}
            <div className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-6">
              <h2 className="text-[16px] font-bold mb-4">Where to?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {DESTINATIONS.map(dest => (
                  <button key={dest} onClick={() => setDestination(dest)}
                    className={`px-4 py-3 rounded-xl text-[13px] font-medium text-left transition-all border ${
                      destination === dest
                        ? 'border-[var(--color-vg-green)] bg-[var(--color-vg-green-light)] text-[var(--color-vg-green-dark)]'
                        : 'border-[var(--color-vg-border)] hover:border-[#CBD5E1] text-[var(--color-vg-text-2)]'
                    }`}>{dest}</button>
                ))}
              </div>
            </div>

            {/* Vehicle */}
            <div className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-6">
              <h2 className="text-[16px] font-bold mb-4">Choose your ride</h2>
              <div className="space-y-3">
                {VEHICLES.map(v => (
                  <button key={v.id} onClick={() => setSelected(v.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      selected === v.id
                        ? 'border-[var(--color-vg-green)] bg-[var(--color-vg-green-light)]'
                        : 'border-[var(--color-vg-border)] hover:border-[#CBD5E1]'
                    }`}>
                    <span className="text-3xl">{v.img}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold">{v.name}</span>
                        {v.popular && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--color-vg-gold-light)] text-[#92400E]">Popular</span>}
                      </div>
                      <span className="text-[13px] text-[var(--color-vg-text-2)]">{v.desc}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[17px] font-bold">₫{v.price.toLocaleString()}</div>
                      <div className="text-[12px] text-[var(--color-vg-text-3)]">{v.time}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-6">
              <h2 className="text-[16px] font-bold mb-4">Add-ons</h2>
              <div className="space-y-3">
                {ADDONS.map(a => (
                  <label key={a.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    addons.includes(a.id) ? 'border-[var(--color-vg-green)] bg-[var(--color-vg-green-light)]' : 'border-[var(--color-vg-border)] hover:border-[#CBD5E1]'
                  }`}>
                    <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggleAddon(a.id)} className="sr-only" />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                      addons.includes(a.id) ? 'bg-[var(--color-vg-green)] border-[var(--color-vg-green)]' : 'border-[#CBD5E1]'
                    }`}>
                      {addons.includes(a.id) && <span className="text-white text-[11px]">✓</span>}
                    </div>
                    <div className="flex-1">
                      <div className="text-[14px] font-semibold">{a.label}</div>
                      <div className="text-[12px] text-[var(--color-vg-text-3)]">{a.desc}</div>
                    </div>
                    <span className="text-[14px] font-semibold text-[var(--color-vg-text-2)]">+₫{a.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div>
            <div className="sticky top-[88px] bg-white border border-[var(--color-vg-border)] rounded-2xl p-6 shadow-sm">
              <h3 className="text-[16px] font-bold mb-4">Booking summary</h3>
              <div className="space-y-3 text-[14px]">
                <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Airport</span><span className="font-medium">SGN — Tan Son Nhat</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Date</span><span className="font-medium">Apr 20, 2026</span></div>
                {flight && <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Flight</span><span className="font-medium">{flight.toUpperCase()}</span></div>}
                {destination && <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">To</span><span className="font-medium">{destination}</span></div>}
                <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Vehicle</span><span className="font-medium">{vehicle.name}</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">{vehicle.name}</span><span className="font-medium">₫{vehicle.price.toLocaleString()}</span></div>
                {addons.map(id => {
                  const a = ADDONS.find(x => x.id === id)!
                  return <div key={id} className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">{a.label}</span><span className="font-medium">₫{a.price.toLocaleString()}</span></div>
                })}
                <div className="border-t border-[var(--color-vg-border)] pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-[20px] font-bold text-[var(--color-vg-green-dark)]">₫{total.toLocaleString()}</span>
                </div>
              </div>
              <Link href="/booking" className="block w-full mt-5 px-6 py-3.5 bg-[var(--color-vg-green)] text-white text-center rounded-xl text-[15px] font-bold hover:bg-[var(--color-vg-green-dark)] transition-colors shadow-[0_4px_16px_rgba(12,155,106,0.25)]">
                Book now — instant confirmation
              </Link>
              <div className="flex items-center justify-center gap-4 mt-4 text-[12px] text-[var(--color-vg-text-3)]">
                <span>✓ Free cancellation</span>
                <span>✓ No hidden fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
