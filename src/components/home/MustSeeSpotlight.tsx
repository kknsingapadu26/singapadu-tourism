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

  const nextSpot = () => setSpotIdx((prev) => (prev + 1) % DESTS.length);
  const prevSpot = () => setSpotIdx((prev) => (prev - 1 + DESTS.length) % DESTS.length);
  const clipPathFor = (idx: number) => {
    if (idx === spotIdx) return 'inset(0 0 0 0)';
    return idx < spotIdx ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
  };

  return (
    <section data-testid="must-see-carousel" className="mt-20 bg-[var(--surface-inverse)] py-14 text-[var(--text-inverse)] sm:py-20">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        <div className="relative h-[720px] overflow-hidden rounded-sm bg-[var(--surface-inverse)] sm:h-[clamp(560px,72vh,760px)]">
          {/* Directional image layers continuously cover the frame. */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-sm">
            {DESTS.map((spot, idx) => {
              const isSelected = idx === spotIdx;
              return (
                <img
                  key={spot.key}
                  src={spot.img || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1600"}
                  alt={isSelected ? spot[lang].title : ''}
                  aria-hidden={!isSelected}
                  style={{ clipPath: clipPathFor(idx) }}
                  className={`absolute inset-0 h-full w-full object-cover transition-[clip-path,scale] duration-[var(--dur-carousel)] ease-[var(--ease-out)] ${
                    isSelected ? 'z-10 scale-100' : 'z-0 scale-[1.025]'
                  }`}
                />
              );
            })}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          </div>

          {/* The card remains fixed while its content follows the image wipe. */}
          <div className="absolute bottom-20 left-4 right-4 z-30 h-[320px] overflow-hidden rounded-sm border border-white/10 bg-[var(--surface-inverse)] shadow-[var(--shadow-overlay)] sm:bottom-10 sm:left-10 sm:right-auto sm:h-[310px] sm:w-[480px]">
            {DESTS.map((spot, idx) => {
              const isSelected = idx === spotIdx;
              const spotLoc = spot[lang];

              return (
                <div
                  key={`${spot.key}-${lang}`}
                  aria-hidden={!isSelected}
                  inert={!isSelected}
                  className={`absolute inset-0 flex flex-col items-start gap-3 p-6 text-white transition-[opacity,transform] duration-[var(--dur-med)] ease-[var(--ease-out)] sm:p-8 ${
                    isSelected
                      ? 'z-10 translate-y-0 opacity-100'
                      : `z-0 opacity-0 pointer-events-none ${idx < spotIdx ? '-translate-y-2' : 'translate-y-2'}`
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--green-400)]">
                    {t.home.spotEyebrow}
                  </span>

                  <h2 className="text-2xl font-extrabold leading-[1.02] tracking-[-0.02em] text-white sm:text-3xl">
                    {spotLoc.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-white/72">
                    {spotLoc.blurb}
                  </p>

                  <div className="mt-auto pt-1">
                    <Button
                      variant="primary"
                      onClick={() => onNavigate('detail', { destKey: spot.key })}
                      icon={<Icon name="arrow-right" className="h-4 w-4" />}
                    >
                      {t.home.spotCta}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Joined controls follow the reference carousel's anchored treatment. */}
          <div className="absolute bottom-0 right-0 z-30 flex h-16 items-stretch overflow-hidden rounded-tl-sm border-l border-t border-white/10 bg-[var(--surface-inverse)]">
            <span className="flex min-w-20 items-center justify-center px-4 text-sm font-semibold text-white/80" aria-live="polite">
              {spotIdx + 1} / {DESTS.length}
            </span>

            <button
              onClick={prevSpot}
              data-testid="must-see-previous"
              aria-label="Previous spot"
              className="flex w-16 items-center justify-center border-l border-white/12 text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/10 cursor-pointer"
            >
              <Icon name="chevron-left" className="h-5 w-5" />
            </button>

            <button
              onClick={nextSpot}
              data-testid="must-see-next"
              aria-label="Next spot"
              className="flex w-16 items-center justify-center border-l border-white/12 text-white transition-colors duration-[var(--dur-fast)] hover:bg-white/10 cursor-pointer"
            >
              <Icon name="chevron-right" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
