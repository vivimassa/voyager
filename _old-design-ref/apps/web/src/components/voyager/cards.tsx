import Link from 'next/link'

interface ServiceCardProps {
  icon: string
  title: string
  subtitle: string
  price: string
  href: string
  color: string
  bgColor: string
  badge?: string
}

export function ServiceCard({ icon, title, subtitle, price, href, color, bgColor, badge }: ServiceCardProps) {
  return (
    <Link href={href} className="group relative block rounded-2xl border border-[var(--color-vg-border)] bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-transparent">
      {badge && (
        <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-[11px] font-semibold" style={{ background: bgColor, color }}>{badge}</span>
      )}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{ background: bgColor }}>
        {icon}
      </div>
      <h3 className="text-[17px] font-bold tracking-tight mb-1">{title}</h3>
      <p className="text-[13px] text-[var(--color-vg-text-2)] mb-4 leading-relaxed">{subtitle}</p>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-[var(--color-vg-text-3)]">from <strong className="text-[var(--color-vg-text)] text-[16px]">{price}</strong></span>
        <span className="text-[13px] font-semibold transition-colors group-hover:text-[var(--color-vg-green)]" style={{ color }}>Book now →</span>
      </div>
    </Link>
  )
}

interface ExperienceCardProps {
  title: string
  meta: string
  price: string
  rating: string
  reviews: string
  badge?: string
  gradient: string
  href: string
}

export function ExperienceCard({ title, meta, price, rating, reviews, badge, gradient, href }: ExperienceCardProps) {
  return (
    <Link href={href} className="group block rounded-2xl overflow-hidden border border-[var(--color-vg-border)] bg-white transition-all hover:shadow-lg hover:-translate-y-1.5 hover:border-transparent flex-shrink-0 w-[280px] md:w-auto">
      <div className="relative h-[180px] overflow-hidden">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105" style={{ background: gradient }} />
        {badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-[11px] font-semibold bg-white/90 text-[var(--color-vg-text)] backdrop-blur-sm">{badge}</span>
        )}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[14px] cursor-pointer hover:bg-white transition-colors">♡</div>
      </div>
      <div className="p-4">
        <h3 className="text-[15px] font-bold tracking-tight mb-1">{title}</h3>
        <p className="text-[13px] text-[var(--color-vg-text-2)] mb-3">{meta}</p>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] text-[var(--color-vg-text-3)]">from</span>
            <span className="block text-[17px] font-bold tracking-tight">{price}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-vg-green-light)]">
            <span className="text-[var(--color-vg-gold)] text-[13px]">★</span>
            <span className="text-[13px] font-bold text-[var(--color-vg-green-dark)]">{rating}</span>
            <span className="text-[11px] text-[var(--color-vg-text-3)]">({reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
