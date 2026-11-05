export interface MockRatePlan {
  id: string;
  code: string;
  name: string;
  roomCategoryId: string;
  planType: string;
  priceMultiplier: number;
  multiplier?: number; // Aliased for components expecting multiplier
  cancelPolicyDays: number;
  breakfastIncluded: boolean;
  isActive: boolean;
  description?: string;
  cancellationPolicy?: string;
  mealPlan?: string;
}

export interface MockRoomCategory {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  basePrice: number;
  maxOccupancy: number;
  capacity?: number;
  sizeSqm: number;
  areaSqM?: number;
  bedConfiguration: string;
  bedConfig?: string;
  amenities: string[];
  images: string[];
  image?: string;
  imageUrl?: string;
  gallery?: string[];
  viewType?: "OCEAN" | "GARDEN" | "CITY";
  isActive: boolean;
  ratePlans: MockRatePlan[];
}

export const MOCK_ROOM_CATEGORIES: MockRoomCategory[] = [
  {
    id: "cat-executive-suite",
    slug: "executive-bay-suite",
    name: "Executive Bay Suite",
    type: "EXECUTIVE_SUITE",
    description:
      "Không gian sang trọng bậc nhất với phòng khách riêng biệt, tầm nhìn 180 độ ra đại dương và đặc quyền dịch vụ Executive Club Lounge 24/7.",
    basePrice: 4200000,
    maxOccupancy: 3,
    capacity: 3,
    sizeSqm: 75,
    areaSqM: 75,
    bedConfiguration: "1 Super King Bed",
    bedConfig: "1 Super King Bed",
    viewType: "OCEAN",
    image: "/images/aurora/executive-suite.jpg",
    imageUrl: "/images/aurora/executive-suite.jpg",
    gallery: [
      "/images/aurora/executive-suite.jpg",
      "/images/aurora/hero-03.jpg",
      "/images/aurora/hero-01.jpg",
    ],
    images: [
      "/images/aurora/executive-suite.jpg",
      "/images/aurora/hero-03.jpg",
      "/images/aurora/hero-01.jpg",
    ],
    amenities: [
      "Panorama Ocean View",
      "Living Room",
      "Club Lounge Access",
      "Jacuzzi",
      "24/7 Butler",
      "Espresso Machine",
      "Marble Bathroom",
      "High-speed Wi-Fi",
    ],
    isActive: true,
    ratePlans: [
      {
        id: "rp-flex-executive",
        code: "FLEX-BFAST-EXECUTIVE",
        name: "Flexible Rate with Gourmet Breakfast",
        roomCategoryId: "cat-executive-suite",
        planType: "FLEXIBLE_BREAKFAST",
        priceMultiplier: 1.0,
        multiplier: 1.0,
        cancelPolicyDays: 3,
        breakfastIncluded: true,
        isActive: true,
        description: "Bao gồm bữa sáng buffet cao cấp, miễn phí hủy trước 3 ngày",
        cancellationPolicy: "Miễn phí hủy trước 3 ngày nhận phòng",
        mealPlan: "Bữa sáng buffet cao cấp & Club Lounge",
      },
      {
        id: "rp-saver-executive",
        code: "NON-REF-EXECUTIVE",
        name: "Non-Refundable Saver",
        roomCategoryId: "cat-executive-suite",
        planType: "NON_REFUNDABLE",
        priceMultiplier: 0.85,
        multiplier: 0.85,
        cancelPolicyDays: 0,
        breakfastIncluded: false,
        isActive: true,
        description: "Tiết kiệm 15%, thanh toán ngay, không hoàn hủy",
        cancellationPolicy: "Không hoàn hủy",
        mealPlan: "Không bao gồm bữa sáng",
      },
      {
        id: "rp-stay-executive",
        code: "EXT-STAY-EXECUTIVE",
        name: "Extended Stay Special (3+ Nights)",
        roomCategoryId: "cat-executive-suite",
        planType: "EXTENDED_STAY_PROMO",
        priceMultiplier: 0.80,
        multiplier: 0.80,
        cancelPolicyDays: 7,
        breakfastIncluded: true,
        isActive: true,
        description: "Ưu đãi đặt dài ngày giảm 20%, bao gồm bữa sáng",
        cancellationPolicy: "Miễn phí hủy trước 7 ngày",
        mealPlan: "Bữa sáng buffet & Club Lounge",
      },
    ],
  },
  {
    id: "cat-deluxe-king",
    slug: "deluxe-ocean-king",
    name: "Deluxe Ocean King Room",
    type: "DELUXE_KING",
    description:
      "Phòng Deluxe cao cấp hướng biển với giường King sang trọng, ban công riêng biệt ngắm bình minh trên vịnh Đà Nẵng.",
    basePrice: 2500000,
    maxOccupancy: 2,
    capacity: 2,
    sizeSqm: 45,
    areaSqM: 45,
    bedConfiguration: "1 King Bed",
    bedConfig: "1 King Bed",
    viewType: "OCEAN",
    image: "/images/aurora/deluxe-king.jpg",
    imageUrl: "/images/aurora/deluxe-king.jpg",
    gallery: [
      "/images/aurora/deluxe-king.jpg",
      "/images/aurora/hero-01.jpg",
      "/images/aurora/hero-02.jpg",
    ],
    images: [
      "/images/aurora/deluxe-king.jpg",
      "/images/aurora/hero-01.jpg",
      "/images/aurora/hero-02.jpg",
    ],
    amenities: [
      "Ocean View",
      "Private Balcony",
      "High-speed Wi-Fi",
      "Espresso Machine",
      "Marble Bathroom",
      "Smart TV 55 inch",
      "Bose Sound System",
    ],
    isActive: true,
    ratePlans: [
      {
        id: "rp-flex-deluxe-king",
        code: "FLEX-BFAST-DELUXE-KING",
        name: "Flexible Rate with Gourmet Breakfast",
        roomCategoryId: "cat-deluxe-king",
        planType: "FLEXIBLE_BREAKFAST",
        priceMultiplier: 1.0,
        multiplier: 1.0,
        cancelPolicyDays: 3,
        breakfastIncluded: true,
        isActive: true,
        description: "Bao gồm bữa sáng buffet Á - Âu cao cấp mỗi sáng",
        cancellationPolicy: "Miễn phí hủy trước 3 ngày nhận phòng",
        mealPlan: "Bữa sáng buffet cao cấp",
      },
      {
        id: "rp-saver-deluxe-king",
        code: "NON-REF-DELUXE-KING",
        name: "Non-Refundable Saver",
        roomCategoryId: "cat-deluxe-king",
        planType: "NON_REFUNDABLE",
        priceMultiplier: 0.85,
        multiplier: 0.85,
        cancelPolicyDays: 0,
        breakfastIncluded: false,
        isActive: true,
        description: "Tiết kiệm 15% khi thanh toán ngay, không hoàn hủy",
        cancellationPolicy: "Không hoàn hủy",
        mealPlan: "Không bao gồm bữa sáng",
      },
      {
        id: "rp-stay-deluxe-king",
        code: "EXT-STAY-DELUXE-KING",
        name: "Extended Stay Special (3+ Nights)",
        roomCategoryId: "cat-deluxe-king",
        planType: "EXTENDED_STAY_PROMO",
        priceMultiplier: 0.80,
        multiplier: 0.80,
        cancelPolicyDays: 7,
        breakfastIncluded: true,
        isActive: true,
        description: "Giảm 20% cho kỳ nghỉ từ 3 đêm trở lên",
        cancellationPolicy: "Miễn phí hủy trước 7 ngày",
        mealPlan: "Bữa sáng buffet cao cấp",
      },
    ],
  },
  {
    id: "cat-deluxe-twin",
    slug: "deluxe-twin",
    name: "Deluxe Twin City & Garden",
    type: "DELUXE_TWIN",
    description:
      "Phòng 2 giường đơn trang nhã 38m² với nội thất gỗ sồi mộc mạc, ban công thoáng đãng ngắm trọn khu vườn nhiệt đới và thành phố.",
    basePrice: 2700000,
    maxOccupancy: 2,
    capacity: 2,
    sizeSqm: 38,
    areaSqM: 38,
    bedConfiguration: "2 Single Beds",
    bedConfig: "2 Single Beds",
    viewType: "GARDEN",
    image: "/images/aurora/hero-02.jpg",
    imageUrl: "/images/aurora/hero-02.jpg",
    gallery: [
      "/images/aurora/hero-02.jpg",
      "/images/aurora/deluxe-king.jpg",
      "/images/aurora/hero-01.jpg",
    ],
    images: [
      "/images/aurora/hero-02.jpg",
      "/images/aurora/deluxe-king.jpg",
      "/images/aurora/hero-01.jpg",
    ],
    amenities: [
      "Garden View",
      "2 Twin Beds",
      "Free High-speed Wi-Fi",
      "Rain Shower",
      "Work Desk",
      "Mini Bar",
      "Balcony",
    ],
    isActive: true,
    ratePlans: [
      {
        id: "rp-flex-twin",
        code: "FLEX-BFAST-TWIN",
        name: "Flexible Rate with Gourmet Breakfast",
        roomCategoryId: "cat-deluxe-twin",
        planType: "FLEXIBLE_BREAKFAST",
        priceMultiplier: 1.0,
        multiplier: 1.0,
        cancelPolicyDays: 3,
        breakfastIncluded: true,
        isActive: true,
        description: "Bao gồm bữa sáng buffet hàng ngày",
        cancellationPolicy: "Miễn phí hủy trước 3 ngày nhận phòng",
        mealPlan: "Bữa sáng buffet cao cấp",
      },
      {
        id: "rp-saver-twin",
        code: "NON-REF-TWIN",
        name: "Non-Refundable Saver",
        roomCategoryId: "cat-deluxe-twin",
        planType: "NON_REFUNDABLE",
        priceMultiplier: 0.85,
        multiplier: 0.85,
        cancelPolicyDays: 0,
        breakfastIncluded: false,
        isActive: true,
        description: "Tiết kiệm 15%, thanh toán ngay, không hoàn hủy",
        cancellationPolicy: "Không hoàn hủy",
        mealPlan: "Không bao gồm bữa sáng",
      },
    ],
  },
  {
    id: "cat-presidential-suite",
    slug: "presidential-suite",
    name: "Presidential Ocean Penthouse",
    type: "PRESIDENTIAL_SUITE",
    description:
      "Biệt thự hoàng gia trên đỉnh cao 120m² với quản gia riêng 24/7, phòng tiệc VIP riêng biệt và tầm nhìn 360 độ vịnh biển tuyệt mỹ.",
    basePrice: 12000000,
    maxOccupancy: 4,
    capacity: 4,
    sizeSqm: 120,
    areaSqM: 120,
    bedConfiguration: "1 Emperor King Bed + 1 King Bed",
    bedConfig: "1 Emperor King Bed + 1 King Bed",
    viewType: "OCEAN",
    image: "/images/aurora/presidential-villa.jpg",
    imageUrl: "/images/aurora/presidential-villa.jpg",
    gallery: [
      "/images/aurora/presidential-villa.jpg",
      "/images/aurora/family-villa.jpg",
      "/images/aurora/hero-03.jpg",
    ],
    images: [
      "/images/aurora/presidential-villa.jpg",
      "/images/aurora/family-villa.jpg",
      "/images/aurora/hero-03.jpg",
    ],
    amenities: [
      "Emperor Bed",
      "2 Bedrooms",
      "24/7 Butler Service",
      "Private Dining Room",
      "Sauna & Private Spa",
      "Panoramic Ocean View",
      "Free Airport Limousine",
    ],
    isActive: true,
    ratePlans: [
      {
        id: "rp-flex-presidential",
        code: "FLEX-BFAST-PRESIDENTIAL",
        name: "Flexible Rate with Butler & Fine Dining Breakfast",
        roomCategoryId: "cat-presidential-suite",
        planType: "FLEXIBLE_BREAKFAST",
        priceMultiplier: 1.0,
        multiplier: 1.0,
        cancelPolicyDays: 5,
        breakfastIncluded: true,
        isActive: true,
        description: "Đặc quyền quản gia riêng, đưa đón Limousine và bữa sáng cao cấp",
        cancellationPolicy: "Miễn phí hủy trước 5 ngày",
        mealPlan: "Bữa sáng Fine Dining & Butler",
      },
      {
        id: "rp-saver-presidential",
        code: "NON-REF-PRESIDENTIAL",
        name: "Non-Refundable Royal Saver",
        roomCategoryId: "cat-presidential-suite",
        planType: "NON_REFUNDABLE",
        priceMultiplier: 0.85,
        multiplier: 0.85,
        cancelPolicyDays: 0,
        breakfastIncluded: true,
        isActive: true,
        description: "Tiết kiệm 15% cho kỳ nghỉ đẳng cấp hoàng gia",
        cancellationPolicy: "Không hoàn hủy",
        mealPlan: "Bữa sáng Fine Dining",
      },
    ],
  },
];

export const MOCK_SERVICES = [
  {
    id: "srv-airport",
    code: "AIRPORT_PICKUP",
    name: "Luxury Airport Transfer (Mercedes S-Class)",
    description: "Đưa đón sân bay Đà Nẵng bằng xe sang riêng biệt",
    price: 850000,
    unit: "PER_STAY",
    isActive: true,
  },
  {
    id: "srv-spa",
    code: "SPA_TREATMENT",
    name: "Signature 60-min Lotus Spa & Wellness",
    description: "Liệu trình chăm sóc sức khỏe thảo dược truyền thống",
    price: 1200000,
    unit: "PER_PERSON",
    isActive: true,
  },
  {
    id: "srv-dinner",
    code: "BEACH_DINNER",
    name: "Sunset Beachside Romantic Dinner for Two",
    description: "Bữa tối lãng mạn bên bờ biển với hải sản thượng hạng và rượu vang",
    price: 2500000,
    unit: "PER_STAY",
    isActive: true,
  },
];

export const MOCK_COUPONS = [
  {
    code: "AURORA10",
    discountAmount: 0,
    discountPercent: 10,
    maxDiscountAmount: 1000000,
    minBookingAmount: 2000000,
    isActive: true,
    startDate: new Date("2020-01-01"),
    endDate: new Date("2030-12-31"),
    currentUsageCount: 5,
    maxUsageTotal: 1000,
  },
  {
    code: "WELCOME",
    discountAmount: 500000,
    discountPercent: 0,
    maxDiscountAmount: 500000,
    minBookingAmount: 3000000,
    isActive: true,
    startDate: new Date("2020-01-01"),
    endDate: new Date("2030-12-31"),
    currentUsageCount: 10,
    maxUsageTotal: 500,
  },
];

// Helper lookup
export function findMockCategory(idOrSlug: string): MockRoomCategory | undefined {
  if (!idOrSlug) return undefined;
  const normalized = idOrSlug.toLowerCase().trim();
  return MOCK_ROOM_CATEGORIES.find(
    (c) =>
      c.id.toLowerCase() === normalized ||
      c.slug.toLowerCase() === normalized ||
      c.type.toLowerCase() === normalized ||
      normalized.includes(c.id.toLowerCase()) ||
      c.id.toLowerCase().includes(normalized)
  );
}

export function findMockRatePlan(ratePlanId?: string, categoryId?: string): MockRatePlan | undefined {
  const category = categoryId ? findMockCategory(categoryId) : undefined;
  if (category) {
    if (ratePlanId) {
      const match = category.ratePlans.find((rp) => rp.id === ratePlanId || rp.code === ratePlanId);
      if (match) return match;
    }
    return category.ratePlans[0];
  }

  for (const cat of MOCK_ROOM_CATEGORIES) {
    if (ratePlanId) {
      const match = cat.ratePlans.find((rp) => rp.id === ratePlanId || rp.code === ratePlanId);
      if (match) return match;
    }
  }

  return MOCK_ROOM_CATEGORIES[0].ratePlans[0];
}

// In-memory demo bookings store for offline testing
export interface DemoBookingRecord {
  id: string;
  bookingNumber: string;
  guestId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  numGuests: number;
  totalAmount: number;
  roomSubtotal: number;
  taxAndFeeTotal: number;
  status: "CONFIRMED" | "PENDING_PAYMENT" | "CANCELLED";
  paymentMethod: string;
  roomCategoryId: string;
  ratePlanId: string;
  roomCategory?: { name: string; slug: string };
  ratePlan?: { name: string };
  createdAt: string;
}

const globalAny = globalThis as unknown as {
  __DEMO_BOOKINGS_MAP__?: Map<string, DemoBookingRecord>;
};

if (!globalAny.__DEMO_BOOKINGS_MAP__) {
  globalAny.__DEMO_BOOKINGS_MAP__ = new Map<string, DemoBookingRecord>();
}
const DEMO_BOOKINGS_MAP = globalAny.__DEMO_BOOKINGS_MAP__;

// Pre-seed a sample booking for lookup testing
DEMO_BOOKINGS_MAP.set("AUR-261105-DEMO01", {
  id: "mock-booking-sample-01",
  bookingNumber: "AUR-261105-DEMO01",
  guestName: "Đỗ Hồng Dương",
  guestEmail: "doduong27032003@gmail.com",
  guestPhone: "0399078931",
  specialRequests: "Phòng tầng cao, view vịnh biển",
  checkIn: "2026-11-05",
  checkOut: "2026-11-08",
  nights: 3,
  numGuests: 2,
  roomSubtotal: 12600000,
  taxAndFeeTotal: 1260000,
  totalAmount: 13860000,
  status: "CONFIRMED",
  paymentMethod: "MOCK_PAYMENT",
  roomCategoryId: "cat-executive-suite",
  ratePlanId: "rp-flex-executive",
  roomCategory: { name: "Executive Bay Suite", slug: "executive-bay-suite" },
  ratePlan: { name: "Flexible Rate with Gourmet Breakfast" },
  createdAt: new Date().toISOString(),
});

export function saveDemoBooking(booking: DemoBookingRecord) {
  DEMO_BOOKINGS_MAP.set(booking.bookingNumber.toUpperCase(), booking);
  return booking;
}

export function getDemoBooking(bookingNumber: string, email?: string): DemoBookingRecord | undefined {
  const record = DEMO_BOOKINGS_MAP.get(bookingNumber.toUpperCase().trim());
  if (!record) return undefined;
  if (email && record.guestEmail.toLowerCase() !== email.toLowerCase().trim()) {
    return undefined;
  }
  return record;
}

export function cancelDemoBooking(bookingNumber: string): boolean {
  const record = DEMO_BOOKINGS_MAP.get(bookingNumber.toUpperCase().trim());
  if (!record) return false;
  record.status = "CANCELLED";
  return true;
}
