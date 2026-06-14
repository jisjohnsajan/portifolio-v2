'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ensureGsapReady } from '@/lib/gsap-init';
import MorphingText from './MorphingText';
import FloatingShapes from './FloatingShapes';
import CountUp from './CountUp';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imageRevealed, setImageRevealed] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);

  useEffect(() => {
    if (!ensureGsapReady()) return;
    setGsapReady(true);

    const ctx = gsap.context(() => {
      // Name reveal
      gsap.fromTo(
        nameRef.current,
        { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2, delay: 0.3, ease: 'power4.out' }
      );

      // Stats reveal
      gsap.fromTo(
        statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 1.2, ease: 'power3.out' }
      );

      // Scroll indicator
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2, ease: 'power2.out' }
      );

      // Image reveal
      setTimeout(() => setImageRevealed(true), 800);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center"
      style={{ background: '#0a0a0a', overflowX: 'hidden', overflowY: 'visible' }}
    >
      <FloatingShapes />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 overflow-visible">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between w-full max-w-[1800px] mx-auto gap-8 lg:gap-16">
          {/* LEFT: Name + Subtitle */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            {/* Name — visible by default, animated only if GSAP loads */}
            <h1
              ref={nameRef}
              className="font-heading font-bold tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 12vw, 10rem)',
                lineHeight: '1.1',
                overflow: 'visible',
                opacity: gsapReady ? undefined : 1,
              }}
            >
              <span className="block text-[#f5f0eb]">Jis</span>
              <span className="block text-[#f5f0eb]">John</span>
              <span className="block text-[#e63946] pb-1">Sajan</span>
            </h1>

            {/* Morphing Subtitle */}
            <div className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-[#666] font-heading">
              <MorphingText
                words={['Software Engineer', 'Problem Solver', 'Tech Innovator', 'CSE Student']}
                interval={2500}
              />
            </div>

            {/* Stats Row — visible by default, animated only if GSAP loads */}
            <div
              ref={statsRef}
              className="flex flex-wrap items-center gap-4 sm:gap-8 mt-8 sm:mt-10"
              style={{ opacity: gsapReady ? undefined : 1 }}
            >
              <div className="flex items-center gap-2 text-[#f5f0eb]/80 text-sm sm:text-base font-heading">
                <CountUp end={3} duration={1500} />
                <span className="text-[#666]">+ Projects</span>
              </div>
              <span className="text-[#666] text-xs">•</span>
              <div className="flex items-center gap-2 text-[#f5f0eb]/80 text-sm sm:text-base font-heading">
                <CountUp end={9} duration={1500} />
                <span className="text-[#666]">Certifications</span>
              </div>
              <span className="text-[#666] text-xs">•</span>
              <div className="flex items-center gap-2 text-[#f5f0eb]/80 text-sm sm:text-base font-heading">
                <span className="text-[#e63946]">B.Tech</span>
                <span className="text-[#666]">CSE</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Profile Image */}
          <div className="flex-shrink-0 relative">
            <div
              ref={imageRef}
              className={`hero-image-reveal relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] rounded-2xl overflow-hidden border border-[#f5f0eb]/10 ${imageRevealed ? 'revealed' : ''}`}
            >
              <Image
                src="/main.jpeg"
                alt="Jis John Sajan"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 420px"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            </div>
            {/* Decorative border */}
            <div className="absolute -inset-3 border border-[#e63946]/20 rounded-2xl -z-10 floating-shape-3" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator — visible by default, animated only if GSAP loads */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator"
        style={{ opacity: gsapReady ? undefined : 1 }}
      >
        <span className="text-[#666] text-xs font-heading uppercase tracking-widest">Scroll</span>
        <svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          className="text-[#e63946]"
        >
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
          <circle cx="10" cy="10" r="2" fill="currentColor">
            <animate attributeName="cy" values="10;18;10" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </section>
  );
}
