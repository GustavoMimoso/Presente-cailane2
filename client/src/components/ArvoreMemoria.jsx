// client/src/components/ArvoreMemoria.jsx

import React, { useState, useEffect } from 'react';

export default function ArvoreMemoria() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const memorias = [
    { id: 1, texto: 'Primeiro encontro', emoji: '🌸', posX: 30, posY: 70 },
    { id: 2, texto: 'Primeira viagem', emoji: '🌺', posX: 70, posY: 65 },
    { id: 3, texto: 'Nosso primeiro beijo', emoji: '🌹', posX: 50, posY: 50 },
    { id: 4, texto: 'Primeiro eu te amo', emoji: '🌻', posX: 25, posY: 40 },
    { id: 5, texto: 'Dia especial', emoji: '🌼', posX: 75, posY: 35 },
    { id: 6, texto: 'Momento mágico', emoji: '🌷', posX: 50, posY: 20 },
    { id: 7, texto: 'Nossa selfie', emoji: '🍃', posX: 40, posY: 60 },
    { id: 8, texto: 'Surpresa romântica', emoji: '🍂', posX: 60, posY: 55 },
    { id: 9, texto: 'Pôr do sol juntos', emoji: '🍁', posX: 20, posY: 30 },
    { id: 10, texto: 'Café da manhã especial', emoji: '🍀', posX: 80, posY: 30 },
    { id: 11, texto: 'Noite de estrelas', emoji: '🌙', posX: 55, posY: 15 },
    { id: 12, texto: 'Planos futuros', emoji: '🌱', posX: 45, posY: 25 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('arvore-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="arvore-section"
      className="relative min-h-screen bg-gradient-to-b from-purple-100 to-green-100 flex items-center justify-center p-8 overflow-hidden"
    >
      <div className="text-center mb-12 z-10">
        <h2 className="text-5xl font-cursive text-purple-800 mb-4">
          Nossa Árvore de Memórias 🌳
        </h2>
        <p className="text-xl text-purple-600">
          Cada flor representa um momento especial nosso
        </p>
      </div>

      {/* Tronco da árvore */}
      <svg className="absolute bottom-0" width="200" height="400" viewBox="0 0 200 400">
        <defs>
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect
          x="75"
          y="200"
          width="50"
          height="200"
          fill="url(#trunkGrad)"
          rx="10"
          style={{
            transform: `scaleY(${scrollProgress})`,
            transformOrigin: 'bottom',
            transition: 'transform 0.3s ease-out',
          }}
        />
      </svg>

      {/* Flores/Memórias */}
      {memorias.map((mem, idx) => {
        const aparecer = scrollProgress > idx / memorias.length;
        return (
          <div
            key={mem.id}
            className={`absolute cursor-pointer transition-all duration-700 ${
              aparecer ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{
              left: `${mem.posX}%`,
              top: `${mem.posY}%`,
              transitionDelay: `${idx * 0.15}s`,
            }}
            title={mem.texto}
          >
            <div className="relative group">
              <span className="text-5xl hover:scale-125 transition-transform duration-300">
                {mem.emoji}
              </span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-purple-800 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {mem.texto}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
