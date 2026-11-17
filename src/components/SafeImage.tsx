import { useState } from 'react';
import { Layers } from 'lucide-react';
import { COMPANY } from '../config/company';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'lazy' | 'eager';
}

export function SafeImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
  loading = 'lazy',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-dark-surface-muted)] via-[var(--color-dark-surface)] to-[var(--color-dark-background)] text-[var(--color-text-light-muted)] p-6 text-center"
      >
        <Layers className="w-7 h-7 text-[var(--color-primary)] mb-2.5" strokeWidth={1.5} />
        <span className="font-heading text-xs uppercase tracking-[0.18em] text-[var(--color-background-alt)]">
          {fallbackLabel || COMPANY.legalName}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
