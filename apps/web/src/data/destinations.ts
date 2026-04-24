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
      'Vịnh Hạ Long với hơn 1.600 đảo đá vôi nhô lên giữa làn nước xanh ngọc tạo nên khung cảnh như tranh. Du thuyền qua làng chài nổi, chèo kayak vào hang kín và đón bình minh giữa núi đá phủ sương.',
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
      pickup:    { icon: '\u{1F697}', label: 'HAN → Ha Long pickup',   labelVi: 'Đón sân bay HAN → Hạ Long', priceVnd: 950_000 },
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
      'Ruộng bậc thang xanh mướt ôm theo sườn Fansipan, xen giữa là những bản làng của người Mông và Dao. Bạn có thể trekking theo lối mòn bản địa và nghỉ tại homestay cùng người dân địa phương.',
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
      pickup:    { icon: '\u{1F697}', label: 'HAN → Sapa transfer',    labelVi: 'Đưa đón HAN → Sa Pa',        priceVnd: 1_400_000 },
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
      'Ninh Bình nổi bật với núi đá vôi giữa đồng lúa, hang sông Tràng An và cố đô Hoa Lư - thường được gọi là "Hạ Long trên cạn". Ngồi thuyền nan len qua hang đá và cổng đền cổ là trải nghiệm không thể bỏ lỡ.',
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
      pickup:    { icon: '\u{1F697}', label: 'HAN → Ninh Binh pickup', labelVi: 'Đón sân bay HAN → Ninh Bình',        priceVnd: 780_000 },
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
      'Huế là cố đô của triều Nguyễn với Kinh thành soi bóng bên sông Hương. Từ lăng tẩm hoàng gia, thuyền rồng đến ẩm thực cung đình, mọi trải nghiệm đều đậm chất di sản.',
    headlinePriceVnd: 1_060_000,
    stars: 5,
    photo: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2400&q=80',
    photos: [
      U('1528909514045-2fa4ac7a08ba'),
      U('1528127269322-539801943592'),
      U('1557750255-c76072a7fdf0'),
      U('1509030450996-dd1a26dda07a'),
    ],
    services: {
      pickup:    { icon: '\u{1F697}', label: 'DAD → Hue pickup',       labelVi: 'Đón sân bay DAD → Huế',      priceVnd: 780_000 },
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
      'Phố cổ Hội An mang vẻ đẹp đặc trưng với tường vàng, đèn lồng rực tối và nhịp sống chậm rãi. Chiều thả hoa đăng trên sông, sáng ghé tiệm may áo dài là lịch trình được nhiều du khách yêu thích.',
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
      pickup:    { icon: '\u{1F697}', label: 'DAD → Hoi An pickup',    labelVi: 'Đón sân bay DAD → Hội An',           priceVnd: 520_000 },
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
      'Đà Nẵng là thành phố biển năng động của miền Trung với bãi cát dài, Ngũ Hành Sơn và Cầu Rồng phun lửa cuối tuần. Bạn cũng có thể lên Bà Nà Hills để check-in Cầu Vàng giữa mây trời.',
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
      pickup:    { icon: '\u{1F697}', label: 'DAD → city pickup',      labelVi: 'Đón sân bay DAD → trung tâm thành phố',        priceVnd: 320_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at DAD',      labelVi: 'Fast-track tại DAD',         priceVnd: 340_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Beachfront hotels',      labelVi: 'Khách sạn sát biển',        priceVnd: 860_000 },
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
      'Miền Tây Mê Kông cuốn hút với chợ nổi, vườn trái cây và mạng lưới sông nước hiền hòa. Dậy sớm đi chợ Cái Răng, ghé nhà vườn uống trà là trải nghiệm rất đặc trưng của vùng đồng bằng.',
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
      pickup:    { icon: '\u{1F697}', label: 'SGN → Ben Tre pickup',   labelVi: 'Đón sân bay SGN → Bến Tre',          priceVnd: 820_000 },
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
      'Nha Trang sở hữu vịnh biển dài hơn 6 km với hàng dừa và các đảo ngoài khơi. Bạn có thể lặn ngắm san hô, tắm bùn khoáng, ăn hải sản chợ đêm và kết thúc ngày bằng một quán bar view biển.',
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
      pickup:    { icon: '\u{1F697}', label: 'CXR → beach pickup',     labelVi: 'Đón sân bay CXR → khu biển',         priceVnd: 380_000 },
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
      'Đà Lạt nằm trên cao nguyên 1.500m nên khí hậu mát mẻ quanh năm. Thành phố nổi tiếng với rừng thông, biệt thự Pháp, nông trại cà phê và những quán cà phê ven hồ lãng mạn.',
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
      pickup:    { icon: '\u{1F697}', label: 'CXR → Da Lat transfer',  labelVi: 'Đưa đón CXR → Đà Lạt',       priceVnd: 1_200_000 },
      fastTrack: { icon: '⚡',    label: 'Fast-track at CXR',      labelVi: 'Fast-track tại CXR',         priceVnd: 300_000 },
      hotels:    { icon: '\u{1F3E8}', label: 'Pine-view hotels',       labelVi: 'Khách sạn nhìn ra rừng thông',  priceVnd: 680_000 },
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
      'Phú Quốc là hòn đảo nghỉ dưỡng nổi tiếng ở phía Nam với bãi cát trắng, biển xanh và những vườn tiêu đặc trưng. Bạn có thể lặn ngắm san hô ở An Thới và ngắm hoàng hôn trên biển vào cuối ngày.',
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
      pickup:    { icon: '\u{1F697}', label: 'PQC → beach resorts',    labelVi: 'Đón sân bay PQC → resort biển',          priceVnd: 450_000 },
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
