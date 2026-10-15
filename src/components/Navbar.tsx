import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, User, Heart, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenLogin }) => {
  const {
    categoryFilter,
    setCategoryFilter,
    wishlist,
    setIsAiStylistOpen,
    goHome,
    t,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'men', label: t('nav_men') },
    { id: 'women', label: t('nav_women') },
    { id: 'kids', label: t('nav_kids') },
    { id: 'beauty', label: t('nav_beauty') },
  ];

  const handleCategoryClick = (catId: string) => {
    goHome();
    setCategoryFilter(catId);
    setTimeout(() => {
      const element = document.getElementById('catalog-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-[#F4F4F2] border-b border-black/8 transition-all backdrop-blur-xs">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Zone 1: Category Navigation (Desktop) / Hamburger (Mobile) */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-black hover:opacity-70 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-neutral-800">
            {categories.map((cat) => {
              const isActive = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`relative py-1 uppercase transition-colors cursor-pointer hover:text-black ${
                    isActive ? 'text-black font-extrabold' : 'text-neutral-700'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Zone 2: Brand Wordmark (Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
            className="font-display font-black text-3xl md:text-4xl tracking-[-0.04em] text-black hover:opacity-90 transition-opacity select-none cursor-pointer"
          >
            GAZU
          </a>
        </div>

        {/* Zone 3: Interactive Affordances (Search, AI Stylist, Login, Wishlist, Cart) */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs font-semibold tracking-wider text-neutral-900">
          {/* AI Stylist Button with Emerald Accent */}
          <button
            onClick={() => setIsAiStylistOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 transition-all cursor-pointer shadow-2xs"
            title="Open AI Outfit Advisor"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span className="hidden sm:inline font-bold">{t('nav_ai_stylist')}</span>
          </button>

          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer py-1"
            title={t('nav_search')}
          >
            <Search className="w-4 h-4" />
            <span className="hidden xl:inline">{t('nav_search')}</span>
          </button>

          {/* Login */}
          <button
            onClick={onOpenLogin}
            className="hidden sm:flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer py-1"
            title={t('nav_login')}
          >
            <User className="w-4 h-4" />
            <span className="hidden xl:inline">{t('nav_login')}</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer py-1 relative"
            title={t('nav_wishlist')}
          >
            <Heart className="w-4 h-4" />
            <span className="hidden xl:inline">{t('nav_wishlist')}</span>
            {wishlist.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#F4F4F2] border-b border-black/10 px-6 py-4 flex flex-col gap-3 animate-fadeIn">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="text-left py-2 font-bold text-sm tracking-wider uppercase hover:text-black flex items-center justify-between"
            >
              <span>{cat.label}</span>
              <span className="text-neutral-400">→</span>
            </button>
          ))}
          <div className="pt-3 border-t border-black/10 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="font-semibold text-neutral-700"
            >
              {t('nav_account')}
            </button>
            <button
              onClick={() => {
                setIsAiStylistOpen(true);
                setMobileMenuOpen(false);
              }}
              className="font-bold text-emerald-700 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Stylist Advisor
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
