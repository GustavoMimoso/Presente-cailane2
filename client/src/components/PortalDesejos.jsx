// client/src/components/PortalDesejos.jsx

import React, { useEffect, useRef, useState } from 'react';

export default function PortalDesejos() {
  const canvasRef = useRef(null);
  const [desejos, setDesejos] = useState([]);
  const [texto, setTexto] = useState('');

  // Inicializa desejos (estrelas cadentes) vindos do input
  const enviarDesejo = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    setDesejos(prev => [
      ...prev,
      { id: Date.now(), x: 50, y: 90, texto }  // começa no centro, base
    ]);
    setTexto('');
  };

  // Animações de canvas: estrelas estáticas e asteroides
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let asteroids = [];
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    // Cria estrelas de fundo
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5,
        alpha: Math.random()
      });
    }
    // Cria asteroides
    for (let i = 0; i < 5; i++) {
      asteroids.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random()-0.5)*0.5,
        vy: (Math.random()-0.5)*0.5,
        r: 2 + Math.random()*3
      });
    }

    function draw() {
      ctx.fillStyle = 'rgba(10,10,30,0.8)';
      ctx.fillRect(0, 0, W, H);

      // Desenha estrelas pulsantes
      stars.forEach(s => {
        s.alpha += (Math.random() - 0.5) * 0.02;
        s.alpha = Math.max(0.2, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });

      // Desenha asteroides
      asteroids.forEach(a => {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, 2*Math.PI);
        ctx.fillStyle = 'rgba(200,200,200,0.6)';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Canvas de fundo */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />

      {/* Formulário de desejo */}
      <form
        onSubmit={enviarDesejo}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2"
      >
        <input
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Digite seu desejo..."
          className="px-4 py-2 rounded-lg border border-purple-400 bg-white/80 focus:outline-none backdrop-blur-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          ✨
        </button>
      </form>

      {/* Estrelas cadentes */}
      {desejos.map(d => (
        <div
          key={d.id}
          className="absolute text-white text-4xl z-10"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            transform: 'translate(-50%,0)',
            animation: 'voarDesejo 3s ease-out forwards'
          }}
          title={d.texto}
        >
          ⭐
        </div>
      ))}

      {/* Keyframes inline */}
      <style jsx global>{`
        @keyframes voarDesejo {
          0%   { transform: translate(-50%, 0) scale(1); opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(-50%, -120vh) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
