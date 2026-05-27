import React, { useState } from 'react';
import { User, ShoppingBag, Heart, MapPin, CreditCard, LogOut, CheckCircle, Trash2, Tag, Info, Lock } from 'lucide-react';
import { Order, Address, UserProfile, Product, CartItem } from '../types';
import { PRODUCTS } from '../data';

interface DashboardProps {
  userProfile: UserProfile;
  orders: Order[];
  wishlist: string[];
  onUpdateProfile: (name: string, email: string, phone: string) => void;
  onRemoveWishlist: (productId: string) => void;
  onAddAddress: (address: Address) => void;
  onRemoveAddress: (zip: string) => void;
  onLogout: () => void;
  setView: (view: string, id?: string) => void;
  onAddToCart: (product: Product, qty: number) => void;
  defaultActiveTab?: string;
  darkMode: boolean;
}

export default function Dashboard({
  userProfile,
  orders,
  wishlist,
  onUpdateProfile,
  onRemoveWishlist,
  onAddAddress,
  onRemoveAddress,
  onLogout,
  setView,
  onAddToCart,
  defaultActiveTab = 'profile',
  darkMode,
}: DashboardProps) {
  // Tabs: 'profile' | 'orders' | 'wishlist' | 'addresses' | 'payments'
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab === 'wishlist-tab' ? 'wishlist' : 'profile'
  );

  // Profile fields editing
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editPhone, setEditPhone] = useState(userProfile.phone);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Address inputs editing
  const [newAddress, setNewAddress] = useState<Address>({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editName, editEmail, editPhone);
    setSuccessMsg('Profile telemetry parameters updated successfully.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.street && newAddress.city && newAddress.zip) {
      onAddAddress(newAddress);
      setNewAddress({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
      });
      setSuccessMsg('Fulfillment address coordinate registered successfully.');
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  // Resolve products in wishlist
  const wishlistedProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 font-sans">
      
      <div className="space-y-2 mb-10 pb-4 border-b border-slate-200 dark:border-slate-900">
        <span className="text-[10px] font-mono tracking-widest text-[#22d3ee] font-bold">
          SECURE CLIENT SECTOR
        </span>
        <h1 className="font-display font-bold text-3xl text-slate-950 dark:text-white">
          Client Terminal Account
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Navigation Links Column */}
        <nav
          className={`lg:col-span-3 rounded-2xl border p-4 space-y-1.5 flex-shrink-0 ${
            darkMode ? 'bg-slate-950 border-slate-900 text-slate-300' : 'bg-slate-50 border-slate-200'
          }`}
        >
          {/* Headline Name */}
          <div className="flex gap-3 items-center p-3 mb-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-slate-850">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 font-bold text-sm text-white flex items-center justify-center shadow-sm uppercase">
              {userProfile.name.slice(0, 2)}
            </div>
            <div className="text-xs truncate">
              <h4 className="font-bold text-slate-900 dark:text-white truncate">{userProfile.name}</h4>
              <span className="text-slate-455 font-mono text-[9px] uppercase tracking-wide truncate">{userProfile.email}</span>
            </div>
          </div>

          {[
            { id: 'profile', label: 'Profile Options', icon: User },
            { id: 'orders', label: 'History Logs', icon: ShoppingBag, count: orders.length },
            { id: 'wishlist', label: 'Telemetry Wishlist', icon: Heart, count: wishlist.length },
            { id: 'addresses', label: 'Address Coordinates', icon: MapPin },
            { id: 'payments', label: 'Billing Registers', icon: CreditCard },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSuccessMsg(null);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl font-medium text-xs tracking-tight transition-all cursor-pointer ${
                  isSel
                    ? darkMode
                      ? 'bg-slate-900 text-cyan-405 border border-slate-800 font-bold'
                      : 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-blue-600/10 text-blue-500 font-bold dark:bg-cyan-550/10 dark:text-cyan-400">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="h-[1px] bg-slate-200 dark:bg-slate-900 my-4" />

          {/* Logout Action */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 p-3 rounded-xl hover:bg-rose-500/10 hover:text-rose-500 text-slate-505 dark:text-slate-400 font-medium text-xs tracking-tight transition-colors cursor-pointer text-left"
            id="dashboard-logout-btn"
          >
            <LogOut className="w-4 h-4" />
            <span>Close Client Session</span>
          </button>
        </nav>

        {/* Right Side: Tab Form Contents Space */}
        <div className="lg:col-span-9">
          
          {/* Alert Success message */}
          {successMsg && (
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 animate-fade-in">
              ✓ {successMsg}
            </div>
          )}

          {/* TAB 1: Profile forms */}
          {activeTab === 'profile' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-xs'}`}>
              <div className="flex gap-2 items-center mb-6 pb-2 border-b border-slate-250 dark:border-slate-900">
                <User className="w-5 h-5 text-cyan-400" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">Profile Settings</h2>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Client Name</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Registration Email</label>
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-sm">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">Phone Number</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400' : 'bg-white border-slate-200 focus:border-blue-500'
                    }`}
                  />
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-900 flex justify-end">
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl font-bold font-mono text-xs uppercase tracking-wider bg-slate-905 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-100 transition-colors cursor-pointer"
                    id="profile-update-submit-btn"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: Dynamic order history grids */}
          {activeTab === 'orders' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-xs'}`}>
              <div className="flex gap-2 items-center mb-6 pb-2 border-b border-slate-250 dark:border-slate-900">
                <ShoppingBag className="w-5 h-5 text-cyan-400" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">Purchase History Logs</h2>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 space-y-3 font-sans">
                  <p className="text-slate-500 dark:text-slate-400 font-sans text-xs">
                    No active hardware deployments have been verified under your client ID.
                  </p>
                  <button
                    onClick={() => setView('shop')}
                    className="py-2 px-4 rounded-xl font-bold font-mono text-[10px] uppercase tracking-wider bg-slate-900 text-white cursor-pointer"
                  >
                    Go To Marketplace
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-2xl overflow-hidden border-slate-200 dark:border-slate-900 text-left"
                    >
                      {/* top bar summaries info */}
                      <div className="flex flex-col sm:flex-row justify-between p-4 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-850 text-xs font-mono relative gap-2">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          <div>
                            <span className="text-[9px] uppercase text-slate-500 font-bold">Transaction ID</span>
                            <p className="font-semibold text-slate-900 dark:text-white">{order.id}</p>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase text-slate-500 font-bold">Date</span>
                            <p className="font-semibold text-slate-900 dark:text-white">{order.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3.5 sm:self-center">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Charged: ${order.total}</span>
                          <span className="px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] bg-sky-500/10 text-sky-400 border border-sky-500/15">
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items details nested list */}
                      <div className="p-4 divide-y divide-slate-100 dark:divide-slate-900">
                        {order.items.map((item) => (
                          <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex justify-between gap-4 items-center">
                            <div className="flex items-center gap-3">
                              <img src={item.product.images[0]} alt={item.product.name} className="max-h-8 w-auto object-contain p-1 rounded border dark:border-slate-800 bg-white" referrerPolicy="no-referrer" />
                              <div className="text-xs">
                                <h5 className="font-semibold leading-none">{item.product.name}</h5>
                                <span className="text-[9px] font-mono text-slate-500 mt-0.5 block">
                                  Qty: {item.quantity} {item.selectedColor ? `[${item.selectedColor}]` : ''}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-bold font-mono text-slate-800 dark:text-white">${item.product.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Wishlist Product Cards Grid list */}
          {activeTab === 'wishlist' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 bg-white shadow-xs'}`}>
              <div className="flex gap-2 items-center mb-6 pb-2 border-b border-slate-250 dark:border-slate-900">
                <Heart className="w-5 h-5 text-rose-500" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">Active Wishlisted Cards</h2>
              </div>

              {wishlist.length === 0 ? (
                <div className="text-center py-10 text-slate-455 text-xs font-sans">
                  <span>No parameters tracked in your wishlist files. Explore our marketplace list to add options.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {wishlistedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="border rounded-xl overflow-hidden flex flex-col justify-between text-left border-slate-205 dark:border-slate-900 bg-slate-950/20"
                    >
                      <div className="w-full aspect-square bg-slate-100 dark:bg-slate-900/50 p-4 flex items-center justify-center relative">
                        <img src={p.images[0]} alt={p.name} className="max-h-24 w-auto object-contain" referrerPolicy="no-referrer animate-pulse" />
                        <button
                          onClick={() => onRemoveWishlist(p.id)}
                          className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-500 rounded bg-slate-900/40"
                          title="Remove Wishlist File"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-3.5 space-y-2 bg-transparent flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-display font-semibold text-xs leading-snug line-clamp-1 truncate">{p.name}</h4>
                          <span className="text-sm font-bold font-mono text-slate-800 dark:text-white block mt-0.5">${p.price}</span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setView('product-detail', p.id)}
                            className="flex-1 py-1 px-2.5 rounded-lg border text-[9px] font-bold font-mono uppercase text-slate-500 hover:text-slate-800 text-center cursor-pointer"
                          >
                            PDP View
                          </button>
                          <button
                            onClick={() => onAddToCart(p, 1)}
                            className="flex-1 py-1 px-2.5 rounded-lg bg-[#3b82f6] text-white text-[9px] font-bold font-mono uppercase text-center cursor-pointer"
                          >
                            + Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Saved locations management list */}
          {activeTab === 'addresses' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-xs'}`}>
              <div className="flex gap-2 items-center mb-6 pb-2 border-b border-slate-250 dark:border-slate-900">
                <MapPin className="w-5 h-5 text-cyan-405" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">Transit Logistics Address</h2>
              </div>

              {/* Address additions Form */}
              <form onSubmit={handleAddressSubmit} className="space-y-4 font-sans text-xs mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Recipient Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      className={`w-full p-2 rounded-lg border outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-205 focus:border-cyan-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="123-456-7890"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className={`w-full p-2 rounded-lg border outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-205 focus:border-cyan-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 col-span-1 sm:col-span-2">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Street Coordinates</label>
                    <input
                      type="text"
                      required
                      placeholder="101 Cybernetic Dr, Apt 4C"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      className={`w-full p-2 rounded-lg border outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-205 focus:border-cyan-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">ZIP</label>
                    <input
                      type="text"
                      required
                      placeholder="48201"
                      value={newAddress.zip}
                      onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                      className={`w-full p-2 rounded-lg border outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-slate-205 focus:border-cyan-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">City</label>
                    <input
                      type="text"
                      required
                      placeholder="Neo-Detroit"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className={`w-full p-2 rounded-lg border outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-750 text-slate-205 focus:border-cyan-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">State</label>
                    <input
                      type="text"
                      required
                      placeholder="Michigan"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className={`w-full p-2 rounded-lg border outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-750 text-slate-205  focus:border-cyan-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5 col-span-2 md:col-span-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Country</label>
                    <input
                      type="text"
                      required
                      placeholder="United States"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                      className={`w-full p-2 rounded-lg border outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-750 text-slate-205 focus:border-cyan-400' : 'border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl font-bold font-mono text-[10px] uppercase tracking-wider bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 text-slate-100 cursor-pointer"
                  id="add-coordinate-btn"
                >
                  Register Address Node
                </button>
              </form>

              {/* saved indices render */}
              <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-900">
                <span className="text-[10px] font-mono tracking-widest text-[#22d3ee] font-bold block uppercase mb-2">Registered Address Matrices</span>
                {userProfile.addresses.length === 0 ? (
                  <p className="text-slate-500 text-xs italic">No secondary logistics addresses found.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userProfile.addresses.map((addr) => (
                      <div
                        key={addr.zip}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-900 text-left relative text-xs flex justify-between gap-4 items-start"
                      >
                        <div className="space-y-1.5">
                          <h5 className="font-bold flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{addr.name} ({addr.zip})</span>
                          </h5>
                          <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-sans text-[11px]">
                            Primary Node: {addr.street}, {addr.city}, {addr.state} <br />
                            Phone: {addr.phone} • Email: {addr.email}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveAddress(addr.zip)}
                          className="text-slate-405 hover:text-rose-500 p-1"
                          title="Discard address card"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: Saved credit cards */}
          {activeTab === 'payments' && (
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-xs'}`}>
              <div className="flex gap-2 items-center mb-6 pb-2 border-b border-slate-250 dark:border-slate-900">
                <CreditCard className="w-5 h-5 text-cyan-405" />
                <h2 className="font-display font-bold text-lg text-slate-950 dark:text-white">Active Payment Matrices</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Premium tech visual card design */}
                <div className="rounded-xl p-5 bg-gradient-to-tr from-blue-700 via-indigo-805 to-slate-950 text-white min-h-[160px] flex flex-col justify-between relative shadow-lg overflow-hidden border border-white/5">
                  <div className="absolute right-0 bottom-0 w-32 h-32 bg-cyan-405/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-display font-bold uppercase tracking-wider text-cyan-400 text-xs">NEXUS TELEMETRY CHIP</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">VISA CORE</span>
                  </div>

                  <span className="font-mono text-base tracking-widest block my-4">•••• •••• •••• 9028</span>

                  <div className="flex justify-between text-[10px] font-mono">
                    <div>
                      <span className="block text-[8px] uppercase text-slate-400">Cardholder</span>
                      <span>{userProfile.name.toUpperCase()}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] uppercase text-slate-400">Expires</span>
                      <span>12 / 28</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-900 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <Lock className="w-8 h-8 text-cyan-400" />
                  <p className="text-xs text-slate-500 dark:text-slate-455 font-sans leading-relaxed max-w-xs">
                    Your secure keys are masked by central payment decryptions. Multi-device cards can be synchronized securely at billing panels during checkout.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
