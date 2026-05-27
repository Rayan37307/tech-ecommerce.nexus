import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sun, Moon, Laptop, Compass, Info, MessageSquare, HelpCircle } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  wishlist: string[];
  activeView: string;
  setView: (view: string, productId?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({
  cart,
  wishlist,
  activeView,
  setView,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setView('shop');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Shop', view: 'shop', icon: Compass },
    { label: 'About Us', view: 'about', icon: Info },
    { label: 'Contact', view: 'contact', icon: MessageSquare },
    { label: 'FAQs', view: 'faq', icon: HelpCircle },
  ];

  return (
    <>
      {/* Top Banner Message */}
      <div className="w-full bg-surface-alt text-text-secondary text-xs py-2 px-4 transition-all border-b border-border flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <span className="bg-pink-50 text-primary border border-pink-200 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
            PROMO
          </span>
          <span className="font-medium">Free shipping on orders above $100</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-text-tertiary">
          <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => setView('faq')}>Help</span>
          <span>•</span>
          <span>EST. 2026</span>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 bg-surface border-b border-border ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div
            onClick={() => {
              setView('home');
              setSearchQuery('');
            }}
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-surface font-bold text-lg shadow-md group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all duration-250">
              <Laptop className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl md:text-2xl leading-none tracking-tight text-slate-950 dark:text-white group-hover:text-cyan-400 transition-colors">
                NEXUS
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 dark:text-cyan-400 font-semibold leading-none">
                ELECTRONICS
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative group"
          >
            <input
              type="text"
              placeholder="Search modern hardware..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className={`w-full py-2.5 pl-4 pr-10 rounded-xl text-sm transition-all border outline-none ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              }`}
            />
            <button
              type="submit"
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                darkMode ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-400 hover:text-blue-500'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => setView(link.view)}
                  className={`relative font-medium text-sm transition-all hover:translate-y-[-1px] ${
                    isActive
                      ? darkMode
                        ? 'text-cyan-400 font-semibold'
                        : 'text-blue-600 font-semibold'
                      : darkMode
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-[-6px] left-0 right-0 h-[2px] rounded-full ${
                        darkMode ? 'bg-cyan-400 glow-cyan' : 'bg-blue-600'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons Panel */}
          <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">
            {/* Account Dashboard Icon */}
            <button
              onClick={() => setView('dashboard')}
              className={`hidden sm:flex items-center gap-2 border px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeView === 'dashboard'
                  ? darkMode
                    ? 'border-cyan-400/40 text-cyan-400 bg-cyan-950/20 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                    : 'border-blue-500/40 text-blue-600 bg-blue-50'
                  : darkMode
                  ? 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
              id="my-account-nav-btn"
            >
              Account
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setView('dashboard', 'wishlist-tab')}
              className={`p-2.5 rounded-xl border relative transition-all ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
              title="My Wishlist"
              id="header-wishlist-btn"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setView('cart')}
              className={`p-2.5 rounded-xl border relative transition-all ${
                activeView === 'cart'
                  ? darkMode
                    ? 'border-cyan-500/40 bg-cyan-950/10 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                    : 'border-blue-500 bg-blue-50 text-blue-600'
                  : darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-indigo-950/20 hover:text-white hover:border-indigo-500/30'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
              }`}
              title="Shopping Bag"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-md animate-bounce ${
                    darkMode ? 'bg-cyan-500' : 'bg-blue-600'
                  }`}
                >
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl border transition-all ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              id="hamburger-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide-out Mask */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-45 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Container */}
      <div
        className={`fixed top-[113px] bottom-0 right-0 max-w-xs w-full z-45 lg:hidden border-l transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        } ${
          darkMode
            ? 'bg-slate-950 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="p-6 flex flex-col h-full justify-between overflow-y-auto">
          <div className="space-y-6">
            {/* Mobile Search Bar inside menu */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search premium electronics..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className={`w-full py-2.5 pl-4 pr-10 rounded-xl text-sm transition-all border outline-none ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-cyan-400'
                    : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                }`}
              />
              <button
                type="submit"
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  darkMode ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-500 hover:text-blue-500'
                }`}
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <div className="h-[1px] w-full bg-slate-800/10 dark:bg-slate-800" />

            {/* Mobile Menu Links */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                E-Commerce Catalog
              </span>
              {navLinks.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <button
                    key={link.view}
                    onClick={() => {
                      setView(link.view);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl font-medium text-sm transition-all ${
                      activeView === link.view
                        ? darkMode
                          ? 'bg-slate-900 text-cyan-400 font-semibold'
                          : 'bg-blue-50 text-blue-600 font-semibold'
                        : darkMode
                        ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <LinkIcon className="w-4 h-4" />
                    {link.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                setView('dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center py-2.5 rounded-xl font-medium text-sm transition-all bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md hover:opacity-90"
            >
              My Account Settings
            </button>
            <p className="text-[10px] text-center text-slate-500 font-mono">
              SECURE DECRYPTION • NEXUS CO.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
