'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

function NeonParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: 1 + Math.random() * 2,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 15,
      color: i % 2 === 0 ? '#00e5ff' : '#ff2d7b',
      opacity: 0.3 + Math.random() * 0.4,
    })), []);

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            bottom: '-5%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            opacity: p.opacity,
            animation: `particleDrift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

export default function LivingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setOffset({
        x: (e.clientX - centerX),
        y: (e.clientY - centerY),
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Perspective Grid */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridPulse 4s ease-in-out infinite',
          transform: `translate(${offset.x * 0.005}px, ${offset.y * 0.005}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Perspective horizon grid (bottom half) */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '40%',
          background: `
            linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 40px',
          transform: `perspective(300px) rotateX(60deg) translate(${offset.x * 0.01}px, 0)`,
          transformOrigin: 'bottom center',
          transition: 'transform 0.3s ease-out',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
        }}
      />

      {/* Circuit-trace SVG pattern overlay */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.03 }}>
        <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M 0 100 L 80 100 L 80 40 L 120 40 L 120 100 L 200 100" stroke="#00e5ff" strokeWidth="1" fill="none" />
          <path d="M 100 0 L 100 60 L 160 60 L 160 140 L 100 140 L 100 200" stroke="#00e5ff" strokeWidth="1" fill="none" />
          <circle cx="80" cy="100" r="3" fill="#00e5ff" />
          <circle cx="120" cy="40" r="3" fill="#00e5ff" />
          <circle cx="160" cy="60" r="3" fill="#ff2d7b" />
          <circle cx="100" cy="140" r="3" fill="#ff2d7b" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 229, 255, 0.015) 2px, rgba(0, 229, 255, 0.015) 4px)',
          zIndex: 1,
        }}
      />

      {/* Floating neon particles */}
      <NeonParticles />

      {/* Ambient corner glows */}
      <div
        className="absolute top-0 left-0 w-96 h-96"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `translate(${offset.x * 0.015}px, ${offset.y * 0.015}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96"
        style={{
          background: 'radial-gradient(circle, rgba(255, 45, 123, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `translate(${offset.x * -0.01}px, ${offset.y * -0.01}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(180, 77, 255, 0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: `translate(calc(-50% + ${offset.x * 0.008}px), calc(-50% + ${offset.y * 0.008}px))`,
          transition: 'transform 0.3s ease-out',
        }}
      />
    </div>
  );
}
