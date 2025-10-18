// client/src/components/RosaPerfeita.jsx

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function RosaPerfeita({ svgRef, open, onClick, modoNoturno }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef(null);

  // Tilt effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Play music on user click
  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    onClick();
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/audio/musica-romantica.mp3" type="audio/mpeg" />
      </audio>

      <svg
        ref={svgRef}
        onClick={handleClick}
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
            : 'drop-shadow(0 10px 40px rgba(147, 112, 219, 0.7))',
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
            <stop offset="100%" stopColor="#7e22ce" />
          </radialGradient>
          <radialGradient id="petalPurple1" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#faf5ff" />
            <stop offset="40%" stopColor="#ede9fe" />
            <stop offset="70%" stopColor="#d8b4fe" />
            <stop offset="100%" stopColor="#9d7ace" />
          </radialGradient>
          <radialGradient id="centerGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#ede9fe" />
            <stop offset="50%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#831843" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor="#a78bfa" floodOpacity="0.8" />
            <feComposite in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer petals */}
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

        {/* Middle petals */}
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

        {/* Inner petals */}
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

        {/* Center glow */}
        <circle cx="200" cy="200" r="65" fill="url(#petalPink2)" opacity="0.9" filter="url(#softGlow)" />
        <circle cx="200" cy="200" r="50" fill="url(#centerGlow)" opacity="0.95" />
        <circle cx="200" cy="200" r="35" fill="#a78bfa" filter="url(#strongGlow)" />
        <circle cx="200" cy="200" r="20" fill="#831843" opacity="0.9" />

        {/* Stamens */}
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
              fill="#ba94e6"
              opacity="0.8"
              style={{
                animation: open ? 'pulse 2s ease-in-out infinite' : 'none',
                animationDelay: `${idx * 0.1}s`,
              }}
            />
          );
        })}

        {/* Pulse animation */}
        <style jsx global>{`
          @keyframes pulse {
            0%,100% { transform: scale(1); opacity:0.8; }
            50%     { transform: scale(1.3); opacity:1; }
          }
        `}</style>
      </svg>
    </>
  );
}

RosaPerfeita.propTypes = {
  svgRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  modoNoturno: PropTypes.bool.isRequired,
};
