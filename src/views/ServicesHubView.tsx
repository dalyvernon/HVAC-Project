import React, { useState } from 'react';
import {
  Snowflake,
  Flame,
  Wrench,
  Wind,
  Building2,
  CheckCircle2,
  ChevronDown,
  Phone,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Clock
} from 'lucide-react';
import { PageView } from '../types';
import { BUSINESS_INFO, SERVICES_DATA, GENERAL_FAQS } from '../data/hvacData';

interface ServicesHubViewProps {
  onNavigate: (page: PageView, serviceSlug?: string) => void;
  onOpenBooking: () => void;
}

export function ServicesHubView({ onNavigate, onOpenBooking }: ServicesHubViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All HVAC Solutions' },
    { id: 'cooling', label: 'Air Conditioning' },
    { id: 'heating', label: 'Heating & Heat Pumps' },
    { id: 'maintenance', label: 'Maintenance Care' },
    { id: 'air-quality', label: 'Indoor Air Quality' },
    { id: 'commercial', label: 'Commercial RTU' }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Full Service HVAC Contracting</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Austin, Round Rock & Pflugerville</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Residential & Commercial HVAC Services
            </h1>

            <p className="text-base text-slate-300 leading-relaxed">
              Every climate system we service is backed by non-commissioned NATE-certified technicians,
              transparent flat-rate written pricing, and complete Texas mechanical licensing compliance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>TDLR TACLA #84921E</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>24/7 Austin Emergency Response</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Direct Line: (512) 967-1088</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid with Functional Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Interactive Segmented Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto mb-8 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-sky-300 hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-bold text-slate-400">0{index + 1}.</span>
                  <span className="font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100">
                    {service.turnaroundTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 mb-2">{service.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Warranty:</span>
                    <span className="font-semibold text-slate-800">{service.warranty}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Pricing Guide:</span>
                    <span className="font-semibold text-slate-800">{service.priceStartingAt}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 mb-6">
                  {service.keyFeatures.slice(0, 4).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => onNavigate('service-detail', service.slug)}
                  className="flex-1 py-2.5 px-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
                >
                  Full Details & FAQs
                </button>
                <button
                  onClick={onOpenBooking}
                  className="py-2.5 px-4 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap text-center"
                >
                  Schedule Dispatch
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services FAQ Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-black text-slate-950 tracking-tight">
            HVAC Services FAQ
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Clear answers about emergency dispatch times, warranties, licensing, and financing in Austin, TX.
          </p>
        </div>

        <div className="space-y-3">
          {GENERAL_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-sky-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Call / Emergency CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-sky-400">
              Austin Emergency Dispatch Desk
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Have an immediate heating or air conditioning breakdown?
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Our technicians carry universal capacitors, motors, and refrigerants for immediate same-day repair.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-colors text-center whitespace-nowrap shadow-lg shadow-sky-500/20"
            >
              Call (512) 967-1088
            </a>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors text-center border border-slate-700 whitespace-nowrap"
            >
              Schedule Online
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
