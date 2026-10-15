import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Flame, Users, Clock, Copy, Check, UserPlus, ShoppingBag, ArrowRight } from 'lucide-react';

export const GroupBuyModal: React.FC = () => {
  const {
    isGroupBuyModalOpen,
    setIsGroupBuyModalOpen,
    groupRoom,
    simulateAddCoShopper,
    groupDiscountPercent,
    products,
    addToCart,
    formatPrice,
    showToast,
  } = useStore();

  const [copied, setCopied] = useState(false);

  if (!isGroupBuyModalOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + '?room=' + groupRoom.code);
    setCopied(true);
    showToast('Đã sao chép liên kết mời phòng mua chung!');
    setTimeout(() => setCopied(false), 2000);
  };

  const eligibleProducts = products.filter((p) => p.isGroupBuyEligible);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-3xl bg-white rounded-xs border border-orange-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Orange Accent */}
        <div className="p-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-orange-100 uppercase bg-black/20 px-2 py-0.5 rounded">
                  CO-SHOPPING ROOM
                </span>
                <span className="text-xs text-orange-100 font-mono">
                  Mã phòng: #{groupRoom.code}
                </span>
              </div>
              <h3 className="font-display font-black text-xl text-white mt-0.5">
                Phòng Mua Chung Nhóm — Nhận Giảm Giá Tới 25%
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsGroupBuyModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-black/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Progress & Tier Tracker */}
          <div className="bg-orange-50 border border-orange-200 rounded-xs p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs font-bold text-orange-950 uppercase tracking-wider">
                  Tiến Độ Tích Lũy Sản Phẩm Toàn Phòng
                </p>
                <p className="text-sm text-orange-800">
                  Cả nhóm hiện có <strong className="font-mono text-base font-bold text-orange-950">{groupRoom.targetItems} sản phẩm</strong> trong giỏ.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-orange-100 text-orange-900 px-3 py-1.5 rounded-full text-xs font-mono font-bold border border-orange-300">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span>Còn lại: {formatTimer(groupRoom.expiresInSeconds)}</span>
                </div>
              </div>
            </div>

            {/* 3 Tier Milestones */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div
                className={`p-3 rounded border text-xs transition-all ${
                  groupRoom.targetItems >= 2
                    ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                    : 'bg-white text-neutral-600 border-neutral-200'
                }`}
              >
                <div className="font-bold text-sm">MỨC 1: -5%</div>
                <div className="text-[11px] opacity-90 mt-0.5">2 sản phẩm</div>
                {groupRoom.targetItems >= 2 && <div className="text-[10px] font-bold mt-1">✓ ĐÃ ĐẠT</div>}
              </div>

              <div
                className={`p-3 rounded border text-xs transition-all ${
                  groupRoom.targetItems >= 3
                    ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                    : 'bg-white text-neutral-600 border-neutral-200'
                }`}
              >
                <div className="font-bold text-sm">MỨC 2: -15%</div>
                <div className="text-[11px] opacity-90 mt-0.5">3 sản phẩm</div>
                {groupRoom.targetItems >= 3 && <div className="text-[10px] font-bold mt-1">✓ ĐÃ ĐẠT</div>}
              </div>

              <div
                className={`p-3 rounded border text-xs transition-all ${
                  groupRoom.targetItems >= 5
                    ? 'bg-orange-600 text-white border-orange-700 shadow-xs'
                    : 'bg-white text-neutral-600 border-neutral-200'
                }`}
              >
                <div className="font-bold text-sm">MỨC 3: -25%</div>
                <div className="text-[11px] opacity-90 mt-0.5">5+ sản phẩm (VIP)</div>
                {groupRoom.targetItems >= 5 && <div className="text-[10px] font-bold mt-1">✓ ĐÃ ĐẠT</div>}
              </div>
            </div>
          </div>

          {/* Share Link & Simulate Co-Shopper Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full flex items-center bg-neutral-100 border border-neutral-300 rounded px-3 py-2 text-xs">
              <span className="text-neutral-500 truncate mr-2 font-mono">
                {window.location.origin}/join-room/{groupRoom.code}
              </span>
              <button
                onClick={handleCopyLink}
                className="ml-auto flex items-center gap-1 text-orange-600 hover:text-orange-700 font-bold shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã chép' : 'Sao chép link'}</span>
              </button>
            </div>

            <button
              onClick={simulateAddCoShopper}
              className="w-full sm:w-auto px-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
              title="Thêm một người mua giả lập để trải nghiệm mức giảm giá tăng lên"
            >
              <UserPlus className="w-4 h-4 text-orange-400" />
              <span>Mô Phỏng Bạn Tham Gia (+1)</span>
            </button>
          </div>

          {/* Members List */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-orange-600" />
              <span>Thành Viên Đang Trong Phòng ({groupRoom.members.length})</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {groupRoom.members.map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded border border-neutral-200 bg-neutral-50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover border border-orange-400"
                    />
                    <div>
                      <p className="font-semibold text-xs text-neutral-900">{member.name}</p>
                      <p className="text-[11px] text-neutral-500">{member.joinedAt}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                    {member.itemsCount} món
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Add Eligible Products */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3">
              Gợi Ý Sản Phẩm Hưởng Ưu Đãi Mua Chung
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {eligibleProducts.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  className="border border-neutral-200 rounded p-2.5 bg-white flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] rounded bg-neutral-100 overflow-hidden mb-2">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-semibold text-xs text-neutral-900 line-clamp-1">{prod.name}</p>
                  <div className="flex items-baseline justify-between mt-1 mb-2">
                    <span className="font-mono text-xs font-bold text-neutral-900">
                      {formatPrice(prod.priceVND, prod.priceUSD)}
                    </span>
                    <span className="text-[10px] text-orange-600 font-bold">
                      -{groupDiscountPercent || 5}%
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(prod);
                      showToast(`Đã gộp "${prod.name}" vào phòng mua chung!`);
                    }}
                    className="w-full py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-bold rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Thêm Vào Phòng</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex justify-end">
          <button
            onClick={() => setIsGroupBuyModalOpen(false)}
            className="px-6 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded cursor-pointer"
          >
            Tiếp Tục Mua Sắm
          </button>
        </div>
      </div>
    </div>
  );
};
