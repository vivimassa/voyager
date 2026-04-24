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
    step1: string
    step2: string
    step3: string
    priceDetails: string
    yourPriceSummary: string
    noPaymentTitle: string
    noPaymentBody: string
    freeCancel: string
    noBookingFees: string
    securePromise: string
  }
  search: {
    tabHotels: string
    tabTransfers: string
    tabFastTrack: string
    tabTours: string
    destination: string
    destinationPh: string
    dates: string
    datesPh: string
    travelers: string
    adults: string
    children: string
    search: string
    heroHeading: string
    heroSub: string
    exploreStrip: string
  }
  filters: {
    title: string
    clearAll: string
    serviceType: string
    priceRange: string
    starRating: string
    airport: string
    reviewScore: string
    sortBy: string
    sortRecommended: string
    sortPriceAsc: string
    sortPriceDesc: string
    sortRating: string
    resultsCount: (n: number) => string
    viewServices: string
    fromPrice: string
    verified: string
    freeCancel: string
    noPrepayment: string
  }
  home: {
    browseHeading: string
    browseSub: string
    whyHeading: string
    why1Title: string
    why1Body: string
    why2Title: string
    why2Body: string
    why3Title: string
    why3Body: string
    why4Title: string
    why4Body: string
    howHeading: string
    howStep1Title: string
    howStep1Body: string
    howStep2Title: string
    howStep2Body: string
    howStep3Title: string
    howStep3Body: string
    offersHeading: string
    offersSub: string
    offersSeeAll: string
  }
  success: {
    eyebrow: string
    title: string
    subtitle: string
    reference: string
    status: string
    pending: string
    whatsNext: string
    next1: string
    next2: string
    next3: string
    details: string
    contactBlock: string
    callBack: string
    total: string
    notes: string
    keepBrowsing: string
    backHome: string
    errorTitle: string
    errorBack: string
    dateTbc: string
    adult: string
    adults: string
    child: string
    children: string
    flight: string
    loading: string
  }
  footer: {
    exploreTitle: string
    destinations: string
    services: string
    deals: string
    supportTitle: string
    helpCentre: string
    faq: string
    contactUs: string
    rights: string
    tagline: string
  }
  summary: {
    title: string
    hint: string
    empty: string
    remove: string
    reserve: string
  }
  goodToKnow: {
    title: string
    b1: string
    b2: string
    b3: string
    b4: string
    b5: string
    b6: string
  }
  offers: {
    eyebrow: string
    heading: string
    sub: string
    cta: string
  }
  listing: {
    upTo: string
    reviewsCount: (n: number) => string
    noResults: string
    clearFilters: string
  }
  login: {
    title: string
    sub: string
    email: string
    password: string
    forgotLink: string
    submit: string
    submitting: string
    guestPrompt: string
    guestCta: string
    errorMissing: string
  }
  forgot: {
    title: string
    sub: string
    email: string
    submit: string
    submitting: string
    sentTitle: string
    sentBody: (email: string) => string
    back: string
    errorMissing: string
  }
  reset: {
    title: string
    sub: string
    newPassword: string
    confirmPassword: string
    submit: string
    submitting: string
    doneTitle: string
    doneBody: string
    signIn: string
    invalidTitle: string
    invalidBody: string
    requestNew: string
    back: string
    errorShort: string
    errorMismatch: string
    errorNoToken: string
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
      step1: 'Your selection',
      step2: 'Your details',
      step3: 'Finish',
      priceDetails: 'Price details',
      yourPriceSummary: 'Your price summary',
      noPaymentTitle: 'No payment today',
      noPaymentBody: 'A Voyager agent will call you within a few hours to confirm and arrange payment on arrival. No card required now.',
      freeCancel: 'Free cancellation up to 24h before',
      noBookingFees: 'No booking fees',
      securePromise: 'Price confirmed before you pay',
    },
    search: {
      tabHotels: 'Hotels',
      tabTransfers: 'Transfers',
      tabFastTrack: 'Fast-track',
      tabTours: 'Tours',
      destination: 'Destination',
      destinationPh: 'Where are you going?',
      dates: 'Check-in → Check-out',
      datesPh: 'Select dates',
      travelers: 'Travellers',
      adults: 'Adults',
      children: 'Children',
      search: 'Search',
      heroHeading: 'Find hotels, transfers & tours across Vietnam',
      heroSub: 'From airport pickup to island-hopping — bundle everything in one booking. A real agent confirms before you pay.',
      exploreStrip: 'Explore destinations',
    },
    filters: {
      title: 'Filter by',
      clearAll: 'Clear all',
      serviceType: 'Service type',
      priceRange: 'Price range',
      starRating: 'Star rating',
      airport: 'Airport',
      reviewScore: 'Review score',
      sortBy: 'Sort by',
      sortRecommended: 'Our top picks',
      sortPriceAsc: 'Price (lowest first)',
      sortPriceDesc: 'Price (highest first)',
      sortRating: 'Top reviewed',
      resultsCount: (n) => `${n} destination${n === 1 ? '' : 's'} found`,
      viewServices: 'View services',
      fromPrice: 'From',
      verified: 'Verified by Voyager',
      freeCancel: 'Free cancellation',
      noPrepayment: 'No prepayment',
    },
    home: {
      browseHeading: 'Browse by destination',
      browseSub: 'Five gateways, every corner of Vietnam.',
      whyHeading: 'Why travellers choose Voyager',
      why1Title: 'Real agent, real call',
      why1Body: 'No bots. A local agent calls within a few hours to confirm every detail.',
      why2Title: 'No card today',
      why2Body: 'Request now, pay on arrival. Cancel free up to 24h before.',
      why3Title: 'One cart, four services',
      why3Body: 'Pickup, fast-track, hotel and tour — bundled and confirmed together.',
      why4Title: 'English & Vietnamese',
      why4Body: 'Our team speaks both fluently. Zalo, phone, email — whichever you prefer.',
      howHeading: 'How booking works',
      howStep1Title: 'Search & add to cart',
      howStep1Body: 'Pick a destination, add the services you need.',
      howStep2Title: 'Give us your details',
      howStep2Body: 'Name, phone, travel dates. No card required.',
      howStep3Title: 'Agent confirms, you travel',
      howStep3Body: 'We call to finalise and quote. Pay on arrival.',
      offersHeading: 'Deals of the week',
      offersSub: 'Bundles, group rates and early-bird offers.',
      offersSeeAll: 'See all deals →',
    },
    success: {
      eyebrow: 'Booking confirmed',
      title: "You're all set",
      subtitle: "Thanks! Your request is with our team — we'll call to confirm the details shortly.",
      reference: 'Reference',
      status: 'Status',
      pending: 'Pending confirmation',
      whatsNext: 'What happens next',
      next1: 'A Voyager agent calls within a few hours to confirm every detail.',
      next2: "We lock your prices and send a confirmation summary to your phone.",
      next3: 'Pay on arrival — cash or card, at the service point. No charge today.',
      details: 'Booking details',
      contactBlock: 'Contact',
      callBack: "We'll call",
      total: 'Total',
      notes: 'Notes',
      keepBrowsing: 'Keep browsing',
      backHome: 'Back to home',
      errorTitle: "We couldn't load this booking",
      errorBack: 'Back to destinations',
      dateTbc: 'Date TBC',
      adult: 'adult',
      adults: 'adults',
      child: 'child',
      children: 'children',
      flight: 'Flight',
      loading: 'Loading booking…',
    },
    footer: {
      exploreTitle: 'Explore',
      destinations: 'Destinations',
      services: 'Services',
      deals: 'Deals',
      supportTitle: 'Support',
      helpCentre: 'Help centre',
      faq: 'FAQ',
      contactUs: 'Contact us',
      rights: 'All rights reserved.',
      tagline: 'Built for travellers to Vietnam.',
    },
    summary: {
      title: 'Your selection',
      hint: 'Add the services you need. An agent calls to confirm.',
      empty: 'Nothing added yet',
      remove: 'Remove',
      reserve: 'Reserve →',
    },
    goodToKnow: {
      title: 'Good to know',
      b1: 'Free cancellation up to 24h before your travel date',
      b2: 'Pay on arrival — no card needed today',
      b3: 'English- and Vietnamese-speaking agents',
      b4: 'Flight tracking included for pickups',
      b5: 'Child seats available on request',
      b6: 'Zalo / WhatsApp support after booking',
    },
    offers: {
      eyebrow: 'Deals of the week',
      heading: 'Save on bundles, groups & early birds',
      sub: 'Up to 30% off when you pair airport pickup with fast-track, or book a hotel 30 days ahead.',
      cta: 'See all deals →',
    },
    listing: {
      upTo: 'Up to',
      reviewsCount: (n) => `${n} reviews`,
      noResults: 'No destinations match your filters.',
      clearFilters: 'Clear filters',
    },
    login: {
      title: 'Sign in',
      sub: 'Access your Voyager account',
      email: 'Email',
      password: 'Password',
      forgotLink: 'Forgot password?',
      submit: 'Sign in',
      submitting: 'Signing in…',
      guestPrompt: 'Just booking?',
      guestCta: 'Browse as guest →',
      errorMissing: 'Enter your email and password.',
    },
    forgot: {
      title: 'Forgot password?',
      sub: "Enter your email and we'll send a reset link.",
      email: 'Email',
      submit: 'Send reset link',
      submitting: 'Sending…',
      sentTitle: 'Check your email',
      sentBody: (email) => `If an account exists for ${email}, we've sent a password reset link. It expires in 1 hour.`,
      back: '← Back to sign in',
      errorMissing: 'Enter your email address.',
    },
    reset: {
      title: 'Set new password',
      sub: 'Must be at least 8 characters.',
      newPassword: 'New password',
      confirmPassword: 'Confirm password',
      submit: 'Reset password',
      submitting: 'Resetting…',
      doneTitle: 'Password reset',
      doneBody: 'You can now sign in with your new password.',
      signIn: 'Sign in',
      invalidTitle: 'Invalid link',
      invalidBody: 'This reset link is missing or malformed.',
      requestNew: 'Request new link',
      back: '← Back to sign in',
      errorShort: 'Password must be at least 8 characters.',
      errorMismatch: 'Passwords do not match.',
      errorNoToken: 'Missing reset token.',
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
      ctaPrimary: 'Đặt chuyến đi',
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
      planMyTrip: 'Đặt chuyến đi',
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
      callNote: 'Tư vấn viên sẽ gọi trong vài giờ để xác nhận. Thanh toán khi đến — hôm nay chưa mất phí.',
      requestBooking: 'Gửi yêu cầu đặt chỗ',
      placingBooking: 'Đang gửi yêu cầu…',
      keepBrowsing: '← Tiếp tục khám phá',
      remove: 'Bỏ',
      emptyTitle: 'Giỏ hàng đang trống',
      emptyBody: 'Khám phá điểm đến và thêm dịch vụ đón sân bay, fast-track, khách sạn hoặc tour để bắt đầu.',
      browseDestinations: 'Khám phá ngay',
      errorName: 'Vui lòng nhập tên để chúng tôi biết cần hỏi ai.',
      errorPhone: 'Vui lòng nhập số điện thoại để chúng tôi có thể liên hệ.',
      errorDate: 'Vui lòng chọn ngày khởi hành cho từng dịch vụ trong giỏ hàng.',
      step1: 'Lựa chọn',
      step2: 'Thông tin',
      step3: 'Hoàn tất',
      priceDetails: 'Chi tiết giá',
      yourPriceSummary: 'Tổng kết giá',
      noPaymentTitle: 'Hôm nay chưa cần thanh toán',
      noPaymentBody: 'Tư vấn viên Voyager sẽ gọi trong vài giờ để xác nhận và sắp xếp thanh toán khi đến. Chưa cần thẻ hôm nay.',
      freeCancel: 'Huỷ miễn phí trước 24h',
      noBookingFees: 'Không phí đặt chỗ',
      securePromise: 'Giá xác nhận trước khi thanh toán',
    },
    search: {
      tabHotels: 'Khách sạn',
      tabTransfers: 'Đưa đón',
      tabFastTrack: 'Fast-track',
      tabTours: 'Tour',
      destination: 'Điểm đến',
      destinationPh: 'Bạn muốn đi đâu?',
      dates: 'Nhận phòng → Trả phòng',
      datesPh: 'Chọn ngày',
      travelers: 'Khách',
      adults: 'Người lớn',
      children: 'Trẻ em',
      search: 'Tìm kiếm',
      heroHeading: 'Đặt khách sạn, đưa đón & tour khắp Việt Nam',
      heroSub: 'Từ đón sân bay đến khám phá đảo — đặt trọn gói trong một lần. Tư vấn viên xác nhận trước, bạn thanh toán khi đến.',
      exploreStrip: 'Khám phá điểm đến',
    },
    filters: {
      title: 'Lọc theo',
      clearAll: 'Xoá tất cả',
      serviceType: 'Loại dịch vụ',
      priceRange: 'Khoảng giá',
      starRating: 'Hạng sao',
      airport: 'Sân bay',
      reviewScore: 'Điểm đánh giá',
      sortBy: 'Sắp xếp theo',
      sortRecommended: 'Đề xuất',
      sortPriceAsc: 'Giá thấp nhất',
      sortPriceDesc: 'Giá cao nhất',
      sortRating: 'Đánh giá cao nhất',
      resultsCount: (n) => `Có ${n} điểm đến phù hợp`,
      viewServices: 'Xem dịch vụ',
      fromPrice: 'Chỉ từ',
      verified: 'Voyager xác thực',
      freeCancel: 'Huỷ miễn phí',
      noPrepayment: 'Không cần trả trước',
    },
    home: {
      browseHeading: 'Khám phá theo điểm đến',
      browseSub: 'Năm cửa ngõ, khắp mọi miền Việt Nam.',
      whyHeading: 'Vì sao chọn Voyager',
      why1Title: 'Tư vấn viên gọi xác nhận',
      why1Body: 'Không chatbot. Tư vấn viên địa phương gọi trong vài giờ để chốt từng chi tiết.',
      why2Title: 'Chưa cần thanh toán',
      why2Body: 'Đặt trước, thanh toán khi đến. Huỷ miễn phí trong vòng 24 giờ.',
      why3Title: 'Một giỏ, bốn dịch vụ',
      why3Body: 'Đón sân bay, fast-track, khách sạn và tour — gộp và xác nhận một lần.',
      why4Title: 'Hỗ trợ tiếng Việt & Anh',
      why4Body: 'Đội ngũ thông thạo hai ngôn ngữ. Zalo, điện thoại hay email — tuỳ bạn.',
      howHeading: 'Quy trình đặt chỉ 3 bước',
      howStep1Title: 'Chọn & thêm vào giỏ hàng',
      howStep1Body: 'Chọn điểm đến, thêm các dịch vụ bạn cần.',
      howStep2Title: 'Điền thông tin liên hệ',
      howStep2Body: 'Tên, số điện thoại, ngày đi — chưa cần thẻ.',
      howStep3Title: 'Tư vấn viên chốt, bạn lên đường',
      howStep3Body: 'Chúng tôi gọi xác nhận và báo giá. Thanh toán khi đến nơi.',
      offersHeading: 'Ưu đãi trong tuần',
      offersSub: 'Gói kết hợp, giá nhóm và ưu đãi đặt sớm.',
      offersSeeAll: 'Xem tất cả ưu đãi →',
    },
    success: {
      eyebrow: 'Đã tiếp nhận',
      title: 'Cảm ơn bạn đã đặt Voyager',
      subtitle: 'Yêu cầu đã được gửi — tư vấn viên sẽ gọi xác nhận trong vài giờ tới.',
      reference: 'Mã đặt chỗ',
      status: 'Trạng thái',
      pending: 'Chờ xác nhận',
      whatsNext: 'Tiếp theo là gì',
      next1: 'Tư vấn viên Voyager sẽ gọi trong vài giờ để xác nhận từng chi tiết.',
      next2: 'Chúng tôi khoá giá và gửi bản tóm tắt qua tin nhắn.',
      next3: 'Thanh toán khi đến — tiền mặt hoặc thẻ ngay tại dịch vụ. Chưa mất phí hôm nay.',
      details: 'Chi tiết đặt chỗ',
      contactBlock: 'Liên hệ',
      callBack: 'Sẽ gọi số',
      total: 'Tổng cộng',
      notes: 'Ghi chú',
      keepBrowsing: 'Tiếp tục khám phá',
      backHome: 'Về trang chủ',
      errorTitle: 'Không tải được đặt chỗ này',
      errorBack: 'Quay lại điểm đến',
      dateTbc: 'Chưa chọn ngày',
      adult: 'người lớn',
      adults: 'người lớn',
      child: 'trẻ em',
      children: 'trẻ em',
      flight: 'Chuyến bay',
      loading: 'Đang tải đặt chỗ…',
    },
    footer: {
      exploreTitle: 'Khám phá',
      destinations: 'Điểm đến',
      services: 'Dịch vụ',
      deals: 'Ưu đãi',
      supportTitle: 'Hỗ trợ',
      helpCentre: 'Trung tâm hỗ trợ',
      faq: 'Câu hỏi thường gặp',
      contactUs: 'Liên hệ',
      rights: 'Bản quyền đã đăng ký.',
      tagline: 'Dành cho người khám phá Việt Nam.',
    },
    summary: {
      title: 'Giỏ hàng của bạn',
      hint: 'Thêm dịch vụ bạn cần. Tư vấn viên sẽ gọi xác nhận.',
      empty: 'Giỏ hàng trống',
      remove: 'Bỏ',
      reserve: 'Thanh toán →',
    },
    goodToKnow: {
      title: 'Thông tin cần biết',
      b1: 'Huỷ miễn phí trong vòng 24 giờ trước ngày đi',
      b2: 'Thanh toán khi đến — chưa cần thẻ hôm nay',
      b3: 'Tư vấn viên nói tiếng Việt & tiếng Anh',
      b4: 'Theo dõi chuyến bay tự động cho dịch vụ đón sân bay',
      b5: 'Ghế trẻ em miễn phí khi có yêu cầu',
      b6: 'Hỗ trợ qua Zalo / WhatsApp sau khi đặt',
    },
    offers: {
      eyebrow: 'Ưu đãi trong tuần',
      heading: 'Giảm giá gói kết hợp, nhóm & đặt sớm',
      sub: 'Tiết kiệm tới 30% khi kết hợp đón sân bay với fast-track, hoặc đặt khách sạn trước 30 ngày.',
      cta: 'Xem tất cả ưu đãi →',
    },
    listing: {
      upTo: 'Tối đa',
      reviewsCount: (n) => `${n} đánh giá`,
      noResults: 'Không có điểm đến nào phù hợp với bộ lọc.',
      clearFilters: 'Xoá bộ lọc',
    },
    login: {
      title: 'Đăng nhập',
      sub: 'Truy cập tài khoản Voyager',
      email: 'Email',
      password: 'Mật khẩu',
      forgotLink: 'Quên mật khẩu?',
      submit: 'Đăng nhập',
      submitting: 'Đang đăng nhập…',
      guestPrompt: 'Chỉ muốn đặt chỗ?',
      guestCta: 'Tiếp tục với tư cách khách →',
      errorMissing: 'Vui lòng nhập email và mật khẩu.',
    },
    forgot: {
      title: 'Quên mật khẩu?',
      sub: 'Nhập email, chúng tôi sẽ gửi link đặt lại mật khẩu.',
      email: 'Email',
      submit: 'Gửi link đặt lại',
      submitting: 'Đang gửi…',
      sentTitle: 'Hãy kiểm tra email',
      sentBody: (email) => `Nếu có tài khoản ứng với ${email}, chúng tôi đã gửi link đặt lại mật khẩu. Link hết hạn sau 1 giờ.`,
      back: '← Quay lại đăng nhập',
      errorMissing: 'Vui lòng nhập địa chỉ email.',
    },
    reset: {
      title: 'Đặt mật khẩu mới',
      sub: 'Mật khẩu cần ít nhất 8 ký tự.',
      newPassword: 'Mật khẩu mới',
      confirmPassword: 'Xác nhận mật khẩu',
      submit: 'Đặt lại mật khẩu',
      submitting: 'Đang xử lý…',
      doneTitle: 'Đã đặt lại mật khẩu',
      doneBody: 'Bây giờ bạn có thể đăng nhập bằng mật khẩu mới.',
      signIn: 'Đăng nhập',
      invalidTitle: 'Link không hợp lệ',
      invalidBody: 'Link đặt lại mật khẩu này đã hỏng hoặc hết hạn.',
      requestNew: 'Yêu cầu link mới',
      back: '← Quay lại đăng nhập',
      errorShort: 'Mật khẩu cần ít nhất 8 ký tự.',
      errorMismatch: 'Mật khẩu nhập lại không khớp.',
      errorNoToken: 'Thiếu mã đặt lại mật khẩu.',
    },
  },
}

export type Dictionary = Dict
