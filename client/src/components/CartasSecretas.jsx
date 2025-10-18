import React, { useState } from 'react';

/**
 * Envelopes que abrem mensagens ao clicar
 */
export default function CartasSecretas() {
  const cartas = [
    { id: 1, texto: 'Você é meu raio de sol em dias nublados.' },
    { id: 2, texto: 'Cada momento ao seu lado é um tesouro.' },
    { id: 3, texto: 'Obrigado por me amar como sou.' },
    { id: 4, texto: 'Prometo te fazer feliz todos os dias.' },
  ];

  const [abertas, setAbertas] = useState([]);

  const toggle = (id) => {
    setAbertas((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4">
      {cartas.map((carta) => {
        const aberta = abertas.includes(carta.id);
        return (
          <div
            key={carta.id}
            className="relative w-48 h-32 cursor-pointer"
            onClick={() => toggle(carta.id)}
          >
            <div
              className={`absolute inset-0 bg-white rounded-lg shadow-lg transition-transform duration-500 ${
                aberta ? 'transform rotateX-180' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="backface-hidden flex items-center justify-center p-4">
                <p className="text-pink-700 text-center">{carta.texto}</p>
              </div>
            </div>
            <div
              className={`absolute inset-0 bg-pink-100 rounded-lg shadow-inner transition-transform duration-500 ${
                aberta ? 'transform rotateX-0' : 'transform rotateX(180deg)'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            />
          </div>
        );
      })}
    </div>
  );
}
