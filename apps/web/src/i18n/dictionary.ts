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
  seamless: {
    eyebrow: string
    headline: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    peaceHeading: string
  }
  bundles: {
    eyebrow: string
    heading: string
    sub: string
    planCta: string
    includesLabel: string
    fromLabel: string
    businessName: string
    businessTagline: string
    familyName: string
    familyTagline: string
    firstName: string
    firstTagline: string
    svcPickup: string
    svcFastTrack: string
    svcLounge: string
    svcPorter: string
    svcLuggage: string
    svcChildSeat: string
    svcWhiteGlove: string
    svcItinerary: string
    svcHotel: string
    svcVan: string
    svcSedan: string
  }
  journeyMap: {
    eyebrow: string
    heading: string
    sub: string
    addToBundle: string
    pickVehicle: string
    seeBundles: string
    homeLabel: string
    homeTitle: string
    homeBody: string
    transferLabel: string
    transferTitle: string
    transferBody: string
    airportLabel: string
    airportTitle: string
    airportBody: string
    flightLabel: string
    flightTitle: string
    flightBody: string
    destinationLabel: string
    destinationTitle: string
    destinationBody: string
  }
  concierge: {
    liveLabel: string
    driverStatus: string
    bagsStatus: string
    messageZalo: string
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
      whyHeading: 'Peace of mind, built into every kilometre.',
      why1Title: 'Zero logistics on you',
      why1Body: 'No queues to plan, no transfers to time. We sequence every handover so you never touch a detail.',
      why2Title: 'One number, end to end',
      why2Body: 'Your concierge on Zalo or WhatsApp — from home pickup to hotel key, one conversation covers the whole trip.',
      why3Title: 'Flight-aware, hands-free',
      why3Body: 'Delays, gate changes, late arrivals — our team re-syncs your driver, your fast-track, your check-in. You just walk.',
      why4Title: 'Carried, not queued',
      why4Body: 'Luggage collected at home, bags appearing in your room. Staff waiting at the car door, not a sign at a barrier.',
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
    seamless: {
      eyebrow: 'Doorstep to destination',
      headline: 'Your journey, our care.',
      sub: 'From the moment you close your front door to the moment you unpack — we carry the logistics, you keep the calm.',
      ctaPrimary: 'Plan my seamless journey →',
      ctaSecondary: 'See how we carry you',
      peaceHeading: 'Peace of mind, built into every kilometre.',
    },
    bundles: {
      eyebrow: 'Lifestyle bundles',
      heading: 'Three ways to be carried.',
      sub: 'Bundles shaped around how you travel — not a pile of SKUs to assemble. One tap, the whole journey is queued up.',
      planCta: 'Plan my trip →',
      includesLabel: 'Includes',
      fromLabel: 'from',
      businessName: 'The Business Elite',
      businessTagline: 'House-to-gate private car, airport fast-track, CIP lounge, destination transfer. For travellers whose calendar starts the moment they land.',
      familyName: 'The Family Care',
      familyTagline: '7-seater van, luggage concierge, child seats, porter, family-friendly itineraries shaped around nap times and small appetites.',
      firstName: 'The First-Class Experience',
      firstTagline: 'Luxury sedan at your door, private fast-track, premium lounge, luggage concierge, white-glove check-in at a curated stay. Begin to end, no seam.',
      svcPickup: 'House-to-gate private car',
      svcFastTrack: 'Airport fast-track',
      svcLounge: 'CIP / premium lounge',
      svcPorter: 'Porter from gate to car',
      svcLuggage: 'Luggage concierge',
      svcChildSeat: 'Child seats included',
      svcWhiteGlove: 'White-glove hotel check-in',
      svcItinerary: 'Family-friendly itinerary',
      svcHotel: 'Curated stay',
      svcVan: '7-seater van',
      svcSedan: 'Luxury sedan to your door',
    },
    journeyMap: {
      eyebrow: 'The seamless journey',
      heading: 'From doorstep to destination — we carry every step.',
      sub: 'Tap any touchpoint to see what we handle so you never have to.',
      addToBundle: 'Add to bundle →',
      pickVehicle: 'Pick your vehicle →',
      seeBundles: 'See the bundles →',
      homeLabel: 'Home',
      homeTitle: 'Luggage concierge',
      homeBody: 'Bags collected at your door, tagged, and reappearing in your hotel room — without ever passing through your hands.',
      transferLabel: 'Private transfer',
      transferTitle: 'Door-to-gate',
      transferBody: 'Sedan, SUV or 7-seat van. Driver greets by name at your front door, tracks your flight, meets you at the exact column.',
      airportLabel: 'Airport',
      airportTitle: 'Fast-track + CIP lounge',
      airportBody: 'Priority immigration lane, porter from gate, lounge seating for your party while your paperwork moves in the background.',
      flightLabel: 'Flight',
      flightTitle: 'Flight-aware concierge',
      flightBody: 'Delay, gate change, late arrival — we re-sync your driver, fast-track agent and hotel check-in automatically.',
      destinationLabel: 'Destination',
      destinationTitle: 'Arrival & check-in',
      destinationBody: 'Transfer waits at arrivals, bags are already in your room, keys on the pillow — you walk in and exhale.',
    },
    concierge: {
      liveLabel: 'Live with you',
      driverStatus: 'Your driver is at Column 5',
      bagsStatus: 'Bags collected — next stop, your room',
      messageZalo: 'Message us on Zalo / WhatsApp',
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
      eyebrow: 'Việt Nam, trọn một hành trình',
      ctaPrimary: 'Thiết kế hành trình',
      ctaSecondary: 'Khám phá dịch vụ',
      airportTag: (code) => `Bay đến ${code}`,
      scrollHint: 'Cuộn xem trọn dịch vụ sân bay ↓',
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
      planMyTrip: 'Thiết kế hành trình',
      saveForLater: 'Khám phá dịch vụ',
      addToCart: 'Thêm vào hành trình',
      added: 'Đã thêm ✓',
      cart: 'Hành trình',
      continue: 'Tiếp tục',
      total: 'Tổng',
      bookNow: 'Thiết kế ngay →',
      home: 'Trang chủ',
      keepExploring: 'Tiếp tục khám phá',
      otherDestinations: 'Điểm đến khác',
      viewAll: 'Xem tất cả →',
    },
    destination: {
      whatsIncluded: 'Hành trình bao gồm',
      availableServices: 'Dịch vụ đang sẵn sàng',
      startingFrom: 'Mức đầu tư từ',
      whereToNext: 'Hành trình tiếp theo của bạn?',
      indexSub: 'Năm điểm chạm hành trình, mở ra khắp Việt Nam. Mỗi điểm đến đã sẵn sàng đón tiếp với xe riêng, fast-track, chỗ nghỉ và tour khám phá.',
      bundleNote: 'Gộp đón sân bay, fast-track, chỗ nghỉ và tour vào cùng một hành trình — thanh toán một lần.',
      from: 'từ',
      home: 'Trang chủ',
      pickupBlurb: 'Xe riêng hoặc van. Tài xế đón tận cửa ra. Chúng tôi bám sát chuyến bay của bạn.',
      fastTrackBlurb: 'Vượt hàng nhập cảnh. Phòng chờ VIP. Nhân viên khuân vác sẵn sàng đón đợi.',
      hotelsBlurb: 'Chỗ nghỉ chúng tôi tuyển chọn kỹ — từ homestay ấm cúng đến resort ven biển.',
      toursBlurb: 'Trải nghiệm nửa ngày đến nhiều ngày, người đồng hành bản địa dẫn lối từng cung đường.',
    },
    services: {
      heading: 'Từ cửa nhà đến điểm đến — chúng tôi lo trọn.',
      sub: 'Bốn dịch vụ, năm điểm chạm hành trình, một lần đặt. Chúng tôi lo trọn phần hậu cần để bạn chỉ việc tận hưởng.',
      pickupSub: 'Xe riêng, SUV hoặc van. Tài xế chào đón tại cổng ra. Chúng tôi bám sát chuyến bay — trễ giờ cũng không lỡ.',
      fastTrackSub: 'Vượt hàng nhập cảnh. Phòng chờ CIP. Đội ngũ khuân vác đưa bạn thẳng từ cổng ra xe.',
      hotelsSub: 'Chỗ nghỉ chúng tôi tuyển chọn cạnh mọi sân bay và điểm đến. Xác nhận trước khi bạn hạ cánh.',
      toursSub: 'Trải nghiệm nửa ngày đến nhiều ngày, người đồng hành bản địa thuộc từng góc phố dẫn lối.',
      pickupBullets: ['Xe riêng — không đi chung', 'Tài xế đón tận khu vực lấy hành lý', 'Chúng tôi bám sát chuyến bay tự động', 'Ghế trẻ em sẵn sàng khi bạn yêu cầu'],
      fastTrackBullets: ['Làn ưu tiên nhập cảnh', 'Phòng chờ CIP trong lúc thư thái', 'Đội ngũ khuân vác đón ngay tại cổng', 'Áp dụng cho cả chiều đến và chiều đi'],
      hotelsBullets: ['Tuyển chọn kỹ từng cơ sở', 'Gần sân bay hoặc trung tâm', 'Xác nhận trước khi bạn đến', 'Đủ hạng từ 2–5 sao'],
      toursBullets: ['Người đồng hành bản địa', 'Nửa ngày đến nhiều ngày', 'Nhóm nhỏ hoặc riêng tư', 'Lịch trình thiết kế riêng'],
    },
    servicesBand: {
      eyebrow: 'Chúng tôi đảm nhận',
      heading: 'Dịch vụ sân bay tại năm điểm chạm hành trình Việt Nam.',
      sub: 'Chúng tôi lo từ lúc máy bay chạm đất đến tận cửa phòng. Bạn chỉ việc tận hưởng.',
      pickupSub: 'Xe riêng, SUV hoặc van. Tài xế đón tận cổng. Bám sát chuyến bay.',
      fastTrackSub: 'Vượt nhanh cửa nhập cảnh. Phòng chờ VIP. Đội ngũ khuân vác sẵn sàng.',
      hotelsSub: 'Chỗ nghỉ chúng tôi tuyển chọn, cạnh mọi sân bay và điểm đến.',
      toursSub: 'Nửa ngày đến nhiều ngày, người đồng hành bản địa dẫn lối từng con phố.',
    },
    deals: {
      eyebrow: 'Ưu đãi đặc quyền',
      heading: 'Ưu đãi riêng dành cho người hay đi.',
      sub: 'Thiết kế trọn gói để an tâm hơn. Mức đầu tư theo mùa, giảm giá đoàn và ưu đãi phút chót — cập nhật liên tục.',
      badgeLimited: 'Giới hạn',
      badgeNew: 'Mới',
      badgePopular: 'Được yêu thích',
      ctaBook: 'Thiết kế ngay →',
      ctaTerms: 'Áp dụng điều kiện',
      expiresLabel: 'Hết hạn',
    },
    trust: {
      stat1: 'cảm nhận xác thực từ những người đã đi như bạn',
      stat2: 'dịch vụ sân bay và tour — thiết kế chỉ trong vài phút',
      stat3: 'xác nhận tức thì, không còn chờ email qua lại',
      stat4: 'sân bay phục vụ: Hà Nội, Sài Gòn, Đà Nẵng, Nha Trang, Phú Quốc',
    },
    help: {
      eyebrow: 'Đồng hành & câu hỏi thường gặp',
      heading: 'Chúng tôi bên bạn trước, trong và sau mỗi hành trình.',
      sub: 'Thắc mắc về quy trình, dịch vụ bao gồm những gì, hay chuyến bay trễ sẽ xử lý ra sao? Chúng tôi đã sẵn câu trả lời.',
      howItWorksTitle: 'Cách chúng tôi lo cho bạn',
      step1Title: 'Lựa chọn dịch vụ',
      step1Body: 'Chọn điểm đến và những dịch vụ bạn muốn — đón sân bay, fast-track, khách sạn hoặc tour — để chúng tôi lo trọn.',
      step2Title: 'Thiết kế hành trình',
      step2Body: 'Để lại tên, số điện thoại và ngày đi. An tâm đặt trước, linh hoạt thanh toán khi đến.',
      step3Title: 'Đội ngũ điều hành đồng hành',
      step3Body: 'Chúng tôi đồng hành trong vài giờ để chốt từng chi tiết. Thanh toán gọn gàng khi đến — tiền mặt hoặc thẻ.',
      faqTitle: 'Câu hỏi thường gặp',
      q1: 'Tôi có phải thanh toán ngay hôm nay không?',
      a1: 'Không. An tâm đặt trước hôm nay, thanh toán gọn gàng khi đến. Không cần thẻ, không mất phí cho tới lúc bạn sử dụng dịch vụ.',
      q2: 'Chuyến bay bị trễ thì sao?',
      a2: 'Chúng tôi bám sát chuyến bay theo thời gian thực. Tài xế và đội fast-track tự đồng bộ — bạn chỉ việc bước ra, mọi thứ đã sẵn.',
      q3: 'Tôi có thể thiết kế cho cả đoàn không?',
      a3: 'Hoàn toàn được. Khi hoàn tất hành trình, điền số người lớn và trẻ em cho từng dịch vụ. Với đoàn đông, để lại vài dòng ở "Yêu cầu thêm" — chúng tôi sắp xe phù hợp.',
      q4: 'Chính sách huỷ ra sao?',
      a4: 'Bạn có thể huỷ hoặc đổi lịch qua Zalo / điện thoại, ít nhất 24 giờ trước giờ dịch vụ. Vì bạn chưa thanh toán nên không có khoản nào phải hoàn.',
      q5: 'Có ghế trẻ em không?',
      a5: 'Có — để lại mong muốn ở mục "Yêu cầu thêm" khi thiết kế hành trình. Ghế trẻ em đã miễn phí sẵn.',
      contactTitle: 'Vẫn còn điều bạn muốn biết?',
      contactBody: 'Người đồng hành bản địa nói cả tiếng Việt và tiếng Anh. Nhắn Zalo hoặc gọi — chúng tôi phản hồi trong vòng một giờ.',
      contactCta: 'Nhắn Zalo ngay →',
    },
    checkout: {
      eyebrow: 'Chốt hành trình',
      title: 'Hoàn tất thiết kế hành trình của bạn',
      subtitle: 'Để lại cách liên hệ và thời gian khởi hành. Đội ngũ điều hành sẽ đồng hành trong vài giờ để chốt từng chi tiết. An tâm đặt trước, linh hoạt thanh toán khi đến.',
      contactTitle: 'Thông tin liên hệ',
      contactSubtitle: 'Đội ngũ điều hành sẽ liên hệ số này để chốt lịch trình và báo giá riêng cho bạn.',
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
      specialRequestsPlaceholder: 'Ghế trẻ em, suất ăn chay, nhận phòng sớm… Chia sẻ để chúng tôi chuẩn bị sẵn cho bạn.',
      summary: 'Hành trình của bạn',
      subtotal: 'Tạm tính',
      total: 'Tổng cộng',
      callNote: 'Đội ngũ điều hành sẽ đồng hành trong vài giờ để chốt chi tiết. An tâm đặt trước, linh hoạt thanh toán khi đến.',
      requestBooking: 'Hoàn tất hành trình',
      placingBooking: 'Đang thiết kế hành trình…',
      keepBrowsing: '← Tiếp tục khám phá',
      remove: 'Bỏ',
      emptyTitle: 'Hành trình của bạn đang trống',
      emptyBody: 'Khám phá điểm đến và thêm dịch vụ đón sân bay, fast-track, chỗ nghỉ hoặc tour để bắt đầu.',
      browseDestinations: 'Khám phá ngay',
      errorName: 'Để lại tên để chúng tôi biết phải gọi ai.',
      errorPhone: 'Để lại số điện thoại để chúng tôi liên hệ.',
      errorDate: 'Chọn ngày khởi hành cho từng dịch vụ trong hành trình.',
      step1: 'Lựa chọn',
      step2: 'Thông tin',
      step3: 'Hoàn tất',
      priceDetails: 'Chi tiết mức đầu tư',
      yourPriceSummary: 'Tổng mức đầu tư hành trình',
      noPaymentTitle: 'An tâm đặt trước',
      noPaymentBody: 'Đội ngũ điều hành Voyager đồng hành trong vài giờ để chốt chi tiết và sắp xếp thanh toán đúng lúc bạn đến nơi.',
      freeCancel: 'Huỷ miễn phí trước 24h',
      noBookingFees: 'Không phí đặt chỗ',
      securePromise: 'Giá được chốt sẵn, minh bạch trước khi thanh toán',
    },
    search: {
      tabHotels: 'Chỗ nghỉ',
      tabTransfers: 'Đưa đón',
      tabFastTrack: 'Fast-track',
      tabTours: 'Tour',
      destination: 'Điểm đến',
      destinationPh: 'Bạn muốn được đưa đến đâu?',
      dates: 'Nhận phòng → Trả phòng',
      datesPh: 'Ngày khởi hành',
      travelers: 'Khách',
      adults: 'Người lớn',
      children: 'Trẻ em',
      search: 'Tìm kiếm',
      heroHeading: 'Chỗ nghỉ, đưa đón & tour — trọn một hành trình khắp Việt Nam',
      heroSub: 'Từ đón sân bay đến khám phá đảo — trọn hành trình trong một lần chạm. Đội ngũ điều hành chốt trước, bạn an tâm thanh toán khi đến.',
      exploreStrip: 'Khám phá điểm đến',
    },
    filters: {
      title: 'Lọc theo',
      clearAll: 'Xoá tất cả',
      serviceType: 'Loại dịch vụ',
      priceRange: 'Mức đầu tư',
      starRating: 'Hạng sao',
      airport: 'Sân bay',
      reviewScore: 'Điểm cảm nhận',
      sortBy: 'Sắp xếp theo',
      sortRecommended: 'Voyager gợi ý',
      sortPriceAsc: 'Mức đầu tư thấp nhất',
      sortPriceDesc: 'Mức đầu tư cao nhất',
      sortRating: 'Cảm nhận cao nhất',
      resultsCount: (n) => `Có ${n} điểm đến phù hợp`,
      viewServices: 'Xem dịch vụ',
      fromPrice: 'Từ',
      verified: 'Voyager tuyển chọn',
      freeCancel: 'Huỷ miễn phí',
      noPrepayment: 'An tâm đặt trước',
    },
    home: {
      browseHeading: 'Khám phá theo điểm đến',
      browseSub: 'Năm điểm chạm hành trình, mở ra khắp Việt Nam.',
      whyHeading: 'An tâm trọn hành trình — từng cây số.',
      why1Title: 'Không phải lo hậu cần',
      why1Body: 'Không xếp hàng, không canh giờ. Chúng tôi nối từng khâu để bạn không phải chạm tay vào chi tiết nào.',
      why2Title: 'Một số liên hệ, lo trọn chuyến',
      why2Body: 'Concierge của bạn trên Zalo / WhatsApp — từ đón nhà đến nhận phòng, tất cả trong một cuộc trò chuyện.',
      why3Title: 'Bám chuyến bay, rảnh tay',
      why3Body: 'Trễ giờ, đổi cổng, hạ cánh muộn — đội ngũ đồng bộ lại tài xế, fast-track, lễ tân. Bạn chỉ việc đi.',
      why4Title: 'Được đưa đón, không xếp hàng',
      why4Body: 'Hành lý được lấy tại nhà, xuất hiện trong phòng bạn. Nhân viên đợi sẵn tại cửa xe, không phải một tấm biển ở cổng.',
      howHeading: 'Ba bước để được chăm trọn hành trình',
      howStep1Title: 'Lựa chọn dịch vụ',
      howStep1Body: 'Chọn điểm đến và những dịch vụ bạn muốn được lo trọn.',
      howStep2Title: 'Để lại vài thông tin',
      howStep2Body: 'Tên, số điện thoại, ngày đi — an tâm đặt trước, linh hoạt thanh toán sau.',
      howStep3Title: 'Đội ngũ điều hành đồng hành, bạn thư thái lên đường',
      howStep3Body: 'Chúng tôi chốt từng chi tiết và báo giá riêng cho bạn. Thanh toán gọn gàng khi đến nơi.',
      offersHeading: 'Ưu đãi trong tuần',
      offersSub: 'Gói trọn, ưu đãi đoàn và mức đầu tư tốt khi thiết kế sớm.',
      offersSeeAll: 'Xem tất cả ưu đãi →',
    },
    success: {
      eyebrow: 'Hành trình đã được tiếp nhận',
      title: 'Voyager đã bắt đầu lo hành trình cho bạn',
      subtitle: 'Đội ngũ điều hành đang chuẩn bị từng chi tiết — chúng tôi đồng hành để chốt trọn hành trình trong vài giờ tới.',
      reference: 'Mã hành trình',
      status: 'Trạng thái',
      pending: 'Đang chuẩn bị',
      whatsNext: 'Điều bạn sắp trải qua',
      next1: 'Đội ngũ điều hành Voyager đồng hành trong vài giờ để chốt từng chi tiết.',
      next2: 'Chúng tôi giữ giá và gửi bản tóm tắt hành trình qua tin nhắn.',
      next3: 'An tâm đặt trước, thanh toán gọn gàng khi đến — tiền mặt hoặc thẻ ngay tại dịch vụ.',
      details: 'Chi tiết hành trình',
      contactBlock: 'Liên hệ',
      callBack: 'Chúng tôi sẽ gọi số',
      total: 'Tổng cộng',
      notes: 'Ghi chú',
      keepBrowsing: 'Tiếp tục khám phá',
      backHome: 'Về trang chủ',
      errorTitle: 'Không tải được hành trình này',
      errorBack: 'Quay lại điểm đến',
      dateTbc: 'Chưa chọn ngày',
      adult: 'người lớn',
      adults: 'người lớn',
      child: 'trẻ em',
      children: 'trẻ em',
      flight: 'Chuyến bay',
      loading: 'Đang tải hành trình…',
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
      rights: 'Đã đăng ký bản quyền.',
      tagline: 'Đồng hành cùng bạn khám phá Việt Nam.',
    },
    summary: {
      title: 'Hành trình đang thiết kế',
      hint: 'Thêm dịch vụ bạn muốn. Đội ngũ điều hành đồng hành chốt lịch cùng bạn.',
      empty: 'Hành trình còn trống',
      remove: 'Bỏ',
      reserve: 'Hoàn tất hành trình →',
    },
    goodToKnow: {
      title: 'Điều bạn yên tâm',
      b1: 'Huỷ miễn phí trong vòng 24 giờ trước ngày khởi hành',
      b2: 'An tâm đặt trước, linh hoạt thanh toán khi đến',
      b3: 'Người đồng hành bản địa, thạo cả tiếng Việt và tiếng Anh',
      b4: 'Chúng tôi tự bám sát chuyến bay cho dịch vụ đón sân bay',
      b5: 'Ghế trẻ em miễn phí, sẵn sàng khi bạn cần',
      b6: 'Người đồng hành trực tuyến 24/7 qua Zalo / WhatsApp',
    },
    offers: {
      eyebrow: 'Ưu đãi trong tuần',
      heading: 'Mức đầu tư tốt cho gói trọn, đoàn & thiết kế sớm',
      sub: 'Tiết kiệm tới 30% khi gộp đón sân bay với fast-track, hoặc thiết kế chỗ nghỉ trước 30 ngày.',
      cta: 'Xem tất cả ưu đãi →',
    },
    listing: {
      upTo: 'Tối đa',
      reviewsCount: (n) => `${n} cảm nhận`,
      noResults: 'Chưa có điểm đến phù hợp với bộ lọc của bạn.',
      clearFilters: 'Xoá bộ lọc',
    },
    login: {
      title: 'Đăng nhập',
      sub: 'Bước vào không gian Voyager của bạn',
      email: 'Email',
      password: 'Mật khẩu',
      forgotLink: 'Quên mật khẩu?',
      submit: 'Đăng nhập',
      submitting: 'Đang đăng nhập…',
      guestPrompt: 'Chỉ muốn thiết kế hành trình?',
      guestCta: 'Tiếp tục với tư cách khách →',
      errorMissing: 'Để lại email và mật khẩu để tiếp tục.',
    },
    forgot: {
      title: 'Quên mật khẩu?',
      sub: 'Để lại email, chúng tôi gửi link đặt lại mật khẩu ngay.',
      email: 'Email',
      submit: 'Gửi link đặt lại',
      submitting: 'Đang gửi…',
      sentTitle: 'Kiểm tra hộp thư của bạn',
      sentBody: (email) => `Nếu có tài khoản ứng với ${email}, chúng tôi đã gửi link đặt lại mật khẩu. Link chỉ còn hiệu lực trong 1 giờ.`,
      back: '← Quay lại đăng nhập',
      errorMissing: 'Để lại địa chỉ email để tiếp tục.',
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
    seamless: {
      eyebrow: 'Từ cửa nhà đến điểm đến',
      headline: 'Hành trình của bạn, chúng tôi lo trọn.',
      sub: 'Từ lúc bạn khép cánh cửa nhà đến khi mở vali tại khách sạn — mọi khâu chúng tôi đảm nhận, bạn chỉ việc thư thái.',
      ctaPrimary: 'Đặt hành trình trọn gói →',
      ctaSecondary: 'Xem cách chúng tôi chăm bạn',
      peaceHeading: 'An tâm trọn hành trình — từng cây số.',
    },
    bundles: {
      eyebrow: 'Gói trải nghiệm',
      heading: 'Ba cách để được lo trọn.',
      sub: 'Gói dịch vụ xây theo cách bạn đi — không phải danh sách SKU để tự ghép. Một chạm, cả hành trình đã sẵn sàng.',
      planCta: 'Đặt ngay →',
      includesLabel: 'Bao gồm',
      fromLabel: 'từ',
      businessName: 'Doanh nhân tinh tế',
      businessTagline: 'Xe riêng từ nhà đến cổng, fast-track, phòng chờ CIP, đưa về tận điểm đến. Dành cho người bận rộn — lịch bắt đầu ngay khi máy bay chạm đất.',
      familyName: 'Gia đình trọn vẹn',
      familyTagline: 'Xe van 7 chỗ, dịch vụ hành lý tận nhà, ghế trẻ em, nhân viên khuân vác, lịch trình thân thiện với giờ ngủ và khẩu vị trẻ.',
      firstName: 'Trải nghiệm thượng hạng',
      firstTagline: 'Sedan hạng sang đến tận cửa nhà, fast-track riêng, phòng chờ cao cấp, hành lý được lo trọn, nhận phòng kiểu white-glove. Từ đầu đến cuối, không một điểm rạn.',
      svcPickup: 'Xe riêng đón từ nhà đến cổng',
      svcFastTrack: 'Fast-track sân bay',
      svcLounge: 'Phòng chờ CIP / cao cấp',
      svcPorter: 'Khuân vác từ cổng đến xe',
      svcLuggage: 'Dịch vụ hành lý tận nơi',
      svcChildSeat: 'Ghế trẻ em miễn phí',
      svcWhiteGlove: 'Nhận phòng chuẩn white-glove',
      svcItinerary: 'Lịch trình dành cho gia đình',
      svcHotel: 'Chỗ nghỉ được tuyển chọn',
      svcVan: 'Xe van 7 chỗ',
      svcSedan: 'Sedan hạng sang đến tận nhà',
    },
    journeyMap: {
      eyebrow: 'Hành trình trọn vẹn',
      heading: 'Từ cửa nhà đến điểm đến — chúng tôi lo từng bước.',
      sub: 'Chạm vào từng điểm để xem chúng tôi đảm nhận những gì, để bạn không phải lo.',
      addToBundle: 'Thêm vào gói →',
      pickVehicle: 'Chọn xe →',
      seeBundles: 'Xem các gói →',
      homeLabel: 'Nhà bạn',
      homeTitle: 'Dịch vụ hành lý tận nơi',
      homeBody: 'Hành lý được lấy tại cửa nhà, gắn thẻ, xuất hiện trong phòng khách sạn — bạn không phải xách tay lần nào.',
      transferLabel: 'Xe riêng đưa đón',
      transferTitle: 'Từ cửa nhà đến cổng',
      transferBody: 'Sedan, SUV hoặc van 7 chỗ. Tài xế chào bạn bằng tên tại cửa nhà, theo dõi chuyến bay, đón đúng cột bạn ra.',
      airportLabel: 'Sân bay',
      airportTitle: 'Fast-track + phòng chờ CIP',
      airportBody: 'Làn ưu tiên nhập cảnh, khuân vác từ cổng, phòng chờ cho cả đoàn trong lúc giấy tờ được xử lý âm thầm.',
      flightLabel: 'Chuyến bay',
      flightTitle: 'Concierge bám chuyến bay',
      flightBody: 'Trễ, đổi cổng, đáp muộn — chúng tôi tự đồng bộ lại tài xế, nhân viên fast-track và lễ tân khách sạn.',
      destinationLabel: 'Điểm đến',
      destinationTitle: 'Nhận phòng & đón tận nơi',
      destinationBody: 'Xe đợi sẵn tại sảnh đến, hành lý đã sẵn trong phòng, chìa khoá trên gối — bạn chỉ bước vào và thư giãn.',
    },
    concierge: {
      liveLabel: 'Luôn bên bạn',
      driverStatus: 'Tài xế đang đợi tại Cột số 5',
      bagsStatus: 'Đã lấy hành lý — kế tiếp: phòng của bạn',
      messageZalo: 'Nhắn Zalo / WhatsApp ngay',
    },
  },
}

export type Dictionary = Dict
