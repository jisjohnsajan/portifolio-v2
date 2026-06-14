'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, ensureGsapReady } from '@/lib/gsap-init';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double-init in React StrictMode
    if (initialized.current) return;
    initialized.current = true;

    // Ensure GSAP is ready
    if (!ensureGsapReady()) {
      console.warn('[SmoothScroll] GSAP not ready — using native scroll');
      return;
    }

    // ---- Mobile detection: skip Lenis on touch devices ----
    // Lenis intercepts touch events which causes lag/jank on mobile.
    // On mobile, native scroll is already smooth, so Lenis is not needed.
    const isTouchDevice =
      typeof window !== 'undefined' &&
      (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (window.matchMedia?.('(hover: none) and (pointer: coarse)').matches));

    if (isTouchDevice) {
      // Still set up ScrollTrigger refreshes for layout recalculation
      const timers: ReturnType<typeof setTimeout>[] = [];
      [100, 300, 600, 1000, 2000, 3500].forEach((delay) => {
        timers.push(setTimeout(() => {
          try { ScrollTrigger.refresh(); } catch {}
        }, delay));
      });

      const handleLoad = () => {
        try { ScrollTrigger.refresh(); } catch {}
        timers.push(setTimeout(() => { try { ScrollTrigger.refresh(); } catch {} }, 500));
        timers.push(setTimeout(() => { try { ScrollTrigger.refresh(); } catch {} }, 1500));
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
      }

      return () => {
        timers.forEach(clearTimeout);
        window.removeEventListener('load', handleLoad);
      };
    }

    // ---- Desktop: enable Lenis smooth scroll ----
    let lenis: any = null;
    let rafCallback: ((time: number) => void) | null = null;
    let destroyed = false;

    // Dynamic import of Lenis to avoid SSR/ESM issues
    import('lenis')
      .then((module) => {
        if (destroyed) return;

        const LenisClass = module.default || module;

        lenis = new LenisClass({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        rafCallback = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);
      })
      .catch((err) => {
        console.warn('[SmoothScroll] Lenis import failed, using native scroll:', err);
      });

    // Staggered refreshes to catch all layout/image load states
    const timers: ReturnType<typeof setTimeout>[] = [];
    [100, 300, 600, 1000, 2000, 3500].forEach((delay) => {
      timers.push(setTimeout(() => {
        try { ScrollTrigger.refresh(); } catch {}
      }, delay));
    });

    const handleLoad = () => {
      try { ScrollTrigger.refresh(); } catch {}
      timers.push(setTimeout(() => { try { ScrollTrigger.refresh(); } catch {} }, 500));
      timers.push(setTimeout(() => { try { ScrollTrigger.refresh(); } catch {} }, 1500));
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      destroyed = true;
      timers.forEach(clearTimeout);
      if (rafCallback) gsap.ticker.remove(rafCallback);
      if (lenis) {
        try { lenis.destroy(); } catch {}
      }
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return <>{children}</>;
}
