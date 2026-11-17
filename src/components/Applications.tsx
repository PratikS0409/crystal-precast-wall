import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { animationConfig } from '../config/animation';
import { INDUSTRY_APPLICATIONS } from '../data/industries';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { SafeImage } from './SafeImage';
import { SecondaryButton } from './ui/Buttons';
import { Container, SectionWrapper } from './ui/Layout';
import { SectionHeading } from './ui/SectionHeading';

interface ApplicationsProps {
  onEnquireSector: (projectType: string) => void;
}

export function Applications({ onEnquireSector }: ApplicationsProps) {
  const [activeId, setActiveId] = useState(INDUSTRY_APPLICATIONS[0].id);
  const { prefersReducedMotion } = useResponsiveMotion();

  const activeSector =
    INDUSTRY_APPLICATIONS.find((item) => item.id === activeId) ?? INDUSTRY_APPLICATIONS[0];

  return (
    <SectionWrapper id="applications" surface="alt">
      <Container>
        <SectionHeading
          kicker="Applications & Industries"
          lines={['Precast Boundaries Engineered Across Sectors.']}
          subtitle="Select a sector below to see how modular RCC post-and-panel walls adapt to industrial, residential, commercial, and agricultural site requirements."
        />

        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {INDUSTRY_APPLICATIONS.map((sector) => {
                const isActive = sector.id === activeSector.id;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => setActiveId(sector.id)}
                    className={`w-full min-h-[64px] py-5 px-4 text-left transition-colors cursor-pointer flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                      isActive
                        ? 'bg-[var(--color-dark-surface)] text-[var(--color-text-light)]'
                        : 'bg-transparent text-[var(--color-text)] hover:bg-[var(--color-background)]'
                    }`}
                  >
                    <div className="min-w-0">
                      <span
                        className={`block label-uppercase ${
                          isActive
                            ? 'text-[var(--color-accent)]'
                            : 'text-[var(--color-primary-deep)]'
                        }`}
                      >
                        {sector.index} · Sector
                      </span>
                      <span className="block font-heading text-lg sm:text-xl font-semibold mt-0.5 truncate">
                        {sector.sector}
                      </span>
                    </div>
                    <ArrowUpRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive
                          ? 'text-[var(--color-accent)] translate-x-0.5 -translate-y-0.5'
                          : 'text-[var(--color-muted)]'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 flex">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeSector.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : animationConfig.pageTransition.duration,
                  ease: animationConfig.motionEase,
                }}
                className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-small)] overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/9] w-full bg-[var(--color-dark-surface)] overflow-hidden">
                  <SafeImage
                    src={activeSector.image}
                    alt={activeSector.alt}
                    fallbackLabel={activeSector.sector}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 sm:p-9 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="label-uppercase text-[var(--color-primary-deep)]">
                      {activeSector.index} · {activeSector.sector}
                    </span>
                    <h3 className="heading-md text-2xl sm:text-3xl text-[var(--color-text)] mt-2 text-balance">
                      {activeSector.headline}
                    </h3>
                    <p className="mt-3 body-small sm:text-base text-[var(--color-muted)]">
                      {activeSector.description}
                    </p>

                    <ul className="mt-6 pt-5 border-t border-[var(--color-background-alt)] grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-sm text-[var(--color-text)]">
                      {activeSector.suitability.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <Check
                            className="w-4 h-4 text-[var(--color-primary-deep)] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span className="text-[var(--color-muted)]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[var(--color-background-alt)] flex flex-wrap items-center justify-between gap-4">
                    <SecondaryButton
                      tone="solid-dark"
                      onClick={() => onEnquireSector(activeSector.productSuggestion)}
                    >
                      <span>Enquire for {activeSector.sector}</span>
                      <ArrowUpRight className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
                    </SecondaryButton>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
