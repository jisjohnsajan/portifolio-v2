'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, ensureGsapReady } from '@/lib/gsap-init';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (!ensureGsapReady()) {
      console.warn('[SmoothScroll] GSAP not ready — using native scroll');
      return;
    }

    // ---- Mobile / touch detection ----
    const isTouchDevice =
      typeof window !== 'undefined' &&
      (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (window.matchMedia?.('(hover: none) and (pointer: coarse)').matches));

    // On touch devices, add touch-action for smooth native scrolling
    // and do NOT load Lenis at all
    if (isTouchDevice) {
      document.documentElement.style.touchAction = 'pan-y';
      document.body.style.touchAction = 'pan-y';
      document.documentElement.style.webkitOverflowScrolling = 'touch';

      // ScrollTrigger refreshes only
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
        document.documentElement.style.touchAction = '';
        document.body.style.touchAction = '';
      };
    }

    // ---- Desktop: enable Lenis smooth scroll ----
    let lenis: any = null;
    let rafCallback: ((time: number) => void) | null = null;
    let destroyed = false;

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
