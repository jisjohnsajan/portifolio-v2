'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap, ScrollTrigger, ensureGsapReady } from '@/lib/gsap-init';
import { Mail, Download, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const socials = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/jis-john-sajan-4ab8382ab/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/jisjohnsajan', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/jisjohnsajan', label: 'X / Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/absolutely_jis.johnny/', label: 'Instagram' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const [hoveredChar, setHoveredChar] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const heading = "LET'S WORK TOGETHER";

  const handleEmailCopy = useCallback(() => {
    navigator.clipboard.writeText('jisjohnsajan@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      window.location.href = 'mailto:jisjohnsajan@gmail.com';
    });
  }, []);

  const handleMagneticMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }, []);

  const handleMagneticLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  }, []);

  useEffect(() => {
    if (!ensureGsapReady()) return;

    const ctx = gsap.context(() => {
      // Heading characters
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.contact-letter');
        gsap.fromTo(
          Array.from(chars),
          { y: 80, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Subtitle
      gsap.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: subRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Buttons
      const btns = sectionRef.current?.querySelectorAll('.magnetic-btn-cta');
      if (btns) {
        gsap.fromTo(
          Array.from(btns),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            delay: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Social icons
      const icons = sectionRef.current?.querySelectorAll('.social-icon');
      if (icons) {
        gsap.fromTo(
          Array.from(icons),
          { y: 20, opacity: 0, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Build word-level spans so "TOGETHER" never breaks mid-word on mobile
  const words = heading.split(' ');

  // Compute global character index (spaces count too)
  function getGlobalIndex(wordIndex: number, charIndex: number): number {
    let idx = 0;
    for (let w = 0; w < wordIndex; w++) {
      idx += words[w].length + 1; // +1 for the space
    }
    return idx + charIndex;
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-24 animated-gradient overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Heading with per-character hover — word-level wrapping prevents mid-word breaks */}
        <div
          ref={headingRef}
          className="mb-6 sm:mb-8"
          style={{ perspective: '500px' }}
        >
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight flex flex-wrap justify-center gap-x-2 sm:gap-x-3"
          >
            {words.map((word, wi) => (
              <span
                key={wi}
                className="inline-flex whitespace-nowrap"
              >
                {word.split('').map((char, ci) => {
                  const globalIndex = getGlobalIndex(wi, ci);
                  return (
                    <span
                      key={ci}
                      className="contact-letter inline-block"
                      style={{
                        color: hoveredChar === globalIndex ? '#e63946' : '#f5f0eb',
                        transform: hoveredChar === globalIndex ? 'translateY(-8px)' : 'translateY(0)',
                        transition: 'color 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={() => setHoveredChar(globalIndex)}
                      onMouseLeave={() => setHoveredChar(null)}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>
        </div>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="text-[#f5f0eb]/60 text-lg sm:text-xl md:text-2xl font-heading mb-10 sm:mb-14 max-w-2xl mx-auto"
        >
          I&apos;m a 2nd year CSE student open to internship opportunities.
          <br />
          Let&apos;s build something great together.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
          <button
            onClick={handleEmailCopy}
            className="magnetic-btn-cta magnetic-spring inline-flex items-center gap-3 px-8 py-4 bg-[#e63946] text-[#f5f0eb] rounded-xl font-heading font-semibold text-base sm:text-lg hover:bg-[#e63946]/90 transition-colors"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            <Mail size={20} />
            {copied ? 'Copied!' : 'Email Me'}
          </button>
          <a
            href="/Jis_John_Sajan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn-cta magnetic-spring inline-flex items-center gap-3 px-8 py-4 border border-[#f5f0eb]/20 text-[#f5f0eb] rounded-xl font-heading font-semibold text-base sm:text-lg hover:border-[#e63946]/50 hover:text-[#e63946] transition-colors"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            <Download size={20} />
            Download Resume
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#f5f0eb]/10 flex items-center justify-center text-[#f5f0eb]/50 hover:text-[#e63946] hover:border-[#e63946]/30 transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e63946]/5 rounded-full blur-[200px] pointer-events-none" />
    </section>
  );
}
