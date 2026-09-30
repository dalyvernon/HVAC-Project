import React, { useRef, useState } from 'react';

interface ThreeDCardMotionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export function ThreeDCardMotion({
  children,
  className = '',
  intensity = 15,
  glare = true
}: ThreeDCardMotionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -intensity;
    const rY = ((x - centerX) / centerX) * intensity;

    setRotateX(rX);
    setRotateY(rY);

    if (glare) {
      const gX = (x / rect.width) * 100;
      const gY = (y / rect.height) * 100;
      setGlarePos({ x: gX, y: gY, opacity: 0.15 });
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="transform-gpu"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className={`relative will-change-transform transform-gpu ${className}`}
      >
        {children}

        {/* Dynamic 3D Glare Reflection Layer */}
        {glare && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 overflow-hidden"
            style={{
              background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}), transparent 80%)`
            }}
          />
        )}
      </div>
    </div>
  );
}
