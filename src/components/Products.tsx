import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Layers, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { animationConfig } from '../config/animation';
import { PRODUCTS, ProductItem } from '../data/products';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { SafeImage } from './SafeImage';
import { PrimaryButton } from './ui/Buttons';
import { Container, SectionWrapper } from './ui/Layout';
import { ProductCard } from './ui/ProductCard';
import { SectionHeading } from './ui/SectionHeading';

interface ProductsProps {
  onRequestProductQuote: (productTitle: string) => void;
}

export function Products({ onRequestProductQuote }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const { prefersReducedMotion } = useResponsiveMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    if (selectedProduct) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  const leadProduct = PRODUCTS[0];
  const secondaryProducts = PRODUCTS.slice(1, 3);
  const customProduct = PRODUCTS[3];

  return (
    <SectionWrapper id="products" surface="alt">
      <Container>
        <SectionHeading
          kicker="Engineered Product Systems"
          lines={['Modular RCC Systems Built for Site Alignment.']}
          subtitle="Every boundary component is produced to work together as a unified enclosure system. Click any product to open full specifications, benefits, and use-case examples."
        />

        <div className="mt-10 sm:mt-12 space-y-8 sm:space-y-10">
          {leadProduct && (
            <ProductCard
              product={leadProduct}
              variant="lead"
              onSelect={setSelectedProduct}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {secondaryProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="grid"
                delay={idx * 0.08}
                className={idx === 0 ? 'lg:col-span-5' : 'lg:col-span-7'}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>

          {customProduct && (
            <ProductCard
              product={customProduct}
              variant="dark-split"
              onSelect={setSelectedProduct}
            />
          )}
        </div>
      </Container>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : animationConfig.pageTransition.duration,
            }}
            className="fixed inset-0 z-50 bg-[var(--color-dark-background)]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              transition={{
                duration: prefersReducedMotion ? 0 : animationConfig.pageTransition.duration,
                ease: animationConfig.motionEase,
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] rounded-[var(--radius-small)] overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col"
            >
              <div className="px-5 sm:px-8 py-4 bg-[var(--color-dark-surface)] text-[var(--color-text-light)] border-b border-[var(--color-border-dark)] flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <Layers
                    className="w-4 h-4 text-[var(--color-accent)] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="label-uppercase text-[var(--color-accent)] truncate">
                    System {selectedProduct.index} · {selectedProduct.categoryLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  aria-label="Close product details"
                  className="w-11 h-11 inline-flex items-center justify-center border border-[var(--color-border-dark)] hover:border-[var(--color-accent)] text-[var(--color-text-light)] rounded-[var(--radius-small)] transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto bg-[var(--color-dark-surface)]">
                    <SafeImage
                      src={selectedProduct.image}
                      alt={selectedProduct.alt}
                      fallbackLabel={selectedProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="lg:col-span-7 p-5 sm:p-8 space-y-6">
                    <div>
                      <h3
                        id="product-modal-title"
                        className="heading-md text-2xl sm:text-3xl text-[var(--color-text)]"
                      >
                        {selectedProduct.title}
                      </h3>
                      <p className="mt-3 body-small sm:text-base text-[var(--color-muted)]">
                        {selectedProduct.detailedOverview}
                      </p>
                    </div>

                    <div className="border border-[var(--color-border)] bg-[var(--color-surface)] rounded-[var(--radius-small)] overflow-hidden">
                      <div className="px-4 py-2.5 bg-[var(--color-background-alt)] border-b border-[var(--color-border)]">
                        <h4 className="label-uppercase font-semibold text-[var(--color-text)]">
                          System Specifications
                        </h4>
                      </div>
                      <dl className="divide-y divide-[var(--color-background-alt)]">
                        {selectedProduct.specifications.map((spec) => (
                          <div
                            key={spec.label}
                            className="px-4 py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm"
                          >
                            <dt className="sm:col-span-5 font-medium text-[var(--color-muted)]">
                              {spec.label}
                            </dt>
                            <dd className="sm:col-span-7 font-semibold text-[var(--color-text)]">
                              {spec.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      <div>
                        <h4 className="font-heading text-xs uppercase tracking-[0.16em] font-semibold text-[var(--color-text)] mb-3">
                          Key Benefits
                        </h4>
                        <ul className="space-y-2.5 body-small text-[var(--color-muted)]">
                          {selectedProduct.benefits.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check
                                className="w-4 h-4 text-[var(--color-primary-deep)] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-heading text-xs uppercase tracking-[0.16em] font-semibold text-[var(--color-text)] mb-3">
                          Use-Case Examples
                        </h4>
                        <ul className="space-y-2.5 body-small text-[var(--color-muted)]">
                          {selectedProduct.useCaseExamples.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span
                                aria-hidden="true"
                                className="w-1.5 h-1.5 bg-[var(--color-primary-deep)] rounded-full shrink-0 mt-2"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-8 py-4 bg-[var(--color-background-alt)] border-t border-[var(--color-border)] flex flex-wrap items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="min-h-[44px] px-5 py-2.5 text-xs font-heading font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
                >
                  Close
                </button>
                <PrimaryButton
                  onClick={() => {
                    const title = selectedProduct.title;
                    setSelectedProduct(null);
                    onRequestProductQuote(title);
                  }}
                >
                  <span>Request Quote for This System</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </PrimaryButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
