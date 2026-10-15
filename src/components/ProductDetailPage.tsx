import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductReview } from '../types';
import { DEFAULT_REVIEWS } from '../data/products';
import {
  Star,
  CheckCircle2,
  Check,
  Plus,
  Minus,
  SlidersHorizontal,
  ChevronDown,
  MoreHorizontal,
  Heart,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Flame,
  PackageCheck,
  X
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const {
    products,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    viewProduct,
    goHome,
    setCategoryFilter,
    setAtpModalProduct,
    setIsGroupBuyModalOpen,
    isGroupBuyActive,
    groupDiscountPercent,
    showToast,
    language,
  } = useStore();

  const product = products.find((p) => p.id === productId) || products[0];

  // Gallery images array: product.image is always index 0
  const galleryImages: string[] = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.defaultSize || product.sizes[0] || 'Medium');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'faqs'>('reviews');
  const [sortOption, setSortOption] = useState<'latest' | 'highest' | 'lowest'>('latest');
  const [reviews, setReviews] = useState<ProductReview[]>(DEFAULT_REVIEWS);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(6);

  // Reset active image, color, size, and quantity when productId changes
  useEffect(() => {
    setActiveImageIndex(0);
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId, product]);

  const isWish = wishlist.includes(product.id);

  // Recommendations: Other products excluding current product
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const originalPriceVND = product.originalPriceVND || Math.round(product.priceVND * 1.4);
  const originalPriceUSD = product.originalPriceUSD || Math.round(product.priceUSD * 1.4);
  const discountPercent = product.discountPercent || 40;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    showToast(
      language === 'vi'
        ? `Đã thêm ${quantity}x "${product.name}" (${selectedSize}, ${selectedColor}) vào giỏ hàng`
        : `Added ${quantity}x "${product.name}" (${selectedSize}, ${selectedColor}) to cart`
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      verified: true,
      rating: newReviewRating,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      comment: newReviewComment.trim(),
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setIsWriteReviewOpen(false);
    showToast(language === 'vi' ? 'Đã gửi đánh giá của bạn thành công!' : 'Review submitted successfully!');
  };

  // Render Stars Helper
  const renderStars = (rating: number = 4.5, sizeClass: string = 'w-4 h-4') => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.3;
    return (
      <div className="flex items-center gap-1 text-amber-400">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className={`${sizeClass} fill-amber-400 text-amber-400`} />;
          }
          if (i === fullStars && hasHalf) {
            return (
              <div key={i} className="relative">
                <Star className={`${sizeClass} text-neutral-300`} />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className={`${sizeClass} fill-amber-400 text-amber-400`} />
                </div>
              </div>
            );
          }
          return <Star key={i} className={`${sizeClass} text-neutral-300`} />;
        })}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#FAFAF8] min-h-screen text-[#111111] animate-fadeIn pb-24">
      {/* 1. Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5 border-b border-black/5">
        <nav className="flex items-center flex-wrap gap-2 text-xs text-neutral-500 font-medium tracking-wide">
          <button
            onClick={goHome}
            className="hover:text-black transition-colors cursor-pointer"
          >
            {language === 'vi' ? 'Trang chủ' : 'Home'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <button
            onClick={goHome}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <button
            onClick={() => {
              setCategoryFilter(product.category);
              goHome();
            }}
            className="capitalize hover:text-black transition-colors cursor-pointer font-medium"
          >
            {product.category === 'men' ? (language === 'vi' ? 'Nam' : 'Men') :
             product.category === 'women' ? (language === 'vi' ? 'Nữ' : 'Women') :
             product.category === 'kids' ? (language === 'vi' ? 'Trẻ em' : 'Kids') : 'Beauty'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-black font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>
      </div>

      {/* 2. Main Product Showcase (2 Columns) */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Vertical Thumbnails + Large Main Image (Grid cols 7) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-5">
            {/* 3 Vertical Thumbnails */}
            <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
              {galleryImages.map((imgUrl, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 sm:w-24 sm:h-32 rounded-2xl overflow-hidden bg-[#F0EEED] border transition-all duration-200 cursor-pointer shrink-0 ${
                      isActive
                        ? 'border-2 border-black shadow-sm ring-1 ring-black/10 scale-[1.02]'
                        : 'border-black/5 hover:border-black/30 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main Hero Product Image Display */}
            <div className="relative flex-1 aspect-[4/5] bg-[#F0EEED] rounded-3xl overflow-hidden border border-black/5 flex items-center justify-center shadow-xs">
              <img
                src={galleryImages[activeImageIndex] || product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Wishlist Button (Top Right) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all shadow-md cursor-pointer active:scale-90"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isWish ? 'fill-red-600 text-red-600' : 'text-neutral-700'
                  }`}
                />
              </button>

              {/* Badges (Top Left) */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                {/* ATP Stock Indicator */}
                <button
                  onClick={() => setAtpModalProduct(product)}
                  className="flex items-center gap-1.5 bg-emerald-900/90 text-emerald-200 hover:bg-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs shadow-xs cursor-pointer transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ATP: {product.stockATP} {language === 'vi' ? 'sẵn sàng giao' : 'available'}</span>
                </button>

                {/* Group Buy Eligible Badge */}
                {product.isGroupBuyEligible && (
                  <button
                    onClick={() => setIsGroupBuyModalOpen(true)}
                    className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs cursor-pointer transition-colors"
                  >
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    <span>{language === 'vi' ? 'Mua chung giảm -25%' : 'Group Buy -25%'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Product Metadata, Selectors, Add to Cart (Grid cols 5) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Brand / Silhouette Line */}
            {product.brandLine && (
              <div className="text-xs font-bold text-neutral-500 tracking-wider uppercase mb-1">
                {product.brandLine}
              </div>
            )}

            {/* Title & SKU */}
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[-0.03em] text-neutral-900 leading-tight">
                {product.name}
              </h1>
              {product.defaultSku && (
                <span className="text-xs font-mono font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-sm border border-neutral-200 shrink-0">
                  SKU: {product.defaultSku}
                </span>
              )}
            </div>

            {/* Rating Stars & Score */}
            <div className="flex items-center gap-3 mt-3">
              {renderStars(product.rating || 4.5, 'w-4 h-4')}
              <span className="text-sm font-semibold text-neutral-800">
                {product.rating || 4.5}/<span className="text-neutral-500">5</span>
              </span>
              <span className="text-xs text-neutral-400">({product.reviewsCount || 451} reviews)</span>
            </div>

            {/* Price Row: Discounted Price + Strikethrough + Discount Badge */}
            <div className="flex items-center gap-3.5 mt-4">
              <span className="font-mono font-black text-2xl sm:text-3xl text-neutral-950">
                {formatPrice(product.priceVND, product.priceUSD)}
              </span>
              <span className="font-mono text-xl sm:text-2xl text-neutral-400 line-through">
                {formatPrice(originalPriceVND, originalPriceUSD)}
              </span>
              <span className="bg-red-100 text-red-600 px-3.5 py-1 rounded-full text-xs sm:text-sm font-extrabold font-mono">
                -{discountPercent}%
              </span>
            </div>

            {/* Description Text */}
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed font-normal">
              {product.description}
            </p>

            <div className="w-full h-px bg-neutral-200 my-6" />

            {/* Select Colors */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-3">
                <span className="uppercase tracking-wider">
                  {language === 'vi' ? 'Chọn màu sắc' : 'Select Colors'}
                </span>
                <span className="text-neutral-900 font-bold">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`relative w-9 h-9 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'ring-2 ring-black ring-offset-2 scale-110'
                          : 'hover:scale-105 border border-black/20'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select color ${c.name}`}
                    >
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 ${
                            c.hex.toLowerCase() === '#f0efea' ||
                            c.hex.toLowerCase() === '#f5f5f0' ||
                            c.hex.toLowerCase() === '#eae5d9'
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full h-px bg-neutral-200 my-6" />

            {/* Choose Size */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-3">
                <span className="uppercase tracking-wider">
                  {language === 'vi' ? 'Chọn kích cỡ' : 'Choose Size'}
                </span>
                <button
                  type="button"
                  onClick={() => showToast('Bảng size chuẩn: Giày (39-42), Quần Áo (S: 50-62kg, M: 63-72kg, L: 73-82kg, XL: 83-95kg)')}
                  className="text-neutral-500 hover:text-black underline cursor-pointer"
                >
                  {language === 'vi' ? 'Bảng quy đổi size' : 'Size Guide'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-black text-white shadow-sm'
                          : 'bg-[#F0F0F0] hover:bg-[#E5E5E5] text-neutral-700'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full h-px bg-neutral-200 my-6" />

            {/* Quantity Stepper & Add to Cart Action Row */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Stepper Pill */}
              <div className="bg-[#F0F0F0] rounded-full px-4 py-3.5 flex items-center gap-5 text-sm font-bold text-neutral-900 select-none">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="hover:text-black cursor-pointer p-0.5 active:scale-90 transition-transform"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-4 text-center font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="hover:text-black cursor-pointer p-0.5 active:scale-90 transition-transform"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black hover:bg-neutral-800 text-white rounded-full py-4 px-8 font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'vi' ? 'Thêm vào giỏ hàng' : 'Add to Cart'}</span>
              </button>
            </div>

            {/* Value Highlights Under Button */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-black/5 text-center">
              <div className="flex flex-col items-center gap-1 text-[11px] text-neutral-600">
                <Truck className="w-4 h-4 text-neutral-800" />
                <span className="font-semibold text-neutral-900">{language === 'vi' ? 'Giao 24h' : '24h Delivery'}</span>
                <span className="text-[10px] text-neutral-400">{language === 'vi' ? 'Toàn quốc' : 'Nationwide'}</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[11px] text-neutral-600 border-x border-black/5">
                <RotateCcw className="w-4 h-4 text-neutral-800" />
                <span className="font-semibold text-neutral-900">{language === 'vi' ? 'Đổi trả 15 ngày' : '15-Day Return'}</span>
                <span className="text-[10px] text-neutral-400">{language === 'vi' ? 'Miễn phí đổi' : 'Easy process'}</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[11px] text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-neutral-800" />
                <span className="font-semibold text-neutral-900">{language === 'vi' ? '100% Chính hãng' : 'Authentic'}</span>
                <span className="text-[10px] text-neutral-400">{language === 'vi' ? 'Tiêu chuẩn GAZU' : 'GAZU Certified'}</span>
              </div>
            </div>

            {/* ATP Warehouse Stock & Variant SKU Card */}
            {(() => {
              const currentVariant =
                product.variants?.find(
                  (v) =>
                    (v.size === selectedSize || v.size === 'OneSize') &&
                    (!selectedColor ||
                      v.color.toLowerCase().includes(selectedColor.toLowerCase()) ||
                      selectedColor.toLowerCase().includes(v.color.toLowerCase()))
                ) ||
                product.variants?.find((v) => v.size === selectedSize || v.size === 'OneSize') ||
                product.variants?.[0];

              const physical = currentVariant?.physicalStock ?? Math.round(product.stockATP * 1.2);
              const reserved = currentVariant?.reservedStock ?? Math.round(product.stockATP * 0.2);
              const available = currentVariant?.availableStock ?? (physical - reserved);

              return (
                <div className="mt-5 bg-white border border-black/10 rounded-2xl p-4.5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PackageCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                        {language === 'vi' ? 'Biến thể SKU & Tồn kho ATP' : 'Variant SKU & ATP Stock'}
                      </span>
                    </div>
                    {currentVariant?.sku && (
                      <span className="font-mono text-[11px] font-bold bg-neutral-950 text-white px-2.5 py-0.5 rounded-md shadow-xs">
                        {currentVariant.sku}
                      </span>
                    )}
                  </div>

                  {/* 3 ATP Metrics Standard */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-center">
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Tồn Vật Lý</div>
                      <div className="font-mono font-black text-sm text-slate-900 mt-0.5">{physical}</div>
                      <div className="text-[9px] text-slate-400">PhysicalStock</div>
                    </div>
                    <div className="border-x border-slate-200">
                      <div className="text-[10px] text-orange-600 font-medium">Tạm Giữ Chỗ</div>
                      <div className="font-mono font-black text-sm text-orange-600 mt-0.5">-{reserved}</div>
                      <div className="text-[9px] text-orange-400">ReservedStock</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-700 font-bold">Khả Dụng ATP</div>
                      <div className="font-mono font-black text-sm text-emerald-600 mt-0.5">{available}</div>
                      <div className="text-[9px] text-emerald-500">AvailableStock</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-500">
                      Size: <b className="text-slate-800">{selectedSize}</b> • Màu: <b className="text-slate-800">{selectedColor}</b>
                    </span>
                    <button
                      onClick={() => setAtpModalProduct(product)}
                      className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {language === 'vi' ? 'Chi tiết 3 Hub WMS' : 'View all 3 Hubs'} →
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>

        {/* 3. Tab Navigation (Product Details | Rating & Reviews | FAQs) */}
        <div className="mt-16 border-b border-neutral-200">
          <div className="flex items-center justify-around sm:justify-start sm:gap-16 text-sm sm:text-base font-medium">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 px-2 tracking-wide transition-all cursor-pointer relative ${
                activeTab === 'details'
                  ? 'text-black font-bold'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              {language === 'vi' ? 'Chi tiết sản phẩm' : 'Product Details'}
              {activeTab === 'details' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 px-2 tracking-wide transition-all cursor-pointer relative flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'text-black font-bold'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <span>{language === 'vi' ? 'Đánh giá & Nhận xét' : 'Rating & Reviews'}</span>
              <span className="text-xs bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full font-bold">
                {product.reviewsCount || reviews.length}
              </span>
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`pb-4 px-2 tracking-wide transition-all cursor-pointer relative ${
                activeTab === 'faqs'
                  ? 'text-black font-bold'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              FAQs
              {activeTab === 'faqs' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
              )}
            </button>
          </div>
        </div>

        {/* 4. Tab Content Area */}
        <div className="pt-8">
          {/* TAB: Rating & Reviews (Matches exact reference image) */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col">
              {/* Header Bar: "All Reviews (451)" + Actions (Filter, Sort, Write Review) */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                    {language === 'vi' ? 'Tất cả đánh giá' : 'All Reviews'}
                  </h3>
                  <span className="text-sm text-neutral-500 font-semibold">
                    ({reviews.length + (product.reviewsCount ? product.reviewsCount - DEFAULT_REVIEWS.length : 0)})
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Filter Icon Button */}
                  <button
                    onClick={() => showToast(language === 'vi' ? 'Đang lọc đánh giá 5 sao' : 'Filtering 5-star reviews')}
                    className="w-10 h-10 rounded-full bg-[#F0F0F0] hover:bg-neutral-200 flex items-center justify-center text-neutral-800 transition-colors cursor-pointer"
                    aria-label="Filter reviews"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setSortOption((prev) => (prev === 'latest' ? 'highest' : 'latest'));
                      }}
                      className="bg-[#F0F0F0] hover:bg-neutral-200 text-neutral-800 font-semibold text-xs px-4 py-2.5 rounded-full flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>
                        {sortOption === 'latest'
                          ? language === 'vi' ? 'Mới nhất' : 'Latest'
                          : language === 'vi' ? 'Đánh giá cao nhất' : 'Highest Rated'}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                    </button>
                  </div>

                  {/* Write a Review Button */}
                  <button
                    onClick={() => setIsWriteReviewOpen(true)}
                    className="bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    {language === 'vi' ? 'Viết đánh giá' : 'Write a Review'}
                  </button>
                </div>
              </div>

              {/* Reviews Grid (2 Columns of Rich Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reviews.slice(0, visibleReviewsCount).map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-black/30 transition-all shadow-2xs"
                  >
                    <div>
                      {/* Top: Stars & More Options Dots */}
                      <div className="flex items-center justify-between mb-3">
                        {renderStars(rev.rating, 'w-4 h-4')}
                        <button
                          onClick={() => alert(`Review ID: ${rev.id}`)}
                          className="text-neutral-400 hover:text-black cursor-pointer p-1 -mr-1"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Author with Verified Green Badge */}
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="font-bold text-sm text-neutral-900 tracking-wide">
                          {rev.author}
                        </span>
                        {rev.verified && (
                          <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
                        )}
                      </div>

                      {/* Comment Quote */}
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                        "{rev.comment}"
                      </p>
                    </div>

                    {/* Date */}
                    <div className="mt-5 text-[11px] text-neutral-400 font-medium">
                      Posted on {rev.date}
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Reviews Button */}
              {visibleReviewsCount < reviews.length ? (
                <div className="flex justify-center mt-9">
                  <button
                    onClick={() => setVisibleReviewsCount(reviews.length)}
                    className="border border-neutral-300 hover:border-black hover:bg-black hover:text-white text-neutral-800 text-xs sm:text-sm font-bold px-8 py-3 rounded-full transition-all cursor-pointer"
                  >
                    {language === 'vi' ? 'Xem thêm đánh giá' : 'Load More Reviews'}
                  </button>
                </div>
              ) : (
                <div className="text-center mt-8 text-xs text-neutral-400">
                  {language === 'vi' ? 'Đã hiển thị tất cả đánh giá' : 'Showing all verified reviews'}
                </div>
              )}
            </div>
          )}

          {/* TAB: Product Details */}
          {activeTab === 'details' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 space-y-6 text-sm">
              <div>
                <h4 className="font-bold text-neutral-900 uppercase text-xs tracking-wider mb-2">
                  {language === 'vi' ? 'Chất liệu & Cấu trúc dệt' : 'Material & Fabric Specifications'}
                </h4>
                <p className="text-neutral-600 leading-relaxed">{product.composition}</p>
              </div>
              <div className="h-px bg-neutral-100" />
              <div>
                <h4 className="font-bold text-neutral-900 uppercase text-xs tracking-wider mb-2">
                  {language === 'vi' ? 'Form dáng & Độ ôm' : 'Silhouette & Fit Guide'}
                </h4>
                <p className="text-neutral-600 leading-relaxed">{product.fit}</p>
              </div>
              <div className="h-px bg-neutral-100" />
              <div>
                <h4 className="font-bold text-neutral-900 uppercase text-xs tracking-wider mb-2">
                  {language === 'vi' ? 'Hướng dẫn bảo quản cao cấp' : 'Garment Care Instructions'}
                </h4>
                <ul className="list-disc list-inside text-neutral-600 space-y-1">
                  <li>{language === 'vi' ? 'Giặt máy chế độ nhẹ hoặc giặt tay với nước lạnh dưới 30°C' : 'Machine wash delicate or hand wash in cold water under 30°C'}</li>
                  <li>{language === 'vi' ? 'Lộn trái áo khi giặt để bảo vệ màu khoáng và hình in lụa' : 'Turn garment inside out before washing to protect mineral wash & print'}</li>
                  <li>{language === 'vi' ? 'Không sử dụng thuốc tẩy hoặc chất giặt có tính kiềm mạnh' : 'Do not bleach or use heavy industrial detergents'}</li>
                  <li>{language === 'vi' ? 'Ủi ở nhiệt độ thấp, không ủi trực tiếp lên chi tiết in' : 'Low iron if needed, do not iron directly on graphic details'}</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: FAQs */}
          {activeTab === 'faqs' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 divide-y divide-neutral-100 text-sm">
              <div className="pb-4">
                <h5 className="font-bold text-neutral-900 mb-1">
                  {language === 'vi' ? 'Thời gian giao hàng mất bao lâu?' : 'How long does nationwide delivery take?'}
                </h5>
                <p className="text-neutral-600 text-xs sm:text-sm">
                  {language === 'vi'
                    ? 'Nhờ mạng lưới 3 kho ATP (Hà Nội, Đà Nẵng, TP.HCM), đơn hàng nội thành giao trong 24 giờ và liên tỉnh từ 36 - 48 giờ.'
                    : 'With 3 regional ATP hubs in Ha Noi, Da Nang, and HCMC, metro delivery takes 24h and regional orders take 36-48h.'}
                </p>
              </div>
              <div className="py-4">
                <h5 className="font-bold text-neutral-900 mb-1">
                  {language === 'vi' ? 'Chính sách đổi size nếu không vừa?' : 'What is the size exchange policy?'}
                </h5>
                <p className="text-neutral-600 text-xs sm:text-sm">
                  {language === 'vi'
                    ? 'GAZU hỗ trợ đổi size miễn phí tận nhà trong vòng 15 ngày kể từ ngày nhận hàng với sản phẩm còn nguyên tem mác.'
                    : 'GAZU offers 15-day complimentary doorstep size exchange for items with original tags intact.'}
                </p>
              </div>
              <div className="pt-4">
                <h5 className="font-bold text-neutral-900 mb-1">
                  {language === 'vi' ? 'Làm sao để nhận chiết khấu Phòng Mua Chung -25%?' : 'How does the Co-Shopping -25% discount work?'}
                </h5>
                <p className="text-neutral-600 text-xs sm:text-sm">
                  {language === 'vi'
                    ? 'Bạn chỉ cần bấm nút "Phòng Mua Chung" trên thanh đầu trang hoặc mời 1 người bạn cùng thêm đồ vào phòng để kích hoạt mức giảm 25% cho toàn bộ đơn hàng!'
                    : 'Click "Co-Shopping Room" in the top bar or invite a friend to add items together to unlock up to 25% off storewide!'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 5. "YOU MIGHT ALSO LIKE" Section (Matches exact reference image) */}
        <div className="mt-24 pt-12 border-t border-black/10">
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[-0.03em] text-center text-neutral-900 mb-12">
            {language === 'vi' ? 'CÓ THỂ BẠN CŨNG THÍCH' : 'YOU MIGHT ALSO LIKE'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => {
              const relOriginalVND = rel.originalPriceVND || Math.round(rel.priceVND * 1.4);
              const relOriginalUSD = rel.originalPriceUSD || Math.round(rel.priceUSD * 1.4);
              const relDiscount = rel.discountPercent || 25;

              return (
                <div
                  key={rel.id}
                  onClick={() => viewProduct(rel.id)}
                  className="group flex flex-col bg-transparent cursor-pointer transition-all duration-300"
                >
                  {/* Image container on #F0EEED */}
                  <div className="relative aspect-[3/4] w-full bg-[#F0EEED] rounded-2xl overflow-hidden flex items-center justify-center border border-black/5">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(rel.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-xs flex items-center justify-center shadow-xs cursor-pointer active:scale-90 transition-all"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlist.includes(rel.id) ? 'fill-red-600 text-red-600' : 'text-neutral-700'
                        }`}
                      />
                    </button>

                    {/* ATP indicator */}
                    <div className="absolute bottom-2.5 left-2.5 bg-emerald-950/80 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                      ATP: {rel.stockATP}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="pt-3.5 flex flex-col flex-1">
                    <h4 className="font-semibold text-sm text-neutral-900 group-hover:text-black line-clamp-1 transition-colors">
                      {rel.name}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-1.5">
                      {renderStars(rel.rating || 4.5, 'w-3.5 h-3.5')}
                      <span className="text-xs font-semibold text-neutral-700">
                        {rel.rating || 4.5}/<span className="text-neutral-400">5</span>
                      </span>
                    </div>

                    {/* Price with strikethrough & discount */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-mono font-bold text-sm text-black">
                        {formatPrice(rel.priceVND, rel.priceUSD)}
                      </span>
                      <span className="font-mono text-xs text-neutral-400 line-through">
                        {formatPrice(relOriginalVND, relOriginalUSD)}
                      </span>
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-mono">
                        -{relDiscount}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="font-bold text-lg text-neutral-900">
                {language === 'vi' ? 'Đánh giá sản phẩm' : 'Write a Product Review'}
              </h3>
              <button
                onClick={() => setIsWriteReviewOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  {language === 'vi' ? 'Số sao đánh giá' : 'Rating Score'}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReviewRating(s)}
                      className="cursor-pointer p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          s <= newReviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-neutral-700 ml-2">
                    {newReviewRating}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  {language === 'vi' ? 'Họ và tên' : 'Your Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'vi' ? 'Ví dụ: Alex M.' : 'e.g. Alex M.'}
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  {language === 'vi' ? 'Nội dung nhận xét' : 'Review Comment'}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    language === 'vi'
                      ? 'Chia sẻ trải nghiệm về chất vải, form dáng, độ bền...'
                      : 'Share your experience regarding fabric feel, fit silhouette, durability...'
                  }
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-lg outline-none focus:border-black resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
                >
                  {language === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-xs font-bold cursor-pointer"
                >
                  {language === 'vi' ? 'Gửi đánh giá' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
