'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, ensureGsapReady } from '@/lib/gsap-init';
import {
  Zap, Terminal, Puzzle, BrainCircuit, Cpu, Wifi, Lightbulb,
  Smartphone, Globe, Users, MessageSquare, RefreshCw, Sparkles,
  type LucideIcon,
} from 'lucide-react';

interface SkillItem {
  name: string;
  desc: string;
  Icon: LucideIcon;
}

interface SkillGroup {
  title: string;
  items: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: [
      { name: 'C', desc: 'Systems & algorithms', Icon: Zap },
      { name: 'Python', desc: 'Scripting & automation', Icon: Terminal },
    ],
  },
  {
    title: 'Core',
    items: [
      { name: 'Problem Solving', desc: 'Algorithmic thinking', Icon: Puzzle },
      { name: 'Logical Thinking', desc: 'Structured analysis', Icon: BrainCircuit },
      { name: 'Electronics', desc: 'Hardware integration', Icon: Cpu },
    ],
  },
  {
    title: 'Tools & Tech',
    items: [
      { name: 'IoT', desc: 'Connected devices', Icon: Wifi },
      { name: 'LiFi', desc: 'Light-based comms', Icon: Lightbulb },
      { name: 'NFC', desc: 'Near-field comm', Icon: Smartphone },
      { name: 'Web Dev', desc: 'HTML / CSS / JS', Icon: Globe },
    ],
  },
  {
    title: 'Soft Skills',
    items: [
      { name: 'Team Collab', desc: 'Cross-functional teams', Icon: Users },
      { name: 'Communication', desc: 'Clear & effective', Icon: MessageSquare },
      { name: 'Adaptability', desc: 'Fast learner', Icon: RefreshCw },
      { name: 'Creative Solving', desc: 'Out-of-the-box', Icon: Sparkles },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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

      // Skill cards stagger from different directions
      const cards = sectionRef.current?.querySelectorAll('.skill-card');
      if (cards) {
        Array.from(cards).forEach((card, i) => {
          const direction = i % 3;
          const fromX = direction === 0 ? -40 : direction === 1 ? 40 : 0;
          const fromY = direction === 2 ? 40 : 0;

          gsap.fromTo(
            card,
            { x: fromX, y: fromY, opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      // Group titles
      const groupTitles = sectionRef.current?.querySelectorAll('.group-title');
      if (groupTitles) {
        gsap.fromTo(
          Array.from(groupTitles),
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
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
        <h2
          ref={headingRef}
          className="text-[#e63946] text-xs sm:text-sm font-heading uppercase tracking-[0.3em] mb-10 sm:mb-14"
        >
          Skills & Expertise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {skillGroups.map((group, gi) => (
            <div key={gi}>
              <h3 className="group-title text-[#f5f0eb] text-lg sm:text-xl font-heading font-semibold mb-5 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#e63946]" />
                {group.title}
              </h3>
              <div className="flex flex-col gap-3">
                {group.items.map((skill, si) => {
                  const SkillIcon = skill.Icon;
                  return (
                    <div
                      key={si}
                      className="skill-card glow-border rounded-xl border border-[#f5f0eb]/8 bg-[#111111] p-4 flex items-center gap-4 hover:bg-[#111111]/80 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#e63946]/10 border border-[#e63946]/15 flex items-center justify-center flex-shrink-0">
                        <SkillIcon size={18} className="text-[#e63946]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#f5f0eb] text-sm sm:text-base font-heading font-medium truncate">
                          {skill.name}
                        </p>
                        <p className="text-[#666] text-xs truncate">{skill.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20 sm:mt-28 max-w-[1800px] mx-auto" />
    </section>
  );
}
