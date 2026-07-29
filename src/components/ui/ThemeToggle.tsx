'use client';

import React from 'react';
import { Icon } from './Icon';

interface ThemeToggleProps {
  dark: boolean;
  onToggle: (dark: boolean) => void;
  variant?: 'compact' | 'full';
  contrast?: 'default' | 'inverse';
  label?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ dark, onToggle, variant = 'compact', contrast = 'default', label }) => {
  const actionLabel = dark ? 'Switch to light mode' : 'Switch to dark mode';

  if (variant === 'compact') {
    return (
      <button
        onClick={() => onToggle(!dark)}
        type="button"
        aria-label={actionLabel}
        title={actionLabel}
        data-testid="theme-toggle"
        className={`inline-flex w-8 h-8 items-center justify-center rounded-sm cursor-pointer transition-[color,background-color,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
          contrast === 'inverse'
            ? 'text-white hover:bg-white/12'
            : 'text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]'
        }`}
      >
        <Icon name={dark ? 'sun' : 'moon'} className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => onToggle(!dark)}
      type="button"
      aria-label={actionLabel}
      data-testid="theme-toggle-full"
      role="switch"
      aria-checked={dark}
      className="inline-flex items-center gap-3 cursor-pointer transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
    >
      <span
        className={`relative block h-7 w-12 rounded-full transition-colors duration-[var(--dur-med)] ease-[var(--ease-out)] ${
          dark
            ? 'bg-[var(--green-400)]'
            : contrast === 'inverse' ? 'bg-white/30' : 'bg-[var(--border-strong)]'
        }`}
        aria-hidden="true"
      >
        <span className={`absolute left-1 top-1 block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] ${dark ? 'translate-x-5' : 'translate-x-0'}`} />
      </span>
      <span className={`text-sm font-bold ${contrast === 'inverse' ? 'text-white' : 'text-[var(--text-primary)]'}`}>
        {label ?? 'Dark mode'}
      </span>
    </button>
  );
};
