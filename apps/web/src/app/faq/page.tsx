'use client'

import { useState } from 'react'
import { TopNav } from '@/components/client/top-nav'
import { SiteFooter } from '@/components/client/site-footer'
import { useT } from '@/i18n/use-t'

type Faq = { q: string; a: string }
const FAQ_EN: Faq[] = [
  { q: 'What does Fast Track include?', a: 'Priority check-in counter, priority baggage handling, priority security screening, and — for international flights — priority immigration. A Voyager greeter walks you through every step.' },
  { q: 'How early should I arrive?', a: 'We recommend 90 minutes before international flights and 60 minutes before domestic. Earlier is fine — your greeter is there as soon as the lane opens.' },
  { q: 'How do I receive my Fast Track ticket?', a: 'Your Fast Track ID (FT-XXXXXXXX) is shown on the success page right after payment, and emailed/SMS-ed to you. Show it to the Voyager greeter at the airport entrance.' },
  { q: 'What if my flight changes?', a: 'Use the cancel button on the booking page up to 24 hours before your travel date — we’ll refund and you can rebook for the new flight.' },
  { q: 'How many passengers can I book at once?', a: 'Up to 50 in one booking. Groups of 6 or more automatically receive GIT pricing where available.' },
  { q: 'Which airports are covered?', a: 'HAN (Noi Bai), SGN (Tan Son Nhat), DAD (Da Nang), CXR (Cam Ranh), HUI (Phu Bai/Hue), THD (Tho Xuan/Thanh Hoa) and VII (Vinh).' },
  { q: 'How is payment handled?', a: 'Two options: VNPay (Visa, Mastercard, JCB, ATM, QR) for instant confirmation, or Vietnamese bank transfer with a VietQR code — agent confirms within minutes.' },
  { q: 'Do I need a passport for domestic flights?', a: 'No — Vietnamese ID (CCCD) is accepted for domestic Fast Track lanes. Passport is required for international segments.' },
]
const FAQ_VI: Faq[] = [
  { q: 'Fast Track gồm những gì?', a: 'Quầy check-in ưu tiên, hành lý ưu tiên, an ninh ưu tiên, và đối với chuyến quốc tế là ưu tiên xuất nhập cảnh. Đại diện Voyager đồng hành toàn bộ.' },
  { q: 'Tôi nên có mặt sớm bao lâu?', a: 'Khuyến nghị 90 phút trước chuyến quốc tế, 60 phút trước nội địa. Sớm hơn cũng được — đại diện sẵn sàng ngay khi làn mở.' },
  { q: 'Tôi nhận vé Fast Track thế nào?', a: 'Mã Fast Track (FT-XXXXXXXX) hiển thị ngay trên trang xác nhận sau khi thanh toán, đồng thời gửi qua email và SMS. Đưa cho đại diện Voyager tại lối vào sân bay.' },
  { q: 'Nếu chuyến bay thay đổi thì sao?', a: 'Bấm huỷ trên trang đơn hàng trước giờ bay 24 giờ — chúng tôi hoàn tiền và bạn đặt lại cho chuyến mới.' },
  { q: 'Tôi có thể đặt cho bao nhiêu khách một lần?', a: 'Tối đa 50 khách/đơn. Đoàn từ 6 khách trở lên sẽ tự động áp dụng giá GIT nếu có.' },
  { q: 'Sân bay nào được phục vụ?', a: 'HAN (Nội Bài), SGN (Tân Sơn Nhất), DAD (Đà Nẵng), CXR (Cam Ranh), HUI (Phú Bài/Huế), THD (Thọ Xuân/Thanh Hoá) và VII (Vinh).' },
  { q: 'Hỗ trợ thanh toán bằng cách nào?', a: 'Hai lựa chọn: VNPay (Visa, Mastercard, JCB, ATM, QR) xác nhận tức thì, hoặc chuyển khoản ngân hàng Việt Nam với VietQR — đại lý xác nhận trong vài phút.' },
  { q: 'Bay nội địa có cần hộ chiếu?', a: 'Không — chuyến nội địa chấp nhận CCCD. Hộ chiếu áp dụng cho các làn quốc tế.' },
]

export default function FaqPage() {
  const t = useT()
  const items = (typeof document !== 'undefined' && document.documentElement.lang === 'vi') ? FAQ_VI : FAQ_EN
  return (
    <div className="bg-vg-bg min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1 max-w-[800px] w-full mx-auto px-6 md:px-10 py-10 md:py-16">
        <header className="mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight">{t.faqPage.heading}</h1>
          <p className="mt-2 text-vg-text-muted">{t.faqPage.sub}</p>
        </header>
        <ul className="flex flex-col gap-3">
          {items.map((item, idx) => (
            <FaqItem key={idx} item={item} />
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  )
}

function FaqItem({ item }: { item: Faq }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="bg-white border border-vg-border rounded-xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-vg-surface-muted/40 transition-colors"
      >
        <span className="font-display text-base md:text-lg font-bold text-vg-text">{item.q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-vg-text-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-vg-text-muted leading-relaxed">
          {item.a}
        </div>
      )}
    </li>
  )
}
