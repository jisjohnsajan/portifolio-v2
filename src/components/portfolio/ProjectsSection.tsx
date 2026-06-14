'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger, ensureGsapReady } from '@/lib/gsap-init';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  github: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: 'Laser Audio Transmission',
    subtitle: 'LiFi Communication System',
    description:
      'Innovative wireless audio transmission system using laser light, enabling high-speed data transfer through visible light communication (LiFi) technology.',
    image: '/project-laser-audio.jpg',
    github: 'https://github.com/jisjohnsajan/Laser-Audio-Transmission_LiFi',
    tags: ['IoT', 'LiFi', 'Electronics', 'Innovation'],
  },
  {
    title: 'Portfolio Website',
    subtitle: 'Interactive Web Experience',
    description:
      'Responsive and interactive portfolio built with modern web technologies, featuring smooth animations, 3D effects, and a recruiter-focused design.',
    image: '/portifolio.jpg',
    github: 'https://github.com/jisjohnsajan/jisjohnsajan-portifolio',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Dev'],
  },
  {
    title: 'UNIFIT – NFC Gym Access',
    subtitle: 'Smart Gym Management',
    description:
      'Smart NFC-powered gym management platform for seamless access control, member tracking, and automated attendance management.',
    image: '/unifit.jpg',
    github: 'https://github.com/jisjohnsajan/UniFit-Platfrom',
    tags: ['NFC', 'IoT', 'Full Stack', 'Automation'],
  },
  {
  title: 'Portfolio V2',
  subtitle: 'Personal Portfolio Website',
  description:
    'A responsive and interactive personal portfolio featuring smooth scroll animations, custom cursor, certificate lightbox, and a dark recruiter-focused design built with modern web technologies.',
  image: '/portifolio-v2.png',
  github: 'https://github.com/jisjohnsajan/portifolio-v2',
  tags: ['Next.js', 'GSAP', 'TypeScript', 'Tailwind'],
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  // 3D tilt handler for project cards
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    const glare = card.querySelector('.project-glare') as HTMLElement;
    if (glare) {
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(230,57,70,0.12), transparent 60%)`;
    }
  }, []);

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const glare = card.querySelector('.project-glare') as HTMLElement;
    if (glare) {
      glare.style.background = 'transparent';
    }
  }, []);

  useEffect(() => {
    if (!ensureGsapReady()) return;

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

      // Intro text animation
      gsap.fromTo(
        introRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Horizontal scroll pin
      if (pinRef.current && wrapperRef.current) {
        const pinEl = pinRef.current;
        const wrapperEl = wrapperRef.current;

        const getScrollWidth = () => wrapperEl.scrollWidth - pinEl.clientWidth;

        ScrollTrigger.create({
          trigger: pinEl,
          start: 'top top',
          end: () => `+=${getScrollWidth()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(wrapperEl, {
              x: -getScrollWidth() * self.progress,
            });
          },
        });

        // Card content reveals
        const cards = wrapperEl.querySelectorAll('.project-card-item');
        cards.forEach((card) => {
          const content = card.querySelector('.project-content');
          if (content) {
            gsap.fromTo(
              content,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
              }
            );
          }
        });
      }
    }, sectionRef);

    // Refresh ScrollTrigger after layout settles
    const timers = [200, 500, 1000, 2000, 3500].map((delay) =>
      setTimeout(() => ScrollTrigger.refresh(), delay)
    );

    return () => {
      ctx.revert();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ background: '#0a0a0a' }}
    >
      {/* Intro area - scrolls naturally, not pinned */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 pt-20 sm:pt-28 pb-8">
        <h2
          ref={headingRef}
          className="text-[#e63946] text-xs sm:text-sm font-heading uppercase tracking-[0.3em] mb-4"
        >
          Featured Projects
        </h2>
        <div ref={introRef}>
          <p className="text-[#f5f0eb]/50 text-sm sm:text-base font-heading max-w-xl">
            A selection of projects that showcase my ability to build, innovate, and solve real-world problems.
          </p>
        </div>
      </div>

      {/* Pinned horizontal scroll area */}
      <div
        ref={pinRef}
        className="relative w-full overflow-hidden"
        style={{ height: 'calc(100vh - 80px)', minHeight: '500px' }}
      >
        <div
          ref={wrapperRef}
          className="horizontal-scroll-wrapper items-center h-full gap-6 sm:gap-8 pl-6 sm:pl-10 md:pl-16 lg:pl-24 pr-[30vw]"
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card-item flex-shrink-0 h-full flex items-center"
              style={{ width: 'clamp(320px, 55vw, 750px)' }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div
                className="relative w-full rounded-2xl overflow-hidden border border-[#f5f0eb]/8 bg-[#111111] group"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.2s ease-out',
                  maxHeight: 'calc(100vh - 120px)',
                }}
              >
                {/* Project Image */}
                <div className="relative h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-card-image w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

                  {/* Glare effect */}
                  <div className="project-glare absolute inset-0 pointer-events-none transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="project-content p-5 sm:p-6">
                  <p className="text-[#e63946] text-xs font-heading uppercase tracking-widest mb-2">
                    {project.subtitle}
                  </p>
                  <h3 className="text-[#f5f0eb] text-xl sm:text-2xl font-heading font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[#f5f0eb]/60 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="px-2.5 py-1 text-[10px] sm:text-xs font-heading rounded-full border border-[#f5f0eb]/10 text-[#f5f0eb]/60 bg-[#f5f0eb]/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#e63946] text-sm font-heading hover:gap-3 transition-all"
                  >
                    <Github size={16} />
                    View on GitHub
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated transition dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {projects.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#f5f0eb]/20"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
