import React, { useState } from 'react';
import { HelpCircle, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { FAQS } from '../data';

interface FAQProps {
  darkMode: boolean;
}

export default function FAQ({ darkMode }: FAQProps) {
  const [activeGroup, setActiveGroup] = useState<string>('All');
  const [expandedIdxs, setExpandedIdxs] = useState<Record<string, boolean>>({});

  const groups = ['All', 'Orders', 'Shipping', 'Returns', 'Payments', 'Warranty & Support'];

  const toggleExpand = (qText: string) => {
    setExpandedIdxs((prev) => ({ ...prev, [qText]: !prev[qText] }));
  };

  const filteredFaqs = FAQS.filter(
    (f) => activeGroup === 'All' || f.group === activeGroup
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 font-sans">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-[10px] font-mono tracking-widest text-[#22d3ee] font-bold block uppercase pb-1">
          KNOWLEDGE DATABASES
        </span>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-905 dark:text-white leading-tight">
          Frequently Answered Parameters
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
          Toggle specific category matrices to configure logistics, returns or hardware warranty provisions.
        </p>
      </div>

      {/* Tab select groupers */}
      <div className="flex flex-wrap gap-2 justify-center pb-2 border-b border-slate-200 dark:border-slate-900">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setActiveGroup(g)}
            className={`py-2 px-4 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer border ${
              activeGroup === g
                ? darkMode
                  ? 'bg-slate-900 border-slate-800 text-cyan-404 font-bold shadow-md'
                  : 'bg-blue-50 border-blue-200 text-blue-600 font-bold shadow-sm'
                : darkMode
                ? 'border-transparent text-slate-400 hover:text-white'
                : 'border-transparent text-slate-505 hover:text-slate-950'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Accordions rendering */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <p className="text-slate-500 text-xs italic text-center">No catalog directories match selection.</p>
        ) : (
          filteredFaqs.map((faq) => {
            const isExp = !!expandedIdxs[faq.q];
            return (
              <div
                key={faq.q}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                  isExp
                    ? darkMode
                      ? 'bg-slate-950 border-cyan-400/20'
                      : 'bg-indigo-50/10 border-blue-200'
                    : darkMode
                    ? 'bg-slate-950/20 border-slate-900 hover:border-slate-800'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Trigger heading row */}
                <button
                  onClick={() => toggleExpand(faq.q)}
                  className="w-full flex justify-between items-start gap-4 text-xs font-bold font-sans text-slate-900 dark:text-slate-200 text-left"
                >
                  <div className="flex gap-2.5 items-center">
                    <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border dark:border-slate-850 font-semibold text-slate-500">
                      {faq.group}
                    </span>
                    <h4 className="leading-snug">{faq.q}</h4>
                  </div>
                  {isExp ? <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />}
                </button>

                {/* dynamic expandable description field */}
                {isExp && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 pl-0 md:pl-24 leading-relaxed font-sans max-w-3xl border-t border-slate-100 dark:border-slate-900 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Quick feedback ticket callout panel */}
      <div className="p-4 rounded-xl border border-dashed border-blue-500/10 bg-blue-500/5 text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4 max-w-3xl mx-auto">
        <div className="flex gap-2.5 items-center text-left">
          <HelpCircle className="w-6 h-6 text-cyan-400 flex-shrink-0" />
          <p className="text-slate-550 dark:text-slate-400 font-sans leading-relaxed">
            Can’t locate specifically what telemetry settings you require?
            <br />
            Our customer technicians can configure a support coordinate ticket directly with you.
          </p>
        </div>
        <span className="font-semibold text-blue-500 dark:text-[#22d3ee] hover:underline cursor-pointer font-mono text-[10px] uppercase tracking-wider">
          Open Support Ticket ↗
        </span>
      </div>
    </div>
  );
}
