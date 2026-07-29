'use client';

import React from 'react';
import { type Language, type Navigate, TRANSLATIONS, CONTACT_INFO } from '@/data/singapaduData';
import { Icon } from '../ui/Icon';

interface FooterProps {
  lang: Language;
  onNavigate: Navigate;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const waLink = `https://wa.me/${CONTACT_INFO.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(t.waGeneral)}`;

  return (
    <footer className="bg-[var(--surface-inverse)] text-[var(--text-inverse)] border-t border-[var(--border-strong)] pt-16 pb-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[var(--border-strong)]">
          {/* Col 1: Brand & Blurb */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logos/logo-desa-singapadu.webp"
                alt="Logo Desa Singapadu"
                className="w-10 h-10 object-contain rounded-xl"
              />
              <div>
                <span className="block font-extrabold text-lg tracking-tight text-white">
                  Singapadu
                </span>
                <span className="block text-[11px] uppercase tracking-[0.08em] font-semibold text-[var(--neutral-300)]">
                  Village Tourism
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--neutral-300)] leading-relaxed">
              {t.footer.blurb}
            </p>
          </div>

          {/* Col 2: Explore links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--neutral-300)]">
              {t.footer.explore}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.destinations}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.events}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Visit links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--neutral-300)]">
              {t.footer.visit}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.plan}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.getting}
                </button>
              </li>
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>{t.footer.wa}</span>
                  <Icon name="external-link" className="w-3 h-3 text-[var(--neutral-300)]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--neutral-300)]">
              {t.footer.contact}
            </h4>
            <div className="space-y-2 text-sm text-[var(--text-inverse)] leading-relaxed">
              <div className="flex items-start gap-2">
                <Icon name="map-pin" className="w-4 h-4 text-[var(--green-400)] mt-1 flex-shrink-0" />
                <span>Desa Singapadu, Sukawati,<br />Gianyar, Bali 80582</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="mail" className="w-4 h-4 text-[var(--green-400)] flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="phone" className="w-4 h-4 text-[var(--green-400)] flex-shrink-0" />
                <span>{CONTACT_INFO.whatsappNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partners & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 flex-wrap">
            {/* Government Logo Crest */}
            <div className="flex items-center gap-2.5">
              <img
                src="/logos/logo-desa-singapadu.webp"
                alt="Pemerintah Desa Singapadu"
                className="w-9 h-9 object-contain"
              />
              <span className="text-xs text-[#9BA89D] leading-tight">
                Pemerintah<br />Desa Singapadu
              </span>
            </div>

            {/* University Crest */}
            <div className="flex items-center gap-2.5">
              <img
                src="/logos/logo-pnb.webp"
                alt="Politeknik Negeri Bali"
                className="w-9 h-9 object-contain"
              />
              <span className="text-xs text-[#9BA89D] leading-tight">
                Politeknik<br />Negeri Bali
              </span>
            </div>

            {/* KKN Logo Crest */}
            <div className="flex items-center gap-2.5">
              <img
                src="/logos/logo-kkn-singapadu.webp"
                alt="KKN Singapadu"
                className="w-9 h-9 object-contain rounded-full"
              />
              <span className="text-xs text-[#9BA89D] leading-tight">
                KKN Singapadu<br />2026
              </span>
            </div>
          </div>

          <span className="text-xs text-[var(--neutral-500)] text-center sm:text-right">
            © 2026 KKN Politeknik Negeri Bali × Desa Singapadu
          </span>
        </div>
      </div>
    </footer>
  );
};
