'use client';

import React from 'react';

interface TagProps {
  label: string;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({ label, count, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer border ${
        selected
          ? 'bg-[var(--brand-primary)] text-[var(--text-on-brand)] border-[var(--brand-primary)] shadow-sm scale-[1.02]'
          : 'bg-[var(--surface-card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--brand-primary)] hover:text-[var(--text-primary)]'
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            selected ? 'bg-white/20 text-white' : 'bg-[var(--surface-sunken)] text-[var(--text-secondary)]'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};
