import React from 'react';
import { ASSET_IMAGES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const SecondaryBanner: React.FC = () => {
  const { setCategoryFilter, t } = useStore();

  const handleExplore = () => {
    setCategoryFilter('all');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#DCDCD8] border-b border-black/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[460px] gap-8">
          {/* Left Text Block */}
          <div className="py-12 lg:py-16 flex flex-col justify-center items-start">
            <span className="text-xs font-bold tracking-[0.25em] text-neutral-800 uppercase mb-3">
              {t('sec_new_season')}
            </span>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.03em] text-black leading-[1.05] uppercase whitespace-pre-line">
              {t('sec_new_vibes')}
            </h2>

            <p className="text-sm sm:text-base text-neutral-700 mt-4 mb-8 font-normal max-w-md">
              {t('sec_desc')}
            </p>

            <button
              onClick={handleExplore}
              className="px-8 py-3.5 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              <span>{t('sec_cta')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Image Block */}
          <div className="relative h-full flex justify-end items-end self-end">
            <div className="w-full max-w-[520px] max-h-[460px] overflow-hidden rounded-t-xs">
              <img
                src={ASSET_IMAGES.secondaryVibes}
                alt="GAZU New Season Editorial Campaign Portrait"
                className="w-full h-full object-cover object-center filter contrast-[1.03]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
