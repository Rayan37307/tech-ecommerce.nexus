import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ShieldCheck, Truck, Headphones, RotateCcw, Sparkles, Gamepad, Laptop, Cpu, Radio, Plug } from 'lucide-react';
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
  const [activityNote, setActivityNote] = useState<string | null>(
    'New: Premium wireless keyboards now in stock'
  );

  useEffect(() => {
    const alerts = [
      'Limited: Only 12 items left in the Gaming category',
      'Trending: Mechanical keyboards are this week's bestsellers',
      'Sale: Free shipping on orders above $100',
      'New: Premium wireless keyboards now in stock'
    ];
    let alertIdx = 0;
    const alertInterval = setInterval(() => {
      alertIdx = (alertIdx + 1) % alerts.length;
      setActivityNote(alerts[alertIdx]);
    }, 8000);
    return () => clearInterval(alertInterval);
  }, []);

  const trendingProducts = PRODUCTS.slice(0, 8);

  const renderCategoryIcon = (category: string) => {
    const className = "w-8 h-8 mx-auto text-primary";
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
      {/* Activity notification */}
      {activityNote && (
        <div className="bg-surface-alt border-b border-border py-2 px-4 flex items-center justify-between text-sm gap-2">
          <div className="flex items-center gap-3 max-w-3xl">
            <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-text-secondary">{activityNote}</span>
          </div>
          <button
            onClick={() => setActivityNote(null)}
            className="text-text-tertiary hover:text-text-primary flex-shrink-0 p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 border-b border-border">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Collections</span>
          </div>

          <h1 className="font-display font-bold text-5xl md:text-6xl text-text-primary leading-tight">
            Premium Tech Setup for Every Workspace
          </h1>

          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            Discover curated selections of gaming peripherals, productivity tools, and smart home devices engineered for performance and design.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <button
              onClick={() => {
                setView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-primary"
            >
              <span>Browse Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-outline"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 bg-surface-alt border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              SHOP BY CATEGORY
            </span>
            <h2 className="font-display font-bold text-3xl text-text-primary">
              Featured Collections
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setView('shop');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="card p-6 text-center hover:-translate-y-1 active:translate-y-0 transition-all"
              >
                <div className="mb-3 select-none flex justify-center">
                  {renderCategoryIcon(cat)}
                </div>
                <h4 className="font-display font-semibold text-sm text-text-primary mb-1">
                  {cat}
                </h4>
                <span className="text-xs text-text-tertiary font-mono">Explore →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                TRENDING NOW
              </span>
              <h2 className="font-display font-bold text-3xl text-text-primary">
                Popular Products
              </h2>
              <p className="text-sm text-text-secondary max-w-md">
                Customer-approved gear selected for quality and performance.
              </p>
            </div>

            <button
              onClick={() => {
                setView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs uppercase font-mono tracking-wider font-bold text-primary hover:text-hover flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View all products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

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

      {/* Trust Section */}
      <section className="py-16 bg-surface-alt">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <Truck className="w-6 h-6 text-primary" />
              <h4 className="font-display font-bold text-sm text-text-primary">Free Shipping</h4>
              <p className="text-xs text-text-secondary">
                On all orders over $100. Fast, reliable delivery to your door.
              </p>
            </div>

            <div className="space-y-3">
              <Headphones className="w-6 h-6 text-primary" />
              <h4 className="font-display font-bold text-sm text-text-primary">24/7 Support</h4>
              <p className="text-xs text-text-secondary">
                Our team is always available to help with questions and issues.
              </p>
            </div>

            <div className="space-y-3">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h4 className="font-display font-bold text-sm text-text-primary">Secure Checkout</h4>
              <p className="text-xs text-text-secondary">
                SSL encrypted payment processing protecting your information.
              </p>
            </div>

            <div className="space-y-3">
              <RotateCcw className="w-6 h-6 text-primary" />
              <h4 className="font-display font-bold text-sm text-text-primary">1-Year Warranty</h4>
              <p className="text-xs text-text-secondary">
                Full manufacturer warranty on all products purchased with us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
