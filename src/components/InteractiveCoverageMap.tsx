import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  Navigation,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/hvacData';

interface CoverageZone {
  id: string;
  name: string;
  counties: string;
  center: { x: number; y: number };
  svgPath: string;
  highlightColor: string;
  responseWindow: string;
  activeTechs: number;
  zipCodes: string[];
  landmarks: string[];
  hvacClimateChallenge: string;
  residentialFocus: string;
}

const COVERAGE_ZONES: CoverageZone[] = [
  {
    id: 'round-rock',
    name: 'Round Rock',
    counties: 'Williamson County',
    center: { x: 230, y: 55 },
    svgPath: 'M 195 30 L 265 30 L 285 75 L 210 80 Z',
    highlightColor: '#0284c7', // Sky Blue
    responseWindow: '25 – 45 Minutes',
    activeTechs: 2,
    zipCodes: ['78664', '78665', '78681'],
    landmarks: ['Dell Diamond', 'Kallison Ranch', 'Round Rock Outlets', 'Chisholm Trail'],
    hvacClimateChallenge: 'Limestone dust and high mineral content causing rapid condenser fin fouling and outdoor fan motor friction.',
    residentialFocus: 'Two-story residential zoning, high-efficiency dual inverter upgrades, and seasonal heat pump tune-ups.'
  },
  {
    id: 'pflugerville',
    name: 'Pflugerville',
    counties: 'Travis & Williamson Counties',
    center: { x: 275, y: 100 },
    svgPath: 'M 235 75 L 325 80 L 320 145 L 230 135 Z',
    highlightColor: '#0ea5e9', // Vibrant Sky
    responseWindow: '20 – 35 Minutes',
    activeTechs: 2,
    zipCodes: ['78660', '78691'],
    landmarks: ['Stone Hill Town Center', 'Lake Pflugerville', 'Falcon Pointe', 'Highland Park'],
    hvacClimateChallenge: 'Expansive blackland prairie clay soil leading to shifting equipment pads and strained copper refrigerant lines.',
    residentialFocus: 'Secondary drain pan float switch installations, flexible copper vibration loops, and Austin Energy rebate systems.'
  },
  {
    id: 'cedar-park',
    name: 'Cedar Park',
    counties: 'Williamson County',
    center: { x: 105, y: 70 },
    svgPath: 'M 60 45 L 155 45 L 145 110 L 55 100 Z',
    highlightColor: '#38bdf8', // Light Cyan
    responseWindow: '30 – 45 Minutes',
    activeTechs: 2,
    zipCodes: ['78613', '78630'],
    landmarks: ['HEB Center', 'Lakeline Corridor', 'Cypress Creek', 'Twin Lakes'],
    hvacClimateChallenge: 'Hill Country cedar pollen infiltration requiring hospital-grade MERV 16 filtration and UV-C germicidal coil protection.',
    residentialFocus: 'Ductless mini-splits for converted garages, high-SEER2 heat pumps, and static air duct balancing.'
  },
  {
    id: 'north-austin',
    name: 'North Austin & The Domain',
    counties: 'Travis County',
    center: { x: 180, y: 135 },
    svgPath: 'M 140 100 L 225 90 L 220 165 L 130 160 Z',
    highlightColor: '#3b82f6', // Electric Cobalt
    responseWindow: '15 – 30 Minutes',
    activeTechs: 3,
    zipCodes: ['78727', '78728', '78758', '78759'],
    landmarks: ['The Domain', 'Q2 Stadium', 'Wells Branch', 'Parmer Tech Corridor'],
    hvacClimateChallenge: 'High thermal heat gain in mid-century homes and commercial technology server rooms requiring continuous 24/7 cooling.',
    residentialFocus: 'Home base territory! Rapid under-30-min emergency diagnostic dispatch, dual-capacitor replacements, and commercial RTU service.'
  },
  {
    id: 'georgetown',
    name: 'Georgetown & Sun City',
    counties: 'Williamson County',
    center: { x: 215, y: 20 },
    svgPath: 'M 175 10 L 255 10 L 245 45 L 175 40 Z',
    highlightColor: '#06b6d4', // Cyan
    responseWindow: '35 – 50 Minutes',
    activeTechs: 1,
    zipCodes: ['78626', '78628', '78633'],
    landmarks: ['Georgetown Square', 'Sun City Texas', 'Lake Georgetown', 'Wolf Ranch'],
    hvacClimateChallenge: 'Extreme attic summer heat exceeding 145°F, necessitating high-durability blown-in duct insulation and attic fan balancing.',
    residentialFocus: 'Senior comfort zoning, ultra-quiet variable-speed inverter compressors, and seasonal VIP Express maintenance.'
  },
  {
    id: 'central-austin',
    name: 'Central Austin & Mueller',
    counties: 'Travis County',
    center: { x: 195, y: 195 },
    svgPath: 'M 140 165 L 240 160 L 235 230 L 145 230 Z',
    highlightColor: '#6366f1', // Indigo
    responseWindow: '30 – 45 Minutes',
    activeTechs: 2,
    zipCodes: ['78701', '78703', '78704', '78722', '78723'],
    landmarks: ['Mueller Development', 'UT Austin', 'Capitol District', 'South Congress'],
    hvacClimateChallenge: 'Tight urban lot lines and historic architectural restrictions requiring compact, whisper-quiet outdoor condensing footprints.',
    residentialFocus: 'Side-discharge inverter heat pumps, multi-zone ductless mini-splits, and whole-home dehumidification systems.'
  }
];

interface InteractiveCoverageMapProps {
  onOpenBooking: () => void;
}

export function InteractiveCoverageMap({ onOpenBooking }: InteractiveCoverageMapProps) {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('round-rock');
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const activeZone = COVERAGE_ZONES.find((z) => z.id === selectedZoneId) || COVERAGE_ZONES[0];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 text-white overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <Navigation className="w-3.5 h-3.5" />
            Central Texas Service Territory
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Austin-Area Dedicated Coverage Zones
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Click any zone below to inspect local technician response times, serviced zip codes, 
            and specific Central Texas HVAC climate challenges.
          </p>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 shrink-0 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Austin Dispatch Live:</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">12 Service Vans On Duty</span>
        </div>
      </div>

      {/* Zone Selector Button Bar */}
      <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto">
        {COVERAGE_ZONES.map((zone) => {
          const isSelected = selectedZoneId === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZoneId(zone.id)}
              onMouseEnter={() => setHoveredZoneId(zone.id)}
              onMouseLeave={() => setHoveredZoneId(null)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: isSelected ? '#0f172a' : zone.highlightColor }}
              />
              <span>{zone.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Interactive Map Graphic (7 cols) + Zone Details Card (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left Interactive SVG Map (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-slate-950/40">
          <div className="relative h-80 sm:h-96 w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
            {/* Background Map Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:28px_28px] opacity-35" />

            <svg viewBox="0 0 400 260" className="w-full h-full select-none">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 35-Mile Radius Outer Circle */}
              <circle
                cx="195"
                cy="110"
                r="115"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.25"
              />

              {/* ZONE POLYGONS */}
              {COVERAGE_ZONES.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                const isHovered = hoveredZoneId === zone.id;
                return (
                  <path
                    key={zone.id}
                    d={zone.svgPath}
                    onClick={() => setSelectedZoneId(zone.id)}
                    onMouseEnter={() => setHoveredZoneId(zone.id)}
                    onMouseLeave={() => setHoveredZoneId(null)}
                    fill={zone.highlightColor}
                    fillOpacity={isSelected ? 0.35 : isHovered ? 0.22 : 0.08}
                    stroke={zone.highlightColor}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                    className="cursor-pointer transition-all duration-200"
                  />
                );
              })}

              {/* HIGHWAYS / ARTERIAL INFRASTRUCTURE */}
              {/* Interstate 35 (North-South spine) */}
              <path
                d="M 180 5 L 195 50 L 195 110 L 205 160 L 210 255"
                fill="none"
                stroke="#475569"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 180 5 L 195 50 L 195 110 L 205 160 L 210 255"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* SH-45 Toll Highway (East-West across North Austin / Round Rock) */}
              <path
                d="M 50 85 Q 195 70 340 90"
                fill="none"
                stroke="#334155"
                strokeWidth="3.5"
              />

              {/* Loop 1 / MoPac Expressway */}
              <path
                d="M 125 30 L 150 95 L 165 170 L 170 240"
                fill="none"
                stroke="#334155"
                strokeWidth="3"
              />

              {/* US-183 Highway */}
              <path
                d="M 65 35 L 165 115 L 290 190"
                fill="none"
                stroke="#334155"
                strokeWidth="2.5"
              />

              {/* Highway Label Markers */}
              <text x="206" y="25" fill="#cbd5e1" fontSize="8" fontWeight="bold">IH-35</text>
              <text x="80" y="80" fill="#94a3b8" fontSize="7.5">SH-45 Toll</text>
              <text x="120" y="130" fill="#94a3b8" fontSize="7.5">MoPac</text>
              <text x="75" y="48" fill="#94a3b8" fontSize="7.5">US-183</text>

              {/* ZONE NODE MARKERS */}
              {COVERAGE_ZONES.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                return (
                  <g
                    key={`node-${zone.id}`}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={zone.center.x}
                      cy={zone.center.y}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#38bdf8' : zone.highlightColor}
                      filter={isSelected ? 'url(#glow)' : undefined}
                      className="transition-all"
                    />
                    <text
                      x={zone.center.x}
                      y={zone.center.y - 8}
                      fill={isSelected ? '#ffffff' : '#94a3b8'}
                      fontSize={isSelected ? '9' : '8'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      textAnchor="middle"
                      className="pointer-events-none drop-shadow"
                    >
                      {zone.name}
                    </text>
                  </g>
                );
              })}

              {/* CENTRAL DISPATCH HUB: 13900 N IH 35 */}
              <g className="pointer-events-none">
                <circle cx="195" cy="110" r="14" fill="#0284c7" fillOpacity="0.25" className="animate-ping" />
                <circle cx="195" cy="110" r="8" fill="#0284c7" />
                <circle cx="195" cy="110" r="3.5" fill="#ffffff" />
                <rect x="208" y="103" width="138" height="17" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                <text x="212" y="115" fill="#38bdf8" fontSize="8" fontWeight="bold">HVAC EXPRESS HQ (13900 N IH-35)</text>
              </g>
            </svg>
          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-y-2 pt-1 border-t border-slate-800/80">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                <span>Primary Hub: 13900 N IH 35 Suite H1</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-slate-500" />
                <span>Interstate Arterial Corridors</span>
              </span>
            </div>
            <span className="text-slate-500">Interactive: Click any zone on the map</span>
          </div>
        </div>

        {/* Right Zone Inspector Card (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-slate-900/90">
          <div className="space-y-5">
            {/* Zone Identity Title */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-sky-400">
                  Zone Profile · {activeZone.counties}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded">
                  ● {activeZone.activeTechs} Units Routed
                </span>
              </div>
              <h4 className="text-2xl font-black text-white mt-1">
                {activeZone.name}
              </h4>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Avg. Arrival Window</span>
                <span className="text-sm font-bold text-white mt-0.5 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  {activeZone.responseWindow}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Emergency Line</span>
                <span className="text-sm font-bold text-sky-400 mt-0.5 block truncate">
                  (512) 967-1088
                </span>
              </div>
            </div>

            {/* Zip codes serviced */}
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                Serviced Zip Codes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeZone.zipCodes.map((zip) => (
                  <span
                    key={zip}
                    className="font-mono text-xs bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-slate-300"
                  >
                    {zip}
                  </span>
                ))}
              </div>
            </div>

            {/* Local Climate & Technical Challenge */}
            <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Local Climate Factor in {activeZone.name}:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {activeZone.hvacClimateChallenge}
              </p>
            </div>

            {/* Neighborhood Landmarks */}
            <div className="text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-1">Key Neighborhoods & Subdivisions:</span>
              <p className="leading-relaxed">
                {activeZone.landmarks.join(' · ')}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={onOpenBooking}
              className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Schedule Service in {activeZone.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-center text-[11px] text-slate-500">
              Dispatched with GPS tracking from {BUSINESS_INFO.address}.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
