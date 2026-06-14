'use client';

import { useEffect, useRef, useState, useCallback, memo, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Award, ZoomIn } from 'lucide-react';
import { gsap, ensureGsapReady } from '@/lib/gsap-init';

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */

interface Certification {
  name: string;
  issuer: string;
  image?: string;
  thumb?: string;
  description: string;
}

const certifications: Certification[] = [
  {
    name: 'Digital 101',
    issuer: 'NASSCOM',
    image: '/lightbox/cert-digital-101.webp',
    thumb: '/thumbs/cert-digital-101.jpg',
    description: 'Foundational digital literacy and technology awareness certification.',
  },
  {
    name: 'Python Certification',
    issuer: 'Infosys',
    image: '/lightbox/cert-infosys-python.webp',
    thumb: '/thumbs/cert-infosys-python.jpg',
    description: 'Professional Python programming proficiency certified by Infosys.',
  },
  {
    name: 'COBOL Workshop',
    issuer: 'Workshop',
    image: '/lightbox/cert-cobol.webp',
    thumb: '/thumbs/cert-cobol.jpg',
    description: 'Hands-on COBOL programming workshop for legacy systems.',
  },
  {
    name: 'Carrier Craft',
    issuer: 'TANTRA \'25',
    image: '/lightbox/cert-carrier-craft.webp',
    thumb: '/thumbs/cert-carrier-craft.jpg',
    description: 'Career development and professional skills workshop.',
  },
  {
    name: 'GenAI Virtual Experience',
    issuer: 'Tata x Forage',
    image: '/lightbox/cert-tata-forage.webp',
    thumb: '/thumbs/cert-tata-forage.jpg',
    description: 'Generative AI applications and enterprise use cases.',
  },
  {
    name: 'C Programming',
    issuer: 'Infosys',
    image: '/lightbox/cert-infosys-c.webp',
    thumb: '/thumbs/cert-infosys-c.jpg',
    description: 'Core C programming concepts and systems development.',
  },
  {
    name: 'AI Fluency',
    issuer: 'Anthropic',
    image: '/lightbox/ai-fluency.webp',
    thumb: '/thumbs/ai-fluency.jpg',
    description: 'AI fundamentals, responsible AI usage, and prompt engineering.',
  },
  {
    name: 'Training Certificate',
    issuer: 'Corizo',
    image: '/lightbox/cert-corizo.webp',
    thumb: '/thumbs/cert-corizo.jpg',
    description: 'Professional training program certification from Corizo.',
  },
  {
    name: 'Certificate of Internship',
    issuer: 'InAmigos',
    image: '/lightbox/cert-new-3.webp',
    thumb: '/thumbs/cert-new-3.jpg',
    description: 'Professional internship program certification from InAmigos.',
  },
];

/* ────────────────────────────────────────────
   Memoized Card — skips re-render when lightbox state changes
   ──────────────────────────────────────────── */

interface CertCardProps {
  cert: Certification;
  index: number;
  onOpen: (cert: Certification) => void;
  onPreload: (cert: Certification) => void;
}

const CertCard = memo(function CertCard({ cert, index, onOpen, onPreload }: CertCardProps) {
  return (
    <button
      className="frosty-cert-card group relative rounded-xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e63946] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
      style={{ height: '220px', minHeight: '200px' }}
      onClick={() => onOpen(cert)}
      onMouseEnter={() => onPreload(cert)}
      aria-label={`View ${cert.name} certification`}
    >
      {/* Thumbnail */}
      {cert.thumb && (
        <div className="absolute inset-0">
          <img
            src={cert.thumb}
            alt=""
            className="w-full h-full object-cover scale-105 group-hover:scale-115 transition-transform duration-700 ease-out"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Solid dark overlay */}
      <div className="absolute inset-0 frosty-overlay" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/40 pointer-events-none" />

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 z-10">
        <div className="flex items-center justify-between">
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
            style={{
              background: 'rgba(0, 0, 0, 0.65)',
              border: '1px solid rgba(245, 240, 235, 0.08)',
            }}
          >
            <div className="w-5 h-5 rounded-full bg-[#e63946]/20 flex items-center justify-center flex-shrink-0">
              <Award size={10} className="text-[#e63946]" />
            </div>
            <span className="text-[#e63946] text-[8px] sm:text-[9px] font-heading uppercase tracking-widest font-medium">
              Verified
            </span>
          </div>
          <div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1.5 rounded-lg"
            style={{
              background: 'rgba(0, 0, 0, 0.65)',
              border: '1px solid rgba(245, 240, 235, 0.08)',
            }}
          >
            <ZoomIn size={14} className="text-[#f5f0eb]/50" />
          </div>
        </div>

        <div
          className="rounded-xl p-3 sm:p-3.5"
          style={{
            background: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(245, 240, 235, 0.06)',
          }}
        >
          <p className="text-[#f5f0eb] text-sm sm:text-base font-heading font-bold leading-tight mb-0.5">
            {cert.name}
          </p>
          <p className="text-[#e63946] text-[9px] sm:text-[10px] font-heading uppercase tracking-wider font-medium mb-0.5">
            {cert.issuer}
          </p>
          <p className="text-[#999] text-[8px] sm:text-[9px] leading-relaxed line-clamp-2">
            {cert.description}
          </p>
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-xl border border-[#f5f0eb]/8 group-hover:border-[#e63946]/30 transition-colors duration-500 pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#e63946]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </button>
  );
});

/* ────────────────────────────────────────────
   Always-mounted Lightbox — toggled via CSS only
   No mount/unmount cost. Image stays decoded.
   ──────────────────────────────────────────── */

interface CertLightboxProps {
  cert: Certification | null;
  isOpen: boolean;
  onClose: () => void;
  onPreload: (cert: Certification) => void;
}

function CertLightbox({ cert, isOpen, onClose, onPreload }: CertLightboxProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // When cert changes while open, preload is already done from hover.
  // Also pre-decode the image so paint is instant.
  useEffect(() => {
    if (isOpen && imgRef.current && cert?.image) {
      // Force the browser to decode the image before painting
      if ('decode' in imgRef.current) {
        imgRef.current.decode().catch(() => {});
      }
    }
  }, [isOpen, cert]);

  // Preload the lightbox image on hover — browser caches it so opening is instant
  const handlePreload = useCallback((c: Certification) => {
    if (c.image) {
      onPreload(c);
    }
  }, [onPreload]);

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={isOpen ? onClose : undefined}
      role="dialog"
      aria-modal={isOpen ? 'true' : undefined}
      aria-label={cert ? `${cert.name} certification` : undefined}
      aria-hidden={!isOpen}
      style={{
        // CSS-only toggle — no React mount/unmount, zero frame cost
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.15s ease-out',
        contain: 'layout style paint',
        willChange: 'opacity',
      }}
    >
      {/* Backdrop — solid black, no blur */}
      <div className="absolute inset-0 bg-[rgba(5,5,5,0.95)]" />

      {/* Modal Content */}
      <div className="relative z-10 max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
        {/* Close button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute -top-2 right-0 sm:top-2 sm:right-2 z-20 w-10 h-10 rounded-full bg-[#1a1a1a]/90 border border-[#f5f0eb]/10 flex items-center justify-center text-[#f5f0eb]/60 hover:text-[#e63946] hover:border-[#e63946]/30 transition-colors duration-200"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* macOS folder window frame */}
        <div className="w-full rounded-2xl overflow-hidden bg-[#111111] border border-[#f5f0eb]/8 shadow-2xl shadow-black/60">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#f5f0eb]/5">
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                title="Close"
              />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-[#f5f0eb]/40 text-xs font-heading tracking-wide">
                {cert ? `${cert.name} — ${cert.issuer}` : ''}
              </span>
            </div>
            <div className="w-[54px]" />
          </div>

          {/* Certification Image — always rendered, stays decoded in memory */}
          {cert?.image && (
            <div className="relative bg-[#0a0a0a] flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={cert.image}
                alt={cert.name}
                className="max-w-full max-h-[65vh] object-contain"
                decoding="async"
              />
            </div>
          )}

          {/* Cert details footer */}
          <div className="px-5 py-4 bg-[#111111] border-t border-[#f5f0eb]/5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-[#f5f0eb] text-lg sm:text-xl font-heading font-bold">
                  {cert?.name ?? ''}
                </h3>
                <p className="text-[#e63946] text-xs font-heading uppercase tracking-widest mt-0.5">
                  {cert?.issuer ?? ''}
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e63946]/10 border border-[#e63946]/20">
                <Award size={14} className="text-[#e63946]" />
                <span className="text-[#e63946] text-xs font-heading uppercase tracking-wider">Verified</span>
              </div>
            </div>
            <p className="text-[#f5f0eb]/40 text-sm mt-2">{cert?.description ?? ''}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof window !== 'undefined' ? createPortal(modal, document.body) : null;
}

/* ────────────────────────────────────────────
   Section
   ──────────────────────────────────────────── */

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Image preloading cache — avoids re-creating link elements
  const preloadedRef = useRef<Set<string>>(new Set());

  const preloadImage = useCallback((cert: Certification) => {
    if (!cert.image || preloadedRef.current.has(cert.image)) return;
    preloadedRef.current.add(cert.image);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = cert.image;
    link.as = 'image';
    document.head.appendChild(link);
  }, []);

  const openLightbox = useCallback((cert: Certification) => {
    // Set the cert data first, then show — both happen in same
    // synchronous batch so React only triggers ONE render
    setActiveCert(cert);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    // Keep cert data briefly so CSS fade-out has content to show
    // Clear after transition completes
    setTimeout(() => setActiveCert(null), 160);
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    if (!ensureGsapReady()) return;

    const ctx = gsap.context(() => {
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

      const cards = sectionRef.current?.querySelectorAll('.frosty-cert-card');
      if (cards) {
        Array.from(cards).forEach((card, i) => {
          const row = Math.floor(i / 4);
          const delay = (i % 4) * 0.08 + row * 0.15;
          gsap.fromTo(
            card,
            { y: 50 + row * 15, opacity: 0, scale: 0.92 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Memoize the cards array
  const certCards = useMemo(
    () =>
      certifications.map((cert, i) => (
        <CertCard
          key={cert.name}
          cert={cert}
          index={i}
          onOpen={openLightbox}
          onPreload={preloadImage}
        />
      )),
    [openLightbox, preloadImage]
  );

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative w-full py-20 sm:py-24 md:py-28 px-6 sm:px-10 md:px-16 lg:px-24"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-[1800px] mx-auto">
        <h2
          ref={headingRef}
          className="text-[#e63946] text-xs sm:text-sm font-heading uppercase tracking-[0.3em] mb-10 sm:mb-14"
        >
          Certifications
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {certCards}
        </div>
      </div>

      {/* Lightbox always mounted — toggled by CSS for instant open/close */}
      <CertLightbox
        cert={activeCert}
        isOpen={isOpen}
        onClose={closeLightbox}
        onPreload={preloadImage}
      />

      <div className="section-divider mt-20 sm:mt-28 max-w-[1800px] mx-auto" />
    </section>
  );
}
