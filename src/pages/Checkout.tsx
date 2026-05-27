import React, { useState, useMemo } from 'react';
import { Truck, CreditCard, ChevronRight, AlertCircle, ShoppingCart, Lock } from 'lucide-react';
import { Address, ShippingMethod, PaymentDetails, CartItem } from '../types';
import { SHIPPING_METHODS } from '../data';

interface CheckoutProps {
  cart: CartItem[];
  appliedCoupon: { code: string; discountPercent: number; flatDiscount: number } | null;
  onPlaceOrder: (address: Address, shipping: ShippingMethod, payment: PaymentDetails) => void;
  setView: (view: string) => void;
  darkMode: boolean;
}

export default function Checkout({
  cart,
  appliedCoupon,
  onPlaceOrder,
  setView,
  darkMode,
}: CheckoutProps) {
  // Stepper tracker
  const [activeStep, setActiveStep] = useState<number>(1); // 1: Shipping Address, 2: Freight Speed, 3: Secure Payment

  // Step 1: Shipping information Address states
  const [address, setAddress] = useState<Address>({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  // Step 2: Shipping speed
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(SHIPPING_METHODS[0]);

  // Step 3: Payment Cards
  const [payment, setPayment] = useState<PaymentDetails>({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Errors holder
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculations subtotal
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  // Discount
  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountPercent > 0) {
      return Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    }
    return appliedCoupon.flatDiscount;
  }, [appliedCoupon, subtotal]);

  // Shipping cost
  const shippingCost = useMemo(() => {
    // If standard choice and subtotal > 100, free shipping
    if (selectedShipping.id === 'standard' && subtotal > 100) return 0;
    return selectedShipping.price;
  }, [selectedShipping, subtotal]);

  const totalBalance = Math.max(0, subtotal - discount + shippingCost);

  // Form Field Validation
  const validateStep1 = () => {
    const err: Record<string, string> = {};
    if (!address.name.trim()) err.name = 'Full Name is required.';
    if (!address.email.trim() || !address.email.includes('@')) err.email = 'Valid Email is required.';
    if (!address.phone.trim() || address.phone.length < 7) err.phone = 'Valid Phone is required.';
    if (!address.street.trim()) err.street = 'Street address is required.';
    if (!address.city.trim()) err.city = 'City is required.';
    if (!address.state.trim()) err.state = 'State / Region is required.';
    if (!address.zip.trim()) err.zip = 'ZIP code is required.';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep3 = () => {
    const err: Record<string, string> = {};
    if (!payment.cardholderName.trim()) err.cardholderName = 'Cardholder name is required.';
    
    const cardNums = payment.cardNumber.replace(/\s+/g, '');
    if (!cardNums || cardNums.length < 13) err.cardNumber = 'Valid Card Number must be at least 13 digits.';
    
    if (!payment.cvv.trim() || payment.cvv.length < 3) err.cvv = 'CVV must be 3-4 digits.';
    if (!payment.expiryDate.trim() || !payment.expiryDate.includes('/')) err.expiryDate = 'Expiry date (MM/YY) is required.';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setActiveStep(2);
      setErrors({});
    }
  };

  const handleStep2Next = () => {
    setActiveStep(3);
    setErrors({});
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      onPlaceOrder(address, selectedShipping, payment);
      // Confirmation page view is triggered from callback in App
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      
      {/* Visual Stepper tracker bar */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 relative">
          
          {/* Connector Line behind steps */}
          <div className="absolute inset-x-0 h-0.5 bg-slate-200 dark:bg-slate-900 top-1/2 -translate-y-1/2 z-0" />

          {/* Step 1 */}
          <div className="flex flex-col items-center gap-1.5 z-10 relative">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold ${
                activeStep >= 1
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-900'
              }`}
            >
              1
            </span>
            <span className={activeStep === 1 ? 'text-slate-900 dark:text-cyan-400 font-semibold' : ''}>Shipping Info</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-1.5 z-10 relative">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold ${
                activeStep >= 2
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-slate-100 border-slate-200 text-slate-450 dark:bg-slate-900 dark:border-slate-800'
              }`}
            >
              2
            </span>
            <span className={activeStep === 2 ? 'text-slate-900 dark:text-cyan-400 font-semibold' : ''}>Dispatch Method</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-1.5 z-10 relative">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold ${
                activeStep >= 3
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-slate-100 border-slate-200 text-slate-450 dark:bg-slate-900 dark:border-slate-800'
              }`}
            >
              3
            </span>
            <span className={activeStep === 3 ? 'text-slate-900 dark:text-cyan-400 font-semibold' : ''}>Secure Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Step Forms Content */}
        <div className="lg:col-span-8">
          
          {/* Step 1: Shipping Address Information Form */}
          {activeStep === 1 && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-xs'}`}>
              <div className="flex gap-2 items-center mb-6 pb-2 border-b border-slate-250 dark:border-slate-900">
                <Truck className="w-5 h-5 text-cyan-400" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">Shipping Telemetry Coordinates</h2>
              </div>

              <form onSubmit={handleStep1Next} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={address.name}
                      placeholder="Jane Doe"
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Primary Email address</label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      placeholder="jane.doe@nexustech.io"
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Contact Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      placeholder="+1 (555) 019-2834"
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Recipient Country</label>
                    <input
                      type="text"
                      required
                      value={address.country}
                      placeholder="United States"
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Street Address Details</label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    placeholder="101 Cybernetic Dr, Apt 4C"
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.street && <p className="text-[10px] text-red-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.street}</p>}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">City / Colony</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      placeholder="Neo-Detroit"
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.city && <p className="text-[10px] text-red-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.city}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">State / Region</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      placeholder="Michigan"
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.state && <p className="text-[10px] text-red-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.state}</p>}
                  </div>

                  <div className="space-y-1.5 col-span-2 sm:col-span-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">ZIP / Area index</label>
                    <input
                      type="text"
                      required
                      value={address.zip}
                      placeholder="48201"
                      onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.zip && <p className="text-[10px] text-red-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.zip}</p>}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-900 flex justify-end">
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl font-bold font-mono text-xs uppercase tracking-wider bg-slate-905 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-100 flex items-center gap-1 transition-all cursor-pointer"
                    id="checkout-step1-next-btn"
                  >
                    <span>Proceed to Freight</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Shipping Freights Method Selector Options */}
          {activeStep === 2 && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-xs'}`}>
              <div className="flex gap-2 items-center mb-6 pb-2 border-b border-slate-250 dark:border-slate-900">
                <Truck className="w-5 h-5 text-[#22d3ee]-400" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white font-display">Select Dispatch Freight Velocity</h2>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div className="space-y-3">
                  {SHIPPING_METHODS.map((method) => {
                    const cost = method.id === 'standard' && subtotal > 100 ? 0 : method.price;
                    const isSelected = selectedShipping.id === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedShipping(method)}
                        className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                          isSelected
                            ? darkMode
                              ? 'border-cyan-400 bg-cyan-950/10'
                              : 'border-blue-500 bg-slate-100'
                            : darkMode
                            ? 'border-slate-850 bg-slate-900 text-slate-350 hover:bg-slate-800'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            checked={isSelected}
                            readOnly
                            aria-label={`Select method: ${method.name}`}
                            className="w-4 h-4 text-blue-600 outline-none"
                          />
                          <div className="space-y-0.5">
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{method.name}</span>
                            <p className="text-[10px] text-slate-450 dark:text-slate-500">Estimates Arrival: {method.estimate}</p>
                          </div>
                        </div>

                        <span className="font-mono font-bold text-slate-850 dark:text-slate-200 text-sm">
                          {cost === 0 ? 'FREE' : `$${cost}`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-900 flex justify-between">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="py-2.5 px-4 rounded-xl border font-mono text-[10px] uppercase font-bold text-slate-550 border-slate-300 dark:border-slate-800 cursor-pointer"
                  >
                    Back to Address
                  </button>
                  <button
                    onClick={handleStep2Next}
                    className="py-3 px-6 rounded-xl font-bold font-mono text-xs uppercase tracking-wider bg-slate-905 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-100 flex items-center gap-1 transition-all cursor-pointer"
                    id="checkout-step2-next-btn"
                  >
                    <span>Proceed to payment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Secure Payments Form */}
          {activeStep === 3 && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-xs'}`}>
              <div className="flex gap-2 items-center mb-6 pb-2 border-b border-slate-250 dark:border-slate-900">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">Secure Encrypted Payment Console</h2>
              </div>

              <form onSubmit={handleStep3Submit} className="space-y-4 font-sans text-xs">
                
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Cardholder Legal Name</label>
                  <input
                    type="text"
                    required
                    value={payment.cardholderName}
                    placeholder="JANE DOE"
                    onChange={(e) => setPayment({ ...payment, cardholderName: e.target.value.toUpperCase() })}
                    className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.cardholderName && <p className="text-[10px] text-red-500 font-mono mt-1">{errors.cardholderName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Credit Card Number</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={payment.cardNumber}
                    placeholder="4000 1234 5678 9010"
                    onChange={(e) => {
                      // format card nice with spaces
                      const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                      const matches = val.match(/\d{4,16}/g);
                      const match = (matches && matches[0]) || '';
                      const parts = [];
                      for (let i = 0, len = match.length; i < len; i += 4) {
                        parts.push(match.substring(i, i + 4));
                      }
                      if (parts.length > 0) {
                        setPayment({ ...payment, cardNumber: parts.join(' ') });
                      } else {
                        setPayment({ ...payment, cardNumber: val });
                      }
                    }}
                    className={`w-full p-2.5 rounded-xl border outline-none text-xs font-mono transition-all ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.cardNumber && <p className="text-[10px] text-red-500 font-mono flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Expiry Code (MM/YY)</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={payment.expiryDate}
                      placeholder="12/28"
                      onChange={(e) => setPayment({ ...payment, expiryDate: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs font-mono transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.expiryDate && <p className="text-[10px] text-red-500 font-mono mt-1">{errors.expiryDate}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Security CVV Key</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={payment.cvv}
                      placeholder="•••"
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/[^0-9]/g, '') })}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs font-mono transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.cvv && <p className="text-[10px] text-red-500 font-mono flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.cvv}</p>}
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/5 text-emerald-400 rounded-xl border border-emerald-500/10 text-[10px] font-mono leading-relaxed mt-2 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DECRYPTION ACTIVE: Standard SHA-256 TLS security protocols are armed. Your CVV/Card logs are never stored or transmitted outside sandbox networks.</span>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-900 flex justify-between">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="py-2.5 px-4 rounded-xl border font-mono text-[10px] uppercase font-bold text-slate-550 border-slate-300 dark:border-slate-800 cursor-pointer"
                  >
                    Back to Freight
                  </button>
                  <button
                    type="submit"
                    className="py-3.5 px-6 rounded-xl font-bold font-mono text-xs uppercase tracking-wider bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-50 flex items-center gap-1 shadow-lg shadow-emerald-500/10 hover:opacity-95 transition-all cursor-pointer"
                    id="checkout-order-submit-btn"
                  >
                    <span>Authorize ${totalBalance} Charge</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Side Column Sticky Basket Summary panel */}
        <aside className="lg:col-span-4 space-y-6">
          <div
            className={`border rounded-2xl p-5 space-y-5 ${
              darkMode ? 'bg-slate-950 border-slate-900 text-slate-300' : 'bg-slate-50 border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-250 dark:border-slate-900 pb-3">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Active Order Overview</h3>
              <button
                onClick={() => setView('cart')}
                className="text-[10px] uppercase font-mono tracking-wider text-blue-500 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                Edit
              </button>
            </div>

            {/* List Mini products info */}
            <div className="max-h-56 overflow-y-auto divide-y divide-slate-200/50 dark:divide-slate-900/55 pr-1.5 no-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="py-2.5 flex justify-between gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 p-1 flex items-center justify-center flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-xs">
                      <h5 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.product.name}</h5>
                      <span className="text-[9px] font-mono text-slate-500">Qty: {item.quantity}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-white">
                    ${item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotal break downs */}
            <div className="space-y-3.5 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-900 pt-4 font-sans">
              <div className="flex justify-between">
                <span>Modules Subtotal:</span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">${subtotal}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-500">
                  <span>Coupon Deduction:</span>
                  <span className="font-mono">-${discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping ({selectedShipping.name}):</span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-250 dark:border-slate-900 flex justify-between items-baseline text-slate-805 dark:text-white">
                <span className="font-display font-bold text-sm">Aggregate Total:</span>
                <span className="font-display font-bold text-xl text-slate-950 dark:text-white glow-cyan font-mono">
                  ${totalBalance}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
