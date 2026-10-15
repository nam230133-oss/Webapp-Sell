import { Product, ProductReview } from '../types';

import heroModelImg from '../assets/images/gazu_hero_model_1791949602276.jpg';
import menCategoryImg from '../assets/images/gazu_men_category_1791949604195.jpg';
import womenCategoryImg from '../assets/images/gazu_women_category_1791949603816.jpg';
import kidsCategoryImg from '../assets/images/gazu_kids_category_1791949604311.jpg';
import secondaryVibesImg from '../assets/images/gazu_secondary_vibes_1791949604757.jpg';

// Authentic Product Studio Assets matching exact brands and models
import prodAdidasUltraboost from '../assets/images/adidas_ultraboost_1792052247592.jpg';
import prodNikeAirForceOne from '../assets/images/nike_air_force_one_1792052248609.jpg';
import prodPumaSuedeClassic from '../assets/images/puma_suede_classic_1792052249463.jpg';
import prodNikeDriFitTee from '../assets/images/nike_drifit_tee_1792052249933.jpg';
import prodAdidasTrackJacket from '../assets/images/adidas_track_jacket_1792052251215.jpg';
import prodPumaRelaxedHoodie from '../assets/images/puma_relaxed_hoodie_1792052251384.jpg';
import prodAdidasTiroJogger from '../assets/images/adidas_tiro_jogger_1792052251723.jpg';
import prodNikeBrasiliaBag from '../assets/images/nike_brasilia_bag_1792052252051.jpg';

export const ASSET_IMAGES = {
  heroModel: heroModelImg,
  menCategory: menCategoryImg,
  womenCategory: womenCategoryImg,
  kidsCategory: kidsCategoryImg,
  secondaryVibes: secondaryVibesImg,
};

export const DEFAULT_REVIEWS: ProductReview[] = [
  {
    id: 'rev-01',
    author: 'Trần Minh Quân',
    verified: true,
    rating: 5,
    date: '14 Tháng 10, 2026',
    comment: 'Đôi Ultraboost Light êm vượt trội, chạy 10km mỗi sáng hoàn trả lực rất tốt. Đặt qua phòng mua chung được giảm 25% cực hời!',
  },
  {
    id: 'rev-02',
    author: 'Nguyễn Thảo My',
    verified: true,
    rating: 5,
    date: '12 Tháng 10, 2026',
    comment: 'Nike Air Force 1 trắng chuẩn form, da mịn đẹp, giao hỏa tốc từ Hub Nam TP.HCM chỉ trong 2 giờ.',
  },
  {
    id: 'rev-03',
    author: 'Đặng Tuấn Anh',
    verified: true,
    rating: 5,
    date: '10 Tháng 10, 2026',
    comment: 'Áo khoác Adidas Firebird phối 3 sọc kinh điển, chất liệu tricot dày dặn chống nhăn rất đẹp. Rất hài lòng.',
  },
  {
    id: 'rev-04',
    author: 'Phạm Hồng Nhung',
    verified: true,
    rating: 5,
    date: '08 Tháng 10, 2026',
    comment: 'Puma Classics Hoodie màu beige phom relaxed cực chất, nỉ bông giữ ấm tốt, đường may chắc chắn.',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  // =========================================================================
  // 1) Thẻ 1 (Giày Adidas): Adidas Ultraboost Light Running
  // =========================================================================
  {
    id: 'adi-ub-light',
    brandLine: 'ADIDAS • BOOST RUNNING — TRUE TO SIZE',
    name: 'Adidas Ultraboost Light Running',
    defaultSku: 'ADI-UB-BLK-41',
    defaultSize: '41',
    category: 'shoes',
    tagline: 'Đệm Light BOOST siêu êm nhẹ nhất lịch sử, hoàn trả năng lượng tối đa trên từng cự ly',
    priceVND: 3400000,
    priceUSD: 136,
    originalPriceVND: 4530000,
    originalPriceUSD: 181,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 684,
    image: prodAdidasUltraboost,
    images: [
      prodAdidasUltraboost,
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
    ],
    sizes: ['39', '40', '41', '42'],
    colors: [
      { name: 'Core Black / Trắng', hex: '#111111' },
      { name: 'Cloud White / Bạc', hex: '#F0EFEA' },
    ],
    variants: [
      { sku: 'ADI-UB-BLK-39', color: 'Core Black / Trắng', colorHex: '#111111', size: '39', physicalStock: 25, reservedStock: 5, availableStock: 20 },
      { sku: 'ADI-UB-BLK-40', color: 'Core Black / Trắng', colorHex: '#111111', size: '40', physicalStock: 35, reservedStock: 5, availableStock: 30 },
      { sku: 'ADI-UB-BLK-41', color: 'Core Black / Trắng', colorHex: '#111111', size: '41', physicalStock: 45, reservedStock: 7, availableStock: 38 },
      { sku: 'ADI-UB-BLK-42', color: 'Core Black / Trắng', colorHex: '#111111', size: '42', physicalStock: 32, reservedStock: 6, availableStock: 26 },
    ],
    isNew: true,
    isBestSeller: true,
    isGroupBuyEligible: true,
    stockATP: 38,
    warehouses: [
      { hub: 'Hà Nội (Kho Bắc)', onHand: 19, allocated: 4, atp: 15, leadTime: '24 Giờ' },
      { hub: 'Đà Nẵng (Kho Trung)', onHand: 10, allocated: 2, atp: 8, leadTime: '36 Giờ' },
      { hub: 'TP. HCM (Kho Nam)', onHand: 18, allocated: 3, atp: 15, leadTime: '24 Giờ' },
    ],
    description: 'Trải nghiệm năng lượng bùng nổ với mẫu Ultraboost Light nhẹ nhất từ trước đến nay. Thân giày dệt nguyên khối adidas PRIMEKNIT+ ôm chân mềm mại, đế ngoài bằng cao su Continental™ Better Rubber bám chắc trên cả mặt đường ướt và khô.',
    composition: 'Thân giày dệt PRIMEKNIT+, Đệm Light BOOST đàn hồi cao cấp, Đế ngoài cao su Continental™',
    fit: 'TRUE TO SIZE — Form ôm chân chuẩn thể thao'
  },

  // =========================================================================
  // 2) Thẻ 2 (Giày Nike): Nike Air Force 1 '07 Low White
  // =========================================================================
  {
    id: 'nik-air-force-1',
    brandLine: 'NIKE • STREETWEAR ICON SILHOUETTE',
    name: "Nike Air Force 1 '07 Low White",
    defaultSku: 'NIK-AF1-WHT-41',
    defaultSize: '41',
    category: 'shoes',
    tagline: 'Huyền thoại bóng rổ và phong cách đường phố bất tử với lớp đệm Air-Sole êm ái nguyên bản',
    priceVND: 2920000,
    priceUSD: 117,
    originalPriceVND: 3890000,
    originalPriceUSD: 156,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 942,
    image: prodNikeAirForceOne,
    images: [
      prodNikeAirForceOne,
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
    ],
    sizes: ['39', '40', '41', '42'],
    colors: [
      { name: 'Triple White', hex: '#FFFFFF' },
      { name: 'Core Black / Trắng', hex: '#111111' },
    ],
    variants: [
      { sku: 'NIK-AF1-WHT-39', color: 'Triple White', colorHex: '#FFFFFF', size: '39', physicalStock: 20, reservedStock: 4, availableStock: 16 },
      { sku: 'NIK-AF1-WHT-40', color: 'Triple White', colorHex: '#FFFFFF', size: '40', physicalStock: 25, reservedStock: 5, availableStock: 20 },
      { sku: 'NIK-AF1-WHT-41', color: 'Triple White', colorHex: '#FFFFFF', size: '41', physicalStock: 28, reservedStock: 6, availableStock: 22 },
      { sku: 'NIK-AF1-WHT-42', color: 'Triple White', colorHex: '#FFFFFF', size: '42', physicalStock: 22, reservedStock: 4, availableStock: 18 },
    ],
    isNew: false,
    isBestSeller: true,
    isGroupBuyEligible: true,
    stockATP: 22,
    warehouses: [
      { hub: 'Hà Nội (Kho Bắc)', onHand: 12, allocated: 3, atp: 9, leadTime: '24 Giờ' },
      { hub: 'Đà Nẵng (Kho Trung)', onHand: 6, allocated: 2, atp: 4, leadTime: '36 Giờ' },
      { hub: 'TP. HCM (Kho Nam)', onHand: 11, allocated: 2, atp: 9, leadTime: '24 Giờ' },
    ],
    description: "Biểu tượng thời trang streetwear thế giới từ năm 1982. Thân giày bằng da thật cao cấp bóng bẩy, đế đệm Nike Air toàn phần êm ái suốt ngày dài và viền khâu sắc sảo.",
    composition: '100% Da tự nhiên Full-Grain Leather, Đế ngoài đúc cao su Cupsole, Đệm ẩn Nike Air',
    fit: 'Form rộng thoải mái — Đi đúng size hoặc lùi 0.5 size'
  },

  // =========================================================================
  // 3) Thẻ 3 (Giày Puma): Puma Suede Classic XXI Sneakers
  // =========================================================================
  {
    id: 'pum-suede-classic',
    brandLine: 'PUMA • RETRO SUEDE CLASSIC CUT',
    name: 'Puma Suede Classic XXI Sneakers',
    defaultSku: 'PUM-SUE-BLK-40',
    defaultSize: '40',
    category: 'shoes',
    tagline: 'Vẻ đẹp da lộn Suede cổ điển vượt thời gian kết hợp đường dải Formstrip đặc trưng',
    priceVND: 2150000,
    priceUSD: 86,
    originalPriceVND: 2860000,
    originalPriceUSD: 114,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 520,
    image: prodPumaSuedeClassic,
    images: [
      prodPumaSuedeClassic,
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80',
    ],
    sizes: ['39', '40', '41', '42'],
    colors: [
      { name: 'Puma Black / Trắng', hex: '#111111' },
      { name: 'Peacoat Navy / Trắng', hex: '#1E293B' },
    ],
    variants: [
      { sku: 'PUM-SUE-BLK-39', color: 'Puma Black / Trắng', colorHex: '#111111', size: '39', physicalStock: 18, reservedStock: 3, availableStock: 15 },
      { sku: 'PUM-SUE-BLK-40', color: 'Puma Black / Trắng', colorHex: '#111111', size: '40', physicalStock: 24, reservedStock: 5, availableStock: 19 },
      { sku: 'PUM-SUE-BLK-41', color: 'Puma Black / Trắng', colorHex: '#111111', size: '41', physicalStock: 26, reservedStock: 4, availableStock: 22 },
      { sku: 'PUM-SUE-BLK-42', color: 'Puma Black / Trắng', colorHex: '#111111', size: '42', physicalStock: 20, reservedStock: 4, availableStock: 16 },
    ],
    isNew: false,
    isBestSeller: true,
    isGroupBuyEligible: true,
    stockATP: 19,
    warehouses: [
      { hub: 'Hà Nội (Kho Bắc)', onHand: 11, allocated: 3, atp: 8, leadTime: '24 Giờ' },
      { hub: 'Đà Nẵng (Kho Trung)', onHand: 5, allocated: 1, atp: 4, leadTime: '36 Giờ' },
      { hub: 'TP. HCM (Kho Nam)', onHand: 9, allocated: 2, atp: 7, leadTime: '24 Giờ' },
    ],
    description: 'Ra đời từ năm 1968, Puma Suede đã gắn liền với các nền văn hóa hip-hop và b-boy trên toàn cầu. Thân giày bằng chất da lộn mềm cao cấp mang lại vẻ đẹp hoài niệm nhưng đầy hiện đại.',
    composition: '100% Da lộn tự nhiên Premium Suede, Lót trong dệt êm ái, Đế cao su lưu hóa bền bỉ',
    fit: 'Form vừa vặn ôm chân'
  },

  // =========================================================================
  // 4) Thẻ 4 (Áo Thun Nike): Nike Pro Dri-FIT Heavyweight Tee
  // =========================================================================
  {
    id: 'nik-pro-drifit-tee',
    brandLine: 'NIKE • DRI-FIT TRAINING — EXTENDED SLEEVE',
    name: 'Nike Pro Dri-FIT Heavyweight Tee',
    defaultSku: 'NIK-TEE-WHT-L',
    defaultSize: 'Large',
    category: 'clothing',
    tagline: 'Công nghệ Dri-FIT hút ẩm nhanh, chất vải cotton pha dày dặn giữ phom đứng đẳng cấp',
    priceVND: 890000,
    priceUSD: 36,
    originalPriceVND: 1190000,
    originalPriceUSD: 48,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 710,
    image: prodNikeDriFitTee,
    images: [
      prodNikeDriFitTee,
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Summit White', hex: '#F8FAFC' },
      { name: 'Black Heather', hex: '#111111' },
    ],
    variants: [
      { sku: 'NIK-TEE-WHT-S', color: 'Summit White', colorHex: '#F8FAFC', size: 'Small', physicalStock: 35, reservedStock: 5, availableStock: 30 },
      { sku: 'NIK-TEE-WHT-M', color: 'Summit White', colorHex: '#F8FAFC', size: 'Medium', physicalStock: 45, reservedStock: 7, availableStock: 38 },
      { sku: 'NIK-TEE-WHT-L', color: 'Summit White', colorHex: '#F8FAFC', size: 'Large', physicalStock: 52, reservedStock: 8, availableStock: 44 },
      { sku: 'NIK-TEE-WHT-XL', color: 'Summit White', colorHex: '#F8FAFC', size: 'X-Large', physicalStock: 30, reservedStock: 4, availableStock: 26 },
    ],
    isNew: true,
    isBestSeller: true,
    isGroupBuyEligible: true,
    stockATP: 44,
    warehouses: [
      { hub: 'Hà Nội (Kho Bắc)', onHand: 22, allocated: 4, atp: 18, leadTime: '24 Giờ' },
      { hub: 'Đà Nẵng (Kho Trung)', onHand: 13, allocated: 3, atp: 10, leadTime: '36 Giờ' },
      { hub: 'TP. HCM (Kho Nam)', onHand: 20, allocated: 4, atp: 16, leadTime: '24 Giờ' },
    ],
    description: 'Chiếc áo thun tập luyện cao cấp Nike Pro tích hợp công nghệ Dri-FIT độc quyền đẩy nhanh tốc độ bay hơi mồ hôi. Thiết kế vai hạ relaxed tay lỡ mang phong cách streetwear năng động.',
    composition: '60% Cotton chải kỹ Heavyweight, 40% Polyester Dri-FIT thoáng khí',
    fit: 'Dáng Relaxed Fit tay lỡ thời thượng'
  },

  // =========================================================================
  // 5) Thẻ 5 (Áo Khoác Adidas): Adidas Firebird Tracksuit Jacket
  // =========================================================================
  {
    id: 'adi-firebird-jacket',
    brandLine: 'ADIDAS • ORIGINALS 3-STRIPES SILHOUETTE',
    name: 'Adidas Firebird Tracksuit Jacket',
    defaultSku: 'ADI-JK-BLK-M',
    defaultSize: 'Medium',
    category: 'clothing',
    tagline: 'Chất vải tricot bóng bẩy mang tính di sản, 3 Sọc dọc tay và logo Trefoil thêu trước ngực',
    priceVND: 1950000,
    priceUSD: 78,
    originalPriceVND: 2600000,
    originalPriceUSD: 104,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 512,
    image: prodAdidasTrackJacket,
    images: [
      prodAdidasTrackJacket,
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Core Black / Trắng', hex: '#111111' },
      { name: 'Night Indigo / Xanh Than', hex: '#0F172A' },
    ],
    variants: [
      { sku: 'ADI-JK-BLK-S', color: 'Core Black / Trắng', colorHex: '#111111', size: 'Small', physicalStock: 18, reservedStock: 4, availableStock: 14 },
      { sku: 'ADI-JK-BLK-M', color: 'Core Black / Trắng', colorHex: '#111111', size: 'Medium', physicalStock: 20, reservedStock: 5, availableStock: 15 },
      { sku: 'ADI-JK-BLK-L', color: 'Core Black / Trắng', colorHex: '#111111', size: 'Large', physicalStock: 25, reservedStock: 4, availableStock: 21 },
      { sku: 'ADI-JK-BLK-XL', color: 'Core Black / Trắng', colorHex: '#111111', size: 'X-Large', physicalStock: 16, reservedStock: 3, availableStock: 13 },
    ],
    isNew: true,
    isBestSeller: true,
    isGroupBuyEligible: true,
    stockATP: 15,
    warehouses: [
      { hub: 'Hà Nội (Kho Bắc)', onHand: 8, allocated: 2, atp: 6, leadTime: '24 Giờ' },
      { hub: 'Đà Nẵng (Kho Trung)', onHand: 4, allocated: 1, atp: 3, leadTime: '36 Giờ' },
      { hub: 'TP. HCM (Kho Nam)', onHand: 8, allocated: 2, atp: 6, leadTime: '24 Giờ' },
    ],
    description: 'Một biểu tượng thời trang đường phố không bao giờ lỗi mốt. Chiếc áo khoác Firebird tôn vinh tinh thần adidas Originals với cổ đứng cao, khóa kéo hai chiều mượt mà và túi zip tiện lợi.',
    composition: '100% Polyester tái chế (Tricot mềm bóng chống nhăn)',
    fit: 'Dáng Regular Fit thoải mái, dễ phối layer nhiều lớp'
  },

  // =========================================================================
  // 6) Thẻ 6 (Áo Hoodie Puma): Puma Classics Relaxed Hoodie
  // =========================================================================
  {
    id: 'pum-classics-hoodie',
    brandLine: 'PUMA • OVERSIZED FLEECE STUDIO HOODIE',
    name: 'Puma Classics Relaxed Hoodie',
    defaultSku: 'PUM-HD-BEI-M',
    defaultSize: 'Medium',
    category: 'clothing',
    tagline: 'Lớp nỉ bông Fleece siêu mềm mịn, mũ trùm 2 lớp có dây rút dệt cao cấp và túi kangaroo ấm áp',
    priceVND: 1650000,
    priceUSD: 66,
    originalPriceVND: 2200000,
    originalPriceUSD: 88,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 380,
    image: prodPumaRelaxedHoodie,
    images: [
      prodPumaRelaxedHoodie,
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Pristine Beige / Be', hex: '#E2D9C8' },
      { name: 'Puma Black / Đen', hex: '#111111' },
    ],
    variants: [
      { sku: 'PUM-HD-BEI-S', color: 'Pristine Beige / Be', colorHex: '#E2D9C8', size: 'Small', physicalStock: 16, reservedStock: 3, availableStock: 13 },
      { sku: 'PUM-HD-BEI-M', color: 'Pristine Beige / Be', colorHex: '#E2D9C8', size: 'Medium', physicalStock: 22, reservedStock: 5, availableStock: 17 },
      { sku: 'PUM-HD-BEI-L', color: 'Pristine Beige / Be', colorHex: '#E2D9C8', size: 'Large', physicalStock: 26, reservedStock: 4, availableStock: 22 },
      { sku: 'PUM-HD-BEI-XL', color: 'Pristine Beige / Be', colorHex: '#E2D9C8', size: 'X-Large', physicalStock: 18, reservedStock: 3, availableStock: 15 },
    ],
    isNew: false,
    isBestSeller: true,
    isGroupBuyEligible: true,
    stockATP: 17,
    warehouses: [
      { hub: 'Hà Nội (Kho Bắc)', onHand: 9, allocated: 2, atp: 7, leadTime: '24 Giờ' },
      { hub: 'Đà Nẵng (Kho Trung)', onHand: 4, allocated: 1, atp: 3, leadTime: '36 Giờ' },
      { hub: 'TP. HCM (Kho Nam)', onHand: 9, allocated: 2, atp: 7, leadTime: '24 Giờ' },
    ],
    description: 'Phong cách tối giản đương đại với màu be trang nhã. Chất vải cotton nỉ bông giữ nhiệt tuyệt đối, tạo sự thoải mái tối đa cho những buổi dạo phố hay làm việc tại studio.',
    composition: '68% Cotton BCI, 32% Polyester nỉ Fleece cách nhiệt',
    fit: 'Dáng Oversized Relaxed Fit thoải mái'
  },

  // =========================================================================
  // 7) Thẻ 7 (Quần Jogger Adidas): Adidas Tiro 24 Training Jogger Pants
  // =========================================================================
  {
    id: 'adi-tiro24-jogger',
    brandLine: 'ADIDAS • COMFORT TAPERED FIT',
    name: 'Adidas Tiro 24 Training Jogger Pants',
    defaultSku: 'ADI-JG-BLK-L',
    defaultSize: 'Large',
    category: 'pants',
    tagline: 'Ống côn hiện đại với khóa kéo zip ở gấu quần, công nghệ AeroReady kiểm soát độ ẩm hiệu quả',
    priceVND: 1250000,
    priceUSD: 50,
    originalPriceVND: 1670000,
    originalPriceUSD: 67,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 620,
    image: prodAdidasTiroJogger,
    images: [
      prodAdidasTiroJogger,
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [
      { name: 'Core Black / Trắng', hex: '#111111' },
      { name: 'Team Navy / Xanh', hex: '#0F172A' },
    ],
    variants: [
      { sku: 'ADI-JG-BLK-S', color: 'Core Black / Trắng', colorHex: '#111111', size: 'Small', physicalStock: 24, reservedStock: 4, availableStock: 20 },
      { sku: 'ADI-JG-BLK-M', color: 'Core Black / Trắng', colorHex: '#111111', size: 'Medium', physicalStock: 32, reservedStock: 5, availableStock: 27 },
      { sku: 'ADI-JG-BLK-L', color: 'Core Black / Trắng', colorHex: '#111111', size: 'Large', physicalStock: 38, reservedStock: 7, availableStock: 31 },
      { sku: 'ADI-JG-BLK-XL', color: 'Core Black / Trắng', colorHex: '#111111', size: 'X-Large', physicalStock: 22, reservedStock: 4, availableStock: 18 },
    ],
    isNew: false,
    isBestSeller: true,
    isGroupBuyEligible: true,
    stockATP: 31,
    warehouses: [
      { hub: 'Hà Nội (Kho Bắc)', onHand: 15, allocated: 3, atp: 12, leadTime: '24 Giờ' },
      { hub: 'Đà Nẵng (Kho Trung)', onHand: 9, allocated: 2, atp: 7, leadTime: '36 Giờ' },
      { hub: 'TP. HCM (Kho Nam)', onHand: 16, allocated: 4, atp: 12, leadTime: '24 Giờ' },
    ],
    description: 'Chiếc quần tập luyện Tiro trứ danh của các vận động viên bóng đá chuyên nghiệp. Khóa kéo mắt cá chân tiện lợi giúp cởi hoặc mặc nhanh chóng mà không cần tháo giày.',
    composition: '100% Recycled Polyester đan dệt kim đôi AeroReady',
    fit: 'COMFORT TAPERED FIT — Ống côn thanh thoát khoe sneaker'
  },

  // =========================================================================
  // 8) Thẻ 8 (Phụ kiện Balo Nike): Nike Brasilia Training Backpack & Duffel
  // =========================================================================
  {
    id: 'nik-brasilia-backpack',
    brandLine: 'NIKE • ARCHITECTURAL GYM & TRAVEL GEAR',
    name: 'Nike Brasilia Training Backpack & Duffel',
    defaultSku: 'NIK-BP-BLK-OS',
    defaultSize: 'OneSize',
    category: 'accessories',
    tagline: 'Ngăn chứa đồ ướt/khô tách biệt thông minh, quai đeo đệm Max Air và đáy chống thấm nước',
    priceVND: 1150000,
    priceUSD: 46,
    originalPriceVND: 1530000,
    originalPriceUSD: 61,
    discountPercent: 25,
    rating: 4.9,
    reviewsCount: 480,
    image: prodNikeBrasiliaBag,
    images: [
      prodNikeBrasiliaBag,
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    ],
    sizes: ['OneSize'],
    colors: [
      { name: 'Triple Black', hex: '#111111' },
      { name: 'Iron Grey', hex: '#4B5563' },
    ],
    variants: [
      { sku: 'NIK-BP-BLK-OS', color: 'Triple Black', colorHex: '#111111', size: 'OneSize', physicalStock: 16, reservedStock: 4, availableStock: 12 },
    ],
    isNew: true,
    isBestSeller: true,
    isGroupBuyEligible: true,
    stockATP: 12,
    warehouses: [
      { hub: 'Hà Nội (Kho Bắc)', onHand: 7, allocated: 2, atp: 5, leadTime: '24 Giờ' },
      { hub: 'Đà Nẵng (Kho Trung)', onHand: 4, allocated: 1, atp: 3, leadTime: '36 Giờ' },
      { hub: 'TP. HCM (Kho Nam)', onHand: 6, allocated: 2, atp: 4, leadTime: '24 Giờ' },
    ],
    description: 'Sức chứa lớn 30L hoàn hảo cho lịch trình từ phòng tập gym tới văn phòng hay những chuyến du đấu cuối tuần. Có ngăn chống sốc riêng biệt cho laptop 15.6 inch.',
    composition: '100% Polyester dệt mật độ cao chống rách, Đáy phủ Polyurethane chống mài mòn',
    fit: 'Dung tích 30 Lít — Kích thước 51cm x 33cm x 18cm'
  },
];
