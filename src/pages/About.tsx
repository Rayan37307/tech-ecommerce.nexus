import React from 'react';
import { Target, Award, Eye, Heart, Sparkles } from 'lucide-react';
import { ABOUT_MILESTONES, TEAM_MEMBERS } from '../data';

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  const coreValues = [
    { title: 'Innovation Frequency', text: 'Integrating Gallium Nitride chips, zero-plastic layouts and RGBIC addressable signals directly in peripheral setups.', icon: Sparkles, color: 'text-cyan-400' },
    { title: 'Acoustic Mechanical Fidelity', text: 'Calibrating key depths, double-shot PBT material coatings and precision sensor metrics for swift actions.', icon: Target, color: 'text-blue-500' },
    { title: 'Carbon Neutrality Shield', text: 'Crafting fully recyclable retail pack envelopes, biodegradable shells, and resource-conscious components.', icon: Eye, color: 'text-emerald-400' },
    { title: 'Priority Dispatch Support', text: 'Our support priority queue operates continuously to resolve firmware setups, carrier rates and return shipping labels.', icon: Heart, color: 'text-rose-450' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Brand Manifesto Heading */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#22d3ee]-400 text-indigo-600">
          NEXUS OPERATIONAL MANIFESTO
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-slate-905 dark:text-white leading-tight">
          Engineering the Future of Workspace Setup
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed font-sans">
          Forging premium hardware components for software designers, elite developers, and visual directors. Our philosophy marries brutalist aerospace durability with clean layouts and responsive, glowing signals.
        </p>
      </section>

      {/* Core Values grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Our Core Pillars</h2>
          <p className="text-xs text-slate-500 dark:text-slate-405 font-mono uppercase tracking-wide">WHAT WE STAND GUARD OVER</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((v) => {
            const ValIcon = v.icon;
            return (
              <div
                key={v.title}
                className={`p-5 rounded-2xl border text-left ${
                  darkMode ? 'bg-slate-950/45 border-slate-900 text-slate-100' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <ValIcon className={`w-8 h-8 ${v.color} mb-3.5`} />
                <h4 className="font-display font-semibold text-sm mb-2 text-slate-950 dark:text-slate-205">{v.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{v.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Milestones timeline */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Evolution Timeline</h2>
          <p className="text-xs text-slate-500 dark:text-slate-455 font-mono uppercase tracking-wide">HISTORIC STEPS</p>
        </div>

        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-4 gap-4 relative">
          {/* Connector timeline line */}
          <div className="hidden md:block absolute h-0.5 bg-slate-200 dark:bg-slate-900 top-1/2 -translate-y-1/2 left-0 right-0 z-0" />

          {ABOUT_MILESTONES.map((stone) => (
            <div
              key={stone.year}
              className={`p-5 rounded-2xl border relative z-10 text-left ${
                darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <span className="font-display font-bold text-lg text-transparent bg-clip-text bg-gradient-to-tr from-blue-500 to-cyan-400 mb-1 block font-mono">
                {stone.year}
              </span>
              <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white mb-2">{stone.title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans leading-relaxed">{stone.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team cards section (3 members) */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">The Engineering Guild</h2>
          <p className="text-xs text-slate-500 dark:text-slate-455 font-mono uppercase tracking-wide">FOUNDING NODES</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((m) => (
            <div
              key={m.name}
              className={`rounded-2xl border overflow-hidden text-left ${
                darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="w-full aspect-square bg-slate-100 overflow-hidden relative">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform hover:scale-103 duration-300" referrerPolicy="no-referrer" />
              </div>

              <div className="p-5 space-y-2 font-sans">
                <div className="space-y-0.5">
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">{m.name}</h4>
                  <span className="text-[10px] font-mono tracking-wider font-semibold text-blue-500 dark:text-cyan-404">{m.role}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed pt-1.5 border-t border-slate-100 dark:border-slate-900">
                  {m.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
