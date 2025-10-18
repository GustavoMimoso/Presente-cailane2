import React, { useState, useEffect } from 'react';

export default function ContadorCasamento({ dataCasamento }) {
  const calc = () => {
    const now = new Date();
    const diff = dataCasamento - now;
    if (diff <= 0) return { anos:0,dias:0,horas:0,minutos:0,segundos:0 };
    const anos = Math.floor(diff/(1000*60*60*24*365));
    const dias = Math.floor((diff%(1000*60*60*24*365))/(1000*60*60*24));
    const horas = Math.floor((diff/(1000*60*60))%24);
    const minutos = Math.floor((diff/(1000*60))%60);
    const segundos = Math.floor((diff/1000)%60);
    return { anos,dias,horas,minutos,segundos };
  };

  const [t, setT] = useState(calc());
  useEffect(() => {
    const iv = setInterval(() => setT(calc()),1000);
    return () => clearInterval(iv);
  },[]);

  return (
    <div className="flex flex-col items-center space-y-4 text-center text-purple-900 animate-fadeIn">
      <p className="text-2xl font-bold">Faltam</p>
      <div className="flex space-x-4">
        <div><p className="text-3xl font-bold">{t.anos}</p><p className="uppercase text-sm">Anos</p></div>
        <div><p className="text-3xl font-bold">{t.dias}</p><p className="uppercase text-sm">Dias</p></div>
        <div><p className="text-3xl font-bold">{t.horas}</p><p className="uppercase text-sm">Horas</p></div>
        <div><p className="text-3xl font-bold">{t.minutos}</p><p className="uppercase text-sm">Minutos</p></div>
        <div><p className="text-3xl font-bold">{t.segundos}</p><p className="uppercase text-sm">Segundos</p></div>
      </div>
    </div>
  );
}
