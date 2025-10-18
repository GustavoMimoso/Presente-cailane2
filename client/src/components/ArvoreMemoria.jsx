// client/src/components/ArvoreMemoria.jsx

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function ArvoreMemoria() {
  const svgRef = useRef();
  const width = 800;
  const height = 600;

  const memorias = [
    { id: 1, texto: 'Primeiro encontro', emoji: '🌸' },
    { id: 2, texto: 'Primeira viagem', emoji: '🌺' },
    { id: 3, texto: 'Nosso primeiro beijo', emoji: '🌹' },
    { id: 4, texto: 'Primeiro eu te amo', emoji: '🌻' },
    { id: 5, texto: 'Dia especial', emoji: '🌼' },
    { id: 6, texto: 'Momento mágico', emoji: '🌷' },
    { id: 7, texto: 'Nossa selfie', emoji: '🍃' },
    { id: 8, texto: 'Surpresa romântica', emoji: '🍂' },
    { id: 9, texto: 'Pôr do sol juntos', emoji: '🍁' },
    { id: 10, texto: 'Café da manhã especial', emoji: '🍀' },
    { id: 11, texto: 'Noite de estrelas', emoji: '🌙' },
    { id: 12, texto: 'Planos futuros', emoji: '🌱' },
  ];

  useEffect(() => {
    // Criar SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Fundo animado de fogos (partículas explosivas)
    const canvas = d3
      .select('#fireworks')
      .attr('width', width)
      .attr('height', height)
      .node();
    const ctx = canvas.getContext('2d');
    let particles = [];

    function emitFirework() {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.5;
      const count = 30 + Math.random() * 30;
      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          r: 2 + Math.random() * 3,
          alpha: 1,
        });
      }
    }
    function drawFireworks() {
      ctx.clearRect(0, 0, width, height);
      if (Math.random() < 0.02) emitFirework();
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        if (p.alpha <= 0) particles.splice(i, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, ${200 + Math.random() * 55},  ${200}, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(drawFireworks);
    }
    drawFireworks();

    // Layout de árvore radial
    const root = d3.hierarchy({ children: memorias });
    const tree = d3.tree().size([2 * Math.PI, 220]);
    tree(root);

    const link = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height * 0.75})`)
      .selectAll('path')
      .data(root.links())
      .enter()
      .append('path')
      .attr('d', d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y))
      .attr('stroke', '#7c3aed')
      .attr('stroke-width', 3)
      .attr('fill', 'none')
      .attr('opacity', 0.7);

    const node = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height * 0.75})`)
      .selectAll('g')
      .data(root.descendants().slice(1))
      .enter()
      .append('g')
      .attr('transform', d => `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `);

    node
      .append('circle')
      .attr('r', 20)
      .attr('fill', '#fff')
      .attr('stroke', '#4c1d95')
      .attr('stroke-width', 4)
      .on('mouseover', (_, d) => {
        d3.select('#tooltip')
          .style('visibility', 'visible')
          .text(d.data.texto);
      })
      .on('mousemove', e => {
        d3.select('#tooltip')
          .style('top', `${e.pageY - 30}px`)
          .style('left', `${e.pageX + 10}px`);
      })
      .on('mouseout', () => {
        d3.select('#tooltip').style('visibility', 'hidden');
      });

    node
      .append('text')
      .attr('dy', '0.35em')
      .attr('x', d => (d.x < Math.PI ? 30 : -30))
      .attr('text-anchor', d => (d.x < Math.PI ? 'start' : 'end'))
      .attr('transform', d => (d.x >= Math.PI ? 'rotate(180)' : null))
      .text(d => d.data.emoji)
      .style('font-size', '24px')
      .style('cursor', 'pointer')
      .on('click', (_, d) => alert(d.data.texto));

  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Canvas para fogos de artifício */}
      <canvas id="fireworks" className="absolute inset-0 z-0" />
      {/* SVG da árvore radial */}
      <svg ref={svgRef} className="relative z-10" />
      {/* Tooltip */}
      <div
        id="tooltip"
        className="fixed px-3 py-1 bg-white text-purple-900 rounded shadow-lg pointer-events-none transition-opacity"
        style={{ visibility: 'hidden' }}
      />
    </div>
  );
}
