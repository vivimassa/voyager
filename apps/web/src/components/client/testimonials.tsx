'use client'

import { useState, useEffect } from 'react'
import { useT } from '@/i18n/use-t'

const QUOTES = [
  {
    en: 'Saved us 40 minutes at SGN immigration. Worth every dollar — we made our connection easily.',
    vi: 'Tiết kiệm 40 phút tại SGN. Đáng từng đồng — kịp chuyến nối thoải mái.',
    name: 'Mai Trang',
    role: 'Marketing director, HCMC',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
  {
    en: 'The greeter was waiting at the door with a sign — straight through to the lounge. Best $35 I’ve spent on travel this year.',
    vi: 'Đại diện đã chờ sẵn ngay cửa với biển tên — đi thẳng vào phòng chờ. Đáng giá nhất $35 năm nay.',
    name: 'James Kim',
    role: 'Frequent flyer, Seoul',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80',
  },
  {
    en: 'Travelling with two kids — Voyager Fast Track at HAN turned a 90-minute headache into 15 calm minutes.',
    vi: 'Đi cùng hai con — Voyager Fast Track tại HAN biến 90 phút mệt mỏi thành 15 phút nhẹ nhàng.',
    name: 'Linh & Đức',
    role: 'Family travellers',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
  },
  {
    en: 'Booked the bank-transfer flow on the way to the airport — confirmation came in under 5 minutes. Smooth.',
    vi: 'Đặt qua chuyển khoản ngay trên đường ra sân bay — xác nhận trong chưa đầy 5 phút. Mượt.',
    name: 'Thuy Nguyen',
    role: 'Business traveller',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    en: 'Used it 4 trips in a row at DAD international. Same staff, same smile. They actually remember you.',
    vi: 'Dùng liên tục 4 chuyến qua DAD quốc tế. Cùng đội, cùng nụ cười. Thật sự nhớ tên khách.',
    name: 'Anh Tuấn',
    role: 'CEO, logistics startup',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
]

export function Testimonials() {
  const t = useT()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((n) => (n + 1) % QUOTES.length), 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="bg-white px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-[1100px] mx-auto">
        <header className="text-center mb-10">
          <span className="inline-block text-[11px] tracking-[0.18em] uppercase font-semibold text-vg-cta">
            {t.testimonials.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-vg-text tracking-tight">
            {t.testimonials.heading}
          </h2>
        </header>

        <div className="relative bg-vg-surface-muted rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-[120px_1fr] gap-6 items-center">
            <img
              src={QUOTES[idx].photo}
              alt=""
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
            <div>
              <p className="font-display text-xl md:text-2xl text-vg-text leading-snug">
                <Locale en={QUOTES[idx].en} vi={QUOTES[idx].vi} />
              </p>
              <div className="mt-4 text-sm">
                <span className="font-bold text-vg-text">{QUOTES[idx].name}</span>
                <span className="text-vg-text-muted"> · {QUOTES[idx].role}</span>
              </div>
              <Stars />
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-8 bg-vg-cta' : 'w-2 bg-vg-border'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Locale({ en, vi }: { en: string; vi: string }) {
  // Tiny no-hook locale switch — read from <html lang> at render time so this
  // stays a pure component.
  if (typeof document !== 'undefined' && document.documentElement.lang === 'vi') {
    return <>{vi}</>
  }
  return <>{en}</>
}

function Stars() {
  return (
    <div className="mt-2 flex gap-0.5 text-vg-warm">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <polygon points="12 2 15 9 22 10 17 15 18 22 12 18 6 22 7 15 2 10 9 9 12 2"/>
        </svg>
      ))}
    </div>
  )
}
