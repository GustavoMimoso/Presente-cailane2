import React, { useEffect, useState } from 'react';

export default function BorboletasAnimadas() {
  const [b,setB]=useState([]);
  useEffect(()=>{
    const iv=setInterval(()=>{
      const n={id:Date.now(), top:Math.random()*80+10, left:Math.random()*100, d:Math.random()*10+5};
      setB(prev=>[...prev.slice(-20),n]);
    },800);
    return()=>clearInterval(iv);
  },[]);
  return (
    <>
      {b.map(b=>(
        <div key={b.id} className="absolute text-yellow-300 text-2xl" style={{
          left:`${b.left}vw`,top:`${b.top}vh`,animation:`voar ${b.d}s ease-in-out forwards`
        }}>🦋</div>
      ))}
    </>
  );
}
