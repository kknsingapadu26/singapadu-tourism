'use client';

import React from 'react';
import { Car, Landmark, Sun, Wallet, Backpack, Map } from 'lucide-react';
import { Language, TRANSLATIONS } from '@/data/singapaduData';
import { SectionHeader } from '../ui/SectionHeader';

interface TipsSectionProps {
  lang: Language;
}

export const TipsSection: React.FC<TipsSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const icons = [
    <Car className="w-5 h-5 text-[var(--brand-primary)]" />,
    <Landmark className="w-5 h-5 text-[var(--brand-primary)]" />,
    <Sun className="w-5 h-5 text-[var(--brand-primary)]" />,
    <Wallet className="w-5 h-5 text-[var(--brand-primary)]" />,
    <Backpack className="w-5 h-5 text-[var(--brand-primary)]" />,
    <Map className="w-5 h-5 text-[var(--brand-primary)]" />
  ];

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
              {icons[idx]}
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
