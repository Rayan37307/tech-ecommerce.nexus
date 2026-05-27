import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Heart, ZoomIn, ShieldCheck, Truck, Headphones, RotateCcw, Flame, Sparkles, Gamepad, Laptop, Cpu, Radio, Plug } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';
import { ProductCard } from '../components/ProductCard';

interface HomeProps {
  setView: (view: string, productId?: string) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onAddToCart: (product: Product, qty: number) => void;
  darkMode: boolean;
}

export default function Home({
  setView,
  onQuickView,
  onToggleWishlist,
  wishlist,
  onAddToCart,
  darkMode,
}: HomeProps) {
  // Deal Timer Countdown
  const [timeLeft, setTimeLeft] = useState({ h: 14, m: 22, s: 45 });
  // Recent activity banner toggle
  const [activityNote, setActivityNote] = useState<string | null>(
    'Priority Notification: 12 clients bought the CyberClaw Pro Keyboard in the last hour.'
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: 59, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 24, m: 0, s: 0 }; // Loop it
      });
    }, 1000);

    // Swap activity alerts occasionally
    const alerts = [
      'Live Metric: Only 5 Horizon 15.6" Monitors remain in central dispatch.',
      'Shipping Update: Global priority air freight is operating with zero delays today.',
      'Trending: Kaelen Vance just configured an Obsidian Black Chronos Smartwatch layout.',
      'Priority Notification: 12 clients bought the CyberClaw Pro Keyboard in the last hour.'
    ];
    let alertIdx = 0;
    const alertInterval = setInterval(() => {
      alertIdx = (alertIdx + 1) % alerts.length;
      setActivityNote(alerts[alertIdx]);
    }, 9000);

    return () => {
      clearInterval(timer);
      clearInterval(alertInterval);
    };
  }, []);

  // Filter trending 
  const trendingProducts = PRODUCTS.slice(0, 8); // Display 8 premium products

  const renderCategoryIcon = (category: string) => {
    const className = "w-8 h-8 mx-auto text-blue-500 dark:text-cyan-400";
    switch (category) {
      case 'Gaming':
        return <Gamepad className={className} />;
      case 'Audio':
        return <Headphones className={className} />;
      case 'Productivity':
        return <Laptop className={className} />;
      case 'Smart Home':
        return <Cpu className={className} />;
      case 'Streaming Gear':
        return <Radio className={className} />;
      default:
        return <Plug className={className} />;
    }
  };

  const handleProductCardClick = (productId: string) => {
    setView('product-detail', productId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="w-full">
      {/* Live Activity Telemetry Bar */}
      {activityNote && (
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950/40 text-slate-200 py-1.5 px-4 text-center text-xs font-mono border-b border-cyan-500/10 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse flex-shrink-0" />
          <span>{activityNote}</span>
          <button
            onClick={() => setActivityNote(null)}
            className="text-[10px] text-slate-500 hover:text-white pb-0.5 ml-1 select-none"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sleek Hero Banner Module */}
      <section className="relative px-4 py-16 md:py-24 overflow-hidden border-b border-slate-200 dark:border-slate-900">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-600/10 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-400/10 dark:bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/20 text-blue-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE FUTURE OF HARDWARE HAS ARRIVED</span>
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-tight md:leading-none tracking-tight">
              Elite Grade <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-400 to-cyan-400 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-500 glow-cyan">
                Setup Telemetry
              </span>
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-lg leading-relaxed font-sans">
              Deploy high-fidelity, ergonomic peripherals engineered for peak tactical speed and design performance. Clean structural metal, silent tactile mechanical switches, and adaptive RGB chips.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-4 px-8 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-tr from-blue-600 to-cyan-400 hover:opacity-90 text-white shadow-xl flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer"
                id="hero-shop-cta-btn"
              >
                <span>Deploy Setup Now</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={() => {
                  setView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-4 px-8 rounded-xl font-semibold text-sm tracking-wide border text-center transition-all cursor-pointer ${
                  darkMode
                    ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'border-slate-250 bg-white text-slate-700 hover:bg-slate-50'
                }`}
                id="hero-manifesto-cta-btn"
              >
                Our Manifesto
              </button>
            </div>

            {/* Micro stats counter */}
            <div className="pt-8 border-t border-slate-200/50 dark:border-slate-950 grid grid-cols-3 gap-6 font-mono text-xs text-slate-500">
              <div>
                <span className="block font-display font-bold text-2xl text-slate-900 dark:text-white mb-1">
                  12K+
                </span>
                <span>Active Stations</span>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl text-slate-900 dark:text-white mb-1">
                  99.8%
                </span>
                <span>Fidelity Rating</span>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl text-slate-900 dark:text-white mb-1">
                  24hr
                </span>
                <span>Global Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium High-Tech Interactive Mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Background glowing rings */}
            <div className="absolute inset-x-0 w-80 h-80 rounded-full border border-cyan-500/10 dark:border-cyan-500/5 animate-spin animate-duration-12000" />
            <div className="absolute inset-x-0 w-64 h-64 rounded-full border border-blue-500/15 dark:border-blue-500/5 animate-reverse-spin" />

            <div className="relative rounded-2xl overflow-hidden glass-panel dark:border-slate-800 border-slate-200 flex flex-col p-6 max-w-sm w-full shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500 border-t-4 border-t-cyan-400">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-mono tracking-widest text-[#22d3ee] font-bold">NEXUS CO. // PROT-001</span>
                <span className="text-xs bg-[#e11d48]/10 text-[#f43f5e] border border-[#f43f5e]/10 px-2.5 py-0.5 rounded-full font-bold">TRENDING</span>
              </div>
              
              <div className="w-full h-48 rounded-xl bg-slate-900/50 dark:bg-slate-950/60 mb-4 flex items-center justify-center relative overflow-hidden group">
                <img
                  src={PRODUCTS[0].images[0]}
                  alt="Keyboard mock"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating telemetry lines inside image container */}
                <div className="absolute bottom-2 left-2 right-2 text-[8px] font-mono text-slate-400 flex justify-between bg-slate-950/80 p-1.5 rounded border border-slate-800">
                  <span>SW_Tactile: Browns</span>
                  <span>LATENCY: 1.02ms</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">{PRODUCTS[0].name}</h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-sans">Full mechanical precision.</span>
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="ml-1 font-semibold text-slate-900 dark:text-white">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-900">
                  <span className="font-display font-bold text-lg text-slate-900 dark:text-white">${PRODUCTS[0].price}</span>
                  <button
                    onClick={() => handleProductCardClick(PRODUCTS[0].id)}
                    className="py-1.5 px-3 rounded-lg text-[10px] uppercase font-mono tracking-wider font-bold bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                  >
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid Section */}
      <section className="py-16 bg-white dark:bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12 force-black-text">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              SPECTRUM
            </span>
            <h2 className="font-display font-bold text-3xl">
              Featured Technical Categories
            </h2>
            <p className="text-sm max-w-md mx-auto font-sans">
              Filter by specific layout requirements. Crafted for precise tactile workflows.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat}
                onClick={() => {
                  setView('shop');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className={`p-6 rounded-2xl border text-center cursor-pointer transform hover:translate-y-[-4px] active:translate-y-0 transition-all ${
                  darkMode
                    ? 'bg-slate-950 hover:bg-slate-900/60 border-slate-900 hover:border-cyan-400/40'
                    : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-blue-500/20 hover:shadow-lg'
                }`}
              >
                <div className="mb-3 select-none">
                  {renderCategoryIcon(cat)}
                </div>
                <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white mb-1">
                  {cat}
                </h4>
                <span className="text-[10px] font-mono text-slate-500">Explore List ↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Catalog Section (6-8 products) */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-500 dark:text-cyan-400 animate-pulse text-indigo-600">
                LATEST TELEMETRY
              </span>
              <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">
                Trending Deployments
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
                A structured catalogue of peer-approved premium peripherals.
              </p>
            </div>

            <button
              onClick={() => {
                setView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs uppercase font-mono tracking-wider font-bold text-blue-500 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all 12 modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                darkMode={darkMode}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onClick={handleProductCardClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar: why shop with us */}
      <section className="py-14 bg-slate-950 text-slate-300 border-b border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <Truck className="w-8 h-8 text-cyan-400 glow-cyan" />
            <h4 className="font-display font-bold text-sm text-white">Insured Free Shipping</h4>
            <p className="text-xs text-slate-500 max-w-xs font-sans">
              Deploy orders automatically with priority ground delivery on purchases above $100.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <Headphones className="w-8 h-8 text-blue-500 glow-blue" />
            <h4 className="font-display font-bold text-sm text-white">24/7 Priority Support</h4>
            <p className="text-xs text-slate-500 max-w-xs font-sans">
              Our support dispatch is always active to configure firmware issues and logistics coordinates.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h4 className="font-display font-bold text-sm text-white">Secured Decryption Gate</h4>
            <p className="text-xs text-slate-500 max-w-xs font-sans">
              Encrypted SSL payment layers protecting CVV indices and profile balances.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <RotateCcw className="w-8 h-8 text-amber-500" />
            <h4 className="font-display font-bold text-sm text-white">1-Year Tech Warranty</h4>
            <p className="text-xs text-slate-500 max-w-xs font-sans">
              Full hardware coverage verifying structural board fuses, mechanical switches, and sensors.
            </p>
          </div>
        </div>
      </section>

      {/* Promotional interactive banner for limited deals */}
      <section className="py-16 bg-white dark:bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-blue-500/20">
            {/* Background design grids */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="space-y-4 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                <Flame className="w-3 h-3 text-cyan-300" />
                <span>LIMITED QUANTITY CONSTRAINTS ORDER</span>
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight">
                Get up to 25% Off on Select <br />Mechanical Hardware modules!
              </h2>
              <p className="text-slate-300 text-sm font-sans">
                Our custom CyberClaw tactile series and NeoPods audio filters are experiencing high dispatch levels today. Claim promotional coupons before depletion.
              </p>

              {/* Countdown panel */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-mono text-slate-400 mr-2 uppercase tracking-wide">Deletes In:</span>
                <div className="flex gap-1.5 text-center">
                  <div className="bg-slate-950/60 font-mono tracking-tight font-bold text-slate-200 p-2.5 rounded-xl text-sm border border-slate-800 min-w-[45px]">
                    {String(timeLeft.h).padStart(2, '0')}
                    <span className="block text-[8px] uppercase tracking-wide text-cyan-500 font-semibold mt-0.5">HRS</span>
                  </div>
                  <span className="text-xl font-bold font-mono self-center text-cyan-400">:</span>
                  <div className="bg-slate-950/60 font-mono tracking-tight font-bold text-slate-200 p-2.5 rounded-xl text-sm border border-slate-800 min-w-[45px]">
                    {String(timeLeft.m).padStart(2, '0')}
                    <span className="block text-[8px] uppercase tracking-wide text-cyan-500 font-semibold mt-0.5">MINS</span>
                  </div>
                  <span className="text-xl font-bold font-mono self-center text-cyan-400">:</span>
                  <div className="bg-slate-950/60 font-mono tracking-tight font-bold text-slate-200 p-2.5 rounded-xl text-sm border border-slate-800 min-w-[45px]">
                    {String(timeLeft.s).padStart(2, '0')}
                    <span className="block text-[8px] uppercase tracking-wide text-cyan-500 font-semibold mt-0.5">SECS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA action column to shop */}
            <div className="flex flex-col items-center gap-3 w-fit md:min-w-[200px]">
              <button
                onClick={() => {
                  setView('shop');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="w-full text-center py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-widest font-mono text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md transform hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
                id="promotional-banner-cta-btn"
              >
                Intercept Deal
              </button>
              <span className="text-[10px] text-slate-400 font-mono">CODE: DISPATCH2026 // 25% OFF</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
