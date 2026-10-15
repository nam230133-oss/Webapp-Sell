import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Building2,
  Package,
  Layers,
  TrendingUp,
  Users,
  Warehouse,
  ShieldCheck,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Store,
  Truck,
  Database,
  Sliders,
  DollarSign,
  Clock,
  Sparkles,
  BarChart3,
  Server,
  Zap,
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  FileText,
  Settings,
  Bell,
  ChevronRight,
  ChevronDown,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Printer,
  Share2,
  MapPin,
  Eye,
  Menu,
  X,
  CreditCard,
  Send,
  Boxes,
  HelpCircle,
  Star,
  MessageSquare,
} from 'lucide-react';

export const EnterpriseAdmin: React.FC = () => {
  const {
    products,
    formatPrice,
    groupRoom,
    simulateAddCoShopper,
    switchView,
    showToast,
    language,
    currency,
  } = useStore();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'groupbuy' | 'products' | 'architecture'>('dashboard');
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState<'all' | 'hn' | 'dn' | 'hcm'>('all');
  const [orderFilter, setOrderFilter] = useState<'all' | 'processing' | 'shipping' | 'completed'>('all');
  const [timeRange, setTimeRange] = useState<'today' | '7days' | 'month'>('month');
  const [chartMetric, setChartMetric] = useState<'revenue' | 'orders'>('revenue');
  const [chartTimeframe, setChartTimeframe] = useState<'7days' | '30days' | 'year'>('30days');

  // Sidebar toggle on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Notifications dropdown
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  // Feedback & Help modal states
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  // Transfer stock modal state
  const [transferModal, setTransferModal] = useState<{
    isOpen: boolean;
    productName: string;
    fromHub: string;
    toHub: string;
    quantity: number;
  }>({
    isOpen: false,
    productName: '',
    fromHub: 'Kho Nam (TP. HCM)',
    toHub: 'Kho Bắc (Hà Nội)',
    quantity: 20,
  });

  // Interactive ATP simulation states
  const [simulatedStockDelta, setSimulatedStockDelta] = useState<Record<string, number>>({});

  // Sample live orders for demonstration
  const [orders, setOrders] = useState([
    {
      id: 'ORD-98214',
      customer: 'Lê Hoàng Nam',
      phone: '0903***789',
      items: 'Adidas Ultraboost Light Running (41 / ADI-UB-BLK-41)',
      totalVND: 3400000,
      totalUSD: 136,
      hub: 'Kho Bắc (Hà Nội)',
      status: 'shipping' as const,
      time: '2 phút trước',
      type: 'Phòng Mua Chung (-25%)',
      payment: 'VietQR Pro',
    },
    {
      id: 'ORD-98213',
      customer: 'Trần Thị Mỹ Duyên',
      phone: '0912***456',
      items: "Nike Air Force 1 '07 Low White (41 / NIK-AF1-WHT-41)",
      totalVND: 2920000,
      totalUSD: 117,
      hub: 'Kho Nam (TP. HCM)',
      status: 'processing' as const,
      time: '6 phút trước',
      type: 'Phòng Mua Chung (-25%)',
      payment: 'Thẻ Quốc Tế Visa',
    },
    {
      id: 'ORD-98212',
      customer: 'Nguyễn Tiến Đạt',
      phone: '0988***231',
      items: 'Puma Suede Classic XXI Sneakers (40 / PUM-SUE-BLK-40)',
      totalVND: 2150000,
      totalUSD: 86,
      hub: 'Kho Trung (Đà Nẵng)',
      status: 'completed' as const,
      time: '14 phút trước',
      type: 'Phòng Mua Chung (-25%)',
      payment: 'Ví MoMo',
    },
    {
      id: 'ORD-98211',
      customer: 'Phạm Quỳnh Anh',
      phone: '0975***888',
      items: 'Adidas Firebird Tracksuit Jacket (M / ADI-JK-BLK-M)',
      totalVND: 1950000,
      totalUSD: 78,
      hub: 'Kho Nam (TP. HCM)',
      status: 'processing' as const,
      time: '22 phút trước',
      type: 'Phòng Mua Chung (-25%)',
      payment: 'COD Khi Nhận Hàng',
    },
    {
      id: 'ORD-98210',
      customer: 'Vũ Minh Đức',
      phone: '0934***112',
      items: 'Nike Pro Dri-FIT Heavyweight Tee (L / NIK-TEE-WHT-L)',
      totalVND: 890000,
      totalUSD: 36,
      hub: 'Kho Bắc (Hà Nội)',
      status: 'completed' as const,
      time: '35 phút trước',
      type: 'Phòng Mua Chung (-25%)',
      payment: 'VietQR Pro',
    },
  ]);

  // Notifications list
  const notifications = [
    { id: 1, title: 'Đơn hàng mới từ Phòng Mua Chung', desc: 'Lê Hoàng Nam vừa chốt đôi Adidas Ultraboost Light (-25%)', time: '2 phút trước', read: false },
    { id: 2, title: 'Cảnh báo tồn kho ATP Hà Nội', desc: 'Sản phẩm Nike Brasilia Backpack tại Kho Bắc sắp chạm ngưỡng (< 5 đơn vị)', time: '10 phút trước', read: false },
    { id: 3, title: 'Thành viên mới vào phòng mua chung', desc: 'Hoàng Yến đã tham gia phòng GAZU-ROOM-88', time: '18 phút trước', read: true },
    { id: 4, title: 'Đã hoàn tất gom đơn WMS', desc: '22 kiện hàng Nike AF1 & Puma Suede đã bàn giao đơn vị hỏa tốc 2H', time: '40 phút trước', read: true },
  ];

  // Simulated large wholesale order
  const handleSimulateLargeOrder = (productId: string) => {
    setSimulatedStockDelta(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) - 15,
    }));
    showToast(`⚡ Mô phỏng đơn hàng sỉ: -15 ATP cho mã ${productId}. Hệ thống tự động re-calculate tồn kho khả dụng!`);
  };

  // Open transfer modal
  const handleOpenTransfer = (productName: string) => {
    setTransferModal({
      isOpen: true,
      productName,
      fromHub: 'Kho Nam (TP. HCM)',
      toHub: 'Kho Bắc (Hà Nội)',
      quantity: 20,
    });
  };

  // Execute transfer
  const handleExecuteTransfer = () => {
    setTransferModal(prev => ({ ...prev, isOpen: false }));
    showToast(`🔄 Lệnh điều chuyển nội bộ hoàn tất: ${transferModal.quantity} đơn vị "${transferModal.productName}" từ ${transferModal.fromHub} sang ${transferModal.toHub}.`);
  };

  // Add demo order for live presentation
  const handleAddDemoOrder = () => {
    const newOrd = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customer: 'Khách hàng Demo Thuyết Trình',
      phone: '0989***999',
      items: 'Sản phẩm GAZU Demo Best Seller',
      totalVND: 1250000,
      totalUSD: 50,
      hub: 'Kho Bắc (Hà Nội)',
      status: 'processing' as const,
      time: 'Vừa xong',
      type: 'Phòng Mua Chung (-25%)',
      payment: 'Chuyển khoản QR 24/7',
    };
    setOrders([newOrd, ...orders]);
    showToast(`✅ Đã tạo đơn hàng demo ${newOrd.id} chuyển đến WMS Kho Bắc.`);
  };

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  // Calculate real-time ATP for each product and warehouse
  const calculateProductATP = (product: (typeof products)[0]) => {
    const delta = simulatedStockDelta[product.id] || 0;
    const hnBase = product.warehouses?.find(w => w.hub.includes('Hà Nội'))?.atp ?? product.warehouses?.[0]?.atp ?? 12;
    const dnBase = product.warehouses?.find(w => w.hub.includes('Đà Nẵng'))?.atp ?? product.warehouses?.[1]?.atp ?? 8;
    const hcmBase = product.warehouses?.find(w => w.hub.includes('TP. HCM'))?.atp ?? product.warehouses?.[2]?.atp ?? 18;

    const hnStock = Math.max(0, hnBase + Math.floor(delta * 0.4));
    const dnStock = Math.max(0, dnBase + Math.floor(delta * 0.2));
    const hcmStock = Math.max(0, hcmBase + Math.floor(delta * 0.4));
    const totalAtp = Math.max(0, hnStock + dnStock + hcmStock);

    return { hnStock, dnStock, hcmStock, totalAtp };
  };

  // Actual product (SKU) counts with stock > 0
  const warehouseProductCounts = {
    all: products.filter(p => calculateProductATP(p).totalAtp > 0).length,
    hn: products.filter(p => calculateProductATP(p).hnStock > 0).length,
    dn: products.filter(p => calculateProductATP(p).dnStock > 0).length,
    hcm: products.filter(p => calculateProductATP(p).hcmStock > 0).length,
  };

  // Actual physical available stock units
  const warehouseTotalUnits = {
    all: products.reduce((acc, p) => acc + calculateProductATP(p).totalAtp, 0),
    hn: products.reduce((acc, p) => acc + calculateProductATP(p).hnStock, 0),
    dn: products.reduce((acc, p) => acc + calculateProductATP(p).dnStock, 0),
    hcm: products.reduce((acc, p) => acc + calculateProductATP(p).hcmStock, 0),
  };

  // Filter inventory products by search & selected warehouse
  const filteredInventoryProducts = products.filter(product => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        product.name.toLowerCase().includes(q) ||
        product.id.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);
      if (!match) return false;
    }

    const { hnStock, dnStock, hcmStock, totalAtp } = calculateProductATP(product);
    if (selectedWarehouseFilter === 'hn') {
      return hnStock > 0;
    }
    if (selectedWarehouseFilter === 'dn') {
      return dnStock > 0;
    }
    if (selectedWarehouseFilter === 'hcm') {
      return hcmStock > 0;
    }
    return totalAtp > 0;
  });

  // Dynamic KPI metrics matching the active function / tab (with Salleist highlight trends and subtexts)
  const getTabKpis = () => {
    switch (activeTab) {
      case 'inventory':
        return [
          {
            title: 'Tổng Tồn Kho ATP',
            value: `${warehouseTotalUnits.all.toLocaleString()} đơn vị`,
            icon: Warehouse,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            trend: '100% Khả dụng',
            subtext: 'Tại 3 tổng kho chiến lược',
          },
          {
            title: 'Tổng Số Mặt Hàng (SKU)',
            value: `${warehouseProductCounts.all} SKU`,
            icon: Package,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            trend: '+12 SKU mới',
            subtext: 'Thời trang nam/nữ GAZU',
          },
          {
            title: 'Tồn Kho Lớn Nhất (HCM)',
            value: `${warehouseTotalUnits.hcm.toLocaleString()} đơn vị`,
            icon: TrendingUp,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600',
            trend: 'Hub miền Nam',
            subtext: 'SLA hỏa tốc giao 2H',
          },
          {
            title: 'Cảnh Báo Hết Hàng',
            value: '0 SKU',
            icon: ShieldCheck,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            trend: 'An toàn 100%',
            subtext: 'Không có SKU cạn kho',
          },
        ];
      case 'orders':
        return [
          {
            title: 'Tổng Số Đơn Hàng',
            value: `${orders.length} Đơn`,
            icon: Truck,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600',
            trend: '+8.4% tuần này',
            subtext: 'Tự động điều phối 3 Hub',
          },
          {
            title: 'Đơn Đang Xử Lý',
            value: `${orders.filter(o => o.status === 'processing').length} Đơn`,
            icon: Clock,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            trend: 'Đang soạn kho',
            subtext: 'Đã khóa tồn kho ATP',
          },
          {
            title: 'Đơn Hoàn Tất',
            value: `${orders.filter(o => o.status === 'completed').length} Đơn`,
            icon: CheckCircle2,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            trend: '96.8% Thành công',
            subtext: 'Thanh toán VietQR / COD',
          },
          {
            title: 'Tỉ Lệ Giao Đúng Hạn (SLA)',
            value: '99.6%',
            icon: ShieldCheck,
            iconBg: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            trend: 'SLA Giao 2H',
            subtext: 'Đạt chuẩn vận hành GSP',
          },
        ];
      case 'groupbuy':
        return [
          {
            title: 'Phòng Mua Chung Live',
            value: '18 Phòng',
            icon: Users,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
            trend: '+3.16% Tăng trưởng',
            subtext: 'Social Co-shopping live',
          },
          {
            title: 'Khách Đang Ghép Mua',
            value: `${groupRoom.members.length} Khách`,
            icon: Users,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600',
            trend: `Room ${groupRoom.code}`,
            subtext: 'Lan tỏa viral qua link mời',
          },
          {
            title: 'Chiết Khấu Cao Nhất',
            value: `-${groupRoom.discountTier}%`,
            icon: TrendingUp,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            trend: 'Tối đa -25%',
            subtext: 'Áp dụng trên toàn giỏ',
          },
          {
            title: 'Tiết Kiệm Lũy Kế',
            value: currency === 'VND' ? '₫38,400,000' : '$1,536',
            icon: DollarSign,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            trend: 'Lũy kế tháng',
            subtext: 'Giá trị đem lại cho khách',
          },
        ];
      case 'products':
        return [
          {
            title: 'Tổng Sản Phẩm Phân Phối',
            value: `${products.length} SKU`,
            icon: Package,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            trend: 'Active 100%',
            subtext: 'Đồng bộ Storefront & POS',
          },
          {
            title: 'Ngành Hàng Hoạt Động',
            value: '4 Ngành Hàng',
            icon: Layers,
            iconBg: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            trend: 'Men • Women • Kids',
            subtext: 'Danh mục thiết kế GAZU',
          },
          {
            title: 'Trạng Thái Khả Dụng',
            value: '100% Active',
            icon: CheckCircle2,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            trend: 'Online Live',
            subtext: 'Sẵn sàng chốt đơn',
          },
          {
            title: 'Giá Sỉ Bình Quân',
            value: currency === 'VND' ? '₫420,000' : '$16.8',
            icon: DollarSign,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600',
            trend: 'Biên lợi nhuận 42%',
            subtext: 'Tự động tính chiết khấu',
          },
        ];
      case 'architecture':
        return [
          {
            title: 'Tổng Kho Chiến Lược',
            value: '3 Hub Vận Hành',
            icon: Warehouse,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            trend: 'Hà Nội • ĐN • HCM',
            subtext: 'Độ phủ toàn quốc 100%',
          },
          {
            title: 'Kết Nối WMS / OMS',
            value: '100% Online',
            icon: Server,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            trend: 'Uptime 99.99%',
            subtext: 'Đồng bộ hóa 2 chiều',
          },
          {
            title: 'Độ Trễ Đồng Bộ ATP',
            value: '< 50ms Real-time',
            icon: Zap,
            iconBg: 'bg-amber-50',
            iconColor: 'text-amber-600',
            trend: 'Sub-millisecond',
            subtext: 'Chống overselling tuyệt đối',
          },
          {
            title: 'Tiêu Chuẩn Vận Hành',
            value: 'GSP / GDP',
            icon: ShieldCheck,
            iconBg: 'bg-purple-50',
            iconColor: 'text-purple-600',
            trend: 'Đạt chuẩn quốc tế',
            subtext: 'Kiểm soát chất lượng cao',
          },
        ];
      case 'dashboard':
      default:
        return [
          {
            title: 'Doanh Thu Tổng (GMV)',
            value: currency === 'VND' ? '₫1,845,200,000' : '$73,800',
            icon: TrendingUp,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            trend: '+12.5% Tháng này',
            subtext: 'So với tháng trước (Đối soát tự động)',
          },
          {
            title: 'Tồn Kho Khả Dụng ATP',
            value: `${warehouseTotalUnits.all.toLocaleString()} đơn vị`,
            icon: Warehouse,
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            trend: '100% Khả dụng',
            subtext: '3 Hub Bắc • Trung • Nam',
          },
          {
            title: 'Tổng Số Đơn Hàng',
            value: `${orders.length} Đơn`,
            icon: Truck,
            iconBg: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            trend: '+8.4% tuần này',
            subtext: 'Tỉ lệ hoàn tất 96.8%',
          },
          {
            title: 'Tỉ Lệ Giao Đúng Hạn (SLA)',
            value: '99.6%',
            icon: ShieldCheck,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            trend: 'SLA Giao 2H',
            subtext: 'Đạt chuẩn cam kết GSP',
          },
        ];
    }
  };

  return (
    <div className="w-full h-full bg-[#F8FAFC] text-slate-800 font-sans flex flex-col antialiased overflow-hidden">
      {/* Main Admin App Layout with Left Sidebar & Top Header */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left Sidebar - Salleist Clean SaaS Light Dashboard Style (Permanently Fixed on Desktop) */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-slate-700 border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 h-full lg:static lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Sidebar Brand Header */}
          <div className="h-20 px-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-3">
              {/* Icon Logo hình học màu đen */}
              <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-black shadow-sm shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-xl tracking-tight text-zinc-950 leading-tight">
                  S-FASHION
                </div>
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  • v3.8 • Live OMS/ATP
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6">
            {/* Group 1: Core Operations */}
            <div>
              <div className="px-3 mb-2.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Phân Hệ Điều Hành
              </div>
              <nav className="space-y-1">
                {/* 1. Overview (Tổng quan Dashboard) */}
                <button
                  onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between rounded-xl py-3 px-4 font-medium text-xs transition-all cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-zinc-950 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Overview (Tổng quan Dashboard)</span>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-md font-mono font-semibold ${
                    activeTab === 'dashboard' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 border border-slate-200/60'
                  }`}>
                    Live
                  </span>
                </button>

                {/* 2. Kho hàng & ATP */}
                <button
                  onClick={() => { setActiveTab('inventory'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between rounded-xl py-3 px-4 font-medium text-xs transition-all cursor-pointer ${
                    activeTab === 'inventory'
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-zinc-950 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Warehouse className="w-4 h-4 shrink-0" />
                    <span>Kho hàng & ATP</span>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-md font-mono font-semibold ${
                    activeTab === 'inventory' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                  }`}>
                    {warehouseProductCounts.all || 8} SKU
                  </span>
                </button>

                {/* 3. Đơn hàng & Vận đơn */}
                <button
                  onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between rounded-xl py-3 px-4 font-medium text-xs transition-all cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-zinc-950 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>Đơn hàng & Vận đơn</span>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-md font-mono font-semibold ${
                    activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 border border-slate-200/60'
                  }`}>
                    {orders.length || 5}
                  </span>
                </button>

                {/* 4. Phòng Mua Chung */}
                <button
                  onClick={() => { setActiveTab('groupbuy'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between rounded-xl py-3 px-4 font-medium text-xs transition-all cursor-pointer ${
                    activeTab === 'groupbuy'
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-zinc-950 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Phòng Mua Chung</span>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                    activeTab === 'groupbuy' ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600 border border-orange-200/60'
                  }`}>
                    Room {groupRoom?.code || 'GAZU-ROOM-88'}
                  </span>
                </button>

                {/* 5. Sản phẩm & Bảng giá */}
                <button
                  onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between rounded-xl py-3 px-4 font-medium text-xs transition-all cursor-pointer ${
                    activeTab === 'products'
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-zinc-950 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 shrink-0" />
                    <span>Sản phẩm & Bảng giá</span>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-md font-mono font-semibold ${
                    activeTab === 'products' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 border border-slate-200/60'
                  }`}>
                    {products.length || 8}
                  </span>
                </button>

                {/* 6. Kiến trúc hệ thống */}
                <button
                  onClick={() => { setActiveTab('architecture'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between rounded-xl py-3 px-4 font-medium text-xs transition-all cursor-pointer ${
                    activeTab === 'architecture'
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-slate-600 hover:text-zinc-950 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Server className="w-4 h-4 shrink-0" />
                    <span>Kiến trúc hệ thống</span>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${
                    activeTab === 'architecture' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 border border-slate-200/60'
                  }`}>
                    3-Tier
                  </span>
                </button>

                {/* 7. Feedback & Help & Support */}
                <div className="pt-2.5 mt-2.5 border-t border-slate-100 space-y-1">
                  <button
                    onClick={() => setIsFeedbackModalOpen(true)}
                    className="w-full flex items-center justify-between rounded-xl py-3 px-4 text-xs font-medium text-slate-600 hover:text-zinc-950 hover:bg-slate-100/80 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 shrink-0 text-slate-400" />
                      <span>Feedback</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200/60 font-medium">
                      Góp ý
                    </span>
                  </button>

                  <button
                    onClick={() => setIsHelpModalOpen(true)}
                    className="w-full flex items-center justify-between rounded-xl py-3 px-4 text-xs font-medium text-slate-600 hover:text-zinc-950 hover:bg-slate-100/80 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 shrink-0 text-slate-400" />
                      <span>Help & Support</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200/60 font-medium font-mono">
                      24/7
                    </span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Bottom Card - Upgrade Pro style Storefront Mode Box */}
          <div className="mx-3 mb-3 p-5 rounded-2xl bg-zinc-950 text-white shadow-lg relative overflow-hidden shrink-0 border border-zinc-800">
            {/* White rounded square with star icon */}
            <div className="w-9 h-9 rounded-xl bg-white text-zinc-950 flex items-center justify-center mb-3 shadow-md">
              <Star className="w-4 h-4 fill-zinc-950 text-zinc-950" />
            </div>

            <div className="font-bold text-sm text-white tracking-tight">
              Storefront Mode
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1">
              Chuyển sang giao diện Khách hàng mua sắm để trình diễn Demo
            </p>

            <button
              onClick={() => switchView('storefront')}
              className="w-full mt-3.5 py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-white rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-zinc-700 hover:border-zinc-600"
            >
              <span>⇄ Về Trang Khách Hàng</span>
            </button>
          </div>

          {/* Sidebar Footer User Info */}
          <div className="p-3 border-t border-slate-100 bg-white shrink-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 font-black text-xs shrink-0">
                  AD
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">Trần Quản Trị</div>
                  <div className="text-[10px] text-slate-400 truncate">Head of Supply Chain & OMS</div>
                </div>
              </div>
              <button
                onClick={() => showToast('Mở cài đặt quản trị viên')}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Cài đặt tài khoản"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          ></div>
        )}

        {/* Right Main Content Area */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          {/* Top Header Navigation Bar (Permanently fixed at top, never scrolls) */}
          <header className="shrink-0 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 z-20 shadow-xs">
            {/* Left: Mobile hamburger & Search bar */}
            <div className="flex items-center gap-3 flex-1 max-w-xl">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Omnichannel Global Search */}
              <div className="relative w-full max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm mã SKU, khách hàng, đơn hàng..."
                  className="w-full pl-10 pr-12 py-2 bg-slate-100/70 hover:bg-slate-100 focus:bg-white text-xs rounded-xl border border-slate-200/80 focus:border-slate-400 focus:outline-none transition-all placeholder:text-slate-400"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-white text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded-md shadow-xs">
                  ⌘K
                </span>
              </div>
            </div>

            {/* Right: Date filter, Actions, Notifications */}
            <div className="flex items-center gap-2.5">
              {/* Date / Time filter */}
              <div className="hidden sm:inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs">
                {(['today', '7days', 'month'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                      timeRange === t ? 'bg-white text-slate-950 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {t === 'today' ? 'Hôm nay' : t === '7days' ? '7 ngày' : 'Tháng này'}
                  </button>
                ))}
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setIsNotiOpen(prev => !prev)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl relative cursor-pointer border border-slate-200/80"
                  title="Thông báo hệ thống"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                </button>

                {isNotiOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3.5 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                      <span className="text-xs font-bold text-slate-900">Thông báo điều hành (4)</span>
                      <button
                        onClick={() => showToast('Đã đánh dấu tất cả thông báo là đã đọc')}
                        className="text-[10px] text-slate-600 hover:text-slate-950 hover:underline font-semibold"
                      >
                        Đã đọc tất cả
                      </button>
                    </div>
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs border border-slate-100">
                          <div className="font-semibold text-slate-900 flex items-center justify-between">
                            <span className="truncate">{n.title}</span>
                            <span className="text-[10px] text-slate-400 font-normal shrink-0">{n.time}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{n.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Presentation action buttons */}
              <button
                onClick={() => showToast('📥 Báo cáo phân tích ATP & Doanh thu GAZU tháng này đã được xuất định dạng Excel/PDF.')}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Xuất Báo Cáo</span>
              </button>

              <button
                onClick={handleAddDemoOrder}
                className="bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="hidden sm:inline">+ Tạo Đơn Mới</span>
              </button>
            </div>
          </header>

          {/* Main Dashboard Canvas Body (Dedicated internal scroll area, menu & header stay fixed) */}
          <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Breadcrumb & Section Title Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>Quản trị doanh nghiệp</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span className="text-amber-600 font-bold capitalize">
                    {activeTab === 'dashboard' ? 'Tổng quan Dashboard' :
                     activeTab === 'inventory' ? 'Tồn kho khả dụng ATP' :
                     activeTab === 'orders' ? 'Đơn hàng & Vận đơn' :
                     activeTab === 'groupbuy' ? 'Phòng Mua Chung Live' :
                     activeTab === 'products' ? 'Danh mục sản phẩm & Bảng giá' : 'Kiến trúc hệ thống'}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
                  GAZU ENTERPRISE CONTROL CENTER
                  <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200">
                    OMS • WMS • ATP LIVE
                  </span>
                </h1>
              </div>

              {/* Tab Pills for quick navigation */}
              <div className="flex items-center gap-1 overflow-x-auto bg-slate-200/80 p-1 rounded-xl text-xs shrink-0 scrollbar-none">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'dashboard' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tổng quan
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'inventory' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Kho & ATP ({warehouseProductCounts.all})
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'orders' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đơn hàng ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('groupbuy')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'groupbuy' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mua Chung
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'products' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sản phẩm
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'architecture' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Kiến trúc
                </button>
              </div>
            </div>

            {/* Row 1: Executive KPI Metrics Cards - Salleist style: first card dark highlight, remaining clean white */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {getTabKpis().map((kpi, idx) => {
                const IconComponent = kpi.icon;
                if (idx === 0) {
                  return (
                    <div
                      key={`${activeTab}-${idx}`}
                      className="bg-slate-950 text-white rounded-2xl p-5 shadow-sm border border-slate-900 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-3 z-10">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{kpi.title}</span>
                        <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                          {kpi.trend || '+3.16%'}
                        </span>
                      </div>
                      <div className="z-10">
                        <div className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
                          {kpi.value}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                          <span>{kpi.subtext || 'Hệ thống tự động đồng bộ'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                      </div>
                      {/* Ambient background glow */}
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
                    </div>
                  );
                }

                return (
                  <div
                    key={`${activeTab}-${idx}`}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{kpi.title}</span>
                      <div className={`w-9 h-9 rounded-xl ${kpi.iconBg} ${kpi.iconColor} flex items-center justify-center font-bold`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
                        {kpi.value}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                        <span>{kpi.subtext || 'Hệ thống tự động đồng bộ'}</span>
                        {kpi.trend && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {kpi.trend}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TAB: DASHBOARD (TỔNG QUAN) */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Row 2: Analytics Growth Area Chart & Top Selling Products (Salleist Layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Revenue & Orders Area Chart (2 Cols) */}
                  <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold shadow-xs">
                            <BarChart3 className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                              Phân Tích Doanh Thu & Lưu Lượng Đơn
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                +12.5% Tăng trưởng
                              </span>
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Doanh thu lũy kế thực tế và phân bổ đơn hàng qua 3 hub chiến lược
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs">
                            <button
                              type="button"
                              onClick={() => setChartMetric('revenue')}
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                chartMetric === 'revenue' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                              }`}
                            >
                              Doanh Thu
                            </button>
                            <button
                              type="button"
                              onClick={() => setChartMetric('orders')}
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                chartMetric === 'orders' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                              }`}
                            >
                              Đơn Hàng
                            </button>
                          </div>

                          <div className="hidden sm:inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs">
                            {(['7days', '30days', 'year'] as const).map(tf => (
                              <button
                                key={tf}
                                type="button"
                                onClick={() => setChartTimeframe(tf)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                                  chartTimeframe === tf ? 'bg-white text-slate-950 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-900'
                                }`}
                              >
                                {tf === '7days' ? '7N' : tf === '30days' ? '1T' : '12T'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Interactive Visual SVG Chart */}
                      <div className="pt-6 pb-2">
                        <div className="relative w-full h-52">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                              </linearGradient>
                              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>

                            {/* Horizontal guide lines */}
                            <line x1="0" y1="40" x2="600" y2="40" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="0" y1="90" x2="600" y2="90" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="0" y1="140" x2="600" y2="140" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="0" y1="190" x2="600" y2="190" stroke="#E2E8F0" strokeWidth="1" />

                            {chartMetric === 'revenue' ? (
                              <>
                                {/* Revenue Area */}
                                <path
                                  d="M 0 160 Q 50 145, 100 130 T 200 110 T 300 85 T 400 95 T 500 50 T 600 30 L 600 190 L 0 190 Z"
                                  fill="url(#revenueGradient)"
                                />
                                {/* Revenue Line */}
                                <path
                                  d="M 0 160 Q 50 145, 100 130 T 200 110 T 300 85 T 400 95 T 500 50 T 600 30"
                                  fill="none"
                                  stroke="#10B981"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                />
                                {[
                                  { cx: 100, cy: 130, val: currency === 'VND' ? '₫1.1B' : '$44K' },
                                  { cx: 300, cy: 85, val: currency === 'VND' ? '₫1.5B' : '$60K' },
                                  { cx: 500, cy: 50, val: currency === 'VND' ? '₫1.8B' : '$72K' },
                                  { cx: 600, cy: 30, val: currency === 'VND' ? '₫2.1B' : '$86K' },
                                ].map((pt, i) => (
                                  <g key={i}>
                                    <circle cx={pt.cx} cy={pt.cy} r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                                    <text x={pt.cx} y={pt.cy - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" className="font-mono">
                                      {pt.val}
                                    </text>
                                  </g>
                                ))}
                              </>
                            ) : (
                              <>
                                {/* Orders Area */}
                                <path
                                  d="M 0 170 Q 60 150, 120 135 T 240 120 T 360 80 T 480 70 T 600 45 L 600 190 L 0 190 Z"
                                  fill="url(#ordersGradient)"
                                />
                                {/* Orders Line */}
                                <path
                                  d="M 0 170 Q 60 150, 120 135 T 240 120 T 360 80 T 480 70 T 600 45"
                                  fill="none"
                                  stroke="#6366F1"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                />
                                {[
                                  { cx: 120, cy: 135, val: '145 đơn' },
                                  { cx: 360, cy: 80, val: '210 đơn' },
                                  { cx: 600, cy: 45, val: '290 đơn' },
                                ].map((pt, i) => (
                                  <g key={i}>
                                    <circle cx={pt.cx} cy={pt.cy} r="4.5" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2.5" />
                                    <text x={pt.cx} y={pt.cy - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0F172A" className="font-mono">
                                      {pt.val}
                                    </text>
                                  </g>
                                ))}
                              </>
                            )}
                          </svg>
                        </div>

                        {/* Months labels */}
                        <div className="flex justify-between text-[11px] text-slate-400 font-mono font-semibold pt-2 px-1">
                          <span>T1</span>
                          <span>T2</span>
                          <span>T3</span>
                          <span>T4</span>
                          <span>T5</span>
                          <span>T6</span>
                          <span>T7</span>
                          <span>T8</span>
                          <span>T9</span>
                          <span>T10</span>
                          <span>T11</span>
                          <span>T12</span>
                        </div>
                      </div>
                    </div>

                    {/* Chart summary metrics footer */}
                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 text-center">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Đỉnh Doanh Thu</div>
                        <div className="text-sm font-black text-slate-900 font-mono mt-0.5">
                          {currency === 'VND' ? '₫2.15 Tỷ' : '$86,000'}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Giá Trị Đơn TB (AOV)</div>
                        <div className="text-sm font-black text-slate-900 font-mono mt-0.5">
                          {currency === 'VND' ? '₫1,280,000' : '$51.2'}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Chốt Đơn Mua Chung</div>
                        <div className="text-sm font-black text-emerald-600 font-mono mt-0.5">
                          64.2% Hoàn tất
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Top Selling Products & ATP Availability */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-extrabold text-sm text-slate-900">Sản Phẩm Bán Chạy</h3>
                            <p className="text-[11px] text-slate-400">Top phân phối & tồn kho ATP</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab('products')}
                          className="text-[11px] font-bold text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
                        >
                          Xem tất cả
                        </button>
                      </div>

                      <div className="space-y-3">
                        {products.slice(0, 4).map((p, idx) => {
                          const { totalAtp } = calculateProductATP(p);
                          return (
                            <div
                              key={p.id}
                              className="flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="font-bold text-xs text-slate-900 truncate">{p.name}</div>
                                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                                    <span>{formatPrice(p.priceVND, p.priceUSD)}</span>
                                    <span>•</span>
                                    <span className="text-emerald-600 font-bold">{1420 - idx * 240} đã bán</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="text-[11px] font-mono font-bold text-slate-900 block">{totalAtp} ATP</span>
                                <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                                  Sẵn sàng
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Tồn kho khả dụng:</span>
                      <span className="font-mono font-bold text-slate-900">{warehouseTotalUnits.all.toLocaleString()} SKU toàn quốc</span>
                    </div>
                  </div>
                </div>

                {/* 3 Hub Warehouse Distribution */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-blue-500" />
                        Trọng Lượng Tồn Kho 3 Hub Chiến Lược
                        <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded ml-1">
                          100% Khả dụng
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Tỷ lệ phân bổ vật lý tại 3 tổng kho chiến lược giao nhanh 2 giờ: Hà Nội • Đà Nẵng • TP.HCM
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenTransfer(products[0]?.name || 'Áo GAZU Techwear')}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto shadow-xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                      <span>Tạo Lệnh Điều Phối Hàng</span>
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Hub 1: Kho Bắc */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                            Kho Bắc (Hà Nội)
                          </span>
                          <span className="font-mono text-slate-900 font-bold">{warehouseTotalUnits.hn} ATP</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mb-2 font-mono">
                          {warehouseProductCounts.hn} SKU sẵn sàng
                        </div>
                        <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.round((warehouseTotalUnits.hn / Math.max(1, warehouseTotalUnits.all)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-3 flex items-center justify-between">
                        <span>Miền Bắc</span>
                        <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">SLA Giao 2H</span>
                      </div>
                    </div>

                    {/* Hub 2: Kho Trung */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                            Kho Trung (Đà Nẵng)
                          </span>
                          <span className="font-mono text-slate-900 font-bold">{warehouseTotalUnits.dn} ATP</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mb-2 font-mono">
                          {warehouseProductCounts.dn} SKU sẵn sàng
                        </div>
                        <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.round((warehouseTotalUnits.dn / Math.max(1, warehouseTotalUnits.all)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-3 flex items-center justify-between">
                        <span>Miền Trung</span>
                        <span className="font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Giao Trong Ngày</span>
                      </div>
                    </div>

                    {/* Hub 3: Kho Nam */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            Kho Nam (TP. HCM)
                          </span>
                          <span className="font-mono text-slate-900 font-bold">{warehouseTotalUnits.hcm} ATP</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mb-2 font-mono">
                          {warehouseProductCounts.hcm} SKU sẵn sàng
                        </div>
                        <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.round((warehouseTotalUnits.hcm / Math.max(1, warehouseTotalUnits.all)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-3 flex items-center justify-between">
                        <span>Miền Nam</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">SLA Giao 2H</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Quick Action Recent Orders Table on Dashboard */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-slate-700" />
                        Đơn Hàng Mới Nhất Chờ Xử Lý & Điều Phối
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Tự động điều phối đến Hub gần nhất dựa trên địa chỉ giao hàng và tồn kho ATP thực
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleAddDemoOrder}
                        className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        + Tạo Đơn Hàng Thử Nghiệm
                      </button>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                      >
                        Xem tất cả ({orders.length})
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
                        <tr>
                          <th className="py-3 px-4">Mã Đơn & Giờ Đặt</th>
                          <th className="py-3 px-4">Khách Hàng</th>
                          <th className="py-3 px-4">Sản Phẩm & Phân Loại</th>
                          <th className="py-3 px-4">Hub Điều Phối</th>
                          <th className="py-3 px-4">Giá Trị</th>
                          <th className="py-3 px-4 text-center">Trạng Thái</th>
                          <th className="py-3 px-4 text-right">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 4).map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-mono font-bold text-slate-900">{ord.id}</div>
                              <div className="text-[10px] text-slate-400">{ord.time}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{ord.customer}</div>
                              <div className="text-[10px] text-slate-400">{ord.phone}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-slate-800 line-clamp-1">{ord.items}</div>
                              <span className="text-[10px] text-orange-600 font-bold">{ord.type}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                                {ord.hub}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                              {formatPrice(ord.totalVND, ord.totalUSD)}
                              <div className="text-[10px] text-slate-400 font-normal">{ord.payment}</div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              {ord.status === 'shipping' ? (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                  Đang Giao 2H
                                </span>
                              ) : ord.status === 'processing' ? (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                  Đang Soạn Kho
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Hoàn Tất
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => showToast(`In vận đơn ${ord.id} gửi đơn vị chuyển phát hỏa tốc.`)}
                                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-bold cursor-pointer transition-colors shadow-xs"
                              >
                                In Phiếu
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: KHO HÀNG & ATP (INVENTORY MATRIX) */}
            {activeTab === 'inventory' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Warehouse Table with Preserved Search Bar */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  {/* Table Header Toolbar - Preserved Search Bar */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                        <Warehouse className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                          Tồn Kho Khả Dụng ATP
                          <span className="text-[11px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">
                            {filteredInventoryProducts.length} / {products.length} SKU
                          </span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Tồn kho thực tế và khả dụng tại 3 tổng kho: Hà Nội • Đà Nẵng • TP.HCM
                        </p>
                      </div>
                    </div>

                    {/* Preserved Search Bar */}
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Tìm kiếm SKU hoặc tên hàng..."
                          className="pl-9 pr-8 py-2 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs rounded-xl border border-slate-200 focus:border-amber-500 focus:outline-none transition-all w-56 sm:w-72"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {selectedWarehouseFilter !== 'all' && (
                        <button
                          type="button"
                          onClick={() => setSelectedWarehouseFilter('all')}
                          className="text-[11px] text-amber-700 bg-amber-50 hover:bg-amber-100 font-bold px-2.5 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Bấm để hiển thị tất cả các kho"
                        >
                          <span>Kho: {selectedWarehouseFilter.toUpperCase()}</span>
                          <X className="w-3 h-3" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleOpenTransfer(products[0]?.name || 'Áo GAZU')}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                        <span>Điều Chuyển Kho</span>
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
                        <tr>
                          <th className="py-3.5 px-4">Sản Phẩm & Mã SKU</th>
                          <th
                            onClick={() => setSelectedWarehouseFilter(prev => prev === 'hn' ? 'all' : 'hn')}
                            className={`py-3.5 px-4 text-center cursor-pointer transition-colors ${
                              selectedWarehouseFilter === 'hn' ? 'bg-blue-50 text-blue-900 border-b-2 border-blue-500 font-bold' : 'hover:bg-slate-100'
                            }`}
                            title="Bấm để lọc theo kho Hà Nội (bấm lại để bỏ lọc)"
                          >
                            Kho Bắc (Hà Nội)
                          </th>
                          <th
                            onClick={() => setSelectedWarehouseFilter(prev => prev === 'dn' ? 'all' : 'dn')}
                            className={`py-3.5 px-4 text-center cursor-pointer transition-colors ${
                              selectedWarehouseFilter === 'dn' ? 'bg-amber-50 text-amber-900 border-b-2 border-amber-500 font-bold' : 'hover:bg-slate-100'
                            }`}
                            title="Bấm để lọc theo kho Đà Nẵng (bấm lại để bỏ lọc)"
                          >
                            Kho Trung (Đà Nẵng)
                          </th>
                          <th
                            onClick={() => setSelectedWarehouseFilter(prev => prev === 'hcm' ? 'all' : 'hcm')}
                            className={`py-3.5 px-4 text-center cursor-pointer transition-colors ${
                              selectedWarehouseFilter === 'hcm' ? 'bg-emerald-50 text-emerald-900 border-b-2 border-emerald-500 font-bold' : 'hover:bg-slate-100'
                            }`}
                            title="Bấm để lọc theo kho TP.HCM (bấm lại để bỏ lọc)"
                          >
                            Kho Nam (TP. HCM)
                          </th>
                          <th
                            onClick={() => setSelectedWarehouseFilter('all')}
                            className={`py-3.5 px-4 text-right cursor-pointer transition-colors ${
                              selectedWarehouseFilter === 'all' ? 'font-bold text-slate-900' : 'hover:bg-slate-100 text-slate-600'
                            }`}
                            title="Bấm để xem tổng tồn kho toàn quốc"
                          >
                            {selectedWarehouseFilter === 'all'
                              ? 'Tổng ATP Toàn Quốc'
                              : selectedWarehouseFilter === 'hn'
                              ? 'ATP Khả Dụng Hà Nội'
                              : selectedWarehouseFilter === 'dn'
                              ? 'ATP Khả Dụng Đà Nẵng'
                              : 'ATP Khả Dụng TP.HCM'}
                          </th>
                          <th className="py-3.5 px-4 text-center">Trạng Thái Tồn</th>
                          <th className="py-3.5 px-4 text-right">Thao Tác Thuyết Trình</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredInventoryProducts.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-slate-400">
                              <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                              <div className="text-sm font-bold text-slate-700">Không tìm thấy sản phẩm nào</div>
                              <p className="text-xs text-slate-400 mt-1">
                                Không có sản phẩm nào có sẵn tồn kho tại kho được chọn hoặc khớp từ khóa tìm kiếm.
                              </p>
                              <button
                                type="button"
                                onClick={() => { setSelectedWarehouseFilter('all'); setSearchQuery(''); }}
                                className="mt-3 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer"
                              >
                                Xem tất cả các kho
                              </button>
                            </td>
                          </tr>
                        ) : (
                          filteredInventoryProducts.map((product) => {
                            const { hnStock, dnStock, hcmStock, totalAtp } = calculateProductATP(product);
                            const displayedAtp =
                              selectedWarehouseFilter === 'all'
                                ? totalAtp
                                : selectedWarehouseFilter === 'hn'
                                ? hnStock
                                : selectedWarehouseFilter === 'dn'
                                ? dnStock
                                : hcmStock;

                            return (
                              <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      referrerPolicy="no-referrer"
                                      className="w-11 h-11 object-cover rounded-lg bg-slate-100 shrink-0 border border-slate-200"
                                    />
                                    <div>
                                      <div className="font-bold text-slate-900 line-clamp-1">{product.name}</div>
                                      <div className="text-[10px] font-mono text-slate-500 font-semibold">{product.defaultSku || product.id.toUpperCase()} • {product.category.toUpperCase()}</div>
                                    </div>
                                  </div>
                                </td>

                                {/* HN Hub */}
                                <td className={`py-3.5 px-4 text-center transition-colors ${
                                  selectedWarehouseFilter === 'hn' ? 'bg-blue-50/60 font-bold border-x border-blue-200' : ''
                                }`}>
                                  <div className={`font-mono font-bold ${hnStock > 0 ? (selectedWarehouseFilter === 'hn' ? 'text-blue-700 text-sm' : 'text-slate-900') : 'text-slate-300'}`}>
                                    {hnStock}
                                  </div>
                                  <div className="text-[10px] text-slate-400">Giao 2H nội thành</div>
                                </td>

                                {/* DN Hub */}
                                <td className={`py-3.5 px-4 text-center transition-colors ${
                                  selectedWarehouseFilter === 'dn' ? 'bg-amber-50/60 font-bold border-x border-amber-200' : ''
                                }`}>
                                  <div className={`font-mono font-bold ${dnStock > 0 ? (selectedWarehouseFilter === 'dn' ? 'text-amber-700 text-sm' : 'text-slate-900') : 'text-slate-300'}`}>
                                    {dnStock}
                                  </div>
                                  <div className="text-[10px] text-slate-400">Giao trong ngày</div>
                                </td>

                                {/* HCM Hub */}
                                <td className={`py-3.5 px-4 text-center transition-colors ${
                                  selectedWarehouseFilter === 'hcm' ? 'bg-emerald-50/60 font-bold border-x border-emerald-200' : ''
                                }`}>
                                  <div className={`font-mono font-bold ${hcmStock > 0 ? (selectedWarehouseFilter === 'hcm' ? 'text-emerald-700 text-sm' : 'text-slate-900') : 'text-slate-300'}`}>
                                    {hcmStock}
                                  </div>
                                  <div className="text-[10px] text-slate-400">Giao 2H nội thành</div>
                                </td>

                                {/* Total / Selected Warehouse ATP */}
                                <td className="py-3.5 px-4 text-right">
                                  <div className="font-mono font-black text-base text-slate-900">
                                    {displayedAtp}
                                  </div>
                                  <div className="text-[10px] text-slate-400">
                                    {selectedWarehouseFilter === 'all' ? 'Toàn hệ thống' : `Tại ${selectedWarehouseFilter === 'hn' ? 'Hà Nội' : selectedWarehouseFilter === 'dn' ? 'Đà Nẵng' : 'TP.HCM'}`}
                                  </div>
                                </td>

                                {/* Status */}
                                <td className="py-3.5 px-4 text-center">
                                  {displayedAtp > 15 ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Dồi Dào
                                    </span>
                                  ) : displayedAtp > 5 ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Ổn Định
                                    </span>
                                  ) : displayedAtp > 0 ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                      <AlertTriangle className="w-3 h-3" /> Sắp Hết
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                      Hết Hàng
                                    </span>
                                  )}
                                </td>

                                {/* Presentation simulation actions */}
                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleSimulateLargeOrder(product.id)}
                                      className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold text-[11px] transition-colors cursor-pointer"
                                      title="Mô phỏng trừ tồn kho tức thì khi khách đặt sỉ"
                                    >
                                      -15 Sỉ
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleOpenTransfer(product.name)}
                                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded font-bold text-[11px] transition-colors cursor-pointer"
                                      title="Tạo lệnh điều phối kho"
                                    >
                                      Điều Kho
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ĐƠN HÀNG & VẬN ĐƠN (ORDERS) */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-bold">Lọc trạng thái:</span>
                      <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
                        {(['all', 'processing', 'shipping', 'completed'] as const).map(f => (
                          <button
                            key={f}
                            onClick={() => setOrderFilter(f)}
                            className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                              orderFilter === f ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            {f === 'all' ? 'Tất cả' : f === 'processing' ? 'Đang soạn kho' : f === 'shipping' ? 'Đang giao 2H' : 'Hoàn tất'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleAddDemoOrder}
                      className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      + Thêm Đơn Hàng Thuyết Trình
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
                        <tr>
                          <th className="py-3.5 px-4">Mã Đơn & Thời Gian</th>
                          <th className="py-3.5 px-4">Khách Hàng</th>
                          <th className="py-3.5 px-4">Sản Phẩm & Phân Loại</th>
                          <th className="py-3.5 px-4">Tổng Tiền</th>
                          <th className="py-3.5 px-4">Hub Điều Phối</th>
                          <th className="py-3.5 px-4 text-center">Trạng Thái</th>
                          <th className="py-3.5 px-4 text-right">Hành Động</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-mono font-bold text-slate-900">{ord.id}</div>
                              <div className="text-[10px] text-slate-400">{ord.time}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{ord.customer}</div>
                              <div className="text-[10px] text-slate-400">{ord.phone}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-slate-800 line-clamp-1">{ord.items}</div>
                              <span className="text-[10px] text-orange-600 font-bold">{ord.type}</span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                              {formatPrice(ord.totalVND, ord.totalUSD)}
                              <div className="text-[10px] text-slate-400 font-normal">{ord.payment}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 border border-slate-200 text-slate-800">
                                {ord.hub}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              {ord.status === 'shipping' ? (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                  Đang Giao 2H
                                </span>
                              ) : ord.status === 'processing' ? (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                  Đang Soạn Kho
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Hoàn Tất
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => showToast(`In vận đơn ${ord.id} chuyển giao đơn vị vận chuyển GAZU Express 2H`)}
                                className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold cursor-pointer border border-slate-200 shadow-xs"
                              >
                                In Vận Đơn
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PHÒNG MUA CHUNG (CO-SHOPPING) */}
            {activeTab === 'groupbuy' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left 2 Cols: Live Room Command Center */}
                  <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                          <Users className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                            Phòng Mua Chung: {groupRoom.code}
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              ĐANG MỞ CHỐT ĐƠN
                            </span>
                          </h3>
                          <p className="text-xs text-slate-500">Trưởng phòng: <b className="text-slate-800">{groupRoom.hostName}</b></p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="text-xs text-slate-400">Thời gian giữ giá ưu đãi:</div>
                        <div className="font-mono font-bold text-amber-600 text-base flex items-center gap-1 sm:justify-end">
                          <Clock className="w-4 h-4" />
                          {Math.floor(groupRoom.expiresInSeconds / 60)}:{(groupRoom.expiresInSeconds % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>

                    {/* Discount Ladder Progress */}
                    <div className="my-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-slate-700 font-bold">Bậc chiết khấu hiện tại:</span>
                        <span className="font-black text-orange-600 text-sm">Giảm -{groupRoom.discountTier}% toàn giỏ hàng</span>
                      </div>
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (groupRoom.members.length / 5) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono font-semibold">
                        <span>2 khách (-5%)</span>
                        <span>3 khách (-15%)</span>
                        <span>5+ khách (-25% Tối đa)</span>
                      </div>
                    </div>

                    {/* Members List */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        Thành viên đang trong phòng ({groupRoom.members.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {groupRoom.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-9 h-9 rounded-full object-cover border border-slate-300"
                              />
                              <div>
                                <div className="text-xs font-bold text-slate-900">{member.name}</div>
                                <div className="text-[10px] text-slate-400">{member.joinedAt}</div>
                              </div>
                            </div>
                            <span className="text-[10px] bg-white text-amber-700 font-bold px-2 py-0.5 rounded border border-slate-200 font-mono">
                              {member.itemsCount} sản phẩm
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2.5">
                      <button
                        onClick={() => {
                          simulateAddCoShopper();
                          showToast('👥 Đã mô phỏng 1 khách hàng mới gia nhập phòng mua chung!');
                        }}
                        className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Users className="w-3.5 h-3.5" />
                        + Mô Phỏng Khách Vào Ghép Đơn
                      </button>

                      <button
                        onClick={() => showToast('🚀 Đã gửi thông báo đẩy: "Phòng mua chung sắp hết giờ, hãy chốt đơn ngay!"')}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Bắn Thông Báo Nhắc Nhở
                      </button>
                    </div>
                  </div>

                  {/* Right 1 Col: Conversion & Impact Stats */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        Chỉ Số Tác Động Kinh Doanh
                      </h3>
                      <p className="text-xs text-slate-500 mb-5">
                        Hiệu quả của mô hình Social Co-Shopping so với thương mại điện tử đơn lẻ truyền thống.
                      </p>

                      <div className="space-y-3.5">
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-[11px] font-bold text-slate-500">Tỷ lệ hoàn tất giỏ hàng</div>
                          <div className="text-2xl font-black text-emerald-600">64.2%</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">So với e-commerce thông thường: 2.8%</div>
                        </div>

                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-[11px] font-bold text-slate-500">Tăng trưởng giá trị giỏ (AOV)</div>
                          <div className="text-2xl font-black text-amber-600">+48.5%</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Khách rủ bạn bè mua thêm để chạm mốc -25%</div>
                        </div>

                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-[11px] font-bold text-slate-500">Chi phí thu hút khách hàng (CAC)</div>
                          <div className="text-2xl font-black text-blue-600">-62.0%</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Lan tỏa viral qua link mời Zalo/Messenger</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                      <span>WMS Tự Động:</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Gom chung mã vận đơn
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SẢN PHẨM & BẢNG GIÁ (PRODUCTS) */}
            {activeTab === 'products' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Quản Trị Bảng Giá & Phân Loại Sản Phẩm</h3>
                      <p className="text-xs text-slate-500">Đồng bộ giá theo VND & USD trên toàn hệ thống Storefront & POS</p>
                    </div>
                    <button
                      onClick={() => showToast('✨ Giá bán và trạng thái khuyến mãi đã được cập nhật đồng bộ sang Storefront!')}
                      className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Đồng Bộ Sang Storefront
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
                        <tr>
                          <th className="py-3.5 px-4">Sản Phẩm</th>
                          <th className="py-3.5 px-4">Giá Niêm Yết (VND / USD)</th>
                          <th className="py-3.5 px-4 text-center">Bật Mua Chung</th>
                          <th className="py-3.5 px-4 text-center">Huy Hiệu</th>
                          <th className="py-3.5 px-4 text-right">Tồn ATP</th>
                          <th className="py-3.5 px-4 text-right">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <img src={p.image} alt={p.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200" />
                                <div>
                                  <div className="font-bold text-slate-900">{p.name}</div>
                                  <div className="text-[10px] font-mono text-slate-500 font-semibold">{p.defaultSku || p.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                              <div>{formatPrice(p.priceVND, p.priceUSD)}</div>
                              {p.originalPriceVND && (
                                <div className="text-[10px] text-slate-400 line-through font-normal">
                                  {formatPrice(p.originalPriceVND, p.originalPriceUSD || 0)}
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                                Áp Dụng
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              {p.isBestSeller && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                  BEST SELLER
                                </span>
                              )}
                              {p.isNew && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 ml-1">
                                  NEW ARRIVAL
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                              {p.stockATP}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => showToast(`Cập nhật thành công thông tin sản phẩm: ${p.name}`)}
                                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold cursor-pointer border border-slate-200 shadow-xs"
                              >
                                Chỉnh Sửa
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: KIẾN TRÚC KỸ THUẬT (ARCHITECTURE) */}
            {activeTab === 'architecture' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
                  <h3 className="font-extrabold text-lg text-slate-900 mb-2 flex items-center gap-2">
                    <Server className="w-5 h-5 text-amber-500" />
                    Kiến Trúc Tích Hợp Đa Kênh GAZU (Enterprise Omnichannel Architecture)
                  </h3>
                  <p className="text-xs text-slate-500 mb-6 max-w-4xl leading-relaxed">
                    Sơ đồ phân hệ kỹ thuật thể hiện sự kết nối liền mạch giữa Giao diện Khách hàng (Storefront) và Hệ thống Quản trị Doanh nghiệp (Enterprise Admin) với độ trễ phản hồi sub-millisecond.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Layer 1 */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">
                        <Store className="w-4 h-4 text-amber-600" />
                        Layer 1: Customer Storefront
                      </div>
                      <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                        <li>Single Page App (React 19 + TypeScript + Vite)</li>
                        <li>Tailwind CSS High-end Editorial UI</li>
                        <li>Live Co-Shopping Room Web Engine</li>
                        <li>Product Detail with Dynamic ATP Stock Pill</li>
                        <li>Multi-Language (VI/EN) & Multi-Currency (VND/USD)</li>
                      </ul>
                    </div>

                    {/* Layer 2 */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">
                        <Database className="w-4 h-4 text-emerald-600" />
                        Layer 2: Real-Time ATP & OMS Engine
                      </div>
                      <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                        <li>Available-To-Promise (ATP) Multi-Hub Matrix</li>
                        <li>Instant Stock Locking (Chống Overselling)</li>
                        <li>Regional Routing (HN - ĐN - HCM Hubs)</li>
                        <li>Discount Tier Automation (5% / 15% / 25%)</li>
                        <li>Persistent State via Local/Web Storage</li>
                      </ul>
                    </div>

                    {/* Layer 3 */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        Layer 3: Enterprise Admin Suite
                      </div>
                      <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                        <li>Executive GMV & SLA Dashboards</li>
                        <li>Regional Warehouse Stock Balancing</li>
                        <li>Live Co-Shopping Room Broadcast Control</li>
                        <li>Automated Order Dispatching & Label Printing</li>
                        <li>Seamless Presentation View Switcher Toolbar</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Internal Transfer Modal */}
      {transferModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-500" />
                Lệnh Điều Chuyển Hàng Nội Bộ
              </h3>
              <button
                onClick={() => setTransferModal(prev => ({ ...prev, isOpen: false }))}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Sản phẩm điều chuyển:</label>
                <input
                  type="text"
                  value={transferModal.productName}
                  disabled
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Từ kho xuất:</label>
                  <select
                    value={transferModal.fromHub}
                    onChange={(e) => setTransferModal(prev => ({ ...prev, fromHub: e.target.value }))}
                    className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-semibold"
                  >
                    <option value="Kho Nam (TP. HCM)">Kho Nam (TP. HCM)</option>
                    <option value="Kho Bắc (Hà Nội)">Kho Bắc (Hà Nội)</option>
                    <option value="Kho Trung (Đà Nẵng)">Kho Trung (Đà Nẵng)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Đến kho nhập:</label>
                  <select
                    value={transferModal.toHub}
                    onChange={(e) => setTransferModal(prev => ({ ...prev, toHub: e.target.value }))}
                    className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-semibold"
                  >
                    <option value="Kho Bắc (Hà Nội)">Kho Bắc (Hà Nội)</option>
                    <option value="Kho Trung (Đà Nẵng)">Kho Trung (Đà Nẵng)</option>
                    <option value="Kho Nam (TP. HCM)">Kho Nam (TP. HCM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Số lượng điều chuyển (đơn vị):</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={transferModal.quantity}
                  onChange={(e) => setTransferModal(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-bold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setTransferModal(prev => ({ ...prev, isOpen: false }))}
                className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-bold text-xs cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleExecuteTransfer}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs cursor-pointer shadow-sm"
              >
                Xác Nhận Điều Chuyển
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-zinc-950" />
                Góp Ý & Phản Hồi Hệ Thống (Feedback)
              </h3>
              <button
                onClick={() => setIsFeedbackModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed">
                Chúng tôi luôn lắng nghe ý kiến đóng góp của bạn để tối ưu hóa nền tảng quản trị chuỗi cung ứng và OMS của <strong className="text-zinc-950">ADISPORT</strong>.
              </p>
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Nội dung góp ý / Báo lỗi:</label>
                <textarea
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Nhập phản hồi của bạn về giao diện, tính năng điều phối kho, xử lý đơn hàng..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-zinc-950 resize-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold text-xs cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast('Cảm ơn bạn! Phản hồi đã được gửi đến ban điều hành ADISPORT.');
                  setFeedbackText('');
                  setIsFeedbackModalOpen(false);
                }}
                className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl font-bold text-xs cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Phản Hồi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                Trung Tâm Trợ Giúp & Tài Liệu Vận Hành
              </h3>
              <button
                onClick={() => setIsHelpModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 space-y-3.5 text-xs">
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-emerald-950">Đội ngũ Kỹ thuật & Hỗ trợ OMS 24/7</div>
                  <div className="text-emerald-700 text-[11px] mt-0.5">Cam kết SLA phản hồi &lt; 5 phút cho các sự cố luân chuyển kho và đơn hàng gấp.</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800">Quy trình Điều chuyển kho 3 Hub</span>
                    <p className="text-[11px] text-slate-500">Hướng dẫn tạo lệnh luân chuyển giữa kho Hà Nội, Đà Nẵng và TP.HCM</p>
                  </div>
                  <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-md font-mono text-slate-600">SOP-01</span>
                </div>

                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800">Cơ chế Chống Overselling ATP Real-Time</span>
                    <p className="text-[11px] text-slate-500">Tìm hiểu thuật toán khóa tồn kho ảo và giải phóng tự động khi hết hạn giỏ</p>
                  </div>
                  <span className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-md font-mono text-slate-600">ATP-WMS</span>
                </div>

                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800">Hotline Điều Hành Khẩn Cấp</span>
                    <p className="text-[11px] text-slate-500">Tổng đài viên trực: 1900 8899 (Nhánh 2 - Kho Vận & OMS)</p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md font-bold">Trực Tuyến</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsHelpModalOpen(false)}
                className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl font-bold text-xs cursor-pointer shadow-sm"
              >
                Đã Hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
