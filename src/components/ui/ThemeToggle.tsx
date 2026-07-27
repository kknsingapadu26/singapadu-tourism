'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';

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
      className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-200 focus:outline-none"
    >
      <div
        className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-200 ${
          dark ? 'bg-[var(--accent)]' : 'bg-neutral-300 dark:bg-neutral-700'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 shadow-sm flex items-center justify-center ${
            dark ? 'translate-x-4' : 'translate-x-0'
          }`}
        >
          {dark ? (
            <Moon className="w-2.5 h-2.5 text-amber-600" />
          ) : (
            <Sun className="w-2.5 h-2.5 text-amber-500" />
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
