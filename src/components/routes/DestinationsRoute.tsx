'use client';

import { DestinationsList } from '@/components/destinations/DestinationsList';
import { useSite } from '@/components/layout/SiteShell';
import type { DestinationFilter } from '@/data';

export function DestinationsRoute({ initialCat }: { initialCat: DestinationFilter }) {
  const { lang, navigate } = useSite();

  return (
    <div className="animate-sgp-fade">
      <DestinationsList
        lang={lang}
        initialCat={initialCat}
        onNavigate={navigate}
      />
    </div>
  );
}
