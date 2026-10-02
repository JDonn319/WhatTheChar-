import React, { useEffect, useRef } from 'react';

// 1. Праздничный салют конфетти при победе
export const ConfettiEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ffffff', '#38bdf8', '#34d399', '#f43f5e', '#fbbf24', '#a855f7'];
    const particles = Array.from({ length: 90 }).map(() => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      w: Math.random() * 8 + 4,
      h: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: Math.random() * 4 + 3,
      vx: (Math.random() - 0.5) * 3,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 8
    }));

    let reqId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.rot += p.vrot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      reqId = requestAnimationFrame(render);
    };

    reqId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(reqId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[60] pointer-events-none" />;
};

// 2. Трескающееся стекло и встряска при поражении
export const ScreenCrackEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center animate-in fade-in duration-100">
      {/* Вспышка и виньетка */}
      <div className="absolute inset-0 bg-red-950/40 animate-pulse" />

      {/* Векторная паутина трещин стекла */}
      <svg
        className="w-full h-full object-cover opacity-80"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="rgba(255, 255, 255, 0.75)" strokeWidth="2.5" fill="none" strokeLinecap="round">
          {/* Центр удара */}
          <circle cx="500" cy="500" r="14" fill="#ffffff" />
          <path d="M500 500 L420 320 L350 250 L200 120" />
          <path d="M500 500 L610 380 L720 220 L880 150" />
          <path d="M500 500 L680 540 L820 620 L960 700" />
          <path d="M500 500 L480 680 L410 820 L350 960" />
          <path d="M500 500 L320 580 L180 660 L40 750" />
          <path d="M500 500 L340 440 L220 380 L80 340" />

          {/* Боковые расколы */}
          <path d="M420 320 L520 280 L610 380" strokeWidth="1.5" />
          <path d="M680 540 L600 660 L480 680" strokeWidth="1.5" />
          <path d="M320 580 L360 480 L340 440" strokeWidth="1.5" />
          <path d="M720 220 L780 320 L820 620" strokeWidth="1.2" />
          <path d="M180 660 L240 780 L410 820" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
};
