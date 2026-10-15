import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Occasion, AIOutfitRecommendation } from '../types';
import { X, Sparkles, Check, ShoppingBag, ArrowRight, Layers } from 'lucide-react';

export const AiStylistDrawer: React.FC = () => {
  const {
    isAiStylistOpen,
    setIsAiStylistOpen,
    products,
    addToCart,
    formatPrice,
    showToast,
  } = useStore();

  const [activeOccasion, setActiveOccasion] = useState<Occasion>('streetwear');

  if (!isAiStylistOpen) return null;

  const occasions: { id: Occasion; label: string; desc: string }[] = [
    { id: 'streetwear', label: 'Streetwear Chill', desc: 'Phom rộng thư thái, màu washed bụi bặm' },
    { id: 'office', label: 'Minimal Office', desc: 'Tối giản, đường cắt gọn gàng, thanh lịch' },
    { id: 'evening', label: 'Night Out', desc: 'Đơn sắc tương phản cao, phong thái ấn tượng' },
    { id: 'weekend', label: 'Weekend Vibes', desc: 'Chất liệu organic thoáng mát dạo phố' },
  ];

  // Build curated look for each occasion
  const getRecommendation = (occ: Occasion): AIOutfitRecommendation => {
    switch (occ) {
      case 'office':
        return {
          occasion: 'office',
          title: 'The Contemporary Minimalist Set',
          aestheticNotes: 'Sự kết hợp giữa phom áo khoác overshirt snap-button và áo thun alabaster trắng dày dặn mang lại hình ảnh chỉn chu hiện đại nơi công sở mà không bị gò bó như suit truyền thống.',
          items: [products[4], products[3]], // snap overshirt + white tee
          bundleDiscountPercent: 10,
        };
      case 'evening':
        return {
          occasion: 'evening',
          title: 'Architectural Nocturne Statement',
          aestheticNotes: 'Khoác trench coat dạ dài biểu tượng phủ ngoài áo dệt kim micro-ribbed đen tuyền tạo hiệu ứng thị giác phân tầng chiều sâu mạnh mẽ cho buổi tối.',
          items: [products[7], products[2]], // trench coat + black knit
          bundleDiscountPercent: 12,
        };
      case 'weekend':
        return {
          occasion: 'weekend',
          title: 'Easy Living Organic Casual',
          aestheticNotes: 'Áo thun cotton hữu cơ giặt khoáng phối cùng phụ kiện tối giản, tạo độ rơi tự nhiên và thoáng mát tối đa suốt cả ngày dài.',
          items: [products[0], products[1]], // charcoal tee + vintage tee
          bundleDiscountPercent: 10,
        };
      case 'streetwear':
      default:
        return {
          occasion: 'streetwear',
          title: 'Urban Runway Layering Look',
          aestheticNotes: 'Áo khoác dáng dài Urban Atelier phối cùng áo thun wash xám tro và quần ống suông, tôn vinh trọn vẹn tinh thần thời trang chuyển động (Fashion that moves with you) của GAZU.',
          items: [products[7], products[0]], // trench + charcoal tee
          bundleDiscountPercent: 15,
        };
    }
  };

  const rec = getRecommendation(activeOccasion);
  const bundleSubtotalVND = rec.items.reduce((s, i) => s + (i ? i.priceVND : 0), 0);
  const bundleSubtotalUSD = rec.items.reduce((s, i) => s + (i ? i.priceUSD : 0), 0);
  const bundleDiscountVND = Math.round((bundleSubtotalVND * rec.bundleDiscountPercent) / 100);
  const bundleDiscountUSD = Math.round((bundleSubtotalUSD * rec.bundleDiscountPercent) / 100);

  const handleAddBundle = () => {
    rec.items.forEach((item) => {
      if (item) addToCart(item);
    });
    showToast(`Đã thêm trọn bộ outfit "${rec.title}" vào giỏ hàng!`);
    setIsAiStylistOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-[#F4F4F2] h-full shadow-2xl flex flex-col border-l border-neutral-300 transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Emerald Tone */}
        <div className="p-6 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                GAZU AI STYLIST ADVISOR
              </span>
              <h3 className="font-display font-bold text-lg text-white">
                Cố Vấn Phối Đồ Cá Nhân Hóa
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsAiStylistOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Occasion Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2.5">
              1. Bạn muốn phối đồ cho dịp nào?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {occasions.map((occ) => {
                const isSelected = activeOccasion === occ.id;
                return (
                  <button
                    key={occ.id}
                    onClick={() => setActiveOccasion(occ.id)}
                    className={`p-3 rounded-xs text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-black shadow-xs'
                        : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                    }`}
                  >
                    <p className="font-bold text-xs">{occ.label}</p>
                    <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {occ.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Styling Card */}
          <div className="bg-white border border-emerald-200 rounded-xs p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                  GỢI Ý OUTFIT CHUẨN GAZU
                </span>
                <h4 className="font-display font-bold text-base text-neutral-900 mt-1">
                  {rec.title}
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
                Giảm combo: -{rec.bundleDiscountPercent}%
              </span>
            </div>

            <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
              {rec.aestheticNotes}
            </p>

            {/* Curated Items in this Bundle */}
            <div className="mt-4 space-y-3 pt-3 border-t border-neutral-100">
              {rec.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#F9F9F7] p-2.5 rounded border border-neutral-200">
                  <div className="w-14 h-14 rounded overflow-hidden bg-neutral-200 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-neutral-900 truncate">{item.name}</p>
                    <p className="text-[10px] text-neutral-500">{item.fit}</p>
                    <p className="font-mono text-xs font-bold text-neutral-800 mt-0.5">
                      {formatPrice(item.priceVND, item.priceUSD)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="mt-5 pt-4 border-t border-neutral-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-500 line-through">
                  {formatPrice(bundleSubtotalVND, bundleSubtotalUSD)}
                </span>
                <p className="font-mono text-lg font-black text-emerald-700">
                  {formatPrice(bundleSubtotalVND - bundleDiscountVND, bundleSubtotalUSD - bundleDiscountUSD)}
                </p>
              </div>

              <button
                onClick={handleAddBundle}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Cả Bộ Vào Giỏ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
