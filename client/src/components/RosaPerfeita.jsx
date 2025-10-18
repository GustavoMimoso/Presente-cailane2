import React, { useState, useEffect } from 'react';

export default function RosaPerfeita({ svgRef, open, onClick, modoNoturno }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      className="cursor-pointer transition-all duration-1000 ease-out z-10"
      style={{
        width: open ? '75vw' : '50vw',
        height: open ? '75vw' : '50vw',
        transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(${isHovering ? 1.05 : 1})`,
        maxWidth: '700px',
        maxHeight: '700px',
        filter: modoNoturno
          ? 'drop-shadow(0 10px 40px rgba(255, 255, 255, 0.4))'
          : 'drop-shadow(0 10px 40px rgba(236, 72, 153, 0.4))',
      }}
    >
      <defs>
        <radialGradient id="petalPink1" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="40%" stopColor="#fce7f3" />
          <stop offset="70%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#f9a8d4" />
        </radialGradient>
        <radialGradient id="petalPink2" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="50%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#ec4899" />
        </radialGradient>
        <radialGradient id="petalPurple1" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#faf5ff" />
          <stop offset="40%" stopColor="#f3e8ff" />
          <stop offset="70%" stopColor="#e9d5ff" />
          <stop offset="100%" stopColor="#d8b4fe" />
        </radialGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="50%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#ec4899" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
        <filter id="strongGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feFlood floodColor="#fbb6ce" floodOpacity="0.8" />
          <feComposite in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Camada externa de pétalas */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <ellipse
          key={`outer-${idx}`}
          cx="200"
          cy="200"
          rx="70"
          ry="120"
          fill="url(#petalPink1)"
          opacity="0.95"
          style={{
            transformOrigin: '200px 200px',
            transform: `rotate(${angle + (open ? idx * 5 : 0)}deg)`,
            transition: 'transform 2s ease-out',
          }}
        />
      ))}

      {/* Camada intermediária */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, idx) => (
        <ellipse
          key={`mid-${idx}`}
          cx="200"
          cy="200"
          rx="60"
          ry="100"
          fill="url(#petalPurple1)"
          opacity="0.9"
          style={{
            transformOrigin: '200px 200px',
            transform: `rotate(${angle + (open ? -idx * 4 : 0)}deg)`,
            transition: 'transform 2s ease-out',
          }}
        />
      ))}

      {/* Camada interna */}
      {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
        <ellipse
          key={`inner-${idx}`}
          cx="200"
          cy="200"
          rx="45"
          ry="75"
          fill="url(#petalPink2)"
          opacity="0.85"
          style={{
            transformOrigin: '200px 200px',
            transform: `rotate(${angle + (open ? idx * 6 : 0)}deg)`,
            transition: 'transform 2s ease-out',
          }}
        />
      ))}

      {/* Centro da rosa */}
      <circle cx="200" cy="200" r="65" fill="url(#petalPink2)" opacity="0.9" filter="url(#softGlow)" />
      <circle cx="200" cy="200" r="50" fill="url(#centerGlow)" opacity="0.95" />
      <circle cx="200" cy="200" r="35" fill="#f9a8d4" filter="url(#strongGlow)" />
      <circle cx="200" cy="200" r="20" fill="#ec4899" opacity="0.9" />

      {/* Estames animados */}
      {[...Array(12)].map((_, idx) => {
        const angle = idx * 30;
        const rad = (angle * Math.PI) / 180;
        const x = 200 + Math.cos(rad) * 15;
        const y = 200 + Math.sin(rad) * 15;
        return (
          <circle
            key={`stamen-${idx}`}
            cx={x}
            cy={y}
            r="3"
            fill="#fbbf24"
            opacity="0.8"
            style={{
              animation: open ? 'pulse 2s ease-in-out infinite' : 'none',
              animationDelay: `${idx * 0.1}s`,
            }}
          />
        );
      })}
    </svg>
  );
}
