'use client';

import React, { useState } from 'react';
import { type Language, type Navigate, TRANSLATIONS, DESTS } from '@/data';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

interface MustSeeSpotlightProps {
  lang: Language;
  onNavigate: Navigate;
}

export const MustSeeSpotlight: React.FC<MustSeeSpotlightProps> = ({ lang, onNavigate }) => {
  const [spotIdx, setSpotIdx] = useState(0);
  const t = TRANSLATIONS[lang];

  const spotRaw = DESTS[spotIdx];
  const spotLoc = spotRaw[lang];

  const nextSpot = () => setSpotIdx((prev) => (prev + 1) % DESTS.length);
  const prevSpot = () => setSpotIdx((prev) => (prev - 1 + DESTS.length) % DESTS.length);

  return (
    <section className="mt-20 relative h-[76vh] min-h-[520px] max-h-[760px] overflow-hidden bg-[var(--surface-sunken)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={spotRaw.img || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1600"}
          alt={spotLoc.title}
          className="w-full h-full object-cover transition-all duration-[var(--dur-med)] ease-[var(--ease-out)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
      </div>

      {/* Floating Card & Navigation Overlay */}
      <div className="relative z-10 h-full max-w-[1200px] mx-auto px-6">
        {/* Floating White Card (Bottom-Left) */}
        <div className="absolute left-6 sm:left-6 bottom-24 max-w-[440px] bg-[var(--surface-card)] text-[var(--text-primary)] rounded-sm shadow-[var(--shadow-overlay)] p-6.5 flex flex-col gap-3 items-start border border-[var(--border)]">
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)]">
            {t.home.spotEyebrow}
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] leading-[1.02] tracking-[-0.02em]">
            {spotLoc.title}
          </h2>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {spotLoc.blurb}
          </p>

          <div className="pt-1">
            <Button
              variant="primary"
              onClick={() => onNavigate('detail', { destKey: spotRaw.key })}
              icon={<Icon name="arrow-right" className="w-4 h-4" />}
            >
              {t.home.spotCta}
            </Button>
          </div>
        </div>

        {/* Carousel Navigation Buttons (Bottom-Right) */}
        <div className="absolute right-6 bottom-6 flex items-center gap-3">
          <span className="text-white text-sm font-semibold opacity-95 text-shadow-sm">
            {spotIdx + 1} / {DESTS.length}
          </span>

          <button
            onClick={prevSpot}
            aria-label="Previous spot"
            className="w-11 h-11 flex items-center justify-center border-1.5 border-white/60 rounded-sm bg-black/35 hover:bg-black/65 text-white transition-colors cursor-pointer"
          >
            <Icon name="chevron-left" className="w-5 h-5" />
          </button>

          <button
            onClick={nextSpot}
            aria-label="Next spot"
            className="w-11 h-11 flex items-center justify-center border-1.5 border-white/60 rounded-sm bg-black/35 hover:bg-black/65 text-white transition-colors cursor-pointer"
          >
            <Icon name="chevron-right" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
