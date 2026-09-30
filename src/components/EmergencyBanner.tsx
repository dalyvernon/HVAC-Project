import React from 'react';
import { Phone, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/hvacData';

export function EmergencyBanner({ onBookClick }: { onBookClick: () => void }) {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        {/* Left: Emergency Status */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            24/7 Emergency Dispatch
          </span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Austin Average Response: Under 60 Mins
          </span>
          <span className="text-slate-600 hidden md:inline">·</span>
          <span className="hidden md:flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            TDLR TACLA #84921E Licensed & Insured
          </span>
        </div>

        {/* Right: Direct Phone & Quick Schedule */}
        <div className="flex items-center gap-4 ml-auto">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 font-bold text-white hover:text-sky-400 transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
          <button
            onClick={onBookClick}
            className="text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-2.5 py-1 rounded transition-colors whitespace-nowrap"
          >
            Book Online
          </button>
        </div>
      </div>
    </div>
  );
}
