import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryStrip } from './components/CategoryStrip';
import { SecondaryBanner } from './components/SecondaryBanner';
import { GroupBuyLiveBar } from './components/GroupBuyLiveBar';
import { ValueProps } from './components/ValueProps';
import { ProductSection } from './components/ProductSection';
import { ProductDetailPage } from './components/ProductDetailPage';
import { EnterpriseAdmin } from './components/EnterpriseAdmin';
import { Footer } from './components/Footer';

import { AtpModal } from './components/AtpModal';
import { GroupBuyModal } from './components/GroupBuyModal';
import { AiStylistDrawer } from './components/AiStylistDrawer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { toast, selectedProductId, currentView } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div
      className={`w-full ${
        currentView === 'admin' ? 'h-screen overflow-hidden' : 'min-h-screen'
      } bg-[#F4F4F2] text-[#111111] flex flex-col selection:bg-black selection:text-white`}
    >
      {/* 1. Fixed Top System Bar containing the View Switcher */}
      <div className="shrink-0 z-40 w-full shadow-xs">
        <TopBar />
        {/* Only render customer navigation header when in Storefront mode */}
        {currentView === 'storefront' && (
          <Navbar
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenLogin={() => setIsLoginOpen(true)}
          />
        )}
      </div>

      {/* Main Content Area: Switch between Enterprise Admin and Customer Storefront */}
      <main className={`flex-1 min-h-0 w-full ${currentView === 'admin' ? 'overflow-hidden flex flex-col' : ''}`}>
        {currentView === 'admin' ? (
          <EnterpriseAdmin />
        ) : selectedProductId ? (
          <ProductDetailPage productId={selectedProductId} />
        ) : (
          <>
            {/* 3. Editorial Hero with Dynamic Backdrop Typography */}
            <Hero />

            {/* 4. Dark Category Strip (Full-Width #111111) */}
            <CategoryStrip />

            {/* 5. Secondary Campaign Banner ("NEW SEASON / NEW VIBES") */}
            <SecondaryBanner />

            {/* 6. Real-Time Phòng Mua Chung Live Co-Shopping Bar */}
            <GroupBuyLiveBar />

            {/* 7. Value Propositions Ribbon (Delivery, Return, Quality, Security) */}
            <ValueProps />

            {/* 8. "BEST OF GAZU" Curated Product Catalog Grid */}
            <ProductSection />
          </>
        )}
      </main>

      {/* 9. Comprehensive Desktop-First Footer (Rendered in Storefront mode) */}
      {currentView === 'storefront' && <Footer />}

      {/* Interactive Overlays & Drawers */}
      <AtpModal />
      <GroupBuyModal />
      <AiStylistDrawer />
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
