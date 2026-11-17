import { Expand, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { animationConfig } from '../../config/animation';
import { ProjectLocation } from '../../data/projects';
import { SafeImage } from '../SafeImage';

interface ProjectCardProps {
  project: ProjectLocation;
  isFeatured: boolean;
  prefersReducedMotion: boolean;
  onSelect: (project: ProjectLocation) => void;
}

export function ProjectCard({
  project,
  isFeatured,
  prefersReducedMotion,
  onSelect,
}: ProjectCardProps) {
  return (
    <motion.article
      data-project-card
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: prefersReducedMotion ? 0 : animationConfig.pageTransition.duration }}
      className={`group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-small)] overflow-hidden flex flex-col ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      <button
        type="button"
        data-cursor="view"
        onClick={() => onSelect(project)}
        aria-label={`Inspect project: ${project.title}`}
        className={`relative w-full overflow-hidden bg-[var(--color-dark-surface)] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)] ${
          isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'
        }`}
      >
        <SafeImage
          src={project.image}
          alt={project.alt}
          fallbackLabel={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-background)]/75 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity"
        />
        <div className="absolute top-4 right-4 w-11 h-11 bg-[var(--color-dark-background)]/80 border border-[var(--color-border-dark)] text-[var(--color-text-light)] flex items-center justify-center rounded-[var(--radius-small)] opacity-90 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-dark-background)] group-hover:border-[var(--color-primary)] transition-colors">
          <Expand className="w-4 h-4" aria-hidden="true" />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-[var(--color-text-light)]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" aria-hidden="true" />
            <span>
              {project.city}, {project.state}
            </span>
          </span>
          <span className="text-[var(--color-accent)] uppercase tracking-[0.14em]">
            {project.isDemo ? 'Sample Layout' : 'Khopoli Base'}
          </span>
        </div>
      </button>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2">
            <span className="text-[var(--color-primary-deep)] font-medium">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>
              {project.city}, {project.state}
            </span>
          </div>
          <h3 className="heading-md text-lg sm:text-xl text-[var(--color-text)]">
            {project.title}
          </h3>
          <p className="mt-2.5 body-small text-[var(--color-muted)]">{project.description}</p>
        </div>

        <div className="mt-5 pt-4 border-t border-[var(--color-background-alt)] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="min-h-[44px] font-heading text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text)] hover:text-[var(--color-primary-deep)] transition-colors cursor-pointer py-1"
          >
            View Project Details
          </button>
          <span className="font-mono-tabular text-xs text-[var(--color-muted)]">
            #{String(project.id).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
