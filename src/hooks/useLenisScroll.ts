import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationConfig } from '../config/animation';

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll(enabled: boolean) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled || !animationConfig.enabled || !animationConfig.enableLenisSmoothScroll) {
      return;
    }

    const prefersReduced =
      animationConfig.respectReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
