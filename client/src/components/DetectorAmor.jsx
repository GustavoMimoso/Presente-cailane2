// client/src/components/DetectorAmor.jsx

import React, { useState, useEffect, useRef } from 'react';

export default function DetectorAmor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [found, setFound] = useState([]);
  const canvasRef = useRef(null);

  const treasures = [
    { id: 1, x: 20, y: 30, msg: 'Você é minha luz ✨' },
    { id: 2, x: 80, y: 40, msg: 'Te amo infinito 💜' },
    { id: 3, x: 50, y: 60, msg: 'Meu coração é seu para sempre 💕' },
    { id: 4, x: 30, y: 75, msg: 'Para sempre juntos 🌟' },
    { id: 5, x: 70, y: 80, msg: 'Você é meu 💖' },
  ];

  // Animated heart particles background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, hearts;

    function init() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      hearts = Array.from({ length: 40 }).map(() => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: 10 + Math.random() * 10,
        vy: 0.5 + Math.random(),
        alpha: 0.3 + Math.random() * 0.4,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.02,
      }));
    }

    function drawHeart(x, y, size, alpha, rot) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'pink';
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.bezierCurveTo(size / 2, -size, size, -size / 4, 0, size);
      ctx.bezierCurveTo(-size, -size / 4, -size / 2, -size, 0, -size / 2);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      hearts.forEach(h => {
        h.y -= h.vy;
        h.rot += h.vrot;
        if (h.y + h.size < 0) h.y = H + h.size;
        drawHeart(h.x, h.y, h.size, h.alpha, h.rot);
      });
      requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x, y });
    treasures.forEach(t => {
      const dx = x - t.x;
      const dy = y - t.y;
      const d = Math.hypot(dx, dy);
      if (d < 7 && !found.includes(t.id)) {
        setFound(prev => [...prev, t.id]);
      }
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden cursor-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Custom cursor */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          left: `${cursorPos.x}%`,
          top: `${cursorPos.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-6 h-6 bg-red-400 rounded-full animate-ping" />
        <div className="w-4 h-4 bg-red-500 rounded-full -mt-5 -ml-1" />
      </div>

      {/* Messages */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-30 text-white space-y-2">
        <h2 className="text-4xl font-cursive">Detector de Amor 💕</h2>
        <p className="text-lg">Movimente o cursor para revelar</p>
        <p className="text-sm">Encontradas: {found.length} / {treasures.length}</p>
      </div>

      {/* Revealed treasures */}
      {treasures.map(t => {
        const discovered = found.includes(t.id);
        return (
          <div
            key={t.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 z-20 ${
              discovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
          >
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg animate-fadeIn">
              <p className="text-purple-900 font-semibold">{t.msg}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
