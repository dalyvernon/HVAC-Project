import React from 'react';
import {
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
  Wrench,
  ThermometerSnowflake,
  Flame,
  Award,
  Calendar
} from 'lucide-react';
import { PageView } from '../types';
import { BUSINESS_INFO, SERVICES_DATA, REVIEWS_DATA, MAINTENANCE_PLANS, CASE_STUDIES } from '../data/hvacData';
import { AustinServiceMap, InspectionChecklistGraphic } from '../components/HvacVisuals';
import { SymptomChecker } from '../components/SymptomChecker';
import { CostEstimator } from '../components/CostEstimator';
import { CustomerTestimonials } from '../components/CustomerTestimonials';
import { ThreeDSystemViewer } from '../components/ThreeDSystemViewer';
import { ThreeDThermostat } from '../components/ThreeDThermostat';
import { ThreeDMotionBackground } from '../components/ThreeDMotionBackground';
import { ThreeDCardMotion } from '../components/ThreeDCardMotion';
import { ThreeDAirflowSimulator } from '../components/ThreeDAirflowSimulator';

interface HomeViewProps {
  onNavigate: (page: PageView, serviceSlug?: string) => void;
  onOpenBooking: () => void;
}

export function HomeView({ onNavigate, onOpenBooking }: HomeViewProps) {
  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 border-b border-slate-800">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-25" />
        
        {/* 3D Atmospheric Kinetic Airflow Motion Field */}
        <ThreeDMotionBackground mode="cooling" particleCount={240} />

        {/* Soft cool ambient light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy & Action Zone (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Austin Technicians On Duty</span>
                <span className="text-slate-600">·</span>
                <span className="text-sky-400 font-mono">TDLR TACLA #84921E</span>
              </div>

              {/* Marquee Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white text-balance leading-[1.08]">
                Austin’s Dependable AC & Heating Specialists.
              </h1>

              {/* Value Proposition */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Licensed HVAC contracting for residential and commercial systems across Greater Austin. From emergency 
                compressor diagnostics in triple-digit heat to high-efficiency inverter replacements with Austin Energy rebates.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm sm:text-base transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Service Dispatch</span>
                </button>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-bold text-sm sm:text-base transition-all border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>(512) 967-1088</span>
                </a>
              </div>

              {/* Adjacency Trust Indicators */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-800/80 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Under 60 Min Average Austin Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Upfront Flat-Rate Pricing</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>100% Guaranteed Workmanship</span>
                </div>
              </div>
            </div>

            {/* Right Focal Graphic Zone (5 cols) - Interactive 3D Spatial Mechanical Viewport */}
            <div className="lg:col-span-5 space-y-4">
              <ThreeDSystemViewer />
              
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-300">Austin Summer Heat Advisory Active</span>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="text-sky-400 hover:text-white font-bold underline"
                >
                  Emergency Queue →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REPUTATION & CERTIFICATION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl font-black text-slate-950 font-mono tracking-tight tabular-nums">24/7</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Austin Emergency Dispatch</div>
              <div className="text-xs text-slate-400 mt-0.5">365 Days a Year</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl font-black text-slate-950 font-mono tracking-tight tabular-nums">100%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Flat-Rate Written Pricing</div>
              <div className="text-xs text-slate-400 mt-0.5">Zero Surprise Invoices</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl font-black text-slate-950 font-mono tracking-tight tabular-nums">NATE</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Certified Technicians</div>
              <div className="text-xs text-slate-400 mt-0.5">EPA 608 Universal Licensed</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl font-black text-slate-950 font-mono tracking-tight tabular-nums">$3,100+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Max Combined Rebates</div>
              <div className="text-xs text-slate-400 mt-0.5">Austin Energy & 25C Credits</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
              Engineered Climate Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Comprehensive HVAC Services
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              From precision capacitor and compressor repairs to full high-efficiency heat pump replacements,
              every job is backed by our Austin craftsmanship warranty.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Explore All Services & FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Services Asymmetric Bento-Grid with 3D Spatial Tilt & Glare */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <ThreeDCardMotion key={service.id} intensity={8} glare={true} className="h-full">
              <div
                className={`bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-sky-300 hover:shadow-xl transition-all h-full ${
                  index === 0 ? 'ring-1 ring-sky-500/30' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">0{index + 1}.</span>
                    <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {service.turnaroundTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-950 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-1.5 mb-6 text-xs text-slate-700">
                    {service.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Starting at</span>
                    <span className="text-sm font-bold text-slate-900">{service.priceStartingAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('service-detail', service.slug)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Details & FAQs
                    </button>
                    <button
                      onClick={onOpenBooking}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </ThreeDCardMotion>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE DIAGNOSTIC SYMPTOM CHECKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SymptomChecker onOpenBooking={onOpenBooking} />
      </section>

      {/* 5. 3D KINETIC MOTION GRAPHICS: AIRFLOW & FILTRATION SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThreeDAirflowSimulator />
      </section>

      {/* 6. INTERACTIVE COST ESTIMATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CostEstimator onOpenBooking={onOpenBooking} />
      </section>

      {/* 6. WHY AUSTIN CHOOSES HVAC EXPRESS (PROOF & STANDARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                The HVAC Express Standard
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
                Engineering Discipline Over High-Pressure Sales
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Most HVAC contractors operate on commission quotas, incentivizing technicians to push unnecessary replacements. 
              At HVAC Express Contracting LLC, our technicians are non-commissioned craftsmen evaluated strictly on fix rates, 
              safety compliance, and customer satisfaction.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">ACCA Manual J Load Sizing</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We never guess tonnage by square footage alone. We analyze attic insulation, window solar heat gain,
                    and duct static pressure to prevent short-cycling and muggy indoor humidity.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Nitrogen-Purged Copper Brazing</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We flow pure nitrogen gas through copper refrigerant lines during torch brazing. This eliminates black carbon
                    oxide flakes that ruin inverter electronic expansion valves and seize compressors.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Austin Energy & TDLR Compliant</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We pull all mandatory municipal permits and handle utility rebate paperwork so you receive every dollar
                    of energy incentive you are entitled to.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <ThreeDThermostat />
            <InspectionChecklistGraphic />
          </div>
        </div>
      </section>

      {/* 7. REAL AUSTIN CASE STUDIES WITH QUANTIFIED IMPACT */}
      <section className="bg-slate-900 text-white py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Verified Case Studies
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight mt-1">
              Real Performance in Austin Homes & Facilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Explore how our engineered HVAC solutions solve difficult Central Texas temperature splits and commercial emergencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASE_STUDIES.map((study) => (
              <div key={study.id} className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="text-sky-400 font-semibold">{study.location}</span>
                    <span className="font-mono">{study.systemType}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{study.title}</h3>

                  <div className="space-y-3 text-xs sm:text-sm mb-6">
                    <div>
                      <strong className="text-slate-300 block mb-0.5">The Challenge:</strong>
                      <p className="text-slate-400">{study.challenge}</p>
                    </div>
                    <div>
                      <strong className="text-slate-300 block mb-0.5">Engineered Solution:</strong>
                      <p className="text-slate-400">{study.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                  {study.results.map((res, i) => (
                    <div key={i} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-base sm:text-lg font-black text-sky-400 font-mono tabular-nums">{res.metric}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{res.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. VIP EXPRESS MAINTENANCE CARE PLANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Preventative Peace of Mind
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
            VIP Express Care Maintenance Clubs
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Regular maintenance prevents 85% of unexpected summer breakdowns and keeps manufacturer warranties active.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MAINTENANCE_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xl relative ring-2 ring-sky-500'
                  : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              <div>
                {plan.popular && (
                  <div className="inline-block bg-sky-500 text-slate-950 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md mb-3">
                    Most Popular in Austin
                  </div>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className={`text-xs mt-1 ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                <div className="my-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold font-mono tracking-tight tabular-nums">
                      ${plan.priceMonthly}
                    </span>
                    <span className={`text-xs ml-1.5 ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      / month (${plan.priceAnnual}/yr)
                    </span>
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    {plan.discounts}
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.popular ? 'text-sky-400' : 'text-sky-600'
                        }`}
                      />
                      <span className={plan.popular ? 'text-slate-200' : 'text-slate-600'}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-colors ${
                    plan.popular
                      ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md'
                      : 'bg-slate-950 hover:bg-slate-800 text-white'
                  }`}
                >
                  Join {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. AUSTIN CUSTOMER TESTIMONIALS & SOCIAL PROOF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomerTestimonials onOpenBooking={onOpenBooking} />
      </section>

      {/* 10. DISPATCH TERRITORY & CENTRAL TEXAS MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Austin Metro Service Hub
            </span>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">
              Rapid Response Across Central Texas
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Headquartered at <strong>{BUSINESS_INFO.address}</strong> along the IH-35 corridor, our fleet maintains 
              rapid arterial access to North Austin, Round Rock, Pflugerville, Cedar Park, Georgetown, and the entire Austin area.
            </p>

            <div className="space-y-2 text-xs text-slate-700 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>Primary Hub: 13900 N IH 35 Suite H1, Austin TX 78728</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>Coverage: 35-Mile Radius around Austin Metropolitan Area</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>Average Arrival: 45 - 75 Minutes for Outages</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                Check Technician Availability in Your Zip Code
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AustinServiceMap />
          </div>
        </div>
      </section>
    </div>
  );
}
