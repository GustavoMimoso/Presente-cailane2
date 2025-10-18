// client/src/components/BorboletasAnimadas.jsx

import React, { useEffect, useState } from 'react';

export default function BorboletasAnimadas() {
  const [borboletas, setBorboletas] = useState([]);

  useEffect(() => {
    // cria 10 borboletas com parâmetros aleatórios
    const arr = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      top: Math.random() * 80 + 10,         // posição vertical (%)
      delay: Math.random() * 5,             // delay antes de começar
      duration: 8 + Math.random() * 7       // duração do voo
    }));
    setBorboletas(arr);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {borboletas.map(b => (
        <div
          key={b.id}
          className="absolute text-pink-400 text-3xl transform"
          style={{
            top: `${b.top}vh`,
            animation: `voar ${b.duration}s ease-in-out ${b.delay}s infinite`
          }}
        >
          🦋
        </div>
      ))}
    </div>
  );
}
