'use client';

import React from 'react';
import { Icon } from './Icon';

interface ThemeToggleProps {
  dark: boolean;
  onToggle: (dark: boolean) => void;
  variant?: 'compact' | 'full';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ dark, onToggle, variant = 'compact' }) => {
  return (
    <button
      onClick={() => onToggle(!dark)}
      type="button"
      aria-label="Toggle dark mode"
      className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
    >
      <div
        className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-[var(--dur-fast)] ${
          dark ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-[var(--dur-fast)] shadow-sm flex items-center justify-center ${
            dark ? 'translate-x-4' : 'translate-x-0'
          }`}
        >
          {dark ? (
            <Icon name="moon" className="w-2.5 h-2.5 text-[var(--category-craft-text)]" />
          ) : (
            <Icon name="sun" className="w-2.5 h-2.5 text-[var(--accent-hover)]" />
          )}
        </span>
      </div>
      {variant === 'full' && (
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          {dark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};
