import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Banknote } from 'lucide-react';

interface CheckoutModalProps {
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { totalVND, totalUSD, formatPrice, clearCart, setIsCartOpen, showToast } = useStore();

  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Hải Nam',
    phone: '0912 345 678',
    city: 'Hà Nội',
    address: 'Số 18 Phố Tràng Tiền, Quận Hoàn Kiếm',
    paymentMethod: 'cod',
    notes: 'Giao giờ hành chính, gọi trước khi đến',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `GZ-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setIsSuccess(true);
    clearCart();
    showToast(`Đặt hàng thành công mã #${newOrderId}!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-white rounded-xs shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-neutral-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
              SECURE 256-BIT ENCRYPTION
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              {isSuccess ? 'Xác Nhận Đơn Hàng Thành Công' : 'Thông Tin Giao Hàng & Thanh Toán'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="font-display font-extrabold text-2xl text-black">
                CẢM ƠN BẠN ĐÃ MUA SẮM TẠI GAZU!
              </h4>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Đơn hàng <strong className="text-black font-mono">#{orderId}</strong> đã được ghi nhận vào hệ thống điều phối kho tự động (ATP). Nhân viên CSKH sẽ liên hệ xác nhận trong 15 phút.
              </p>
              <div className="bg-neutral-50 p-4 rounded border border-neutral-200 text-left text-xs space-y-1.5 font-mono">
                <p><strong>Người nhận:</strong> {formData.fullName} ({formData.phone})</p>
                <p><strong>Địa chỉ:</strong> {formData.address}, {formData.city}</p>
                <p><strong>Hình thức:</strong> {formData.paymentMethod === 'cod' ? 'Thanh toán COD khi nhận hàng' : 'Chuyển khoản QR'}</p>
                <p><strong>Tổng tiền:</strong> {formatPrice(totalVND, totalUSD)}</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setIsCartOpen(false);
                }}
                className="w-full py-3 bg-black text-white text-xs font-bold tracking-widest uppercase rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Hoàn Tất & Về Trang Chủ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-neutral-800 block mb-1 uppercase tracking-wider">
                  Họ và tên người nhận *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xs focus:border-black outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-neutral-800 block mb-1 uppercase tracking-wider">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xs focus:border-black outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-800 block mb-1 uppercase tracking-wider">
                    Tỉnh / Thành phố *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xs focus:border-black outline-none bg-white font-medium"
                  >
                    <option value="Hà Nội">Hà Nội (Kho Bắc - 24h)</option>
                    <option value="Đà Nẵng">Đà Nẵng (Kho Trung - 36h)</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh (Kho Nam - 24h)</option>
                    <option value="Khác">Tỉnh thành khác (48h)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-800 block mb-1 uppercase tracking-wider">
                  Địa chỉ giao hàng cụ thể *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xs focus:border-black outline-none"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="font-bold text-neutral-800 block mb-2 uppercase tracking-wider">
                  Phương thức thanh toán
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    className={`p-3 rounded border flex items-center gap-2 cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-black bg-neutral-100 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="sr-only"
                    />
                    <Banknote className="w-4 h-4 text-neutral-700" />
                    <span>Thanh toán COD khi nhận hàng</span>
                  </label>

                  <label
                    className={`p-3 rounded border flex items-center gap-2 cursor-pointer transition-all ${
                      formData.paymentMethod === 'vietqr'
                        ? 'border-black bg-neutral-100 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="vietqr"
                      checked={formData.paymentMethod === 'vietqr'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'vietqr' })}
                      className="sr-only"
                    />
                    <CreditCard className="w-4 h-4 text-neutral-700" />
                    <span>Chuyển khoản VietQR 24/7</span>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded border border-neutral-200 flex justify-between items-center text-xs">
                <span>Số tiền thanh toán cuối cùng:</span>
                <span className="font-mono text-base font-extrabold text-black">
                  {formatPrice(totalVND, totalUSD)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-widest uppercase rounded-xs transition-colors shadow-md cursor-pointer active:scale-95"
              >
                Xác Nhận Đặt Hàng Ngay
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
