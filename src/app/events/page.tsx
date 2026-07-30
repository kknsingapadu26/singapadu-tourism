import type { Metadata } from 'next';
import { EventsRoute } from '@/components/routes/EventsRoute';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Plan around ceremonies, performances and village events in Singapadu, Gianyar, Bali.',
  alternates: { canonical: '/events' },
};

export default function EventsPage() {
  return <EventsRoute />;
}
