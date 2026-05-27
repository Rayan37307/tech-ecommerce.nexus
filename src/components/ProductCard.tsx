import React from 'react';
import { Heart, ZoomIn, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  darkMode: boolean;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  onQuickView?: (p: Product) => void;
  onAddToCart?: (p: Product, qty: number) => void;
  onClick: (productId: string) => void;
  simpleVariant?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  darkMode,
  isWishlisted = false,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onClick,
  simpleVariant = false,
}) => {
  const isWish = isWishlisted;

  if (simpleVariant) {
    return (
      <div
        className={`rounded-2xl border flex flex-col justify-between overflow-hidden relative cursor-pointer hover:border-blue-500/30 dark:hover:border-cyan-400/30 transition-all ${
          darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'
        }`}
        onClick={() => onClick(product.id)}
      >
        <div className="w-full aspect-square bg-slate-900/5 dark:bg-slate-900/10 flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-4 space-y-1 bg-transparent">
          <span className="text-[8px] font-mono uppercase text-slate-500 font-bold block">
            {product.brand}
          </span>
          <h4 className="font-display font-bold text-xs truncate leading-snug">
            {product.name}
          </h4>
          <div className="flex justify-between items-baseline pt-1">
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              ${product.price}
            </span>
            <span className="text-[9px] text-[#fbbf24] font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group rounded-2xl border flex flex-col justify-between overflow-hidden relative transition-all ${
        darkMode
          ? 'bg-slate-950 border-slate-900 hover:border-cyan-400/40 hover:shadow-[0_5px_25px_rgba(34,211,238,0.06)]'
          : 'bg-white border-slate-200 hover:border-blue-500/30 hover:shadow-xl'
      }`}
    >
      {/* Action hearts and quick view hover triggers */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-2 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
              isWish
                ? 'border-rose-500 bg-rose-500/10 text-rose-500'
                : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white'
            }`}
            title={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500' : ''}`} />
          </button>
        )}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white backdrop-blur-md transition-all cursor-pointer"
            title="Quick Analysis View"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Stock & Trending Badges */}
      {product.isTrending && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-rose-500/10 text-[#f43f5e] border border-rose-500/20 text-[9px] px-2.5 py-0.5 rounded-full font-bold font-mono">
            TOP COIL
          </span>
        </div>
      )}

      {!product.inStock && (
        <span className="absolute top-3 left-3 z-10 bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] px-2.5 py-0.5 rounded-full font-bold font-mono">
          DEPLETED
        </span>
      )}

      {/* Top Image Box */}
      <div
        onClick={() => onClick(product.id)}
        className="w-full aspect-square bg-slate-900/5 flex items-center justify-center cursor-pointer relative overflow-hidden"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Details Card */}
      <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between gap-2 text-[10px] font-mono text-slate-500 font-bold mb-1">
            <span>{product.brand}</span>
            <span>{product.category}</span>
          </div>
          <h3
            onClick={() => onClick(product.id)}
            className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Ratings reviews */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-semibold ml-1">{product.rating}</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              ({product.reviewsCount} customer telemetry)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-900 mt-2">
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-slate-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {onAddToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product, 1);
              }}
              disabled={!product.inStock}
              className={`text-[10px] uppercase font-mono tracking-wider font-bold py-2 px-3.5 rounded-xl border flex items-center gap-1 transition-all cursor-pointer ${
                !product.inStock
                  ? 'border-slate-850 text-slate-600 bg-transparent cursor-not-allowed opacity-50'
                  : darkMode
                  ? 'border-slate-800 hover:border-cyan-400 hover:bg-cyan-950/20 text-slate-300 hover:text-cyan-400'
                  : 'border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-600 hover:text-blue-600'
              }`}
              id={`add-cart-btn-${product.id}`}
            >
              <ShoppingCart className="w-3 h-3" />
              <span>Basket</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
