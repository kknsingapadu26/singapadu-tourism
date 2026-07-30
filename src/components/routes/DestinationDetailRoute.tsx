'use client';

import { DestinationDetail } from '@/components/destinations/DestinationDetail';
import { useSite } from '@/components/layout/SiteShell';
import type { DestinationKey } from '@/data';

export function DestinationDetailRoute({ destKey }: { destKey: DestinationKey }) {
  const { lang, navigate } = useSite();

  return (
    <div className="animate-sgp-fade">
      <DestinationDetail lang={lang} destKey={destKey} onNavigate={navigate} />
    </div>
  );
}
