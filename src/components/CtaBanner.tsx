import { ArrowUpRight, MessageSquare, Phone } from 'lucide-react';
import { GoldUnderline, SplitHeading } from '../animations/MotionPrimitives';
import { buildWhatsAppUrl, COMPANY } from '../config/company';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { Container, SectionWrapper } from './ui/Layout';

interface CtaBannerProps {
  onGetQuote: () => void;
}

export function CtaBanner({ onGetQuote }: CtaBannerProps) {
  return (
    <SectionWrapper
      ariaLabel="Project Consultation Call to Action"
      surface="dark"
      withGrid
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="label-uppercase text-[var(--color-accent)] mb-3">
              Ready for Site Execution
            </p>
            <SplitHeading
              as="h2"
              lines={['Planning a Perimeter Wall Project?']}
              className="heading-lg text-[var(--color-text-light)]"
            />
            <GoldUnderline light className="mt-4" />
            <p className="mt-4 body-small sm:text-base text-[var(--color-text-light-muted)] max-w-xl">
              Share your approximate running length, height preference, and project location with
              our {COMPANY.structuredAddress.addressLocality} facility for practical planning and
              quotation support.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center justify-end gap-3.5">
            <PrimaryButton onClick={onGetQuote}>
              <span>GET A QUOTE</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </PrimaryButton>

            <SecondaryButton tone="dark" href={COMPANY.phones[0].href} className="font-mono-tabular">
              <Phone className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
              <span>{COMPANY.phones[0].display}</span>
            </SecondaryButton>

            <SecondaryButton
              tone="dark"
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
              <span>WhatsApp</span>
            </SecondaryButton>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
