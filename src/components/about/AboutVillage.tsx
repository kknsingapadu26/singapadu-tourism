'use client';

import React from 'react';
import Image from 'next/image';
import { Language, TRANSLATIONS } from '@/data';
import { Icon, type IconName } from '../ui/Icon';

interface AboutVillageProps {
  lang: Language;
}

export const AboutVillage: React.FC<AboutVillageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const aboutMapSrc = `https://maps.google.com/maps?q=${encodeURIComponent("Desa Singapadu, Sukawati, Gianyar")}&z=14&hl=${lang}&output=embed`;

  const icons: IconName[] = ['map-pin', 'car', 'landmark'];

  return (
    <div className="pt-32 pb-24 max-w-[1200px] mx-auto px-6">
      {/* Section 1: Story & Photo (1.15fr : 1fr) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)]">
            {t.about.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] leading-[1.02] tracking-[-0.02em]">
            {t.about.title}
          </h1>
          <div className="flex flex-col gap-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[600px]">
            {t.about.paras.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Feature Village Photo */}
        <div className="relative aspect-[7/8] lg:col-span-5 rounded-sm overflow-hidden shadow-md">
          <Image
            src="/gallery/pura_desa2-768w.webp"
            alt="Singapadu village tradition"
            fill
            sizes="(max-width: 1024px) 100vw, 460px"
            preload
            className="object-cover"
          />
        </div>
      </div>

      {/* Section 2: Quick Facts (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {t.about.facts.map((fact, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 bg-[var(--surface-card)] border border-[var(--border)] rounded-sm shadow-[var(--shadow-card)] p-5"
          >
            <div className="flex-shrink-0 mt-0.5">
              <Icon name={icons[idx]} className="w-5 h-5 text-[var(--brand-primary)]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                {fact.label}
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {fact.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Section 3: Partners & Village Map (1fr : 1fr) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Partners Card */}
        <div className="flex flex-col gap-4 bg-[var(--surface-card)] border border-[var(--border)] rounded-sm shadow-[var(--shadow-card)] p-6">
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)]">
            {t.about.partnerEyebrow}
          </span>
          <h3 className="text-2xl font-bold text-[var(--text-primary)] m-0">
            {t.about.partnerTitle}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] m-0 leading-relaxed">
            {t.about.partnerBody}
          </p>

          {/* Institutional Partner Badges */}
          <div className="flex items-center gap-7 pt-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/logo-desa-singapadu.webp"
                alt="Pemerintah Desa Singapadu"
                width={56}
                height={56}
                sizes="56px"
                className="h-14 w-14 shrink-0 object-contain"
              />
              <span className="text-xs font-semibold text-[var(--text-secondary)] leading-snug">
                Pemerintah<br />Desa Singapadu
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src="/logos/logo-pnb.webp"
                alt="Politeknik Negeri Bali"
                width={56}
                height={56}
                sizes="56px"
                className="h-14 w-14 shrink-0 object-contain"
              />
              <span className="text-xs font-semibold text-[var(--text-secondary)] leading-snug">
                Politeknik<br />Negeri Bali
              </span>
            </div>
          </div>
        </div>

        {/* Village Map */}
        <div className="flex flex-col gap-2.5">
          <div className="w-full h-[330px] rounded-sm overflow-hidden border border-[var(--border)] bg-[var(--surface-sunken)]">
            <iframe
              title="Village map"
              src={aboutMapSrc}
              className="w-full h-full border-0 block"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <span className="text-xs text-[var(--text-secondary)]">
            {t.about.mapCaption}
          </span>
        </div>
      </div>
    </div>
  );
};
