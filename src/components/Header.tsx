import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { animationConfig } from '../config/animation';
import { COMPANY } from '../config/company';
import { NAV_ITEMS } from '../data/navigation';
import { useResponsiveMotion } from '../hooks/useResponsiveMotion';
import { PrimaryButton } from './ui/Buttons';
import { Container } from './ui/Layout';
import { NavigationLink } from './ui/NavigationLink';
import CompanyLogo from '../assets/images/logo_main.png';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { prefersReducedMotion } = useResponsiveMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[var(--color-dark-background)]/95 backdrop-blur-md border-b border-[var(--color-border-dark)] shadow-lg shadow-black/20'
            : 'bg-gradient-to-b from-[var(--color-dark-background)]/85 via-[var(--color-dark-background)]/45 to-transparent border-b border-transparent'
        }`}
      >
        <Container className="h-16 lg:h-20 flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center gap-2 sm:gap-2.5 text-[var(--color-text-light)] whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[var(--radius-small)]"
          >
            <img
  src={CompanyLogo}
  alt="Crystal Precast Logo"
  className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0"
/>
            <span className="font-heading text-xs sm:text-base font-semibold tracking-[0.09em] sm:tracking-[0.14em] uppercase whitespace-nowrap shrink-0">
              {COMPANY.name}
            </span>
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-5 2xl:gap-7"
          >
            {NAV_ITEMS.map((item) => (
              <NavigationLink
                key={item.id}
                href={item.href}
                label={item.label}
                isActive={activeSection === item.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <PrimaryButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              className="hidden sm:inline-flex"
            >
              <span>GET A QUOTE</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </PrimaryButton>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="xl:hidden inline-flex items-center justify-center w-11 h-11 text-[var(--color-text-light)] border border-[var(--color-border-dark)] bg-[var(--color-dark-surface)]/75 hover:border-[var(--color-primary)] rounded-[var(--radius-small)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-lenis-prevent
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{
              duration: prefersReducedMotion ? 0 : animationConfig.pageTransition.duration,
              ease: animationConfig.motionEase,
            }}
            className="fixed inset-0 z-40 bg-[var(--color-dark-background)] text-[var(--color-text-light)] pt-24 pb-8 px-5 sm:px-8 flex flex-col justify-between overflow-y-auto xl:hidden"
          >
            <nav
              aria-label="Mobile Navigation"
              className="flex flex-col divide-y divide-[var(--color-border-dark)]"
            >
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.id);
                    }}
                    className={`py-4 min-h-[52px] flex items-center justify-between font-heading text-xl sm:text-2xl font-medium tracking-tight transition-colors ${
                      isActive
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-text-light)] hover:text-[var(--color-accent)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono-tabular text-xs text-[var(--color-text-light-muted)]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </a>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-[var(--color-border-dark)] space-y-5">
              <PrimaryButton
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('contact');
                }}
                className="w-full"
              >
                <span>GET A QUOTE</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </PrimaryButton>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--color-text-light-muted)]">
                <span>{COMPANY.address}</span>
                <div className="flex flex-wrap items-center gap-4">
                  {COMPANY.phones.map((phone) => (
                    <a
                      key={phone.display}
                      href={phone.href}
                      className="inline-flex items-center gap-1.5 min-h-[44px] text-[var(--color-text-light)] hover:text-[var(--color-accent)] font-mono-tabular whitespace-nowrap"
                    >
                      <Phone className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                      {phone.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
