import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingCart, Plus, Minus, Shield, Check } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    options: { color?: string; storageName?: string; switchTypeName?: string; qty: number }
  ) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  darkMode: boolean;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  darkMode,
}: QuickViewModalProps) {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions?.[0] || '');
  const [selectedSwitch, setSelectedSwitch] = useState(product.switchTypes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Reset states when product changes
  useEffect(() => {
    setSelectedColor(product.colors?.[0] || '');
    setSelectedStorage(product.storageOptions?.[0] || '');
    setSelectedSwitch(product.switchTypes?.[0] || '');
    setQuantity(1);
    setActiveImageIdx(0);
  }, [product]);

  const handleAddToCart = () => {
    onAddToCart(product, {
      color: selectedColor || undefined,
      storageName: selectedStorage || undefined,
      switchTypeName: selectedSwitch || undefined,
      qty: quantity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog Box */}
      <div
        className={`relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border flex flex-col md:flex-row transform transition-all z-10 max-h-[90vh] md:max-h-[85vh] ${
          darkMode
            ? 'bg-slate-950 border-slate-850 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Close Button absolute top corner */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-xl border z-20 transition-all ${
            darkMode
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
          }`}
          title="Dismiss Modal"
          id="close-quickview-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-850 bg-slate-900/10">
          <div className="flex-1 flex items-center justify-center min-h-[220px] md:min-h-[300px]">
            <img
              src={product.images[activeImageIdx]}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg shadow-sm"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border p-1 transition-all ${
                    idx === activeImageIdx
                      ? darkMode
                        ? 'border-cyan-400 ring-1 ring-cyan-400'
                        : 'border-blue-500 ring-1 ring-blue-500'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-450'
                  }`}
                >
                  <img src={img} alt="Thumbnail view" className="w-full h-full object-cover rounded-md" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Order Attributes Controls */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
          <div>
            {/* Category / Brand Row */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-blue-500 dark:text-cyan-400 font-bold">
                {product.brand} • {product.category}
              </span>
              <span
                className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  product.inStock
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/10'
                    : 'bg-red-500/10 text-red-500 border border-red-500/10'
                }`}
              >
                {product.inStock ? `IN STOCK (${product.stockCount})` : 'OUT OF STOCK'}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-2xl leading-snug tracking-tight mb-2.5 hover:text-blue-500 dark:hover:text-cyan-400 cursor-pointer">
              {product.name}
            </h3>

            {/* Ratings Bar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm font-semibold ml-1">{product.rating}</span>
              </div>
              <span className="text-slate-400 dark:text-slate-500 text-xs font-sans">
                ({product.reviewsCount} customer telemetry ratings)
              </span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-display font-bold text-slate-900 dark:text-white glow-cyan">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-slate-400 dark:text-slate-500 font-sans line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-500 border border-rose-500/10">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Summary description */}
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-6">
              {product.description}
            </p>

            <div className="space-y-4 border-t border-slate-200 dark:border-slate-850 pt-4">
              {/* Variant Selector: Color */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-2 block">
                    Telemetry Color Space
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl border font-medium transition-all ${
                          selectedColor === color
                            ? darkMode
                              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                              : 'border-blue-500 text-blue-600 bg-blue-50'
                            : darkMode
                            ? 'border-slate-800 hover:border-slate-750 text-slate-300'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selector: Storage (smart watches, portable systems) */}
              {product.storageOptions && product.storageOptions.length > 0 && (
                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-2 block">
                    Storage Density Scale
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {product.storageOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedStorage(opt)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl border font-medium transition-all ${
                          selectedStorage === opt
                            ? darkMode
                              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/10'
                              : 'border-blue-500 text-blue-600 bg-blue-50'
                            : 'border-slate-800 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selector: Tactile Switches */}
              {product.switchTypes && product.switchTypes.length > 0 && (
                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-2 block">
                    Acoustic Switch Frequency
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {product.switchTypes.map((sw) => (
                      <button
                        key={sw}
                        onClick={() => setSelectedSwitch(sw)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl border font-medium transition-all ${
                          selectedSwitch === sw
                            ? darkMode
                              ? 'border-cyan-400 text-cyan-400 bg-cyan-950/10'
                              : 'border-blue-500 text-blue-600 bg-blue-50'
                            : 'border-slate-800 text-slate-300'
                        }`}
                      >
                        {sw}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quantity Actions & Purchase CTA Buttons */}
          <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-850 flex gap-4 flex-col sm:flex-row shadow-inner-white">
            {/* Quantity Controls Slider */}
            <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 p-1 rounded-xl w-fit flex-shrink-0">
              <button
                disabled={quantity <= 1}
                onClick={() => setQuantity(quantity - 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold tracking-tight">{quantity}</span>
              <button
                disabled={quantity >= product.stockCount}
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-white transition-all disabled:opacity-30"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 flex gap-2">
              {/* Add To Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3 px-5 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  product.inStock
                    ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 hover:opacity-90 text-white shadow-blue-500/20 dark:shadow-none'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
                id="quickview-add-to-cart-btn"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.inStock ? 'Add to Secure Basket' : 'Out of Stock'}</span>
              </button>

              {/* Toggle Wishlist Heart */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                  isWishlisted
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-500'
                    : darkMode
                    ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
