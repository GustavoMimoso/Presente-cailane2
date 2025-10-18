// client/src/components/PetalasCaindo.jsx

import React, { useEffect, useState } from 'react';

export default function PetalasCaindo() {
  const [petalas, setPetalas] = useState([]);

  useEffect(() => {
    // cria 30 pétalas com posições e delays aleatórios
    const arr = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,            // posição horizontal inicial (%)
      delay: Math.random() * 5,             // delay antes de começar
      duration: 5 + Math.random() * 5       // duração da queda
    }));
    setPetalas(arr);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petalas.map(p => (
        <div
          key={p.id}
          className="absolute text-purple-200 text-2xl transform"
          style={{
            left: `${p.left}vw`,
            animation: `cair ${p.duration}s linear ${p.delay}s infinite`,
            bottom: '100vh'
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
}
