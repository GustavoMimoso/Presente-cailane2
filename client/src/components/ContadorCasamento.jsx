import React, { useState, useEffect } from 'react';

/**
 * Contagem regressiva até dataCasamento
 */
export default function ContadorCasamento({ dataCasamento }) {
  const calcRegressiva = () => {
    const agora = new Date();
    const diff = dataCasamento - agora;
    if (diff <= 0) return { anos: 0, dias: 0, horas: 0, minutos: 0, segundos: 0 };
    const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);
    return { anos, dias, horas, minutos, segundos };
  };

  const [tempo, setTempo] = useState(calcRegressiva());

  useEffect(() => {
    const interval = setInterval(() => setTempo(calcRegressiva()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 text-center text-purple-900 animate-fadeIn">
      <p className="text-2xl font-bold">Faltam</p>
      <div className="flex space-x-4">
        <div>
          <p className="text-3xl font-bold">{tempo.anos}</p>
          <p className="uppercase text-sm">Anos</p>
        </div>
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
    </div>
  );
}
