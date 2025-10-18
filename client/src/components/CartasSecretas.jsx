// client/src/components/CartasSecretas.jsx

import React, { useState } from 'react';

export default function CartasSecretas() {
  const mensagens = [
    'Adoro seu sorriso',
    'Você me inspira todo dia',
    'Seu abraço é meu lar',
    'Amo seu jeito de rir',
    'Você acredita em mim',
    'Seu olhar ilumina meu mundo',
    'Adoro nossas conversas',
    'Você é minha melhor amiga',
    'Seu cheiro me acalma',
    'Amo seu jeito de cuidar de mim',
    'Você é minha motivação',
    'Seu toque me faz bem',
    'Adoro como me faz rir',
    'Você é meu apoio',
    'Amo nossos passeios juntos',
    'Você me entende',
    'Seu carinho me conforta',
    'Adoro seu jeito espontâneo',
    'Você é minha paz',
    'Amo sonhar com você',
    'Sua voz é música',
    'Você é minha metade',
    'Amo seu gosto musical',
    'Você me faz querer ser melhor',
    'Adoro seu senso de humor',
    'Você valoriza nossos momentos',
    'Amo sua generosidade',
    'Seu otimismo me anima',
    'Adoro suas ideias',
    'Você compartilha meus sonhos',
    'Amo seu jeito confiante',
    'Você me faz sentir seguro',
    'Adoro seu talento',
    'Você me faz feliz',
    'Amo nossa cumplicidade',
    'Você respira amor',
    'Adoro seu estilo',
    'Você me complementa',
    'Amo suas surpresas',
    'Você é única',
    'Adoro seu jeitinho',
    'Você me provoca orgulho',
    'Amo sua criatividade',
    'Você é minha aventura',
    'Adoro nossas memórias',
    'Você colore meus dias',
    'Amo seu abraço apertado',
    'Você é meu porto seguro',
    'Adoro seu olhar sincero',
    'Você faz meu coração bater mais forte'
  ];

  const [abertas, setAbertas] = useState([]);

  const toggleCarta = (idx) => {
    setAbertas(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 py-8">
      {mensagens.map((texto, idx) => {
        const aberta = abertas.includes(idx);
        return (
          <div
            key={idx}
            className="relative w-40 h-24 cursor-pointer perspective-600"
            onClick={() => toggleCarta(idx)}
          >
            {/* Verso (visível inicialmente) */}
            <div
              className={`absolute inset-0 bg-purple-100 rounded-lg shadow-inner backface-hidden transition-transform duration-700 ${aberta ? 'rotate-y-180' : 'rotate-y-0'}`}
              style={{ transformStyle: 'preserve-3d', zIndex: aberta ? 1 : 2 }}
            />

            {/* Face frontal (mensagem) */}
            <div
              className={`absolute inset-0 bg-white rounded-lg shadow-lg backface-hidden flex items-center justify-center p-4 transition-transform duration-700 ${aberta ? 'rotate-y-0' : 'rotate-y-180'}`}
              style={{ transformStyle: 'preserve-3d', zIndex: aberta ? 2 : 1 }}
            >
              <p className="text-purple-700 text-center text-sm">{texto}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
