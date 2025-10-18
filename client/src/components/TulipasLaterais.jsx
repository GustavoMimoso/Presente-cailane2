import React from 'react';

export default function TulipasLaterais() {
  const cores = ['#c4b5fd', '#a78bfa'];

  return (
    <>
      {/* Lado esquerdo */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around items-center w-32 z-5 pointer-events-none">
        {cores.map((cor, i) => (
          <TulipaGrandeSVG
            key={`left-${i}`}
            lado="esquerda"
            delay={i * 0.3}
            cor={cor}
          />
        ))}
      </div>
      {/* Lado direito */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around items-center w-32 z-5 pointer-events-none">
        {cores.slice().reverse().map((cor, i) => (
          <TulipaGrandeSVG
            key={`right-${i}`}
            lado="direita"
            delay={i * 0.3}
            cor={cor}
          />
        ))}
      </div>
    </>
  );
}

function TulipaGrandeSVG({ lado, delay, cor }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 120"
      className="tulipa-lateral"
      style={{
        width: '80px',
        height: '120px',
        animation: `surgirLateral 1.5s ease ${delay}s backwards, balancarLateral 4s ease-in-out ${delay}s infinite`,
        transform: lado === 'esquerda' ? 'scaleX(1)' : 'scaleX(-1)'
      }}
    >
      <defs>
        <linearGradient id={`tulipGrad-${lado}-${delay}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={cor} stopOpacity="1" />
          <stop offset="70%" stopColor={cor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={cor} stopOpacity="0.5" />
        </linearGradient>
        <filter id="tulipGlow">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Caule */}
      <path
        d="M 40 120 Q 35 80, 40 60"
        stroke="#7c3aed"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Folha */}
      <ellipse
        cx="25"
        cy="85"
        rx="12"
        ry="20"
        fill="#7c3aed"
        opacity="0.8"
        transform="rotate(-30 25 85)"
      />

      {/* Pétalas da tulipa */}
      <ellipse
        cx="30"
        cy="30"
        rx="12"
        ry="28"
        fill={`url(#tulipGrad-${lado}-${delay})`}
        transform="rotate(-15 30 30)"
        filter="url(#tulipGlow)"
      />
      <ellipse
        cx="50"
        cy="30"
        rx="12"
        ry="28"
        fill={`url(#tulipGrad-${lado}-${delay})`}
        transform="rotate(15 50 30)"
        filter="url(#tulipGlow)"
      />
      <ellipse cx="40" cy="25" rx="14" ry="30" fill={cor} opacity="0.95" />
      <ellipse
        cx="35"
        cy="28"
        rx="10"
        ry="25"
        fill={cor}
        opacity="0.85"
        transform="rotate(-8 35 28)"
      />
      <ellipse
        cx="45"
        cy="28"
        rx="10"
        ry="25"
        fill={cor}
        opacity="0.85"
        transform="rotate(8 45 28)"
      />

      {/* Sombra interna */}
      <ellipse cx="40" cy="35" rx="8" ry="12" fill="#000" opacity="0.1" />
    </svg>
  );
}
