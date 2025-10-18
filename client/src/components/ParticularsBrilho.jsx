import React, { useEffect, useState } from 'react';

export default function ParticularsBrilho({modoNoturno}){
  const [p,setP]=useState([]);
  useEffect(()=>{
    const iv=setInterval(()=>{
      const n={id:Date.now(),left:Math.random()*100,top:Math.random()*100,size:Math.random()*6+2,d:Math.random()*3+2};
      setP(prev=>[...prev.slice(-50),n]);
    },200);
    return()=>clearInterval(iv);
  },[]);
  return (
    <>
      {p.map(p=>(
        <div key={p.id} className="absolute rounded-full" style={{
          left:`${p.left}vw`,top:`${p.top}vh`,width:`${p.size}px`,height:`${p.size}px`,
          background: modoNoturno?'white':'#9d7ace',opacity:0.7,
          animation:`sparkle ${p.d}s ease-out forwards`,zIndex:1
        }}/>
      ))}
    </>
  );
}
