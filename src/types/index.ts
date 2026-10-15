export type Currency = 'VND' | 'USD';
export type Language = 'vi' | 'en';
export type ActiveView = 'storefront' | 'admin';

export interface WarehouseStock {
  hub: 'Hà Nội (Kho Bắc)' | 'Đà Nẵng (Kho Trung)' | 'TP. HCM (Kho Nam)';
  onHand: number;
  allocated: number;
  atp: number; // Available-to-Promise = onHand - allocated
  leadTime: string;
}

export interface ProductReview {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  date: string;
  comment: string;
}

export interface ProductVariant {
  sku: string; // Mã định danh SKU chuẩn quy tắc (VD: ADI-UB-BLK-41, ADI-JK-BLK-L)
  color: string;
  colorHex?: string;
  size: string; // Size số: 39, 40, 41... hoặc Size chữ: S, M, L, XL hoặc OneSize
  physicalStock: number; // Tồn kho vật lý tại kho
  reservedStock: number; // Tồn kho đang tạm khóa giữ chỗ (Đổi trả SKU / Phòng mua chung)
  availableStock: number; // Tồn kho khả dụng = physicalStock - reservedStock
  barcode?: string;
}

export interface Product {
  id: string;
  name: string;
  brandLine?: string; // Dòng 1: e.g. ADIDAS • BOOST RUNNING — TRUE TO SIZE
  defaultSku?: string; // Mã SKU: e.g. ADI-UB-BLK-41
  defaultSize?: string; // Dòng SIZE mặc định đang chọn: e.g. 41, Medium, OneSize
  category: 'shoes' | 'clothing' | 'pants' | 'accessories' | 'men' | 'women' | 'kids' | string;
  tagline: string;
  priceVND: number;
  priceUSD: number;
  originalPriceVND?: number;
  originalPriceUSD?: number;
  discountPercent?: number;
  rating?: number;
  reviewsCount?: number;
  image: string;
  images?: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  variants: ProductVariant[]; // Danh sách biến thể ProductVariants chuẩn mô hình doanh nghiệp
  isNew?: boolean;
  isBestSeller?: boolean;
  isGroupBuyEligible?: boolean;
  stockATP: number; // Total ATP across all warehouses
  warehouses: WarehouseStock[];
  description: string;
  composition: string;
  fit: string;
}

export interface CartItem {
  id: string; // product id + size + color
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  itemsCount: number;
  joinedAt: string;
}

export interface GroupBuyRoom {
  id: string;
  code: string;
  hostName: string;
  expiresInSeconds: number;
  members: GroupMember[];
  targetItems: number; // current items combined
  discountTier: number; // e.g. 5%, 15%, 25%
}

export type Occasion = 'streetwear' | 'office' | 'evening' | 'weekend';

export interface AIOutfitRecommendation {
  occasion: Occasion;
  title: string;
  aestheticNotes: string;
  items: Product[];
  bundleDiscountPercent: number;
}
