'use client';

import React from 'react';
import Image from 'next/image';
import { type Language, type Navigate, TRANSLATIONS, DESTS } from '@/data';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';

interface CraftHighlightProps {
  lang: Language;
  onNavigate: Navigate;
}

export const CraftHighlight: React.FC<CraftHighlightProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const craftDestination = DESTS.find((destination) => destination.key === 'krisna-yuna') ?? DESTS[0];

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Image */}
        <div className="relative aspect-[4/3] lg:col-span-6 rounded-sm overflow-hidden shadow-md">
          {craftDestination.img ? (
            <Image
              src={craftDestination.img}
              alt={craftDestination[lang].title}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder label={craftDestination[lang].title} tone={craftDestination.tone} />
          )}
        </div>

        {/* Right Content */}
        <div className="lg:col-span-6 flex flex-col gap-5 items-start">
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)]">
            {t.home.craftEyebrow}
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] leading-[1.02] tracking-[-0.02em]">
            {t.home.craftTitle}
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {t.home.craftBody}
          </p>

          <div className="pt-2">
            <Button
              variant="primary"
              onClick={() => onNavigate('destinations', { cat: 'Craft' })}
              icon={<Icon name="arrow-right" className="w-4 h-4" />}
            >
              {t.home.craftCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
