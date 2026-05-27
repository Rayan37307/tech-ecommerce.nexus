import React, { useState, useEffect, useMemo } from 'react';
import { Star, Heart, ShoppingCart, Plus, Minus, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailProps {
  productId: string;
  setView: (view: string, id?: string) => void;
  onAddToCart: (
    product: Product,
    options: { color?: string; storageName?: string; switchTypeName?: string; qty: number }
  ) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  darkMode: boolean;
}

export default function ProductDetail({
  productId,
  setView,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  darkMode,
}: ProductDetailProps) {
  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  }, [productId]);

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedSwitch, setSelectedSwitch] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });

  // Open / Close states for accordions description, specs, shipping
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    specs: false,
    shipping: false,
  });

  useEffect(() => {
    // Reset variants when product changes
    setActiveImgIdx(0);
    setSelectedColor(product.colors?.[0] || '');
    setSelectedStorage(product.storageOptions?.[0] || '');
    setSelectedSwitch(product.switchTypes?.[0] || '');
    setQuantity(1);
    setOpenAccordions({ description: true, specs: false, shipping: false });
  }, [product]);

  const isWishlisted = wishlist.includes(product.id);

  const toggleAccordion = (section: 'description' | 'specs' | 'shipping') => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleZoomHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - window.scrollX - left) / width) * 100;
    const y = ((e.pageY - window.scrollY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleZoomLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' });
  };

  const handleAddToCart = () => {
    onAddToCart(product, {
      color: selectedColor || undefined,
      storageName: selectedStorage || undefined,
      switchTypeName: selectedSwitch || undefined,
      qty: quantity,
    });
  };

  // Recommendations: 4 products from same category or complementary
  const recommendations = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-xs font-mono text-slate-500 flex gap-1.5 items-center mb-8 flex-wrap">
        <button onClick={() => setView('home')} className="hover:text-blue-500 dark:hover:text-cyan-400 transition-colors">
          HOME
        </button>
        <span>/</span>
        <button onClick={() => setView('shop')} className="hover:text-blue-500 dark:hover:text-cyan-400 transition-colors">
          SHOP
        </button>
        <span>/</span>
        <span className="text-slate-400 dark:text-slate-500">{product.category.toUpperCase()}</span>
        <span>/</span>
        <span className="text-slate-900 dark:text-slate-100 font-bold truncate max-w-[200px]">
          {product.name.toUpperCase()}
        </span>
      </nav>

      {/* Main product columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left Side: Images drawer */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main image container with no zoom animations */}
          <div
            className="relative bg-slate-900/5 dark:bg-slate-900/20 rounded-2xl w-full aspect-square flex items-center justify-center border border-slate-200 dark:border-slate-850 overflow-hidden h-[350px] sm:h-[480px] md:h-[520px]"
          >
            <img
              src={product.images[activeImgIdx]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails Swiper list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden p-1.5 border transition-all ${
                    idx === activeImgIdx
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                      : darkMode
                      ? 'border-slate-800 hover:border-slate-700 bg-slate-900'
                      : 'border-slate-200 hover:border-slate-350 bg-white shadow-xs'
                  }`}
                >
                  <img src={img} alt="Detail view" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Properties selection */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8">
          
          {/* Header titles */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs uppercase font-mono tracking-widest text-[#22d3ee] font-bold">
                {product.brand} // SPECTRUM HARDWARE
              </span>

              {/* Stock telemetry status label */}
              <span
                className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold ${
                  product.inStock
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/10'
                    : 'bg-red-500/10 text-red-500 border border-red-500/10'
                }`}
              >
                {product.inStock ? `READY IN DISPATCH (${product.stockCount})` : 'STOCK DEPLETED'}
              </span>
            </div>

            <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Ratings summary banner */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex items-center text-amber-400 bg-slate-100 dark:bg-slate-900/60 px-2 py-0.5 rounded-lg border border-slate-200/50 dark:border-slate-800 text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                ({product.reviewsCount} verified telemetry checkout logs)
              </span>
            </div>
          </div>

          {/* Pricing indicator */}
          <div className="flex items-baseline gap-4 py-3 border-y border-slate-200/50 dark:border-slate-900">
            <span className="text-4xl font-display font-bold text-slate-950 dark:text-white glow-cyan">
              ${product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-slate-400 dark:text-slate-500 line-through">
                  ${product.originalPrice}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  Save ${product.originalPrice - product.price} IMMEDIATELY
                </span>
              </>
            )}
          </div>

          {/* Short summary text */}
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-sans mt-3">
            {product.description}
          </p>

          {/* Variants Configuration Section */}
          <div className="space-y-5">
            {/* 1. Color variant block */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">
                  Color Field Space: <span className="text-slate-900 dark:text-slate-200 font-semibold">{selectedColor}</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`text-xs px-4 py-2.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                        selectedColor === color
                          ? darkMode
                            ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                            : 'border-blue-500 text-blue-600 bg-blue-50'
                          : darkMode
                          ? 'border-slate-850 text-slate-350 hover:border-slate-750'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Storage specifications (watches, etc) */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">
                  Capacity Configuration: <span className="text-slate-900 dark:text-slate-200 font-semibold">{selectedStorage}</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.storageOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedStorage(opt)}
                      className={`text-xs px-4 py-2.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                        selectedStorage === opt
                          ? darkMode
                            ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                            : 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-300 bg-white dark:bg-transparent'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Key Switch specifications (keyboards) */}
            {product.switchTypes && product.switchTypes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">
                  Acoustic Key switch: <span className="text-slate-900 dark:text-slate-200 font-semibold">{selectedSwitch}</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {product.switchTypes.map((sw) => (
                    <button
                      key={sw}
                      onClick={() => setSelectedSwitch(sw)}
                      className={`text-xs px-4 py-2.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                        selectedSwitch === sw
                          ? darkMode
                            ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                            : 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {sw}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shipping Estimation Notice block */}
          <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-950/10 space-y-2 text-xs font-sans">
            <div className="flex gap-2 items-center text-slate-800 dark:text-slate-300 font-bold">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>Priority Telemetry Shipping Estimated</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Complete dispatch settings within 2 hours to ship by tomorrow, arriving:
              <br />
              <span className="font-semibold text-slate-800 dark:text-slate-100 font-mono">
                Friday, May 29, 2026 (Free Insured Ground Option)
              </span>
            </p>
          </div>

          {/* Quantity selector & Add to cart CTA row */}
          <div className="flex gap-4 flex-col sm:flex-row pt-4">
            
            {/* Quantity Slider toggler */}
            <div className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-850 p-1.5 rounded-xl w-fit flex-shrink-0 bg-white dark:bg-slate-950">
              <button
                disabled={quantity <= 1}
                onClick={() => setQuantity(quantity - 1)}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-white transition-all disabled:opacity-30 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-semibold text-sm">{quantity}</span>
              <button
                disabled={quantity >= product.stockCount}
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-white transition-all disabled:opacity-30 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 flex gap-3">
              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-6 rounded-xl font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
                  product.inStock
                    ? 'bg-gradient-to-tr from-blue-600 to-cyan-400 text-white hover:opacity-95 shadow-blue-500/10'
                    : 'bg-slate-300 dark:bg-slate-900 text-slate-500 dark:text-slate-650 cursor-not-allowed'
                }`}
                id="pdp-add-to-cart-btn"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.inStock ? 'Deploy to active basket' : 'Sold Out!'}</span>
              </button>

              {/* Toggle Wishlist Heart */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-4 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  isWishlisted
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/25 text-rose-500'
                    : darkMode
                    ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 shadow-xs'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Accordions detailed specs specifications section */}
          <div className="border-t border-slate-200 dark:border-slate-900 pt-6 space-y-4 font-sans">
            
            {/* 1. Description long Manifesto */}
            <div className="border-b border-slate-200/50 dark:border-slate-900 pb-4">
              <button
                onClick={() => toggleAccordion('description')}
                className="w-full flex justify-between items-center text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                <span>Brand Description Manifesto</span>
                {openAccordions.description ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {openAccordions.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed max-w-2xl">
                  {product.fullDescription}
                </p>
              )}
            </div>

            {/* 2. specifications table */}
            <div className="border-b border-slate-200/50 dark:border-slate-900 pb-4">
              <button
                onClick={() => toggleAccordion('specs')}
                className="w-full flex justify-between items-center text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                <span>Technical Specifications</span>
                {openAccordions.specs ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {openAccordions.specs && (
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-250 dark:border-slate-900 text-xs">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value], idx) => (
                        <tr
                          key={key}
                          className={`${
                            idx % 2 === 0
                              ? darkMode
                                ? 'bg-slate-950/40'
                                : 'bg-slate-50'
                              : 'bg-transparent'
                          } border-b border-slate-200/50 dark:border-slate-900/50 last:border-0`}
                        >
                          <td className="p-3 font-semibold text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase w-1/3">
                            {key}
                          </td>
                          <td className="p-3 text-slate-800 dark:text-slate-300 font-medium">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 3. Shipping & returns policies */}
            <div className="border-b border-slate-200/50 dark:border-slate-900 pb-4">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex justify-between items-center text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                <span>Shipping & Returns Policy</span>
                {openAccordions.shipping ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {openAccordions.shipping && (
                <ul className="text-xs text-slate-550 dark:text-slate-400 mt-3 space-y-2 leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <Truck className="w-3.5 h-3.5 text-blue-500 mt-0.5" />
                    <span>Free Standard Ground shipping is auto-applied to all checkout orders exceeding $100.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <RotateCcw className="w-3.5 h-3.5 text-rose-500 mt-0.5" />
                    <span>Hassle-free 30-day structural physical trial window is included with full pre-paid return slips.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
                    <span>Dispatched in eco-friendly climate-insulated zero-plastic retail cardboard shells.</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended/Complementary Products Cards List */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-900">
        <div className="space-y-3 mb-8">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#22d3ee]">
            PEER EVALUATED
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
            You May Also Configure
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
            Other functional modules compatible with your hardware workspace setups.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              darkMode={darkMode}
              onClick={() => {
                setView('product-detail', p.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              simpleVariant={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
