'use client';

import { EventsList } from '@/components/events/EventsList';
import { useSite } from '@/components/layout/SiteShell';

export function EventsRoute() {
  const { lang } = useSite();

  return (
    <div className="animate-sgp-route">
      <EventsList lang={lang} />
    </div>
  );
}
