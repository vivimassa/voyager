/**
 * Voyager destinations — v0 seed data (client-side).
 * Prices in VND. `nameVi` / `descriptionVi` render when locale === 'vi'.
 */

export type ServiceKey = 'pickup' | 'fastTrack' | 'hotels' | 'tours' | 'luggageConcierge'

export type DestinationService = {
  icon: string
  label: string
  labelVi?: string
  priceVnd: number
}

export type Destination = {
  slug: string
  name: string
  nameVi?: string
  airportCode: 'HAN' | 'SGN' | 'DAD' | 'CXR' | 'PQC'
  airportName: string
  airportNameVi?: string
  description: string
  descriptionVi?: string
  headlinePriceVnd: number
  stars: 3 | 4 | 5
  photo: string
  /**
   * Secondary gallery photos (expected length: 4). Each must be a distinct
   * Unsplash URL showing a different aspect of the destination. Used as the
   * side tiles on the destination detail header gallery; `photo` remains the
   * hero. Optional — consumers fall back to `photo` when absent.
   */
  photos?: string[]
  services: Record<ServiceKey, DestinationService>
}

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

export const DESTINATIONS: Destination[] = [
  {
    slug: 'ha-long',
    name: 'Ha Long',
    nameVi: 'Hạ Long',
    airportCode: 'HAN',
    airportName: 'Noi Bai, Hanoi',
    airportNameVi: 'Nội Bài, Hà Nội',
    description:
      "Ha Long Bay's 1,600 limestone islands rise from emerald waters like a scene from another world. Cruise through floating villages, kayak into hidden caves, wake up to mist-draped karsts.",
    descriptionVi:
      '1.600 đảo đá vôi của Vịnh Hạ Long nhô lên giữa làn nước ngọc bích như trong cổ tích. Du thuyền qua làng chài nổi, chèo kayak vào hang động, thức dậy giữa núi đá sương mù.',
    headlinePriceVnd: 1_850_000,
    stars: 5,
    photo: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1573270689103-d7a4e42b609a'), // Ha Long bay aerial
      U('1509030450996-dd1a26dda07a'), // limestone karst close-up
      U('1557750255-c76072a7fdf0'),    // junk boat on emerald water
      U('1526481280695-3c469368290f'), // cave interior
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'HAN → Ha Long pickup',   labelVi: 'HAN → Hạ Long đón sân bay', priceVnd: 950_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at HAN',      labelVi: 'Fast-track tại HAN',        priceVnd: 380_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Ha Long hotels',         labelVi: 'Khách sạn Hạ Long',          priceVnd: 1_200_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Day tours',              labelVi: 'Tour trong ngày',           priceVnd: 1_850_000 },
      luggageConcierge: { icon: '\u{1F9F3}', label: 'Luggage concierge',  labelVi: 'Hành lý tận nơi',      priceVnd: 650_000 },
    },
  },
  {
    slug: 'sapa',
    name: 'Sapa',
    nameVi: 'Sa Pa',
    airportCode: 'HAN',
    airportName: 'Noi Bai, Hanoi',
    airportNameVi: 'Nội Bài, Hà Nội',
    description:
      'Emerald rice terraces spiral down the slopes of Fansipan, threaded with villages where the Hmong and Dao have lived for centuries. Trek through ancestor paths, stay with a homestay family.',
    descriptionVi:
      'Ruộng bậc thang xanh ngọc uốn quanh sườn Fansipan, xen kẽ làng bản người Mông và Dao đã sinh sống hàng thế kỷ. Trekking theo lối mòn, ở cùng gia đình homestay.',
    headlinePriceVnd: 1_420_000,
    stars: 4,
    photo: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1528181304800-259b08848526'), // rice terraces
      U('1583417267826-aebc4d1c8a59'), // Hmong people / market
      U('1583337130417-3346a1be7dee'), // Fansipan peak / mountain
      U('1528127269322-539801943592'), // village valley
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'HAN → Sapa transfer',    labelVi: 'HAN → Sa Pa đưa đón',        priceVnd: 1_400_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at HAN',      labelVi: 'Fast-track tại HAN',         priceVnd: 380_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Sapa homestays',         labelVi: 'Homestay Sa Pa',             priceVnd: 620_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Trekking tours',         labelVi: 'Tour trekking',              priceVnd: 1_420_000 },
      luggageConcierge: { icon: '\u{1F9F3}', label: 'Luggage concierge',  labelVi: 'Hành lý tận nơi',      priceVnd: 650_000 },
    },
  },
  {
    slug: 'ninh-binh',
    name: 'Ninh Binh',
    nameVi: 'Ninh Bình',
    airportCode: 'HAN',
    airportName: 'Noi Bai, Hanoi',
    airportNameVi: 'Nội Bài, Hà Nội',
    description:
      'Inland karst rice-paddies, river caves at Trang An, and the ancient capital of Hoa Lu — often called "Ha Long on land." Glide by sampan through limestone tunnels and temple gates.',
    descriptionVi:
      'Núi đá vôi giữa ruộng lúa, hang động sông tại Tràng An, cố đô Hoa Lư — được mệnh danh "Hạ Long trên cạn". Đi thuyền nan qua hang đá và cổng đền cổ.',
    headlinePriceVnd: 890_000,
    stars: 4,
    photo: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1526481280695-3c469368290f'), // Tam Coc sampan
      U('1509030450996-dd1a26dda07a'), // Trang An cave waterway
      U('1599708153386-62bf3b950662'), // Hoa Lu temple
      U('1555921015-5532091f6026'),    // rice paddies
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'HAN → Ninh Binh pickup', labelVi: 'HAN → Ninh Bình đón',        priceVnd: 780_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at HAN',      labelVi: 'Fast-track tại HAN',         priceVnd: 380_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Tam Coc stays',          labelVi: 'Chỗ nghỉ Tam Cốc',           priceVnd: 720_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Sampan & temple tours',  labelVi: 'Tour thuyền & đền',          priceVnd: 890_000 },
      luggageConcierge: { icon: '\u{1F9F3}', label: 'Luggage concierge',  labelVi: 'Hành lý tận nơi',      priceVnd: 650_000 },
    },
  },
  {
    slug: 'hue',
    name: 'Hue',
    nameVi: 'Huế',
    airportCode: 'DAD',
    airportName: 'Da Nang Intl.',
    airportNameVi: 'Đà Nẵng Quốc tế',
    description:
      'Imperial capital of the Nguyen dynasty, where the Citadel rises beside the Perfume River. Royal tombs, dragon boats, conical-hat markets, and cuisine once served only to emperors.',
    descriptionVi:
      'Cố đô triều Nguyễn, Kinh thành uy nghi bên sông Hương. Lăng tẩm hoàng gia, thuyền rồng, chợ nón lá và ẩm thực từng chỉ dành cho vua chúa.',
    headlinePriceVnd: 1_060_000,
    stars: 5,
    photo: 'https://images.unsplash.com/photo-1599708153386-62bf3b950662?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1574236170901-b3b7f8c32d66'), // citadel gate
      U('1540541338287-41700207dee6'), // royal tomb
      U('1557750255-c76072a7fdf0'),    // perfume river / boat
      U('1559847844-5315695dadae'),    // imperial cuisine
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'DAD → Hue pickup',       labelVi: 'DAD → Huế đón sân bay',      priceVnd: 780_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at DAD',      labelVi: 'Fast-track tại DAD',         priceVnd: 340_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Riverside hotels',       labelVi: 'Khách sạn bên sông',         priceVnd: 880_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Citadel & tomb tours',   labelVi: 'Tour Kinh thành & lăng',     priceVnd: 1_060_000 },
      luggageConcierge: { icon: '\u{1F9F3}', label: 'Luggage concierge',  labelVi: 'Hành lý tận nơi',      priceVnd: 650_000 },
    },
  },
  {
    slug: 'hoi-an',
    name: 'Hoi An',
    nameVi: 'Hội An',
    airportCode: 'DAD',
    airportName: 'Da Nang Intl.',
    airportNameVi: 'Đà Nẵng Quốc tế',
    description:
      'A UNESCO old town where yellow-washed merchant houses meet lantern-lit streets and the scent of lemongrass drifts from every doorway. Sail at dusk, tailor a silk ao dai by morning.',
    descriptionVi:
      'Phố cổ UNESCO với nhà cổ tường vàng, phố lồng đèn và hương sả thoang thoảng. Thả đèn hoa đăng lúc hoàng hôn, may áo dài lụa sớm mai.',
    headlinePriceVnd: 1_100_000,
    stars: 5,
    photo: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1540261985-72b961e16b94'), // lantern street at night
      U('1581375074612-d1fd0e661aeb'), // tailor shop / fabric
      U('1528181304800-259b08848526'), // river boats
      U('1583417319070-4a69db38a482'), // yellow walls
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'DAD → Hoi An pickup',    labelVi: 'DAD → Hội An đón',           priceVnd: 520_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at DAD',      labelVi: 'Fast-track tại DAD',         priceVnd: 340_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Old Town hotels',        labelVi: 'Khách sạn phố cổ',           priceVnd: 980_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Lantern & food tours',   labelVi: 'Tour lồng đèn & ẩm thực',    priceVnd: 1_100_000 },
      luggageConcierge: { icon: '\u{1F9F3}', label: 'Luggage concierge',  labelVi: 'Hành lý tận nơi',      priceVnd: 650_000 },
    },
  },
  {
    slug: 'da-nang',
    name: 'Da Nang',
    nameVi: 'Đà Nẵng',
    airportCode: 'DAD',
    airportName: 'Da Nang Intl.',
    airportNameVi: 'Đà Nẵng Quốc tế',
    description:
      "Central Vietnam's beach metropolis — golden sand crescents, the Marble Mountains, the Dragon Bridge breathing fire on weekends, and Ba Na Hills' famed Golden Bridge above the clouds.",
    descriptionVi:
      'Thành phố biển miền Trung — bãi cát vàng cong, Ngũ Hành Sơn, Cầu Rồng phun lửa cuối tuần, Bà Nà Hills với Cầu Vàng nổi tiếng trên mây.',
    headlinePriceVnd: 940_000,
    stars: 4,
    photo: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1559592413-7cec4d0cae2b'),   // Dragon Bridge / cityscape
      U('1528909514045-2fa4ac7a08ba'), // My Khe beach
      U('1509030450996-dd1a26dda07a'), // Marble Mountains
      U('1570696516188-ade861b84a49'), // Golden Bridge / Ba Na Hills
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'DAD → city pickup',      labelVi: 'DAD → thành phố đón',        priceVnd: 320_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at DAD',      labelVi: 'Fast-track tại DAD',         priceVnd: 340_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Beachfront hotels',      labelVi: 'Khách sạn view biển',        priceVnd: 860_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Ba Na & Marble tours',   labelVi: 'Tour Bà Nà & Ngũ Hành Sơn',  priceVnd: 940_000 },
      luggageConcierge: { icon: '\u{1F9F3}', label: 'Luggage concierge',  labelVi: 'Hành lý tận nơi',      priceVnd: 650_000 },
    },
  },
  {
    slug: 'mekong',
    name: 'Mekong',
    nameVi: 'Mê Kông',
    airportCode: 'SGN',
    airportName: 'Tan Son Nhat, HCMC',
    airportNameVi: 'Tân Sơn Nhất, TP.HCM',
    description:
      'Glide past floating markets and fruit orchards where the nine dragons of the Mekong reach the sea. Wake before dawn for the boats at Cai Rang, share tea with a coconut farmer.',
    descriptionVi:
      'Lướt qua chợ nổi và vườn trái cây nơi chín rồng sông Mê Kông đổ ra biển. Dậy sớm ngắm chợ Cái Răng, uống trà cùng nhà vườn dừa.',
    headlinePriceVnd: 980_000,
    stars: 4,
    photo: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1528181304800-259b08848526'), // floating market boats
      U('1526481280695-3c469368290f'), // coconut / narrow canal boat
      U('1504457047772-27faf1c00561'), // fruit orchard / tropical
      U('1528909514045-2fa4ac7a08ba'), // river sunset
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'SGN → Ben Tre pickup',   labelVi: 'SGN → Bến Tre đón',          priceVnd: 820_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at SGN',      labelVi: 'Fast-track tại SGN',         priceVnd: 420_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Riverside stays',        labelVi: 'Chỗ nghỉ bên sông',          priceVnd: 780_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Delta day cruises',      labelVi: 'Tour du thuyền đồng bằng',   priceVnd: 980_000 },
      luggageConcierge: { icon: '\u{1F9F3}', label: 'Luggage concierge',  labelVi: 'Hành lý tận nơi',      priceVnd: 650_000 },
    },
  },
  {
    slug: 'nha-trang',
    name: 'Nha Trang',
    nameVi: 'Nha Trang',
    airportCode: 'CXR',
    airportName: 'Cam Ranh Intl.',
    airportNameVi: 'Cam Ranh Quốc tế',
    description:
      'A six-kilometre palm-lined bay with nine offshore islands. Dive tropical reefs, soak in mud baths, feast on lobster at the night market, and end the day at a cliffside sky-bar.',
    descriptionVi:
      'Vịnh biển 6 km dọc hàng dừa, chín hòn đảo ngoài khơi. Lặn rạn san hô nhiệt đới, tắm bùn khoáng, thưởng thức tôm hùm chợ đêm, kết thúc trên sky-bar ven vách núi.',
    headlinePriceVnd: 1_180_000,
    stars: 4,
    photo: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1507525428034-b723cf961d3e'), // bay aerial
      U('1519046904884-53103b34b206'), // palm beach
      U('1544551763-46a013bb70d5'),    // coral reef
      U('1504457047772-27faf1c00561'), // island / Vinpearl style
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'CXR → beach pickup',     labelVi: 'CXR → bãi biển đón',         priceVnd: 380_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at CXR',      labelVi: 'Fast-track tại CXR',         priceVnd: 300_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Oceanfront hotels',      labelVi: 'Khách sạn mặt biển',         priceVnd: 940_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Island-hop & dive tours', labelVi: 'Tour đảo & lặn biển',       priceVnd: 1_180_000 },
      luggageConcierge: { icon: '\u{1F9F3}', label: 'Luggage concierge',  labelVi: 'Hành lý tận nơi',      priceVnd: 650_000 },
    },
  },
  {
    slug: 'da-lat',
    name: 'Da Lat',
    nameVi: 'Đà Lạt',
    airportCode: 'CXR',
    airportName: 'Cam Ranh Intl.',
    airportNameVi: 'Cam Ranh Quốc tế',
    description:
      'Pine-forested highland city at 1,500m, cool year-round. French villas, coffee plantations, strawberry farms, and lake-side cafés. Vietnam’s honeymoon capital since the 1920s.',
    descriptionVi:
      'Thành phố cao nguyên thông 1.500m, mát quanh năm. Biệt thự Pháp, nông trại cà phê, vườn dâu, quán cà phê bên hồ. Thủ phủ trăng mật từ thập niên 1920.',
    headlinePriceVnd: 1_020_000,
    stars: 4,
    photo: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1441974231531-c6227db76b6e'), // pine forest
      U('1470549638415-0a0755be0619'), // flower farm / field
      U('1564501049412-61c2a3083791'), // French villa / architecture
      U('1506905925346-21bda4d32df4'), // valley / misty highland
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'CXR → Da Lat transfer',  labelVi: 'CXR → Đà Lạt đưa đón',       priceVnd: 1_200_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at CXR',      labelVi: 'Fast-track tại CXR',         priceVnd: 300_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Pine-view hotels',       labelVi: 'Khách sạn view rừng thông',  priceVnd: 680_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Highland & coffee tours', labelVi: 'Tour cao nguyên & cà phê',  priceVnd: 1_020_000 },
      luggageConcierge: { icon: '\u{1F9F3}', label: 'Luggage concierge',  labelVi: 'Hành lý tận nơi',      priceVnd: 650_000 },
    },
  },
  {
    slug: 'phu-quoc',
    name: 'Phu Quoc',
    nameVi: 'Phú Quốc',
    airportCode: 'PQC',
    airportName: 'Phu Quoc Intl.',
    airportNameVi: 'Phú Quốc Quốc tế',
    description:
      "Vietnam's southernmost island, ringed by white-sand beaches and pepper plantations. Snorkel over technicolor coral at An Thoi, watch the sunset from a longtail boat.",
    descriptionVi:
      'Đảo cực Nam Việt Nam, bao quanh là bãi cát trắng và vườn tiêu. Lặn ngắm san hô rực rỡ ở An Thới, ngắm hoàng hôn từ thuyền buồm.',
    headlinePriceVnd: 2_200_000,
    stars: 5,
    photo: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1519046904884-53103b34b206'), // white-sand beach
      U('1533900298318-6b8da08a523e'), // pepper farm / plantation
      U('1570696516188-ade861b84a49'), // cable car over sea
      U('1507525428034-b723cf961d3e'), // sunset longtail boat
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'PQC → beach resorts',    labelVi: 'PQC → resort biển',          priceVnd: 450_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at PQC',      labelVi: 'Fast-track tại PQC',         priceVnd: 280_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Beachfront resorts',     labelVi: 'Resort mặt biển',            priceVnd: 1_800_000 },
      tours:     { icon: '\u{1F5FA}', label: 'Island-hop boat tours',  labelVi: 'Tour thuyền vòng đảo',       priceVnd: 1_400_000 },
      luggageConcierge: { icon: '\u{1F9F3}', label: 'Luggage concierge',  labelVi: 'Hành lý tận nơi',      priceVnd: 650_000 },
    },
  },
]

export const DESTINATION_SLUGS = DESTINATIONS.map((d) => d.slug)

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug)
}

export const SERVICE_ORDER: ServiceKey[] = ['pickup', 'fastTrack', 'hotels', 'tours']
/** Full service order including the optional luggage-concierge add-on used by bundles / journey map. */
export const SERVICE_ORDER_FULL: ServiceKey[] = ['luggageConcierge', 'pickup', 'fastTrack', 'hotels', 'tours']
