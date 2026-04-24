'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [confirmed, setConfirmed] = useState(false)

  if (confirmed) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--color-vg-green-light)] flex items-center justify-center mx-auto mb-6">
            <span className="text-[var(--color-vg-green)] text-4xl">✓</span>
          </div>
          <h1 className="font-display text-[32px] font-bold tracking-tight mb-3">Booking confirmed!</h1>
          <p className="text-[16px] text-[var(--color-vg-text-2)] mb-2">Your booking <strong>VH-24095</strong> has been confirmed instantly.</p>
          <p className="text-[14px] text-[var(--color-vg-text-3)] mb-8">A confirmation email has been sent to your inbox with all the details.</p>
          <div className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-6 text-left mb-6 space-y-3 text-[14px]">
            <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Booking code</span><span className="font-bold">VH-24095</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Service</span><span className="font-medium">Premium SUV Pickup</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Airport</span><span className="font-medium">SGN — Terminal 2</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Date</span><span className="font-medium">Apr 20, 2026</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Status</span><span className="font-semibold text-[var(--color-vg-success)]">✓ Confirmed</span></div>
            <div className="border-t border-[var(--color-vg-border)] pt-3 flex justify-between"><span className="font-bold">Total paid</span><span className="font-bold text-[18px]">₫670,000</span></div>
          </div>
          <div className="flex gap-3">
            <Link href="/bookings" className="flex-1 px-6 py-3 rounded-xl text-[14px] font-semibold border border-[var(--color-vg-border)] text-center hover:bg-[var(--color-vg-bg-off)] transition-colors">View my bookings</Link>
            <Link href="/" className="flex-1 px-6 py-3 rounded-xl text-[14px] font-semibold bg-[var(--color-vg-green)] text-white text-center hover:bg-[var(--color-vg-green-dark)] transition-colors">Book more services</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-[72px] bg-[var(--color-vg-bg-off)] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-display text-[28px] font-bold tracking-tight mb-2">Complete your booking</h1>
        <p className="text-[14px] text-[var(--color-vg-text-2)] mb-8">You&apos;re almost there — just fill in your details and confirm.</p>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['Your details', 'Payment', 'Confirm'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold ${
                step > i + 1 ? 'bg-[var(--color-vg-green)] text-white' : step === i + 1 ? 'bg-[var(--color-vg-green)] text-white' : 'bg-[var(--color-vg-border)] text-[var(--color-vg-text-3)]'
              }`}>{step > i + 1 ? '✓' : i + 1}</div>
              <span className={`text-[13px] font-medium ${step === i + 1 ? 'text-[var(--color-vg-text)]' : 'text-[var(--color-vg-text-3)]'}`}>{s}</span>
              {i < 2 && <div className="w-12 h-px bg-[var(--color-vg-border)]" />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-6">
              <h2 className="text-[16px] font-bold mb-4">Contact information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">First name</label><input className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px] focus:outline-none focus:border-[var(--color-vg-green)]" placeholder="Yuki" /></div>
                <div><label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Last name</label><input className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px] focus:outline-none focus:border-[var(--color-vg-green)]" placeholder="Tanaka" /></div>
                <div><label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Email</label><input type="email" className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px] focus:outline-none focus:border-[var(--color-vg-green)]" placeholder="yuki@email.com" /></div>
                <div><label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Phone</label><div className="flex gap-2"><input className="w-20 px-3 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px] text-center" defaultValue="+81" /><input className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px] focus:outline-none focus:border-[var(--color-vg-green)]" placeholder="90-1234-5678" /></div></div>
              </div>
            </div>
            <div className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-6">
              <h2 className="text-[16px] font-bold mb-4">Passenger details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Nationality</label><select className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px]"><option>Japan</option><option>Korea</option><option>France</option><option>Other</option></select></div>
                <div><label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Passport number</label><input className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px]" placeholder="TK4829301" /></div>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full px-6 py-3.5 bg-[var(--color-vg-green)] text-white rounded-xl text-[15px] font-bold hover:bg-[var(--color-vg-green-dark)] transition-colors">Continue to payment</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-6">
              <h2 className="text-[16px] font-bold mb-4">Payment method</h2>
              <div className="space-y-3">
                {['Credit / Debit card', 'Bank transfer', 'MoMo wallet', 'ZaloPay'].map((m, i) => (
                  <label key={m} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${i === 0 ? 'border-[var(--color-vg-green)] bg-[var(--color-vg-green-light)]' : 'border-[var(--color-vg-border)] hover:border-[#CBD5E1]'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${i === 0 ? 'border-[var(--color-vg-green)]' : 'border-[#CBD5E1]'}`}>
                      {i === 0 && <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-vg-green)]" />}
                    </div>
                    <span className="text-[14px] font-medium">{m}</span>
                  </label>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2"><label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Card number</label><input className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px]" placeholder="4242 4242 4242 4242" /></div>
                <div><label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">Expiry</label><input className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px]" placeholder="MM/YY" /></div>
                <div><label className="block text-[12px] font-semibold text-[var(--color-vg-text-2)] mb-1.5">CVV</label><input className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px]" placeholder="123" /></div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 px-6 py-3.5 rounded-xl text-[15px] font-semibold border border-[var(--color-vg-border)] hover:bg-[var(--color-vg-bg-off)] transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 px-6 py-3.5 bg-[var(--color-vg-green)] text-white rounded-xl text-[15px] font-bold hover:bg-[var(--color-vg-green-dark)] transition-colors">Review booking</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div className="bg-white border border-[var(--color-vg-border)] rounded-2xl p-6 space-y-3 text-[14px]">
              <h2 className="text-[16px] font-bold mb-2">Review & confirm</h2>
              <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Service</span><span className="font-medium">Premium SUV Airport Pickup</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Airport</span><span className="font-medium">SGN — Terminal 2</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">To</span><span className="font-medium">District 1 (center)</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Date</span><span className="font-medium">Apr 20, 2026</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Passenger</span><span className="font-medium">Yuki Tanaka</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-vg-text-2)]">Add-ons</span><span className="font-medium">Meet & greet</span></div>
              <div className="border-t border-[var(--color-vg-border)] pt-3 flex justify-between"><span className="font-bold text-[16px]">Total</span><span className="font-bold text-[22px] text-[var(--color-vg-green-dark)]">₫670,000</span></div>
            </div>
            <div className="bg-[var(--color-vg-green-light)] rounded-xl p-4 text-[13px] text-[var(--color-vg-green-dark)] font-medium">
              ✓ Instant confirmation · ✓ Free cancellation up to 24h before · ✓ Driver tracks your flight
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 px-6 py-3.5 rounded-xl text-[15px] font-semibold border border-[var(--color-vg-border)] hover:bg-[var(--color-vg-bg-off)] transition-colors">Back</button>
              <button onClick={() => setConfirmed(true)} className="flex-1 px-6 py-3.5 bg-[var(--color-vg-green)] text-white rounded-xl text-[15px] font-bold hover:bg-[var(--color-vg-green-dark)] transition-colors shadow-[0_4px_16px_rgba(12,155,106,0.3)]">Confirm & pay ₫670,000</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
