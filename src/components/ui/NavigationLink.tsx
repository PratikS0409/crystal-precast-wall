import { AnchorHTMLAttributes } from 'react';

interface NavigationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  label: string;
}

export function NavigationLink({
  isActive = false,
  label,
  className = '',
  ...rest
}: NavigationLinkProps) {
  return (
    <a
      className={`group relative py-2 text-[13px] font-medium tracking-[0.06em] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[var(--radius-small)] ${
        isActive
          ? 'text-[var(--color-accent)]'
          : 'text-[var(--color-text-light)]/85 hover:text-[var(--color-text-light)]'
      } ${className}`}
      {...rest}
    >
      {label}
      <span
        aria-hidden="true"
        className={`absolute left-0 right-0 bottom-0.5 h-[1.5px] bg-[var(--color-primary)] transition-transform duration-200 origin-left ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </a>
  );
}
