'use client';

import React from 'react';
import { type Language, type Navigate, TRANSLATIONS, CONTACT_INFO } from '@/data/singapaduData';
import { Icon, type IconName } from '../ui/Icon';

interface QuickLinksProps {
  lang: Language;
  onNavigate: Navigate;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const waLink = `https://wa.me/${CONTACT_INFO.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(t.waGeneral)}`;

  const links: Array<{ icon: IconName; label: string; action: () => void }> = [
    { icon: 'map-pin', label: t.home.quick.all, action: () => onNavigate('destinations', { cat: 'All' }) },
    { icon: 'landmark', label: t.cats.Culture, action: () => onNavigate('destinations', { cat: 'Culture' }) },
    { icon: 'trees', label: t.cats.Nature, action: () => onNavigate('destinations', { cat: 'Nature' }) },
    { icon: 'hammer', label: t.cats.Craft, action: () => onNavigate('destinations', { cat: 'Craft' }) },
    { icon: 'baby', label: t.cats.Family, action: () => onNavigate('destinations', { cat: 'Family' }) },
    { icon: 'calendar', label: t.nav.events, action: () => onNavigate('events') },
    { icon: 'message-circle', label: t.home.quick.plan, action: () => window.open(waLink, '_blank') }
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
            <Icon name={item.icon} className="w-4.5 h-4.5 text-[var(--brand-primary)]" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
