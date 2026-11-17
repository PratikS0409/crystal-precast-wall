import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariantProps = {
  children: ReactNode;
  className?: string;
};

type PrimaryButtonAsButton = ButtonVariantProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type PrimaryButtonAsLink = ButtonVariantProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type PrimaryButtonProps = PrimaryButtonAsButton | PrimaryButtonAsLink;

export function PrimaryButton(props: PrimaryButtonProps) {
  const { children, className = '', ...rest } = props;
  const classes = `btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${className}`;

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={(rest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? 'button'}
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export type SecondaryTone = 'dark' | 'light' | 'solid-dark';

type SecondaryBaseProps = {
  children: ReactNode;
  tone?: SecondaryTone;
  className?: string;
};

type SecondaryAsButton = SecondaryBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type SecondaryAsLink = SecondaryBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type SecondaryButtonProps = SecondaryAsButton | SecondaryAsLink;

const TONE_CLASSES: Record<SecondaryTone, string> = {
  dark: 'border border-[var(--color-border-dark)] bg-[var(--color-dark-surface)]/75 text-[var(--color-text-light)] hover:border-[var(--color-accent)] hover:bg-[var(--color-dark-surface)]',
  light:
    'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-deep)]',
  'solid-dark':
    'bg-[var(--color-text)] text-[var(--color-text-light)] hover:bg-[var(--color-dark-background)] border border-transparent',
};

export function SecondaryButton(props: SecondaryButtonProps) {
  const { children, tone = 'dark', className = '', ...rest } = props;
  const classes = `btn-secondary ${TONE_CLASSES[tone]} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${className}`;

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={(rest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? 'button'}
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
