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
        className="rounded-lg border border-border bg-surface flex flex-col justify-between overflow-hidden relative cursor-pointer hover:border-border-strong hover:shadow-md transition-all"
        onClick={() => onClick(product.id)}
      >
        <div className="w-full aspect-square bg-surface-alt flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-4 space-y-1">
          <span className="text-[8px] font-mono uppercase text-text-tertiary font-bold block">
            {product.brand}
          </span>
          <h4 className="font-display font-bold text-xs truncate leading-snug text-text-primary">
            {product.name}
          </h4>
          <div className="flex justify-between items-baseline pt-1">
            <span className="text-xs font-semibold text-text-primary">
              ${product.price}
            </span>
            <span className="text-[9px] text-warning font-bold flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-warning" />
              <span>{product.rating}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group rounded-lg border border-border bg-surface flex flex-col justify-between overflow-hidden relative transition-all hover:border-border-strong hover:shadow-md"
    >
      {/* Action hearts and quick view hover triggers */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-2 rounded-md border transition-all cursor-pointer ${
              isWish
                ? 'border-error bg-error/10 text-error'
                : 'border-border bg-surface-alt text-text-secondary hover:text-primary'
            }`}
            title={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWish ? 'fill-error' : ''}`} />
          </button>
        )}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 rounded-md border border-border bg-surface-alt text-text-secondary hover:text-primary transition-all cursor-pointer"
            title="Quick view"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Stock & Trending Badges */}
      {product.isTrending && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-error/10 text-error border border-error/20 text-[9px] px-2.5 py-0.5 rounded-full font-bold font-mono">
            TRENDING
          </span>
        </div>
      )}

      {!product.inStock && (
        <span className="absolute top-3 left-3 z-10 bg-error/10 text-error border border-error/20 text-[9px] px-2.5 py-0.5 rounded-full font-bold font-mono">
          OUT OF STOCK
        </span>
      )}

      {/* Top Image Box */}
      <div
        onClick={() => onClick(product.id)}
        className="w-full aspect-square bg-surface-alt flex items-center justify-center cursor-pointer relative overflow-hidden"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Details Card */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between gap-2 text-[10px] font-mono text-text-tertiary font-bold mb-1">
            <span>{product.brand}</span>
            <span>{product.category}</span>
          </div>
          <h3
            onClick={() => onClick(product.id)}
            className="font-display font-bold text-sm text-text-primary group-hover:text-primary transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Ratings reviews */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex items-center text-warning">
              <Star className="w-3.5 h-3.5 fill-warning" />
              <span className="font-semibold ml-1">{product.rating}</span>
            </div>
            <span className="text-[10px] text-text-tertiary">
              ({product.reviewsCount} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-text-primary">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-text-tertiary line-through">
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
              className={`text-[10px] uppercase font-mono tracking-wider font-bold py-2 px-3.5 rounded-md border flex items-center gap-1 transition-all cursor-pointer ${
                !product.inStock
                  ? 'border-border text-text-disabled bg-surface-alt cursor-not-allowed opacity-50'
                  : 'border-primary text-primary hover:bg-primary/10'
              }`}
              id={`add-cart-btn-${product.id}`}
            >
              <ShoppingCart className="w-3 h-3" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
