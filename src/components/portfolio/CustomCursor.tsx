'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only show on devices with a pointer
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasPointer) return;

    // Signal that custom cursor is active — this hides the default cursor via CSS
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const handleMouseEnterInteractive = () => {
      dotRef.current?.classList.add('cursor-hover');
      ringRef.current?.classList.add('cursor-hover');
    };

    const handleMouseLeaveInteractive = () => {
      dotRef.current?.classList.remove('cursor-hover');
      ringRef.current?.classList.remove('cursor-hover');
    };

    const handleMouseEnterImage = () => {
      dotRef.current?.classList.add('cursor-image');
      ringRef.current?.classList.add('cursor-image');
    };

    const handleMouseLeaveImage = () => {
      dotRef.current?.classList.remove('cursor-image');
      ringRef.current?.classList.remove('cursor-image');
    };

    // Smooth ring follow with rAF
    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    // Hover detection
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      const images = document.querySelectorAll('img, [data-cursor="image"]');

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive, { passive: true });
        el.addEventListener('mouseleave', handleMouseLeaveInteractive, { passive: true });
      });

      images.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterImage, { passive: true });
        el.addEventListener('mouseleave', handleMouseLeaveImage, { passive: true });
      });
    };

    // Initial setup
    addHoverListeners();

    // Debounced MutationObserver for dynamic content
    let debounceTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(addHoverListeners, 150);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId.current);
      clearTimeout(debounceTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
