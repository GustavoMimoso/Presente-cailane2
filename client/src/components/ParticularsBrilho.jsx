import React, { useEffect, useState } from 'react';

/**
 * Partículas de brilho contínuas
 */
export default function ParticularsBrilho({ modoNoturno }) {
  const [p, setP] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const part = {
        id: Date.now(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 3 + 2,
      };
      setP((prev) => [...prev.slice(-50), part]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {p.map((part) => (
        <div
          key={part.id}
          className="absolute rounded-full"
          style={{
            left: `${part.left}vw`,
            top: `${part.top}vh`,
            width: `${part.size}px`,
            height: `${part.size}px`,
            background: modoNoturno ? 'white' : 'pink',
            opacity: 0.7,
            animation: `sparkle ${part.duration}s ease-out forwards`,
            zIndex: 1,
          }}
        />
      ))}
    </>
  );
}
