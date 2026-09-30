import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeDMotionBackgroundProps {
  className?: string;
  mode?: 'cooling' | 'heating';
  particleCount?: number;
}

export function ThreeDMotionBackground({
  className = '',
  mode = 'cooling',
  particleCount = 300
}: ThreeDMotionBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 1. Kinetic Airflow Wave Particles
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 16;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      speeds[i] = 0.02 + Math.random() * 0.05;
      scales[i] = 0.5 + Math.random() * 1.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleColor = mode === 'cooling' ? 0x38bdf8 : 0xf97316;
    const material = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.22,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2. Kinetic Ribbon Lines (Aerodynamic streamlines)
    const lineCount = 18;
    const lineSegments = 40;
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const lineObjects: { line: THREE.Line; baseY: number; baseZ: number; speed: number }[] = [];

    for (let l = 0; l < lineCount; l++) {
      const lineGeo = new THREE.BufferGeometry();
      const linePos = new Float32Array(lineSegments * 3);
      const baseY = -8 + (l / lineCount) * 16 + (Math.random() - 0.5) * 2;
      const baseZ = (Math.random() - 0.5) * 8;

      for (let s = 0; s < lineSegments; s++) {
        linePos[s * 3] = -18 + (s / (lineSegments - 1)) * 36;
        linePos[s * 3 + 1] = baseY;
        linePos[s * 3 + 2] = baseZ;
      }

      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));

      const lineMat = new THREE.LineBasicMaterial({
        color: mode === 'cooling' ? 0x0284c7 : 0xea580c,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending
      });

      const line = new THREE.Line(lineGeo, lineMat);
      lineGroup.add(line);
      lineObjects.push({
        line,
        baseY,
        baseZ,
        speed: 0.002 + Math.random() * 0.003
      });
    }

    // 3. Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePosRef.current.targetX = x * 3;
      mousePosRef.current.targetY = y * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 4. Animation Loop
    let clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse damping
      const mouse = mousePosRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 0.5;
      camera.position.y = mouse.y * 0.4;
      camera.lookAt(0, 0, 0);

      // Animate Particles
      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Move horizontally
        posArray[i * 3] += speeds[i];

        // Vertical harmonic wave
        posArray[i * 3 + 1] =
          originalPositions[i * 3 + 1] +
          Math.sin(time * 2 + posArray[i * 3] * 0.2) * 0.8 +
          mouse.y * 0.3;

        // Wrap around left to right
        if (posArray[i * 3] > 18) {
          posArray[i * 3] = -18;
          posArray[i * 3 + 1] = (Math.random() - 0.5) * 18;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Animate Streamline Ribbons
      lineObjects.forEach(({ line, baseY, speed }, lIdx) => {
        const linePos = line.geometry.attributes.position.array as Float32Array;
        for (let s = 0; s < lineSegments; s++) {
          const x = linePos[s * 3];
          linePos[s * 3 + 1] =
            baseY +
            Math.sin(time * 2.5 + x * 0.25 + lIdx) * 0.9 +
            Math.cos(time * 1.5 + x * 0.15) * 0.4;
        }
        line.geometry.attributes.position.needsUpdate = true;
      });

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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [mode, particleCount]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    />
  );
}
