import React, { useState } from 'react';
import { Laptop, ArrowRight, Github, Twitter, Youtube, RefreshCcw, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
  darkMode: boolean;
}

export default function Footer({ setView, darkMode }: FooterProps) {
  const [emailValue, setEmailValue] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim() && emailValue.includes('@')) {
      setSubscribed(true);
      setEmailValue('');
    }
  };

  const handleLinkClick = (view: string) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative pt-16 pb-12 overflow-hidden border-t ${
        darkMode
          ? 'bg-slate-950 border-slate-900 text-slate-300'
          : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}
    >
      {/* Background cyber accent loop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/5 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Pitch & Socials */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleLinkClick('home')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-base shadow-md">
                <Laptop className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none text-slate-950 dark:text-white group-hover:text-cyan-400 transition-colors">
                  NEXUS
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-blue-500 dark:text-cyan-400 font-semibold leading-none mt-1">
                  ELECTRONICS
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Forging future-ready hardware configurations and premium physical setup mechanics. Clean layouts, glowing signals, and elite tactical durability.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg border transition-all ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 hover:border-cyan-400 hover:text-cyan-400'
                    : 'bg-white border-slate-200 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg border transition-all ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 hover:border-cyan-400 hover:text-cyan-400'
                    : 'bg-white border-slate-200 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg border transition-all ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 hover:border-cyan-400 hover:text-cyan-400'
                    : 'bg-white border-slate-200 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">
              E-Commerce Hub
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('shop')}
                  className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-slate-500 dark:text-slate-400"
                >
                  Products Catalog (Shop)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-slate-500 dark:text-slate-400"
                >
                  Our Brand Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-slate-500 dark:text-slate-400"
                >
                  Interactive Customer Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('faq')}
                  className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors text-slate-500 dark:text-slate-400"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Warranty & Support */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Assurance Policy
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex gap-2 items-start">
                <RefreshCcw className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>30-Day Comfort Returns</span>
              </li>
              <li className="flex gap-2 items-start">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>1-Year Hardware Warranty</span>
              </li>
              <li className="text-xs pt-1 border-t border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 leading-snug">
                Need urgent technical telemetry assistance? Reach out via:
                <br />
                <span className="font-mono text-[11px] text-slate-800 dark:text-slate-300 font-semibold">
                  support@nexustech.io
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Submission Box */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Telemetry Dispatch (Email)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Subscribe to recieve real-time discount coupons and upcoming firmware drop alerts.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl text-center bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium tracking-tight animate-fade-in animate-duration-300">
                🚀 Subscribed successfully! Double discount drops inbound.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1.5 flex-col xs:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                      darkMode
                        ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                        : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="py-2.5 px-3.5 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white font-semibold text-xs flex items-center justify-center gap-1 hover:opacity-90 transition-all cursor-pointer"
                  id="newsletter-subscribe-btn"
                >
                  <span>Go</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider separator */}
        <div className="my-10 h-[1.5px] bg-slate-200/50 dark:bg-slate-900" />

        {/* Bottom bar with Copyright and Payments */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-sans">
          <div>
            <p>© 2026 Nexus Electronics Co. All rights under digital encryption.</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              Sleek hardware crafted with standard compliance layers. Registered with priority telemetry grids.
            </p>
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-semibold mr-1">
              PAYMENTS:
            </span>
            <div className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/10 hover:border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 px-2.5 py-1 rounded border text-[10px] font-bold font-mono tracking-tight cursor-default select-none">
              VISA
            </div>
            <div className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/10 hover:border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 px-2.5 py-1 rounded border text-[10px] font-bold font-mono tracking-tight cursor-default select-none">
              MC
            </div>
            <div className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/10 hover:border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 px-2.5 py-1 rounded border text-[10px] font-bold font-mono tracking-tight cursor-default select-none">
              PAYPAL
            </div>
            <div className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/10 hover:border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300 px-2.5 py-1 rounded border text-[10px] font-bold font-mono tracking-tight cursor-default select-none">
              APPLE PAY
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
