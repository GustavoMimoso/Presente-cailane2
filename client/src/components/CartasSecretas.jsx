// client/src/components/CartasSecretas.jsx

import React, { useState, useEffect, useRef } from 'react';

export default function CartasSecretas() {
  const mensagens = [
    'Adoro seu sorriso',
    'Você me inspira todo dia',
    'Seu abraço é meu lar',
    'Amo seu jeito de rir',
    'Você acredita em mim',
    'Seu olhar ilumina meu mundo',
    'Adoro nossas conversas',
    'Você é minha melhor amiga',
    'Seu cheiro me acalma',
    'Amo seu jeito de cuidar de mim',
    'Você é minha motivação',
    'Seu toque me faz bem',
    'Adoro como me faz rir',
    'Você é meu apoio',
    'Amo nossos passeios juntos',
    'Você me entende',
    'Seu carinho me conforta',
    'Adoro seu jeito espontâneo',
    'Você é minha paz',
    'Amo sonhar com você',
    'Sua voz é música',
    'Você é minha metade',
    'Amo seu gosto musical',
    'Você me faz querer ser melhor',
    'Adoro seu senso de humor',
    'Você valoriza nossos momentos',
    'Amo sua generosidade',
    'Seu otimismo me anima',
    'Adoro suas ideias',
    'Você compartilha meus sonhos',
    'Amo seu jeito confiante',
    'Você me faz sentir seguro',
    'Adoro seu talento',
    'Você me faz feliz',
    'Amo nossa cumplicidade',
    'Você respira amor',
    'Adoro seu estilo',
    'Você me complementa',
    'Amo suas surpresas',
    'Você é única',
    'Adoro seu jeitinho',
    'Você me provoca orgulho',
    'Amo sua criatividade',
    'Você é minha aventura',
    'Adoro nossas memórias',
    'Você colore meus dias',
    'Amo seu abraço apertado',
    'Você é meu porto seguro',
    'Adoro seu olhar sincero',
    'Você faz meu coração bater mais forte'
  ];

  const [abertas, setAbertas] = useState([]);
  const canvasRef = useRef(null);

  // Particle background (sparkles)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, particles;

    const init = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles = Array.from({ length: 60 }).map(() => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.5
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  const toggleCarta = idx => {
    setAbertas(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="relative flex flex-wrap justify-center items-start gap-6 p-8 min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      {mensagens.map((texto, idx) => {
        const aberta = abertas.includes(idx);
        return (
          <div
            key={idx}
            className="relative w-44 h-28 perspective-600 cursor-pointer"
            onClick={() => toggleCarta(idx)}
          >
            {/* Back of card */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-300 rounded-lg shadow-lg backface-hidden transition-transform duration-700 ${
                aberta ? 'rotate-y-180' : 'rotate-y-0'
              }`}
              style={{ transformStyle: 'preserve-3d', zIndex: aberta ? 1 : 2 }}
            />

            {/* Front of card */}
            <div
              className={`absolute inset-0 bg-white rounded-lg shadow-2xl backface-hidden flex items-center justify-center p-4 text-center transition-transform duration-700 ${
                aberta ? 'rotate-y-0' : 'rotate-y-180'
              }`}
              style={{ transformStyle: 'preserve-3d', zIndex: aberta ? 2 : 1 }}
            >
              <p className="text-purple-800 text-sm">{texto}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
