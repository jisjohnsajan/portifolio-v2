'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, ensureGsapReady } from '@/lib/gsap-init';

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

const education: Education[] = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Vimal Jyothi Engineering College, Chemperi',
    year: '2025–2029',
    description: 'Currently pursuing — focused on software development, algorithms, and emerging technologies.',
  },
  {
    degree: '12th Standard (Higher Secondary)',
    institution: 'GHSS Nedungome',
    year: '2025',
    description: 'Completed higher secondary education with a focus on science and mathematics.',
  },
  {
    degree: '10th Standard (SSLC)',
    institution: 'GHSS Nedungome',
    year: '2023',
    description: 'Completed secondary schooling with strong academic performance.',
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ensureGsapReady()) return;

    const ctx = gsap.context(() => {
      // Heading
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

      // Timeline line grows on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: 0 },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }

      // Cards alternating left/right
      const cards = sectionRef.current?.querySelectorAll('.edu-card');
      if (cards) {
        Array.from(cards).forEach((card, i) => {
          const isLeft = i % 2 === 0;
          gsap.fromTo(
            card,
            { x: isLeft ? -60 : 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      // Year badges pulse
      const yearBadges = sectionRef.current?.querySelectorAll('.year-badge');
      if (yearBadges) {
        gsap.fromTo(
          Array.from(yearBadges),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
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
      <div className="max-w-[1200px] mx-auto">
        <h2
          ref={headingRef}
          className="text-[#e63946] text-xs sm:text-sm font-heading uppercase tracking-[0.3em] mb-12 sm:mb-16"
        >
          Education
        </h2>

        <div className="relative">
          {/* Animated Timeline Line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#e63946] to-[#e63946]/10"
              style={{ height: 0 }}
            />
          </div>

          {/* Mobile timeline line */}
          <div className="md:hidden absolute left-[20px] top-0 bottom-0 w-[2px]">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#e63946] to-[#e63946]/10"
              style={{ height: '100%' }}
            />
          </div>

          <div className="flex flex-col gap-10 sm:gap-12">
            {education.map((edu, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`edu-card relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Mobile: always left */}
                  <div className="md:hidden flex-shrink-0 relative z-10">
                    <div className="year-badge pulse-badge w-10 h-10 rounded-full bg-[#e63946] flex items-center justify-center">
                      <span className="text-[#f5f0eb] text-[10px] font-heading font-bold">
                        {edu.year.slice(0, 4)}
                      </span>
                    </div>
                  </div>

                  {/* Desktop: card content */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div
                      className="glass-card rounded-xl p-5 sm:p-6"
                      style={{
                        background: 'rgba(17, 17, 17, 0.85)',
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="text-[#e63946] text-xs font-heading uppercase tracking-widest">
                          {edu.year}
                        </span>
                      </div>
                      <h3 className="text-[#f5f0eb] text-lg sm:text-xl font-heading font-bold mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-[#f5f0eb]/50 text-sm font-heading mb-2">{edu.institution}</p>
                      <p className="text-[#666] text-sm leading-relaxed">{edu.description}</p>
                    </div>
                  </div>

                  {/* Desktop: center dot */}
                  <div className="hidden md:flex flex-shrink-0 items-start justify-center w-0">
                    <div className="year-badge pulse-badge w-12 h-12 -mt-2 rounded-full bg-[#e63946] flex items-center justify-center relative z-10">
                      <span className="text-[#f5f0eb] text-[10px] font-heading font-bold">
                        {edu.year.slice(0, 4)}
                      </span>
                    </div>
                  </div>

                  {/* Desktop: empty spacer for opposite side */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section-divider mt-20 sm:mt-28 max-w-[1800px] mx-auto" />
    </section>
  );
}
