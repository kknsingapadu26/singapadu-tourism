import { Icon } from './Icon';

type PlaceholderTone = 'green' | 'amber' | 'sky' | 'navy';

interface ImagePlaceholderProps {
  label: string;
  tone?: PlaceholderTone;
  className?: string;
}

const TONE_CLASSES: Record<PlaceholderTone, string> = {
  green: 'bg-[var(--tint-brand)] text-[var(--brand-primary)]',
  amber: 'bg-[var(--tint-accent)] text-[var(--category-craft-text)]',
  sky: 'bg-[var(--tint-info)] text-[var(--brand-secondary)]',
  navy: 'bg-[var(--navy-700)] text-white',
};

/** Branded stand-in used until destination photography is supplied. */
export function ImagePlaceholder({
  label,
  tone = 'green',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label} — photography coming soon`}
      className={`flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center ${TONE_CLASSES[tone]} ${className}`}
    >
      <Icon name="landmark" className="h-8 w-8" />
      <span className="max-w-xs text-xs font-bold uppercase tracking-[0.08em]">
        {label}
      </span>
    </div>
  );
}
