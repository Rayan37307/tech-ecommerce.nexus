import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, ZoomIn, Star, ArrowUpDown, RefreshCcw, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES, BRANDS } from '../data';
import { ProductCard } from '../components/ProductCard';

interface ShopProps {
  setView: (view: string, productId?: string) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onAddToCart: (product: Product, qty: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
}

export default function Shop({
  setView,
  onQuickView,
  onToggleWishlist,
  wishlist,
  onAddToCart,
  searchQuery,
  setSearchQuery,
  darkMode,
}: ShopProps) {
  // Sidebar State Managers
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Clear all filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setMaxPrice(300);
    setMinRating(0);
    setOnlyInStock(false);
    setSortBy('popular');
    setSearchQuery('');
  };

  // Real Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Name query filter
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      // 2. Category Filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // 3. Brand Filter
      if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
        return false;
      }
      // 4. Price Filter
      if (p.price > maxPrice) {
        return false;
      }
      // 5. Rating Filter
      if (p.rating < minRating) {
        return false;
      }
      // 6. InStock Filter
      if (onlyInStock && !p.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === 'price-low-high') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high-low') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'newest') {
        // Sequential mockup ID
        return b.id.localeCompare(a.id);
      }
      if (sortBy === 'best-selling') {
        return b.reviewsCount - a.reviewsCount;
      }
      // Popular is default
      return b.rating * b.reviewsCount - a.rating * a.reviewsCount;
    });
  }, [searchQuery, selectedCategory, selectedBrand, maxPrice, minRating, onlyInStock, sortBy]);

  const handleProductClick = (productId: string) => {
    setView('product-detail', productId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      
      {/* Title / Info Header banner */}
      <div className="space-y-4 mb-8">
        <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 dark:text-cyan-400 font-bold">
          SECURE PROTOCOL CATALOG
        </span>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 dark:text-white">
          Hardware Marketplace
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-sans max-w-xl">
          Apply dynamic filters to configure custom hardware modules. Filter tactile keys, GaN travel modules, or AMOLED displays.
        </p>
      </div>

      <div className="flex gap-8 items-start relative">
        
        {/* Desktop Sidebar Filters Component Layout */}
        <aside
          className={`lg:w-64 w-full flex-shrink-0 space-y-6 lg:block border rounded-2xl p-5 ${
            showMobileFilters ? 'fixed inset-x-4 top-24 bottom-6 z-30 overflow-y-auto block' : 'hidden'
          } ${
            darkMode
              ? 'bg-slate-950 border-slate-900 text-slate-200'
              : 'bg-slate-50 border-slate-200 text-slate-800 shadow-xs'
          }`}
        >
          {/* Close button for Mobile Screens */}
          {showMobileFilters && (
            <div className="flex justify-between items-center pb-4 border-b border-slate-850">
              <span className="font-mono text-xs font-semibold">Active Filter Panel</span>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-xs text-rose-500 uppercase font-mono font-bold"
              >
                Dismiss x
              </button>
            </div>
          )}

          {/* Reset Filters Trigger */}
          <div className="flex justify-between items-center pb-2 border-b border-slate-250 dark:border-slate-900">
            <span className="font-display font-bold text-xs uppercase tracking-wide">Filters</span>
            <button
              onClick={resetFilters}
              className="text-[10px] uppercase font-mono tracking-wider font-semibold text-rose-500 hover:opacity-85 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>

          {/* Search bar helper inside sidebar */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">
              Search Modules
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ex. keyboard, charger"
                value={searchQuery}
                aria-label="Search term input for product cards"
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2.5 pl-9 pr-3 rounded-xl text-xs outline-none border transition-all ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                    : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          {/* Category Filters Accordion */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">
              Category
            </label>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`text-left py-2 px-3.5 rounded-xl text-xs font-semibold tracking-tight transition-all truncate ${
                  selectedCategory === 'All'
                    ? darkMode
                      ? 'bg-cyan-950/20 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.06)]'
                      : 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                All Categories ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((cat) => {
                const count = PRODUCTS.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left py-2 px-3.5 rounded-xl text-xs font-semibold tracking-tight transition-all truncate ${
                      selectedCategory === cat
                        ? darkMode
                          ? 'bg-cyan-950/20 text-cyan-400'
                          : 'bg-blue-50 text-blue-600'
                        : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brands Filters */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">
              Manufacturing Brands
            </label>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setSelectedBrand('All')}
                className={`text-left py-2 px-3.5 rounded-xl text-xs font-semibold tracking-tight transition-all ${
                  selectedBrand === 'All'
                    ? darkMode
                      ? 'bg-cyan-950/20 text-cyan-400'
                      : 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Brands
              </button>
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`text-left py-2 px-3.5 rounded-xl text-xs font-semibold tracking-tight transition-all ${
                    selectedBrand === brand
                      ? darkMode
                        ? 'bg-cyan-950/20 text-cyan-400'
                        : 'bg-blue-50 text-blue-600'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider Filter */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline gap-2">
              <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
                Max Price Limits
              </label>
              <span className="text-sm font-display font-medium text-slate-900 dark:text-white font-mono tracking-tight glow-cyan">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="300"
              value={maxPrice}
              aria-label="Filter maximum price limits"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$30</span>
              <span>$300</span>
            </div>
          </div>

          {/* Rating filter checkbox selectors */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">
              Minimum Rating
            </label>
            <div className="flex flex-col gap-1.5 pt-0.5">
              {[0, 4.5, 4.7, 4.8].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setMinRating(stars)}
                  className={`text-left py-1.5 px-3 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all ${
                    minRating === stars
                      ? darkMode
                        ? 'border-cyan-400 bg-cyan-950/20 text-cyan-400'
                        : 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${stars > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span>{stars === 0 ? 'Any Rating' : `${stars}+ Stars`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stock availability checkbox toggle */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-900">
            <input
              type="checkbox"
              id="stock-only"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-slate-900 rounded border-slate-800 outline-none focus:ring-0 cursor-pointer"
            />
            <label
              htmlFor="stock-only"
              className="text-xs font-medium text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-800 dark:hover:text-white"
            >
              Only In Stock
            </label>
          </div>
        </aside>

        {/* Backdrop for mobile filters overlay */}
        {showMobileFilters && (
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-25 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          />
        )}

        {/* Main Grid Product List Column */}
        <div className="flex-1 w-full space-y-6">
          {/* Sorting / mobile trigger layout tools */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-100 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-200 dark:border-slate-900">
            
            {/* Count */}
            <div className="text-sm font-sans text-slate-500 text-center sm:text-left">
              Showing <span className="font-semibold text-slate-900 dark:text-slate-300">{filteredProducts.length}</span> of {PRODUCTS.length} hardware variants
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
              {/* Trigger for Filters on Mobile screens */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className={`lg:hidden py-2 px-3.5 border rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  darkMode
                    ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
                title="Open Responsive Filter Drawer"
                id="mobile-filter-drawer-btn"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              {/* Sorting Down */}
              <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
                <select
                  value={sortBy}
                  aria-label="Sort products by criteria"
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`flex-1 sm:flex-initial py-2 pl-3 pr-8 rounded-xl text-xs font-semibold border outline-none cursor-pointer transition-all ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                      : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                  }`}
                >
                  <option value="popular">Popular Rating</option>
                  <option value="price-low-high">Price: Low - High</option>
                  <option value="price-high-low">Price: High - Low</option>
                  <option value="rating">Rating Levels</option>
                  <option value="newest">Fresh Firmware Drops</option>
                  <option value="best-selling">Elite Demand Volume</option>
                </select>
              </div>
            </div>
          </div>

          {/* Empty filtered grid state */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-slate-200 dark:border-slate-900">
              <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="font-display font-medium text-lg text-slate-950 dark:text-white mb-2">No hardware matches filters</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                Try expanding your maximum price slider, checking other categories, or clearing search query filters to display assets.
              </p>
              <button
                onClick={resetFilters}
                className="py-2.5 px-5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md cursor-pointer"
              >
                Reset Grid Filters
              </button>
            </div>
          ) : (
            /* Responsive Product Grid spacing */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  darkMode={darkMode}
                  isWishlisted={wishlist.includes(p.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
