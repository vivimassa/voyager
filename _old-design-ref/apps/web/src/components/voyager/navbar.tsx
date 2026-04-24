'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-xl border-b border-[var(--color-vg-border)] shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-[var(--color-vg-green)] flex items-center justify-center text-white font-extrabold text-[15px] font-display">V</div>
          <span className={`font-display font-bold text-[20px] tracking-tight transition-colors ${scrolled ? 'text-[var(--color-vg-text)]' : 'text-white'}`}>Voyager</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/services/airport-pickup', label: 'Airport pickup' },
            { href: '/services/fast-track', label: 'Fast track' },
            { href: '/services/hotels', label: 'Hotels' },
            { href: '/services/tours', label: 'Tours' },
          ].map(link => (
            <Link key={link.href} href={link.href} className={`text-[14px] font-medium transition-colors ${
              scrolled ? 'text-[var(--color-vg-text-2)] hover:text-[var(--color-vg-green)]' : 'text-white/70 hover:text-white'
            }`}>{link.label}</Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/bookings" className={`px-5 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all border ${
            scrolled
              ? 'border-[var(--color-vg-border)] text-[var(--color-vg-text)] hover:bg-[var(--color-vg-bg-off)]'
              : 'border-white/20 text-white bg-white/10 hover:bg-white/20'
          }`}>My bookings</Link>
          <Link href="/login" className={`px-5 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all ${
            scrolled
              ? 'bg-[var(--color-vg-green)] text-white hover:bg-[var(--color-vg-green-dark)]'
              : 'bg-white text-[var(--color-vg-navy-dark)] hover:shadow-lg'
          }`}>Sign up free</Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center">
          <span className={`text-2xl ${scrolled ? 'text-[var(--color-vg-text)]' : 'text-white'}`}>{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--color-vg-border)] p-4 space-y-2">
          {['Airport pickup', 'Fast track', 'Hotels', 'Tours'].map(label => (
            <Link key={label} href={`/services/${label.toLowerCase().replace(' ', '-')}`} className="block px-4 py-3 rounded-lg text-[14px] font-medium text-[var(--color-vg-text-2)] hover:bg-[var(--color-vg-bg-off)]"
              onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          <div className="pt-2 border-t border-[var(--color-vg-border)] flex gap-2">
            <Link href="/bookings" className="flex-1 text-center px-4 py-3 rounded-lg text-[13px] font-semibold border border-[var(--color-vg-border)]">My bookings</Link>
            <Link href="/login" className="flex-1 text-center px-4 py-3 rounded-lg text-[13px] font-semibold bg-[var(--color-vg-green)] text-white">Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
