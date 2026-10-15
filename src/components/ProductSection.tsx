import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Heart, ShoppingBag, Layers, Check, Sparkles, Flame, Eye } from 'lucide-react';

export const ProductSection: React.FC = () => {
  const {
    products,
    categoryFilter,
    setCategoryFilter,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setAtpModalProduct,
    isGroupBuyActive,
    groupDiscountPercent,
    viewProduct,
    t,
    language,
  } = useStore();

  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const filterTabs = [
    { id: 'all', label: language === 'vi' ? 'TẤT CẢ' : 'ALL' },
    { id: 'shoes', label: language === 'vi' ? 'GIÀY THỂ THAO' : 'SHOES' },
    { id: 'clothing', label: language === 'vi' ? 'ÁO THỂ THAO' : 'TOPS' },
    { id: 'pants', label: language === 'vi' ? 'QUẦN THỂ THAO' : 'PANTS' },
    { id: 'accessories', label: language === 'vi' ? 'PHỤ KIỆN' : 'ACCESSORIES' },
    { id: 'group-buy', label: language === 'vi' ? '🔥 PHÒNG MUA CHUNG' : '🔥 CO-SHOPPING' },
  ];

  const filteredProducts = products.filter((p) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'group-buy') return p.isGroupBuyEligible;
    if (categoryFilter === 'men') return p.category === 'shoes' || p.category === 'clothing' || p.category === 'pants';
    if (categoryFilter === 'women') return p.category === 'clothing' || p.category === 'shoes';
    if (categoryFilter === 'kids') return p.category === 'accessories' || p.category === 'clothing';
    return p.category === categoryFilter;
  });

  const handleSizeSelect = (productId: string, size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <section id="catalog-section" className="w-full bg-[#F4F4F2] py-16 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-black/10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-500 uppercase">
              {t('prod_curation')}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-black uppercase mt-1">
              {t('prod_title')}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setCategoryFilter('all')}
              className="text-xs font-bold tracking-widest uppercase text-neutral-800 border-b border-black pb-0.5 hover:opacity-70 transition-opacity cursor-pointer"
            >
              {t('prod_view_all')} ({products.length})
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 py-6">
          {filterTabs.map((tab) => {
            const isActive = categoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all rounded-xs cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-[#EAEAE6] text-neutral-700 hover:bg-[#E0E0DB]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid (Desktop 4-Column Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-4">
          {filteredProducts.map((product) => {
            const isWish = isInWishlist(product.id);
            const activeSize = selectedSizes[product.id] || product.defaultSize || product.sizes[0];

            return (
              <div
                key={product.id}
                onClick={() => viewProduct(product.id)}
                className="group flex flex-col bg-transparent transition-all duration-300 cursor-pointer"
              >
                {/* Product Image Frame on #E5E5E0 warm grey background */}
                <div className="relative aspect-[3/4] w-full bg-[#E5E5E0] rounded-xs overflow-hidden flex items-center justify-center border border-black/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Wishlist Heart Button (Top Right) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    aria-label="Save to wishlist"
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/80 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-90"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isWish ? 'fill-red-600 text-red-600' : 'text-neutral-700'
                      }`}
                    />
                  </button>

                  {/* Badges (Top Left): ATP stock meter + Group Buy */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
                    {/* ATP Stock Indicator */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAtpModalProduct(product);
                      }}
                      className="flex items-center gap-1.5 bg-emerald-950/90 hover:bg-emerald-900 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-xs backdrop-blur-xs shadow-xs cursor-pointer transition-colors"
                      title="Bấm để kiểm tra chi tiết kho hàng tại Hà Nội, Đà Nẵng, TP.HCM"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>● ATP: {product.stockATP} có sẵn</span>
                    </button>

                    {/* Group Buy Eligible Badge */}
                    {product.isGroupBuyEligible && (
                      <span className="flex items-center gap-1 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shadow-xs">
                        <Flame className="w-3 h-3 fill-white" />
                        <span>🔥 Mua Chung -25%</span>
                      </span>
                    )}
                  </div>

                  {/* Hover Quick Actions Overlay */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setAtpModalProduct(product);
                      }}
                      className="flex-1 bg-white/95 hover:bg-white text-black py-2.5 px-2 text-[11px] font-bold tracking-wider uppercase rounded-xs shadow-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-neutral-600" />
                      <span>{t('prod_view_atp')}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, activeSize);
                      }}
                      className="flex-1 bg-black hover:bg-neutral-800 text-white py-2.5 px-2 text-[11px] font-bold tracking-wider uppercase rounded-xs shadow-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t('prod_quick_add')}</span>
                    </button>
                  </div>
                </div>

                {/* Product Metadata & Baseline */}
                <div className="pt-4 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Dòng 1: Brand / Category Silhouette */}
                    <div className="text-[11px] font-bold text-neutral-500 tracking-wider uppercase mb-1 line-clamp-1">
                      {product.brandLine || `${product.category} · ${product.fit}`}
                    </div>

                    {/* Tên Sản Phẩm & SKU */}
                    <div className="flex items-baseline justify-between gap-1.5">
                      <h3 className="font-semibold text-sm text-neutral-900 group-hover:text-black line-clamp-1 transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                      {product.defaultSku && (
                        <span className="text-[10px] font-mono text-neutral-400 font-bold shrink-0">
                          {product.defaultSku}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dòng SIZE: Buttons with default active selection */}
                  <div className="flex items-center gap-1.5 my-2.5">
                    <span className="text-[10px] text-neutral-400 font-mono uppercase font-bold">{t('prod_size')}:</span>
                    <div className="flex flex-wrap items-center gap-1">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={(e) => handleSizeSelect(product.id, size, e)}
                          className={`min-w-6 h-6 px-1.5 text-[10px] font-bold rounded-xs transition-colors cursor-pointer ${
                            activeSize === size
                              ? 'bg-black text-white'
                              : 'bg-neutral-200/80 text-neutral-700 hover:bg-neutral-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Giá: Giá Tiền & (Nhóm: -25%) */}
                  <div className="flex items-center justify-between pt-1 border-t border-black/5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono font-bold text-sm text-black">
                        {formatPrice(product.priceVND, product.priceUSD)}
                      </span>
                      <span className="text-[11px] text-orange-600 font-bold font-mono">
                        (Nhóm: -25%)
                      </span>
                    </div>

                    {/* Color Dots */}
                    <div className="flex items-center gap-1">
                      {product.colors.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-2.5 h-2.5 rounded-full border border-black/20"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
