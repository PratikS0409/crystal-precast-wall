export interface AnimationConfig {
  enabled: boolean;
  duration: number;
  stagger: number;
  ease: string;
  motionEase: [number, number, number, number];
  scrollTrigger: {
    start: string;
    once: boolean;
  };
  imageReveal: {
    duration: number;
    ease: string;
  };
  parallax: {
    enabled: boolean;
    heroYPercent: number;
    aboutZoomStart: number;
  };
  hoverTransition: {
    durationMs: number;
  };
  pageTransition: {
    duration: number;
  };
  mobileIntensity: {
    enabled: boolean;
    durationMultiplier: number;
    enableParallax: boolean;
    enableClipReveal: boolean;
  };
  enableLenisSmoothScroll: boolean;
  enableCustomCursor: boolean;
  respectReducedMotion: boolean;
}

/**
 * CENTRALIZED ANIMATION CONFIGURATION
 * -----------------------------------------------------------------------------
 * Adjust animation timing, scroll triggers, parallax, custom cursor, or
 * disable animations globally from this file.
 */
export const animationConfig: AnimationConfig = {
  enabled: true,
  duration: 0.78,
  stagger: 0.1,
  ease: 'power3.out',
  motionEase: [0.16, 1, 0.3, 1],
  scrollTrigger: {
    start: 'top 84%',
    once: true,
  },
  imageReveal: {
    duration: 0.85,
    ease: 'power3.out',
  },
  parallax: {
    enabled: true,
    heroYPercent: 14,
    aboutZoomStart: 1.07,
  },
  hoverTransition: {
    durationMs: 200,
  },
  pageTransition: {
    duration: 0.24,
  },
  mobileIntensity: {
    enabled: true,
    durationMultiplier: 0.7,
    enableParallax: false,
    enableClipReveal: false,
  },
  enableLenisSmoothScroll: true,
  enableCustomCursor: true,
  respectReducedMotion: true,
};
