import React, { useState, useEffect } from 'react';

export default function ContadorTempo({ dataInicio }) {
  const calc = () => {
    const now = new Date();
    const diff = now - dataInicio;
    const dias = Math.floor(diff / (1000*60*60*24));
    const horas = Math.floor((diff / (1000*60*60)) % 24);
    const minutos = Math.floor((diff / (1000*60)) % 60);
    const segundos = Math.floor((diff/1000) % 60);
    return { dias, horas, minutos, segundos };
  };

  const [t, setT] = useState(calc());
  useEffect(() => {
    const iv = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="flex space-x-6 text-center text-purple-700 animate-fadeIn">
      <div><p className="text-3xl font-bold">{t.dias}</p><p className="uppercase text-sm">Dias</p></div>
      <div><p className="text-3xl font-bold">{t.horas}</p><p className="uppercase text-sm">Horas</p></div>
      <div><p className="text-3xl font-bold">{t.minutos}</p><p className="uppercase text-sm">Minutos</p></div>
      <div><p className="text-3xl font-bold">{t.segundos}</p><p className="uppercase text-sm">Segundos</p></div>
    </div>
  );
}
