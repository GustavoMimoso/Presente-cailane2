import React from 'react';

/**
 * Botão para alternar tema dia/noite
 */
export default function ModoNoturno({ modoNoturno, setModoNoturno }) {
  return (
    <button
      onClick={() => setModoNoturno(!modoNoturno)}
      className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-lg z-50"
    >
      {modoNoturno ? '☀️' : '🌙'}
    </button>
  );
}
