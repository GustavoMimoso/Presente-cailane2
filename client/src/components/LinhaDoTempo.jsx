import React from 'react';

/**
 * Timeline de eventos desde dataInicio
 */
export default function LinhaDoTempo({ dataInicio }) {
  const eventos = [
    { date: '2024-10-18', title: 'Primeiro encontro' },
    { date: '2024-12-25', title: 'Primeiro Natal juntos' },
    { date: '2025-02-14', title: 'Primeiro Valentine' },
    { date: '2025-07-01', title: 'Viagem de férias' },
    // Adicione mais conforme desejar
  ];

  return (
    <div className="relative border-l-2 border-pink-300 ml-8 pl-4 animate-fadeIn">
      {eventos.map((e, i) => (
        <div key={i} className="mb-8 ml-4">
          <div className="absolute -left-5 w-3 h-3 bg-pink-500 rounded-full mt-1" />
          <p className="font-semibold text-pink-700">{e.date}</p>
          <p className="text-lg">{e.title}</p>
        </div>
      ))}
    </div>
  );
}
