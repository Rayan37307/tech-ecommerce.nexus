import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Twitter, Youtube, Github } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  // Inbox states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [msg, setMsg] = useState('');
  const [notified, setNotified] = useState<string | null>(null);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && msg.trim()) {
      setNotified('Inquiry Ticket logged successfully! Support Node will reach back in 2 hours.');
      setName('');
      setEmail('');
      setSubject('');
      setMsg('');
      setTimeout(() => setNotified(null), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-widest text-[#22d3ee] font-bold block uppercase">
          SECURE COMMUNICANT INTERFACE
        </span>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-905 dark:text-white">
          Contact Support Dispatch
        </h1>
        <p className="text-sm text-text-secondary font-sans leading-relaxed">
          Log active telemetry tickets or locate regional fulfillment coordinates. Our hardware support nodes operate continuously.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Contact Form Module */}
        <div className="lg:col-span-8">
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-lg'}`}>
            <div className="flex gap-2 items-center mb-6 pb-2 border-b border-slate-250 dark:border-slate-900">
              <MessageCircle className="w-5 h-5 text-cyan-405" />
              <h2 className="font-display font-semibold text-base text-text-primary">Inquiry Ticket Dispatch</h2>
            </div>

            {notified && (
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold text-center mb-6 animate-pulse">
                {notified}
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Your Legal Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                      darkMode ? 'bg-slate-900 border-slate-805 text-slate-205 focus:border-cyan-405' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold block">Contact Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane.doe@nexustech.io"
                    className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                      darkMode ? 'bg-slate-900 border-slate-805 text-slate-205 focus:border-cyan-405' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-455 font-bold block">Ticket Subject Topic</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Firmware calibration coordinate issue / Logistics details query"
                  className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                    darkMode ? 'bg-slate-900 border-slate-805 text-slate-205 focus:border-cyan-405' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-455 font-bold block">Diagnostic Ticket Message</label>
                <textarea
                  rows={5}
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Detail your peripheral configuration logs or transit index coordinates here..."
                  className={`w-full p-2.5 rounded-xl border outline-none text-xs transition-all ${
                    darkMode ? 'bg-slate-900 border-slate-850 text-slate-205 focus:border-cyan-404' : 'bg-white border-slate-2x'
                  }`}
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-900">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl font-bold font-mono text-xs uppercase tracking-widest text-slate-950 bg-primary hover:bg-cyan-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  id="ticket-dispatch-submit-btn"
                >
                  <span>Dispatch ticket</span>
                  <Send className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Coordinates / stylish simulated maps frame */}
        <aside className="lg:col-span-4 space-y-6">
          <div
            className={`border rounded-2xl p-5 space-y-6 text-left ${
              darkMode ? 'bg-text' : 'bg-surface'
            }`}
          >
            <h3 className="font-display font-semibold text-sm text-text-primary uppercase tracking-wider pb-3 border-b border-slate-250 dark:border-slate-900">
              Dispatch Nodes
            </h3>

            {/* Address parameters */}
            <ul className="space-y-4 text-xs font-sans">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">Regional Vault Coordinates</span>
                  <p className="text-slate-505 dark:text-slate-400 mt-0.5 font-sans leading-relaxed">
                    101 Cybernetic Drive, Unit 4C <br />
                    Neo-Detroit, Michigan, 48201
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">Telemetry Mail dispatch</span>
                  <p className="text-slate-505 dark:text-slate-400 font-mono mt-0.5 select-all">
                    support@nexustech.io
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100">Support Dial Indices</span>
                  <p className="text-slate-505 dark:text-slate-400 font-mono mt-0.5 select-all">
                    +1 (425) 555-0192 [PRIORITY LOG]
                  </p>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-250 dark:border-slate-900 space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#22d3ee] font-bold block uppercase">Social Signals</span>
              {/* Social handles list links */}
              <div className="flex gap-3 text-xs">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                  <Twitter className="w-4.5 h-4.5" />
                  <span>Twitter</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                  <Youtube className="w-4.5 h-4.5" />
                  <span>Youtube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Embedded static graphic map coordinates frame */}
          <div className="rounded-2xl border border-border overflow-hidden h-40 relative group shadow-sm bg-slate-900/40">
            {/* Fake map drawing via CSS styling elements */}
            <div className="absolute inset-0 bg-[#0a0f1d] p-4 flex flex-col justify-between text-slate-400 font-mono text-[9px] select-none pointer-events-none">
              <div className="flex justify-between">
                <span>LAT: 42.3314° N</span>
                <span>LON: 83.0458° W</span>
              </div>
              
              {/* grid design */}
              <div className="absolute inset-0 bg-radial-grid opacity-15" />

              <div className="self-center flex flex-col items-center space-y-1 relative z-10">
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-cyan-455 animate-pulse flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </div>
                <span className="text-[8px] font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  NEXUS SECURE VAULT
                </span>
              </div>

              <div className="text-right">
                <span>MAPS RENDER MOCKUP APPROVED</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
