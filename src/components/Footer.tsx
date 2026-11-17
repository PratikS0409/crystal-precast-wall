import { ArrowUp, ArrowUpRight, MapPin, MessageSquare, Phone } from 'lucide-react';
import { buildWhatsAppUrl, COMPANY, SOCIAL_LINKS } from '../config/company';
import { NAV_ITEMS } from '../data/navigation';
import { PRODUCTS } from '../data/products';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { Container } from './ui/Layout';
import CompanyLogo from '../assets/images/logo_main.png';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--color-dark-background)] text-[var(--color-text-light)] pt-16 lg:pt-20 pb-10 border-t border-[var(--color-border-dark)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[var(--color-border-dark)]">
          <div className="lg:col-span-4 space-y-5">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="inline-flex items-center gap-2.5 text-[var(--color-text-light)]"
            >
              <img
                src={CompanyLogo}
                alt="Crystal Precast Logo"
                className="w-6 sm:w-7 h-auto shrink-0"
              />  
              <span className="font-heading text-base font-semibold tracking-[0.14em] uppercase">
                {COMPANY.name}
              </span>
            </a>

            <p className="body-small text-[var(--color-text-light-muted)] max-w-sm">
              {COMPANY.footerIntro}
            </p>

            <div className="pt-2">
              <span className="block label-uppercase text-[var(--color-text-light-muted)] mb-2.5">
                Social Channels
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    title={social.placeholderNote}
                    onClick={(e) => {
                      if (social.href.startsWith('#')) {
                        e.preventDefault();
                        onNavigate(social.href.slice(1));
                      }
                    }}
                    className="text-xs font-heading uppercase tracking-[0.12em] text-[var(--color-background-alt)]/80 hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-[var(--color-primary)]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="label-uppercase text-[var(--color-accent)] mb-4">Navigation</h3>
            <ul className="space-y-2.5 body-small">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                    className="text-[var(--color-background-alt)]/80 hover:text-[var(--color-accent)] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="label-uppercase text-[var(--color-accent)] mb-4">Precast Systems</h3>
            <ul className="space-y-2.5 body-small">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <a
                    href="#products"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('products');
                    }}
                    className="text-[var(--color-background-alt)]/80 hover:text-[var(--color-accent)] transition-colors"
                  >
                    {product.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="label-uppercase text-[var(--color-accent)]">Contact &amp; Yard</h3>

            <div className="flex items-start gap-2.5 body-small text-[var(--color-background-alt)]/80">
              <MapPin
                className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-1"
                aria-hidden="true"
              />
              <p>{COMPANY.address}</p>
            </div>

            <div className="space-y-1.5">
              {COMPANY.phones.map((phone) => (
                <div key={phone.display}>
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-2 font-mono-tabular text-sm text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                    <span>{phone.display}</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <SecondaryButton
                tone="dark"
                href={COMPANY.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
              </SecondaryButton>

              <PrimaryButton
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2"
              >
                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp</span>
              </PrimaryButton>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-light-muted)]">
          <p>
            &copy; {currentYear} {COMPANY.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={handleBackToTop}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-border-dark)] hover:border-[var(--color-accent)] text-[var(--color-background-alt)] hover:text-[var(--color-accent)] font-heading text-xs uppercase tracking-[0.14em] rounded-[var(--radius-small)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] min-h-[44px]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
