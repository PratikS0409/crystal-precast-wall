import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface BaseFieldProps {
  id: string;
  label: string;
  error?: string;
}

const INPUT_CLASS =
  'w-full px-4 py-3 bg-[var(--color-background)] border rounded-[var(--radius-small)] text-sm sm:text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)]/65 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]';

function FieldLabel({ htmlFor, label }: { htmlFor: string; label: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-heading text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text)] mb-2"
    >
      {label}
    </label>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{error}</span>
    </p>
  );
}

export type FormInputProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement>;

export function FormInput({ id, label, error, className = '', ...rest }: FormInputProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} />
      <input
        id={id}
        aria-invalid={Boolean(error)}
        className={`${INPUT_CLASS} ${
          error ? 'border-red-600' : 'border-[var(--color-border)]'
        } ${className}`}
        {...rest}
      />
      <FieldError error={error} />
    </div>
  );
}

export type FormSelectProps = BaseFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: string[];
  };

export function FormSelect({ id, label, error, options, className = '', ...rest }: FormSelectProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} />
      <select
        id={id}
        aria-invalid={Boolean(error)}
        className={`${INPUT_CLASS} ${
          error ? 'border-red-600' : 'border-[var(--color-border)]'
        } ${className}`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <FieldError error={error} />
    </div>
  );
}

export type FormTextareaProps = BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FormTextarea({ id, label, error, className = '', ...rest }: FormTextareaProps) {
  return (
    <div>
      <FieldLabel htmlFor={id} label={label} />
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        className={`${INPUT_CLASS} resize-y ${
          error ? 'border-red-600' : 'border-[var(--color-border)]'
        } ${className}`}
        {...rest}
      />
      <FieldError error={error} />
    </div>
  );
}
