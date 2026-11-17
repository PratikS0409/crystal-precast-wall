import { Building2, Compass, Factory, Layers, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { GoldUnderline, SplitHeading } from '../animations/MotionPrimitives';
import { animationConfig } from '../config/animation';
import { COMPANY, WHY_CHOOSE_US, WhyChooseUsItem } from '../config/company';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { Container, SectionWrapper } from './ui/Layout';

function PillarIcon({ name }: { name: WhyChooseUsItem['iconName'] }) {
  const props = {
    className: 'w-5 h-5 text-[var(--color-primary-deep)]',
    strokeWidth: 1.75,
    'aria-hidden': true as const,
  };
  switch (name) {
    case 'layers':
      return <Layers {...props} />;
    case 'factory':
      return <Factory {...props} />;
    case 'compass':
      return <Compass {...props} />;
    case 'building':
      return <Building2 {...props} />;
    case 'sliders':
      return <SlidersHorizontal {...props} />;
  }
}

export function WhyChooseUs() {
  const { isMobile, prefersReducedMotion, durationMultiplier } = useResponsiveMotion();

  return (
    <SectionWrapper id="why-choose-us" surface="light" withGrid>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4">
            <p className="label-uppercase text-[var(--color-primary-deep)] mb-3">
              Why {COMPANY.legalName}
            </p>
            <SplitHeading
              as="h2"
              lines={['Practical Precast Engineering Without Guesswork.']}
              className="heading-lg text-[var(--color-text)]"
            />
            <GoldUnderline className="mt-4" />
            <p className="mt-4 body-small sm:text-base text-[var(--color-muted)]">
              We focus on straightforward manufacturing discipline, direct coordination, and boundary
              systems built to suit real Indian site conditions.
            </p>
          </div>

          <div className="lg:col-span-8 border-t border-[var(--color-border)]">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 10 : 16 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.48 * durationMultiplier,
                  delay: prefersReducedMotion || isMobile ? 0 : idx * (animationConfig.stagger * 0.6),
                  ease: animationConfig.motionEase,
                }}
                className="group py-6 sm:py-8 border-b border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start"
              >
                <div className="sm:col-span-5 flex items-center gap-4">
                  <div className="w-11 h-11 bg-[var(--color-background-alt)] border border-[var(--color-border)] group-hover:border-[var(--color-primary)] flex items-center justify-center rounded-[var(--radius-small)] shrink-0 transition-colors">
                    <motion.div
                      whileHover={prefersReducedMotion || isMobile ? undefined : { scale: 1.08 }}
                      transition={{ duration: 0.18 }}
                    >
                      <PillarIcon name={item.iconName} />
                    </motion.div>
                  </div>
                  <div>
                    <span className="block label-uppercase text-[var(--color-primary-deep)]">
                      {item.index}
                    </span>
                    <h3 className="heading-md text-lg sm:text-xl text-[var(--color-text)]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="sm:col-span-7 body-small sm:text-base text-[var(--color-muted)]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
