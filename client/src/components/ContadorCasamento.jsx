// client/src/components/ContadorCasamento.jsx

import React, { useState, useEffect, useRef } from 'react';

export default function ContadorCasamento({ dataCasamento }) {
  const [t, setT] = useState({});
  const canvasRef = useRef(null);

  // Calcula o tempo restante
  const calc = () => {
    const now = new Date();
    const diff = dataCasamento - now;
    if (diff <= 0) return { anos: 0, dias: 0, horas: 0, minutos: 0, segundos: 0 };
    const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);
    return { anos, dias, horas, minutos, segundos };
  };

  // Atualiza o contador a cada segundo
  useEffect(() => {
    setT(calc());
    const iv = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(iv);
  }, [dataCasamento]);

  // Animação de fundo com pequenas partículas brilhantes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, particles;
    const init = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles = Array.from({ length: 80 }).map(() => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2
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
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(197,134,255,${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    init();
    draw();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden flex items-center justify-center">
      {/* Canvas de fundo */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* Contador */}
      <div className="relative z-10 bg-white/80 backdrop-blur-lg p-8 rounded-2xl text-center">
        <p className="text-2xl font-bold text-purple-800 mb-4">Faltam</p>
        <div className="grid grid-cols-5 gap-4">
          <div>
            <p className="text-4xl font-extrabold text-purple-900">{t.anos}</p>
            <p className="uppercase text-sm text-purple-700">Anos</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-purple-900">{t.dias}</p>
            <p className="uppercase text-sm text-purple-700">Dias</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-purple-900">{t.horas}</p>
            <p className="uppercase text-sm text-purple-700">Horas</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-purple-900">{t.minutos}</p>
            <p className="uppercase text-sm text-purple-700">Minutos</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-purple-900">{t.segundos}</p>
            <p className="uppercase text-sm text-purple-700">Segundos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
