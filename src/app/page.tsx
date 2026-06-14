'use client';

import dynamic from 'next/dynamic';
import CustomCursor from '@/components/portfolio/CustomCursor';
import GrainOverlay from '@/components/portfolio/GrainOverlay';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import Navigation from '@/components/portfolio/Navigation';
import HeroSection from '@/components/portfolio/HeroSection';
import InfiniteMarquee from '@/components/portfolio/InfiniteMarquee';
import AnimationErrorBoundary from '@/components/portfolio/AnimationErrorBoundary';

// Dynamic imports for GSAP-heavy sections — they gracefully degrade if GSAP fails
const SmoothScroll = dynamic(() => import('@/components/portfolio/SmoothScroll'), {
  ssr: false,
});

const AboutSection = dynamic(() => import('@/components/portfolio/AboutSection'), {
  ssr: false,
});

const SkillsSection = dynamic(() => import('@/components/portfolio/SkillsSection'), {
  ssr: false,
});

const ProjectsSection = dynamic(() => import('@/components/portfolio/ProjectsSection'), {
  ssr: false,
});

const EducationSection = dynamic(() => import('@/components/portfolio/EducationSection'), {
  ssr: false,
});

const CertificationsSection = dynamic(() => import('@/components/portfolio/CertificationsSection'), {
  ssr: false,
});

const ContactSection = dynamic(() => import('@/components/portfolio/ContactSection'), {
  ssr: false,
});

const Footer = dynamic(() => import('@/components/portfolio/Footer'), {
  ssr: false,
});

export default function Home() {
  return (
    <AnimationErrorBoundary>
      <SmoothScroll>
        <CustomCursor />
        <GrainOverlay />
        <ScrollProgress />
        <Navigation />

        <main className="bg-[#0a0a0a] min-h-screen">
          <HeroSection />

          {/* Infinite Marquee — Tech Stack */}
          <div className="w-full bg-[#e63946] py-3 sm:py-4 overflow-hidden" aria-hidden="true">
            <InfiniteMarquee
              items={['C', 'PYTHON', 'PROBLEM SOLVING', 'IoT', 'LiFi', 'NFC', 'EMBEDDED SYSTEMS', 'WEB DEVELOPMENT', 'HTML', 'CSS', 'ALGORITHMS', 'ELECTRONICS']}
              direction="left"
              speed={20}
              className="text-[#0a0a0a] font-bold"
            />
          </div>
          <div className="w-full bg-[#e63946]/80 py-2 sm:py-3 overflow-hidden" aria-hidden="true">
            <InfiniteMarquee
              items={['TEAM COLLABORATION', 'COMMUNICATION', 'ADAPTABILITY', 'QUICK LEARNING', 'CREATIVE PROBLEM SOLVING', 'LOGICAL THINKING']}
              direction="right"
              speed={25}
              className="text-[#0a0a0a] font-bold"
            />
          </div>

          <section id="about" aria-label="About Me">
            <AboutSection />
          </section>

          <section id="skills" aria-label="Skills and Expertise">
            <SkillsSection />
          </section>

          <section id="projects" aria-label="Featured Projects">
            <ProjectsSection />
          </section>

          <section id="education" aria-label="Education">
            <EducationSection />
          </section>

          <section id="certifications" aria-label="Certifications">
            <CertificationsSection />
          </section>

          <section id="contact" aria-label="Contact">
            <ContactSection />
          </section>
        </main>

        <Footer />
      </SmoothScroll>
    </AnimationErrorBoundary>
  );
}
