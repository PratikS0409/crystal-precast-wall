import { ClipReveal } from '../../animations/MotionPrimitives';
import { SafeImage } from '../SafeImage';

interface ImageRevealProps {
  src: string;
  alt: string;
  fallbackLabel?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  loading?: 'lazy' | 'eager';
  className?: string;
  imgClassName?: string;
}

export function ImageReveal({
  src,
  alt,
  fallbackLabel,
  direction = 'up',
  delay = 0,
  loading = 'lazy',
  className = '',
  imgClassName = 'w-full h-full object-cover',
}: ImageRevealProps) {
  return (
    <ClipReveal direction={direction} delay={delay} className={className}>
      <SafeImage
        src={src}
        alt={alt}
        loading={loading}
        fallbackLabel={fallbackLabel}
        className={imgClassName}
      />
    </ClipReveal>
  );
}
