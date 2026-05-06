/**
 * Voyager i18n dictionary — Fast-Track-only storefront, en + vi.
 * Looked up via the useT() hook; consumers index typed properties so TS
 * catches typos and preserves autocomplete.
 */
import type { Locale } from '@/stores/locale-store'

export type Dictionary = {
  nav: {
    fastTrack: string
    coverage: string
    howItWorks: string
    faq: string
    about: string
    signIn: string
    myTickets: string
    deals: string
    destinations: string
    services: string
    help: string
  }
  common: {
    cart: string
    bookNow: string
    continue: string
    back: string
    cancel: string
    home: string
    email: string
    phone: string
    name: string
    save: string
    edit: string
    remove: string
    optional: string
    required: string
    learnMore: string
    seeAll: string
    yes: string
    no: string
    close: string
    submit: string
    submitting: string
  }
  hero: {
    eyebrow: string
    title: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    trustline: string
  }
  search: {
    title: string
    airport: string
    airportPlaceholder: string
    segment: string
    direction: string
    travelDate: string
    pax: string
    paxSuffix: string
    cta: string
    helper: string
  }
  segment: {
    domestic: string
    international: string
  }
  direction: {
    arrival: string
    departure: string
  }
  inclusion: {
    checkin: string
    baggage: string
    security: string
    immigration: string
  }
  airportCard: {
    fromLabel: string
    bookCta: string
    laneSummary: (segments: string) => string
  }
  coverage: {
    eyebrow: string
    heading: string
    sub: string
  }
  whyFastTrack: {
    eyebrow: string
    heading: string
    sub: string
    pillarCheckinTitle: string
    pillarCheckinBody: string
    pillarBaggageTitle: string
    pillarBaggageBody: string
    pillarSecurityTitle: string
    pillarSecurityBody: string
    pillarImmigrationTitle: string
    pillarImmigrationBody: string
  }
  home: {
    howHeading: string
    howStep1Title: string
    howStep1Body: string
    howStep2Title: string
    howStep2Body: string
    howStep3Title: string
    howStep3Body: string
  }
  testimonials: {
    eyebrow: string
    heading: string
  }
  stats: {
    eyebrow: string
    heading: string
    customers: string
    customersValue: string
    satisfaction: string
    satisfactionValue: string
    repeat: string
    repeatValue: string
  }
  faqTeaser: {
    eyebrow: string
    heading: string
    sub: string
    cta: string
  }
  faqPage: {
    heading: string
    sub: string
  }
  about: {
    heading: string
    sub: string
    body: string
  }
  service: {
    fastTrack: string
    pickup: string
    hotel: string
    tour: string
    from: string
  }
  booking: {
    title: string
    laneTitle: string
    paxLabel: string
    addPax: string
    removePax: string
    flightLabel: string
    travelTimeLabel: string
    proceed: string
    soldOut: string
    soldOutNote: string
    inventoryRemaining: (n: number) => string
  }
  passenger: {
    legend: (n: number) => string
    firstName: string
    lastName: string
    dob: string
    nationality: string
    nationalityPlaceholder: string
    idType: string
    idTypePassport: string
    idTypeCccd: string
    idNumber: string
    idPlaceholderPassport: string
    idPlaceholderCccd: string
  }
  payment: {
    title: string
    methodVnpay: string
    methodVnpayDesc: string
    methodBank: string
    methodBankDesc: string
    bankName: string
    bankAccount: string
    bankHolder: string
    bankReference: string
    bankInstructions: string
    qrAlt: string
    redirecting: string
    payNow: string
    confirmTransfer: string
  }
  ticket: {
    lookupTitle: string
    lookupSub: string
    ticketIdLabel: string
    showAtAirport: string
    flightLabel: string
    statusPending: string
    statusConfirmed: string
    statusCancelled: string
    cancelCta: string
    cancelWarning: string
  }
  checkout: {
    title: string
    step1: string
    step2: string
    step3: string
    contactTitle: string
    contactSubtitle: string
    yourName: string
    namePlaceholder: string
    phoneNumber: string
    phonePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
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
    yourPriceSummary: string
    subtotal: string
    total: string
    requestBooking: string
    placingBooking: string
    remove: string
    keepBrowsing: string
    noPaymentTitle: string
    noPaymentBody: string
    freeCancel: string
    noBookingFees: string
    securePromise: string
    errorName: string
    errorPhone: string
    errorDate: string
    errorPassengers: string
    errorEmail: string
    emptyTitle: string
    emptyBody: string
    browseDestinations: string
    paymentMethod: string
  }
  success: {
    eyebrow: string
    title: string
    subtitle: string
    reference: string
    ticketLabel: string
    pending: string
    contactBlock: string
    callBack: string
    next1: string
    next2: string
    next3: string
    flight: string
    notes: string
    details: string
    total: string
    adult: string
    adults: string
    child: string
    children: string
    backHome: string
    keepBrowsing: string
    dateTbc: string
    whatsNext: string
    loading: string
    errorTitle: string
    errorBack: string
  }
  login: {
    title: string
    sub: string
    email: string
    password: string
    submit: string
    submitting: string
    errorMissing: string
    forgotLink: string
    guestPrompt: string
    guestCta: string
  }
  forgot: {
    title: string
    sub: string
    email: string
    submit: string
    submitting: string
    sentTitle: string
    sentBody: (email: string) => string
    errorMissing: string
    back: string
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
    invalidTitle: string
    invalidBody: string
    requestNew: string
    signIn: string
    back: string
    errorMissing: string
    errorMismatch: string
    errorShort: string
    errorNoToken: string
  }
  profile: {
    firstName: string
    lastName: string
    email: string
    phone: string
    avatarUrl: string
  }
  footer: {
    tagline: string
    exploreTitle: string
    fastTrack: string
    coverage: string
    howItWorks: string
    supportTitle: string
    helpCentre: string
    contactUs: string
    faq: string
    aboutUs: string
    agentLogin: string
    rights: string
    hotline: string
    legal: string
  }
  legal: {
    terms: string
    privacy: string
  }
  agent: {
    brand: string
    brandSub: string
    searchPlaceholder: string
    seeAllTransactions: string
    totalRevenue: string
    nav: {
      dashboard: string
      bookings: string
      bookingsAll: string
      bookingsFastTrack: string
      bookingsHotel: string
      bookingsPickup: string
      bookingsTour: string
      bookingsPending: string
      bookingsPaid: string
      inventory: string
      pricing: string
      airports: string
      customers: string
      destinations: string
      products: string
      reports: string
      support: string
      settings: string
      logOut: string
    }
    inventory: {
      title: string
      sub: string
      capacity: string
      sold: string
      remaining: string
      saveCap: string
      saved: string
      saveError: string
      dateRange: string
      shiftDays: (n: number) => string
      lane: string
      empty: string
    }
    pricing: {
      title: string
      sub: string
      laneCol: string
      airportCol: string
      segmentCol: string
      directionCol: string
      fitCol: string
      gitCol: string
      capCol: string
      saveCta: string
      savedNote: (n: number) => string
    }
    dashboard: {
      title: string
      sub: string
      todayLabel: string
      weekLabel: string
      monthLabel: string
      paidBookings: string
      totalRevenue: string
      revenueSub: string
      bySalesAirport: string
      airportLabel: string
      salesLabel: string
      revenueLabel: string
    }
    bookings: {
      title: string
      newBooking: string
      import: string
      export: string
      empty: string
      emptyHint: string
      loading: string
      loadError: string
      pageSize: string
      prev: string
      next: string
      count: (n: number) => string
      filterStatus: Record<string, string>
      filterService: Record<string, string>
      paymentStatus: Record<string, string>
      col: {
        booking: string
        status: string
        customer: string
        service: string
        travel: string
        pax: string
        total: string
        payment: string
        created: string
      }
      detail: {
        heading: string
        close: string
        contact: string
        name: string
        phone: string
        items: string
        flight: string
        travelDate: string
        travelTime: string
        adults: string
        children: string
        qty: string
        unitPrice: string
        notes: string
        noNotes: string
        totals: string
        subtotal: string
        discount: string
        total: string
        payment: string
        method: string
        paymentStatus: string
        createdAt: string
        updatedAt: string
      }
    }
  }
}

const en: Dictionary = {
  nav: {
    fastTrack: 'Fast Track',
    coverage: 'Airports',
    howItWorks: 'How it works',
    faq: 'FAQ',
    about: 'About',
    signIn: 'Sign in',
    myTickets: 'My tickets',
    deals: 'Deals',
    destinations: 'Airports',
    services: 'Fast Track',
    help: 'Support',
  },
  common: {
    cart: 'Cart',
    bookNow: 'Book now',
    continue: 'Continue',
    back: 'Back',
    cancel: 'Cancel',
    home: 'Home',
    email: 'Email',
    phone: 'Phone',
    name: 'Name',
    save: 'Save',
    edit: 'Edit',
    remove: 'Remove',
    optional: 'optional',
    required: 'required',
    learnMore: 'Learn more',
    seeAll: 'See all',
    yes: 'Yes',
    no: 'No',
    close: 'Close',
    submit: 'Submit',
    submitting: 'Submitting…',
  },
  hero: {
    eyebrow: 'Voyager Fast Track',
    title: 'Skip the queues. Walk straight through.',
    sub: 'Priority check-in, baggage, security and immigration at every major Vietnamese airport — booked in under a minute.',
    ctaPrimary: 'Book Fast Track',
    ctaSecondary: 'See how it works',
    trustline: 'Trusted by 10,000+ travellers · 24/7 hotline',
  },
  search: {
    title: 'Where are you flying?',
    airport: 'Airport',
    airportPlaceholder: 'Pick an airport',
    segment: 'Flight type',
    direction: 'Direction',
    travelDate: 'Travel date',
    pax: 'Passengers',
    paxSuffix: 'pax',
    cta: 'Find Fast Track',
    helper: 'Groups of 6+ get GIT pricing automatically.',
  },
  segment: { domestic: 'Domestic', international: 'International' },
  direction: { arrival: 'Arrival', departure: 'Departure' },
  inclusion: {
    checkin: 'Priority check-in',
    baggage: 'Priority baggage',
    security: 'Priority security',
    immigration: 'Priority immigration',
  },
  airportCard: {
    fromLabel: 'From',
    bookCta: 'Book Fast Track',
    laneSummary: (segments) => `Domestic & international: ${segments}`,
  },
  coverage: {
    eyebrow: 'Coverage',
    heading: 'Every major Vietnamese airport',
    sub: 'Same trusted Fast Track service across the network — book once, walk through anywhere.',
  },
  whyFastTrack: {
    eyebrow: 'Why Fast Track',
    heading: 'Designed for travellers who value time',
    sub: 'Four priority lanes worked end-to-end by Vihat-certified airport staff.',
    pillarCheckinTitle: 'Priority check-in',
    pillarCheckinBody: 'Skip the airline queue with a dedicated counter and direct hand-off.',
    pillarBaggageTitle: 'Priority baggage',
    pillarBaggageBody: 'Bags tagged first — onto the belt before the rest of the flight.',
    pillarSecurityTitle: 'Priority security',
    pillarSecurityBody: 'Fast lane through screening with a host walking you through.',
    pillarImmigrationTitle: 'Priority immigration',
    pillarImmigrationBody: 'For international flights — straight to a dedicated officer.',
  },
  home: {
    howHeading: 'How Fast Track works',
    howStep1Title: 'Pick your airport',
    howStep1Body: 'Choose airport, direction and date. Pricing is shown upfront in USD or VND.',
    howStep2Title: 'Pay securely',
    howStep2Body: 'Card via VNPay or Vietnamese bank transfer with QR. Confirmation in seconds.',
    howStep3Title: 'Receive your ticket',
    howStep3Body: 'Get a Fast Track ID instantly. Show it to our greeter at the airport — done.',
  },
  testimonials: {
    eyebrow: 'Travellers say',
    heading: 'A smoother way through every Vietnamese airport',
  },
  stats: {
    eyebrow: 'Trusted by travellers',
    heading: 'The numbers',
    customers: 'Travellers served',
    customersValue: '10,000+',
    satisfaction: 'Customer satisfaction',
    satisfactionValue: '93%',
    repeat: 'Repeat-customer rate',
    repeatValue: '90%',
  },
  faqTeaser: {
    eyebrow: 'Need a hand?',
    heading: 'Common questions',
    sub: 'How much luggage is covered, when do I get my ticket, what if my flight changes — answered.',
    cta: 'Read the FAQ',
  },
  faqPage: {
    heading: 'Frequently asked questions',
    sub: 'Everything you might need before booking Fast Track.',
  },
  about: {
    heading: 'About Voyager',
    sub: 'Fast Track at every Vietnamese airport, powered by Vihat.',
    body: 'Voyager is the consumer brand for Vihat’s airport priority service network — operating Fast Track lanes at HAN, SGN, DAD, CXR, HUI, THD and VII. We’re here to make every flight in and out of Vietnam smoother.',
  },
  service: { fastTrack: 'Fast Track', pickup: 'Airport pickup', hotel: 'Hotel', tour: 'Tour', from: 'from' },
  booking: {
    title: 'Confirm your Fast Track',
    laneTitle: 'Selected service',
    paxLabel: 'Number of passengers',
    addPax: 'Add passenger',
    removePax: 'Remove',
    flightLabel: 'Flight number',
    travelTimeLabel: 'Flight time',
    proceed: 'Continue to checkout',
    soldOut: 'Sold out for this date',
    soldOutNote: 'Try a different date or airport.',
    inventoryRemaining: (n) => `Only ${n} slots left for this date`,
  },
  passenger: {
    legend: (n) => `Passenger ${n}`,
    firstName: 'First name',
    lastName: 'Last name',
    dob: 'Date of birth',
    nationality: 'Nationality',
    nationalityPlaceholder: 'e.g. VN, US, JP',
    idType: 'ID type',
    idTypePassport: 'Passport',
    idTypeCccd: 'Vietnamese ID (CCCD)',
    idNumber: 'ID number',
    idPlaceholderPassport: 'Passport number',
    idPlaceholderCccd: 'CCCD number (12 digits)',
  },
  payment: {
    title: 'Payment',
    methodVnpay: 'Card / VNPay',
    methodVnpayDesc: 'Visa, Mastercard, JCB, ATM and QR via VNPay.',
    methodBank: 'Bank transfer',
    methodBankDesc: 'Vietnamese bank transfer — agent confirms within minutes.',
    bankName: 'Bank',
    bankAccount: 'Account number',
    bankHolder: 'Account holder',
    bankReference: 'Reference',
    bankInstructions: 'Send the exact amount to the account below using the reference. Your ticket is issued the moment we confirm the deposit.',
    qrAlt: 'VietQR for bank transfer',
    redirecting: 'Redirecting to VNPay…',
    payNow: 'Pay now',
    confirmTransfer: 'I’ve made the transfer',
  },
  ticket: {
    lookupTitle: 'Find my ticket',
    lookupSub: 'Enter your phone number — we’ll send a verification code.',
    ticketIdLabel: 'Fast Track ID',
    showAtAirport: 'Show this ID at the Voyager desk at the airport.',
    flightLabel: 'Flight',
    statusPending: 'Pending payment',
    statusConfirmed: 'Confirmed',
    statusCancelled: 'Cancelled',
    cancelCta: 'Cancel booking',
    cancelWarning: 'Cancellations are allowed up to 24 hours before travel.',
  },
  checkout: {
    title: 'Checkout',
    step1: 'Cart',
    step2: 'Details',
    step3: 'Payment',
    contactTitle: 'Contact details',
    contactSubtitle: 'We’ll send the Fast Track ticket here.',
    yourName: 'Full name',
    namePlaceholder: 'As on your passport / ID',
    phoneNumber: 'Phone number',
    phonePlaceholder: '+84 ...',
    emailLabel: 'Email',
    emailPlaceholder: 'you@email.com',
    travelDate: 'Travel date',
    time: 'Flight time',
    checkIn: 'Check-in',
    checkInNote: 'Hotel will confirm time',
    adults: 'Adults',
    children: 'Children',
    flightNumber: 'Flight number',
    flightPlaceholder: 'e.g. VN123',
    specialRequests: 'Special requests',
    specialRequestsPlaceholder: 'Stroller, wheelchair, dietary needs…',
    yourPriceSummary: 'Order summary',
    subtotal: 'Subtotal',
    total: 'Total',
    requestBooking: 'Pay & book',
    placingBooking: 'Placing booking…',
    remove: 'Remove',
    keepBrowsing: 'Keep browsing',
    noPaymentTitle: 'Secure payment',
    noPaymentBody: 'You’ll be redirected to VNPay or shown a VietQR depending on the method picked above.',
    freeCancel: 'Free cancellation up to 24h before travel',
    noBookingFees: 'No booking fees',
    securePromise: 'Encrypted payments via VNPay',
    errorName: 'Please enter your name.',
    errorPhone: 'Please enter a valid phone number.',
    errorDate: 'Please pick a travel date for every line.',
    errorPassengers: 'Please fill in details for every passenger.',
    errorEmail: 'Please enter a valid email.',
    emptyTitle: 'Your cart is empty',
    emptyBody: 'Pick an airport on the home page to add a Fast Track package.',
    browseDestinations: 'Browse airports',
    paymentMethod: 'Payment method',
  },
  success: {
    eyebrow: 'Booking received',
    title: 'You’re on the Fast Track',
    subtitle: 'Show your Fast Track ID at the Voyager desk at the airport.',
    reference: 'Booking reference',
    ticketLabel: 'Fast Track ID',
    pending: 'Awaiting payment confirmation',
    contactBlock: 'Contact',
    callBack: 'We’ll call you if anything is unclear.',
    next1: 'A confirmation has been sent to your phone and email.',
    next2: 'Arrive at the airport at least 90 minutes before international, 60 minutes domestic.',
    next3: 'Look for the Voyager greeter at the entrance — they’ll find you with your Fast Track ID.',
    flight: 'Flight',
    notes: 'Notes',
    details: 'Booking details',
    total: 'Total',
    adult: 'adult',
    adults: 'adults',
    child: 'child',
    children: 'children',
    backHome: 'Back to home',
    keepBrowsing: 'Book another lane',
    dateTbc: 'Date TBC',
    whatsNext: 'What’s next',
    loading: 'Loading your booking…',
    errorTitle: 'We couldn’t find that booking.',
    errorBack: 'Back to home',
  },
  login: {
    title: 'Sign in',
    sub: 'Sign in to view your tickets and bookings.',
    email: 'Email',
    password: 'Password',
    submit: 'Sign in',
    submitting: 'Signing in…',
    errorMissing: 'Email and password are required.',
    forgotLink: 'Forgot password?',
    guestPrompt: 'No account?',
    guestCta: 'Continue as guest',
  },
  forgot: {
    title: 'Reset password',
    sub: 'Enter your email and we’ll send a reset link.',
    email: 'Email',
    submit: 'Send reset link',
    submitting: 'Sending…',
    sentTitle: 'Check your inbox',
    sentBody: (email) => `If ${email} is on file, a reset link is on its way.`,
    errorMissing: 'Please enter your email.',
    back: 'Back to sign in',
  },
  reset: {
    title: 'Set a new password',
    sub: 'Enter and confirm your new password.',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
    submit: 'Update password',
    submitting: 'Saving…',
    doneTitle: 'Password updated',
    doneBody: 'You can now sign in with your new password.',
    invalidTitle: 'Reset link is invalid or expired',
    invalidBody: 'Please request a fresh reset link to continue.',
    requestNew: 'Request a new link',
    signIn: 'Sign in',
    back: 'Back to sign in',
    errorMissing: 'Please fill in both password fields.',
    errorMismatch: 'Passwords do not match.',
    errorShort: 'Password must be at least 8 characters.',
    errorNoToken: 'Reset token missing.',
  },
  profile: {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    avatarUrl: 'Avatar URL',
  },
  footer: {
    tagline: 'Fast Track at every Vietnamese airport — powered by Vihat.',
    exploreTitle: 'Explore',
    fastTrack: 'Fast Track',
    coverage: 'Airport coverage',
    howItWorks: 'How it works',
    supportTitle: 'Support',
    helpCentre: 'Help centre',
    contactUs: 'Contact us',
    faq: 'FAQ',
    aboutUs: 'About',
    agentLogin: 'Agent login',
    rights: 'All rights reserved.',
    hotline: '24/7 hotline',
    legal: 'Legal',
  },
  legal: { terms: 'Terms of service', privacy: 'Privacy policy' },
  agent: {
    brand: 'Voyager Agent',
    brandSub: 'Operations console',
    searchPlaceholder: 'Search bookings, customers, ticket IDs…',
    seeAllTransactions: 'See all bookings',
    totalRevenue: 'Total revenue',
    nav: {
      dashboard: 'Dashboard',
      bookings: 'Bookings',
      bookingsAll: 'All bookings',
      bookingsFastTrack: 'Fast Track',
      bookingsHotel: 'Hotel',
      bookingsPickup: 'Pickup',
      bookingsTour: 'Tour',
      bookingsPending: 'Pending payment',
      bookingsPaid: 'Paid',
      inventory: 'Inventory',
      pricing: 'Pricing',
      airports: 'Airports',
      customers: 'Customers',
      destinations: 'Airports',
      products: 'Products',
      reports: 'Reports',
      support: 'Support',
      settings: 'Settings',
      logOut: 'Log out',
    },
    inventory: {
      title: 'Inventory',
      sub: 'Daily Fast Track capacity per airport lane.',
      capacity: 'Capacity',
      sold: 'Sold',
      remaining: 'Left',
      saveCap: 'Save cap',
      saved: 'Saved',
      saveError: 'Save failed',
      dateRange: 'Date range',
      shiftDays: (n) => (n > 0 ? `+${n}d` : `${n}d`),
      lane: 'Lane',
      empty: 'No data for this range',
    },
    pricing: {
      title: 'Pricing',
      sub: 'USD prices from the Vihat 2024 guide. Edit FIT/GIT and the daily cap inline.',
      laneCol: 'Lane',
      airportCol: 'Airport',
      segmentCol: 'Segment',
      directionCol: 'Direction',
      fitCol: 'FIT (USD)',
      gitCol: 'GIT (USD)',
      capCol: 'Daily cap',
      saveCta: 'Save changes',
      savedNote: (n) => `${n} lane${n === 1 ? '' : 's'} updated`,
    },
    dashboard: {
      title: 'Dashboard',
      sub: 'Snapshot of bookings and revenue.',
      todayLabel: 'Today',
      weekLabel: 'Last 7 days',
      monthLabel: 'Last 30 days',
      paidBookings: 'Paid bookings',
      totalRevenue: 'Lifetime revenue',
      revenueSub: 'Paid bookings only',
      bySalesAirport: 'Sales by airport',
      airportLabel: 'Airport',
      salesLabel: 'Sold',
      revenueLabel: 'Revenue (USD)',
    },
    bookings: {
      title: 'All bookings',
      newBooking: 'New booking',
      import: 'Import',
      export: 'Export',
      empty: 'No bookings yet',
      emptyHint: 'Customer bookings will appear here once travellers complete checkout.',
      loading: 'Loading bookings…',
      loadError: 'Could not load bookings',
      pageSize: 'Per page',
      prev: 'Prev',
      next: 'Next',
      count: (n) => `${n} booking${n === 1 ? '' : 's'}`,
      filterStatus: {
        all: 'All',
        pending: 'Pending',
        confirmed: 'Confirmed',
        fulfilled: 'Fulfilled',
        cancelled: 'Cancelled',
        closed: 'Closed',
      },
      filterService: {
        all: 'All services',
        fastTrack: 'Fast Track',
        pickup: 'Pickup',
        hotel: 'Hotel',
        tour: 'Tour',
      },
      paymentStatus: {
        unpaid: 'Unpaid',
        paid: 'Paid',
        pending_transfer: 'Pending transfer',
        refunded: 'Refunded',
        partial_refund: 'Partial refund',
      },
      col: {
        booking: 'Booking',
        status: 'Status',
        customer: 'Customer',
        service: 'Service',
        travel: 'Travel',
        pax: 'Pax',
        total: 'Total',
        payment: 'Payment',
        created: 'Created',
      },
      detail: {
        heading: 'Booking details',
        close: 'Close',
        contact: 'Contact',
        name: 'Name',
        phone: 'Phone',
        items: 'Items',
        flight: 'Flight',
        travelDate: 'Travel date',
        travelTime: 'Travel time',
        adults: 'Adults',
        children: 'Children',
        qty: 'Qty',
        unitPrice: 'Unit price',
        notes: 'Notes',
        noNotes: 'No notes provided.',
        totals: 'Totals',
        subtotal: 'Subtotal',
        discount: 'Discount',
        total: 'Total',
        payment: 'Payment',
        method: 'Method',
        paymentStatus: 'Status',
        createdAt: 'Created',
        updatedAt: 'Updated',
      },
    },
  },
}

const vi: Dictionary = {
  nav: {
    fastTrack: 'Fast Track',
    coverage: 'Sân bay',
    howItWorks: 'Quy trình',
    faq: 'Câu hỏi',
    about: 'Về chúng tôi',
    signIn: 'Đăng nhập',
    myTickets: 'Vé của tôi',
    deals: 'Ưu đãi',
    destinations: 'Sân bay',
    services: 'Fast Track',
    help: 'Hỗ trợ',
  },
  common: {
    cart: 'Giỏ hàng',
    bookNow: 'Đặt ngay',
    continue: 'Tiếp tục',
    back: 'Quay lại',
    cancel: 'Huỷ',
    home: 'Trang chủ',
    email: 'Email',
    phone: 'Điện thoại',
    name: 'Họ tên',
    save: 'Lưu',
    edit: 'Sửa',
    remove: 'Xoá',
    optional: 'tuỳ chọn',
    required: 'bắt buộc',
    learnMore: 'Tìm hiểu',
    seeAll: 'Xem tất cả',
    yes: 'Có',
    no: 'Không',
    close: 'Đóng',
    submit: 'Gửi',
    submitting: 'Đang gửi…',
  },
  hero: {
    eyebrow: 'Voyager Fast Track',
    title: 'Bỏ qua hàng đợi. Đi thẳng vào cổng.',
    sub: 'Ưu tiên check-in, hành lý, an ninh và xuất nhập cảnh tại mọi sân bay lớn ở Việt Nam — đặt trong chưa đầy một phút.',
    ctaPrimary: 'Đặt Fast Track',
    ctaSecondary: 'Xem cách hoạt động',
    trustline: 'Hơn 10.000 khách tin dùng · Hotline 24/7',
  },
  search: {
    title: 'Bạn sẽ bay từ đâu?',
    airport: 'Sân bay',
    airportPlaceholder: 'Chọn sân bay',
    segment: 'Loại chuyến bay',
    direction: 'Chiều',
    travelDate: 'Ngày bay',
    pax: 'Số khách',
    paxSuffix: 'khách',
    cta: 'Tìm Fast Track',
    helper: 'Đoàn từ 6 khách trở lên áp dụng giá GIT.',
  },
  segment: { domestic: 'Nội địa', international: 'Quốc tế' },
  direction: { arrival: 'Đến', departure: 'Đi' },
  inclusion: {
    checkin: 'Ưu tiên check-in',
    baggage: 'Ưu tiên hành lý',
    security: 'Ưu tiên an ninh',
    immigration: 'Ưu tiên xuất nhập cảnh',
  },
  airportCard: {
    fromLabel: 'Từ',
    bookCta: 'Đặt Fast Track',
    laneSummary: (segments) => `Nội địa & quốc tế: ${segments}`,
  },
  coverage: {
    eyebrow: 'Mạng lưới',
    heading: 'Mọi sân bay lớn tại Việt Nam',
    sub: 'Cùng một dịch vụ Fast Track đáng tin cậy trên cả mạng lưới — đặt một lần, đi đâu cũng nhanh.',
  },
  whyFastTrack: {
    eyebrow: 'Vì sao Fast Track',
    heading: 'Dành cho hành khách trân trọng thời gian',
    sub: 'Bốn làn ưu tiên do đội ngũ Vihat tại sân bay đồng hành từ đầu đến cuối.',
    pillarCheckinTitle: 'Ưu tiên check-in',
    pillarCheckinBody: 'Bỏ qua hàng đợi của hãng bay với quầy riêng và bàn giao trực tiếp.',
    pillarBaggageTitle: 'Ưu tiên hành lý',
    pillarBaggageBody: 'Hành lý được đánh dấu ưu tiên — lên băng chuyền trước cả chuyến bay.',
    pillarSecurityTitle: 'Ưu tiên an ninh',
    pillarSecurityBody: 'Đi qua làn an ninh nhanh có nhân viên đồng hành.',
    pillarImmigrationTitle: 'Ưu tiên xuất nhập cảnh',
    pillarImmigrationBody: 'Áp dụng cho chuyến quốc tế — vào thẳng quầy xuất nhập cảnh chuyên biệt.',
  },
  home: {
    howHeading: 'Cách Fast Track hoạt động',
    howStep1Title: 'Chọn sân bay',
    howStep1Body: 'Chọn sân bay, chiều và ngày bay. Giá hiển thị USD hoặc VND minh bạch.',
    howStep2Title: 'Thanh toán an toàn',
    howStep2Body: 'Thẻ qua VNPay hoặc chuyển khoản ngân hàng có VietQR. Xác nhận trong vài giây.',
    howStep3Title: 'Nhận vé Fast Track',
    howStep3Body: 'Mã Fast Track gửi ngay lập tức. Đưa cho đại diện Voyager tại sân bay là xong.',
  },
  testimonials: {
    eyebrow: 'Khách nói gì',
    heading: 'Hành trình mượt mà tại mọi sân bay',
  },
  stats: {
    eyebrow: 'Khách hàng tin tưởng',
    heading: 'Con số nói lên tất cả',
    customers: 'Khách đã phục vụ',
    customersValue: '10.000+',
    satisfaction: 'Mức hài lòng',
    satisfactionValue: '93%',
    repeat: 'Quay lại sử dụng',
    repeatValue: '90%',
  },
  faqTeaser: {
    eyebrow: 'Cần hỗ trợ?',
    heading: 'Câu hỏi thường gặp',
    sub: 'Bao nhiêu hành lý được ưu tiên, khi nào nhận vé, đổi chuyến thì sao — đều có lời giải.',
    cta: 'Xem câu hỏi thường gặp',
  },
  faqPage: {
    heading: 'Câu hỏi thường gặp',
    sub: 'Mọi điều bạn cần biết trước khi đặt Fast Track.',
  },
  about: {
    heading: 'Về Voyager',
    sub: 'Fast Track tại mọi sân bay Việt Nam, vận hành bởi Vihat.',
    body: 'Voyager là thương hiệu tiêu dùng cho mạng lưới dịch vụ ưu tiên sân bay của Vihat — vận hành các làn Fast Track tại HAN, SGN, DAD, CXR, HUI, THD và VII. Chúng tôi giúp mọi chuyến bay đến và đi Việt Nam trở nên thuận tiện hơn.',
  },
  service: { fastTrack: 'Fast Track', pickup: 'Đưa đón sân bay', hotel: 'Khách sạn', tour: 'Tour', from: 'từ' },
  booking: {
    title: 'Xác nhận Fast Track',
    laneTitle: 'Dịch vụ đã chọn',
    paxLabel: 'Số khách',
    addPax: 'Thêm khách',
    removePax: 'Xoá',
    flightLabel: 'Số hiệu chuyến bay',
    travelTimeLabel: 'Giờ bay',
    proceed: 'Tiếp tục thanh toán',
    soldOut: 'Hết chỗ cho ngày này',
    soldOutNote: 'Hãy thử ngày khác hoặc sân bay khác.',
    inventoryRemaining: (n) => `Chỉ còn ${n} suất cho ngày này`,
  },
  passenger: {
    legend: (n) => `Khách ${n}`,
    firstName: 'Tên',
    lastName: 'Họ',
    dob: 'Ngày sinh',
    nationality: 'Quốc tịch',
    nationalityPlaceholder: 'VD: VN, US, JP',
    idType: 'Loại giấy tờ',
    idTypePassport: 'Hộ chiếu',
    idTypeCccd: 'CCCD',
    idNumber: 'Số giấy tờ',
    idPlaceholderPassport: 'Số hộ chiếu',
    idPlaceholderCccd: 'Số CCCD (12 chữ số)',
  },
  payment: {
    title: 'Thanh toán',
    methodVnpay: 'Thẻ / VNPay',
    methodVnpayDesc: 'Visa, Mastercard, JCB, ATM và mã QR qua VNPay.',
    methodBank: 'Chuyển khoản',
    methodBankDesc: 'Chuyển khoản ngân hàng — đại lý xác nhận trong vài phút.',
    bankName: 'Ngân hàng',
    bankAccount: 'Số tài khoản',
    bankHolder: 'Chủ tài khoản',
    bankReference: 'Nội dung',
    bankInstructions: 'Vui lòng chuyển đúng số tiền tới tài khoản dưới đây kèm nội dung đã ghi. Vé sẽ được phát hành ngay khi chúng tôi xác nhận khoản chuyển.',
    qrAlt: 'VietQR cho chuyển khoản',
    redirecting: 'Đang chuyển sang VNPay…',
    payNow: 'Thanh toán',
    confirmTransfer: 'Tôi đã chuyển khoản',
  },
  ticket: {
    lookupTitle: 'Tra cứu vé',
    lookupSub: 'Nhập số điện thoại — chúng tôi sẽ gửi mã xác thực.',
    ticketIdLabel: 'Mã Fast Track',
    showAtAirport: 'Đưa mã này cho quầy Voyager tại sân bay.',
    flightLabel: 'Chuyến bay',
    statusPending: 'Chờ thanh toán',
    statusConfirmed: 'Đã xác nhận',
    statusCancelled: 'Đã huỷ',
    cancelCta: 'Huỷ vé',
    cancelWarning: 'Cho phép huỷ trước giờ bay 24 giờ.',
  },
  checkout: {
    title: 'Thanh toán',
    step1: 'Giỏ',
    step2: 'Thông tin',
    step3: 'Thanh toán',
    contactTitle: 'Thông tin liên hệ',
    contactSubtitle: 'Chúng tôi sẽ gửi vé Fast Track đến đây.',
    yourName: 'Họ và tên',
    namePlaceholder: 'Đúng như trên hộ chiếu / CCCD',
    phoneNumber: 'Số điện thoại',
    phonePlaceholder: '+84 ...',
    emailLabel: 'Email',
    emailPlaceholder: 'ban@email.com',
    travelDate: 'Ngày bay',
    time: 'Giờ bay',
    checkIn: 'Nhận phòng',
    checkInNote: 'Khách sạn xác nhận giờ',
    adults: 'Người lớn',
    children: 'Trẻ em',
    flightNumber: 'Số hiệu chuyến bay',
    flightPlaceholder: 'VD: VN123',
    specialRequests: 'Yêu cầu thêm',
    specialRequestsPlaceholder: 'Xe đẩy, xe lăn, suất ăn đặc biệt…',
    yourPriceSummary: 'Tóm tắt đơn',
    subtotal: 'Tạm tính',
    total: 'Tổng',
    requestBooking: 'Thanh toán & đặt',
    placingBooking: 'Đang đặt vé…',
    remove: 'Xoá',
    keepBrowsing: 'Tiếp tục xem',
    noPaymentTitle: 'Thanh toán an toàn',
    noPaymentBody: 'Bạn sẽ được chuyển sang VNPay hoặc nhận VietQR tuỳ phương thức đã chọn.',
    freeCancel: 'Huỷ miễn phí trước 24 giờ',
    noBookingFees: 'Không phí đặt chỗ',
    securePromise: 'Thanh toán mã hoá qua VNPay',
    errorName: 'Vui lòng nhập họ tên.',
    errorPhone: 'Vui lòng nhập số điện thoại hợp lệ.',
    errorDate: 'Vui lòng chọn ngày bay cho từng dịch vụ.',
    errorPassengers: 'Vui lòng nhập đầy đủ thông tin từng khách.',
    errorEmail: 'Vui lòng nhập email hợp lệ.',
    emptyTitle: 'Giỏ hàng trống',
    emptyBody: 'Hãy chọn sân bay ở trang chủ để thêm gói Fast Track.',
    browseDestinations: 'Xem sân bay',
    paymentMethod: 'Phương thức thanh toán',
  },
  success: {
    eyebrow: 'Đã nhận đơn',
    title: 'Bạn đã có Fast Track',
    subtitle: 'Đưa mã Fast Track cho quầy Voyager tại sân bay là xong.',
    reference: 'Mã đơn',
    ticketLabel: 'Mã Fast Track',
    pending: 'Đang chờ xác nhận thanh toán',
    contactBlock: 'Liên hệ',
    callBack: 'Chúng tôi sẽ gọi nếu cần làm rõ thêm.',
    next1: 'Xác nhận đã được gửi tới điện thoại và email của bạn.',
    next2: 'Có mặt tại sân bay trước giờ bay quốc tế 90 phút, nội địa 60 phút.',
    next3: 'Tìm đại diện Voyager tại lối vào — họ sẽ nhận diện qua mã Fast Track của bạn.',
    flight: 'Chuyến bay',
    notes: 'Ghi chú',
    details: 'Chi tiết đơn',
    total: 'Tổng',
    adult: 'người lớn',
    adults: 'người lớn',
    child: 'trẻ em',
    children: 'trẻ em',
    backHome: 'Về trang chủ',
    keepBrowsing: 'Đặt chuyến tiếp theo',
    dateTbc: 'Ngày sẽ xác nhận',
    whatsNext: 'Tiếp theo',
    loading: 'Đang tải đơn…',
    errorTitle: 'Không tìm thấy đơn này.',
    errorBack: 'Về trang chủ',
  },
  login: {
    title: 'Đăng nhập',
    sub: 'Đăng nhập để xem vé và lịch sử đặt.',
    email: 'Email',
    password: 'Mật khẩu',
    submit: 'Đăng nhập',
    submitting: 'Đang đăng nhập…',
    errorMissing: 'Vui lòng nhập email và mật khẩu.',
    forgotLink: 'Quên mật khẩu?',
    guestPrompt: 'Chưa có tài khoản?',
    guestCta: 'Tiếp tục với tư cách khách',
  },
  forgot: {
    title: 'Đặt lại mật khẩu',
    sub: 'Nhập email — chúng tôi sẽ gửi liên kết đặt lại.',
    email: 'Email',
    submit: 'Gửi liên kết',
    submitting: 'Đang gửi…',
    sentTitle: 'Hãy kiểm tra hộp thư',
    sentBody: (email) => `Nếu ${email} có trong hệ thống, liên kết đặt lại đang được gửi.`,
    errorMissing: 'Vui lòng nhập email.',
    back: 'Quay lại đăng nhập',
  },
  reset: {
    title: 'Đặt mật khẩu mới',
    sub: 'Nhập và xác nhận mật khẩu mới.',
    newPassword: 'Mật khẩu mới',
    confirmPassword: 'Xác nhận mật khẩu',
    submit: 'Cập nhật',
    submitting: 'Đang lưu…',
    doneTitle: 'Đã cập nhật mật khẩu',
    doneBody: 'Bạn có thể đăng nhập với mật khẩu mới.',
    invalidTitle: 'Liên kết không hợp lệ hoặc đã hết hạn',
    invalidBody: 'Vui lòng yêu cầu liên kết mới để tiếp tục.',
    requestNew: 'Yêu cầu liên kết mới',
    signIn: 'Đăng nhập',
    back: 'Quay lại đăng nhập',
    errorMissing: 'Vui lòng nhập đủ hai mật khẩu.',
    errorMismatch: 'Mật khẩu không khớp.',
    errorShort: 'Mật khẩu cần tối thiểu 8 ký tự.',
    errorNoToken: 'Thiếu mã đặt lại.',
  },
  profile: {
    firstName: 'Tên',
    lastName: 'Họ',
    email: 'Email',
    phone: 'Số điện thoại',
    avatarUrl: 'Ảnh đại diện',
  },
  footer: {
    tagline: 'Fast Track tại mọi sân bay Việt Nam — vận hành bởi Vihat.',
    exploreTitle: 'Khám phá',
    fastTrack: 'Fast Track',
    coverage: 'Mạng lưới sân bay',
    howItWorks: 'Quy trình',
    supportTitle: 'Hỗ trợ',
    helpCentre: 'Trung tâm hỗ trợ',
    contactUs: 'Liên hệ',
    faq: 'Câu hỏi thường gặp',
    aboutUs: 'Về chúng tôi',
    agentLogin: 'Đăng nhập đại lý',
    rights: 'Tất cả các quyền được bảo lưu.',
    hotline: 'Hotline 24/7',
    legal: 'Pháp lý',
  },
  legal: { terms: 'Điều khoản dịch vụ', privacy: 'Chính sách bảo mật' },
  agent: {
    brand: 'Voyager Agent',
    brandSub: 'Trang vận hành',
    searchPlaceholder: 'Tìm theo đơn, khách, mã vé…',
    seeAllTransactions: 'Xem tất cả đơn',
    totalRevenue: 'Tổng doanh thu',
    nav: {
      dashboard: 'Tổng quan',
      bookings: 'Đơn đặt',
      bookingsAll: 'Tất cả đơn',
      bookingsFastTrack: 'Fast Track',
      bookingsHotel: 'Khách sạn',
      bookingsPickup: 'Đưa đón',
      bookingsTour: 'Tour',
      bookingsPending: 'Chờ thanh toán',
      bookingsPaid: 'Đã thanh toán',
      inventory: 'Tồn kho',
      pricing: 'Giá bán',
      airports: 'Sân bay',
      customers: 'Khách hàng',
      destinations: 'Sân bay',
      products: 'Sản phẩm',
      reports: 'Báo cáo',
      support: 'Hỗ trợ',
      settings: 'Cài đặt',
      logOut: 'Đăng xuất',
    },
    inventory: {
      title: 'Tồn kho',
      sub: 'Sức chứa Fast Track theo ngày cho từng làn.',
      capacity: 'Sức chứa',
      sold: 'Đã bán',
      remaining: 'Còn',
      saveCap: 'Lưu',
      saved: 'Đã lưu',
      saveError: 'Lưu thất bại',
      dateRange: 'Khoảng ngày',
      shiftDays: (n) => (n > 0 ? `+${n} ngày` : `${n} ngày`),
      lane: 'Làn',
      empty: 'Không có dữ liệu cho khoảng này',
    },
    pricing: {
      title: 'Giá bán',
      sub: 'Giá USD theo bảng Vihat 2024. Chỉnh FIT/GIT và sức chứa ngày tại đây.',
      laneCol: 'Làn',
      airportCol: 'Sân bay',
      segmentCol: 'Loại chuyến',
      directionCol: 'Chiều',
      fitCol: 'FIT (USD)',
      gitCol: 'GIT (USD)',
      capCol: 'Sức chứa/ngày',
      saveCta: 'Lưu thay đổi',
      savedNote: (n) => `Đã cập nhật ${n} làn`,
    },
    dashboard: {
      title: 'Tổng quan',
      sub: 'Tóm tắt đơn và doanh thu.',
      todayLabel: 'Hôm nay',
      weekLabel: '7 ngày qua',
      monthLabel: '30 ngày qua',
      paidBookings: 'Đơn đã thanh toán',
      totalRevenue: 'Doanh thu',
      revenueSub: 'Chỉ tính đơn đã thanh toán',
      bySalesAirport: 'Doanh số theo sân bay',
      airportLabel: 'Sân bay',
      salesLabel: 'Đã bán',
      revenueLabel: 'Doanh thu (USD)',
    },
    bookings: {
      title: 'Tất cả đơn',
      newBooking: 'Đơn mới',
      import: 'Nhập',
      export: 'Xuất',
      empty: 'Chưa có đơn nào',
      emptyHint: 'Đơn của khách sẽ hiển thị ở đây sau khi hoàn tất thanh toán.',
      loading: 'Đang tải đơn…',
      loadError: 'Không tải được đơn',
      pageSize: 'Mỗi trang',
      prev: 'Trước',
      next: 'Sau',
      count: (n) => `${n} đơn`,
      filterStatus: {
        all: 'Tất cả',
        pending: 'Chờ xử lý',
        confirmed: 'Đã xác nhận',
        fulfilled: 'Đã thực hiện',
        cancelled: 'Đã huỷ',
        closed: 'Đã đóng',
      },
      filterService: {
        all: 'Tất cả dịch vụ',
        fastTrack: 'Fast Track',
        pickup: 'Đưa đón',
        hotel: 'Khách sạn',
        tour: 'Tour',
      },
      paymentStatus: {
        unpaid: 'Chưa thanh toán',
        paid: 'Đã thanh toán',
        pending_transfer: 'Chờ chuyển khoản',
        refunded: 'Đã hoàn tiền',
        partial_refund: 'Hoàn một phần',
      },
      col: {
        booking: 'Đơn',
        status: 'Trạng thái',
        customer: 'Khách',
        service: 'Dịch vụ',
        travel: 'Lịch bay',
        pax: 'Số khách',
        total: 'Tổng',
        payment: 'Thanh toán',
        created: 'Tạo lúc',
      },
      detail: {
        heading: 'Chi tiết đơn',
        close: 'Đóng',
        contact: 'Liên hệ',
        name: 'Họ tên',
        phone: 'Điện thoại',
        items: 'Dịch vụ',
        flight: 'Chuyến bay',
        travelDate: 'Ngày bay',
        travelTime: 'Giờ bay',
        adults: 'Người lớn',
        children: 'Trẻ em',
        qty: 'SL',
        unitPrice: 'Đơn giá',
        notes: 'Ghi chú',
        noNotes: 'Không có ghi chú.',
        totals: 'Tổng',
        subtotal: 'Tạm tính',
        discount: 'Giảm giá',
        total: 'Tổng',
        payment: 'Thanh toán',
        method: 'Phương thức',
        paymentStatus: 'Trạng thái',
        createdAt: 'Tạo lúc',
        updatedAt: 'Cập nhật',
      },
    },
  },
}

export const dictionary: Record<Locale, Dictionary> = { en, vi }
