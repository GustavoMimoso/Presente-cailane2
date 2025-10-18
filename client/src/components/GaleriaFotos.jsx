import React from 'react';

/**
 * Galeria de Fotos Interativa
 * Exibe imagens em grid com lightbox simples ao clicar
 */
export default function GaleriaFotos() {
  const fotos = [
    { src: '/fotos/foto1.jpg', alt: 'Nosso primeiro encontro' },
    { src: '/fotos/foto2.jpg', alt: 'Viagem inesquecível' },
    { src: '/fotos/foto3.jpg', alt: 'Noite especial' },
    { src: '/fotos/foto4.jpg', alt: 'Momentos divertidos' },
    { src: '/fotos/foto5.jpg', alt: 'Dia de aventura' },
    { src: '/fotos/foto6.jpg', alt: 'Passeio romântico' },
  ];

  const [lightbox, setLightbox] = React.useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 animate-fadeIn">
        {fotos.map((foto, idx) => (
          <img
            key={idx}
            src={foto.src}
            alt={foto.alt}
            className="w-full h-48 object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => setLightbox(foto)}
          />
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-3xl max-h-full rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
