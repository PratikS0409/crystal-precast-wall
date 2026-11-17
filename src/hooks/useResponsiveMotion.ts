import { useEffect, useState } from 'react';
import { animationConfig } from '../config/animation';

export type ViewportTier = 'mobile' | 'tablet' | 'desktop';

export interface ResponsiveMotionState {
  tier: ViewportTier;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  animationsDisabled: boolean;
  isTouchDevice: boolean;
  durationMultiplier: number;
}

export function useResponsiveMotion(): ResponsiveMotionState {
  const [state, setState] = useState<ResponsiveMotionState>(() => {
    if (typeof window === 'undefined') {
      return {
        tier: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        prefersReducedMotion: false,
        animationsDisabled: !animationConfig.enabled,
        isTouchDevice: false,
        durationMultiplier: 1,
      };
    }

    const width = window.innerWidth;
    const tier: ViewportTier = width < 768 ? 'mobile' : width < 1025 ? 'tablet' : 'desktop';
    const osReducedMotion =
      animationConfig.respectReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animationsDisabled = !animationConfig.enabled || osReducedMotion;
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const durationMultiplier =
      tier === 'mobile' && animationConfig.mobileIntensity.enabled
        ? animationConfig.mobileIntensity.durationMultiplier
        : 1;

    return {
      tier,
      isMobile: tier === 'mobile',
      isTablet: tier === 'tablet',
      isDesktop: tier === 'desktop',
      prefersReducedMotion: animationsDisabled,
      animationsDisabled,
      isTouchDevice,
      durationMultiplier,
    };
  });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const tier: ViewportTier = width < 768 ? 'mobile' : width < 1025 ? 'tablet' : 'desktop';
      const osReducedMotion =
        animationConfig.respectReducedMotion &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const animationsDisabled = !animationConfig.enabled || osReducedMotion;
      const isTouchDevice =
        window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      const durationMultiplier =
        tier === 'mobile' && animationConfig.mobileIntensity.enabled
          ? animationConfig.mobileIntensity.durationMultiplier
          : 1;

      setState({
        tier,
        isMobile: tier === 'mobile',
        isTablet: tier === 'tablet',
        isDesktop: tier === 'desktop',
        prefersReducedMotion: animationsDisabled,
        animationsDisabled,
        isTouchDevice,
        durationMultiplier,
      });
    };

    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    window.addEventListener('resize', update, { passive: true });
    motionMq.addEventListener('change', update);

    return () => {
      window.removeEventListener('resize', update);
      motionMq.removeEventListener('change', update);
    };
  }, []);

  return state;
}
