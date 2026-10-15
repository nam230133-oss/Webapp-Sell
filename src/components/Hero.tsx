import React from 'react';
import { ASSET_IMAGES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCategoryFilter, t } = useStore();

  const handleShopNow = () => {
    setCategoryFilter('all');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreNewIn = () => {
    setCategoryFilter('men');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#F4F4F2] relative overflow-hidden pt-8 pb-16 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative min-h-[520px] lg:min-h-[640px] flex flex-col justify-between">
        
        {/* Top Kicker (Left): Editorial Tagline */}
        <div className="z-20 max-w-xs">
          <p className="text-[11px] lg:text-xs font-bold tracking-[0.22em] uppercase text-neutral-800 leading-relaxed whitespace-pre-line">
            {t('hero_tagline_1')}<br />
            {t('hero_tagline_2')}<br />
            {t('hero_tagline_3')}
          </p>
          <div className="w-12 h-[1px] bg-neutral-900 mt-2"></div>
        </div>

        {/* Giant Typographic Backdrop: "S" on the left of model, "F" on the right of model */}
        <div 
          className="absolute inset-0 flex items-center justify-between pointer-events-none select-none z-0 px-6 sm:px-14 md:px-20 lg:px-28 xl:px-36"
          aria-hidden="true"
        >
          <span className="font-display font-black text-[24vw] sm:text-[26vw] lg:text-[280px] xl:text-[320px] leading-none tracking-[-0.05em] text-neutral-900 opacity-95">
            S
          </span>
          <span className="font-display font-black text-[24vw] sm:text-[26vw] lg:text-[280px] xl:text-[320px] leading-none tracking-[-0.05em] text-neutral-900 opacity-95">
            F
          </span>
        </div>

        {/* Walking Editorial Model Image Layered Centrally */}
        <div className="relative z-10 flex justify-center items-center my-4 lg:my-0 lg:absolute lg:inset-x-0 lg:top-[-20px] lg:bottom-0 pointer-events-none">
          <div className="relative max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] pointer-events-auto">
            <img
              src={ASSET_IMAGES.heroModel}
              alt="S-FASHION Collection Editorial Model in Trench Coat"
              className="w-full h-auto object-contain filter drop-shadow-2xl select-none"
              loading="eager"
            />
          </div>
        </div>

        {/* Bottom Split Controls: CTAs (Left) and New Collection Tag (Right) */}
        <div className="z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pt-8">
          {/* Left CTAs */}
          <div className="flex items-center gap-6">
            <button
              onClick={handleShopNow}
              className="px-8 py-3.5 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all cursor-pointer shadow-md active:scale-95"
            >
              {t('hero_shop_now')}
            </button>
            <button
              onClick={handleExploreNewIn}
              className="text-xs font-bold tracking-widest uppercase text-neutral-900 border-b border-black pb-0.5 hover:opacity-70 transition-opacity cursor-pointer"
            >
              {t('hero_explore_new_in')}
            </button>
          </div>

          {/* Right Label: New Collection 2024 */}
          <div className="text-right sm:self-end">
            <p className="text-[11px] lg:text-xs font-bold tracking-[0.2em] uppercase text-neutral-800 leading-tight whitespace-pre-line">
              {t('hero_new_collection')}
            </p>
            <div className="w-10 h-[1px] bg-neutral-900 mt-2 ml-auto"></div>
          </div>
        </div>

      </div>
    </section>
  );
};
