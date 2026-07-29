'use client';

import React from 'react';
import { type Language, type Navigate, TRANSLATIONS, EVENTS } from '@/data';
import { SectionHeader } from '../ui/SectionHeader';

interface EventsPreviewProps {
  lang: Language;
  onNavigate: Navigate;
}

export const EventsPreview: React.FC<EventsPreviewProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-20">
      <SectionHeader
        eyebrow={t.home.evEyebrow}
        title={t.home.evTitle}
        action={{
          label: t.home.evAction,
          onClick: () => onNavigate('events')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EVENTS.slice(0, 2).map((ev) => {
          const loc = ev[lang];
          return (
            <div
              key={ev.key}
              onClick={() => onNavigate('events')}
              className="flex items-center gap-4.5 bg-[var(--surface-card)] border border-[var(--border)] rounded-sm p-4.5 shadow-[var(--shadow-card)] cursor-pointer hover:border-[var(--brand-primary)] transition-all"
            >
              {/* Date Box */}
              <div className="flex-none w-26 flex flex-col gap-0.5 items-center bg-[var(--tint-brand)] rounded-xs py-3 px-2 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-primary)]">
                  {loc.tag}
                </span>
                <span className="text-base font-extrabold text-[var(--brand-primary)] leading-tight">
                  {loc.date}
                </span>
              </div>

              {/* Title & Location */}
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold text-[var(--text-primary)] leading-tight">
                  {loc.title}
                </h4>
                <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  {loc.loc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
