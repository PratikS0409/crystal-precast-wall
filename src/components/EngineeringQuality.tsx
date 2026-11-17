import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationConfig } from '../config/animation';
import { ENGINEERING_CONTROLS } from '../data/industries';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { ImageReveal } from './ui/ImageReveal';
import { Container, SectionWrapper } from './ui/Layout';
import { SectionHeading } from './ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export function EngineeringQuality() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile, prefersReducedMotion, durationMultiplier } = useResponsiveMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('[data-eq-item]');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { y: isMobile ? 14 : 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: animationConfig.duration * durationMultiplier,
            stagger: animationConfig.stagger,
            ease: animationConfig.ease,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: animationConfig.scrollTrigger.start,
              once: animationConfig.scrollTrigger.once,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion, durationMultiplier]);

  return (
    <SectionWrapper id="engineering-quality" ref={sectionRef} surface="dark-elevated" withGrid>
      <Container>
        <SectionHeading
          dark
          kicker="Engineering & Quality Process"
          lines={['Controlled Yard Discipline', 'Before Every Dispatch.']}
          subtitle="Precast reliability starts before erection on site. Each panel and vertical H-post follows four practical production checks across casting, curing, and yard inspection."
        />

        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 divide-y divide-[var(--color-border-dark)] border-y border-[var(--color-border-dark)]">
            {ENGINEERING_CONTROLS.map((ctrl) => (
              <div key={ctrl.code} data-eq-item className="py-6 sm:py-7">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="label-uppercase text-[var(--color-accent)]">{ctrl.code}</span>
                  <span aria-hidden="true" className="text-[var(--color-text-light-muted)]/40">
                    ·
                  </span>
                  <h3 className="heading-md text-lg sm:text-xl text-[var(--color-text-light)]">
                    {ctrl.title}
                  </h3>
                </div>
                <p className="body-small font-medium text-[var(--color-background-alt)]/90">
                  {ctrl.summary}
                </p>
                <p className="mt-2 body-small text-[var(--color-text-light-muted)]">{ctrl.detail}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="relative aspect-[16/10] bg-[var(--color-dark-background)] border border-[var(--color-border-dark)] rounded-[var(--radius-small)] overflow-hidden group">
              <ImageReveal
                direction="up"
                src="/src/assets/images/mfg_inspection_1794890284356.jpg"
                alt="Dimensional inspection of cured RCC precast concrete boundary wall panel"
                fallbackLabel="Dimensional Check & Edge Finish"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-dark-background)]/90 to-transparent pointer-events-none"
              />
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <span className="label-uppercase text-[var(--color-accent)]">
                  Pre-Dispatch Verification
                </span>
                <p className="body-small text-[var(--color-text-light)] mt-0.5">
                  Straightness, edge chamfer &amp; slot clearance inspection
                </p>
              </div>
            </div>

            <div className="relative aspect-[16/10] bg-[var(--color-dark-background)] border border-[var(--color-border-dark)] rounded-[var(--radius-small)] overflow-hidden group">
              <ImageReveal
                direction="up"
                delay={0.1}
                src="/src/assets/images/mfg_curing_1794890284395.jpg"
                alt="Controlled water curing bay for demoulded RCC precast concrete boundary panels"
                fallbackLabel="Controlled Water Curing Bay"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-dark-background)]/90 to-transparent pointer-events-none"
              />
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <span className="label-uppercase text-[var(--color-accent)]">
                  Curing Discipline
                </span>
                <p className="body-small text-[var(--color-text-light)] mt-0.5">
                  Dedicated moisture curing bays prior to yard stacking
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
