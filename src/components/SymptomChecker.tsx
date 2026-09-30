import React, { useState } from 'react';
import { AlertCircle, Wrench, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/hvacData';

interface SymptomCheckerProps {
  onOpenBooking: () => void;
}

interface SymptomOption {
  id: string;
  title: string;
  badge: 'Critical' | 'Urgent' | 'Moderate' | 'Maintenance';
  summary: string;
  immediateAction: string;
  likelyCause: string;
  riskIfIgnored: string;
}

const SYMPTOMS: SymptomOption[] = [
  {
    id: 'warm-air',
    title: 'AC blowing warm or room-temperature air',
    badge: 'Critical',
    summary: 'The indoor fan is running, but air exiting vents feels warm or lukewarm during summer.',
    immediateAction: 'Turn the thermostat cooling mode to OFF immediately. Leave fan on AUTO.',
    likelyCause: 'Faulty outdoor dual-run capacitor, tripped breaker, or refrigerant pressure loss due to a coil leak.',
    riskIfIgnored: 'Compressor continues trying to start while overheated, risking catastrophic burnout ($2,000+ replacement).'
  },
  {
    id: 'frozen-coil',
    title: 'Ice or frost forming on outdoor brass line or indoor coil',
    badge: 'Critical',
    summary: 'White frost or thick ice coating copper suction lines or air handler cabinet in the attic.',
    immediateAction: 'Switch thermostat to OFF. Turn FAN to ON to begin gentle defrosting. Do not chip ice with tools.',
    likelyCause: 'Severe airflow restriction (dirty air filter, collapsed return) or low refrigerant charge.',
    riskIfIgnored: 'Liquid slugging into the compressor, which destroys valves; melting ice may overflow and ruin ceilings.'
  },
  {
    id: 'strange-noise',
    title: 'Squealing, buzzing, or metallic grinding sound',
    badge: 'Urgent',
    summary: 'Audible loud screeching on startup or continuous metal chatter coming from the condenser or attic.',
    immediateAction: 'Shut system off at thermostat or service disconnect switch.',
    likelyCause: 'Failing condenser fan motor bearing, loose blower wheel, or failing contactor relay coil.',
    riskIfIgnored: 'Motor seizure, burned electrical wiring, or thrown fan blade damaging the condenser coil.'
  },
  {
    id: 'water-leak',
    title: 'Water leaking around indoor unit or in drain pan',
    badge: 'Urgent',
    summary: 'Water standing in emergency pan beneath attic unit or dripping from exterior emergency PVC drain pipe.',
    immediateAction: 'Turn system OFF to stop moisture accumulation. Clear any standing water with towels.',
    likelyCause: 'Algae clog in primary 3/4" condensate drain line or cracked primary drain pan.',
    riskIfIgnored: 'Water ceiling collapse, drywall rot, and hazardous mold growth inside sheetrock.'
  },
  {
    id: 'thermostat-blank',
    title: 'Thermostat screen is completely blank / no response',
    badge: 'Moderate',
    summary: 'Digital thermostat is unresponsive and system refuses to cycle on.',
    immediateAction: 'Check batteries in thermostat faceplate; verify main breaker panel has not tripped.',
    likelyCause: 'Tripped condensate float safety switch, blown 3-amp low-voltage fuse on control board, or tripped breaker.',
    riskIfIgnored: 'No cooling or heating until circuit is safely reset and float switch is cleared.'
  },
  {
    id: 'weak-airflow',
    title: 'Weak airflow from supply registers / hot rooms',
    badge: 'Maintenance',
    summary: 'Air is cool, but barely pushes through vents in certain bedrooms or upstairs areas.',
    likelyCause: 'Ductwork disconnection in attic, closed balancing damper, or heavily compacted MERV filter.',
    immediateAction: 'Replace air filter if older than 30 days. Verify supply registers are opened.',
    riskIfIgnored: 'High static pressure strains blower motor, causing premature failure and 20% higher electric bills.'
  }
];

export function SymptomChecker({ onOpenBooking }: SymptomCheckerProps) {
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomOption>(SYMPTOMS[0]);

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Wrench className="w-3.5 h-3.5" />
            Interactive Austin HVAC Triage
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Diagnose Your AC or Heating Symptoms
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Select your symptom below to get immediate triage steps and prevent costly component damage.
          </p>
        </div>

        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="text-xs font-bold text-sky-400 hover:text-white bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          24/7 Tech Support: {BUSINESS_INFO.phone}
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Symptom selector list (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {SYMPTOMS.map((sym) => {
            const isSelected = selectedSymptom.id === sym.id;
            return (
              <button
                key={sym.id}
                onClick={() => setSelectedSymptom(sym)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm ${
                  isSelected
                    ? 'bg-slate-800 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-200">{sym.title}</span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded shrink-0 ${
                      sym.badge === 'Critical'
                        ? 'bg-red-950/80 text-red-400 border border-red-800/60'
                        : sym.badge === 'Urgent'
                        ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60'
                        : 'bg-sky-950/80 text-sky-400 border border-sky-800/60'
                    }`}
                  >
                    {sym.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Diagnosis & Action Advice Panel (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs uppercase font-bold text-sky-400">Diagnosis Overview</span>
              <h4 className="text-lg font-bold text-white mt-0.5">{selectedSymptom.title}</h4>
            </div>
            <span
              className={`text-xs uppercase font-bold px-2.5 py-1 rounded ${
                selectedSymptom.badge === 'Critical'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}
            >
              {selectedSymptom.badge} Priority
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Immediate Safety Action:</span>
              </div>
              <p className="text-slate-300 pl-5">{selectedSymptom.immediateAction}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-xs font-semibold">Most Common Technical Cause:</span>
                <p className="text-slate-200 mt-1">{selectedSymptom.likelyCause}</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-xs font-semibold">Risk If Left Unaddressed:</span>
                <p className="text-slate-200 mt-1">{selectedSymptom.riskIfIgnored}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <div className="text-xs text-slate-400">
              Austin Diagnostic Dispatch: <span className="font-semibold text-white">$89 Flat Fee</span>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Dispatch a Technician Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
