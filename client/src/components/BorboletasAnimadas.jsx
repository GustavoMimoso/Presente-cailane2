import React, { useEffect, useState } from 'react';

/**
 * Borboletas voando pela tela
 */
export default function BorboletasAnimadas() {
  const [borboletas, setBorboletas] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const b = {
        id: Date.now(),
        top: Math.random() * 80 + 10,
        left: Math.random() * 100,
        duration: Math.random() * 10 + 5,
      };
      setBorboletas((prev) => [...prev.slice(-20), b]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {borboletas.map((b) => (
        <div
          key={b.id}
          className="absolute text-yellow-300 text-2xl"
          style={{
            left: `${b.left}vw`,
            top: `${b.top}vh`,
            animation: `voar ${b.duration}s ease-in-out forwards`,
          }}
        >
          🦋
        </div>
      ))}
    </>
  );
}
