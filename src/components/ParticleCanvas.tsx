import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: any[] = [];
    for (let i = 0; i < 60; i++) {
       const initialY = (Math.random() * 0.13 + 0.55) * h;
       particles.push({
        x: Math.random() * w,
        y: initialY,
        r: Math.random() * 0.7 + 0.1,
        speedY: -(Math.random() * 0.22 + 0.05),
        baseOpacity: Math.random() * 0.45 + 0.08,
        phase: Math.random() * Math.PI * 2,
        initialY: initialY
      });
    }

    let animId: number;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.phase += 0.012;

        // Reset if it drifts too high or loops
        if (p.y < h * 0.44) {
          p.y = (Math.random() * 0.13 + 0.55) * h;
          p.x = Math.random() * w;
        }

        // Calculations for fading out between 50-60% height
        const heightFactor = p.y / h;
        // heightFactor goes from 0.55 to 0.44. 
        // We want it visible in the flower zone.
        let alphaScale = 1;
        if (heightFactor < 0.6 && heightFactor > 0.5) {
            alphaScale = (heightFactor - 0.5) / 0.1;
        } else if (heightFactor <= 0.5) {
            alphaScale = 0;
        }

        const opacity = p.baseOpacity * (0.65 + 0.35 * Math.sin(p.phase)) * alphaScale;
        const bloom = p.r * 2.2;

        if (opacity > 0) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, bloom);
          grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, bloom, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
