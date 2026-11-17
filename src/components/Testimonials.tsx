import { Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { animationConfig } from '../config/animation';
import { TESTIMONIALS } from '../data/testimonials';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { Container, SectionWrapper } from './ui/Layout';
import { SectionHeading } from './ui/SectionHeading';

export function Testimonials() {
  const { isMobile, prefersReducedMotion, durationMultiplier } = useResponsiveMotion();

  return (
    <SectionWrapper id="testimonials" surface="light" withGrid>
      <Container>
        <SectionHeading
          kicker="Client Perspectives"
          lines={['Trusted by Industrial & Property Teams.']}
          rightSlot={
            <p className="max-w-md label-uppercase text-[var(--color-muted)]">
              Sample client endorsements — editable in src/data/testimonials.ts
            </p>
          }
        />

        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {TESTIMONIALS.map((item, idx) => (
            <motion.blockquote
              key={item.id}
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 12 : 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.55 * durationMultiplier,
                delay: prefersReducedMotion || isMobile ? 0 : idx * (animationConfig.stagger * 0.8),
                ease: animationConfig.motionEase,
              }}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-small)] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <Quote
                    className="w-6 h-6 text-[var(--color-primary)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="label-uppercase text-[var(--color-muted)]">
                    {item.projectType}
                  </span>
                </div>

                <p className="body-normal text-[var(--color-text)]">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <footer className="mt-7 pt-5 border-t border-[var(--color-background-alt)]">
                <cite className="not-italic block font-heading text-base font-semibold text-[var(--color-text)]">
                  {item.clientName}
                </cite>
                <span className="block body-small text-[var(--color-muted)] mt-0.5">
                  {item.role}, {item.company}
                </span>
                <span className="block label-uppercase text-[var(--color-primary-deep)] mt-2">
                  {item.location}
                </span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
