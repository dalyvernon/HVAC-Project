import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { PageView } from '../types';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/hvacData';

interface FooterProps {
  onNavigate: (page: PageView, serviceSlug?: string) => void;
  onOpenBooking: () => void;
}

export function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Pre-Footer Dispatch Callout */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-sky-400">
              Immediate Texas HVAC Dispatch
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Suffering from Austin heat or winter freezing temps?
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Fully stocked service vans on standby across North Austin, Round Rock & Pflugerville.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-colors whitespace-nowrap shadow-lg shadow-sky-500/20"
            >
              <Phone className="w-4 h-4" />
              Call {BUSINESS_INFO.phone}
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors border border-slate-700 whitespace-nowrap"
            >
              Book Service Online
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-sky-500 text-slate-950 flex items-center justify-center font-extrabold text-lg">
                HX
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {BUSINESS_INFO.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Austin’s premier licensed mechanical contractor specializing in residential central air conditioning,
              inverter heat pump installations, furnace diagnostics, and commercial rooftop climate systems.
            </p>

            <div className="space-y-2 text-sm text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-white font-semibold">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>24/7 Emergency Dispatch Available</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">HVAC Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => onNavigate('service-detail', srv.slug)}
                    className="hover:text-sky-400 transition-colors text-left"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-sky-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-sky-400 transition-colors">
                  Services Hub & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-sky-400 transition-colors">
                  System Cost Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-sky-400 transition-colors">
                  About Our Austin Team
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-sky-400 transition-colors">
                  Contact & Dispatch
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
                  Request Service Appointment →
                </button>
              </li>
            </ul>
          </div>

          {/* Service Area & Licensing */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Certifications</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-200 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{BUSINESS_INFO.license}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>NATE Certified Technicians</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>EPA Section 608 Universal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Austin Energy Participating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>$2,000,000 General Liability</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              Serving Austin, Round Rock, Pflugerville, Cedar Park, Georgetown, Wells Branch, and surrounding Central Texas communities.
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. Registered in Travis County, Texas.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>TDLR Licensed Mechanical Contractor</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
