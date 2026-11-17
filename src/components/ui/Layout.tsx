import { ReactNode, forwardRef } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`site-container ${className}`}>{children}</div>;
}

export type SectionSurface = 'light' | 'alt' | 'dark' | 'dark-elevated';

interface SectionWrapperProps {
  id?: string;
  ariaLabel?: string;
  surface?: SectionSurface;
  withGrid?: boolean;
  bordered?: boolean;
  className?: string;
  children: ReactNode;
}

const SURFACE_CLASSES: Record<SectionSurface, string> = {
  light:
    'bg-[var(--color-background)] text-[var(--color-text)] border-[var(--color-border)]',
  alt: 'bg-[var(--color-background-alt)] text-[var(--color-text)] border-[var(--color-border)]',
  dark: 'bg-[var(--color-dark-background)] text-[var(--color-text-light)] border-[var(--color-border-dark)]',
  'dark-elevated':
    'bg-[var(--color-dark-surface)] text-[var(--color-text-light)] border-[var(--color-border-dark)]',
};

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  function SectionWrapper(
    {
      id,
      ariaLabel,
      surface = 'light',
      withGrid = false,
      bordered = true,
      className = '',
      children,
    },
    ref
  ) {
    const gridClass = withGrid
      ? surface === 'dark' || surface === 'dark-elevated'
        ? 'obsidian-grid-pattern'
        : 'concrete-grid-pattern'
      : '';

    return (
      <section
        id={id}
        ref={ref}
        aria-label={ariaLabel}
        className={`relative section-wrapper ${SURFACE_CLASSES[surface]} ${gridClass} ${
          bordered ? 'border-b' : ''
        } ${className}`}
      >
        {children}
      </section>
    );
  }
);
