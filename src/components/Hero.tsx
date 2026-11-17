import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { animationConfig } from '../config/animation';
import { COMPANY } from '../config/company';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { SafeImage } from './SafeImage';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { Container } from './ui/Layout';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreWork: () => void;
  onGetQuote: () => void;
  onScrollNext: () => void;
}

export function Hero({ onExploreWork, onGetQuote, onScrollNext }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const introCurtainRef = useRef<HTMLDivElement>(null);
  const introWordmarkRef = useRef<HTMLSpanElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const bgClipRef = useRef<HTMLDivElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { isMobile, prefersReducedMotion, durationMultiplier } = useResponsiveMotion();
  const [introDone, setIntroDone] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroDone(true);
      return;
    }

    const dur = (base: number) => base * durationMultiplier;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIntroDone(true),
      });

      if (!isMobile && introCurtainRef.current && introWordmarkRef.current) {
        tl.fromTo(
          introWordmarkRef.current,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: dur(0.48), ease: animationConfig.ease }
        )
          .fromTo(
            goldLineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: dur(0.45), ease: 'power2.inOut' },
            '-=0.15'
          )
          .to(
            introCurtainRef.current,
            {
              opacity: 0,
              duration: dur(0.45),
              ease: 'power2.out',
              pointerEvents: 'none',
            },
            '+=0.08'
          );
      } else if (introCurtainRef.current) {
        gsap.set(introCurtainRef.current, { opacity: 0, display: 'none' });
        setIntroDone(true);
      }

      if (bgClipRef.current) {
        const useClip = !isMobile || animationConfig.mobileIntensity.enableClipReveal;
        tl.fromTo(
          bgClipRef.current,
          useClip
            ? { clipPath: 'inset(6% 4% 6% 4%)', opacity: 0.35, scale: 1.08 }
            : { opacity: 0.4, scale: 1.04 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            scale: 1,
            duration: dur(1.0),
            ease: animationConfig.ease,
            clearProps: 'clipPath,transform',
          },
          isMobile ? 0 : '-=0.32'
        );
      }

      if (contentRef.current) {
        const label = contentRef.current.querySelector('[data-hero-label]');
        const headlineLines = contentRef.current.querySelectorAll('[data-hero-line]');
        const subtext = contentRef.current.querySelector('[data-hero-sub]');
        const ctas = contentRef.current.querySelectorAll('[data-hero-cta]');

        if (label) {
          tl.fromTo(
            label,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: dur(0.5), ease: animationConfig.ease },
            isMobile ? 0.08 : '-=0.65'
          );
        }

        if (headlineLines.length > 0) {
          tl.fromTo(
            headlineLines,
            { yPercent: 105, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: dur(animationConfig.duration),
              stagger: animationConfig.stagger,
              ease: animationConfig.ease,
              clearProps: 'transform',
            },
            '-=0.35'
          );
        }

        if (subtext) {
          tl.fromTo(
            subtext,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: dur(0.55), ease: animationConfig.ease },
            '-=0.4'
          );
        }

        if (ctas.length > 0) {
          tl.fromTo(
            ctas,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: dur(0.5),
              stagger: animationConfig.stagger,
              ease: animationConfig.ease,
              clearProps: 'transform',
            },
            '-=0.35'
          );
        }
      }

      const allowParallax =
        animationConfig.parallax.enabled &&
        (!isMobile || animationConfig.mobileIntensity.enableParallax);

      if (allowParallax && bgParallaxRef.current && sectionRef.current) {
        gsap.to(bgParallaxRef.current, {
          yPercent: animationConfig.parallax.heroYPercent,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion, durationMultiplier]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-end lg:items-center bg-[var(--color-dark-background)] text-[var(--color-text-light)] overflow-hidden pt-24 pb-16 sm:pb-20 lg:py-28"
    >
      {!introDone && !prefersReducedMotion && !isMobile && (
        <div
          ref={introCurtainRef}
          aria-hidden="true"
          className="fixed inset-0 z-50 bg-[var(--color-dark-background)] flex flex-col items-center justify-center px-6 pointer-events-none"
        >
          <div className="overflow-hidden">
            <span
              ref={introWordmarkRef}
              className="block font-heading text-lg sm:text-2xl font-semibold tracking-[0.28em] uppercase text-[var(--color-text-light)]"
            >
              {COMPANY.shortName}
            </span>
          </div>
          <div
            ref={goldLineRef}
            className="mt-4 w-48 sm:w-64 h-[1.5px] bg-[var(--color-primary)] origin-left"
          />
        </div>
      )}

      <div ref={bgClipRef} className="absolute inset-0 will-change-transform pointer-events-none">
        <div ref={bgParallaxRef} className="w-full h-full -mt-6 scale-105 will-change-transform">
          <SafeImage
            src={COMPANY.logoPath}
            alt="Massive RCC precast concrete boundary wall installation in an Indian industrial estate at golden hour"
            loading="eager"
            fallbackLabel={`${COMPANY.legalName} — India`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-background)] via-[var(--color-dark-background)]/65 to-[var(--color-dark-background)]/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-dark-background)]/92 via-[var(--color-dark-background)]/55 to-transparent"
      />

      <Container className="relative z-10">
        <div ref={contentRef} className="max-w-3xl">
          <p
            data-hero-label
            className="label-uppercase text-[var(--color-accent)] mb-5 sm:mb-6"
          >
            {COMPANY.heroLabel}
          </p>

          <h1 className="heading-display text-[var(--color-text-light)]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                BUILT STRONG.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                BUILT TO LAST.
              </span>
            </span>
          </h1>

          <p
            data-hero-sub
            className="mt-5 sm:mt-6 max-w-xl body-large text-[var(--color-background-alt)]/85"
          >
            {COMPANY.tagline}
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
            <PrimaryButton data-hero-cta onClick={onExploreWork}>
              <span>EXPLORE OUR WORK</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </PrimaryButton>

            <SecondaryButton data-hero-cta tone="dark" onClick={onGetQuote}>
              <span>GET A QUOTE</span>
              <ArrowUpRight className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
            </SecondaryButton>
          </div>
        </div>
      </Container>

      <button
        type="button"
        onClick={onScrollNext}
        aria-label="Scroll to About Us section"
        className="hidden md:flex flex-col items-center gap-2 absolute bottom-8 right-10 z-10 text-[var(--color-background-alt)]/75 hover:text-[var(--color-accent)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] p-2"
      >
        <span className="label-uppercase">Scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />
        <ArrowDown className="w-4 h-4 animate-bounce text-[var(--color-primary)]" aria-hidden="true" />
      </button>
    </section>
  );
}
