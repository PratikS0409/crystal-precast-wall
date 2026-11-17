import { ArrowUpRight, MapPin, MessageSquare, Phone } from 'lucide-react';
import { buildWhatsAppUrl, COMPANY } from '../config/company';
import { InquiryForm } from './InquiryForm';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { Container, SectionWrapper } from './ui/Layout';
import { SectionHeading } from './ui/SectionHeading';

interface ContactProps {
  prefilledProjectType?: string;
  prefilledLocation?: string;
}

export function Contact({ prefilledProjectType, prefilledLocation }: ContactProps) {
  return (
    <SectionWrapper id="contact" surface="alt">
      <Container>
        <SectionHeading
          kicker="Direct Project Enquiries"
          lines={["LET'S BUILD SOMETHING STRONG."]}
          subtitle={`Reach our ${COMPANY.structuredAddress.addressLocality} team directly by phone, WhatsApp, or project enquiry form to discuss precast boundary wall manufacturing and site installation.`}
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--color-dark-surface)] text-[var(--color-text-light)] border border-[var(--color-dark-surface-muted)] rounded-[var(--radius-small)] p-7 sm:p-9">
              <span className="label-uppercase text-[var(--color-accent)]">
                Manufacturing Facility &amp; Office
              </span>
              <h3 className="heading-md text-2xl text-[var(--color-text-light)] mt-2">
                {COMPANY.name}
              </h3>

              <div className="mt-7 space-y-6">
                <div className="flex items-start gap-3.5">
                  <MapPin
                    className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block label-uppercase text-[var(--color-text-light-muted)] mb-1">
                      Address
                    </span>
                    <p className="body-small sm:text-base text-[var(--color-background-alt)]">
                      {COMPANY.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-5 border-t border-[var(--color-border-dark)]">
                  <Phone
                    className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block label-uppercase text-[var(--color-text-light-muted)] mb-2">
                      Direct Phone Lines
                    </span>
                    <div className="flex flex-col gap-2">
                      {COMPANY.phones.map((phone) => (
                        <a
                          key={phone.display}
                          href={phone.href}
                          className="font-mono-tabular text-base sm:text-lg font-medium text-[var(--color-text-light)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-2 w-fit min-h-[36px]"
                        >
                          {phone.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-border-dark)] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SecondaryButton
                  tone="dark"
                  href={COMPANY.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4"
                >
                  <span>Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
                </SecondaryButton>

                <PrimaryButton
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </PrimaryButton>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <InquiryForm
              prefilledProjectType={prefilledProjectType}
              prefilledLocation={prefilledLocation}
            />
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
