'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, ensureGsapReady } from '@/lib/gsap-init';
import { Rocket, Trophy, GraduationCap, type LucideIcon } from 'lucide-react';
import CountUp from './CountUp';
import TiltCard from './TiltCard';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [gsapReady, setGsapReady] = useState(false);

  const bioWords = [
    "I'm", 'Jis', 'John', 'Sajan,', 'a', 'B.Tech', 'CSE', 'student', 'at', 'Vimal', 'Jyothi', 'Engineering', 'College', 'with', 'a', 'relentless', 'drive', 'to', 'build,', 'solve,', 'and', 'innovate.', 'From', 'IoT', 'systems', 'to', 'web', 'platforms,', 'I', 'turn', 'ideas', 'into', 'working', 'solutions.', 'Currently', 'seeking', 'internship', 'opportunities', 'where', 'I', 'can', 'contribute', 'and', 'grow.',
  ];

  const stats: { value: number; suffix: string; label: string; prefix?: string; sublabel?: string; Icon: LucideIcon; spanFull?: boolean }[] = [
    { value: 3, suffix: '+', label: 'Projects Built', Icon: Rocket },
    { value: 9, suffix: '', label: 'Certifications', Icon: Trophy },
    { value: 2029, suffix: '', label: 'Graduating', Icon: GraduationCap, sublabel: 'B.Tech CSE', spanFull: true },
  ];

  useEffect(() => {
    if (!ensureGsapReady()) return;
    setGsapReady(true);

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Word-by-word reveal
      wordsRef.current.forEach((word, i) => {
        gsap.fromTo(
          word,
          { opacity: 0.15, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            scrollTrigger: {
              trigger: word,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.02,
          }
        );
      });

      // Stat cards
      const statCards = sectionRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          Array.from(statCards),
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-24 md:py-28 px-6 sm:px-10 md:px-16 lg:px-24"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Section Label */}
        <h2
          ref={headingRef}
          className="text-[#e63946] text-xs sm:text-sm font-heading uppercase tracking-[0.3em] mb-10 sm:mb-14"
        >
          About Me
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* LEFT: Bio Text */}
          <div className="flex-1">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-relaxed md:leading-relaxed text-[#f5f0eb]/70 font-body">
              {bioWords.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    if (el) wordsRef.current[i] = el;
                  }}
                  className="word-reveal inline-block mr-[0.3em] transition-opacity duration-300"
                  style={{ opacity: gsapReady ? 0.15 : 1 }}
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Quick highlight */}
            <div className="mt-8 sm:mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full border border-[#e63946]/20 bg-[#e63946]/5">
              <span className="w-2 h-2 rounded-full bg-[#e63946] animate-pulse" />
              <span className="text-[#e63946] text-sm font-heading tracking-wide">
                2nd Year B.Tech CSE — Open to Internships
              </span>
            </div>
          </div>

          {/* RIGHT: Stat Cards Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:w-[500px]">
            {stats.map((stat, i) => {
              const StatIcon = stat.Icon;
              return (
                <TiltCard key={i} maxTilt={8} className={`stat-card ${stat.spanFull ? 'col-span-2' : ''}`}>
                  <div
                    className={`glass-card rounded-xl p-5 sm:p-6 h-full flex flex-col justify-between min-h-[140px] sm:min-h-[160px] ${stat.spanFull ? 'flex-row items-center gap-4 sm:gap-6' : ''}`}
                    style={{
                      background: 'rgba(17, 17, 17, 0.85)',
                    }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#e63946]/10 border border-[#e63946]/15 flex items-center justify-center flex-shrink-0">
                      <StatIcon size={stat.spanFull ? 22 : 20} className="text-[#e63946]" />
                    </div>
                    <div className={stat.spanFull ? 'flex-1' : ''}>
                      <div className="font-heading font-bold text-[#f5f0eb]" style={{ fontSize: stat.spanFull ? 'clamp(1.75rem, 4vw, 2.5rem)' : undefined }}>
                        <CountUp end={stat.value} duration={2000} suffix={stat.suffix} />
                      </div>
                      <p className="text-[#666] text-xs sm:text-sm font-heading mt-1 tracking-wide">
                        {stat.label}
                      </p>
                      {stat.sublabel && (
                        <p className="text-[#e63946] text-[10px] sm:text-xs font-heading uppercase tracking-widest mt-0.5">
                          {stat.sublabel}
                        </p>
                      )}
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="section-divider mt-20 sm:mt-28 max-w-[1800px] mx-auto" />
    </section>
  );
}
