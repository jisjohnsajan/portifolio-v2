'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
}

export default function TextReveal({ children, className = '' }: TextRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = wrapperRef.current?.querySelectorAll('.text-reveal-line');
      if (lines) {
        Array.from(lines).forEach((line, i) => {
          gsap.fromTo(
            line,
            { y: '110%', opacity: 0 },
            {
              y: '0%',
              opacity: 1,
              duration: 0.8,
              delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className={`text-reveal-wrapper ${className}`}>
      <div className="text-reveal-line">{children}</div>
    </div>
  );
}
