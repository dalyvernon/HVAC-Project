import React, { useState, useId } from 'react';
import { Calculator, Zap, DollarSign, Check, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/hvacData';

interface CostEstimatorProps {
  onOpenBooking: () => void;
}

export function CostEstimator({ onOpenBooking }: CostEstimatorProps) {
  const [sqFootage, setSqFootage] = useState(2000);
  const [systemType, setSystemType] = useState<'heatpump' | 'ac-gas' | 'ac-electric' | 'minisplit'>('heatpump');
  const [efficiencyTier, setEfficiencyTier] = useState<'standard' | 'high' | 'ultra'>('high');
  const [stories, setStories] = useState<'single' | 'two'>('single');
  const [includeDuctwork, setIncludeDuctwork] = useState(false);
  const sqFootageId = useId();

  // Ton sizing logic based on Texas conditions
  const tonsNeeded = Math.min(5, Math.max(2, Math.round((sqFootage / 550) * 2) / 2));

  // Base pricing matrix
  let basePrice = 4800 + tonsNeeded * 750;

  if (systemType === 'heatpump') basePrice += 600;
  if (systemType === 'ac-gas') basePrice += 800;
  if (systemType === 'minisplit') basePrice += 1200;

  if (efficiencyTier === 'high') basePrice += 1400;
  if (efficiencyTier === 'ultra') basePrice += 2800;

  if (stories === 'two') basePrice += 450;
  if (includeDuctwork) basePrice += 2400;

  // Rebates & Incentives
  let austinEnergyRebate = 0;
  let federalTaxCredit = 0;

  if (efficiencyTier === 'high') {
    austinEnergyRebate = 650;
    federalTaxCredit = systemType === 'heatpump' ? 1200 : 600;
  } else if (efficiencyTier === 'ultra') {
    austinEnergyRebate = 1100;
    federalTaxCredit = systemType === 'heatpump' ? 2000 : 800;
  }

  const totalIncentives = austinEnergyRebate + federalTaxCredit;
  const netEstimatedPrice = Math.max(3500, basePrice - totalIncentives);
  const monthlyFinanceEstimate = Math.round((netEstimatedPrice / 84) * 1.08);
  const estimatedAnnualEnergySavings = efficiencyTier === 'ultra' ? 520 : efficiencyTier === 'high' ? 340 : 180;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              Austin HVAC Replacement Pricing Engine
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Interactive System Cost & Rebate Calculator
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Get an accurate estimate for complete equipment, professional installation, TDLR mechanical permits,
              and local Austin Energy & Federal tax rebates.
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400">Austin Energy Partner</span>
            <div className="text-sm font-bold text-emerald-400">Rebates Up To $3,100+</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Inputs Column (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          {/* Square Footage Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={sqFootageId} className="text-sm font-bold text-slate-900">Home Square Footage</label>
              <span className="text-sm font-bold text-sky-600 font-mono bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100 tabular-nums">
                {sqFootage.toLocaleString()} Sq. Ft. (~{tonsNeeded} Tons)
              </span>
            </div>
            <input
              id={sqFootageId}
              type="range"
              min="800"
              max="4500"
              step="50"
              value={sqFootage}
              onChange={(e) => setSqFootage(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
              <span>800 sq ft</span>
              <span>2,000 sq ft</span>
              <span>3,200 sq ft</span>
              <span>4,500 sq ft</span>
            </div>
          </div>

          {/* System Type Selector */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Primary Equipment Configuration</label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { id: 'heatpump', name: 'Inverter Heat Pump', note: 'All-Electric (Cool & Heat)' },
                { id: 'ac-gas', name: 'AC + Gas Furnace', note: 'Dual-Fuel Gas Heating' },
                { id: 'ac-electric', name: 'AC + Electric Air Handler', note: 'Standard Central Split' },
                { id: 'minisplit', name: 'Ductless Multi-Zone', note: 'Room-by-Room Control' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSystemType(item.id as any)}
                  className={`p-3 text-left rounded-xl border text-xs sm:text-sm transition-all ${
                    systemType === item.id
                      ? 'border-sky-500 bg-sky-50/70 text-slate-900 ring-2 ring-sky-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold">{item.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Efficiency Tier */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">SEER2 Efficiency & Technology Tier</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'standard',
                  title: 'Standard',
                  seer: '14.3 - 15.2 SEER2',
                  desc: 'Single-stage reliable base cooling'
                },
                {
                  id: 'high',
                  title: 'High-Efficiency',
                  seer: '16.0 - 18.0 SEER2',
                  desc: 'Two-stage compressor + rebate eligible'
                },
                {
                  id: 'ultra',
                  title: 'Ultra-Inverter',
                  seer: '19.0 - 22.5+ SEER2',
                  desc: 'Variable speed whisper quiet + max rebates'
                }
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setEfficiencyTier(tier.id as any)}
                  className={`p-3.5 text-left rounded-xl border transition-all ${
                    efficiencyTier === tier.id
                      ? 'border-sky-600 bg-sky-50 text-slate-900 ring-2 ring-sky-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{tier.title}</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">{tier.seer}</div>
                  <div className="text-xs text-slate-500 mt-1">{tier.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <span className="block text-xs font-bold text-slate-700 mb-1.5">Home Architecture</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStories('single')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border ${
                    stories === 'single' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  Single Story
                </button>
                <button
                  type="button"
                  onClick={() => setStories('two')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border ${
                    stories === 'two' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  Two Stories / Zoned
                </button>
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-700 mb-1.5">Ductwork Status</span>
              <button
                type="button"
                onClick={() => setIncludeDuctwork(!includeDuctwork)}
                className={`w-full py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-between ${
                  includeDuctwork ? 'bg-sky-50 text-sky-900 border-sky-300' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <span>Full Duct Replacement / Sealing</span>
                <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${includeDuctwork ? 'bg-sky-600 text-white' : 'border border-slate-300'}`}>
                  {includeDuctwork && '✓'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Output & Summary Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50/60 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Estimated Austin Installation Range
            </span>

            {/* Price Box */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500">Estimated Net Investment</span>
                <span className="text-xs font-medium text-emerald-600">After Austin Rebates</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-mono tabular-nums">
                ${netEstimatedPrice.toLocaleString()}
                <span className="text-sm font-normal text-slate-500 ml-1">turnkey</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Flexible Financing:</span>
                <span className="font-bold text-slate-900 font-mono">From ${monthlyFinanceEstimate}/mo (0% APR opt.)</span>
              </div>
            </div>

            {/* Savings & Rebates Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span className="text-slate-600">Gross Turnkey Installation:</span>
                <span className="font-semibold text-slate-900 font-mono">${basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200 text-emerald-700 font-medium">
                <span>Austin Energy Utility Rebate:</span>
                <span className="font-mono">-${austinEnergyRebate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200 text-emerald-700 font-medium">
                <span>Federal 25C Clean Energy Tax Credit:</span>
                <span className="font-mono">-${federalTaxCredit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200 text-sky-700 font-medium">
                <span>Est. Annual Austin Electric Bill Savings:</span>
                <span className="font-mono">~${estimatedAnnualEnergySavings}/yr</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="font-bold text-slate-900 mb-1">All Turnkey Estimates Include:</div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Certified ACCA Manual J load calculation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>New pad, hurricane strapping, & safety float switches</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>City of Austin / County permits & inspections</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>10-Year parts warranty + 2-year workmanship</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Lock In Quote & Schedule In-Home Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>No-obligation in-person inspection. Zero sales pressure.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
