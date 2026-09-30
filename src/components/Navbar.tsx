import React, { useState } from 'react';
import { Phone, Menu, X, ChevronDown, ShieldCheck, Flame, Snowflake, Wrench, Wind, Building2 } from 'lucide-react';
import { PageView } from '../types';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/hvacData';

interface NavbarProps {
  currentPage: PageView;
  selectedServiceSlug?: string;
  onNavigate: (page: PageView, serviceSlug?: string) => void;
  onOpenBooking: () => void;
}

export function Navbar({ currentPage, selectedServiceSlug, onNavigate, onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const handleNav = (page: PageView, serviceSlug?: string) => {
    onNavigate(page, serviceSlug);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const serviceIcons: Record<string, React.ReactNode> = {
    'ac-repair': <Snowflake className="w-4 h-4 text-sky-500" />,
    'ac-installation': <Snowflake className="w-4 h-4 text-blue-500" />,
    'heating-furnace': <Flame className="w-4 h-4 text-amber-500" />,
    'maintenance-tuneup': <Wrench className="w-4 h-4 text-emerald-500" />,
    'indoor-air-quality': <Wind className="w-4 h-4 text-teal-500" />,
    'commercial-hvac': <Building2 className="w-4 h-4 text-indigo-500" />
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark in display face */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-sky-400 font-extrabold text-xl shadow-md group-hover:bg-slate-800 transition-colors">
              HX
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-950 group-hover:text-sky-600 transition-colors">
                HVAC Express
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase -mt-0.5">
                Contracting LLC
              </span>
            </div>
          </button>

          {/* Zone 2: 4–6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-sky-600 transition-colors pb-1 border-b-2 ${
                currentPage === 'home' ? 'text-sky-600 border-sky-600 font-semibold' : 'border-transparent text-slate-700'
              }`}
            >
              Home
            </button>

            {/* Services with Hover Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNav('services')}
                className={`flex items-center gap-1 hover:text-sky-600 transition-colors pb-1 border-b-2 ${
                  currentPage === 'services' || currentPage === 'service-detail'
                    ? 'text-sky-600 border-sky-600 font-semibold'
                    : 'border-transparent text-slate-700'
                }`}
              >
                Services
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
              </button>

              {/* Flyout menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">All HVAC Services</span>
                    <button
                      onClick={() => handleNav('services')}
                      className="text-xs text-sky-600 hover:text-sky-700 font-medium"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="py-1">
                    {SERVICES_DATA.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => handleNav('service-detail', srv.slug)}
                        className={`w-full text-left px-4 py-2.5 flex items-start gap-3 hover:bg-slate-50 transition-colors ${
                          selectedServiceSlug === srv.slug && currentPage === 'service-detail' ? 'bg-sky-50/60' : ''
                        }`}
                      >
                        <div className="mt-0.5">{serviceIcons[srv.id]}</div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{srv.title}</div>
                          <div className="text-xs text-slate-500 line-clamp-1">{srv.shortDesc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-50 border-t border-slate-100 rounded-b-xl">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Austin 24/7 Emergency Line:</span>
                      <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="font-bold text-slate-900 hover:text-sky-600">
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('calculator')}
              className={`hover:text-sky-600 transition-colors pb-1 border-b-2 ${
                currentPage === 'calculator' ? 'text-sky-600 border-sky-600 font-semibold' : 'border-transparent text-slate-700'
              }`}
            >
              Cost Estimator
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`hover:text-sky-600 transition-colors pb-1 border-b-2 ${
                currentPage === 'about' ? 'text-sky-600 border-sky-600 font-semibold' : 'border-transparent text-slate-700'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`hover:text-sky-600 transition-colors pb-1 border-b-2 ${
                currentPage === 'contact' ? 'text-sky-600 border-sky-600 font-semibold' : 'border-transparent text-slate-700'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1–2 primary actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="hidden xl:flex flex-col text-right hover:opacity-90 transition-opacity"
            >
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Fast Austin Dispatch</span>
              <span className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                {BUSINESS_INFO.phone}
              </span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-sm font-bold text-white bg-slate-950 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm"
            >
              Schedule Dispatch
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="p-2 text-slate-700 hover:text-sky-600 sm:hidden"
              aria-label="Call HVAC Express"
            >
              <Phone className="w-5 h-5 text-sky-600" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => handleNav('home')}
              className="text-left px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('services')}
              className="text-left px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              Services Overview
            </button>
            <div className="pl-4 space-y-1 border-l-2 border-slate-200 ml-3 my-1">
              {SERVICES_DATA.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleNav('service-detail', s.slug)}
                  className="block w-full text-left py-1 text-sm text-slate-600 hover:text-sky-600"
                >
                  {s.title}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleNav('calculator')}
              className="text-left px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              System Cost Estimator
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              About HVAC Express
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="text-left px-3 py-2 text-base font-semibold text-slate-900 hover:bg-slate-50 rounded-lg"
            >
              Contact & Austin Office
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 text-slate-900 font-bold rounded-lg text-sm"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              Call {BUSINESS_INFO.phone}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-sm shadow-md"
            >
              Request Emergency Dispatch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
