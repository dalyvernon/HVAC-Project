import React, { useState } from 'react';
import {
  Phone,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  ShieldCheck,
  Clock,
  Sparkles,
  Wrench,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { PageView, ServiceItem } from '../types';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/hvacData';
import { AcCondenserVisual, InspectionChecklistGraphic, SmartThermostatCard } from '../components/HvacVisuals';
import { ThreeDSystemViewer } from '../components/ThreeDSystemViewer';

interface ServiceDetailViewProps {
  serviceSlug: string;
  onNavigate: (page: PageView, serviceSlug?: string) => void;
  onOpenBooking: () => void;
}

export function ServiceDetailView({ serviceSlug, onNavigate, onOpenBooking }: ServiceDetailViewProps) {
  const service = SERVICES_DATA.find((s) => s.slug === serviceSlug) || SERVICES_DATA[0];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="space-y-16 pb-20">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-slate-950 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Services
            </button>
            <span>/</span>
            <span className="text-sky-400 font-medium capitalize">{service.category}</span>
            <span>/</span>
            <span className="text-slate-200">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Austin TX Mechanical Contracting</span>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400">{service.warranty}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {service.shortDesc}
              </p>

              {/* Badges / Specs highlights */}
              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg">
                  <span className="text-slate-400 block text-[11px]">Estimated Investment</span>
                  <span className="font-bold text-white font-mono">{service.priceStartingAt}</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg">
                  <span className="text-slate-400 block text-[11px]">Dispatch Window</span>
                  <span className="font-bold text-sky-400">{service.turnaroundTime}</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg">
                  <span className="text-slate-400 block text-[11px]">Guarantee Backing</span>
                  <span className="font-bold text-emerald-400">{service.warranty}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="text-xs uppercase font-bold text-sky-400">Direct Austin Dispatch</div>
              <h3 className="text-lg font-bold text-white">Need This Service Today?</h3>
              <p className="text-xs text-slate-400">
                Technicians currently routed throughout North Austin, Round Rock & Pflugerville.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-md"
                >
                  Schedule Service Appointment
                </button>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  Call {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Specs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main 8-col content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Deep Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">Engineering & Service Scope</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            {/* Key Features & Diagnostic Inclusions */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-slate-950">What Is Included In Every Service</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {service.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span className="text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Technical Workflow */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Standard Operating Protocol</span>
                <h3 className="text-xl font-bold text-slate-950 mt-1">Our 4-Step Execution Process</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.processSteps.map((step) => (
                  <div key={step.step} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                    <span className="text-xs font-bold font-mono text-sky-600 bg-sky-100 px-2 py-0.5 rounded">
                      Step {step.step}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICE SPECIFIC FAQS */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-600" />
                <h3 className="text-xl font-bold text-slate-950">Frequently Asked Questions About {service.title}</h3>
              </div>

              <div className="space-y-3">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-sky-600 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180 text-sky-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Specs card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Technical Specifications</h4>
              <div className="space-y-2 text-xs">
                {service.specs.map((sp, i) => (
                  <div key={i} className="py-2 border-b border-slate-100 flex justify-between gap-2">
                    <span className="text-slate-500">{sp.label}:</span>
                    <span className="font-semibold text-slate-900 text-right">{sp.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D System Inspection Model */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-500">3D Mechanical Viewport</span>
                <span className="text-sky-600 font-medium">Interactive 360°</span>
              </div>
              <ThreeDSystemViewer compact={true} />
            </div>

            {/* Certified Inspection Graphic or Visual preview */}
            <InspectionChecklistGraphic />

            {/* Other Services Switcher */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Explore Other Services</h4>
              <div className="space-y-1">
                {SERVICES_DATA.filter((s) => s.slug !== service.slug).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onNavigate('service-detail', s.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-colors flex items-center justify-between"
                  >
                    <span className="truncate">{s.title}</span>
                    <span className="text-slate-400">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
