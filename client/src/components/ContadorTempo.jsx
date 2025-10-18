import React, { useState, useEffect } from 'react';

/**
 * Contador de tempo juntos desde dataInicio até agora
 */
export default function ContadorTempo({ dataInicio }) {
  const calcTempo = () => {
    const agora = new Date();
    const diff = agora - dataInicio;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);
    return { dias, horas, minutos, segundos };
  };

  const [tempo, setTempo] = useState(calcTempo());

  useEffect(() => {
    const interval = setInterval(() => setTempo(calcTempo()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex space-x-6 text-center text-pink-700 animate-fadeIn">
      <div>
        <p className="text-3xl font-bold">{tempo.dias}</p>
        <p className="uppercase text-sm">Dias</p>
      </div>
      <div>
        <p className="text-3xl font-bold">{tempo.horas}</p>
        <p className="uppercase text-sm">Horas</p>
      </div>
      <div>
        <p className="text-3xl font-bold">{tempo.minutos}</p>
        <p className="uppercase text-sm">Minutos</p>
      </div>
      <div>
        <p className="text-3xl font-bold">{tempo.segundos}</p>
        <p className="uppercase text-sm">Segundos</p>
      </div>
    </div>
  );
}
