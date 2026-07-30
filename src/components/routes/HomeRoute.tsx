'use client';

import { BentoGrid } from '@/components/home/BentoGrid';
import { CraftHighlight } from '@/components/home/CraftHighlight';
import { CtaBanner } from '@/components/home/CtaBanner';
import { EventsPreview } from '@/components/home/EventsPreview';
import { Hero } from '@/components/home/Hero';
import { MustSeeSpotlight } from '@/components/home/MustSeeSpotlight';
import { PlacesToExplore } from '@/components/home/PlacesToExplore';
import { QuickLinks } from '@/components/home/QuickLinks';
import { TipsSection } from '@/components/home/TipsSection';
import { useSite } from '@/components/layout/SiteShell';

export function HomeRoute() {
  const { lang, navigate } = useSite();

  return (
    <div className="animate-sgp-fade">
      <Hero lang={lang} onNavigate={navigate} />
      <QuickLinks lang={lang} onNavigate={navigate} />
      <PlacesToExplore lang={lang} onNavigate={navigate} />
      <BentoGrid lang={lang} onNavigate={navigate} />
      <MustSeeSpotlight lang={lang} onNavigate={navigate} />
      <CraftHighlight lang={lang} onNavigate={navigate} />
      <EventsPreview lang={lang} onNavigate={navigate} />
      <TipsSection lang={lang} />
      <CtaBanner lang={lang} onNavigate={navigate} />
    </div>
  );
}
