// client/src/components/LinhaDoTempo.jsx

import React, { useRef, useEffect, useState } from 'react';

export default function LinhaDoTempo({ eventos }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Highlight center item on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const items = Array.from(container.querySelectorAll('.timeline-item'));
      const rects = items.map(el => el.getBoundingClientRect());
      const centerX = window.innerWidth / 2;
      const distances = rects.map(r => Math.abs(r.left + r.width / 2 - centerX));
      setActiveIndex(distances.indexOf(Math.min(...distances)));
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // Animated starfield background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, stars;
    const init = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = containerRef.current.offsetHeight;
      stars = Array.from({ length: 200 }).map(() => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random() * W,
        o: Math.random()
      }));
    };
    const draw = () => {
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(0, 0, W, H);
      stars.forEach(s => {
        s.z -= 2;
        if (s.z <= 0) {
          s.z = W;
          s.x = Math.random() * W;
          s.y = Math.random() * H;
        }
        const k = 128.0 / s.z;
        const px = (s.x - W/2) * k + W/2;
        const py = (s.y - H/2) * k + H/2;
        if (px >= 0 && px <= W && py >= 0 && py <= H) {
          const size = (1 - s.z/W) * 3;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, 2*Math.PI);
          ctx.fillStyle = `rgba(255,255,255,${s.o})`;
          ctx.fill();
        }
      });
      requestAnimationFrame(draw);
    };
    init();
    draw();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  return (
    <div className="relative py-12">
      {/* Starfield canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Timeline */}
      <div
        ref={containerRef}
        className="relative overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-8 z-10"
      >
        <div className="inline-flex items-center space-x-8 py-8">
          {eventos.map((e, i) => (
            <div
              key={i}
              className={`
                timeline-item snap-center flex-shrink-0
                bg-white/30 backdrop-blur-lg p-6 rounded-xl
                transition-transform duration-500
                ${activeIndex === i
                  ? 'scale-110 shadow-2xl border border-white/60'
                  : 'scale-90 opacity-60'}
              `}
              style={{ minWidth: '260px' }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-5 h-5 bg-purple-400 rounded-full mr-2 animate-pulse" />
                <span className="font-bold text-purple-100">{e.date}</span>
              </div>
              <p className="text-center text-white">{e.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => containerRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full shadow-lg hover:bg-white/30 z-20"
      >
        ‹
      </button>
      <button
        onClick={() => containerRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full shadow-lg hover:bg-white/30 z-20"
      >
        ›
      </button>
    </div>
  );
}
