import { useCallback, useEffect, useState } from 'react';
import { About } from './components/About';
import { Applications } from './components/Applications';
import { Contact } from './components/Contact';
import { CtaBanner } from './components/CtaBanner';
import { CustomCursor } from './components/CustomCursor';
import { EngineeringQuality } from './components/EngineeringQuality';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IndiaMap } from './components/IndiaMap';
import { Manufacturing } from './components/Manufacturing';
import { Products } from './components/Products';
import { Projects } from './components/Projects';
import { SeoManager } from './components/SeoManager';
import { Testimonials } from './components/Testimonials';
import { WhyChooseUs } from './components/WhyChooseUs';
import { NAV_ITEMS } from './data/navigation';
import { useLenisScroll } from './hooks/useLenisScroll';
import { useResponsiveMotion } from './hooks/useResponsiveMotion';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [prefilledProjectType, setPrefilledProjectType] = useState<string | undefined>(undefined);
  const [prefilledLocation, setPrefilledLocation] = useState<string | undefined>(undefined);

  const { isMobile, prefersReducedMotion } = useResponsiveMotion();
  const lenisRef = useLenisScroll(!isMobile && !prefersReducedMotion);

  const navigateToSection = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -20 });
      } else {
        el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [lenisRef, prefersReducedMotion]
  );

  useEffect(() => {
    const sectionIds = [
      ...NAV_ITEMS.map((item) => item.id),
      'engineering-quality',
      'applications',
      'testimonials',
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -50% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleRequestProductQuote = (productTitle: string) => {
    setPrefilledProjectType(productTitle);
    navigateToSection('contact');
  };

  const handleEnquireLocation = (locationLabel: string) => {
    setPrefilledLocation(locationLabel);
    navigateToSection('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text)]">
      <SeoManager activeSection={activeSection} />
      <CustomCursor />

      <Header activeSection={activeSection} onNavigate={navigateToSection} />

      <main className="flex-1">
        <Hero
          onExploreWork={() => navigateToSection('projects')}
          onGetQuote={() => navigateToSection('contact')}
          onScrollNext={() => navigateToSection('about')}
        />

        <About onDiscover={() => navigateToSection('products')} />

        <Products onRequestProductQuote={handleRequestProductQuote} />

        <Manufacturing />

        <EngineeringQuality />

        <Projects onEnquireSimilar={handleRequestProductQuote} />

        <IndiaMap onEnquireLocation={handleEnquireLocation} />

        <WhyChooseUs />

        <Applications onEnquireSector={handleRequestProductQuote} />

        <Testimonials />

        <CtaBanner onGetQuote={() => navigateToSection('contact')} />

        <Contact
          prefilledProjectType={prefilledProjectType}
          prefilledLocation={prefilledLocation}
        />
      </main>

      <Footer onNavigate={navigateToSection} />
    </div>
  );
}
