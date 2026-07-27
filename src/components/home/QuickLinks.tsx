'use client';

import React from 'react';
import { MapPin, Landmark, Trees, Hammer, Baby, Calendar, MessageCircle } from 'lucide-react';
import { Language, TRANSLATIONS, CONTACT_INFO } from '@/data/singapaduData';

interface QuickLinksProps {
  lang: Language;
  onNavigate: (page: string, extra?: Record<string, any>) => void;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const waLink = `https://wa.me/${CONTACT_INFO.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(t.waGeneral)}`;

  const links = [
    { icon: <MapPin className="w-4.5 h-4.5 text-[var(--brand-primary)]" />, label: t.home.quick.all, action: () => onNavigate('destinations', { cat: 'All' }) },
    { icon: <Landmark className="w-4.5 h-4.5 text-[var(--brand-primary)]" />, label: t.cats.Culture, action: () => onNavigate('destinations', { cat: 'Culture' }) },
    { icon: <Trees className="w-4.5 h-4.5 text-[var(--brand-primary)]" />, label: t.cats.Nature, action: () => onNavigate('destinations', { cat: 'Nature' }) },
    { icon: <Hammer className="w-4.5 h-4.5 text-[var(--brand-primary)]" />, label: t.cats.Craft, action: () => onNavigate('destinations', { cat: 'Craft' }) },
    { icon: <Baby className="w-4.5 h-4.5 text-[var(--brand-primary)]" />, label: t.cats.Family, action: () => onNavigate('destinations', { cat: 'Family' }) },
    { icon: <Calendar className="w-4.5 h-4.5 text-[var(--brand-primary)]" />, label: t.nav.events, action: () => onNavigate('events') },
    { icon: <MessageCircle className="w-4.5 h-4.5 text-[var(--brand-primary)]" />, label: t.home.quick.plan, action: () => window.open(waLink, '_blank') }
  ];

  return (
    <div className="bg-[var(--surface-card)] border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6 py-3.5 flex items-center gap-7 overflow-x-auto no-scrollbar">
        {links.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="flex-none flex items-center gap-2 py-1 bg-transparent border-none cursor-pointer text-sm font-semibold text-[var(--text-primary)] hover:underline hover:underline-offset-4 whitespace-nowrap transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
