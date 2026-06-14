'use client';

import { useEffect, useRef } from 'react';

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };

      if (!ticking.current) {
        ticking.current = true;
        rafId.current = requestAnimationFrame(() => {
          if (containerRef.current) {
            const shapes = containerRef.current.querySelectorAll('.parallax-shape');
            shapes.forEach((shape, i) => {
              const speed = (i + 1) * 15;
              const el = shape as HTMLElement;
              el.style.transform = `translate(${mouseRef.current.x * speed}px, ${mouseRef.current.y * speed}px)`;
            });
          }
          ticking.current = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const shapes = [
    { type: 'circle', size: 80, top: '15%', left: '10%', color: 'rgba(230, 57, 70, 0.08)', animation: 'floating-shape-1' },
    { type: 'triangle', size: 60, top: '25%', left: '85%', color: 'rgba(230, 57, 70, 0.06)', animation: 'floating-shape-2' },
    { type: 'circle', size: 120, top: '60%', left: '75%', color: 'rgba(245, 240, 235, 0.03)', animation: 'floating-shape-3' },
    { type: 'line', size: 100, top: '70%', left: '20%', color: 'rgba(230, 57, 70, 0.05)', animation: 'floating-shape-1' },
    { type: 'circle', size: 40, top: '40%', left: '50%', color: 'rgba(245, 240, 235, 0.04)', animation: 'floating-shape-2' },
    { type: 'triangle', size: 50, top: '80%', left: '60%', color: 'rgba(230, 57, 70, 0.07)', animation: 'floating-shape-3' },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={`parallax-shape absolute ${shape.animation}`}
          style={{
            top: shape.top,
            left: shape.left,
            transition: 'transform 0.3s ease-out',
            willChange: 'transform',
          }}
        >
          {shape.type === 'circle' && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                border: `1px solid ${shape.color}`,
                background: 'transparent',
              }}
            />
          )}
          {shape.type === 'triangle' && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 60 60">
              <polygon
                points="30,5 55,55 5,55"
                fill="none"
                stroke={shape.color}
                strokeWidth="1"
              />
            </svg>
          )}
          {shape.type === 'line' && (
            <div
              style={{
                width: shape.size,
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${shape.color}, transparent)`,
                transform: 'rotate(-30deg)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
