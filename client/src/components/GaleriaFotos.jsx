// client/src/components/GaleriaFotos.jsx

import React, { useState } from 'react';

export default function GaleriaFotos() {
  const fotos = Array.from({ length: 52 }).map((_, i) => ({
    src: `/fotos/foto${i + 1}.jpg`,
    alt: `Momento ${i + 1}`
  }));

  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {fotos.map((foto, idx) => {
          const angle = (Math.random() - 0.5) * 10; // girinho aleatório
          return (
            <div
              key={idx}
              className="relative bg-white p-2 pb-6 shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
              style={{
                width: '200px',
                transform: `rotate(${angle}deg)`,
              }}
              onClick={() => setLightbox(foto)}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-auto object-cover"
                style={{ maxHeight: '180px' }}
              />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-700">
                {foto.alt}
              </div>
            </div>
          );
        })}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setLightbox(null)}
        >
          <div className="bg-white p-4 rounded-lg shadow-2xl">
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto object-contain"
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            />
            <p className="mt-2 text-center text-gray-800">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
