'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  category?: 'Culture' | 'Nature' | 'Craft' | 'Family' | 'Sacred' | 'Weekly' | string;
  tone?: 'neutral' | string;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, category, tone, className = '', size = 'md' }) => {
  let colorStyles = "bg-[var(--tint-brand)] text-[var(--brand-primary)] border-[var(--brand-primary)]/20";

  if (tone === 'neutral') {
    colorStyles = "bg-neutral-100 dark:bg-neutral-800 text-[var(--text-secondary)] border-[var(--border)]";
  } else if (category === 'Culture' || category === 'Budaya') {
    colorStyles = "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
  } else if (category === 'Nature' || category === 'Alam') {
    colorStyles = "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800";
  } else if (category === 'Craft' || category === 'Kriya') {
    colorStyles = "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800";
  } else if (category === 'Family' || category === 'Keluarga') {
    colorStyles = "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
  } else if (category === 'Sacred' || category === 'Sakral') {
    colorStyles = "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
  }

  const sizeStyles = size === 'sm' 
    ? "px-2 py-0.5 text-[11px] font-bold" 
    : "px-2.5 py-1 text-xs font-bold";

  return (
    <span
      className={`inline-flex items-center uppercase tracking-wider rounded-xs border ${sizeStyles} ${colorStyles} ${className}`}
    >
      {children}
    </span>
  );
};
