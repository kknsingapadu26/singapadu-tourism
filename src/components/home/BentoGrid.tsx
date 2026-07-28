'use client';

import React from 'react';
import { Language, TRANSLATIONS, DESTS } from '@/data/singapaduData';
import { SectionHeader } from '../ui/SectionHeader';

interface BentoGridProps {
  lang: Language;
  onNavigate: (page: string, extra?: Record<string, any>) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const rec = t.home.rec;

  // Destination images for bento grid cards
  const barongDest = DESTS.find((d) => d.key === 'barong');
  const subakDest = DESTS.find((d) => d.key === 'subak');
  const carvingDest = DESTS.find((d) => d.key === 'carving');
  const zooDest = DESTS.find((d) => d.key === 'zoo');

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
          <img
            src={barongDest?.img || "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?auto=format&fit=crop&q=80&w=1200"}
            alt={rec.f}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

          <div className="absolute left-5 right-5 bottom-4 flex flex-col gap-1.5 z-10 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
              {rec.tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
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
          <img
            src={carvingDest?.img || "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800"}
            alt={rec.c1}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <span className="absolute left-4 right-4 bottom-3.5 z-10 font-bold text-lg text-white leading-snug">
            {rec.c1}
          </span>
        </div>

        {/* Small Bento 2: Morning in the subak */}
        <div
          onClick={() => onNavigate('detail', { destKey: 'subak' })}
          className="group relative rounded-sm overflow-hidden cursor-pointer shadow-sm"
        >
          <img
            src={subakDest?.img || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800"}
            alt={rec.c2}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <span className="absolute left-4 right-4 bottom-3.5 z-10 font-bold text-lg text-white leading-snug">
            {rec.c2}
          </span>
        </div>

        {/* Small Bento 3: With kids */}
        <div
          onClick={() => onNavigate('detail', { destKey: 'zoo' })}
          className="group relative rounded-sm overflow-hidden cursor-pointer shadow-sm"
        >
          <img
            src={zooDest?.img || "https://images.unsplash.com/photo-1554457945-ba5df6648602?auto=format&fit=crop&q=80&w=800"}
            alt={rec.c3}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <span className="absolute left-4 right-4 bottom-3.5 z-10 font-bold text-lg text-white leading-snug">
            {rec.c3}
          </span>
        </div>

        {/* Small Bento 4: Sacred Singapadu */}
        <div
          onClick={() => onNavigate('detail', { destKey: 'barong' })}
          className="group relative rounded-sm overflow-hidden cursor-pointer shadow-sm"
        >
          <img
            src={barongDest?.img || "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?auto=format&fit=crop&q=80&w=800"}
            alt={rec.c4}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <span className="absolute left-4 right-4 bottom-3.5 z-10 font-bold text-lg text-white leading-snug">
            {rec.c4}
          </span>
        </div>
      </div>
    </section>
  );
};
