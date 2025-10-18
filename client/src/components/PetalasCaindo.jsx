import React, { useEffect, useState } from 'react';

/**
 * Pétalas caindo com efeito de vento
 */
export default function PetalasCaindo() {
  const [petalas, setPetalas] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nova = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 5 + 5,
      };
      setPetalas((prev) => [...prev.slice(-30), nova]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {petalas.map((p) => (
        <div
          key={p.id}
          className="absolute bg-pink-200 rounded-full opacity-75"
          style={{
            left: `${p.left}vw`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            bottom: '100vh',
            animation: `cair ${p.duration}s linear forwards`,
          }}
        />
      ))}
    </>
  );
}
