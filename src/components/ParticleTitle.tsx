import React, { useEffect, useRef } from 'react';

const REPEL_RADIUS = 110;
const REPEL_STRENGTH = 10;
const SPRING = 0.055;
const FRICTION = 0.80;

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  phase: number;
}

export default function ParticleTitle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const init = async () => {
      await document.fonts.load("italic 80px 'Instrument Serif'");
      
      let w = (canvas.width = canvas.offsetWidth);
      let h = (canvas.height = 230);
      const fontSize = Math.min(w * 0.086, 90);
      
      const offCanvas = document.createElement('canvas');
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext('2d')!;
      
      offCtx.font = `italic ${fontSize}px 'Instrument Serif'`;
      offCtx.fillStyle = 'white';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      
      const leading = fontSize * 1.08;
      offCtx.fillText("The Website Your Brand", w / 2, h / 2 - leading * 0.4);
      offCtx.fillText("Deserves", w / 2, h / 2 + leading * 0.6);
      
      const pixels = offCtx.getImageData(0, 0, w, h).data;
      const particles: Particle[] = [];
      
      for (let y = 0; y < h; y += 3) {
        for (let x = 0; x < w; x += 3) {
          const alpha = pixels[(y * w + x) * 4 + 3];
          if (alpha > 100) {
            particles.push({
              x: Math.random() * w,
              y: Math.random() > 0.5 ? -50 : h + 50,
              tx: x,
              ty: y,
              vx: 0,
              vy: 0,
              r: Math.random() * 0.85 + 0.45,
              opacity: 0,
              phase: Math.random() * Math.PI * 2
            });
          }
        }
      }

      let animId: number;
      const loop = () => {
        ctx.clearRect(0, 0, w, h);
        
        particles.forEach((p) => {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < REPEL_RADIUS) {
            const angle = Math.atan2(dy, dx);
            const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
            p.vx -= Math.cos(angle) * force * REPEL_STRENGTH;
            p.vy -= Math.sin(angle) * force * REPEL_STRENGTH;
          }
          
          p.vx += (p.tx - p.x) * SPRING;
          p.vy += (p.ty - p.y) * SPRING;
          p.vx *= FRICTION;
          p.vy *= FRICTION;
          p.x += p.vx;
          p.y += p.vy;
          
          // Gentle breathing when settled
          if (Math.abs(p.x - p.tx) < 2 && Math.abs(p.y - p.ty) < 2) {
             p.x += Math.sin(p.phase) * 0.08;
             p.y += Math.cos(p.phase) * 0.08;
             p.phase += 0.02;
          }
          
          if (p.opacity < 1) p.opacity += 0.022;
          
          // Glow effect near cursor
          if (dist < 40) {
            const nearFactor = (40 - dist) / 40;
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * (1 + nearFactor)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * (1 + nearFactor * 2), 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        
        animId = requestAnimationFrame(loop);
      };
      
      loop();
      
      const handleResize = () => {
         // Simplify: just reload the component or re-init if needed
         // But for a landing page, typically layout is stable
      };
      window.addEventListener('resize', handleResize);
      
      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
      };
    };

    init();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseLeave = () => {
    mouse.current = { x: -9999, y: -9999 };
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ width: '100%', height: '230px', cursor: 'none', background: 'transparent' }}
      />
    </div>
  );
}
