// client/src/components/LinhaDoTempo.jsx

import React, { useRef, useEffect } from 'react';

export default function LinhaDoTempo({ eventos }) {
  const containerRef = useRef(null);

  // Opcional: ao montar, rola até o fim
  useEffect(() => {
    const c = containerRef.current;
    c.scrollLeft = c.scrollWidth;
  }, []);

  return (
    <div className="relative py-8">
      {/* Botão voltar */}
      <button
        onClick={() => containerRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white/80 rounded-full shadow hover:bg-white"
        aria-label="Voltar"
      >
        ‹
      </button>

      {/* Wrapper de scroll */}
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
      >
        {/* Container flexível */}
        <div className="inline-flex items-center space-x-16 px-16 relative z-10">
          {eventos.map((e, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center snap-center"
              style={{ minWidth: '160px' }}
            >
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse-slow mb-2" />
              <p className="font-semibold text-purple-700 whitespace-nowrap">
                {e.date}
              </p>
              <p className="text-sm text-gray-800 whitespace-nowrap">
                {e.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Botão avançar */}
      <button
        onClick={() => containerRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white/80 rounded-full shadow hover:bg-white"
        aria-label="Avançar"
      >
        ›
      </button>
    </div>
  );
}
