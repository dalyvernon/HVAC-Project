import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  ChevronUp,
  ChevronDown,
  Wind,
  Droplets,
  Sun,
  Flame,
  Snowflake,
  ShieldCheck
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/hvacData';

export function ThreeDThermostat({ className = '' }: { className?: string }) {
  const [targetTemp, setTargetTemp] = useState<number>(72);
  const [mode, setMode] = useState<'cool' | 'heat' | 'eco'>('cool');
  const [fanSpeed, setFanSpeed] = useState<'auto' | 'high' | 'quiet'>('auto');
  const mountRef = useRef<HTMLDivElement>(null);
  const dialMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 240;
    const height = container.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Subtle 3D Ring Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const light = new THREE.PointLight(mode === 'cool' ? 0x38bdf8 : 0xf97316, 3, 10);
    light.position.set(2, 2, 3);
    scene.add(light);

    // 3D Outer Bezel Ring
    const torusGeo = new THREE.TorusGeometry(1.2, 0.12, 16, 64);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.2
    });
    const bezel = new THREE.Mesh(torusGeo, torusMat);
    scene.add(bezel);

    // Dial tick marks ring
    const dialRingGeo = new THREE.RingGeometry(0.95, 1.15, 48);
    const dialRingMat = new THREE.MeshBasicMaterial({
      color: mode === 'cool' ? 0x0284c7 : 0xea580c,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    });
    const dialRing = new THREE.Mesh(dialRingGeo, dialRingMat);
    scene.add(dialRing);
    dialMeshRef.current = dialRing;

    // Inner Glass Display Disc
    const discGeo = new THREE.CircleGeometry(0.95, 32);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      metalness: 0.95,
      roughness: 0.1
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.z = -0.05;
    scene.add(disc);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (dialMeshRef.current) {
        dialMeshRef.current.rotation.z += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [mode]);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-2xl text-white ${className}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
            3D Smart Climate Controller
          </span>
          <h4 className="text-sm font-bold text-white">Austin Zone 1 · Central</h4>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
          Optimal SEER2
        </span>
      </div>

      {/* 3D Ring Display with Center Overlaid Typography */}
      <div className="relative flex items-center justify-center my-2">
        <div ref={mountRef} className="w-56 h-56" />

        {/* Floating Centered Numbers */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
            {mode === 'cool' ? 'Cooling Target' : mode === 'heat' ? 'Heating Target' : 'Eco Hold'}
          </span>
          <div className="flex items-start">
            <span className="text-5xl font-black font-mono tracking-tight text-white tabular-nums">
              {targetTemp}
            </span>
            <span className={`text-xl font-bold ml-1 ${mode === 'cool' ? 'text-sky-400' : 'text-amber-500'}`}>
              °F
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 font-medium">
            Austin Outdoor: <strong className="text-amber-400">98°F</strong>
          </span>
        </div>

        {/* Temperature Up/Down Adjusters */}
        <div className="absolute right-2 flex flex-col gap-2">
          <button
            onClick={() => setTargetTemp((t) => Math.min(85, t + 1))}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-transform active:scale-95 shadow-md border border-slate-700"
            aria-label="Increase temperature"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => setTargetTemp((t) => Math.max(62, t - 1))}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-transform active:scale-95 shadow-md border border-slate-700"
            aria-label="Decrease temperature"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mode Controls */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800">
        <button
          onClick={() => setMode('cool')}
          className={`py-2 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mode === 'cool'
              ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Snowflake className="w-3.5 h-3.5" />
          <span>Cool</span>
        </button>

        <button
          onClick={() => setMode('heat')}
          className={`py-2 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mode === 'heat'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Heat</span>
        </button>

        <button
          onClick={() => setMode('eco')}
          className={`py-2 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            mode === 'eco'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Eco</span>
        </button>
      </div>

      {/* Atmospheric Indoor Readouts */}
      <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
        <div className="p-2 bg-slate-950/80 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Relative Humidity</span>
          <span className="font-bold text-sky-400 font-mono">46% Optimal</span>
        </div>
        <div className="p-2 bg-slate-950/80 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Fan State</span>
          <span className="font-bold text-slate-200">Continuous Auto</span>
        </div>
        <div className="p-2 bg-slate-950/80 rounded-lg border border-slate-800">
          <span className="text-[10px] text-slate-400 block">Austin Rebate</span>
          <span className="font-bold text-emerald-400">Enrolled</span>
        </div>
      </div>
    </div>
  );
}
