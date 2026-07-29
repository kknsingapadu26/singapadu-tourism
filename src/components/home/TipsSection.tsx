'use client';

import React from 'react';
import { Language, TRANSLATIONS } from '@/data';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon, type IconName } from '../ui/Icon';

interface TipsSectionProps {
  lang: Language;
}

export const TipsSection: React.FC<TipsSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const icons: IconName[] = ['car', 'landmark', 'sun', 'wallet', 'backpack', 'map'];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20">
      <SectionHeader
        eyebrow={t.home.tipsEyebrow}
        title={t.home.tipsTitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.home.tips.map((tip, idx) => (
          <div
            key={idx}
            className="bg-[var(--surface-card)] border border-[var(--border)] rounded-sm shadow-[var(--shadow-card)] p-5.5 flex flex-col gap-3 items-start"
          >
            <span className="w-10.5 h-10.5 rounded-xs bg-[var(--tint-brand)] flex items-center justify-center">
              <Icon name={icons[idx]} className="w-5 h-5 text-[var(--brand-primary)]" />
            </span>

            <h4 className="text-base font-bold text-[var(--text-primary)]">
              {tip.t}
            </h4>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {tip.b}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
