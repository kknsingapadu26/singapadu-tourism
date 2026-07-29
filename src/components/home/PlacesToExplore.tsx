'use client';

import React from 'react';
import { type Language, type Navigate, TRANSLATIONS, DESTS } from '@/data';
import { SectionHeader } from '../ui/SectionHeader';
import { DestinationCard } from '../ui/DestinationCard';

interface PlacesToExploreProps {
  lang: Language;
  onNavigate: Navigate;
}

export const PlacesToExplore: React.FC<PlacesToExploreProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const dests3 = DESTS.slice(0, 3);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-16">
      <SectionHeader
        eyebrow={t.home.destEyebrow}
        title={t.home.destTitle}
        action={{
          label: t.home.destAction,
          onClick: () => onNavigate('destinations')
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dests3.map((dest) => {
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
              price={loc.price}
              hours={loc.hours}
              lang={lang}
              onClick={() => onNavigate('detail', { destKey: dest.key })}
            />
          );
        })}
      </div>
    </section>
  );
};
