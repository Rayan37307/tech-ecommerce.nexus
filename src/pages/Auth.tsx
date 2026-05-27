import React, { useState } from 'react';
import { Sparkles, Eye, EyeOff, ShieldCheck, Mail, Lock, Globe, Laptop } from 'lucide-react';
import { Order, Address, UserProfile, Product, CartItem } from '../types';

interface AuthProps {
  onLoginSuccess: (userName: string, userEmail: string) => void;
  setView: (view: string) => void;
  darkMode: boolean;
}

export default function Auth({ onLoginSuccess, setView, darkMode }: AuthProps) {
  // Tabs: 'login' | 'register'
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Success alert mockup
  const [success, setSuccess] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.length >= 6) {
      setSuccess('Access Authorized! Synchronizing profile database folders...');
      setTimeout(() => {
        // Log in
        const parsedName = name || email.split('@')[0];
        onLoginSuccess(parsedName, email);
        setView('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && password.length >= 6) {
      setSuccess('Profile Created Successfully! Decrypting session layers...');
      setTimeout(() => {
        onLoginSuccess(name, email);
        setView('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }
  };

  const handleSocialMock = (platform: string) => {
    setSuccess(`Connecting secure keys for ${platform}...`);
    setTimeout(() => {
      onLoginSuccess(`Guest ${platform} Client`, `client.${platform}@nexustech.io`);
      setView('dashboard');
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 font-sans">
      <div
        className={`rounded-2xl border p-6 md:p-8 space-y-6 md:space-y-8 ${
          darkMode ? 'bg-slate-950 border-slate-900 text-slate-200' : 'bg-white border-slate-200 shadow-xl'
        }`}
      >
        {/* Banner with spark icon */}
        <div className="text-center space-y-2">
          <div className="inline-flex py-1.5 px-3 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/15 dark:border-cyan-500/20 text-primary text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEXUS CLOUD ACCESS</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-955 dark:text-white">Authorized Credentials Console</h2>
          <p className="text-xs text-slate-500 dark:text-slate-455 font-sans leading-relaxed">
            Enter your secure keys or coordinate access nodes below.
          </p>
        </div>

        {/* Tab Controls tabs */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border dark:border-slate-850">
          <button
            onClick={() => {
              setActiveTab('login');
              setSuccess(null);
            }}
            className={`flex-1 py-2 text-center text-xs font-semibold uppercase font-mono tracking-wider rounded-lg transition-all ${
              activeTab === 'login'
                ? darkMode
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                  : 'bg-white text-blue-600 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Terminal Login
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setSuccess(null);
            }}
            className={`flex-1 py-2 text-center text-xs font-semibold uppercase font-mono tracking-wider rounded-lg transition-all ${
              activeTab === 'register'
                ? darkMode
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                  : 'bg-white text-blue-600 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Create Credentials
          </button>
        </div>

        {/* Informative Alerts copy */}
        {success && (
          <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-center text-xs font-medium animate-pulse">
            {success}
          </div>
        )}

        {/* Forms Block */}
        {activeTab === 'login' ? (
          /* Login Form space */
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-sans">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Secure Account Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane.doe@nexustech.io"
                  className={`w-full py-2.5 pl-10 pr-3 rounded-xl border outline-none text-xs transition-all ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                      : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono tracking-wide uppercase font-bold">
                <label className="text-slate-550">Account Secret Pin</label>
                <button
                  type="button"
                  onClick={() => setSuccess('Decrypt instructions sent! Verify sandbox logs.')}
                  className="text-blue-550 dark:text-[#22d3ee] font-semibold hover:underline cursor-pointer lowercase"
                >
                  forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full py-2.5 pl-10 pr-10 rounded-xl border outline-none text-xs transition-all font-mono ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                      : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-455 hover:text-white p-1"
                  title="Unmask Password Pin"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-slate-950 bg-primary hover:bg-cyan-300 font-bold font-mono tracking-wider uppercase text-xs shadow-md mt-6 cursor-pointer"
              id="login-submit-btn"
            >
              Sign In Node
            </button>
          </form>
        ) : (
          /* Register Form space */
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs font-sans">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Recipient Full name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className={`w-full py-2.5 px-3.5 rounded-xl border outline-none text-xs transition-all ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                    : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Account Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane.doe@nexustech.io"
                className={`w-full py-2.5 px-3.5 rounded-xl border outline-none text-xs transition-all ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                    : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Secret Password (min 6 characters)</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full py-2.5 pl-3.5 pr-10 rounded-xl border outline-none text-xs transition-all font-mono ${
                    darkMode
                      ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-cyan-400'
                      : 'bg-white border-slate-200 text-slate-800 focus:border-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 dark:hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="text-[9px] text-slate-455 font-mono leading-relaxed">
              Agree to comply with our priority telemetry warranty conditions and terms of service.
            </p>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-slate-950 bg-primary hover:bg-cyan-300 font-bold font-mono tracking-wider uppercase text-xs shadow-md mt-4 cursor-pointer"
              id="register-submit-btn"
            >
              Construct credentials
            </button>
          </form>
        )}

        {/* Social logins */}
        <div className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-slate-850">
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-semibold mb-2 block text-center">
            Or coordinate credentials via:
          </span>
          <div className="grid grid-cols-2 gap-3.5 font-mono text-[10px] font-bold">
            <button
              onClick={() => handleSocialMock('Google')}
              className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                darkMode
                  ? 'border-slate-800 hover:bg-slate-900 text-slate-300'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
              id="auth-google-btn"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Node</span>
            </button>
            <button
              onClick={() => handleSocialMock('GitHub')}
              className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                darkMode
                  ? 'border-slate-800 hover:bg-slate-900 text-slate-300'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
              id="auth-github-btn"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub Node</span>
            </button>
          </div>
        </div>

        {/* Secure badge footer banner info */}
        <div className="text-center text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Fulfillment Decrypted Security active</span>
        </div>
      </div>
    </div>
  );
}
