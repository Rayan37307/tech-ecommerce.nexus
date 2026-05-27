import React, { useEffect } from 'react';
import { X, CheckCircle, Heart, Tag, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'wishlist' | 'info' | 'error';
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastCard({ toast, onClose }: { toast: ToastMessage; onClose: () => void; key?: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'wishlist':
        return <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case 'info':
      default:
        return <Tag className="w-5 h-5 text-sky-400" />;
    }
  };

  const borderClass = {
    success: 'border-l-4 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/10',
    wishlist: 'border-l-4 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.15)] ring-1 ring-rose-500/10',
    error: 'border-l-4 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)] ring-1 ring-red-500/10',
    info: 'border-l-4 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.15)] ring-1 ring-sky-500/10',
  }[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.15 } }}
      className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 ${borderClass}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <p className="text-sm font-medium tracking-tight pr-2">{toast.text}</p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-800/50"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
