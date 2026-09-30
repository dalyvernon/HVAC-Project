import React, { useEffect, useRef, useState, useId } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Layers,
  ThermometerSnowflake,
  Flame,
  Maximize2,
  Info,
  CheckCircle2,
  Eye,
  Sliders,
  ShieldCheck
} from 'lucide-react';

interface ThreeDSystemViewerProps {
  className?: string;
  initialMode?: 'cooling' | 'heating';
  compact?: boolean;
}

interface Hotspot {
  id: string;
  name: string;
  position: [number, number, number];
  desc: string;
  metric: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'compressor',
    name: 'Twin-Rotary Inverter Compressor',
    position: [0, -0.2, 0],
    desc: 'Variable-speed modulating scroll compressor that adjusts capacity from 25% to 100% for whisper-quiet 52 dB operation.',
    metric: 'Up to 22.5 SEER2 Efficiency'
  },
  {
    id: 'fan',
    name: 'Swept-Wing Aerofoil Fan',
    position: [0, 1.25, 0],
    desc: 'Dynamically balanced ECM motor with counter-curved blades engineered to discharge heat upwards away from patios.',
    metric: '850 RPM High-CFM Airflow'
  },
  {
    id: 'coils',
    name: 'Microchannel Aluminum Coils',
    position: [0.85, 0.4, 0],
    desc: 'High-heat-transfer fin density with anti-corrosive hydrophilic coating engineered for harsh Austin hard water and pollen.',
    metric: '40% Faster Heat Dissipation'
  },
  {
    id: 'valves',
    name: 'Brass Refrigerant Service Valves',
    position: [0.95, -0.7, 0.4],
    desc: 'Low-loss dual-service ports for digital subcooling and superheat monitoring using R-454B low-GWP refrigerant.',
    metric: 'Zero-Emission Nitrogen Purge'
  }
];

export function ThreeDSystemViewer({
  className = '',
  initialMode = 'cooling',
  compact = false
}: ThreeDSystemViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [climateMode, setClimateMode] = useState<'cooling' | 'heating'>(initialMode);
  const [exploded, setExploded] = useState(false);
  const [materialFinish, setMaterialFinish] = useState<'steel' | 'obsidian' | 'titanium'>('steel');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [webglSupported, setWebglSupported] = useState(true);
  const rotationSpeedId = useId();

  // References to 3D parts for animation
  const fanBladesRef = useRef<THREE.Group | null>(null);
  const cabinetShellRef = useRef<THREE.Group | null>(null);
  const topCoverRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particlePositionsRef = useRef<Float32Array | null>(null);
  const lightsRef = useRef<{ keyLight: THREE.DirectionalLight; rimLight: THREE.DirectionalLight } | null>(null);
  const materialsRef = useRef<Record<string, THREE.MeshStandardMaterial>>({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090d16, 0.08);

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.8, 2.4, 4.6);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting (Key, Fill, Rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0284c7, 1.2);
    fillLight.position.set(-5, 3, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 2.0);
    rimLight.position.set(0, -4, -6);
    scene.add(rimLight);

    lightsRef.current = { keyLight, rimLight };

    // 3. Materials
    const steelChassisMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
      envMapIntensity: 1.0
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.35
    });

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      metalness: 0.95,
      roughness: 0.2
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.3
    });

    const aluminumFinMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.4
    });

    const accentSkyMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x0369a1,
      emissiveIntensity: 0.2
    });

    materialsRef.current = {
      chassis: steelChassisMat,
      dark: darkMetalMat,
      copper: copperMat,
      brass: brassMat,
      aluminum: aluminumFinMat,
      accent: accentSkyMat
    };

    // Root Group
    const hvacRoot = new THREE.Group();
    scene.add(hvacRoot);

    // Ground reflective disc
    const groundGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.05, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      metalness: 0.7,
      roughness: 0.5
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -1.15;
    ground.receiveShadow = true;
    hvacRoot.add(ground);

    // Unit Base Stand
    const baseGeo = new THREE.BoxGeometry(1.9, 0.15, 1.9);
    const baseMesh = new THREE.Mesh(baseGeo, darkMetalMat);
    baseMesh.position.y = -1.05;
    hvacRoot.add(baseMesh);

    // INTERNAL COMPONENTS (Always stationary, revealed during exploded view)
    const internalGroup = new THREE.Group();
    hvacRoot.add(internalGroup);

    // Scroll Compressor (Central black cylinder with top dome)
    const compCylinderGeo = new THREE.CylinderGeometry(0.32, 0.32, 1.1, 24);
    const compMesh = new THREE.Mesh(compCylinderGeo, darkMetalMat);
    compMesh.position.set(-0.15, -0.4, -0.1);
    internalGroup.add(compMesh);

    const compDomeGeo = new THREE.SphereGeometry(0.32, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const compDome = new THREE.Mesh(compDomeGeo, darkMetalMat);
    compDome.position.set(-0.15, 0.15, -0.1);
    internalGroup.add(compDome);

    // Copper Suction Line (Curved pipe from compressor)
    const copperCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.15, 0.1, -0.1),
      new THREE.Vector3(0.2, 0.3, 0.1),
      new THREE.Vector3(0.6, 0.0, 0.35),
      new THREE.Vector3(0.92, -0.65, 0.4)
    ]);
    const copperGeo = new THREE.TubeGeometry(copperCurve, 20, 0.045, 12, false);
    const copperMesh = new THREE.Mesh(copperGeo, copperMat);
    internalGroup.add(copperMesh);

    // Liquid Copper Line
    const liquidCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.05, -0.5, -0.1),
      new THREE.Vector3(0.4, -0.5, 0.1),
      new THREE.Vector3(0.92, -0.75, 0.35)
    ]);
    const liquidGeo = new THREE.TubeGeometry(liquidCurve, 16, 0.03, 12, false);
    const liquidMesh = new THREE.Mesh(liquidGeo, copperMat);
    internalGroup.add(liquidMesh);

    // Brass Service Valves
    const valveGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.18, 12);
    const valve1 = new THREE.Mesh(valveGeo, brassMat);
    valve1.rotation.z = Math.PI / 2;
    valve1.position.set(0.94, -0.65, 0.4);
    internalGroup.add(valve1);

    const valve2 = new THREE.Mesh(valveGeo, brassMat);
    valve2.rotation.z = Math.PI / 2;
    valve2.position.set(0.94, -0.75, 0.35);
    internalGroup.add(valve2);

    // Dual-Run Electrical Capacitor Cylinder
    const capGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.45, 16);
    const capMesh = new THREE.Mesh(capGeo, aluminumFinMat);
    capMesh.position.set(0.55, -0.3, -0.55);
    internalGroup.add(capMesh);

    // Aluminum Fin Coils (3 curved inner walls)
    const coilGroup = new THREE.Group();
    for (let i = 0; i < 9; i++) {
      const coilRingGeo = new THREE.BoxGeometry(1.6, 0.03, 1.6);
      const coilRing = new THREE.Mesh(coilRingGeo, aluminumFinMat);
      coilRing.position.y = -0.85 + i * 0.18;
      coilGroup.add(coilRing);
    }
    internalGroup.add(coilGroup);

    // CABINET OUTER SHELL (Slides outward during exploded view)
    const cabinetShell = new THREE.Group();
    hvacRoot.add(cabinetShell);
    cabinetShellRef.current = cabinetShell;

    // Corner posts (4 vertical uprights)
    const postGeo = new THREE.BoxGeometry(0.1, 1.8, 0.1);
    const postPositions = [
      [-0.85, 0, -0.85],
      [0.85, 0, -0.85],
      [-0.85, 0, 0.85],
      [0.85, 0, 0.85]
    ];
    postPositions.forEach(([px, py, pz]) => {
      const post = new THREE.Mesh(postGeo, steelChassisMat);
      post.position.set(px, py, pz);
      cabinetShell.add(post);
    });

    // Louvered Side Grilles
    for (let l = 0; l < 12; l++) {
      const louverGeo = new THREE.BoxGeometry(1.7, 0.04, 0.02);
      // North and South louvers
      const louverN = new THREE.Mesh(louverGeo, steelChassisMat);
      louverN.position.set(0, -0.8 + l * 0.14, -0.85);
      louverN.rotation.x = 0.2;
      cabinetShell.add(louverN);

      const louverS = new THREE.Mesh(louverGeo, steelChassisMat);
      louverS.position.set(0, -0.8 + l * 0.14, 0.85);
      louverS.rotation.x = -0.2;
      cabinetShell.add(louverS);

      // East and West louvers
      const louverEWGeo = new THREE.BoxGeometry(0.02, 0.04, 1.7);
      const louverW = new THREE.Mesh(louverEWGeo, steelChassisMat);
      louverW.position.set(-0.85, -0.8 + l * 0.14, 0);
      louverW.rotation.z = 0.2;
      cabinetShell.add(louverW);
    }

    // Brand Badge on front
    const badgeGeo = new THREE.BoxGeometry(0.55, 0.15, 0.03);
    const badge = new THREE.Mesh(badgeGeo, accentSkyMat);
    badge.position.set(0, 0.5, 0.88);
    cabinetShell.add(badge);

    // TOP DISCHARGE COVER & FAN (Lifts up during exploded view)
    const topCover = new THREE.Group();
    hvacRoot.add(topCover);
    topCoverRef.current = topCover;

    // Top rim plate
    const topRimGeo = new THREE.BoxGeometry(1.85, 0.1, 1.85);
    const topRim = new THREE.Mesh(topRimGeo, steelChassisMat);
    topRim.position.y = 0.95;
    topCover.add(topRim);

    // Top Wire Grille Guard
    const topGuardGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.04, 24);
    const topGuard = new THREE.Mesh(topGuardGeo, darkMetalMat);
    topGuard.position.y = 1.02;
    topCover.add(topGuard);

    // Fan Hub & 4 Aerofoil Blades
    const fanGroup = new THREE.Group();
    fanGroup.position.set(0, 0.85, 0);
    topCover.add(fanGroup);
    fanBladesRef.current = fanGroup;

    const hubGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 16);
    const hubMesh = new THREE.Mesh(hubGeo, darkMetalMat);
    fanGroup.add(hubMesh);

    for (let b = 0; b < 4; b++) {
      const bladeGeo = new THREE.BoxGeometry(0.55, 0.02, 0.14);
      const bladeMesh = new THREE.Mesh(bladeGeo, steelChassisMat);
      const angle = (b * Math.PI) / 2;
      bladeMesh.position.set(Math.cos(angle) * 0.35, 0, Math.sin(angle) * 0.35);
      bladeMesh.rotation.y = angle;
      bladeMesh.rotation.x = 0.35; // Aerodynamic pitch angle
      fanGroup.add(bladeMesh);
    }

    // 4. AIRFLOW DYNAMIC PARTICLE SYSTEM
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let p = 0; p < particleCount; p++) {
      const radius = 0.1 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      particlePositions[p * 3] = Math.cos(angle) * radius;
      particlePositions[p * 3 + 1] = 1.0 + Math.random() * 2.5;
      particlePositions[p * 3 + 2] = Math.sin(angle) * radius;
      particleSpeeds[p] = 0.03 + Math.random() * 0.04;
    }

    particlePositionsRef.current = particlePositions;

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    hvacRoot.add(particles);
    particlesRef.current = particles;

    // 5. MOUSE & TOUCH ORBIT DRAGGING
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.6;
    let targetRotationX = 0.2;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(-0.4, Math.min(0.8, targetRotationX + deltaY * 0.006));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      targetRotationY += deltaX * 0.01;
      targetRotationX = Math.max(-0.4, Math.min(0.8, targetRotationX + deltaY * 0.008));
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvasDom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 6. ANIMATION LOOP
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation when not dragging
      if (isRotating && !isDragging) {
        targetRotationY += 0.004 * rotationSpeed;
      }

      // Smooth lerp camera tracking
      hvacRoot.rotation.y += (targetRotationY - hvacRoot.rotation.y) * 0.08;
      hvacRoot.rotation.x += (targetRotationX - hvacRoot.rotation.x) * 0.08;

      // Spin top discharge fan blades
      if (fanBladesRef.current) {
        fanBladesRef.current.rotation.y += 0.18;
      }

      // Animate Airflow Particles
      if (particlesRef.current && particlePositionsRef.current) {
        const positions = particlePositionsRef.current;
        for (let p = 0; p < particleCount; p++) {
          positions[p * 3 + 1] += particleSpeeds[p];
          // Slight spiral expansion
          positions[p * 3] += (Math.random() - 0.5) * 0.008;
          positions[p * 3 + 2] += (Math.random() - 0.5) * 0.008;

          // Recycle particle at top
          if (positions[p * 3 + 1] > 3.6) {
            const rad = 0.1 + Math.random() * 0.65;
            const ang = Math.random() * Math.PI * 2;
            positions[p * 3] = Math.cos(ang) * rad;
            positions[p * 3 + 1] = 1.05;
            positions[p * 3 + 2] = Math.sin(ang) * rad;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvasDom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasDom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, []);

  // Update Climate Lighting & Particle Colors
  useEffect(() => {
    if (!lightsRef.current || !particlesRef.current) return;
    const { keyLight, rimLight } = lightsRef.current;
    const particleMat = particlesRef.current.material as THREE.PointsMaterial;

    if (climateMode === 'cooling') {
      keyLight.color.setHex(0x38bdf8); // Sky Cyan
      rimLight.color.setHex(0x60a5fa);
      particleMat.color.setHex(0x38bdf8);
    } else {
      keyLight.color.setHex(0xf97316); // Warm Amber Heat
      rimLight.color.setHex(0xfbbf24);
      particleMat.color.setHex(0xf97316);
    }
  }, [climateMode]);

  // Update Exploded View Animation
  useEffect(() => {
    if (!cabinetShellRef.current || !topCoverRef.current) return;
    const shell = cabinetShellRef.current;
    const top = topCoverRef.current;

    if (exploded) {
      // Explode outwards
      shell.scale.set(1.35, 1.1, 1.35);
      top.position.y = 0.95;
    } else {
      // Collapse to assembled state
      shell.scale.set(1.0, 1.0, 1.0);
      top.position.y = 0;
    }
  }, [exploded]);

  // Update Materials Finish
  useEffect(() => {
    const chassis = materialsRef.current.chassis;
    if (!chassis) return;

    if (materialFinish === 'steel') {
      chassis.color.setHex(0x1e293b);
      chassis.metalness = 0.85;
      chassis.roughness = 0.25;
    } else if (materialFinish === 'obsidian') {
      chassis.color.setHex(0x090d16);
      chassis.metalness = 0.95;
      chassis.roughness = 0.15;
    } else {
      chassis.color.setHex(0x475569);
      chassis.metalness = 0.9;
      chassis.roughness = 0.3;
    }
  }, [materialFinish]);

  if (!webglSupported) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-6 text-white text-center flex flex-col items-center justify-center min-h-[360px] ${className}`}>
        <ThermometerSnowflake className="w-12 h-12 text-sky-400 mb-3" />
        <h4 className="text-lg font-bold">Austin Dual Inverter Central AC</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm">
          WebGL rendering paused. Our technicians service all Carrier, Trane, Lennox, and Daikin inverter systems across Austin.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl text-white select-none ${className}`}>
      {/* 3D Viewport Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full ${compact ? 'h-72 sm:h-80' : 'h-[360px] sm:h-[440px]'} cursor-grab active:cursor-grabbing`}
      />

      {/* Top Floating Telemetry Overlay (Strict 3D HUD) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/80 text-xs">
          <span className={`w-2 h-2 rounded-full animate-pulse ${climateMode === 'cooling' ? 'bg-sky-400' : 'bg-amber-500'}`} />
          <span className="font-bold tracking-wider uppercase text-slate-200">
            3D Spatial Mechanical Model
          </span>
          <span className="text-slate-600">·</span>
          <span className="font-mono text-sky-400 font-semibold">
            {climateMode === 'cooling' ? 'Cooling Cycle (72°F)' : 'Heat Pump Cycle (68°F)'}
          </span>
        </div>

        {/* Rotation indicator */}
        <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-400">
          <span>Drag to Orbit 360°</span>
        </div>
      </div>

      {/* Interactive Controls Bar Layered Over Canvas */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Climate Mode & Exploded View Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/85 backdrop-blur-md rounded-xl border border-slate-800 shadow-lg">
          <button
            onClick={() => setClimateMode('cooling')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              climateMode === 'cooling'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ThermometerSnowflake className="w-3.5 h-3.5" />
            <span>Cooling Mode</span>
          </button>

          <button
            onClick={() => setClimateMode('heating')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              climateMode === 'heating'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Heat Pump</span>
          </button>

          <div className="w-px h-4 bg-slate-800 mx-1" />

          {/* Exploded View Toggle */}
          <button
            onClick={() => setExploded(!exploded)}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              exploded
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Inspect internal compressor & coils"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{exploded ? 'Assembled' : 'Explode View'}</span>
          </button>
        </div>

        {/* Right: Auto-Rotate & Finish Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/85 backdrop-blur-md rounded-xl border border-slate-800 shadow-lg">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isRotating ? 'text-sky-400 bg-slate-900' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle 3D Auto Rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1 px-1">
            <button
              onClick={() => setMaterialFinish('steel')}
              className={`w-4 h-4 rounded-full border ${
                materialFinish === 'steel' ? 'ring-2 ring-sky-400 border-white' : 'border-slate-700'
              } bg-slate-700`}
              title="Galvanized Powder Steel"
            />
            <button
              onClick={() => setMaterialFinish('obsidian')}
              className={`w-4 h-4 rounded-full border ${
                materialFinish === 'obsidian' ? 'ring-2 ring-sky-400 border-white' : 'border-slate-700'
              } bg-slate-950`}
              title="Stealth Obsidian Finish"
            />
            <button
              onClick={() => setMaterialFinish('titanium')}
              className={`w-4 h-4 rounded-full border ${
                materialFinish === 'titanium' ? 'ring-2 ring-sky-400 border-white' : 'border-slate-700'
              } bg-slate-500`}
              title="Commercial Titanium"
            />
          </div>
        </div>
      </div>

      {/* Hotspots Interactive Inspection Drawer */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Interactive Component Inspection:
          </span>
          <span className="text-[11px] text-sky-400 font-mono">SEER2 22.5 · Modulating Inverter</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {HOTSPOTS.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
              className={`p-2 rounded-lg text-left border transition-all ${
                activeHotspot?.id === spot.id
                  ? 'bg-slate-800 border-sky-500 text-white shadow-md'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-semibold text-slate-200 truncate">{spot.name}</div>
              <div className="text-[10px] text-sky-400 font-mono mt-0.5">{spot.metric}</div>
            </button>
          ))}
        </div>

        {/* Selected Component Description */}
        {activeHotspot && (
          <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-start gap-2.5 animate-in fade-in duration-150">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-white block">{activeHotspot.name}:</span>
              <p className="text-slate-300 text-xs leading-relaxed">{activeHotspot.desc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
