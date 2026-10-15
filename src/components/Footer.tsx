import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck, Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCategoryFilter, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(`Cảm ơn bạn! Mã giảm giá 10% đã được gửi tới ${email}`);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#111111] text-white border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-neutral-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-black text-3xl tracking-tight text-white select-none">
              GAZU
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Thương hiệu thời trang đường phố cao cấp và phong cách sống tối giản. Được thiết kế với triết lý <em>"Fashion that moves with you"</em> kết hợp công nghệ điều phối tồn kho khả dụng (ATP) và nền tảng Phòng Mua Chung tiên phong.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                Hà Nội · Đà Nẵng · TP.HCM
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                1900 8888
              </span>
            </div>
          </div>

          {/* Quick Links: Collections */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-300 mb-4">
              BỘ SƯU TẬP
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-medium">
              <li>
                <button
                  onClick={() => {
                    setCategoryFilter('men');
                    window.scrollTo({ top: 1200, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Thời Trang Nam (Men)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCategoryFilter('women');
                    window.scrollTo({ top: 1200, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Thời Trang Nữ (Women)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCategoryFilter('kids');
                    window.scrollTo({ top: 1200, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trẻ Em & Thiếu Niên (Kids)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCategoryFilter('group-buy');
                    window.scrollTo({ top: 1200, behavior: 'smooth' });
                  }}
                  className="hover:text-orange-400 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Phòng Mua Chung (-25%)</span>
                </button>
              </li>
              <li>
                <span className="text-neutral-600">Mỹ Phẩm & Mùi Hương (Coming Soon)</span>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-300 mb-4">
              HỖ TRỢ & DỊCH VỤ
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-medium">
              <li><a href="#tracking" onClick={(e) => { e.preventDefault(); alert('Vui lòng kiểm tra mã vận đơn qua email hoặc SMS xác nhận đơn.'); }} className="hover:text-white transition-colors">Tra Cứu Đơn Hàng Real-Time</a></li>
              <li><a href="#atp" onClick={(e) => { e.preventDefault(); alert('Hệ thống ATP (Available-To-Promise) cam kết giữ hàng thật và giao nhanh từ 3 kho Hà Nội, Đà Nẵng, TP.HCM.'); }} className="hover:text-white transition-colors">Chính Sách Tồn Kho ATP</a></li>
              <li><a href="#returns" onClick={(e) => { e.preventDefault(); alert('Đổi trả miễn phí trong vòng 15 ngày kể từ ngày nhận hàng với tem mác nguyên vẹn.'); }} className="hover:text-white transition-colors">Đổi Trả Hàng 15 Ngày</a></li>
              <li><a href="#guide" onClick={(e) => { e.preventDefault(); alert('Bảng quy chuẩn size chuẩn quốc tế: S (50-60kg), M (60-70kg), L (70-80kg), XL (80-92kg).'); }} className="hover:text-white transition-colors">Hướng Dẫn Chọn Size Chuẩn</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); alert('Hotline hỗ trợ khách hàng: 1900 8888 (8:00 - 22:00 hàng ngày)'); }} className="hover:text-white transition-colors">Câu Hỏi Thường Gặp (FAQ)</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-300 mb-4">
              NHẬN BẢN TIN GAZU
            </h4>
            <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
              Đăng ký để nhận thông tin phát hành sớm các dòng giới hạn (Limited Drop) và mã ưu đãi 10%.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded-xs overflow-hidden">
                <input
                  type="email"
                  required
                  placeholder="Nhập email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-white bg-transparent outline-none placeholder:text-neutral-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2024 GAZU APPAREL ATELIER. BẢO LƯU MỌI BẢN QUYỀN.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 transition-colors">Điều khoản dịch vụ</span>
            <span>·</span>
            <span className="hover:text-neutral-300 transition-colors">Chính sách bảo mật</span>
            <span>·</span>
            <span className="hover:text-neutral-300 transition-colors">Tiêu chuẩn chất lượng ISO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
