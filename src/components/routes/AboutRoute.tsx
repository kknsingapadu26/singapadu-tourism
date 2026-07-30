'use client';

import { AboutVillage } from '@/components/about/AboutVillage';
import { useSite } from '@/components/layout/SiteShell';

export function AboutRoute() {
  const { lang } = useSite();

  return (
    <div className="animate-sgp-route">
      <AboutVillage lang={lang} />
    </div>
  );
}
