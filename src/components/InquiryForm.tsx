import { FormEvent, useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, MessageSquare, Send } from 'lucide-react';
import { buildWhatsAppUrl, COMPANY } from '../config/company';
import { PrimaryButton, SecondaryButton } from './ui/Buttons';
import { FormInput, FormSelect, FormTextarea } from './ui/FormControls';

interface InquiryFormProps {
  prefilledProjectType?: string;
  prefilledLocation?: string;
}

interface FormValues {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  projectType: string;
  requirement: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'unconfigured' | 'error';

const PROJECT_TYPE_OPTIONS = [
  'Industrial Compound Wall',
  'Residential Layout Boundary',
  'Commercial Complex Enclosure',
  'Agricultural Land Boundary',
  'RCC Precast Boundary Wall Panels',
  'RCC Vertical Support Posts',
  'Precast Compound Wall Systems',
  'Custom Precast Concrete Solutions',
];

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  const digits = values.mobile.replace(/[\s\-+()]/g, '');
  const normalizedIndian = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits;
  if (!/^[6-9]\d{9}$/.test(normalizedIndian)) {
    errors.mobile = 'Please enter a valid 10-digit Indian mobile number.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.city.trim()) {
    errors.city = 'Please enter your project city or location.';
  }

  if (!values.projectType.trim()) {
    errors.projectType = 'Please select a project type.';
  }

  if (!values.requirement.trim()) {
    errors.requirement = 'Please share your approximate wall length or height requirement.';
  }

  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Please include brief project details (at least 10 characters).';
  }

  return errors;
}

export function InquiryForm({
  prefilledProjectType,
  prefilledLocation,
}: InquiryFormProps) {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    projectType: PROJECT_TYPE_OPTIONS[0],
    requirement: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [serverError, setServerError] = useState<string>('');

  useEffect(() => {
    if (prefilledProjectType) {
      setValues((prev) => ({
        ...prev,
        projectType: PROJECT_TYPE_OPTIONS.includes(prefilledProjectType)
          ? prefilledProjectType
          : prev.projectType,
        message:
          prev.message ||
          `Enquiring regarding ${prefilledProjectType}. Please share availability and quotation details.`,
      }));
    }
  }, [prefilledProjectType]);

  useEffect(() => {
    if (prefilledLocation) {
      setValues((prev) => ({
        ...prev,
        city: prefilledLocation,
      }));
    }
  }, [prefilledLocation]);

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status === 'error' || status === 'unconfigured') {
      setStatus('idle');
    }
  };

  const buildDetailedWhatsAppLink = () => {
    const lines = [
      `Hello ${COMPANY.legalName},`,
      `I would like to submit a project enquiry:`,
      values.fullName ? `Name: ${values.fullName}` : '',
      values.mobile ? `Mobile: ${values.mobile}` : '',
      values.email ? `Email: ${values.email}` : '',
      values.city ? `Location: ${values.city}` : '',
      values.projectType ? `Project Type: ${values.projectType}` : '',
      values.requirement ? `Requirement: ${values.requirement}` : '',
      values.message ? `Message: ${values.message}` : '',
    ].filter(Boolean);

    return buildWhatsAppUrl(lines.join('\n'));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const endpoint = COMPANY.formspreeEndpoint.trim();
    if (!endpoint) {
      setStatus('unconfigured');
      return;
    }

    setStatus('submitting');
    setServerError('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.fullName.trim(),
          mobile: values.mobile.trim(),
          email: values.email.trim(),
          city: values.city.trim(),
          projectType: values.projectType,
          approximateRequirement: values.requirement.trim(),
          message: values.message.trim(),
          _subject: `${COMPANY.legalName} Inquiry — ${values.city.trim()} (${values.projectType})`,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error ||
            'Unable to deliver your inquiry at this moment. Please use WhatsApp or call us directly.'
        );
      }

      setStatus('success');
      setValues({
        fullName: '',
        mobile: '',
        email: '',
        city: '',
        projectType: PROJECT_TYPE_OPTIONS[0],
        requirement: '',
        message: '',
      });
    } catch (err) {
      setStatus('error');
      setServerError(
        err instanceof Error
          ? err.message
          : 'Network error while submitting your inquiry. Please use the WhatsApp option below.'
      );
    }
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-small)] p-6 sm:p-9 lg:p-10">
      <div className="mb-7 pb-5 border-b border-[var(--color-background-alt)] flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="label-uppercase text-[var(--color-primary-deep)]">
            Project Quote &amp; Consultation
          </span>
          <h3 className="heading-md text-xl sm:text-2xl text-[var(--color-text)] mt-1">
            Submit Project Requirement
          </h3>
        </div>
        <span className="font-mono-tabular text-xs text-[var(--color-muted)]">
          * Required Fields
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormInput
            id="inquiry-full-name"
            name="fullName"
            type="text"
            label="Full Name *"
            required
            autoComplete="name"
            placeholder="e.g. Rajesh Kulkarni"
            value={values.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            error={errors.fullName}
          />

          <FormInput
            id="inquiry-mobile"
            name="mobile"
            type="tel"
            label="Mobile Number *"
            required
            autoComplete="tel"
            placeholder="+91 98XXXXXXXX"
            value={values.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            error={errors.mobile}
            className="font-mono-tabular"
          />

          <FormInput
            id="inquiry-email"
            name="email"
            type="email"
            label="Email Address *"
            required
            autoComplete="email"
            placeholder="name@company.com"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
          />

          <FormInput
            id="inquiry-city"
            name="city"
            type="text"
            label="City / Location *"
            required
            placeholder="e.g. Khopoli, Pune, Surat"
            value={values.city}
            onChange={(e) => handleChange('city', e.target.value)}
            error={errors.city}
          />

          <FormSelect
            id="inquiry-project-type"
            name="projectType"
            label="Project Type *"
            required
            options={PROJECT_TYPE_OPTIONS}
            value={values.projectType}
            onChange={(e) => handleChange('projectType', e.target.value)}
            error={errors.projectType}
          />

          <FormInput
            id="inquiry-requirement"
            name="requirement"
            type="text"
            label="Approximate Project Requirement *"
            required
            placeholder="e.g. 450 running ft, 7 ft wall height"
            value={values.requirement}
            onChange={(e) => handleChange('requirement', e.target.value)}
            error={errors.requirement}
          />
        </div>

        <FormTextarea
          id="inquiry-message"
          name="message"
          rows={4}
          label="Message *"
          required
          placeholder="Share plot dimensions, site access notes, or preferred timeline..."
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          error={errors.message}
        />

        {status === 'success' && (
          <div
            role="status"
            className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-[var(--radius-small)] flex items-start gap-3 text-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold">Inquiry submitted successfully.</p>
              <p className="mt-0.5 text-emerald-800">
                Thank you for contacting {COMPANY.legalName}. Our team will review your project
                requirement and follow up shortly.
              </p>
            </div>
          </div>
        )}

        {status === 'unconfigured' && (
          <div
            role="alert"
            className="p-4 bg-amber-50 border border-amber-300 text-amber-950 rounded-[var(--radius-small)] flex items-start gap-3 text-sm"
          >
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold">Email endpoint not configured yet</p>
              <p className="mt-1 text-amber-900 leading-relaxed">
                This site&apos;s Formspree email endpoint (
                <code className="font-mono text-xs">VITE_FORMSPREE_ENDPOINT</code>) has not been set
                in the environment, so your message was not transmitted by email. Please use the{' '}
                <strong>Send via WhatsApp</strong> button below to send your entered details
                directly to our team right now, or call us on {COMPANY.phones[0].display}.
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="p-4 bg-red-50 border border-red-200 text-red-900 rounded-[var(--radius-small)] flex items-start gap-3 text-sm"
          >
            <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold">Submission could not be completed</p>
              <p className="mt-0.5 text-red-800">{serverError}</p>
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
          <PrimaryButton type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>SENDING INQUIRY...</span>
              </>
            ) : (
              <>
                <span>SUBMIT INQUIRY</span>
                <Send className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </PrimaryButton>

          <SecondaryButton
            tone="solid-dark"
            href={buildDetailedWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
            <span>Send via WhatsApp</span>
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
}
