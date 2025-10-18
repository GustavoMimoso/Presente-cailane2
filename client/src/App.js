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

export default function App() {
  const [showTulips, setShowTulips] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [open, setOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showCartas, setShowCartas] = useState(false);
  const [modoNoturno, setModoNoturno] = useState(false);
  const audioRef = useRef(null);
  const svgRef = useRef(null);
  const nome = 'Gustavo Mimoso';

  const dataEncontro = new Date('2024-10-18');

  const handleClick = () => {
    setShowTulips(true);
    setOpen(true);
    
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Autoplay bloqueado:', err));
    }
    
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        setHearts(prev => [...prev, { id: Date.now() + i, left: Math.random() * 100, size: Math.random() * 20 + 30 }]);
      }, i * 150);
    }

    setTimeout(() => setShowGallery(true), 3000);
    setTimeout(() => setShowTimeline(true), 5000);
    setTimeout(() => setShowCartas(true), 7000);
  };

  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => setHearts([]), 6000);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  return (
    <div className={`app-container ${modoNoturno ? 'night-mode' : 'day-mode'}`}>
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

        <RosaPerfeita 
          svgRef={svgRef} 
          open={open} 
          onClick={handleClick}
          modoNoturno={modoNoturno}
        />

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
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Meu amor, gostaria de falar algumas coisas, quero agradecer tudo o que você me proporcionou neste nosso primeiro ano juntos, onde tive várias experiências únicas e que não gostaria de ter tido com ninguém além de você. Mal posso esperar pelos próximos anos, você me faz extremamente feliz e motivado para seguir lutando dia após o outro, eu te amo muito e nosso amor vai durar para todo o sempre. ❤️
            </p>
          )}
        </div>

        {showTulips && (
          <div className="mt-8 z-10">
            <ContadorTempo dataInicio={dataEncontro} />
          </div>
        )}

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
        <section className="section-full bg-gradient-to-b from-purple-300 to-purple-100 py-20">
          <h2 className="text-5xl font-cursive text-center text-purple-900 mb-12 animate-fadeIn">
            Nossa História de Amor 💕
          </h2>
          <LinhaDoTempo dataInicio={dataEncontro} />
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
              Mal posso esperar para passar o resto da minha vida ao seu lado, meu amor. <br/>Cada dia contigo é um presente, e estou ansioso para todos os momentos que ainda viveremos juntos.<br/>
              Te amo infinitamente! 💖✨
            </p>
            <p className="text-2xl font-cursive text-purple-200 mt-8">
              Com todo meu amor,<br/>
              <span className="text-4xl">{nome}</span>
            </p>
          </div>
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
