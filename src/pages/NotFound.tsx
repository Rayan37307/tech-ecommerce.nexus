import React, { useState } from 'react';
import { Search, Home, ShoppingBag, ArrowRight } from 'lucide-react';

interface NotFoundProps {
  setView: (view: string) => void;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
}

export default function NotFound({ setView, setSearchQuery, darkMode }: NotFoundProps) {
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      setView('shop');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-10 font-sans">
      
      {/* Visual illustration of error */}
      <div className="space-y-4 relative">
        {/* Background glow behind 404 text */}
        <div className="absolute inset-x-0 w-44 h-44 rounded-full bg-rose-500/10 dark:bg-rose-500/5 mx-auto blur-3xl pointer-events-none" />

        <span className="font-display font-black text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-tr from-rose-500 via-indigo-500 to-cyan-400 glow-cyan font-mono tracking-tighter select-none">
          404
        </span>
        <h1 className="font-display font-medium text-lg text-slate-900 dark:text-white uppercase font-mono tracking-widest">
          Telemetry Vector Misaligned
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-sans max-w-sm mx-auto leading-relaxed">
          The hardware catalog node coordinates you requested could not be resolved in the sandbox servers. Perform a localized search query.
        </p>
      </div>

      {/* local search bar form */}
      <form onSubmit={handleSearchSubmit} className="relative group max-w-sm mx-auto">
        <input
          type="text"
          placeholder="Ex. mechanical switches, earbuds..."
          value={localSearch}
          aria-label="Input field for searching alternate hardware products"
          onChange={(e) => setLocalSearch(e.target.value)}
          className={`w-full py-3.5 pl-4 pr-10 rounded-xl text-xs outline-none border transition-all ${
            darkMode
              ? 'bg-slate-900 border-slate-805 text-slate-205 focus:border-cyan-400'
              : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500 shadow-sm'
          }`}
        />
        <button
          type="submit"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-cyan-400"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Action buttons */}
      <div className="flex gap-4 flex-col sm:flex-row max-w-xs mx-auto">
        <button
          onClick={() => setView('home')}
          className="flex-1 py-4 rounded-xl border font-bold font-mono text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-900 dark:border-slate-850 dark:text-slate-200 transition-all cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
        
        <button
          onClick={() => setView('shop')}
          className="flex-1 py-4 rounded-xl font-bold font-mono text-[10px] uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <span>Shop Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
