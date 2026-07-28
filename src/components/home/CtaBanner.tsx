'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Language, TRANSLATIONS, CONTACT_INFO } from '@/data/singapaduData';
import { Button } from '../ui/Button';

interface CtaBannerProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const waLink = `https://wa.me/${CONTACT_INFO.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(t.waGeneral)}`;

  return (
    <section className="bg-[#16241B] border-b border-[#2A362E] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-7 flex-wrap">
        <div className="flex flex-col gap-2.5 flex-1 min-w-[280px]">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#66BB6A]">
            {t.home.cta.eyebrow}
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {t.home.cta.title}
          </h2>

          <p className="text-base text-[#F0F4EC]/75 max-w-[560px] leading-relaxed">
            {t.home.cta.body}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <Button
              variant="primary"
              icon={<MessageCircle className="w-4 h-4" />}
            >
              {t.home.cta.btn}
            </Button>
          </a>

          <button
            onClick={() => onNavigate('events')}
            className="px-5 py-2.5 border-1.5 border-white/55 rounded-sm bg-transparent text-white font-semibold text-sm hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.home.cta.btn2}
          </button>
        </div>
      </div>
    </section>
  );
};
