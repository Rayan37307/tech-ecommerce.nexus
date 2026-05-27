import React, { useMemo } from 'react';
import { CheckCircle2, ChevronRight, ShoppingBag, Truck, Calendar } from 'lucide-react';
import { Order } from '../types';

interface ConfirmationProps {
  lastOrder: Order | null;
  setView: (view: string) => void;
  darkMode: boolean;
}

export default function Confirmation({ lastOrder, setView, darkMode }: ConfirmationProps) {
  // Generate backup mock order info if direct routes occurs
  const order = useMemo(() => {
    if (lastOrder) return lastOrder;
    return {
      id: 'NXS-48201-90',
      date: 'May 27, 2026',
      items: [],
      subtotal: 189,
      shipping: 0,
      discount: 0,
      total: 189,
      status: 'Processing' as const,
      deliveryEstimate: '5-7 business days',
      address: {
        name: 'Jane Doe',
        email: 'jane.doe@nexustech.io',
        phone: '123-456-7890',
        street: '101 Cybernetic Dr, Apt 4C',
        city: 'Neo-Detroit',
        state: 'Michigan',
        zip: '48201',
        country: 'United States',
      },
      shippingMethod: 'Standard Ground Shipping',
    };
  }, [lastOrder]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-10">
      
      {/* Wave animation check circle */}
      <div className="space-y-4">
        <div className="w-20 h-20 rounded-full mx-auto bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-10 h-10 glow-emerald" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#22d3ee] font-bold">
            TRANSACTION INVOICE SECURED
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-905 dark:text-white">
            Order Dispatched Successfully!
          </h1>
          <p className="text-xs text-slate-550 dark:text-slate-400 font-sans max-w-md mx-auto">
            Your telemetry checkout charge was successfully computed. The hardware deployment sequence has been armed in active warehousing folders.
          </p>
        </div>
      </div>

      {/* Basic Metrics Display */}
      <div className={`text-left p-6 rounded-2xl border divide-y ${
        darkMode ? 'bg-text' : 'bg-surface'
      }`}>
        {/* Core numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-slate-500 font-bold text-[9px] uppercase">Order ID</span>
            <p className="font-semibold text-text-primary">{order.id}</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 font-bold text-[9px] uppercase">Invoice Date</span>
            <p className="font-semibold text-text-primary">{order.date}</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 font-bold text-[9px] uppercase">Total Charged</span>
            <p className="font-semibold text-text-primary">${order.total}</p>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 font-bold text-[9px] uppercase">Telemetry Speed</span>
            <p className="font-semibold text-text-primary truncate" title={order.shippingMethod}>
              {order.shippingMethod}
            </p>
          </div>
        </div>

        {/* Dispatch details Address */}
        <div className="py-4 space-y-2">
          <div className="flex gap-2 items-center text-xs text-text-primary font-bold">
            <Truck className="w-4 h-4 text-cyan-400" />
            <span>Fulfillment Transit Destination Coordinates</span>
          </div>
          <p className="text-xs text-text-secondary font-sans">
            Recipient: <strong>{order.address.name}</strong> • Phone: {order.address.phone} <br />
            Address: {order.address.street}, {order.address.city}, {order.address.state} {order.address.zip}, {order.address.country}
          </p>
        </div>

        {/* Estimated delivery ETA calendar */}
        <div className="pt-4 flex gap-3 text-left font-sans text-xs">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/15 text-cyan-500 self-start">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-200">Estimated Delivery Dispatch Target</span>
            <p className="text-text-secondary">
              Your hardware is computed arrive within <strong className="text-slate-800 dark:text-white font-mono">{order.deliveryEstimate}</strong>. Tracking barcodes will dispatch via {order.address.email}.
            </p>
          </div>
        </div>
      </div>

      {/* Button controls */}
      <div className="flex gap-4 flex-col sm:flex-row max-w-sm mx-auto">
        <button
          onClick={() => {
            setView('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-1 py-4.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider border transition-all hover:bg-slate-100 dark:hover:bg-slate-900 dark:border-slate-800 dark:text-slate-200 cursor-pointer"
        >
          Track in Dashboard
        </button>

        <button
          onClick={() => {
            setView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-1 py-4.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-slate-950 bg-primary hover:bg-cyan-300 shadow-md flex items-center justify-center gap-1 cursor-pointer font-bold"
        >
          <span>Continue Shopping</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[10px] text-slate-520 font-mono italic">
        An interactive dynamic copy has also been filed under active histories inside your user profile.
      </p>
    </div>
  );
}
