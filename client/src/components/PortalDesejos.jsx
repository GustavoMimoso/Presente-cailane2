import React, { useState, useEffect } from 'react';

export default function PortalDesejos() {
  const [desejo, setDesejo] = useState('');
  const [desejos, setDesejos] = useState([]);
  const [mostrarInput, setMostrarInput] = useState(true);

  const enviarDesejo = () => {
    if (desejo.trim()) {
      const novoDesejo = {
        id: Date.now(),
        texto: desejo,
        left: Math.random() * 80 + 10,
        top: Math.random() * 30 + 20
      };
      setDesejos([...desejos, novoDesejo]);
      setDesejo('');
      
      // Remover desejo após animação
      setTimeout(() => {
        setDesejos(prev => prev.filter(d => d.id !== novoDesejo.id));
      }, 5000);

      // Aqui você pode enviar para um backend/email se quiser
      console.log('Desejo enviado:', novoDesejo.texto);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8 z-10">
        <h2 className="text-5xl font-cursive text-purple-100 mb-4 animate-fadeIn">
          Portal de Desejos 🌠
        </h2>
        <p className="text-xl text-purple-200">
          Feche os olhos, faça um desejo e veja ele voar para as estrelas...
        </p>
      </div>

      {/* Campo de input */}
      {mostrarInput && (
        <div className="z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md w-full animate-fadeIn">
          <textarea
            value={desejo}
            onChange={(e) => setDesejo(e.target.value)}
            placeholder="Digite seu desejo aqui..."
            className="w-full h-32 p-4 rounded-lg bg-purple-50 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && enviarDesejo()}
          />
          <button
            onClick={enviarDesejo}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Enviar para as Estrelas ✨
          </button>
        </div>
      )}

      {/* Desejos voando */}
      {desejos.map(d => (
        <div
          key={d.id}
          className="absolute text-yellow-200 text-2xl pointer-events-none"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            animation: 'voarEstrela 5s ease-out forwards',
            textShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
          }}
        >
          ⭐
        </div>
      ))}

      {/* Céu estrelado de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `piscar ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
