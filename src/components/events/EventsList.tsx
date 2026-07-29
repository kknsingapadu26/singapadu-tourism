'use client';

import React from 'react';
import { Language, TRANSLATIONS, EVENTS, CONTACT_INFO } from '@/data';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

interface EventsListProps {
  lang: Language;
}

export const EventsList: React.FC<EventsListProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const waLink = `https://wa.me/${CONTACT_INFO.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(t.waGeneral)}`;

  return (
    <div className="pt-32 pb-24 max-w-[960px] mx-auto px-6">
      {/* Header section */}
      <div className="flex flex-col gap-3 mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)]">
          {t.events.eyebrow}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] leading-[1.02] tracking-[-0.02em]">
          {t.events.title}
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-[620px]">
          {t.events.sub}
        </p>
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-4">
        {EVENTS.map((ev) => {
          const loc = ev[lang];
          return (
            <div
              key={ev.key}
              className="flex items-start gap-5 bg-[var(--surface-card)] border border-[var(--border)] rounded-sm shadow-[var(--shadow-card)] p-5"
            >
              {/* Date Box */}
              <div className="flex-none w-28 flex flex-col gap-0.5 items-center bg-[var(--tint-brand)] rounded-xs py-3.5 px-2.5 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)]">
                  {loc.tag}
                </span>
                <span className="text-[18px] font-extrabold text-[var(--brand-primary)] leading-[1.15]">
                  {loc.date}
                </span>
              </div>

              {/* Event Content */}
              <div className="flex flex-col gap-2 flex-1">
                <div>
                  <Badge category={ev.cat}>{(t.cats as Record<string, string>)[ev.cat]}</Badge>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] m-0 leading-snug">
                  {loc.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] m-0 leading-relaxed">
                  {loc.desc}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] pt-0.5">
                  <Icon name="map-pin" className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  <span>{loc.loc}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pawukon Calendar Note Card (Bottom) */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4.5 bg-[var(--tint-accent)] rounded-sm p-5.5">
        <Icon name="calendar" className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5 sm:mt-0" />
        <span className="text-sm text-[var(--text-primary)] flex-1 min-w-[200px] leading-relaxed">
          {t.events.note}
        </span>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
          <Button
            variant="primary"
            size="sm"
            icon={<Icon name="message-circle" className="w-4 h-4" />}
          >
            {t.events.ask}
          </Button>
        </a>
      </div>
    </div>
  );
};
