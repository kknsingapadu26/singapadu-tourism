'use client';

import React, { useState, useEffect } from 'react';
import { type Language, type Navigate, TRANSLATIONS, HERO_SLIDES, CONTACT_INFO } from '@/data';
import { Icon } from '../ui/Icon';

interface HeroProps {
  lang: Language;
  onNavigate: Navigate;
}

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const t = TRANSLATIONS[lang];
  const waLink = `https://wa.me/${CONTACT_INFO.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(t.waGeneral)}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const currentSlideData = t.home.slides[activeIdx];
  const currentSlideConfig = HERO_SLIDES[activeIdx];

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] bg-[var(--surface-inverse)] text-white overflow-hidden">
      {/* Slide Background Images */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.key}
          className={`absolute inset-0 transition-opacity duration-[var(--dur-med)] ease-[var(--ease-out)] ${
            idx === activeIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.img}
            alt={t.home.slides[idx]?.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Scrim Overlay */}
          <div className="absolute inset-0" style={{ backgroundImage: 'var(--scrim)' }} />
        </div>
      ))}

      {/* Main Hero Content */}
      <div className="relative z-20 w-full h-full max-w-[1200px] mx-auto px-6 flex flex-col justify-end pb-32">
        <div className="max-w-[780px] space-y-4 animate-sgp-fade">
          {/* Category Tag */}
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--accent)]">
            {(t.cats as Record<string, string>)[currentSlideConfig.cat]}
          </span>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.02] tracking-[-0.02em] drop-shadow-md">
            {currentSlideData.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/90 max-w-[560px] leading-relaxed drop-shadow-sm font-normal">
            {currentSlideData.sub}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex items-center gap-5 flex-wrap">
            <button
              onClick={() => onNavigate('detail', { destKey: currentSlideConfig.key })}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-[var(--text-on-brand)] font-bold text-base transition-all duration-[var(--dur-fast)] ease-[var(--ease-out)] active:scale-[.98] cursor-pointer shadow-md"
            >
              <span>{currentSlideData.cta}</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-base font-semibold underline underline-offset-4 hover:text-[var(--green-300)] transition-colors duration-[var(--dur-fast)]"
            >
              {t.home.quick.plan}
            </a>
          </div>
        </div>
      </div>

      {/* Location Badge (Bottom Right Desktop) */}
      <div className="hidden sm:flex absolute right-8 bottom-32 z-20 items-center gap-2 text-white/90 text-xs font-semibold drop-shadow-md bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/20">
        <Icon name="map-pin" className="w-3.5 h-3.5 text-white" />
        <span>{currentSlideData.loc}</span>
      </div>

      {/* Thumbnails Bar (Bottom) */}
      <div className="absolute left-0 right-0 bottom-0 z-30 bg-gradient-to-t from-black/80 to-transparent pt-6 pb-4">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-3 overflow-x-auto overflow-y-hidden no-scrollbar">
          {HERO_SLIDES.map((slide, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={slide.key}
                onClick={() => setActiveIdx(idx)}
                className={`relative flex-none w-32 h-16 rounded-sm overflow-hidden border-2 transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'border-[var(--accent)] opacity-100 scale-102 shadow-lg'
                    : 'border-white/35 opacity-75 hover:opacity-100'
                }`}
              >
                <img src={slide.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute left-2 bottom-1.5 z-10 text-[10.5px] font-bold uppercase tracking-wider text-white">
                  {(t.cats as Record<string, string>)[slide.cat]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
