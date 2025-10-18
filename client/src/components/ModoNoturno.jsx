import React from 'react';

export default function ModoNoturno({modoNoturno,setModoNoturno}){
  return (
    <button onClick={()=>setModoNoturno(!modoNoturno)} className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 z-50">
      {modoNoturno?'☀️':'🌙'}
    </button>
  );
}
