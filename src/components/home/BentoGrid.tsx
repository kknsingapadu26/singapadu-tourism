'use client';

import React from 'react';
import Image from 'next/image';
import { type DestinationRecord, type Language, type Navigate, TRANSLATIONS, DESTS } from '@/data';
import { SectionHeader } from '../ui/SectionHeader';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';

interface BentoGridProps {
  lang: Language;
  onNavigate: Navigate;
}

function BentoMedia({
  destination,
  label,
  sizes,
}: {
  destination: DestinationRecord;
  label: string;
  sizes: string;
}) {
  return destination.img ? (
    <Image
      src={destination.img}
      alt={label}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] group-hover:scale-103"
    />
  ) : (
    <ImagePlaceholder label={label} tone={(destination as { tone?: 'green' | 'amber' | 'sky' | 'navy' }).tone} />
  );
}

export const BentoGrid: React.FC<BentoGridProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const rec = t.home.rec;

  const barongDest = DESTS.find((d) => d.key === 'barong-seraya') ?? DESTS[0];
  const craftDest = DESTS.find((d) => d.key === 'krisna-yuna') ?? DESTS[0];
  const natureDest = DESTS.find((d) => d.key === 'alam-sari') ?? DESTS[1];
  const familyDest = DESTS.find((d) => d.key === 'bali-bird-park') ?? DESTS[0];
  const sacredDest = DESTS.find((d) => d.key === 'wisata-religi') ?? DESTS[0];

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-16">
      <SectionHeader
        eyebrow={rec.eyebrow}
        title={rec.title}
        action={{
          label: t.home.destAction,
          onClick: () => onNavigate('destinations')
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[205px] gap-3">
        {/* Main 2x2 Bento Card: The ceremony season */}
        <div
          onClick={() => onNavigate('events')}
          className="group relative sm:col-span-2 sm:row-span-2 rounded-sm overflow-hidden cursor-pointer shadow-md"
        >
          <BentoMedia destination={barongDest} label={barongDest[lang].title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

          <div className="absolute left-5 right-5 bottom-4 flex flex-col gap-1.5 z-10 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
              {rec.tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {rec.f}
            </h3>
            <p className="text-sm text-white/85 max-w-md line-clamp-2">
              {rec.fSub}
            </p>
          </div>
        </div>

        {/* Small Bento 1: Craft workshops */}
        <div
          onClick={() => onNavigate('destinations', { cat: 'Craft' })}
          className="group relative rounded-sm overflow-hidden cursor-pointer shadow-sm"
        >
          <BentoMedia destination={craftDest} label={craftDest[lang].title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <span className="absolute left-4 right-4 bottom-3.5 z-10 font-bold text-lg text-white leading-snug">
            {rec.c1}
          </span>
        </div>

        {/* Small Bento 2: Morning in the subak */}
        <div
          onClick={() => onNavigate('detail', { destKey: natureDest.key })}
          className="group relative rounded-sm overflow-hidden cursor-pointer shadow-sm"
        >
          <BentoMedia destination={natureDest} label={natureDest[lang].title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <span className="absolute left-4 right-4 bottom-3.5 z-10 font-bold text-lg text-white leading-snug">
            {rec.c2}
          </span>
        </div>

        {/* Small Bento 3: With kids */}
        <div
          onClick={() => onNavigate('detail', { destKey: familyDest.key })}
          className="group relative rounded-sm overflow-hidden cursor-pointer shadow-sm"
        >
          <BentoMedia destination={familyDest} label={familyDest[lang].title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <span className="absolute left-4 right-4 bottom-3.5 z-10 font-bold text-lg text-white leading-snug">
            {rec.c3}
          </span>
        </div>

        {/* Small Bento 4: Sacred Singapadu */}
        <div
          onClick={() => onNavigate('detail', { destKey: sacredDest.key })}
          className="group relative rounded-sm overflow-hidden cursor-pointer shadow-sm"
        >
          <BentoMedia destination={sacredDest} label={sacredDest[lang].title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <span className="absolute left-4 right-4 bottom-3.5 z-10 font-bold text-lg text-white leading-snug">
            {rec.c4}
          </span>
        </div>
      </div>
    </section>
  );
};
