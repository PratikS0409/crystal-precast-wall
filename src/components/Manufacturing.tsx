import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoldUnderline, SplitHeading } from '../animations/MotionPrimitives';
import { animationConfig } from '../config/animation';
import { COMPANY } from '../config/company';
import { MANUFACTURING_STAGES } from '../data/manufacturing';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { SafeImage } from './SafeImage';
import { Container, SectionWrapper } from './ui/Layout';

gsap.registerPlugin(ScrollTrigger);

export function Manufacturing() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timelineWrapRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { isMobile, prefersReducedMotion, durationMultiplier } = useResponsiveMotion();

  useEffect(() => {
    const stages = sectionRef.current?.querySelectorAll<HTMLElement>('[data-mfg-stage]');
    if (!stages || stages.length === 0) return;

    const ctx = gsap.context(() => {
      stages.forEach((stage, idx) => {
        ScrollTrigger.create({
          trigger: stage,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveStep(idx),
          onEnterBack: () => setActiveStep(idx),
        });

        if (!prefersReducedMotion) {
          gsap.fromTo(
            stage,
            { y: isMobile ? 16 : 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: animationConfig.duration * durationMultiplier,
              ease: animationConfig.ease,
              scrollTrigger: {
                trigger: stage,
                start: animationConfig.scrollTrigger.start,
                once: animationConfig.scrollTrigger.once,
              },
            }
          );
        }
      });

      if (!isMobile && !prefersReducedMotion && progressBarRef.current && timelineWrapRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineWrapRef.current,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion, durationMultiplier]);

  const jumpToStage = (idx: number) => {
    setActiveStep(idx);
    const el = sectionRef.current?.querySelector<HTMLElement>(`[data-mfg-stage="${idx}"]`);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
    }
  };

  return (
    <SectionWrapper id="manufacturing" ref={sectionRef} surface="light" withGrid>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="label-uppercase text-[var(--color-primary-deep)] mb-3">
              Manufacturing Workflow
            </p>
            <SplitHeading
              as="h2"
              lines={['Seven Disciplined Stages from Yard to Site.']}
              className="heading-lg text-[var(--color-text)]"
            />
            <GoldUnderline className="mt-4" />
            <p className="mt-4 body-small sm:text-base text-[var(--color-muted)]">
              Every precast wall panel and support post follows a structured seven-stage production
              and erection sequence.
            </p>

            <nav
              aria-label="Manufacturing Stages"
              className="mt-7 border-t border-[var(--color-border)]"
            >
              {MANUFACTURING_STAGES.map((stage, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => jumpToStage(idx)}
                    className={`w-full min-h-[46px] py-3 px-2.5 flex items-center justify-between gap-4 text-left border-b border-[var(--color-border)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                      isActive
                        ? 'text-[var(--color-text)] bg-[var(--color-background-alt)]/90'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`font-mono-tabular text-xs font-semibold shrink-0 ${
                          isActive
                            ? 'text-[var(--color-primary-deep)]'
                            : 'text-[var(--color-muted)]/70'
                        }`}
                      >
                        {stage.step}
                      </span>
                      <span className="font-heading text-sm font-medium truncate">
                        {stage.title}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`w-5 h-px transition-colors shrink-0 ${
                        isActive ? 'bg-[var(--color-primary-deep)]' : 'bg-transparent'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          <div ref={timelineWrapRef} className="lg:col-span-8 relative lg:pl-8">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-[var(--color-border)]"
            >
              <div
                ref={progressBarRef}
                className="w-full h-full bg-[var(--color-primary)] origin-top will-change-transform"
              />
            </div>

            <div className="space-y-8 sm:space-y-10">
              {MANUFACTURING_STAGES.map((stage, idx) => (
                <article
                  key={stage.step}
                  data-mfg-stage={idx}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-small)] overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                    <div className="md:col-span-7 aspect-[4/3] bg-[var(--color-dark-surface)] overflow-hidden group">
                      <SafeImage
                        src={stage.image}
                        alt={stage.alt}
                        fallbackLabel={`${stage.step}. ${stage.title}`}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <span className="font-mono-tabular text-3xl sm:text-4xl font-semibold text-[var(--color-primary)] tracking-tight block mb-3">
                          {stage.step}
                        </span>
                        <h3 className="heading-md text-xl sm:text-2xl text-[var(--color-text)]">
                          {stage.step}. {stage.title}
                        </h3>
                        <p className="mt-3 body-small sm:text-base text-[var(--color-muted)]">
                          {stage.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[var(--color-background-alt)] flex items-center justify-between label-uppercase text-[var(--color-muted)]">
                        <span>
                          Stage {stage.step} of{' '}
                          {String(MANUFACTURING_STAGES.length).padStart(2, '0')}
                        </span>
                        <span className="text-[var(--color-primary-deep)]">
                          {COMPANY.shortName}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
