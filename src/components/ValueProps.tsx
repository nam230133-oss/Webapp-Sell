import React from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, RotateCcw, ShieldCheck, Lock } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const { t } = useStore();

  const props = [
    {
      icon: Truck,
      title: t('vp_fast_delivery'),
      desc: t('vp_fast_delivery_desc'),
    },
    {
      icon: RotateCcw,
      title: t('vp_easy_returns'),
      desc: t('vp_easy_returns_desc'),
    },
    {
      icon: ShieldCheck,
      title: t('vp_quality'),
      desc: t('vp_quality_desc'),
    },
    {
      icon: Lock,
      title: t('vp_secure'),
      desc: t('vp_secure_desc'),
    },
  ];

  return (
    <section className="w-full bg-[#F4F4F2] border-b border-black/8 py-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {props.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xs bg-neutral-200/70 border border-neutral-300 flex items-center justify-center shrink-0 text-black">
                  <Icon className="w-5 h-5 stroke-[1.6]" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-xs tracking-wider text-black uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
