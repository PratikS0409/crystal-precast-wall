export interface ThemeConfig {
  colors: {
    primary: string;
    primaryHover: string;
    primaryDeep: string;
    secondary: string;
    background: string;
    backgroundAlt: string;
    surface: string;
    darkBackground: string;
    darkSurface: string;
    darkSurfaceMuted: string;
    text: string;
    muted: string;
    textLight: string;
    textLightMuted: string;
    border: string;
    borderDark: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  typography: {
    hero: string;
    h1: string;
    h2: string;
    h3: string;
    bodyLarge: string;
    body: string;
    bodySmall: string;
    label: string;
  };
  layout: {
    maxWidth: string;
    sectionPaddingDesktop: string;
    sectionPaddingTablet: string;
    sectionPaddingMobile: string;
    containerPadding: string;
  };
  radius: {
    small: string;
    medium: string;
    large: string;
  };
  buttons: {
    paddingY: string;
    paddingX: string;
    fontSize: string;
    letterSpacing: string;
    radius: string;
  };
}

/**
 * GLOBAL THEME CONFIGURATION
 * -----------------------------------------------------------------------------
 * Update colors, fonts, typography scales, layout spacing, radii, or button
 * styling here to automatically update the entire Crystal Precast Wall website.
 */
export const theme: ThemeConfig = {
  colors: {
    primary: '#C69C4D',
    primaryHover: '#D4AF63',
    primaryDeep: '#B0883C',
    secondary: '#181A1D',
    background: '#F4F3F0',
    backgroundAlt: '#EAE8E3',
    surface: '#FFFFFF',
    darkBackground: '#111214',
    darkSurface: '#181A1D',
    darkSurfaceMuted: '#25282D',
    text: '#1C1E21',
    muted: '#52565C',
    textLight: '#F4F3F0',
    textLightMuted: '#A3A8B0',
    border: '#D6D3CC',
    borderDark: 'rgba(255, 255, 255, 0.12)',
    accent: '#D4AF63',
  },

  fonts: {
    heading: '"Outfit", ui-sans-serif, system-ui, sans-serif',
    body: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
  },

  typography: {
    hero: 'clamp(2.15rem, 7vw, 5.25rem)',
    h1: 'clamp(2rem, 5vw, 4.25rem)',
    h2: 'clamp(1.85rem, 3.6vw, 3.1rem)',
    h3: 'clamp(1.25rem, 2.1vw, 1.85rem)',
    bodyLarge: 'clamp(1rem, 1.25vw, 1.18rem)',
    body: 'clamp(0.95rem, 1.05vw, 1.02rem)',
    bodySmall: '0.875rem',
    label: '0.75rem',
  },

  layout: {
    maxWidth: '1440px',
    sectionPaddingDesktop: '112px',
    sectionPaddingTablet: '80px',
    sectionPaddingMobile: '56px',
    containerPadding: 'clamp(1.25rem, 4vw, 3rem)',
  },

  radius: {
    small: '2px',
    medium: '4px',
    large: '10px',
  },

  buttons: {
    paddingY: '0.875rem',
    paddingX: '1.75rem',
    fontSize: '0.75rem',
    letterSpacing: '0.14em',
    radius: '2px',
  },
};

export function applyThemeCssVariables(activeTheme: ThemeConfig = theme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement.style;

  root.setProperty('--color-primary', activeTheme.colors.primary);
  root.setProperty('--color-primary-hover', activeTheme.colors.primaryHover);
  root.setProperty('--color-primary-deep', activeTheme.colors.primaryDeep);
  root.setProperty('--color-secondary', activeTheme.colors.secondary);
  root.setProperty('--color-background', activeTheme.colors.background);
  root.setProperty('--color-background-alt', activeTheme.colors.backgroundAlt);
  root.setProperty('--color-surface', activeTheme.colors.surface);
  root.setProperty('--color-dark-background', activeTheme.colors.darkBackground);
  root.setProperty('--color-dark-surface', activeTheme.colors.darkSurface);
  root.setProperty('--color-dark-surface-muted', activeTheme.colors.darkSurfaceMuted);
  root.setProperty('--color-text', activeTheme.colors.text);
  root.setProperty('--color-muted', activeTheme.colors.muted);
  root.setProperty('--color-text-light', activeTheme.colors.textLight);
  root.setProperty('--color-text-light-muted', activeTheme.colors.textLightMuted);
  root.setProperty('--color-border', activeTheme.colors.border);
  root.setProperty('--color-border-dark', activeTheme.colors.borderDark);
  root.setProperty('--color-accent', activeTheme.colors.accent);

  root.setProperty('--font-heading', activeTheme.fonts.heading);
  root.setProperty('--font-body', activeTheme.fonts.body);
  root.setProperty('--font-mono', activeTheme.fonts.mono);

  root.setProperty('--type-hero', activeTheme.typography.hero);
  root.setProperty('--type-h1', activeTheme.typography.h1);
  root.setProperty('--type-h2', activeTheme.typography.h2);
  root.setProperty('--type-h3', activeTheme.typography.h3);
  root.setProperty('--type-body-large', activeTheme.typography.bodyLarge);
  root.setProperty('--type-body', activeTheme.typography.body);
  root.setProperty('--type-body-small', activeTheme.typography.bodySmall);
  root.setProperty('--type-label', activeTheme.typography.label);

  root.setProperty('--layout-max-width', activeTheme.layout.maxWidth);
  root.setProperty('--section-padding-desktop', activeTheme.layout.sectionPaddingDesktop);
  root.setProperty('--section-padding-tablet', activeTheme.layout.sectionPaddingTablet);
  root.setProperty('--section-padding-mobile', activeTheme.layout.sectionPaddingMobile);
  root.setProperty('--container-padding', activeTheme.layout.containerPadding);

  root.setProperty('--radius-small', activeTheme.radius.small);
  root.setProperty('--radius-medium', activeTheme.radius.medium);
  root.setProperty('--radius-large', activeTheme.radius.large);

  root.setProperty('--btn-py', activeTheme.buttons.paddingY);
  root.setProperty('--btn-px', activeTheme.buttons.paddingX);
  root.setProperty('--btn-font-size', activeTheme.buttons.fontSize);
  root.setProperty('--btn-letter-spacing', activeTheme.buttons.letterSpacing);
  root.setProperty('--btn-radius', activeTheme.buttons.radius);
}
