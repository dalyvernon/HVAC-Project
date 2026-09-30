import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  MapPin,
  Phone,
  Clock,
  Wrench,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PageView } from '../types';
import { BUSINESS_INFO } from '../data/hvacData';
import { InteractiveCoverageMap } from '../components/InteractiveCoverageMap';

interface AboutViewProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export function AboutView({ onNavigate, onOpenBooking }: AboutViewProps) {
  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Austin Mechanical Contractors</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">TDLR TACLA #84921E</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              About HVAC Express Contracting LLC
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Founded on the belief that Austin homeowners and businesses deserve honest mechanical engineering 
              rather than high-pressure sales tactics.
            </p>
          </div>
        </div>
      </section>

      {/* Origin & Ethics Pledge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Our Central Texas Roots
            </span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">
              Craftsmanship, Safety & Transparent Pricing
            </h2>

            <p className="text-sm text-slate-700 leading-relaxed">
              HVAC Express Contracting LLC was established to solve a widespread problem in the Central Texas HVAC industry: 
              private-equity-backed firms turning technicians into aggressive salespeople pushing $15,000 system replacements 
              for a $150 repair.
            </p>

            <p className="text-sm text-slate-700 leading-relaxed">
              Operating directly from our dispatch and logistics hub at <strong>13900 N IH 35 Suite H1 in Austin, TX 78728</strong>, 
              we maintain a fleet of mobile inventory vans capable of diagnosing and repairing 94% of air conditioning and 
              heating failures on the very first visit.
            </p>

            {/* Non-Commissioned Pledge Box */}
            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sky-900 text-sm">
                <ShieldCheck className="w-5 h-5 text-sky-600" />
                <span>Our Non-Commissioned Technician Guarantee</span>
              </div>
              <p className="text-xs text-sky-800 leading-relaxed">
                Our technicians are paid competitive hourly wages with bonuses based exclusively on quality audit scores, 
                clean mechanical inspections, and customer satisfaction—never on how much equipment they sell you.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3">
              Austin Headquarters & Operating Profile
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Headquarters:</span>
                  <span>{BUSINESS_INFO.fullAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Dispatch Line:</span>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-sky-600 font-bold hover:underline">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">State Licensure:</span>
                  <span>Texas Department of Licensing & Regulation (TDLR TACLA #84921E)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 block">Dispatch Hours:</span>
                  <span>24 Hours a Day / 7 Days a Week / 365 Days</span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Schedule Service with Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="bg-slate-50 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Company Standards
            </span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight mt-1">
              The 4 Pillars of HVAC Express
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'ACCA Manual J Sizing',
                desc: 'We calculate true solar orientation, cubic volume, and window glazing heat gain to engineer systems that balance temperature perfectly.',
                icon: <Wrench className="w-5 h-5 text-sky-600" />
              },
              {
                title: 'Nitrogen-Purged Brazing',
                desc: 'Oxidation during torch soldering kills modern inverter valves. We purge pure nitrogen during all refrigerant connection work.',
                icon: <Sparkles className="w-5 h-5 text-sky-600" />
              },
              {
                title: 'Upfront Flat-Rate Quotes',
                desc: 'Every quote is presented in writing with exact parts and labor listed. You approve the total before our technicians begin.',
                icon: <Award className="w-5 h-5 text-sky-600" />
              },
              {
                title: 'Austin Community Pride',
                desc: 'Our technicians live in North Austin, Round Rock, and Pflugerville. We treat our neighbors like family.',
                icon: <Users className="w-5 h-5 text-sky-600" />
              }
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-slate-950">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility & Specific Austin-Area Coverage Zones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Strategic Central Texas Dispatch Logistics
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Round Rock, Pflugerville, Cedar Park & Beyond
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Headquartered at <strong>13900 N IH 35 Suite H1 in Austin, TX 78728</strong>, HVAC Express maintains immediate 
            arterial access to Interstate 35, State Highway 45 Toll, US Highway 183, and MoPac Expressway. Explore our 
            dedicated coverage zones, local response windows, and tailored climate solutions below.
          </p>
        </div>

        {/* Interactive Coverage Map Visual Component */}
        <InteractiveCoverageMap onOpenBooking={onOpenBooking} />
      </section>
    </div>
  );
}
