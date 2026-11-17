import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { animationConfig } from '../config/animation';
import { PROJECT_CATEGORIES, PROJECTS, ProjectCategory, ProjectLocation } from '../data/projects';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { SafeImage } from './SafeImage';
import { PrimaryButton } from './ui/Buttons';
import { Container, SectionWrapper } from './ui/Layout';
import { ProjectCard } from './ui/ProjectCard';
import { SectionHeading } from './ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  onEnquireSimilar: (projectContext: string) => void;
}

export function Projects({ onEnquireSimilar }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All');
  const [lightboxProject, setLightboxProject] = useState<ProjectLocation | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { isMobile, prefersReducedMotion, durationMultiplier } = useResponsiveMotion();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const currentIndex = lightboxProject
    ? filteredProjects.findIndex((p) => p.id === lightboxProject.id)
    : -1;

  const handlePrev = () => {
    if (filteredProjects.length === 0 || currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setLightboxProject(filteredProjects[prevIdx]);
  };

  const handleNext = () => {
    if (filteredProjects.length === 0 || currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % filteredProjects.length;
    setLightboxProject(filteredProjects[nextIdx]);
  };

  useEffect(() => {
    if (prefersReducedMotion || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('[data-project-card]');
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: isMobile ? 14 : 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: animationConfig.duration * durationMultiplier,
          stagger: animationConfig.stagger,
          ease: animationConfig.ease,
          scrollTrigger: {
            trigger: gridRef.current,
            start: animationConfig.scrollTrigger.start,
            once: animationConfig.scrollTrigger.once,
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion, durationMultiplier]);

  useEffect(() => {
    if (!lightboxProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxProject(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  });

  const filterControls = (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-small)] self-start lg:self-end"
    >
      {PROJECT_CATEGORIES.map((category) => {
        const isActive = activeFilter === category;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveFilter(category)}
            className={`min-h-[40px] px-3.5 py-2 text-xs font-heading font-semibold uppercase tracking-[0.1em] whitespace-nowrap shrink-0 rounded-[var(--radius-small)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
              isActive
                ? 'bg-[var(--color-text)] text-[var(--color-text-light)]'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );

  return (
    <SectionWrapper id="projects" surface="alt">
      <Container>
        <SectionHeading
          kicker="Our Work · Project Portfolio"
          lines={['Perimeter Installations Across Applications.']}
          rightSlot={filterControls}
        />
        <p className="mt-4 body-small text-[var(--color-muted)]">
          Featuring our Khopoli home facility alongside clearly labeled editable sample layouts
          across Maharashtra and Gujarat.
        </p>

        <div ref={gridRef}>
          <motion.div
            layout={!prefersReducedMotion}
            className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isFeatured={idx === 0 && activeFilter === 'All'}
                  prefersReducedMotion={prefersReducedMotion}
                  onSelect={setLightboxProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>

      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : animationConfig.pageTransition.duration,
            }}
            className="fixed inset-0 z-50 bg-[var(--color-dark-background)]/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setLightboxProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-project-title"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              transition={{
                duration: prefersReducedMotion ? 0 : animationConfig.pageTransition.duration,
                ease: animationConfig.motionEase,
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-[var(--color-dark-surface)] text-[var(--color-text-light)] border border-[var(--color-border-dark)] rounded-[var(--radius-small)] overflow-hidden shadow-2xl my-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:min-h-[460px] bg-[var(--color-dark-background)]">
                  <SafeImage
                    src={lightboxProject.image}
                    alt={lightboxProject.alt}
                    fallbackLabel={lightboxProject.title}
                    className="w-full h-full object-cover"
                  />

                  {filteredProjects.length > 1 && (
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between pointer-events-none">
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous project"
                        className="pointer-events-auto w-11 h-11 bg-[var(--color-dark-background)]/85 hover:bg-[var(--color-primary)] text-[var(--color-text-light)] hover:text-[var(--color-dark-background)] border border-[var(--color-border-dark)] flex items-center justify-center rounded-[var(--radius-small)] transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next project"
                        className="pointer-events-auto w-11 h-11 bg-[var(--color-dark-background)]/85 hover:bg-[var(--color-primary)] text-[var(--color-text-light)] hover:text-[var(--color-dark-background)] border border-[var(--color-border-dark)] flex items-center justify-center rounded-[var(--radius-small)] transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2 label-uppercase text-[var(--color-accent)]">
                        <span>{lightboxProject.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {lightboxProject.isDemo ? 'Editable Demo Entry' : 'Verified HQ Location'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLightboxProject(null)}
                        aria-label="Close project lightbox"
                        className="w-11 h-11 inline-flex items-center justify-center border border-[var(--color-border-dark)] hover:border-[var(--color-accent)] text-[var(--color-text-light)] rounded-[var(--radius-small)] transition-colors cursor-pointer shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <h3
                      id="lightbox-project-title"
                      className="heading-md text-2xl text-[var(--color-text-light)] mt-3"
                    >
                      {lightboxProject.title}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 body-small text-[var(--color-background-alt)]/85">
                      <MapPin
                        className="w-4 h-4 text-[var(--color-primary)] shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        {lightboxProject.city}, {lightboxProject.state}, India
                      </span>
                    </div>

                    <div className="mt-6 pt-5 border-t border-[var(--color-border-dark)] space-y-4">
                      <div>
                        <span className="block label-uppercase text-[var(--color-text-light-muted)] mb-1.5">
                          Project Overview
                        </span>
                        <p className="body-small sm:text-base text-[var(--color-background-alt)]/85">
                          {lightboxProject.description}
                        </p>
                      </div>

                      <div>
                        <span className="block label-uppercase text-[var(--color-text-light-muted)] mb-1.5">
                          Boundary Configuration
                        </span>
                        <p className="body-small text-[var(--color-background-alt)]/80">
                          {lightboxProject.scopeSummary}
                        </p>
                      </div>

                      <div>
                        <span className="block label-uppercase text-[var(--color-text-light-muted)] mb-1.5">
                          Coordinates
                        </span>
                        <p className="font-mono-tabular text-xs text-[var(--color-accent)]">
                          {lightboxProject.coordinates[1].toFixed(4)}° N,{' '}
                          {lightboxProject.coordinates[0].toFixed(4)}° E
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[var(--color-border-dark)] flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono-tabular text-xs text-[var(--color-text-light-muted)]">
                      {currentIndex + 1} / {filteredProjects.length}
                    </span>
                    <PrimaryButton
                      onClick={() => {
                        const cat = lightboxProject.category;
                        setLightboxProject(null);
                        onEnquireSimilar(`${cat} Precast Boundary Wall`);
                      }}
                    >
                      <span>Enquire Similar Project</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
