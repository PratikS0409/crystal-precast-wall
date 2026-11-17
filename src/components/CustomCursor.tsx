import { useEffect, useRef, useState } from 'react';
import { animationConfig } from '../config/animation';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';

export function CustomCursor() {
  const { isDesktop, isTouchDevice, prefersReducedMotion } = useResponsiveMotion();
  const enabled =
    animationConfig.enableCustomCursor && isDesktop && !isTouchDevice && !prefersReducedMotion;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorMode, setCursorMode] = useState<'default' | 'pointer' | 'view'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="view"]')) {
        setCursorMode('view');
      } else if (target.closest('a, button, [role="button"], select, input, textarea')) {
        setCursorMode('pointer');
      } else {
        setCursorMode('default');
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled || !visible) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 ease-out will-change-transform ${
          cursorMode === 'view'
            ? 'w-16 h-16 bg-[var(--color-primary)]/90 border border-[var(--color-accent)] text-[var(--color-dark-background)]'
            : cursorMode === 'pointer'
            ? 'w-11 h-11 bg-[var(--color-primary)]/12 border border-[var(--color-accent)]'
            : 'w-8 h-8 bg-transparent border border-[var(--color-primary)]/70'
        }`}
      >
        {cursorMode === 'view' && (
          <span className="font-mono-tabular text-[10px] font-semibold tracking-[0.16em] uppercase">
            VIEW
          </span>
        )}
      </div>

      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-[var(--color-accent)] transition-opacity duration-150 will-change-transform ${
          cursorMode === 'view' ? 'w-0 h-0 opacity-0' : 'w-1.5 h-1.5 opacity-100'
        }`}
      />
    </div>
  );
}
