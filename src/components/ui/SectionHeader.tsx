'use client';

import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtext?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtext,
  action,
  align = 'left',
  className = ''
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 ${
        align === 'center' ? 'text-center md:text-center items-center justify-center' : ''
      } ${className}`}
    >
      <div>
        {eyebrow && (
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[var(--brand-primary)] mb-1">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
          {title}
        </h2>
        {subtext && (
          <p className="mt-2 text-sm md:text-base text-[var(--text-secondary)] max-w-2xl">
            {subtext}
          </p>
        )}
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center text-sm font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] transition-colors cursor-pointer group flex-shrink-0"
        >
          <span>{action.label}</span>
          <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
        </button>
      )}
    </div>
  );
};
