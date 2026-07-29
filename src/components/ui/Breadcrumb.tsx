'use client';

import React from 'react';
import { Icon } from './Icon';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[var(--text-secondary)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && <Icon name="chevron-right" className="w-3.5 h-3.5 text-[var(--text-secondary)]" />}
              {item.onClick && !isLast ? (
                <button
                  onClick={item.onClick}
                  className="hover:text-[var(--brand-primary)] hover:underline font-medium transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ) : (
                <span className={`font-semibold ${isLast ? 'text-[var(--text-primary)]' : ''}`}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
