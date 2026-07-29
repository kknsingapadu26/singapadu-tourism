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
  let colorStyles = "bg-[var(--category-culture-bg)] text-[var(--category-culture-text)] border-[var(--category-culture-border)]";

  if (tone === 'neutral') {
    colorStyles = "bg-[var(--surface-sunken)] text-[var(--text-secondary)] border-[var(--border)]";
  } else if (category === 'Culture' || category === 'Budaya') {
    colorStyles = "bg-[var(--category-culture-bg)] text-[var(--category-culture-text)] border-[var(--category-culture-border)]";
  } else if (category === 'Nature' || category === 'Alam') {
    colorStyles = "bg-[var(--category-nature-bg)] text-[var(--category-nature-text)] border-[var(--category-nature-border)]";
  } else if (category === 'Craft' || category === 'Kriya') {
    colorStyles = "bg-[var(--category-craft-bg)] text-[var(--category-craft-text)] border-[var(--category-craft-border)]";
  } else if (category === 'Family' || category === 'Keluarga') {
    colorStyles = "bg-[var(--category-family-bg)] text-[var(--category-family-text)] border-[var(--category-family-border)]";
  } else if (category === 'Sacred' || category === 'Sakral') {
    colorStyles = "bg-[var(--category-sacred-bg)] text-[var(--category-sacred-text)] border-[var(--category-sacred-border)]";
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
