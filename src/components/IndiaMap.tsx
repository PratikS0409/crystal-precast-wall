import { PointerEvent, useMemo, useRef, useState } from 'react';
import indiaMap from '@svg-maps/india';
import { ArrowUpRight, Compass, MapPin, Minus, Plus, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { animationConfig } from '../config/animation';
import { PROJECTS, ProjectLocation } from '../data/projects';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { SafeImage } from './SafeImage';
import { Container, SectionWrapper } from './ui/Layout';
import { SectionHeading } from './ui/SectionHeading';

interface SvgMapLocation {
  id: string;
  name: string;
  path: string;
}

interface SvgMapData {
  label: string;
  viewBox: string;
  locations: SvgMapLocation[];
}

const typedIndiaMap = indiaMap as SvgMapData;

interface IndiaMapProps {
  onEnquireLocation: (locationLabel: string) => void;
}

function projectToIndiaSvg([lon, lat]: [number, number]): { x: number; y: number } {
  const x = (lon - 68.18) * 20.88;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = 835.3 - 1196.34 * mercN;
  return { x, y };
}

export function IndiaMap({ onEnquireLocation }: IndiaMapProps) {
  const [selectedId, setSelectedId] = useState<number>(PROJECTS[0]?.id ?? 1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const { prefersReducedMotion } = useResponsiveMotion();

  const activeId = hoveredId ?? selectedId;
  const activeProject: ProjectLocation = useMemo(
    () => PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0],
    [activeId]
  );

  const projectedMarkers = useMemo(
    () =>
      PROJECTS.map((project) => ({
        project,
        pos: projectToIndiaSvg(project.coordinates),
      })),
    []
  );

  const clampPan = (nextX: number, nextY: number, targetZoom: number) => {
    const maxOffset = (targetZoom - 1) * 180;
    return {
      x: Math.max(-maxOffset, Math.min(maxOffset, nextX)),
      y: Math.max(-maxOffset, Math.min(maxOffset, nextY)),
    };
  };

  const handleZoomIn = () => {
    setZoom((prev) => {
      const next = Math.min(2.6, Number((prev + 0.4).toFixed(2)));
      setPan((p) => clampPan(p.x, p.y, next));
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(1, Number((prev - 0.4).toFixed(2)));
      setPan((p) => clampPan(p.x, p.y, next));
      return next;
    });
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const focusWesternCorridor = () => {
    setZoom(2.1);
    setPan({ x: 145, y: -35 });
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1 && e.pointerType === 'touch') return;
    if ((e.target as HTMLElement).closest('button, [data-map-marker]')) return;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan(clampPan(dragStartRef.current.panX + dx, dragStartRef.current.panY + dy, zoom));
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStartRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <SectionWrapper id="locations" surface="dark" withGrid>
      <Container>
        <SectionHeading
          dark
          kicker="Regional Footprint · India Map"
          lines={['Our Project Locations Across India.']}
          subtitle="Explore our manufacturing anchor in Khopoli alongside clearly labeled sample sites across Maharashtra and Gujarat. Zoom, pan, or tap any gold marker to inspect details."
        />

        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 bg-[var(--color-dark-surface)] border border-[var(--color-border-dark)] rounded-[var(--radius-small)] p-4 sm:p-7 flex flex-col justify-between relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 z-10">
              <div className="flex items-center gap-2 label-uppercase text-[var(--color-text-light-muted)]">
                <Compass className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
                <span>Interactive Map · {zoom.toFixed(1)}x</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={focusWesternCorridor}
                  className="min-h-[40px] px-3 py-1.5 border border-[var(--color-border-dark)] hover:border-[var(--color-accent)] text-[11px] font-mono-tabular uppercase tracking-[0.12em] text-[var(--color-background-alt)] hover:text-[var(--color-accent)] rounded-[var(--radius-small)] transition-colors cursor-pointer"
                >
                  Focus West
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  aria-label="Zoom out map"
                  className="w-10 h-10 inline-flex items-center justify-center border border-[var(--color-border-dark)] hover:border-[var(--color-accent)] disabled:opacity-40 text-[var(--color-text-light)] rounded-[var(--radius-small)] transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoom >= 2.6}
                  aria-label="Zoom in map"
                  className="w-10 h-10 inline-flex items-center justify-center border border-[var(--color-border-dark)] hover:border-[var(--color-accent)] disabled:opacity-40 text-[var(--color-text-light)] rounded-[var(--radius-small)] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetView}
                  aria-label="Reset map zoom and pan"
                  className="w-10 h-10 inline-flex items-center justify-center border border-[var(--color-border-dark)] hover:border-[var(--color-accent)] text-[var(--color-text-light)] rounded-[var(--radius-small)] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative w-full overflow-hidden rounded-[var(--radius-small)] bg-[var(--color-dark-background)] border border-[var(--color-border-dark)] ${
                zoom > 1 ? 'touch-none cursor-grab active:cursor-grabbing' : ''
              }`}
            >
              <div
                style={{
                  transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                  transition: isDragging
                    ? 'none'
                    : prefersReducedMotion
                    ? 'none'
                    : 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="w-full max-w-[540px] mx-auto py-2 will-change-transform"
              >
                <svg
                  viewBox={typedIndiaMap.viewBox}
                  role="img"
                  aria-label="Interactive map of India showing Crystal Precast Wall project locations"
                  className="w-full h-auto select-none"
                >
                  <g>
                    {typedIndiaMap.locations.map((loc: SvgMapLocation) => {
                      const isHighlightedState = loc.id === 'mh' || loc.id === 'gj';
                      const isActiveState =
                        (activeProject.state === 'Maharashtra' && loc.id === 'mh') ||
                        (activeProject.state === 'Gujarat' && loc.id === 'gj');

                      return (
                        <path
                          key={loc.id}
                          d={loc.path}
                          aria-label={loc.name}
                          fill={
                            isActiveState
                              ? 'var(--color-dark-surface-muted)'
                              : isHighlightedState
                              ? 'var(--color-dark-surface)'
                              : 'var(--color-dark-background)'
                          }
                          stroke={
                            isHighlightedState
                              ? 'var(--color-primary)'
                              : 'var(--color-dark-surface-muted)'
                          }
                          strokeOpacity={isActiveState ? 0.72 : isHighlightedState ? 0.42 : 0.9}
                          strokeWidth={isActiveState ? 1.1 : 0.75}
                          className="transition-colors duration-300"
                        />
                      );
                    })}
                  </g>

                  {projectedMarkers.map(({ project, pos }) => {
                    const isSelected = activeProject.id === project.id;
                    const markerScale = 1 / Math.sqrt(zoom);
                    return (
                      <g
                        key={project.id}
                        data-map-marker
                        transform={`translate(${pos.x}, ${pos.y}) scale(${markerScale})`}
                        className="cursor-pointer group"
                        role="button"
                        tabIndex={0}
                        aria-label={`${project.city}, ${project.state} (${project.category})`}
                        aria-pressed={selectedId === project.id}
                        onMouseEnter={() => setHoveredId(project.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onFocus={() => setSelectedId(project.id)}
                        onClick={() => setSelectedId(project.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedId(project.id);
                          }
                        }}
                      >
                        <circle r={18} fill="transparent" />

                        {isSelected && !prefersReducedMotion && (
                          <circle
                            r={13}
                            fill="none"
                            stroke="var(--color-accent)"
                            strokeWidth={1.5}
                            opacity={0.75}
                          >
                            <animate
                              attributeName="r"
                              from="8"
                              to="20"
                              dur="1.8s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              from="0.8"
                              to="0"
                              dur="1.8s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}

                        <circle
                          r={isSelected ? 9 : 6.5}
                          fill={isSelected ? 'var(--color-accent)' : 'var(--color-dark-surface)'}
                          fillOpacity={isSelected ? 0.25 : 0.9}
                          stroke="var(--color-accent)"
                          strokeWidth={isSelected ? 2 : 1.5}
                          className="transition-all duration-200"
                        />

                        <circle
                          r={isSelected ? 4.2 : 3.2}
                          fill={
                            project.isDemo && !isSelected
                              ? 'var(--color-primary)'
                              : 'var(--color-accent)'
                          }
                        />

                        <g transform="translate(11, 3)">
                          <rect
                            x={-3}
                            y={-10}
                            width={project.city.length * 6.5 + 10}
                            height={14}
                            rx={2}
                            fill="var(--color-dark-background)"
                            fillOpacity={isSelected ? 0.94 : 0.76}
                            stroke={isSelected ? 'var(--color-accent)' : 'transparent'}
                            strokeWidth={0.6}
                          />
                          <text
                            x={2}
                            y={0}
                            fill={
                              isSelected
                                ? 'var(--color-text-light)'
                                : 'var(--color-text-light-muted)'
                            }
                            fontSize="9.5"
                            fontFamily="var(--font-mono)"
                            fontWeight={isSelected ? '600' : '400'}
                          >
                            {project.city}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-[var(--color-border-dark)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-text-light-muted)]">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] inline-block" />
                  <span>HQ / Site</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/30 inline-block" />
                  <span>Demo Marker</span>
                </span>
              </div>
              <span className="font-mono-tabular">
                {zoom > 1 ? 'Drag map to pan' : 'Use + to zoom & pan'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : animationConfig.pageTransition.duration,
                }}
                className="bg-[var(--color-dark-surface)] border border-[var(--color-border-dark)] rounded-[var(--radius-small)] overflow-hidden"
              >
                <div className="aspect-[16/10] w-full bg-[var(--color-dark-background)] relative">
                  <SafeImage
                    src={activeProject.image}
                    alt={activeProject.alt}
                    fallbackLabel={`${activeProject.city}, ${activeProject.state}`}
                    className="w-full h-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-dark-surface)] to-transparent"
                  />
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 label-uppercase">
                    <span className="text-[var(--color-accent)]">{activeProject.category}</span>
                    <span className="text-[var(--color-text-light-muted)]">
                      {activeProject.isDemo ? 'Demo Marker (Editable)' : 'Khopoli Facility'}
                    </span>
                  </div>

                  <h3 className="heading-md text-2xl text-[var(--color-text-light)] mt-2">
                    {activeProject.city}, {activeProject.state}
                  </h3>
                  <p className="text-xs font-mono-tabular text-[var(--color-text-light-muted)] mt-1">
                    {activeProject.title}
                  </p>

                  <p className="mt-4 body-small sm:text-base text-[var(--color-background-alt)]/80">
                    {activeProject.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[var(--color-border-dark)] flex flex-wrap items-center justify-between gap-4">
                    <span className="font-mono-tabular text-xs text-[var(--color-text-light-muted)]">
                      {activeProject.coordinates[1].toFixed(4)}° N,{' '}
                      {activeProject.coordinates[0].toFixed(4)}° E
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onEnquireLocation(`${activeProject.city}, ${activeProject.state}`)
                      }
                      className="min-h-[44px] inline-flex items-center gap-1.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)] hover:text-[var(--color-text-light)] transition-colors cursor-pointer py-1"
                    >
                      <span>Enquire for This Region</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="bg-[var(--color-dark-surface)] border border-[var(--color-border-dark)] rounded-[var(--radius-small)] p-5">
              <span className="block label-uppercase text-[var(--color-text-light-muted)] mb-3">
                Select Location Marker
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PROJECTS.map((project) => {
                  const isActive = activeProject.id === project.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setSelectedId(project.id)}
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`min-h-[52px] p-3 text-left border rounded-[var(--radius-small)] transition-colors cursor-pointer flex items-start justify-between gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                        isActive
                          ? 'bg-[var(--color-dark-surface-muted)] border-[var(--color-primary)] text-[var(--color-text-light)]'
                          : 'bg-[var(--color-dark-background)]/60 border-[var(--color-border-dark)] text-[var(--color-text-light-muted)] hover:border-[var(--color-text-light-muted)]/40 hover:text-[var(--color-text-light)]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <MapPin
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isActive
                                ? 'text-[var(--color-accent)]'
                                : 'text-[var(--color-text-light-muted)]'
                            }`}
                            aria-hidden="true"
                          />
                          <span className="font-heading text-sm font-medium truncate">
                            {project.city}
                          </span>
                        </div>
                        <span className="block text-[11px] font-mono-tabular text-[var(--color-text-light-muted)] mt-0.5 truncate">
                          {project.state} · {project.isDemo ? 'Demo' : 'HQ'}
                        </span>
                      </div>
                      <span className="font-mono-tabular text-[11px] text-[var(--color-accent)] shrink-0">
                        {project.category.slice(0, 3).toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
