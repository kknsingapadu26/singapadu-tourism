'use client';

import React from 'react';
import {
  DESTINATION_FILTERS,
  type DestinationFilter,
  type Language,
  type Navigate,
  TRANSLATIONS,
  DESTS,
} from '@/data';
import { Tag } from '../ui/Tag';
import { DestinationCard } from '../ui/DestinationCard';

interface DestinationsListProps {
  lang: Language;
  initialCat?: DestinationFilter;
  onFilterChange: (category: DestinationFilter) => void;
  onNavigate: Navigate;
}

export const DestinationsList: React.FC<DestinationsListProps> = ({
  lang,
  initialCat = 'All',
  onFilterChange,
  onNavigate
}) => {
  const selectedCat = initialCat;
  const t = TRANSLATIONS[lang];

  const filteredDests = DESTS.filter((d) => {
    if (selectedCat === 'All') return true;
    return d.cat === selectedCat;
  });

  return (
    <div className="pt-32 pb-24 max-w-[1200px] mx-auto px-6">
      {/* Header section */}
      <div className="flex flex-col gap-3 mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)]">
          {t.dests.eyebrow}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] leading-[1.02] tracking-[-0.02em]">
          {t.dests.title}
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-[560px]">
          {t.dests.sub}
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2.5 flex-wrap mb-8">
        {DESTINATION_FILTERS.map((cat) => {
          const count = cat === 'All' ? DESTS.length : DESTS.filter((d) => d.cat === cat).length;
          return (
            <Tag
              key={cat}
              label={(t.cats as Record<string, string>)[cat] || cat}
              count={count}
              selected={selectedCat === cat}
              onClick={() => onFilterChange(cat)}
            />
          );
        })}
      </div>

      {/* Destinations Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDests.map((dest, index) => {
          const loc = dest[lang];
          return (
            <DestinationCard
              key={dest.key}
              title={loc.title}
              category={(t.cats as Record<string, string>)[dest.cat]}
              location={loc.location}
              blurb={loc.blurb}
              img={dest.img}
              imgLabel={dest.imgLabel}
              tone={dest.tone}
              price={loc.price}
              hours={loc.hours}
              eager={index === 0}
              lang={lang}
              onClick={() => onNavigate('detail', { destKey: dest.key })}
            />
          );
        })}
      </div>
    </div>
  );
};
