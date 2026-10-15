import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Flame } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotalVND,
    subtotalUSD,
    discountVND,
    discountUSD,
    totalVND,
    totalUSD,
    formatPrice,
    groupDiscountPercent,
    currency,
  } = useStore();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const freeShippingThresholdVND = 999000;
  const freeShippingThresholdUSD = 49;
  const isFreeShipping =
    currency === 'VND'
      ? totalVND >= freeShippingThresholdVND
      : totalUSD >= freeShippingThresholdUSD;
  const currentTotal = currency === 'VND' ? totalVND : totalUSD;
  const targetThreshold =
    currency === 'VND' ? freeShippingThresholdVND : freeShippingThresholdUSD;
  const progressPercent = Math.min(
    100,
    Math.round((currentTotal / targetThreshold) * 100)
  );

  return (
    <>
      {/* 1. Backdrop Dim Overlay (Active when isCartOpen) */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isCartOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Slide-out Drawer Panel + Attached Button Tab that moves synchronously with it */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-full max-w-[calc(100vw-54px)] sm:max-w-md transition-transform duration-300 ease-in-out pointer-events-auto ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Cart Button Tab: Physically attached to the left (front) edge of the drawer */}
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="absolute right-full top-1/2 -translate-y-1/2 bg-[#111111] text-white hover:bg-black border-l border-y border-neutral-700 rounded-l-md shadow-2xl py-2.5 px-2.5 flex flex-col items-center gap-1 cursor-pointer transition-all duration-200 hover:-translate-x-1 select-none z-10"
          title={isCartOpen ? 'Đóng giỏ hàng' : 'Mở giỏ hàng'}
          aria-label="Toggle Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            {cartCount > 0 ? (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-orange-600 text-white text-[9px] flex items-center justify-center font-bold font-mono shadow-xs animate-pulse">
                {cartCount}
              </span>
            ) : (
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-neutral-800 border border-neutral-600 text-neutral-400 text-[8px] flex items-center justify-center font-bold font-mono">
                0
              </span>
            )}
          </div>

          <span className="text-[9px] font-extrabold tracking-wider uppercase text-neutral-200 hover:text-white transition-colors">
            CART
          </span>
        </button>

        {/* Drawer Inner Content Box */}
        <div className="w-full h-full bg-[#F4F4F2] shadow-2xl flex flex-col border-l border-neutral-300">
          {/* Cart Header */}
          <div className="p-6 bg-white border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h3 className="font-display font-extrabold text-base uppercase tracking-wider text-black">
                GIỎ HÀNG CỦA BẠN ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-neutral-100 p-4 border-b border-neutral-200">
            <div className="flex justify-between text-xs font-semibold text-neutral-800 mb-1.5">
              <span>
                {isFreeShipping
                  ? '🎉 Bạn được MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC'
                  : `Mua thêm ${
                      currency === 'VND'
                        ? formatPrice(freeShippingThresholdVND - totalVND, 0)
                        : formatPrice(0, freeShippingThresholdUSD - totalUSD)
                    } để Freeship`}
              </span>
              <span className="font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Group Buy Discount Strip */}
          {groupDiscountPercent > 0 && (
            <div className="bg-orange-50 border-b border-orange-200 px-4 py-2.5 flex items-center justify-between text-xs text-orange-950 font-medium">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
                <span>Đang áp dụng ưu đãi Phòng Mua Chung</span>
              </span>
              <span className="font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                -{groupDiscountPercent}%
              </span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-neutral-500">
                <ShoppingBag className="w-12 h-12 mx-auto text-neutral-300 mb-3" />
                <p className="font-medium text-sm text-neutral-800">
                  Giỏ hàng của bạn đang trống
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Khám phá các bộ sưu tập GAZU để chọn trang phục ưng ý
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Mua Sắm Ngay
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3.5 rounded-xs border border-neutral-200 flex gap-3.5 items-center justify-between"
                >
                  <div className="w-16 h-20 bg-neutral-100 rounded-xs overflow-hidden shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-neutral-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Size:{' '}
                      <span className="font-bold text-black">
                        {item.selectedSize}
                      </span>{' '}
                      · {item.selectedColor}
                    </p>
                    <p className="font-mono text-xs font-bold text-black mt-1">
                      {formatPrice(
                        item.product.priceVND,
                        item.product.priceUSD
                      )}
                    </p>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-neutral-300 rounded-xs bg-neutral-50">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-black cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-black cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Xóa khỏi giỏ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-black/10 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Tạm tính ({cart.length} món):</span>
                  <span className="font-mono font-medium text-black">
                    {formatPrice(subtotalVND, subtotalUSD)}
                  </span>
                </div>

                {groupDiscountPercent > 0 && (
                  <div className="flex justify-between text-orange-600 font-medium">
                    <span>
                      Ưu đãi Phòng Mua Chung (-{groupDiscountPercent}%):
                    </span>
                    <span className="font-mono font-bold">
                      -{formatPrice(discountVND, discountUSD)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="font-mono font-medium text-emerald-700">
                    {isFreeShipping ? 'MIỄN PHÍ' : formatPrice(30000, 3)}
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline text-sm font-bold text-black">
                  <span>Tổng thanh toán:</span>
                  <span className="font-mono text-lg font-black text-black">
                    {formatPrice(totalVND, totalUSD)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-widest uppercase rounded-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>TIẾN HÀNH ĐẶT HÀNG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
};
