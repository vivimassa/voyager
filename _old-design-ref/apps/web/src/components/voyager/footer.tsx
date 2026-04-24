import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-vg-border)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-vg-green)] flex items-center justify-center text-white font-extrabold text-[13px] font-display">V</div>
              <span className="font-display font-bold text-[17px] tracking-tight">Voyager</span>
            </div>
            <p className="text-[13px] text-[var(--color-vg-text-2)] leading-relaxed">Airport travel services across Vietnam. Land. Tap. Sorted.</p>
          </div>
          {[
            { title: 'Services', links: ['Airport pickup', 'Fast track & VIP', 'Hotels', 'Tours & activities', 'Car hire'] },
            { title: 'Airports', links: ['SGN — Tan Son Nhat', 'HAN — Noi Bai', 'DAD — Da Nang', 'CXR — Cam Ranh', 'PQC — Phu Quoc'] },
            { title: 'Company', links: ['About', 'Careers', 'Press', 'Blog', 'Partner with us'] },
            { title: 'Support', links: ['Help center', 'Cancellation policy', 'Safety', 'Terms', 'Privacy'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-vg-text)] mb-4">{col.title}</h4>
              {col.links.map(link => (
                <Link key={link} href="#" className="block text-[13px] text-[var(--color-vg-text-2)] py-1.5 hover:text-[var(--color-vg-green)] transition-colors">{link}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--color-vg-border)] text-[13px] text-[var(--color-vg-text-3)]">
          <span>© 2026 Voyager by Vihat Tour. All rights reserved.</span>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <select className="bg-transparent border border-[var(--color-vg-border)] rounded-lg px-3 py-1.5 text-[13px] text-[var(--color-vg-text-2)]">
              <option>English</option>
              <option>Tiếng Việt</option>
            </select>
            <span>VND ₫</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
