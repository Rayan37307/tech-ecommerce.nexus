import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, ShieldCheck, Tag, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdateQty: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onApplyCoupon: (code: string) => void;
  appliedCoupon: { code: string; discountPercent: number; flatDiscount: number } | null;
  setView: (view: string, id?: string) => void;
  darkMode: boolean;
}

export default function Cart({
  cart,
  onUpdateQty,
  onRemoveItem,
  onApplyCoupon,
  appliedCoupon,
  setView,
  darkMode,
}: CartProps) {
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  // Subtotal calculations
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent > 0) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount > 0) {
      discount = appliedCoupon.flatDiscount;
    }
  }

  // Final Total
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();

    if (code === 'DISPATCH2026' || code === 'NEXUS20') {
      onApplyCoupon(code);
      setCouponCode('');
    } else if (code === 'CYBER15') {
      onApplyCoupon(code);
      setCouponCode('');
    } else {
      setCouponError('Invalid telemetry coupon credentials.');
    }
  };

  const handleProceedToCheckout = () => {
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full mx-auto bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-455">
          <ShoppingBag className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display font-bold text-2xl text-text-primary">Your Basket is Empty</h2>
          <p className="text-sm text-text-secondary font-sans leading-relaxed">
            No technical hardware modules have been authorized to this dispatch session. Initialize configurations from our marketplace.
          </p>
        </div>
        <button
          onClick={() => setView('shop')}
          className="w-full py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-slate-950 bg-primary hover:bg-cyan-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Marketplace Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="space-y-2 mb-10">
        <span className="text-[10px] font-mono tracking-widest text-[#22d3ee] font-bold">
          SECURITY BASKET REGISTER
        </span>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary">
          Active Shopping Basket
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border overflow-hidden border-border">
            
            {/* Header row descriptor */}
            <div className="hidden md:grid grid-cols-12 p-4 text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-950/40 border-b border-border font-bold">
              <div className="col-span-6">Configure Specifications</div>
              <div className="col-span-2 text-center">Price Index</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Aggregate</div>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-900">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-2 p-5 items-center ${
                    darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'
                  }`}
                >
                  {/* Left block Info */}
                  <div className="col-span-6 flex gap-4 items-center">
                    <div
                      onClick={() => setView('product-detail', item.product.id)}
                      className="w-16 h-16 rounded-xl bg-slate-900/5 flex items-center justify-center cursor-pointer flex-shrink-0 border border-slate-200 dark:border-slate-850"
                    >
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>

                    <div className="space-y-1">
                      <h4
                        onClick={() => setView('product-detail', item.product.id)}
                        className="font-display font-bold text-sm hover:text-[#22d3ee] transition-colors leading-snug cursor-pointer line-clamp-1"
                      >
                        {item.product.name}
                      </h4>

                      {/* Display Selected Custom Variants */}
                      <div className="flex gap-2 text-[10px] font-mono text-slate-550 flex-wrap">
                        {item.selectedColor && (
                          <span className="bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-850">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedStorage && (
                          <span className="bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-850">
                            Storage: {item.selectedStorage}
                          </span>
                        )}
                        {item.selectedSwitchType && (
                          <span className="bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-855">
                            Switch: {item.selectedSwitchType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-left md:text-center font-semibold text-sm">
                    <span className="md:hidden text-[10px] font-mono text-slate-500 uppercase mr-1">Unit:</span>
                    ${item.product.price}
                  </div>

                  {/* Quantity indicators */}
                  <div className="col-span-2 flex justify-start md:justify-center">
                    <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-850 p-1 rounded-xl bg-white dark:bg-slate-900">
                      <button
                        disabled={item.quantity <= 1}
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                        id={`cart-qty-dec-${item.id}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                      <button
                        disabled={item.quantity >= item.product.stockCount}
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                        id={`cart-qty-inc-${item.id}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total aggregate + Close Trash toggle */}
                  <div className="col-span-2 flex items-center justify-between md:justify-end gap-3 font-display font-bold text-sm">
                    <div>
                      <span className="md:hidden text-[10px] font-mono text-slate-550 uppercase mr-1">Sum:</span>
                      ${item.product.price * item.quantity}
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-500/10"
                      title="Erase Module"
                      id={`cart-remove-item-${item.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info Assurances */}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-blue-500/10 bg-blue-500/5 text-xs text-text-secondary max-w-xl">
            <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Your telemetry variables are tracked locally using local index keys. Checkout actions are routed under TLS-secured configurations. No credentials leak from browser files.
            </p>
          </div>
        </div>

        {/* Right Side: Calculation Order Sticky Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div
            className={`border rounded-2xl p-6 space-y-5 ${
              darkMode ? 'bg-text' : 'bg-surface'
            }`}
          >
            <h3 className="font-display font-bold text-base text-text-primary pb-3 border-b border-slate-250 dark:border-slate-900">
              Session Invoice Summary
            </h3>

            {/* Price Ledger details */}
            <div className="space-y-3.5 text-xs font-sans text-text-secondary">
              <div className="flex justify-between">
                <span>Hardware Subtotal:</span>
                <span className="font-semibold text-text-primary font-mono">${subtotal}</span>
              </div>

              {/* Coupon discounts if present */}
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon ({appliedCoupon.code}):</span>
                  </span>
                  <span className="font-mono">-${discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Freight Delivery:</span>
                <span className="font-semibold text-text-primary font-mono">
                  {shipping === 0 ? 'FREE' : `$${shipping}`}
                </span>
              </div>

              {shipping > 0 && (
                <p className="text-[10px] text-slate-455 text-right font-mono">
                  (Add ${100 - subtotal} more for free ship)
                </p>
              )}

              <div className="pt-4 border-t border-slate-250 dark:border-slate-905 flex justify-between items-baseline">
                <span className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">Total Balance:</span>
                <span className="font-display font-bold text-2xl text-slate-950 dark:text-white glow-cyan font-mono">
                  ${total}
                </span>
              </div>
            </div>

            {/* Coupon Code Input form */}
            {!appliedCoupon ? (
              <form onSubmit={handleCouponSubmit} className="space-y-2 pt-2">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                  Promo/Telemetry Coupon
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="DISPATCH2026 / CYBER15"
                    value={couponCode}
                    aria-label="Input field for discount coupon"
                    onChange={(e) => setCouponCode(e.target.value)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs outline-none border transition-all ${
                      darkMode
                        ? 'bg-slate-900 border-slate-805 text-slate-200 focus:border-cyan-400'
                        : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl text-xs font-bold font-mono uppercase bg-slate-900 dark:bg-slate-800 hover:opacity-90 text-slate-100 cursor-pointer"
                    id="apply-coupon-btn"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] text-red-500 font-mono tracking-tight">{couponError}</p>
                )}
                <p className="text-[9px] text-slate-400 font-mono italic">
                  Hint: Enter "DISPATCH2026" for 20% discount on order!
                </p>
              </form>
            ) : (
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/15 text-xs text-center flex justify-between items-center">
                <span className="font-medium">✓ Coupon applied: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent ? '20%' : '$15'})</span>
                <button
                  onClick={() => onApplyCoupon('')} // reset action
                  className="text-[10px] uppercase font-mono tracking-wider text-rose-500 hover:underline cursor-pointer"
                >
                  [Remove]
                </button>
              </div>
            )}

            {/* Proceeds trigger */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-widest text-slate-950 bg-primary hover:bg-cyan-300 shadow-md flex items-center justify-center gap-2 transform active:scale-98 transition-all cursor-pointer"
              id="cart-checkout-cta-btn"
            >
              <span>Authorized Checkout</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
