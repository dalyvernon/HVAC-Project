import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Wind,
  ShieldCheck,
  Zap,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Gauge
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/hvacData';

export function ThreeDAirflowSimulator() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cfmSpeed, setCfmSpeed] = useState<'low' | 'med' | 'high' | 'turbo'>('high');
  const [uvActive, setUvActive] = useState(true);
  const [mervActive, setMervActive] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [staticPressure, setStaticPressure] = useState('0.42');
  const [purityRate, setPurityRate] = useState('99.9%');

  const speedMultiplier = cfmSpeed === 'low' ? 0.6 : cfmSpeed === 'med' ? 1.0 : cfmSpeed === 'high' ? 1.6 : 2.4;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.06);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const uvPointLight = new THREE.PointLight(0xa855f7, uvActive ? 3.5 : 0.2, 8);
    uvPointLight.position.set(0, 0, 0);
    scene.add(uvPointLight);

    const cleanPointLight = new THREE.PointLight(0x38bdf8, 2.5, 8);
    cleanPointLight.position.set(2.5, 0, 0);
    scene.add(cleanPointLight);

    const dirtyPointLight = new THREE.PointLight(0xf59e0b, 1.8, 8);
    dirtyPointLight.position.set(-2.5, 0, 0);
    scene.add(dirtyPointLight);

    const simRoot = new THREE.Group();
    scene.add(simRoot);

    // 1. DUCTWORK CASING (Glass transparent inspection tunnel)
    const tunnelGeo = new THREE.BoxGeometry(6.4, 2.0, 2.0);
    const tunnelMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.18,
      wireframe: false
    });
    const tunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    simRoot.add(tunnel);

    // Tunnel outer metal structural flanges
    const flangeMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.3 });
    [-3.2, -1.0, 1.0, 3.2].forEach((fx) => {
      const flangeGeo = new THREE.BoxGeometry(0.12, 2.15, 2.15);
      const flange = new THREE.Mesh(flangeGeo, flangeMat);
      flange.position.x = fx;
      simRoot.add(flange);
    });

    // 2. STAGE 1: MERV 16 MECHANICAL FILTER MATRIX (-1.0 x)
    const filterGeo = new THREE.BoxGeometry(0.14, 1.9, 1.9);
    const filterMat = new THREE.MeshStandardMaterial({
      color: mervActive ? 0x0284c7 : 0x475569,
      metalness: 0.5,
      roughness: 0.5,
      transparent: true,
      opacity: 0.7
    });
    const filterMesh = new THREE.Mesh(filterGeo, filterMat);
    filterMesh.position.x = -1.0;
    simRoot.add(filterMesh);

    // Filter pleats grid lines
    const pleatMat = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.4, transparent: true });
    for (let p = -0.9; p <= 0.9; p += 0.15) {
      const pleatGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.0, p, -0.95),
        new THREE.Vector3(-1.0, p, 0.95)
      ]);
      const pleatLine = new THREE.Line(pleatGeo, pleatMat);
      simRoot.add(pleatLine);
    }

    // 3. STAGE 2: UV-C GERMICIDAL QUARTZ LAMPS (0.0 x)
    const uvBulbGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 16);
    const uvBulbMat = new THREE.MeshBasicMaterial({
      color: uvActive ? 0xc084fc : 0x334155
    });
    const uvBulb1 = new THREE.Mesh(uvBulbGeo, uvBulbMat);
    uvBulb1.position.set(0, 0, -0.45);
    simRoot.add(uvBulb1);

    const uvBulb2 = new THREE.Mesh(uvBulbGeo, uvBulbMat);
    uvBulb2.position.set(0, 0, 0.45);
    simRoot.add(uvBulb2);

    // 4. KINETIC PARTICLE SIMULATION (DIRTY INCOMING VS CLEAN OUTGOING)
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    const particleStates = new Uint8Array(particleCount); // 0: Dirty pollen, 1: Purified cyan

    for (let i = 0; i < particleCount; i++) {
      const x = -3.2 + Math.random() * 6.4;
      const y = (Math.random() - 0.5) * 1.7;
      const z = (Math.random() - 0.5) * 1.7;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleSpeeds[i] = 0.035 + Math.random() * 0.025;

      // Color based on position (x < -1.0 is dirty, x > 0.0 is clean)
      if (x < -1.0) {
        particleColors[i * 3] = 0.96; // Amber Red
        particleColors[i * 3 + 1] = 0.62;
        particleColors[i * 3 + 2] = 0.1;
        particleStates[i] = 0;
      } else {
        particleColors[i * 3] = 0.22; // Sky Cyan
        particleColors[i * 3 + 1] = 0.74;
        particleColors[i * 3 + 2] = 0.97;
        particleStates[i] = 1;
      }
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.11,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    simRoot.add(particles);

    // 5. MOUSE ROTATION DRAG
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0.35;
    let targetRotX = 0.15;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      targetRotY += dx * 0.008;
      targetRotX = Math.max(-0.35, Math.min(0.4, targetRotX + dy * 0.006));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 6. ANIMATION LOOP
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isPlaying) {
        simRoot.rotation.y += (targetRotY - simRoot.rotation.y) * 0.08;
        simRoot.rotation.x += (targetRotX - simRoot.rotation.x) * 0.08;

        // Particle kinetic translation
        const pos = particleGeo.attributes.position.array as Float32Array;
        const col = particleGeo.attributes.color.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          pos[i * 3] += particleSpeeds[i] * speedMultiplier;

          // Gentle flow turbulence
          pos[i * 3 + 1] += (Math.random() - 0.5) * 0.006;
          pos[i * 3 + 2] += (Math.random() - 0.5) * 0.006;

          // Transition color as it passes filter (-1.0) and UV (0.0)
          if (pos[i * 3] > -1.0 && particleStates[i] === 0) {
            particleStates[i] = 1;
            col[i * 3] = 0.22;
            col[i * 3 + 1] = 0.74;
            col[i * 3 + 2] = 0.97;
          }

          // Loop back from right to left
          if (pos[i * 3] > 3.1) {
            pos[i * 3] = -3.1;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 1.7;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 1.7;

            // Reset to dirty particle
            particleStates[i] = 0;
            col[i * 3] = 0.96;
            col[i * 3 + 1] = 0.62;
            col[i * 3 + 2] = 0.1;
          }
        }

        particleGeo.attributes.position.needsUpdate = true;
        particleGeo.attributes.color.needsUpdate = true;
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
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [cfmSpeed, uvActive, mervActive, isPlaying, speedMultiplier]);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 text-white overflow-hidden shadow-2xl relative">
      {/* Top Header */}
      <div className="p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            3D Kinetic Motion Simulation
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Whole-Home Air Purification & Duct Flow Dynamics
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Simulate how Austin cedar pollen, allergens, and airborne particulates are captured by 
            MERV 16 micro-mesh and sterilized by germicidal UV-C plasma lamps in real-time.
          </p>
        </div>

        {/* Real-Time CFM & Purity Metrics HUD */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0 grid grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">CFM Velocity</span>
            <span className="text-base font-black text-sky-400 font-mono">
              {cfmSpeed === 'low' ? '650' : cfmSpeed === 'med' ? '950' : cfmSpeed === 'high' ? '1,350' : '1,800'}
            </span>
          </div>
          <div className="border-x border-slate-800 px-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Micro-Filtration</span>
            <span className="text-base font-black text-emerald-400 font-mono">99.97%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Static Pressure</span>
            <span className="text-base font-black text-white font-mono">0.42" w.g.</span>
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative">
        <div ref={mountRef} className="w-full h-80 sm:h-96 cursor-grab active:cursor-grabbing" />

        {/* In-Canvas Flow Markers */}
        <div className="absolute top-4 left-6 pointer-events-none flex items-center gap-2 text-xs text-amber-400 font-bold bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Stage 1: Austin Cedar Pollen Intake</span>
        </div>

        <div className="absolute top-4 right-6 pointer-events-none flex items-center gap-2 text-xs text-sky-400 font-bold bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>Stage 3: Purified Conditioned Air Delivery</span>
        </div>
      </div>

      {/* Interactive Controls Bar Layered Below */}
      <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* CFM Speed Controls */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-sky-400" />
            Blower CFM:
          </span>
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
            {(['low', 'med', 'high', 'turbo'] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => setCfmSpeed(spd)}
                className={`px-3 py-1 font-bold uppercase rounded-md transition-colors ${
                  cfmSpeed === spd
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Toggles: MERV 16 & UV-C */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUvActive(!uvActive)}
            className={`px-3 py-1.5 rounded-lg font-bold border transition-all flex items-center gap-1.5 ${
              uvActive
                ? 'bg-purple-950 text-purple-300 border-purple-700 shadow-sm'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>UV-C Sterilization: {uvActive ? 'ACTIVE' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300"
            title="Play / Pause Simulation"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-sky-400" />}
          </button>
        </div>
      </div>
    </div>
  );
}
