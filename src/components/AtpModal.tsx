import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle2, ShieldCheck, MapPin, Truck, Info, ShoppingBag } from 'lucide-react';

export const AtpModal: React.FC = () => {
  const { atpModalProduct, setAtpModalProduct, formatPrice, addToCart } = useStore();

  if (!atpModalProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white rounded-xs border border-neutral-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Emerald Stock Badge */}
        <div className="p-6 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  HỆ THỐNG TỒN KHO KHẢ DỤNG ATP
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Mã SKU: {atpModalProduct.defaultSku || atpModalProduct.id.toUpperCase()}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-white mt-1">
                {atpModalProduct.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setAtpModalProduct(null)}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Summary Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xs p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                Tổng Số Lượng Khả Dụng Toàn Quốc (ATP)
              </p>
              <p className="text-sm text-emerald-800 mt-0.5">
                Được cam kết giữ hàng theo thời gian thực và đóng gói ngay lập tức.
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-3xl font-extrabold text-emerald-700">
                {atpModalProduct.stockATP}
              </span>
              <span className="text-xs text-emerald-800 ml-1 font-medium">sản phẩm</span>
            </div>
          </div>

          {/* Educational Note about ATP */}
          <div className="flex items-start gap-2.5 text-xs text-neutral-600 bg-neutral-100 p-3 rounded-xs border border-neutral-200">
            <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <p>
              <strong>ATP (Available-to-Promise)</strong> = [Tồn kho vật lý tại kho] – [Đơn hàng đang chờ đóng gói]. Bạn được đảm bảo nhận hàng đúng hạn mà không lo hết hàng ảo.
            </p>
          </div>

          {/* Regional Hub Breakdown Table */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Phân Bổ Tồn Kho Theo Trung Tâm Điều Vận (Fulfillment Hubs)</span>
            </h4>

            <div className="border border-neutral-200 rounded-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100 text-neutral-700 font-bold uppercase tracking-wider border-b border-neutral-200">
                  <tr>
                    <th className="p-3">Kho Khu Vực</th>
                    <th className="p-3 text-center">Tồn Kho Kho</th>
                    <th className="p-3 text-center">Đang Xử Lý</th>
                    <th className="p-3 text-center text-emerald-700">ATP Khả Dụng</th>
                    <th className="p-3 text-right">Dự Kiến Giao</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-mono">
                  {atpModalProduct.warehouses.map((hub, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-3 font-sans font-semibold text-neutral-900">
                        {hub.hub}
                      </td>
                      <td className="p-3 text-center text-neutral-600">{hub.onHand}</td>
                      <td className="p-3 text-center text-neutral-400">{hub.allocated}</td>
                      <td className="p-3 text-center font-bold text-emerald-700 bg-emerald-50/50">
                        {hub.atp} chiếc
                      </td>
                      <td className="p-3 text-right font-sans font-medium text-neutral-700">
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          <Truck className="w-3 h-3" />
                          {hub.leadTime}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ProductVariants 3-Metric ATP Matrix */}
          {atpModalProduct.variants && atpModalProduct.variants.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Mô Hình Biến Thể SKU & 3 Chỉ Số ATP Chuẩn ({atpModalProduct.variants.length} SKU)</span>
                </h4>
                <span className="text-[10px] text-neutral-500 font-mono">Available = Physical - Reserved</span>
              </div>

              <div className="border border-neutral-200 rounded-xs overflow-hidden max-h-56 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 text-white font-bold uppercase text-[10px] tracking-wider sticky top-0">
                    <tr>
                      <th className="p-2.5">Mã SKU Biến Thể</th>
                      <th className="p-2.5">Size / Màu</th>
                      <th className="p-2.5 text-center">Tồn Vật Lý</th>
                      <th className="p-2.5 text-center text-orange-400">Tạm Khóa (Đổi/Mua chung)</th>
                      <th className="p-2.5 text-center text-emerald-400">Khả Dụng ATP</th>
                      <th className="p-2.5 text-right">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 font-mono text-[11px]">
                    {atpModalProduct.variants.map((v) => (
                      <tr key={v.sku} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-2.5 font-bold text-neutral-900">{v.sku}</td>
                        <td className="p-2.5 font-sans font-medium text-neutral-700">
                          Size {v.size} • {v.color}
                        </td>
                        <td className="p-2.5 text-center text-neutral-700">{v.physicalStock}</td>
                        <td className="p-2.5 text-center text-orange-600 font-bold">-{v.reservedStock}</td>
                        <td className="p-2.5 text-center text-emerald-700 font-black bg-emerald-50/60">
                          {v.availableStock}
                        </td>
                        <td className="p-2.5 text-right font-sans">
                          {v.availableStock > 15 ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              Dồi dào
                            </span>
                          ) : v.availableStock > 0 ? (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                              Sẵn sàng
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                              Tạm hết
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product Specs Mini Box */}
          <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-neutral-200">
            <div>
              <span className="text-neutral-500">Chất liệu:</span>
              <p className="font-medium text-neutral-900 mt-0.5">{atpModalProduct.composition}</p>
            </div>
            <div>
              <span className="text-neutral-500">Form dáng:</span>
              <p className="font-medium text-neutral-900 mt-0.5">{atpModalProduct.fit}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-neutral-500">Đơn giá niêm yết:</span>
            <p className="font-mono font-bold text-base text-black">
              {formatPrice(atpModalProduct.priceVND, atpModalProduct.priceUSD)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAtpModalProduct(null)}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-black cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                addToCart(atpModalProduct);
                setAtpModalProduct(null);
              }}
              className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Thêm Vào Giỏ Ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
