import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationConfig } from '../config/animation';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';

gsap.registerPlugin(ScrollTrigger);

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}

export function ClipReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}: ClipRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, prefersReducedMotion, durationMultiplier } = useResponsiveMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const useSimpleReveal = isMobile && !animationConfig.mobileIntensity.enableClipReveal;
    const fromClip =
      direction === 'left'
        ? 'inset(0 100% 0 0)'
        : direction === 'right'
        ? 'inset(0 0 0 100%)'
        : 'inset(14% 0 0 0)';

    const ctx = gsap.context(() => {
      if (useSimpleReveal) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: animationConfig.duration * durationMultiplier,
            delay,
            ease: animationConfig.ease,
            scrollTrigger: {
              trigger: el,
              start: animationConfig.scrollTrigger.start,
              once: animationConfig.scrollTrigger.once,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { clipPath: fromClip, opacity: 0.3, y: direction === 'up' ? 20 : 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            duration: animationConfig.imageReveal.duration * durationMultiplier,
            delay,
            ease: animationConfig.imageReveal.ease,
            clearProps: 'clipPath,transform',
            scrollTrigger: {
              trigger: el,
              start: animationConfig.scrollTrigger.start,
              once: animationConfig.scrollTrigger.once,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [direction, delay, isMobile, prefersReducedMotion, durationMultiplier]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface GoldUnderlineProps {
  className?: string;
  light?: boolean;
}

export function GoldUnderline({ className = '', light = false }: GoldUnderlineProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const { prefersReducedMotion, durationMultiplier } = useResponsiveMotion();

  useEffect(() => {
    const el = lineRef.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: animationConfig.duration * durationMultiplier,
          ease: animationConfig.ease,
          scrollTrigger: {
            trigger: el,
            start: animationConfig.scrollTrigger.start,
            once: animationConfig.scrollTrigger.once,
          },
        }
      );
    }, lineRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, durationMultiplier]);

  return (
    <span
      ref={lineRef}
      aria-hidden="true"
      className={`block h-[1.5px] w-16 origin-left ${
        light ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-primary-deep)]'
      } ${className}`}
    />
  );
}

interface SplitHeadingProps {
  lines: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SplitHeading({ lines, className = '', as = 'h2' }: SplitHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { isMobile, prefersReducedMotion, durationMultiplier } = useResponsiveMotion();

  useEffect(() => {
    const el = headingRef.current;
    if (!el || prefersReducedMotion) return;

    const lineNodes = el.querySelectorAll('[data-split-line]');
    if (lineNodes.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineNodes,
        { y: isMobile ? 16 : 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: animationConfig.duration * durationMultiplier,
          stagger: animationConfig.stagger,
          ease: animationConfig.ease,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start: animationConfig.scrollTrigger.start,
            once: animationConfig.scrollTrigger.once,
          },
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion, durationMultiplier]);

  const Tag = as;

  return (
    <Tag ref={headingRef} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-split-line className="block">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
