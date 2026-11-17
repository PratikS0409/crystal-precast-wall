import { ReactNode } from 'react';
import { GoldUnderline, SplitHeading } from '../../animations/MotionPrimitives';

interface SectionHeadingProps {
  kicker: string;
  lines: string[];
  as?: 'h1' | 'h2' | 'h3';
  dark?: boolean;
  subtitle?: string;
  rightSlot?: ReactNode;
  borderedBottom?: boolean;
  headingClassName?: string;
}

export function SectionHeading({
  kicker,
  lines,
  as = 'h2',
  dark = false,
  subtitle,
  rightSlot,
  borderedBottom = true,
  headingClassName = 'heading-lg',
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 ${
        borderedBottom
          ? `pb-10 border-b ${
              dark ? 'border-[var(--color-border-dark)]' : 'border-[var(--color-border)]'
            }`
          : ''
      }`}
    >
      <div className="max-w-2xl">
        <p
          className={`label-uppercase mb-3 ${
            dark ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary-deep)]'
          }`}
        >
          {kicker}
        </p>
        <SplitHeading
          as={as}
          lines={lines}
          className={`${headingClassName} ${
            dark ? 'text-[var(--color-text-light)]' : 'text-[var(--color-text)]'
          }`}
        />
        <GoldUnderline light={dark} className="mt-4" />
      </div>

      {rightSlot ? (
        rightSlot
      ) : subtitle ? (
        <p
          className={`max-w-md body-small sm:text-base ${
            dark ? 'text-[var(--color-text-light-muted)]' : 'text-[var(--color-muted)]'
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
