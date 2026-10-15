import React from 'react';
import { ASSET_IMAGES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const CategoryStrip: React.FC = () => {
  const { setCategoryFilter, t } = useStore();

  const categories = [
    {
      id: 'men',
      name: t('cat_men_title'),
      tagline: t('cat_men_desc'),
      cta: t('cat_men_cta'),
      image: ASSET_IMAGES.menCategory,
    },
    {
      id: 'women',
      name: t('cat_women_title'),
      tagline: t('cat_women_desc'),
      cta: t('cat_women_cta'),
      image: ASSET_IMAGES.womenCategory,
    },
    {
      id: 'kids',
      name: t('cat_kids_title'),
      tagline: t('cat_kids_desc'),
      cta: t('cat_kids_cta'),
      image: ASSET_IMAGES.kidsCategory,
    },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setCategoryFilter(categoryId);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#111111] text-white py-12 border-y border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`flex items-center gap-5 cursor-pointer group transition-all duration-200 ${
                idx > 0 ? 'pt-6 md:pt-0 md:pl-8 lg:pl-12' : ''
              }`}
            >
              {/* Category Thumbnail */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xs overflow-hidden bg-neutral-900 border border-neutral-700">
                <img
                  src={cat.image}
                  alt={`${cat.name} category showcase`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col justify-center">
                <h3 className="font-display font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 mb-2 font-normal leading-relaxed">
                  {cat.tagline}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-neutral-300 group-hover:text-white transition-colors">
                  <span>{cat.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
