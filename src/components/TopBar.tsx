import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Users,
  HelpCircle,
  Package,
  Smartphone,
  Settings,
  Globe,
  DollarSign,
  Check,
  Store,
  Building2,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    currency,
    setCurrency,
    language,
    setLanguage,
    setIsGroupBuyModalOpen,
    groupDiscountPercent,
    currentView,
    switchView,
  } = useStore();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Dropdown state for View Switcher (Hai phân hệ: Storefront & Enterprise Admin)
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const viewDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
      if (viewDropdownRef.current && !viewDropdownRef.current.contains(event.target as Node)) {
        setIsViewDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSettingsOpen(false);
        setIsViewDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full bg-[#111111] text-[#A3A3A3] text-[11px] tracking-wider uppercase font-medium border-b border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-1.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Free delivery notice or Enterprise Admin System status */}
        {currentView === 'admin' ? (
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold tracking-wider text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              [2. ENTERPRISE ADMIN] — QUẢN TRỊ DOANH NGHIỆP
            </span>
            <span className="text-neutral-600 hidden md:inline">|</span>
            <span className="text-neutral-400 hidden lg:inline text-[11px] normal-case">
              Đồng bộ 3 Hub: Bắc (Hà Nội) • Trung (Đà Nẵng) • Nam (TP.HCM)
            </span>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-2 text-neutral-300">
            <span>
              {language === 'vi'
                ? `MIỄN PHÍ VẬN CHUYỂN TỪ ${currency === 'VND' ? '₫999,000' : '$49'}`
                : `FREE DELIVERY ABOVE ${currency === 'VND' ? '₫999,000' : '$49'}`}
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              {language === 'vi' ? 'ATP TỒN KHO THỰC' : 'ATP LIVE INVENTORY'}
            </span>
          </div>
        )}

        {/* View Switcher: Dropdown chuyển đổi 2 Phân Hệ Hoàn Chỉnh */}
        <div className="relative" ref={viewDropdownRef}>
          <button
            type="button"
            onClick={() => setIsViewDropdownOpen(prev => !prev)}
            className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all cursor-pointer shadow-md select-none ${
              isViewDropdownOpen
                ? 'bg-neutral-800 border-amber-400 ring-2 ring-amber-500/40 text-white'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700/80 hover:border-amber-500/60 ring-1 ring-amber-500/25 text-neutral-200'
            }`}
            aria-haspopup="true"
            aria-expanded={isViewDropdownOpen}
            title="Chuyển đổi phân hệ (Dropdown): Storefront / Enterprise Admin"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
            <span className="text-[11px] font-black tracking-wider uppercase text-amber-400">
              View Switcher
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-transform duration-200 shrink-0 ${
                isViewDropdownOpen ? 'rotate-180 text-amber-400' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu Popup */}
          {isViewDropdownOpen && (
            <div
              className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-[340px] sm:w-[440px] max-w-[95vw] bg-neutral-950 border border-neutral-700/90 rounded-2xl shadow-2xl p-3 z-50 divide-y divide-neutral-800 animate-in fade-in slide-in-from-top-2 duration-150"
              role="dialog"
              aria-label="Menu chuyển đổi phân hệ hệ thống"
            >
              {/* Dropdown Header */}
              <div className="pb-2.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-white font-extrabold text-[11px] tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>CHUYỂN ĐỔI PHÂN HỆ HỆ THỐNG</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-normal normal-case mt-0.5">
                    Chuyển đổi tức thì giữa 2 phân hệ hoàn chỉnh phục vụ thuyết trình & kiểm thử
                  </p>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-widest font-bold">
                  2 Phân Hệ
                </span>
              </div>

              {/* 2 Options as Full Interactive Subsystem Cards */}
              <div className="py-2.5 space-y-2">
                {/* 1. STOREFRONT (GIAO DIỆN KHÁCH HÀNG) */}
                <button
                  type="button"
                  onClick={() => {
                    switchView('storefront');
                    setIsViewDropdownOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer group flex items-start gap-3 ${
                    currentView === 'storefront'
                      ? 'bg-neutral-900 border-white ring-1 ring-white/30 shadow-md'
                      : 'bg-neutral-900/50 border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      currentView === 'storefront'
                        ? 'bg-white text-black shadow-md'
                        : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    <Store className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[12px] font-extrabold tracking-wide ${currentView === 'storefront' ? 'text-white' : 'text-neutral-200'}`}>
                        [1. STOREFRONT (GIAO DIỆN KHÁCH HÀNG)]
                      </span>
                      {currentView === 'storefront' ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          ĐANG CHỌN
                        </span>
                      ) : (
                        <span className="text-[10px] text-neutral-400 group-hover:text-neutral-300 font-semibold uppercase">
                          Chọn phân hệ
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 font-normal normal-case leading-relaxed mt-1">
                      Giao diện thương mại điện tử cao cấp: Duyệt sản phẩm, tra cứu tồn kho thực ATP theo thời gian thực, mua sắm cùng bạn bè với Phòng Mua Chung Co-Shopping, giỏ hàng & thanh toán.
                    </p>
                  </div>
                </button>

                {/* 2. ENTERPRISE ADMIN (QUẢN TRỊ DOANH NGHIỆP) */}
                <button
                  type="button"
                  onClick={() => {
                    switchView('admin');
                    setIsViewDropdownOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer group flex items-start gap-3 ${
                    currentView === 'admin'
                      ? 'bg-neutral-900 border-amber-500 ring-1 ring-amber-500/40 shadow-md'
                      : 'bg-neutral-900/50 border-neutral-800 hover:bg-neutral-900 hover:border-amber-500/40'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      currentView === 'admin'
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-md font-bold'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[12px] font-extrabold tracking-wide ${currentView === 'admin' ? 'text-amber-400' : 'text-neutral-200'}`}>
                        [2. ENTERPRISE ADMIN (QUẢN TRỊ DOANH NGHIỆP)]
                      </span>
                      {currentView === 'admin' ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          ĐANG CHỌN
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-400/80 group-hover:text-amber-300 font-semibold uppercase">
                          Chọn phân hệ
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 font-normal normal-case leading-relaxed mt-1">
                      Hệ thống điều hành doanh nghiệp toàn diện: Điều phối tồn kho ATP 3 Tổng kho (Hà Nội, Đà Nẵng, TP.HCM), mô phỏng đặt hàng sỉ/lẻ, quản lý phòng mua chung, đơn hàng & sơ đồ kiến trúc kỹ thuật.
                    </p>
                  </div>
                </button>
              </div>

              {/* Dropdown Footer */}
              <div className="pt-2.5 flex items-center justify-between text-[10px] text-neutral-400 normal-case">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-neutral-300 font-medium">Đồng bộ dữ liệu hai chiều Real-time</span>
                </div>
                <span className="text-neutral-400 font-mono text-[9px]">GAZU Enterprise Core</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions, Group Room, & Gear (Bánh răng) Settings Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4 text-neutral-400">
          {currentView === 'admin' ? (
            <div className="hidden sm:flex items-center gap-2.5 text-[10px] text-neutral-400 font-mono">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                WMS 3 Hub: Live
              </span>
              <span className="text-neutral-700">|</span>
              <span className="text-neutral-300 font-semibold">Độ trễ: 12ms</span>
            </div>
          ) : (
            <>
              {/* Phòng Mua Chung highlight */}
              <button
                onClick={() => setIsGroupBuyModalOpen(true)}
                className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 transition-colors font-semibold group cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span>{language === 'vi' ? 'Phòng Mua Chung' : 'Co-Shopping Room'}</span>
                {groupDiscountPercent > 0 && (
                  <span className="bg-orange-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">
                    -{groupDiscountPercent}%
                  </span>
                )}
              </button>

              <span className="text-neutral-700 hidden sm:inline">|</span>

              <button
                onClick={() => alert('Ứng dụng GAZU iOS & Android đang được phát hành trên App Store & Google Play.')}
                className="hidden md:flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <Smartphone className="w-3 h-3" />
                <span>{language === 'vi' ? 'Tải App' : 'Download App'}</span>
              </button>

              <button
                onClick={() => alert('Vui lòng nhập mã đơn hàng của bạn vào hộp thoại Tra Cứu ở cuối trang.')}
                className="hidden sm:flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <Package className="w-3 h-3" />
                <span>{language === 'vi' ? 'Tra Cứu' : 'Track Order'}</span>
              </button>

              <button
                onClick={() => alert('Bộ phận Chăm Sóc Khách Hàng GAZU: Hotline 1900-8888 (8:00 - 22:00 hàng ngày)')}
                className="hidden sm:flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>{language === 'vi' ? 'Trợ Giúp' : 'Help'}</span>
              </button>
            </>
          )}

          <span className="text-neutral-700">|</span>

          {/* Unified Settings Gear (Bánh răng) Dropdown for Language and Currency */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`group flex items-center justify-center p-1.5 rounded border transition-all cursor-pointer shadow-xs ${
                isSettingsOpen
                  ? 'bg-neutral-800 border-neutral-500 text-white'
                  : 'bg-neutral-900 hover:bg-neutral-800 hover:text-white border-neutral-700 text-neutral-300'
              }`}
              title={language === 'vi' ? 'Cài đặt (Ngôn ngữ & Tiền tệ)' : 'Settings (Language & Currency)'}
              aria-label="Settings / Cài đặt"
              aria-expanded={isSettingsOpen}
              aria-haspopup="true"
            >
              {/* Bánh răng Icon duy nhất */}
              <Settings
                className={`w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300 ${
                  isSettingsOpen ? 'rotate-90 text-white' : ''
                }`}
              />
            </button>

            {/* Gear Settings Popup Menu */}
            {isSettingsOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-64 bg-neutral-950 border border-neutral-700 rounded-lg shadow-2xl p-3 z-50 animate-fadeIn divide-y divide-neutral-800"
                role="dialog"
                aria-label="Settings Popup"
              >
                {/* Header */}
                <div className="pb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-[11px] tracking-wider uppercase">
                    <Settings className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{language === 'vi' ? 'Tùy chọn hiển thị' : 'Display Settings'}</span>
                  </div>
                  <span className="text-[9px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded">
                    GAZU
                  </span>
                </div>

                {/* 1. Ngôn ngữ / Language Section */}
                <div className="py-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-semibold mb-2 uppercase tracking-wider">
                    <Globe className="w-3 h-3 text-neutral-400" />
                    <span>{language === 'vi' ? 'Ngôn ngữ' : 'Language'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setLanguage('vi')}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        language === 'vi'
                          ? 'bg-white text-black font-bold shadow-xs'
                          : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-xs">🇻🇳</span>
                        <span>Tiếng Việt</span>
                      </span>
                      {language === 'vi' && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        language === 'en'
                          ? 'bg-white text-black font-bold shadow-xs'
                          : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-xs">🇬🇧</span>
                        <span>English</span>
                      </span>
                      {language === 'en' && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </button>
                  </div>
                </div>

                {/* 2. Tiền tệ / Currency Section */}
                <div className="py-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-semibold mb-2 uppercase tracking-wider">
                    <DollarSign className="w-3 h-3 text-neutral-400" />
                    <span>{language === 'vi' ? 'Tiền tệ' : 'Currency'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCurrency('VND')}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        currency === 'VND'
                          ? 'bg-white text-black font-bold shadow-xs'
                          : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[10px]">₫</span>
                        <span>VND</span>
                      </span>
                      {currency === 'VND' && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrency('USD')}
                      className={`px-2.5 py-1.5 rounded text-[11px] font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        currency === 'USD'
                          ? 'bg-white text-black font-bold shadow-xs'
                          : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[10px]">$</span>
                        <span>USD</span>
                      </span>
                      {currency === 'USD' && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </button>
                  </div>
                </div>

                {/* Footer status tip */}
                <div className="pt-2 text-[9px] text-neutral-400 flex items-center justify-between">
                  <span>{language === 'vi' ? 'Tự động lưu tùy chọn' : 'Preferences auto-saved'}</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {language === 'vi' ? 'Sẵn sàng' : 'Active'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
