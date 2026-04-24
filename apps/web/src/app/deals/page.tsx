'use client'

import Link from 'next/link'
import { TopNav } from '@/components/client/top-nav'
import { useT } from '@/i18n/use-t'
import { useLocaleStore } from '@/stores/locale-store'

type Badge = 'limited' | 'new' | 'popular'

type Deal = {
  id: string
  title: string
  titleVi: string
  description: string
  descriptionVi: string
  saving: string
  originalNote: string
  originalNoteVi: string
  expires: string
  badge: Badge
  photo: string
  href: string
  highlight: string
  highlightVi: string
}

const DEALS: Deal[] = [
  {
    id: 'bundle-han',
    title: 'Hanoi Bundle — Pickup + Fast-track',
    titleVi: 'Gói Hà Nội — Đón sân bay + Fast-track',
    description: 'Book your HAN airport pickup and fast-track together and save 15%. One driver, one checkpoint, zero hassle from the gate.',
    descriptionVi: 'Đặt đón sân bay HAN cùng fast-track và tiết kiệm 15%. Một tài xế, một cổng kiểm tra, không lo lắng từ lúc hạ cánh.',
    saving: '15% off',
    originalNote: 'vs. booking separately',
    originalNoteVi: 'so với đặt riêng lẻ',
    expires: '30 Jun 2026',
    badge: 'popular',
    photo: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/ha-long',
    highlight: 'Save on every Hanoi arrival',
    highlightVi: 'Tiết kiệm mỗi lần đến Hà Nội',
  },
  {
    id: 'group-5',
    title: 'Group Discount — 5+ Travellers',
    titleVi: 'Giảm giá nhóm — Từ 5 người',
    description: 'Travelling with friends or family? Book any service for 5 or more and we\'ll knock 20% off the total. Perfect for tours and transfers.',
    descriptionVi: 'Đi cùng bạn bè hay gia đình? Đặt bất kỳ dịch vụ nào cho 5 người trở lên và chúng tôi giảm 20% tổng chi phí.',
    saving: '20% off',
    originalNote: 'for groups of 5+',
    originalNoteVi: 'cho nhóm từ 5 người',
    expires: '31 Dec 2026',
    badge: 'new',
    photo: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations',
    highlight: 'Any destination, any service',
    highlightVi: 'Mọi điểm đến, mọi dịch vụ',
  },
  {
    id: 'early-bird-pqc',
    title: 'Early Bird — Phu Quoc Hotels',
    titleVi: 'Đặt sớm — Khách sạn Phú Quốc',
    description: 'Book your Phu Quoc hotel at least 30 days in advance and get 25% off the nightly rate. Island escapes shouldn\'t cost a fortune.',
    descriptionVi: 'Đặt khách sạn Phú Quốc trước ít nhất 30 ngày và được giảm 25% giá mỗi đêm. Nghỉ dưỡng đảo không cần tốn kém.',
    saving: '25% off',
    originalNote: 'book 30+ days ahead',
    originalNoteVi: 'đặt trước 30 ngày trở lên',
    expires: '31 Mar 2026',
    badge: 'limited',
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/phu-quoc',
    highlight: 'Limited rooms at this rate',
    highlightVi: 'Số phòng có hạn với giá này',
  },
  {
    id: 'da-nang-trio',
    title: 'Da Nang Trio — Pickup + Hotel + Tour',
    titleVi: 'Bộ ba Đà Nẵng — Đón sân bay + Khách sạn + Tour',
    description: 'The full Da Nang experience in one booking. Airport pickup from DAD, a curated central hotel, and a half-day marble mountain tour — 18% off the lot.',
    descriptionVi: 'Trải nghiệm Đà Nẵng trọn vẹn trong một lần đặt. Đón sân bay DAD, khách sạn tuyển chọn trung tâm và tour Ngũ Hành Sơn nửa ngày — giảm 18%.',
    saving: '18% off',
    originalNote: 'full Da Nang package',
    originalNoteVi: 'gói trọn Đà Nẵng',
    expires: '15 Aug 2026',
    badge: 'new',
    photo: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/da-nang',
    highlight: 'Best value in central Vietnam',
    highlightVi: 'Giá trị tốt nhất miền Trung',
  },
  {
    id: 'flash-sgn',
    title: 'Flash Sale — Saigon Fast-track',
    titleVi: 'Flash Sale — Fast-track Sài Gòn',
    description: 'For this week only, skip the SGN immigration queue for a rate you won\'t find anywhere else. Instant confirmation, no card today.',
    descriptionVi: 'Chỉ trong tuần này, vượt hàng nhập cảnh SGN với giá tốt nhất thị trường. Xác nhận ngay, chưa cần thanh toán hôm nay.',
    saving: '30% off',
    originalNote: 'this week only',
    originalNoteVi: 'chỉ trong tuần này',
    expires: '01 May 2026',
    badge: 'limited',
    photo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    href: '/destinations/ho-chi-minh-city',
    highlight: 'Biggest saving of the month',
    highlightVi: 'Ưu đãi lớn nhất tháng',
  },
]

const BADGE_STYLE: Record<Badge, string> = {
  limited: 'bg-red-500/15 text-red-300 border-red-500/30',
  new:     'bg-vg-accent/15 text-vg-accent border-vg-accent/30',
  popular: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
}

export default function DealsPage() {
  const t = useT()
  const locale = useLocaleStore((s) => s.locale)
  const vi = locale === 'vi'

  const badgeLabel: Record<Badge, string> = {
    limited: t.deals.badgeLimited,
    new:     t.deals.badgeNew,
    popular: t.deals.badgePopular,
  }

  return (
    <div className="bg-vg-bg text-white min-h-screen">
      <div className="relative">
        <TopNav />
        <div className="px-6 md:px-12 pt-32 pb-16 max-w-[1400px] mx-auto">
          <div className="text-xs tracking-[0.25em] uppercase text-vg-accent font-semibold mb-3">
            {t.deals.eyebrow}
          </div>
          <h1
            className="font-display font-semibold leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            {t.deals.heading}
          </h1>
          <p className="mt-5 text-white/70 max-w-[540px] text-[15px] leading-relaxed">
            {t.deals.sub}
          </p>
        </div>
      </div>

      <section className="px-6 md:px-12 pb-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              className="group relative rounded-[22px] overflow-hidden border border-white/10 bg-vg-surface flex flex-col hover:border-white/20 transition-colors"
            >
              {/* Photo */}
              <div
                className="relative h-48 bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url('${deal.photo}')` }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)' }}
                />
                {/* Saving pill */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-vg-cta text-white font-display font-bold text-sm shadow-[0_4px_14px_rgba(29,78,216,0.5)]">
                  {deal.saving}
                </div>
                {/* Badge */}
                <div className={`absolute top-4 left-4 px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-[0.1em] uppercase ${BADGE_STYLE[deal.badge]}`}>
                  {badgeLabel[deal.badge]}
                </div>
                {/* Highlight strip */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3">
                  <div className="text-[11px] font-semibold text-white/80 tracking-wide">
                    {vi ? deal.highlightVi : deal.highlight}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex-1">
                  <h2 className="font-display text-xl font-semibold text-white leading-snug mb-2">
                    {vi ? deal.titleVi : deal.title}
                  </h2>
                  <p className="text-[13px] text-white/60 leading-relaxed">
                    {vi ? deal.descriptionVi : deal.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="font-display text-2xl font-bold text-vg-cta">{deal.saving}</div>
                    <div className="text-[11px] text-white/45 mt-0.5">
                      {vi ? deal.originalNoteVi : deal.originalNote}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.12em]">
                      {t.deals.expiresLabel}
                    </div>
                    <div className="text-xs text-white/65 font-medium mt-0.5">{deal.expires}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={deal.href}
                    className="flex-1 text-center px-4 py-3 rounded-full bg-vg-cta hover:bg-vg-cta-hover text-white text-sm font-semibold transition-colors shadow-[0_4px_14px_rgba(29,78,216,0.3)]"
                  >
                    {t.deals.ctaBook}
                  </Link>
                  <span className="text-[11px] text-white/35 flex-shrink-0">{t.deals.ctaTerms}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
