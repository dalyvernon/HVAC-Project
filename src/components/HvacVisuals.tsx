import React from 'react';

// Modern Realistic Outdoor AC Condenser Unit Graphic
export function AcCondenserVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-6 text-white ${className}`}>
      {/* Background technical grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      
      {/* Ambient Cool Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">Austin Load: Active Dual Inverter</span>
          </div>
          <span className="text-xs text-sky-400 font-mono">SEER2 20.5 · R-454B</span>
        </div>

        {/* HVAC Unit Schematic Rendering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="relative flex justify-center py-2">
            {/* Outdoor Condenser Housing Drawing */}
            <svg viewBox="0 0 280 220" className="w-full max-w-[260px] h-auto drop-shadow-2xl">
              {/* Unit Base & Feet */}
              <rect x="25" y="195" width="230" height="12" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              <rect x="40" y="207" width="28" height="6" rx="2" fill="#0f172a" />
              <rect x="212" y="207" width="28" height="6" rx="2" fill="#0f172a" />

              {/* Main Outer Cabinet */}
              <rect x="35" y="45" width="210" height="150" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.4" />
              
              {/* Coil Protective Louver Grille */}
              <g stroke="#334155" strokeWidth="1.5" opacity="0.8">
                <line x1="45" y1="60" x2="235" y2="60" />
                <line x1="45" y1="75" x2="235" y2="75" />
                <line x1="45" y1="90" x2="235" y2="90" />
                <line x1="45" y1="105" x2="235" y2="105" />
                <line x1="45" y1="120" x2="235" y2="120" />
                <line x1="45" y1="135" x2="235" y2="135" />
                <line x1="45" y1="150" x2="235" y2="150" />
                <line x1="45" y1="165" x2="235" y2="165" />
                <line x1="45" y1="180" x2="235" y2="180" />
              </g>

              {/* Copper Piping & Service Valve Compartment */}
              <rect x="180" y="55" width="55" height="130" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <circle cx="207" cy="80" r="10" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="207" y="83" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">HIGH</text>
              <circle cx="207" cy="115" r="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="207" y="118" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">LOW</text>
              <path d="M 207 130 L 207 175 L 255 175" fill="none" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
              <path d="M 195 145 L 195 165 L 255 165" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />

              {/* Top Fan Discharge Grille & Fan Blades */}
              <ellipse cx="110" cy="50" rx="55" ry="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="110" cy="50" r="8" fill="#38bdf8" />
              <path d="M 110 50 Q 80 40 70 52" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
              <path d="M 110 50 Q 140 40 150 52" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
              <path d="M 110 50 Q 100 25 118 20" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />

              {/* Airflow Velocity Vectors */}
              <g stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" opacity="0.7">
                <line x1="80" y1="28" x2="80" y2="8" />
                <line x1="110" y1="20" x2="110" y2="2" />
                <line x1="140" y1="28" x2="140" y2="8" />
              </g>

              {/* Brand Plate */}
              <rect x="52" y="70" width="70" height="20" rx="3" fill="#0369a1" />
              <text x="87" y="84" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">HVAC EXPRESS</text>
            </svg>
          </div>

          {/* Real-time Diagnostics readout panel */}
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Indoor Temp Return</span>
              <span className="font-mono text-slate-200 font-semibold">74.2°F</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Supply Air Vent</span>
              <span className="font-mono text-sky-400 font-semibold">54.8°F (ΔT 19.4°)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Austin Outdoor Ambient</span>
              <span className="font-mono text-amber-400 font-semibold">99.0°F</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Compressor Subcooling</span>
              <span className="font-mono text-emerald-400 font-semibold">10.2°F (Optimal)</span>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Diagnostic Status</span>
                <span className="text-emerald-400 font-medium">100% Operational Efficiency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Smart Digital Thermostat UI Graphic
export function SmartThermostatCard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-xl ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Comfort Zone Control</span>
        </div>
        <span className="text-xs text-sky-400 font-mono">Austin, TX · 78728</span>
      </div>

      <div className="flex flex-col items-center py-4">
        {/* Thermostat Round Dial Display */}
        <div className="relative w-48 h-48 rounded-full border-4 border-slate-800 bg-slate-950 flex flex-col items-center justify-center shadow-inner shadow-black">
          {/* Subtle cyan ring glow */}
          <div className="absolute inset-0 rounded-full border-2 border-sky-500/40" />
          
          <span className="text-xs text-sky-400 uppercase tracking-widest font-semibold mb-1">Cooling To</span>
          <div className="flex items-start">
            <span className="text-5xl font-extrabold text-white tracking-tight tabular-nums">72</span>
            <span className="text-xl text-sky-400 font-semibold ml-0.5">°F</span>
          </div>
          <span className="text-xs text-slate-400 mt-2 font-medium">Set at 72° · Holding</span>
        </div>

        {/* Ambient & Humidity metrics below */}
        <div className="grid grid-cols-3 gap-3 w-full mt-6 text-center">
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[11px] text-slate-400">Outdoor</div>
            <div className="text-sm font-bold text-amber-400 mt-0.5 tabular-nums">98°F</div>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[11px] text-slate-400">Indoor Humidity</div>
            <div className="text-sm font-bold text-sky-400 mt-0.5 tabular-nums">46%</div>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[11px] text-slate-400">Air Purity</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">Optimal</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Greater Austin Service Map & Radius Vector
export function AustinServiceMap({ className = '' }: { className?: string }) {
  return (
    <div className={`relative rounded-xl bg-slate-900 border border-slate-800 p-6 text-white overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h4 className="text-sm font-bold text-white">Central Texas Dispatch Territory</h4>
          <p className="text-xs text-slate-400 mt-0.5">Dispatched from 13900 N IH 35, Austin TX 78728</p>
        </div>
        <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
          ● 6 Units Active
        </span>
      </div>

      <div className="relative h-64 bg-slate-950 rounded-lg border border-slate-800/80 overflow-hidden flex items-center justify-center">
        {/* Map grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />

        <svg viewBox="0 0 400 240" className="w-full h-full">
          {/* Service radius pulse */}
          <circle cx="200" cy="95" r="85" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
          <circle cx="200" cy="95" r="55" fill="#0284c7" fillOpacity="0.06" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />

          {/* Highway IH-35 Corridor Arterial Line */}
          <path d="M 170 10 L 190 60 L 200 95 L 210 145 L 218 230" fill="none" stroke="#475569" strokeWidth="4" />
          <path d="M 170 10 L 190 60 L 200 95 L 210 145 L 218 230" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" />

          {/* Loop 1 / MoPac */}
          <path d="M 130 30 L 155 90 L 170 160 L 175 220" fill="none" stroke="#334155" strokeWidth="2.5" />

          {/* SH-45 Toll Highway */}
          <path d="M 50 80 Q 200 70 350 85" fill="none" stroke="#334155" strokeWidth="2.5" />

          {/* US-183 Highway */}
          <path d="M 70 40 L 170 115 L 310 180" fill="none" stroke="#334155" strokeWidth="2" />

          {/* Highway labels */}
          <text x="216" y="30" fill="#94a3b8" fontSize="8" fontWeight="bold">IH-35</text>
          <text x="80" y="74" fill="#94a3b8" fontSize="8">SH-45</text>
          <text x="125" y="130" fill="#94a3b8" fontSize="8">MoPac</text>

          {/* Hub: 13900 N IH-35 Suite H1 */}
          <g>
            <circle cx="200" cy="95" r="9" fill="#0284c7" />
            <circle cx="200" cy="95" r="4" fill="#ffffff" />
            <rect x="212" y="88" width="135" height="18" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <text x="216" y="100" fill="#38bdf8" fontSize="8.5" fontWeight="bold">HVAC EXPRESS HQ (IH-35)</text>
          </g>

          {/* Service Nodes */}
          {/* Round Rock */}
          <circle cx="225" cy="50" r="4" fill="#38bdf8" />
          <text x="233" y="53" fill="#cbd5e1" fontSize="9" fontWeight="semibold">Round Rock</text>

          {/* Pflugerville */}
          <circle cx="270" cy="85" r="4" fill="#38bdf8" />
          <text x="278" y="88" fill="#cbd5e1" fontSize="9" fontWeight="semibold">Pflugerville</text>

          {/* Cedar Park */}
          <circle cx="110" cy="65" r="4" fill="#38bdf8" />
          <text x="70" y="62" fill="#cbd5e1" fontSize="9" fontWeight="semibold">Cedar Park</text>

          {/* North Austin / Domain */}
          <circle cx="180" cy="135" r="4" fill="#38bdf8" />
          <text x="120" y="140" fill="#cbd5e1" fontSize="9" fontWeight="semibold">The Domain</text>

          {/* Mueller */}
          <circle cx="220" cy="165" r="4" fill="#38bdf8" />
          <text x="228" y="168" fill="#cbd5e1" fontSize="9" fontWeight="semibold">Mueller</text>

          {/* Georgetown */}
          <circle cx="195" cy="22" r="3.5" fill="#38bdf8" />
          <text x="204" y="25" fill="#cbd5e1" fontSize="9" fontWeight="semibold">Georgetown</text>
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-xs text-slate-300">
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>North Austin & Domain</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>Round Rock & Hutto</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>Pflugerville & Wells Branch</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded border border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>Cedar Park & Leander</span>
        </div>
      </div>
    </div>
  );
}

// 21-Point Inspection Checklist Graphic
export function InspectionChecklistGraphic() {
  const points = [
    'Outdoor Condenser Coil Flush & Debris Clear',
    'Dual-Run Capacitor MFD Capacitance Tolerances',
    'Compressor Starting Amperage & Running Amps',
    'Contactor Contact Points Arc & Pitting Inspection',
    'Condensate Primary Drain Vacuum & Pan Flush',
    'Secondary Emergency Overflow Float Switch Test',
    'Fieldpiece Refrigerant Subcool / Superheat Check',
    'Blower Motor Amperage Draw & Wheel Balance',
    'Evaporator Coil Visual Inspection for Bio-Film',
    'Thermostat Heat/Cool Calibration Accuracy',
    'Supply & Return Duct Static Pressure Differential',
    'High-Voltage Lugs & Wiring Disconnect Safety'
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-amber-400">Factory Protocol</span>
          <h4 className="text-base font-bold text-white">21-Point Precision HVAC Checklist</h4>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2 py-1 rounded">
          NATE Certified Standard
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        {points.map((pt, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded bg-slate-950/60 border border-slate-800/80">
            <span className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px] shrink-0">
              ✓
            </span>
            <span className="text-slate-300 truncate">{pt}</span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-400 mt-4 text-center">
        Plus 9 additional diagnostic safety tests including carbon monoxide, gas valve pressure, and heat strip sequencing.
      </p>
    </div>
  );
}
