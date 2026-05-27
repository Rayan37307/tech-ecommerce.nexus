import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

// Types
import { Product, CartItem, Order, Address, ShippingMethod, PaymentDetails, UserProfile } from './types';

// Mock Data
import { PRODUCTS } from './data';

// Global Components
import Header from './components/Header';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import Toast, { ToastMessage } from './components/Toast';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

export default function App() {
  // -------------------------------------------------------------
  // Router Visual States
  // -------------------------------------------------------------
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [dashboardDefaultTab, setDashboardDefaultTab] = useState<string>('profile');

  // -------------------------------------------------------------
  // Dynamic State Managers
  // -------------------------------------------------------------
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Jane Doe',
    email: 'jane.doe@nexustech.io',
    phone: '+1 (555) 019-2834',
    avatar: '',
    addresses: [],
  });

  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; flatDiscount: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // -------------------------------------------------------------
  // Synchronization Loops (Local Storage)
  // -------------------------------------------------------------
  // Load initially
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('nexus_tech_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('nexus_tech_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('nexus_tech_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedProfile = localStorage.getItem('nexus_tech_profile');
      if (savedProfile) setUserProfile(JSON.parse(savedProfile));

      // Theme always light - no dark mode
      // const savedTheme = localStorage.getItem('nexus_tech_theme');
      // if (savedTheme !== null) {
      //   setDarkMode(savedTheme === 'true');
      // }
    } catch (e) {
      console.error('Failed to restore telemetry databases from local storage:', e);
    }
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem('nexus_tech_cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist
  useEffect(() => {
    localStorage.setItem('nexus_tech_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save orders
  useEffect(() => {
    localStorage.setItem('nexus_tech_orders', JSON.stringify(orders));
  }, [orders]);

  // Save profile
  useEffect(() => {
    localStorage.setItem('nexus_tech_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Save theme & update document DOM element indices
  useEffect(() => {
    localStorage.setItem('nexus_tech_theme', String(darkMode));
    const root = document.documentElement;
    root.style.backgroundColor = '#fcf9f6';
    // Keep dark mode active status so existing conditional logic has a safe, unified fallback mapped to our warm colors
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll to Top monitoring
  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // -------------------------------------------------------------
  // Notification Toasts helper
  // -------------------------------------------------------------
  const addToast = (text: string, type: 'success' | 'wishlist' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // -------------------------------------------------------------
  // E-Commerce Functional Core Rules
  // -------------------------------------------------------------
  
  // Custom View/Router Setter
  const setViewParams = (view: string, id: string = '') => {
    setActiveView(view);
    if (view === 'product-detail') {
      setSelectedProductId(id);
    } else if (view === 'dashboard' && id === 'wishlist-tab') {
      setDashboardDefaultTab('wishlist-tab');
    } else if (view === 'dashboard') {
      setDashboardDefaultTab('profile');
    }
    // Always snap focus scroll top
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Add cart logic with selected options variables
  const handleAddToCart = (
    product: Product,
    options: { color?: string; storageName?: string; switchTypeName?: string; qty?: number } = {}
  ) => {
    const qty = options.qty || 1;
    const color = options.color || product.colors?.[0] || '';
    const storageObj = options.storageName || product.storageOptions?.[0] || '';
    const switchTypeName = options.switchTypeName || product.switchTypes?.[0] || '';

    // Create unique item key index mapping options
    const cartItemId = `${product.id}-${color}-${storageObj}-${switchTypeName}`;

    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === cartItemId);
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + qty;
        
        // Stock limits checks
        if (newQty > product.stockCount) {
          addToast(`Failed! Maximum stock priority threshold of is ${product.stockCount}.`, 'error');
          return prev;
        }

        updated[existingIdx].quantity = newQty;
        addToast(`Success! Configured qty of ${product.name} increased in basket ✓`, 'success');
        return updated;
      } else {
        addToast(`Added: ${product.name} is armed in secure basket ✓`, 'success');
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            quantity: qty,
            selectedColor: color || undefined,
            selectedStorage: storageObj || undefined,
            selectedSwitchType: switchTypeName || undefined,
          },
        ];
      }
    });
  };

  const handleUpdateCartQty = (cartItemId: string, newQty: number) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === cartItemId);
      if (!item) return prev;

      if (newQty > item.product.stockCount) {
        addToast(`Limits: Depleted stock limits. Max count is ${item.product.stockCount}.`, 'error');
        return prev;
      }

      return prev.map((item) => {
        if (item.id === cartItemId) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === cartItemId);
      if (item) {
        addToast(`Removed: ${item.product.name} discard from basket.`, 'info');
      }
      return prev.filter((i) => i.id !== cartItemId);
    });
  };

  const handleToggleWishlist = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const isWish = prev.includes(productId);
      if (isWish) {
        if (prod) addToast(`Removed: ${prod.name} from wishlist telemetry logs.`, 'wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        if (prod) addToast(`Added: ${prod.name} registered in wishlist logs ✓`, 'wishlist');
        return [...prev, productId];
      }
    });
  };

  const handleApplyCoupon = (code: string) => {
    if (!code) {
      setAppliedCoupon(null);
      addToast('Deducted: Telemetry Coupon discarded.', 'info');
      return;
    }

    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'DISPATCH2026' || cleanCode === 'NEXUS20') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 20, flatDiscount: 0 });
      addToast('Applied: 20% Discount calculated!', 'success');
    } else if (cleanCode === 'CYBER15') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 0, flatDiscount: 15 });
      addToast('Applied: $15 Flat Coupon calculated!', 'success');
    }
  };

  // Profile editable forms
  const handleUpdateProfile = (name: string, email: string, phone: string) => {
    setUserProfile((prev) => ({ ...prev, name, email, phone }));
  };

  const handleAddAddress = (addr: Address) => {
    setUserProfile((prev) => ({
      ...prev,
      addresses: [...prev.addresses, addr],
    }));
  };

  const handleRemoveAddress = (zip: string) => {
    setUserProfile((prev) => {
      const updated = prev.addresses.filter((a) => a.zip !== zip);
      addToast('Discarded address parameters card from directories.', 'info');
      return { ...prev, addresses: updated };
    });
  };

  // Auth logins successfully session
  const handleLoginSuccess = (name: string, email: string) => {
    setUserProfile((prev) => ({
      ...prev,
      name,
      email,
    }));
    addToast(`Session Activated: Welcome ${name}!`, 'success');
  };

  const handleLogout = () => {
    setUserProfile({
      name: 'Guest Client',
      email: 'guest@nexustech.io',
      phone: '',
      avatar: '',
      addresses: [],
    });
    setOrders([]);
    setCart([]);
    setWishlist([]);
    setViewParams('home');
    addToast('Session Closed. All local vectors cleared.', 'info');
  };

  // Complete checkout placing order
  const handlePlaceOrder = (addr: Address, method: ShippingMethod, payment: PaymentDetails) => {
    const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    
    // coupon sums
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountPercent > 0) {
        discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
      } else if (appliedCoupon.flatDiscount > 0) {
        discount = appliedCoupon.flatDiscount;
      }
    }

    // if standard choice and subtotal > 100, free shipping
    const isFreeStandard = method.id === 'standard' && subtotal > 100;
    const shippingSpeedFee = isFreeStandard ? 0 : method.price;
    const finalTotal = Math.max(0, subtotal - discount + shippingSpeedFee);

    // construct beautiful Order details
    const orderId = `NXS-${Math.floor(10000 + Math.random() * 90000)}-2026`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: cart,
      subtotal,
      shipping: shippingSpeedFee,
      discount,
      total: finalTotal,
      status: 'Processing',
      deliveryEstimate: method.estimate,
      address: addr,
      shippingMethod: method.name,
    };

    // save order states
    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);

    // empty basket states
    setCart([]);
    setAppliedCoupon(null);

    // route success confirmation
    addToast('Checkout fully authorized! Order constructed.', 'success');
    setViewParams('confirmation');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------------------------------------
  // Primary router routing switcher
  // -------------------------------------------------------------
  const renderContentView = () => {
    switch (activeView) {
      case 'home':
        return (
          <Home
            setView={setViewParams}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onAddToCart={(p, q) => handleAddToCart(p, { qty: q })}
            darkMode={darkMode}
          />
        );
      case 'shop':
        return (
          <Shop
            setView={setViewParams}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onAddToCart={(p, q) => handleAddToCart(p, { qty: q })}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            darkMode={darkMode}
          />
        );
      case 'product-detail':
        return (
          <ProductDetail
            productId={selectedProductId}
            setView={setViewParams}
            onAddToCart={(p, opts) =>
              handleAddToCart(p, {
                color: opts.color,
                storageName: opts.storageName,
                switchTypeName: opts.switchTypeName,
                qty: opts.qty,
              })
            }
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            darkMode={darkMode}
          />
        );
      case 'cart':
        return (
          <Cart
            cart={cart}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveFromCart}
            onApplyCoupon={handleApplyCoupon}
            appliedCoupon={appliedCoupon}
            setView={setViewParams}
            darkMode={darkMode}
          />
        );
      case 'checkout':
        return (
          <Checkout
            cart={cart}
            appliedCoupon={appliedCoupon}
            onPlaceOrder={handlePlaceOrder}
            setView={setViewParams}
            darkMode={darkMode}
          />
        );
      case 'confirmation':
        return (
          <Confirmation
            lastOrder={lastPlacedOrder}
            setView={setViewParams}
            darkMode={darkMode}
          />
        );
      case 'auth':
        return (
          <Auth
            onLoginSuccess={handleLoginSuccess}
            setView={setViewParams}
            darkMode={darkMode}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            userProfile={userProfile}
            orders={orders}
            wishlist={wishlist}
            onUpdateProfile={handleUpdateProfile}
            onRemoveWishlist={handleToggleWishlist}
            onAddAddress={handleAddAddress}
            onRemoveAddress={handleRemoveAddress}
            onLogout={handleLogout}
            setView={setViewParams}
            onAddToCart={(p, q) => handleAddToCart(p, { qty: q })}
            defaultActiveTab={dashboardDefaultTab}
            darkMode={darkMode}
          />
        );
      case 'about':
        return <About darkMode={darkMode} />;
      case 'contact':
        return <Contact darkMode={darkMode} />;
      case 'faq':
        return <FAQ darkMode={darkMode} />;
      default:
        return (
          <NotFound
            setView={setViewParams}
            setSearchQuery={setSearchQuery}
            darkMode={darkMode}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between font-sans overflow-x-hidden ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Toast Manager container */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Main navigation Header */}
      <Header
        cart={cart}
        wishlist={wishlist}
        activeView={activeView}
        setView={setViewParams}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Primary content area panel */}
      <main className="flex-1 w-full bg-transparent overflow-hidden">
        {renderContentView()}
      </main>

      {/* Floating back-to-top button custom toggle widget */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className={`fixed bottom-6 left-6 z-40 p-3 rounded-xl border shadow-xl transition-all hover:-translate-y-1 active:translate-y-0 cursor-pointer ${
            darkMode
              ? 'bg-slate-900 border-slate-800 text-cyan-400 hover:bg-slate-800'
              : 'bg-white border-slate-200 text-blue-600 hover:bg-slate-50'
          }`}
          title="Scroll Back To Top"
          id="back-to-top-floating-btn"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Portal overlay Quick View Modal dialog */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(p, opts) =>
            handleAddToCart(p, {
              color: opts.color,
              storageName: opts.storageName,
              switchTypeName: opts.switchTypeName,
              qty: opts.qty,
            })
          }
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlist.includes(quickViewProduct.id)}
          darkMode={darkMode}
        />
      )}

      {/* Master 4-column tech e-commerce footer */}
      <Footer setView={setViewParams} darkMode={darkMode} />
    </div>
  );
}
