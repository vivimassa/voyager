'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [role, setRole] = useState<'traveler' | 'supplier' | 'operator'>('traveler')
  const roleColors = { traveler: '#0C9B6A', supplier: '#E8590C', operator: '#3B5BDB' }

  return (
    <div className="pt-[72px] min-h-screen flex items-center justify-center bg-[var(--color-vg-bg-off)] px-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-xl border border-[var(--color-vg-border)]">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-extrabold text-[15px] font-display" style={{ background: roleColors[role] }}>V</div>
          <span className="font-display font-bold text-[20px] tracking-tight">Voyager</span>
        </div>

        <h1 className="font-display text-[26px] font-bold tracking-tight text-center mb-1">Welcome</h1>
        <p className="text-[14px] text-[var(--color-vg-text-2)] text-center mb-6">Sign in to your account</p>

        <div className="flex gap-2 mb-6">
          {(['traveler', 'supplier', 'operator'] as const).map(r => (
            <button key={r} onClick={() => setRole(r)}
              className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold capitalize transition-all border ${
                role === r ? 'text-white border-transparent' : 'bg-transparent border-[var(--color-vg-border)] text-[var(--color-vg-text-2)]'
              }`} style={role === r ? { background: roleColors[r] } : {}}>{r}</button>
          ))}
        </div>

        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-[12.5px] font-semibold text-[var(--color-vg-text)] mb-1.5">Email address</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px] focus:outline-none focus:border-[var(--color-vg-green)] transition-colors" placeholder="you@company.com" />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold text-[var(--color-vg-text)] mb-1.5">Password</label>
            <input type="password" className="w-full px-4 py-3 rounded-xl border border-[var(--color-vg-border)] text-[14px] focus:outline-none focus:border-[var(--color-vg-green)] transition-colors" placeholder="Enter your password" />
          </div>
        </div>

        <button className="w-full py-3.5 rounded-xl text-[15px] font-bold text-white transition-all hover:shadow-lg" style={{ background: roleColors[role] }}>
          Sign in
        </button>

        <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--color-vg-border)]"></div></div><div className="relative flex justify-center text-[12px]"><span className="bg-white px-3 text-[var(--color-vg-text-3)]">or</span></div></div>

        <button className="w-full py-3 rounded-xl text-[14px] font-semibold border border-[var(--color-vg-border)] hover:bg-[var(--color-vg-bg-off)] transition-colors">
          Continue with Google
        </button>

        <p className="text-center text-[13px] text-[var(--color-vg-text-3)] mt-6">
          Don&apos;t have an account? <Link href="#" className="font-semibold" style={{ color: roleColors[role] }}>Sign up free</Link>
        </p>
      </div>
    </div>
  )
}
