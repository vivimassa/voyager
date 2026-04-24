'use client'

import Link from 'next/link'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { useT } from '@/i18n/use-t'
import { useLocaleStore } from '@/stores/locale-store'

type Badge = 'limited' | 'new' | 'popular'

type Deal = {
  id: string
  title: string; titleVi: string
  description: string; descriptionVi: string
  saving: string
  originalNote: string; originalNoteVi: string
  expires: string
  badge: Badge
  photo: string
  href: string
  highlight: string; highlightVi: string
}

const DEALS: Deal[] = [
  { id: 'bundle-han', title: 'Hanoi Bundle — Pickup + Fast-track', titleVi: 'Gói Hà Nội — Đón sân bay + Fast-track', description: 'Book your HAN airport pickup and fast-track together and save 15%. One driver, one checkpoint, zero hassle from the gate.', descriptionVi: 'Đặt chung đón sân bay HAN và fast-track để tiết kiệm 15%. Một tài xế, một điểm đón, xuống máy bay là đi thẳng.', saving: '15% off', originalNote: 'vs. booking separately', originalNoteVi: 'so với đặt từng dịch vụ riêng', expires: '30 Jun 2026', badge: 'popular', photo: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1200&q=80', href: '/destinations/ha-long', highlight: 'Save on every Hanoi arrival', highlightVi: 'Tiết kiệm cho mỗi chuyến đến Hà Nội' },
  { id: 'group-5', title: 'Group Discount — 5+ Travellers', titleVi: 'Ưu đãi nhóm — Từ 5 khách', description: 'Travelling with friends or family? Book any service for 5 or more and we\'ll knock 20% off the total.', descriptionVi: 'Đi cùng bạn bè hoặc gia đình? Chỉ cần đặt dịch vụ cho từ 5 khách trở lên là được giảm ngay 20% tổng chi phí.', saving: '20% off', originalNote: 'for groups of 5+', originalNoteVi: 'áp dụng cho nhóm từ 5 khách', expires: '31 Dec 2026', badge: 'new', photo: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', href: '/destinations', highlight: 'Any destination, any service', highlightVi: 'Áp dụng cho mọi điểm đến, mọi dịch vụ' },
  { id: 'early-bird-pqc', title: 'Early Bird — Phu Quoc Hotels', titleVi: 'Đặt sớm — Khách sạn Phú Quốc', description: 'Book your Phu Quoc hotel at least 30 days in advance and get 25% off the nightly rate.', descriptionVi: 'Đặt khách sạn Phú Quốc trước ít nhất 30 ngày để nhận ưu đãi giảm 25% giá phòng theo đêm.', saving: '25% off', originalNote: 'book 30+ days ahead', originalNoteVi: 'đặt trước từ 30 ngày', expires: '31 Mar 2026', badge: 'limited', photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', href: '/destinations/phu-quoc', highlight: 'Limited rooms at this rate', highlightVi: 'Số lượng phòng ưu đãi có hạn' },
  { id: 'da-nang-trio', title: 'Da Nang Trio — Pickup + Hotel + Tour', titleVi: 'Bộ ba Đà Nẵng — Đón + Khách sạn + Tour', description: 'The full Da Nang experience in one booking. 18% off the lot.', descriptionVi: 'Trọn bộ trải nghiệm Đà Nẵng trong một lần đặt, tiết kiệm 18% toàn gói.', saving: '18% off', originalNote: 'full Da Nang package', originalNoteVi: 'gói trọn Đà Nẵng', expires: '15 Aug 2026', badge: 'new', photo: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=80', href: '/destinations/hoi-an', highlight: 'Best value in central Vietnam', highlightVi: 'Mức giá tốt nhất khu vực miền Trung' },
  { id: 'flash-sgn', title: 'Flash Sale — Saigon Fast-track', titleVi: 'Flash Sale — Fast-track Sài Gòn', description: 'This week only, skip the SGN immigration queue at an unbeatable rate.', descriptionVi: 'Chỉ trong tuần này, dùng fast-track tại SGN với mức giá ưu đãi nhất để đi lối nhập cảnh nhanh.', saving: '30% off', originalNote: 'this week only', originalNoteVi: 'chỉ áp dụng trong tuần này', expires: '01 May 2026', badge: 'limited', photo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80', href: '/destinations/mekong', highlight: 'Biggest saving of the month', highlightVi: 'Mức giảm sâu nhất trong tháng' },
]

const BADGE_STYLE: Record<Badge, string> = {
  limited: 'bg-red-100 text-red-700',
  new: 'bg-vg-accent/15 text-vg-accent',
  popular: 'bg-amber-100 text-amber-700',
}

export default function DealsPage() {
  const t = useT()
  const vi = useLocaleStore((s) => s.locale) === 'vi'

  const badgeLabel: Record<Badge, string> = { limited: t.deals.badgeLimited, new: t.deals.badgeNew, popular: t.deals.badgePopular }

  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <TopNav />
      <div className="bg-vg-surface-muted border-b border-vg-border px-6 md:px-10 py-8">
        <div className="max-w-[1280px] mx-auto">
          <nav className="text-xs text-vg-text-muted mb-2">
            <Link href="/" className="hover:underline">{t.destination.home}</Link>
            <span className="mx-1.5">›</span>
            <span className="text-vg-text">{t.nav.deals}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight">{t.deals.heading}</h1>
          <p className="mt-2 text-vg-text-muted max-w-[620px]">{t.deals.sub}</p>
        </div>
      </div>

      <main className="flex-1 px-6 md:px-10 py-8 max-w-[1280px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {DEALS.map((deal) => (
          <article key={deal.id} className="bg-white rounded-xl border border-vg-border overflow-hidden flex flex-col hover:shadow-[0_8px_24px_rgba(16,24,40,0.1)] transition-shadow">
            <div className="relative h-44 bg-cover bg-center" style={{ backgroundImage: `url('${deal.photo}')` }}>
              <div className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${BADGE_STYLE[deal.badge]}`}>
                {badgeLabel[deal.badge]}
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-vg-warm text-vg-text font-display font-bold text-sm shadow">
                {deal.saving}
              </div>
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div>
                <h2 className="font-display text-lg font-bold text-vg-text leading-snug">{vi ? deal.titleVi : deal.title}</h2>
                <p className="text-sm text-vg-text-muted mt-1 leading-relaxed">{vi ? deal.descriptionVi : deal.description}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-vg-border">
                <div className="text-xs text-vg-text-muted">
                  <div className="font-semibold text-vg-text">{vi ? deal.highlightVi : deal.highlight}</div>
                  <div className="mt-0.5">{t.deals.expiresLabel}: {deal.expires}</div>
                </div>
                <Link href={deal.href} className="inline-flex items-center h-10 px-4 rounded-lg bg-vg-cta hover:bg-vg-cta-hover text-white font-bold text-sm">
                  {t.deals.ctaBook}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </main>

      <SiteFooter />
    </div>
  )
}
