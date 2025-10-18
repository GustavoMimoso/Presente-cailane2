// client/src/App.js

import React, { useState, useEffect, useRef } from 'react';
import RosaPerfeita from './components/RosaPerfeita';
import TulipasLaterais from './components/TulipasLaterais';
import GaleriaFotos from './components/GaleriaFotos';
import ContadorTempo from './components/ContadorTempo';
import ContadorCasamento from './components/ContadorCasamento';
import CartasSecretas from './components/CartasSecretas';
import PetalasCaindo from './components/PetalasCaindo';
import BorboletasAnimadas from './components/BorboletasAnimadas';
import ModoNoturno from './components/ModoNoturno';
import LinhaDoTempo from './components/LinhaDoTempo';
import ParticularsBrilho from './components/ParticularsBrilho';
import PortalDesejos from './components/PortalDesejos';
import ArvoreMemoria from './components/ArvoreMemoria';
import DetectorAmor from './components/DetectorAmor';

export default function App() {
  const [showTulips, setShowTulips] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [open, setOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showCartas, setShowCartas] = useState(false);
  const [modoNoturno, setModoNoturno] = useState(false);
  const audioRef = useRef(null);
  const nome = 'Gustavo Mimoso';
  const dataEncontro = new Date('2024-10-18');

  const handleClick = () => {
    setShowTulips(true);
    setOpen(true);
    if (audioRef.current) audioRef.current.play().catch(() => {});
    for (let i = 0; i < 25; i++) {
      setTimeout(() =>
        setHearts(prev => [...prev, {
          id: Date.now() + i,
          left: Math.random() * 100,
          size: Math.random() * 20 + 30
        }])
      , i * 150);
    }
    setTimeout(() => setShowGallery(true), 3000);
    setTimeout(() => setShowTimeline(true), 5000);
    setTimeout(() => setShowCartas(true), 7000);
  };

  useEffect(() => {
    if (hearts.length > 0) {
      const t = setTimeout(() => setHearts([]), 6000);
      return () => clearTimeout(t);
    }
  }, [hearts]);

  return (
    <div className={`app-container ${modoNoturno ? 'night-mode' : ''}`}>
      <audio ref={audioRef} loop>
        <source src="/musica-romantica.mp3" type="audio/mpeg" />
      </audio>

      <ModoNoturno modoNoturno={modoNoturno} setModoNoturno={setModoNoturno} />
      <ParticularsBrilho modoNoturno={modoNoturno} />
      <PetalasCaindo />
      <BorboletasAnimadas />

      <section className="section-full flex flex-col items-center justify-center relative">
        <div
          className="absolute rounded-full bg-purple-500 blur-3xl opacity-30 transition-all duration-1000"
          style={{
            width: open ? '700px' : '500px',
            height: open ? '700px' : '500px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            animation: 'pulseGlow 4s ease-in-out infinite'
          }}
        />
        {showTulips && <TulipasLaterais />}

        <RosaPerfeita open={open} onClick={handleClick} modoNoturno={modoNoturno} />

        <div className="mt-12 max-w-3xl text-purple-900 font-semibold text-lg px-6 z-10 transition-all duration-1000">
          {!showTulips ? (
            <p
              className="text-5xl tracking-wide drop-shadow-2xl transition-all duration-1000"
              style={{
                fontFamily: 'cursive',
                textShadow: '0 0 20px rgba(197, 134, 255, 0.6)',
                animation: 'textGlow 3s ease-in-out infinite'
              }}
            >
              Um presente para meu grande amor Cailane 💜
            </p>
          ) : (
            <p
              className="text-2xl font-serif leading-relaxed animate-fadeIn"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              Meu amor... eu te amo muito e nosso amor vai durar para todo o sempre. ❤️
            </p>
          )}
        </div>

        {showTulips && <ContadorTempo dataInicio={dataEncontro} />}

        {hearts.map(({ id, left, size }) => (
          <div
            key={id}
            className="absolute text-purple-500 animate-float pointer-events-none"
            style={{
              left: `${left}vw`,
              bottom: 0,
              fontSize: `${size}px`,
              zIndex: 20,
              filter: 'drop-shadow(0 0 8px rgba(147, 112, 219, 0.6))'
            }}
          >
            💜
          </div>
        ))}

        {showTulips && (
          <div className="absolute bottom-8 animate-bounce z-10">
            <p className="text-purple-600 text-sm mb-2">Role para baixo</p>
            <div className="text-4xl">⬇️</div>
          </div>
        )}
      </section>

      {showGallery && (
        <section className="section-full bg-gradient-to-b from-purple-100 to-purple-300 py-20">
          <h2 className="text-5xl font-cursive text-center text-purple-800 mb-12 animate-fadeIn">
            Nossos Momentos Especiais 📸
          </h2>
          <GaleriaFotos />
        </section>
      )}

      {showTimeline && (
        <section className="section-full bg-gradient-to-b from-purple-100 to-purple-50 py-20">
          <h2 className="text-5xl font-cursive text-center text-purple-800 mb-12 animate-fadeIn">
            Nossa História de Amor 💕
          </h2>
          <LinhaDoTempo
            eventos={[
              { date: '18/10/2024', title: 'Primeiro encontro' },
              { date: '26/10/2024', title: 'Segundo Encontro' },
              { date: '27/10/2024', title: 'Primeiro filme em casa' },
              { date: '06/11/2024', title: 'Encontro hanza' },
              { date: '14/11/2024', title: 'Presente Ursinho + Rosa' },
              { date: '30/11/2024', title: 'Primeiro toque juntos' },
              { date: '21/12/2024', title: 'Totoro chegou + Date' },
              { date: '22/12/2024', title: 'Praia com seus pais' },
              { date: '25/12/2024', title: 'Primeiro natal juntos' },
              { date: '01/01/2025', title: 'Primeiro ano novo juntos' },
              { date: '05/01/2025', title: 'Piquenique no parque' },
              { date: '02/02/2025', title: 'Saímos com minha mãe para cachoeira' },
              { date: '08/02/2025', title: 'Jantar Romântico para o pedido de namoro' },
              { date: '12/02/2025', title: 'Café Kenedy' },
              { date: '17/02/2025', title: 'Encontro Surpresa' },
              { date: '19/02/2025', title: 'Outro encontro surpresa' },
              { date: '02/03/2025', title: 'Nossa primeira praia com nosso carro' },
              { date: '06/04/2025', title: 'Primeiro parque de diversão juntos' },
              { date: '13/06/2025', title: 'Pedido de casamento' },
              { date: '27/06/2025', title: 'Primeiro dia na nossa casa' },
              { date: '18/10/2025', title: 'Um ano juntos (Primeiro de Muitos)' }
            ]}
          />
        </section>
      )}

      {showCartas && (
        <section className="section-full bg-gradient-to-b from-purple-100 to-purple-400 py-20">
          <h2 className="text-5xl font-cursive text-center text-purple-800 mb-12 animate-fadeIn">
            Mensagens do Coração 💌
          </h2>
          <CartasSecretas />
        </section>
      )}

      {showCartas && (
        <section className="section-full bg-gradient-to-b from-purple-400 to-purple-500 py-20 flex flex-col items-center justify-center">
          <h2 className="text-5xl font-cursive text-center text-purple-100 mb-12 animate-fadeIn">
            Contagem Regressiva para o Nosso Casamento 💍
          </h2>
          <ContadorCasamento dataCasamento={new Date('2029-10-18')} />
          <div className="mt-16 max-w-2xl text-center animate-fadeIn">
            <p className="text-3xl font-serif text-purple-100 leading-relaxed">
              Mal posso esperar para passar o resto da minha vida ao seu lado… ❤️✨
            </p>
            <p className="text-2xl font-cursive text-purple-200 mt-8">
              Com todo meu amor,<br />
              <span className="text-4xl">{nome}</span>
            </p>
          </div>
        </section>
      )}

      {showCartas && (
        <section className="section-full">
          <PortalDesejos />
        </section>
      )}

      {showCartas && (
        <section className="section-full">
          <ArvoreMemoria />
        </section>
      )}

      {showCartas && (
        <section className="section-full">
          <DetectorAmor />
        </section>
      )}

      {showCartas && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 hover:scale-110"
          style={{ width: '60px', height: '60px' }}
        >
          🔄
        </button>
      )}
    </div>
  );
}
