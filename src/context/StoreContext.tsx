import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Currency, Language, GroupBuyRoom, ActiveView } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { translations, TranslationKey } from '../data/translations';

interface StoreContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: TranslationKey) => string;
  formatPrice: (priceVND: number, priceUSD: number) => string;
  
  // View Switcher (Presentation Mode)
  currentView: ActiveView;
  setCurrentView: (view: ActiveView) => void;
  switchView: (view: ActiveView) => void;

  products: Product[];
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: string, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotalVND: number;
  subtotalUSD: number;
  discountVND: number;
  discountUSD: number;
  totalVND: number;
  totalUSD: number;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAiStylistOpen: boolean;
  setIsAiStylistOpen: (open: boolean) => void;
  isGroupBuyModalOpen: boolean;
  setIsGroupBuyModalOpen: (open: boolean) => void;
  atpModalProduct: Product | null;
  setAtpModalProduct: (prod: Product | null) => void;
  
  // Group Buying Room (Phòng Mua Chung)
  groupRoom: GroupBuyRoom;
  isGroupBuyActive: boolean;
  toggleGroupBuyMode: () => void;
  simulateAddCoShopper: () => void;
  groupDiscountPercent: number;
  
  // Navigation to Product Detail Page
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  viewProduct: (productId: string) => void;
  goHome: () => void;

  // Toast
  toast: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_ROOM: GroupBuyRoom = {
  id: 'room-gazu-88',
  code: 'GAZU-ROOM-88',
  hostName: 'Nam Nguyễn (Host)',
  expiresInSeconds: 3540, // 59 mins
  members: [
    { id: 'm1', name: 'Nam Nguyễn', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60', itemsCount: 1, joinedAt: 'Vừa xong' },
    { id: 'm2', name: 'Hoàng Minh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60', itemsCount: 1, joinedAt: '3 phút trước' },
  ],
  targetItems: 2,
  discountTier: 5, // 2 items = 5% off
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('VND');
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('gazu_lang');
      return saved === 'en' || saved === 'vi' ? saved : 'vi';
    } catch {
      return 'vi';
    }
  });
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gazu_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gazu_wishlist');
      return saved ? JSON.parse(saved) : ['gazu-01', 'gazu-08'];
    } catch {
      return ['gazu-01', 'gazu-08'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiStylistOpen, setIsAiStylistOpen] = useState(false);
  const [isGroupBuyModalOpen, setIsGroupBuyModalOpen] = useState(false);
  const [atpModalProduct, setAtpModalProduct] = useState<Product | null>(null);

  // View Switcher for Presentation between Storefront and Enterprise Admin
  const [currentView, setCurrentView] = useState<ActiveView>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('view');
      if (v === 'admin' || v === 'enterprise') return 'admin';
      const hash = window.location.hash;
      if (hash === '#admin' || hash === '#enterprise') return 'admin';
    } catch (e) {
      console.error(e);
    }
    return 'storefront';
  });

  const switchView = (view: ActiveView) => {
    setCurrentView(view);
    try {
      const url = new URL(window.location.href);
      if (view === 'admin') {
        url.searchParams.set('view', 'admin');
      } else {
        url.searchParams.delete('view');
      }
      window.history.pushState({}, '', url.toString());
    } catch (e) {
      console.error(e);
    }
    showToast(
      view === 'admin'
        ? (language === 'vi'
            ? '⚡ Đã chuyển sang: [2. ENTERPRISE ADMIN (QUẢN TRỊ DOANH NGHIỆP)]'
            : '⚡ Switched to: [2. ENTERPRISE ADMIN]')
        : (language === 'vi'
            ? '🛍️ Đã chuyển sang: [1. STOREFRONT (GIAO DIỆN KHÁCH HÀNG)]'
            : '🛍️ Switched to: [1. STOREFRONT]')
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Selected Product for Dedicated Product Detail Page
  const [selectedProductId, setSelectedProductId] = useState<string | null>(() => {
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#product-')) {
        return hash.replace('#product-', '');
      }
      const params = new URLSearchParams(window.location.search);
      const p = params.get('product');
      if (p) return p;
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const viewProduct = (productId: string) => {
    setSelectedProductId(productId);
    try {
      window.location.hash = `product-${productId}`;
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setSelectedProductId(null);
    try {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync hash back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#product-')) {
        setSelectedProductId(hash.replace('#product-', ''));
      } else {
        setSelectedProductId(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const [groupRoom, setGroupRoom] = useState<GroupBuyRoom>(INITIAL_ROOM);
  const [isGroupBuyActive, setIsGroupBuyActive] = useState<boolean>(true);
  const [toast, setToast] = useState<string | null>(null);

  // Sync localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gazu_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gazu_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Countdown timer for Group Buying room
  useEffect(() => {
    const timer = setInterval(() => {
      setGroupRoom(prev => ({
        ...prev,
        expiresInSeconds: prev.expiresInSeconds > 0 ? prev.expiresInSeconds - 1 : 3600
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const formatPrice = (priceVND: number, priceUSD: number): string => {
    if (currency === 'VND') {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
      }).format(priceVND);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(priceUSD);
  };

  const addToCart = (product: Product, size?: string, color?: string, qty = 1) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity: qty,
        }
      ];
    });

    // Update group room item count if group buy mode is on
    if (isGroupBuyActive) {
      setGroupRoom(prev => {
        const newTotal = prev.targetItems + qty;
        let tier = 0;
        if (newTotal >= 5) tier = 25;
        else if (newTotal >= 3) tier = 15;
        else if (newTotal >= 2) tier = 5;
        return {
          ...prev,
          targetItems: newTotal,
          discountTier: tier,
        };
      });
    }

    showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const updateQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Đã bỏ thích sản phẩm');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Đã lưu vào danh sách yêu thích');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Group Buy Discount Calculation
  // Tier 1 (2 items): 5% off
  // Tier 2 (3-4 items): 15% off
  // Tier 3 (5+ items): 25% off
  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  const combinedGroupItems = isGroupBuyActive ? groupRoom.targetItems + totalItemsInCart : totalItemsInCart;

  let groupDiscountPercent = 0;
  if (isGroupBuyActive) {
    if (combinedGroupItems >= 5) groupDiscountPercent = 25;
    else if (combinedGroupItems >= 3) groupDiscountPercent = 15;
    else if (combinedGroupItems >= 2) groupDiscountPercent = 5;
  }

  const subtotalVND = cart.reduce((sum, item) => sum + item.product.priceVND * item.quantity, 0);
  const subtotalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);

  const discountVND = Math.round((subtotalVND * groupDiscountPercent) / 100);
  const discountUSD = Math.round((subtotalUSD * groupDiscountPercent) / 100);

  const totalVND = Math.max(0, subtotalVND - discountVND);
  const totalUSD = Math.max(0, subtotalUSD - discountUSD);

  const toggleGroupBuyMode = () => {
    setIsGroupBuyActive(prev => {
      const next = !prev;
      showToast(next ? 'Đã kích hoạt chế độ Phòng Mua Chung (Giảm tới 25%)' : 'Đã tắt chế độ Phòng Mua Chung');
      return next;
    });
  };

  const simulateAddCoShopper = () => {
    const mockNames = ['Linh Đan', 'Quốc Bảo', 'Khánh Vy', 'Minh Trí', 'Ánh Tuyết'];
    const chosenName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const newMember = {
      id: `m-${Date.now()}`,
      name: chosenName,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 100)}?w=80&auto=format&fit=crop&q=60`,
      itemsCount: 1,
      joinedAt: 'Vừa tham gia'
    };

    setGroupRoom(prev => {
      const newItems = prev.targetItems + 1;
      let tier = 0;
      if (newItems >= 5) tier = 25;
      else if (newItems >= 3) tier = 15;
      else if (newItems >= 2) tier = 5;

      return {
        ...prev,
        members: [newMember, ...prev.members],
        targetItems: newItems,
        discountTier: tier,
      };
    });

    showToast(`🎉 ${chosenName} vừa tham gia phòng mua chung!`);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('gazu_lang', lang);
    } catch (e) {
      console.error(e);
    }
    showToast(lang === 'vi' ? 'Đã đổi ngôn ngữ sang Tiếng Việt (VI)' : 'Language switched to English (EN)');
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.vi[key] || key;
  };

  return (
    <StoreContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        t,
        formatPrice,
        products,
        categoryFilter,
        setCategoryFilter,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount: totalItemsInCart,
        subtotalVND,
        subtotalUSD,
        discountVND,
        discountUSD,
        totalVND,
        totalUSD,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isAiStylistOpen,
        setIsAiStylistOpen,
        isGroupBuyModalOpen,
        setIsGroupBuyModalOpen,
        atpModalProduct,
        setAtpModalProduct,
        groupRoom,
        isGroupBuyActive,
        toggleGroupBuyMode,
        simulateAddCoShopper,
        groupDiscountPercent,
        selectedProductId,
        setSelectedProductId,
        viewProduct,
        goHome,
        currentView,
        setCurrentView,
        switchView,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
