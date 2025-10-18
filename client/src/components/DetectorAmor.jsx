import React, { useState } from 'react';

export default function DetectorAmor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [descobertos, setDescobertos] = useState([]);

  const tesourosPosicoes = [
    { id: 1, x: 20, y: 30, mensagem: 'Você é minha luz ✨', raio: 100 },
    { id: 2, x: 80, y: 40, mensagem: 'Te amo infinito 💜', raio: 100 },
    { id: 3, x: 50, y: 60, mensagem: 'Meu coração é seu para sempre 💕', raio: 100 },
    { id: 4, x: 30, y: 75, mensagem: 'Para sempre juntos 🌟', raio: 100 },
    { id: 5, x: 70, y: 80, mensagem: 'Você é meu 💖', raio: 100 },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x, y });

    // Verificar proximidade com tesouros
    tesourosPosicoes.forEach(tesouro => {
      const distX = Math.abs(x - tesouro.x);
      const distY = Math.abs(y - tesouro.y);
      const dist = Math.sqrt(distX ** 2 + distY ** 2);
      
      if (dist < 10 && !descobertos.includes(tesouro.id)) {
        setDescobertos([...descobertos, tesouro.id]);
      }
    });
  };

  const calcularIntensidade = (tesouro) => {
    const distX = Math.abs(cursorPos.x - tesouro.x);
    const distY = Math.abs(cursorPos.y - tesouro.y);
    const dist = Math.sqrt(distX ** 2 + distY ** 2);
    return Math.max(0, 1 - (dist / 30));
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 flex flex-col items-center justify-center cursor-none overflow-hidden"
    >
      <div className="text-center mb-8 z-10">
        <h2 className="text-5xl font-cursive text-purple-100 mb-4">
          Detector de Amor 💕
        </h2>
        <p className="text-xl text-purple-200">
          Mova o cursor para encontrar mensagens escondidas
        </p>
        <p className="text-sm text-purple-300 mt-2">
          Encontradas: {descobertos.length} / {tesourosPosicoes.length}
        </p>
      </div>

      {/* Cursor personalizado */}
      <div
        className="absolute pointer-events-none z-50"
        style={{
          left: `${cursorPos.x}%`,
          top: `${cursorPos.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          <div className="w-8 h-8 bg-pink-500 rounded-full animate-ping absolute opacity-75" />
          <div className="w-8 h-8 bg-pink-400 rounded-full" />
        </div>
      </div>

      {/* Tesouros escondidos */}
      {tesourosPosicoes.map(tesouro => {
        const intensidade = calcularIntensidade(tesouro);
        const descoberto = descobertos.includes(tesouro.id);
        
        return (
          <div
            key={tesouro.id}
            className="absolute transition-all duration-300"
            style={{
              left: `${tesouro.x}%`,
              top: `${tesouro.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: descoberto ? 1 : intensidade * 0.5
            }}
          >
            {descoberto ? (
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 animate-fadeIn shadow-2xl">
                <p className="text-2xl text-white font-semibold text-center">
                  {tesouro.mensagem}
                </p>
              </div>
            ) : (
              <div 
                className="w-16 h-16 rounded-full bg-pink-500/30"
                style={{
                  boxShadow: `0 0 ${intensidade * 50}px rgba(236, 72, 153, ${intensidade})`,
                  transform: `scale(${1 + intensidade * 0.5})`
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
