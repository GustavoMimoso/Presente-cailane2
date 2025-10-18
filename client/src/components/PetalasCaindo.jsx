import React, { useEffect, useState } from 'react';

export default function PetalasCaindo() {
  const [p,setP]=useState([]);
  useEffect(()=>{
    const iv=setInterval(()=>{
      const n={id:Date.now(),left:Math.random()*100,size:Math.random()*20+10,d:Math.random()*5+5};
      setP(prev=>[...prev.slice(-30),n]);
    },400);
    return()=>clearInterval(iv);
  },[]);
  return (
    <>
      {p.map(pet=>(
        <div key={pet.id} className="absolute bg-purple-300 rounded-full opacity-75" style={{
          left:`${pet.left}vw`,width:`${pet.size}px`,height:`${pet.size}px`,bottom:'100vh',
          animation:`cair ${pet.d}s linear forwards`
        }}/>
      ))}
    </>
  );
}
