import { ArrowRight } from 'lucide-react';
import { ClipReveal } from '../../animations/MotionPrimitives';
import { ProductItem } from '../../data/products';
import { SafeImage } from '../SafeImage';

interface ProductCardProps {
  product: ProductItem;
  variant?: 'lead' | 'grid' | 'dark-split';
  delay?: number;
  className?: string;
  onSelect: (product: ProductItem) => void;
}

export function ProductCard({
  product,
  variant = 'grid',
  delay = 0,
  className = '',
  onSelect,
}: ProductCardProps) {
  if (variant === 'lead' || variant === 'dark-split') {
    const isDark = variant === 'dark-split';

    return (
      <ClipReveal direction={isDark ? 'right' : 'left'} delay={delay}>
        <article
          className={`grid grid-cols-1 lg:grid-cols-12 rounded-[var(--radius-small)] overflow-hidden items-stretch border ${
            isDark
              ? 'bg-[var(--color-dark-surface)] text-[var(--color-text-light)] border-[var(--color-dark-surface-muted)]'
              : 'bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)]'
          }`}
        >
          <button
            type="button"
            data-cursor="view"
            onClick={() => onSelect(product)}
            aria-label={`Inspect ${product.title} specifications`}
            className={`lg:col-span-7 relative min-h-[240px] sm:min-h-[360px] bg-[var(--color-dark-background)] overflow-hidden group cursor-pointer text-left ${
              isDark ? 'order-1 lg:order-2' : ''
            }`}
          >
            <SafeImage
              src={product.image}
              alt={product.alt}
              fallbackLabel={product.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </button>

          <div
            className={`lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between ${
              isDark ? 'order-2 lg:order-1' : ''
            }`}
          >
            <div>
              <div
                className={`flex items-center gap-3 label-uppercase mb-4 ${
                  isDark ? 'text-[var(--color-text-light-muted)]' : 'text-[var(--color-muted)]'
                }`}
              >
                <span
                  className={`font-semibold ${
                    isDark ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary-deep)]'
                  }`}
                >
                  {product.index}
                </span>
                <span aria-hidden="true">/</span>
                <span>{product.categoryLabel}</span>
              </div>
              <h3
                className={`heading-md text-2xl sm:text-3xl text-balance ${
                  isDark ? 'text-[var(--color-text-light)]' : 'text-[var(--color-text)]'
                }`}
              >
                {product.title}
              </h3>
              <p
                className={`mt-4 body-normal ${
                  isDark
                    ? 'text-[var(--color-background-alt)]/85'
                    : 'text-[var(--color-muted)]'
                }`}
              >
                {product.shortDescription}
              </p>
              <p
                className={`mt-4 body-small ${
                  isDark ? 'text-[var(--color-text-light-muted)]' : 'text-[var(--color-muted)]/90'
                }`}
              >
                {product.detailedOverview}
              </p>
            </div>

            <div
              className={`mt-8 pt-6 border-t flex flex-wrap items-center justify-between gap-4 ${
                isDark ? 'border-[var(--color-border-dark)]' : 'border-[var(--color-background-alt)]'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelect(product)}
                className={`min-h-[44px] inline-flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                  isDark
                    ? 'text-[var(--color-accent)] hover:text-[var(--color-text-light)]'
                    : 'text-[var(--color-text)] hover:text-[var(--color-primary-deep)]'
                }`}
              >
                <span>Explore Details &amp; Specs</span>
                <ArrowRight
                  className={`w-4 h-4 ${isDark ? '' : 'text-[var(--color-primary-deep)]'}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </article>
      </ClipReveal>
    );
  }

  return (
    <ClipReveal direction={delay > 0 ? 'right' : 'left'} delay={delay} className={`flex ${className}`}>
      <article className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-small)] overflow-hidden flex flex-col">
        <button
          type="button"
          data-cursor="view"
          onClick={() => onSelect(product)}
          aria-label={`Inspect ${product.title} specifications`}
          className="aspect-[4/3] w-full bg-[var(--color-dark-surface)] overflow-hidden group cursor-pointer text-left"
        >
          <SafeImage
            src={product.image}
            alt={product.alt}
            fallbackLabel={product.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </button>
        <div className="p-6 sm:p-9 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 label-uppercase text-[var(--color-muted)] mb-3">
              <span className="text-[var(--color-primary-deep)] font-semibold">{product.index}</span>
              <span aria-hidden="true">·</span>
              <span>{product.categoryLabel}</span>
            </div>
            <h3 className="heading-md text-xl sm:text-2xl text-[var(--color-text)]">
              {product.title}
            </h3>
            <p className="mt-3 body-small sm:text-base text-[var(--color-muted)]">
              {product.shortDescription}
            </p>
          </div>

          <div className="mt-7 pt-5 border-t border-[var(--color-background-alt)]">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="min-h-[44px] inline-flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.14em] uppercase text-[var(--color-text)] hover:text-[var(--color-primary-deep)] transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <span>Explore Details &amp; Specs</span>
              <ArrowRight className="w-4 h-4 text-[var(--color-primary-deep)]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    </ClipReveal>
  );
}
