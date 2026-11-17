import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin } from 'lucide-react';
import { GoldUnderline, SplitHeading } from '../animations/MotionPrimitives';
import { animationConfig } from '../config/animation';
import { COMPANY } from '../config/company';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { SecondaryButton } from './ui/Buttons';
import { ImageReveal } from './ui/ImageReveal';
import { Container, SectionWrapper } from './ui/Layout';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  onDiscover: () => void;
}

export function About({ onDiscover }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile, prefersReducedMotion, durationMultiplier } = useResponsiveMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const reveals = sectionRef.current?.querySelectorAll('[data-about-reveal]');
      if (reveals && reveals.length > 0) {
        gsap.fromTo(
          reveals,
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
    <SectionWrapper id="about" ref={sectionRef} surface="light" withGrid>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-1">
            <div>
              <div
                data-about-reveal
                className="flex flex-wrap items-center gap-x-3 gap-y-1 label-uppercase text-[var(--color-muted)] mb-4"
              >
                <span>About {COMPANY.legalName}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[var(--color-primary-deep)]">
                  {COMPANY.structuredAddress.addressLocality},{' '}
                  {COMPANY.structuredAddress.addressRegion}
                </span>
              </div>

              <SplitHeading
                as="h2"
                lines={['ENGINEERING STRENGTH.', 'CREATING BOUNDARIES.']}
                className="heading-lg text-[var(--color-text)]"
              />

              <GoldUnderline className="mt-5" />

              <div
                data-about-reveal
                className="mt-7 space-y-5 body-normal text-[var(--color-muted)] max-w-xl"
              >
                <p>
                  <strong className="font-semibold text-[var(--color-text)]">
                    {COMPANY.name}
                  </strong>{' '}
                  is an Indian RCC precast concrete boundary wall manufacturing and installation
                  company operating from {COMPANY.structuredAddress.streetAddress},{' '}
                  {COMPANY.structuredAddress.addressLocality}. We produce modular reinforced
                  concrete panels and vertical support posts designed to enclose residential,
                  industrial, commercial, and agricultural properties with structural dependability.
                </p>
                <p>
                  By casting perimeter components under controlled yard conditions rather than
                  relying solely on slow on-site masonry, we help project owners achieve clean
                  architectural lines, predictable site execution, and lasting perimeter protection.
                </p>
              </div>
            </div>

            <div data-about-reveal className="mt-10 pt-8 border-t border-[var(--color-border)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="p-5 bg-[var(--color-background-alt)] border border-[var(--color-border)] rounded-[var(--radius-small)]">
                  <span className="block label-uppercase text-[var(--color-muted)] mb-1.5">
                    Core Focus
                  </span>
                  <p className="font-heading text-base font-semibold text-[var(--color-text)]">
                    RCC Precast Manufacturing &amp; Site Erection
                  </p>
                </div>
                <div className="p-5 bg-[var(--color-background-alt)] border border-[var(--color-border)] rounded-[var(--radius-small)]">
                  <span className="block label-uppercase text-[var(--color-muted)] mb-1.5">
                    Manufacturing Base
                  </span>
                  <p className="font-heading text-base font-semibold text-[var(--color-text)] flex items-start gap-1.5">
                    <MapPin
                      className="w-4 h-4 text-[var(--color-primary-deep)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      {COMPANY.structuredAddress.addressLocality},{' '}
                      {COMPANY.structuredAddress.addressRegion}
                    </span>
                  </p>
                </div>
              </div>

              <SecondaryButton tone="solid-dark" onClick={onDiscover} className="w-full sm:w-auto">
                <span>DISCOVER OUR COMPANY</span>
                <ArrowRight className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
              </SecondaryButton>
            </div>
          </div>

          <div className="lg:col-span-6 flex">
            <div className="relative w-full min-h-[300px] sm:min-h-[420px] lg:min-h-full bg-[var(--color-dark-surface)] border border-[var(--color-border)] rounded-[var(--radius-small)] overflow-hidden">
              <ImageReveal
                direction="right"
                src="/src/assets/images/about_precast_yard_1794890279806.jpg"
                alt="Crystal Precast Wall manufacturing yard with stacked cured RCC precast boundary panels and vertical H-posts"
                fallbackLabel="Khopoli Precast Manufacturing Yard"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-dark-background)]/85 via-[var(--color-dark-background)]/35 to-transparent pointer-events-none"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-[var(--color-text-light)] pointer-events-none">
                <div>
                  <span className="block label-uppercase text-[var(--color-accent)]">
                    Precast Production Yard
                  </span>
                  <p className="body-small text-[var(--color-background-alt)]/90 mt-0.5">
                    {COMPANY.structuredAddress.streetAddress},{' '}
                    {COMPANY.structuredAddress.addressLocality} — Panels &amp; Vertical Columns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
