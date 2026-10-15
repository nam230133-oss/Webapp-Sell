import React from 'react';
import { useStore } from '../context/StoreContext';
import { Users, Clock, Flame, ChevronRight, UserPlus, Sparkles } from 'lucide-react';

export const GroupBuyLiveBar: React.FC = () => {
  const {
    groupRoom,
    isGroupBuyActive,
    toggleGroupBuyMode,
    setIsGroupBuyModalOpen,
    simulateAddCoShopper,
    groupDiscountPercent,
    t,
  } = useStore();

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTierProgress = () => {
    const items = groupRoom.targetItems;
    if (items >= 5) return 100;
    if (items >= 3) return 60 + ((items - 3) / 2) * 40;
    if (items >= 2) return 25 + ((items - 2) / 1) * 35;
    return (items / 2) * 25;
  };

  return (
    <div className="w-full bg-gradient-to-r from-orange-950 via-neutral-900 to-orange-950 text-white border-b border-orange-500/30 py-3.5 transition-all">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Room Status & Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-orange-600 text-white px-2.5 py-1 rounded text-xs font-black tracking-wider uppercase shadow-xs">
            <Flame className="w-4 h-4 fill-white" />
            <span>{t('gb_title')}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-orange-200 font-medium">
            <span className="font-bold text-white font-mono bg-neutral-800 px-2 py-0.5 rounded border border-orange-500/30">
              #{groupRoom.code}
            </span>
            <span className="hidden sm:inline">· {t('gb_host')}: {groupRoom.hostName}</span>
          </div>

          {/* Member avatars */}
          <div className="flex items-center -space-x-2 ml-1">
            {groupRoom.members.slice(0, 4).map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                title={member.name}
                className="w-7 h-7 rounded-full border-2 border-orange-600 object-cover"
              />
            ))}
            {groupRoom.members.length > 4 && (
              <span className="w-7 h-7 rounded-full bg-orange-800 border-2 border-orange-600 text-[10px] flex items-center justify-center font-bold">
                +{groupRoom.members.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Center: Live Discount Tier Progress */}
        <div className="flex-1 max-w-md w-full px-2">
          <div className="flex justify-between items-center text-[11px] mb-1">
            <span className="text-orange-300 font-semibold flex items-center gap-1">
              {t('gb_pooled_items')}: <strong className="text-white font-mono text-xs">{groupRoom.targetItems} {t('gb_items')}</strong>
            </span>
            <span className="text-orange-400 font-bold">
              {groupDiscountPercent > 0 ? `${t('gb_current_discount')}: -${groupDiscountPercent}%` : t('gb_tier_target')}
            </span>
          </div>
          
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700 relative">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 rounded-full"
              style={{ width: `${getTierProgress()}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
            <span className={groupRoom.targetItems >= 2 ? 'text-amber-400 font-bold' : ''}>{t('gb_tier_1')}</span>
            <span className={groupRoom.targetItems >= 3 ? 'text-amber-400 font-bold' : ''}>{t('gb_tier_2')}</span>
            <span className={groupRoom.targetItems >= 5 ? 'text-amber-400 font-bold' : ''}>{t('gb_tier_3')}</span>
          </div>
        </div>

        {/* Right: Timer & Interactive Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-neutral-300 bg-neutral-800/80 px-2.5 py-1 rounded border border-neutral-700 font-mono">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>{formatTimer(groupRoom.expiresInSeconds)}</span>
          </div>

          {/* Quick simulation button to see co-shopping dynamics */}
          <button
            onClick={simulateAddCoShopper}
            className="hidden lg:flex items-center gap-1 bg-neutral-800 hover:bg-neutral-700 text-orange-300 text-xs px-2.5 py-1 rounded border border-orange-500/30 transition-colors cursor-pointer"
            title="Mô phỏng bạn bè tham gia phòng để tăng mức giảm giá"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t('gb_simulate')}</span>
          </button>

          {/* Open Full Group Room Modal */}
          <button
            onClick={() => setIsGroupBuyModalOpen(true)}
            className="flex items-center gap-1 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <span>{t('gb_join_btn')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
