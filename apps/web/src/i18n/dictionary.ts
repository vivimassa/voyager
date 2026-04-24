/**
 * Voyager i18n dictionary — en + vi.
 * Keep keys namespaced so we can split files later if this grows.
 * Looked up via the useT() hook with dot-path keys, e.g. t('hero.cta').
 */
import type { Locale } from '@/stores/locale-store'

type Dict = {
  nav: {
    destinations: string
    services: string
    deals: string
    help: string
    signIn: string
  }
  hero: {
    eyebrow: string
    ctaPrimary: string
    ctaSecondary: string
    airportTag: (code: string) => string
    scrollHint: string
  }
  service: {
    pickup: string
    fastTrack: string
    hotel: string
    tour: string
    from: string
  }
  common: {
    vnd: string
    usd: string
    planMyTrip: string
    saveForLater: string
    addToCart: string
    added: string
    cart: string
    continue: string
    total: string
    bookNow: string
    home: string
    keepExploring: string
    otherDestinations: string
    viewAll: string
  }
  destination: {
    whatsIncluded: string
    availableServices: string
    startingFrom: string
    whereToNext: string
    indexSub: string
    bundleNote: string
    from: string
    home: string
    pickupBlurb: string
    fastTrackBlurb: string
    hotelsBlurb: string
    toursBlurb: string
  }
  services: {
    heading: string
    sub: string
    pickupSub: string
    fastTrackSub: string
    hotelsSub: string
    toursSub: string
    pickupBullets: string[]
    fastTrackBullets: string[]
    hotelsBullets: string[]
    toursBullets: string[]
  }
  servicesBand: {
    eyebrow: string
    heading: string
    sub: string
    pickupSub: string
    fastTrackSub: string
    hotelsSub: string
    toursSub: string
  }
  trust: {
    stat1: string
    stat2: string
    stat3: string
    stat4: string
  }
  deals: {
    eyebrow: string
    heading: string
    sub: string
    badgeLimited: string
    badgeNew: string
    badgePopular: string
    ctaBook: string
    ctaTerms: string
    expiresLabel: string
  }
  help: {
    eyebrow: string
    heading: string
    sub: string
    howItWorksTitle: string
    step1Title: string
    step1Body: string
    step2Title: string
    step2Body: string
    step3Title: string
    step3Body: string
    faqTitle: string
    q1: string
    a1: string
    q2: string
    a2: string
    q3: string
    a3: string
    q4: string
    a4: string
    q5: string
    a5: string
    contactTitle: string
    contactBody: string
    contactCta: string
  }
  checkout: {
    eyebrow: string
    title: string
    subtitle: string
    contactTitle: string
    contactSubtitle: string
    yourName: string
    namePlaceholder: string
    phoneNumber: string
    phonePlaceholder: string
    travelDate: string
    time: string
    checkIn: string
    checkInNote: string
    adults: string
    children: string
    flightNumber: string
    flightPlaceholder: string
    specialRequests: string
    specialRequestsPlaceholder: string
    summary: string
    subtotal: string
    total: string
    callNote: string
    requestBooking: string
    placingBooking: string
    keepBrowsing: string
    remove: string
    emptyTitle: string
    emptyBody: string
    browseDestinations: string
    errorName: string
    errorPhone: string
    errorDate: string
  }
}

export const dictionary: Record<Locale, Dict> = {
  en: {
    nav: {
      destinations: 'Destinations',
      services: 'Services',
      deals: 'Deals',
      help: 'Help',
      signIn: 'Sign in',
    },
    hero: {
      eyebrow: 'Vietnam, your way',
      ctaPrimary: 'Plan my trip',
      ctaSecondary: 'Browse services',
      airportTag: (code) => `Fly into ${code}`,
      scrollHint: 'Scroll for all airport services ↓',
    },
    service: {
      pickup: 'Airport pickup',
      fastTrack: 'Fast-track',
      hotel: 'Hotels',
      tour: 'Tours',
      from: 'from',
    },
    common: {
      vnd: 'VND',
      usd: 'USD',
      planMyTrip: 'Plan my trip',
      saveForLater: 'Browse services',
      addToCart: 'Add to cart',
      added: 'Added ✓',
      cart: 'Cart',
      continue: 'Continue',
      total: 'Total',
      bookNow: 'Book now →',
      home: 'Home',
      keepExploring: 'Keep exploring',
      otherDestinations: 'Other destinations',
      viewAll: 'View all →',
    },
    destination: {
      whatsIncluded: "What's included",
      availableServices: 'Available services',
      startingFrom: 'Starting from',
      whereToNext: 'Where to next',
      indexSub: 'Five gateways, every corner of Vietnam. Each destination bundles the airport pickup, the fast-track, the stay, and the day-trip.',
      bundleNote: 'Bundle the pickup, the fast-track, the hotel, and the tour — one cart, one checkout.',
      from: 'from',
      home: 'Home',
      pickupBlurb: 'Private car or van. Meet & greet. Flight tracked.',
      fastTrackBlurb: 'Skip immigration lines. CIP lounge access. Porter service.',
      hotelsBlurb: 'Curated stays near the sights — from guesthouses to resorts.',
      toursBlurb: 'Half-day to multi-day experiences, led by local guides.',
    },
    services: {
      heading: 'Everything from gate to destination.',
      sub: 'Four services, five airports, one booking. We handle the arrival so you can focus on the trip.',
      pickupSub: "Private car, SUV or van. Meet & greet in arrivals. Flight tracked so we're there even if you're late.",
      fastTrackSub: 'Skip the immigration queue. CIP lounge access. Porter service from gate to car.',
      hotelsSub: 'Curated stays near every airport and every destination. Booked and confirmed before you land.',
      toursSub: 'Half-day to multi-day experiences led by locals who know the backstreets and the back-stories.',
      pickupBullets: ['Private vehicle — no shared shuttles', 'Driver meets you in arrivals hall', 'Flight delay tracking included', 'Child seats on request'],
      fastTrackBullets: ['Priority immigration lane', 'CIP lounge access while you wait', 'Dedicated porter from gate', 'Available for arrivals & departures'],
      hotelsBullets: ['Hand-picked properties', 'Near airport or city centre', 'Confirmed before arrival', 'All star ratings'],
      toursBullets: ['Local expert guides', 'Half-day to multi-day', 'Small groups or private', 'Customisable itineraries'],
    },
    servicesBand: {
      eyebrow: 'What we do',
      heading: 'Airport services for the five gateways to Vietnam.',
      sub: 'We handle the arrival, the ride, the stay, and the day-trip. You just land and go.',
      pickupSub: 'Private car, SUV or van. Meet & greet. Flight tracked.',
      fastTrackSub: 'Skip immigration lines. CIP lounge access. Porter service.',
      hotelsSub: 'Curated stays near every airport and every destination.',
      toursSub: 'Half-day to multi-day, led by locals who know the backstreets.',
    },
    deals: {
      eyebrow: 'Special offers',
      heading: 'Deals built for travellers.',
      sub: 'Bundle and save. Seasonal rates, group discounts, and last-minute offers — updated as we get them.',
      badgeLimited: 'Limited',
      badgeNew: 'New',
      badgePopular: 'Popular',
      ctaBook: 'Book this deal →',
      ctaTerms: 'T&Cs apply',
      expiresLabel: 'Expires',
    },
    trust: {
      stat1: 'verified reviews from travellers like you',
      stat2: 'airport services and tours bookable in minutes',
      stat3: 'confirmed instantly, no waiting for email replies',
      stat4: 'airports covered: Hanoi, Saigon, Da Nang, Nha Trang, Phu Quoc',
    },
    help: {
      eyebrow: 'Help & FAQ',
      heading: 'We\'re here before, during, and after your trip.',
      sub: 'Questions about how it works, what\'s included, or what happens if your flight is delayed? We\'ve got you.',
      howItWorksTitle: 'How it works',
      step1Title: 'Browse & add to cart',
      step1Body: 'Choose your destination, pick the services you need — airport pickup, fast-track, hotel, or tour — and add them to your cart.',
      step2Title: 'Request your booking',
      step2Body: 'Tell us your name, phone number, and travel dates. No card needed. We confirm everything before you pay.',
      step3Title: 'We call you back',
      step3Body: 'Our local team phones you within a few hours to confirm every detail. Pay on arrival — cash or card at the service point.',
      faqTitle: 'Common questions',
      q1: 'Do I need to pay anything today?',
      a1: 'No. You request the booking today and pay on arrival. There\'s no card required and no charge until your trip.',
      q2: 'What if my flight is delayed?',
      a2: 'We track your flight in real time. Your driver or fast-track agent will be updated automatically — no need to call us.',
      q3: 'Can I book for a group?',
      a3: 'Yes. When you check out, set the number of adults and children for each service. For large groups, mention it in special requests and we\'ll arrange the right vehicle.',
      q4: 'What\'s the cancellation policy?',
      a4: 'You can cancel or change your booking by calling us at least 24 hours before the service. Because you haven\'t paid yet, there\'s nothing to refund.',
      q5: 'Do you offer child seats?',
      a5: 'Yes — request one in the special requests field at checkout. Child seats are included at no extra charge.',
      contactTitle: 'Still have questions?',
      contactBody: 'Our team speaks English and Vietnamese. Zalo or call us and we\'ll get back to you within the hour.',
      contactCta: 'Chat on Zalo →',
    },
    checkout: {
      eyebrow: 'Checkout',
      title: 'Confirm your booking',
      subtitle: "Tell us how to reach you and when you're travelling. Our team will call you back within a few hours to confirm every detail. Pay on arrival — no card needed today.",
      contactTitle: 'How to reach you',
      contactSubtitle: 'Our local team will phone this number to confirm timings and quote the price.',
      yourName: 'Your name',
      namePlaceholder: 'e.g. Anh Nguyen',
      phoneNumber: 'Phone number',
      phonePlaceholder: 'e.g. 0901 234 567',
      travelDate: 'Travel date',
      time: 'Time',
      checkIn: 'Check-in',
      checkInNote: 'Standard (2pm+)',
      adults: 'Adults',
      children: 'Children',
      flightNumber: 'Flight number',
      flightPlaceholder: 'e.g. VN54',
      specialRequests: 'Special requests',
      specialRequestsPlaceholder: 'Child seat, vegetarian meal, early check-in — anything we should flag to the local team.',
      summary: 'Summary',
      subtotal: 'Subtotal',
      total: 'Total',
      callNote: "We'll call you within a few hours to confirm. Pay on arrival — no charge today.",
      requestBooking: 'Request booking',
      placingBooking: 'Placing booking…',
      keepBrowsing: '← Keep browsing',
      remove: 'Remove',
      emptyTitle: 'Your cart is empty',
      emptyBody: 'Pick a destination and add a pickup, fast-track, hotel, or tour to get started.',
      browseDestinations: 'Browse destinations',
      errorName: 'Please enter your name so we know who to ask for.',
      errorPhone: 'Please enter a phone number we can call you back on.',
      errorDate: 'Please pick a travel date for every service in your cart.',
    },
  },
  vi: {
    nav: {
      destinations: 'Điểm đến',
      services: 'Dịch vụ',
      deals: 'Ưu đãi',
      help: 'Trợ giúp',
      signIn: 'Đăng nhập',
    },
    hero: {
      eyebrow: 'Việt Nam, theo cách của bạn',
      ctaPrimary: 'Lên kế hoạch',
      ctaSecondary: 'Khám phá dịch vụ',
      airportTag: (code) => `Bay đến ${code}`,
      scrollHint: 'Cuộn để xem tất cả dịch vụ sân bay ↓',
    },
    service: {
      pickup: 'Đón sân bay',
      fastTrack: 'Fast-track',
      hotel: 'Khách sạn',
      tour: 'Tour',
      from: 'từ',
    },
    common: {
      vnd: 'VND',
      usd: 'USD',
      planMyTrip: 'Lên kế hoạch',
      saveForLater: 'Khám phá dịch vụ',
      addToCart: 'Thêm vào giỏ',
      added: 'Đã thêm ✓',
      cart: 'Giỏ hàng',
      continue: 'Tiếp tục',
      total: 'Tổng',
      bookNow: 'Đặt ngay →',
      home: 'Trang chủ',
      keepExploring: 'Tiếp tục khám phá',
      otherDestinations: 'Điểm đến khác',
      viewAll: 'Xem tất cả →',
    },
    destination: {
      whatsIncluded: 'Bao gồm những gì',
      availableServices: 'Dịch vụ có sẵn',
      startingFrom: 'Chỉ từ',
      whereToNext: 'Bạn muốn đi đâu?',
      indexSub: 'Năm cửa ngõ, khắp mọi miền Việt Nam. Mỗi điểm đến bao gồm đón sân bay, fast-track, chỗ nghỉ và tour tham quan.',
      bundleNote: 'Gộp đón sân bay, fast-track, khách sạn và tour vào một giỏ hàng, thanh toán một lần.',
      from: 'từ',
      home: 'Trang chủ',
      pickupBlurb: 'Xe riêng hoặc van. Đón tận cửa ra. Theo dõi chuyến bay.',
      fastTrackBlurb: 'Vượt hàng nhập cảnh. Phòng chờ VIP. Dịch vụ khuân vác.',
      hotelsBlurb: 'Chỗ nghỉ được tuyển chọn gần danh thắng — từ nhà nghỉ đến resort.',
      toursBlurb: 'Trải nghiệm nửa ngày đến nhiều ngày, được dẫn bởi hướng dẫn viên địa phương.',
    },
    services: {
      heading: 'Từ cổng đến điểm đến — chúng tôi lo tất cả.',
      sub: 'Bốn dịch vụ, năm sân bay, một lần đặt. Chúng tôi xử lý phần đến để bạn tập trung tận hưởng.',
      pickupSub: 'Xe riêng, SUV hoặc van. Đón tận cổng ra. Theo dõi chuyến bay — có trễ vẫn kịp.',
      fastTrackSub: 'Vượt hàng nhập cảnh. Phòng chờ CIP. Khuân vác từ cổng đến xe.',
      hotelsSub: 'Chỗ nghỉ được tuyển chọn gần mọi sân bay và điểm đến. Xác nhận trước khi bạn đáp xuống.',
      toursSub: 'Trải nghiệm nửa ngày đến nhiều ngày, được dẫn bởi người địa phương am hiểu từng góc phố.',
      pickupBullets: ['Xe riêng — không đi chung', 'Tài xế đón tại khu vực lấy hành lý', 'Theo dõi chuyến bay tự động', 'Ghế trẻ em theo yêu cầu'],
      fastTrackBullets: ['Ưu tiên làn nhập cảnh', 'Phòng chờ CIP trong lúc chờ', 'Nhân viên khuân vác từ cổng', 'Áp dụng cho cả đến và đi'],
      hotelsBullets: ['Cơ sở được tuyển chọn kỹ', 'Gần sân bay hoặc trung tâm', 'Xác nhận trước khi đến', 'Đủ hạng từ 2–5 sao'],
      toursBullets: ['Hướng dẫn viên địa phương', 'Nửa ngày đến nhiều ngày', 'Nhóm nhỏ hoặc riêng tư', 'Lịch trình linh hoạt'],
    },
    servicesBand: {
      eyebrow: 'Dịch vụ của chúng tôi',
      heading: 'Dịch vụ sân bay tại năm cửa ngõ vào Việt Nam.',
      sub: 'Chúng tôi lo từ lúc đáp xuống đến tận điểm đến. Bạn chỉ việc tận hưởng.',
      pickupSub: 'Xe riêng, SUV hoặc van. Đón tận cổng. Theo dõi chuyến bay.',
      fastTrackSub: 'Qua nhanh cửa nhập cảnh. Phòng chờ VIP. Dịch vụ khuân vác.',
      hotelsSub: 'Khách sạn được tuyển chọn gần mọi sân bay và điểm đến.',
      toursSub: 'Nửa ngày đến nhiều ngày, dẫn bởi người địa phương am hiểu từng con phố.',
    },
    deals: {
      eyebrow: 'Ưu đãi đặc biệt',
      heading: 'Ưu đãi dành riêng cho người hay đi.',
      sub: 'Đặt trọn gói để tiết kiệm hơn. Giá theo mùa, giảm giá nhóm và ưu đãi phút chót — cập nhật liên tục.',
      badgeLimited: 'Giới hạn',
      badgeNew: 'Mới',
      badgePopular: 'Phổ biến',
      ctaBook: 'Đặt ngay →',
      ctaTerms: 'Áp dụng điều kiện',
      expiresLabel: 'Hết hạn',
    },
    trust: {
      stat1: 'đánh giá xác thực từ những người đã đi như bạn',
      stat2: 'dịch vụ sân bay và tour đặt được ngay trong vài phút',
      stat3: 'xác nhận ngay lập tức, không chờ email phản hồi',
      stat4: 'sân bay phục vụ: Hà Nội, Sài Gòn, Đà Nẵng, Nha Trang, Phú Quốc',
    },
    help: {
      eyebrow: 'Hỗ trợ & FAQ',
      heading: 'Chúng tôi đồng hành trước, trong và sau chuyến đi.',
      sub: 'Thắc mắc về quy trình, dịch vụ bao gồm những gì, hay chuyện gì xảy ra nếu chuyến bay trễ? Chúng tôi có câu trả lời.',
      howItWorksTitle: 'Quy trình đặt dịch vụ',
      step1Title: 'Chọn và thêm vào giỏ',
      step1Body: 'Chọn điểm đến, thêm các dịch vụ cần thiết — đón sân bay, fast-track, khách sạn hoặc tour — vào giỏ hàng.',
      step2Title: 'Gửi yêu cầu đặt chỗ',
      step2Body: 'Cho chúng tôi biết tên, số điện thoại và ngày đi. Không cần thẻ. Chúng tôi xác nhận mọi thứ trước khi bạn thanh toán.',
      step3Title: 'Chúng tôi gọi lại cho bạn',
      step3Body: 'Đội ngũ hỗ trợ sẽ gọi điện trong vài giờ để xác nhận từng chi tiết. Thanh toán khi đến nơi — tiền mặt hoặc thẻ.',
      faqTitle: 'Câu hỏi thường gặp',
      q1: 'Tôi có phải thanh toán ngay hôm nay không?',
      a1: 'Không. Bạn đặt chỗ hôm nay và thanh toán khi đến nơi. Không cần thẻ, không mất phí cho đến khi sử dụng dịch vụ.',
      q2: 'Chuyến bay bị trễ thì sao?',
      a2: 'Chúng tôi theo dõi chuyến bay theo thời gian thực. Tài xế hoặc nhân viên fast-track sẽ được cập nhật tự động — bạn không cần gọi cho chúng tôi.',
      q3: 'Tôi có thể đặt cho cả nhóm không?',
      a3: 'Được. Khi thanh toán, hãy điền số lượng người lớn và trẻ em cho từng dịch vụ. Với nhóm đông, hãy ghi thêm vào mục yêu cầu đặc biệt.',
      q4: 'Chính sách huỷ đặt chỗ như thế nào?',
      a4: 'Bạn có thể huỷ hoặc thay đổi bằng cách gọi cho chúng tôi ít nhất 24 giờ trước khi sử dụng dịch vụ. Vì chưa thanh toán nên không có khoản nào cần hoàn lại.',
      q5: 'Có ghế trẻ em không?',
      a5: 'Có — điền yêu cầu vào mục "Yêu cầu thêm" khi đặt chỗ. Ghế trẻ em được cung cấp miễn phí.',
      contactTitle: 'Vẫn còn thắc mắc?',
      contactBody: 'Đội ngũ hỗ trợ nói được cả tiếng Anh và tiếng Việt. Nhắn Zalo hoặc gọi điện, chúng tôi sẽ phản hồi trong vòng một giờ.',
      contactCta: 'Nhắn tin qua Zalo →',
    },
    checkout: {
      eyebrow: 'Xác nhận đặt chỗ',
      title: 'Hoàn tất hành trình của bạn',
      subtitle: 'Cho chúng tôi biết cách liên hệ và thời gian khởi hành. Đội ngũ hỗ trợ sẽ gọi lại trong vài giờ để xác nhận mọi chi tiết. Thanh toán khi đến nơi — hôm nay chưa cần thẻ.',
      contactTitle: 'Thông tin liên hệ',
      contactSubtitle: 'Đội ngũ hỗ trợ sẽ gọi đến số này để sắp xếp lịch trình và báo giá chính xác.',
      yourName: 'Họ và tên',
      namePlaceholder: 'VD: Nguyễn Văn A',
      phoneNumber: 'Số điện thoại',
      phonePlaceholder: 'VD: 0901 234 567',
      travelDate: 'Ngày khởi hành',
      time: 'Giờ xuất phát',
      checkIn: 'Nhận phòng',
      checkInNote: 'Tiêu chuẩn (từ 14:00)',
      adults: 'Người lớn',
      children: 'Trẻ em',
      flightNumber: 'Số hiệu chuyến bay',
      flightPlaceholder: 'VD: VN54',
      specialRequests: 'Yêu cầu thêm',
      specialRequestsPlaceholder: 'Ghế trẻ em, suất ăn chay, nhận phòng sớm… Hãy cho chúng tôi biết để chuẩn bị tốt nhất cho bạn.',
      summary: 'Chi tiết đặt chỗ',
      subtotal: 'Tạm tính',
      total: 'Tổng cộng',
      callNote: 'Đội ngũ hỗ trợ sẽ liên hệ trong vài giờ để xác nhận. Thanh toán khi đến — hoàn toàn miễn phí hôm nay.',
      requestBooking: 'Xác nhận đặt chỗ',
      placingBooking: 'Đang gửi yêu cầu…',
      keepBrowsing: '← Tiếp tục khám phá',
      remove: 'Bỏ',
      emptyTitle: 'Giỏ hàng đang trống',
      emptyBody: 'Khám phá điểm đến và thêm dịch vụ đón sân bay, fast-track, khách sạn hoặc tour để bắt đầu.',
      browseDestinations: 'Khám phá ngay',
      errorName: 'Vui lòng nhập tên để chúng tôi biết cần hỏi ai.',
      errorPhone: 'Vui lòng nhập số điện thoại để chúng tôi có thể liên hệ.',
      errorDate: 'Vui lòng chọn ngày khởi hành cho từng dịch vụ trong giỏ hàng.',
    },
  },
}

export type Dictionary = Dict
