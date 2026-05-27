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
    <footer className="relative pt-16 pb-12 overflow-hidden border-t border-border bg-surface-alt">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-6">
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-surface font-bold text-base shadow-md group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none text-text-primary group-hover:text-primary transition-colors">
                  NEXUS
                </span>
                <span className="text-[9px] uppercase font-mono tracking-wider text-primary font-semibold leading-none mt-1">
                  TECH
                </span>
              </div>
            </button>

            <p className="text-sm text-text-secondary leading-relaxed">
              Premium tech gear for modern workspaces. Quality products designed for performance and style.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border bg-surface text-text-secondary hover:text-primary hover:border-primary transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border bg-surface text-text-secondary hover:text-primary hover:border-primary transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg border border-border bg-surface text-text-secondary hover:text-primary hover:border-primary transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-text-primary uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('shop')}
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('faq')}
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-text-primary uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-2 items-start">
                <RefreshCcw className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>30-day returns</span>
              </li>
              <li className="flex gap-2 items-start">
                <ShieldCheck className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span>1-year warranty</span>
              </li>
              <li className="text-xs pt-2 border-t border-border text-text-tertiary">
                <span className="block mb-1">Contact us:</span>
                <span className="font-mono text-text-secondary">support@nexustech.io</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-text-primary uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Get exclusive updates and promotions.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg text-center bg-success/10 border border-success/20 text-success text-xs font-medium">
                ✓ Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 flex-col">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg text-xs outline-none border border-border bg-surface text-text-primary focus:border-primary transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary text-xs"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="my-8 h-px bg-border" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-text-tertiary">
          <p>© 2026 Nexus Electronics. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
              Payments:
            </span>
            <div className="flex gap-2 text-[10px]">
              <span className="px-2 py-1 rounded border border-border bg-surface text-text-secondary font-mono font-semibold">VISA</span>
              <span className="px-2 py-1 rounded border border-border bg-surface text-text-secondary font-mono font-semibold">MC</span>
              <span className="px-2 py-1 rounded border border-border bg-surface text-text-secondary font-mono font-semibold">PAYPAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
