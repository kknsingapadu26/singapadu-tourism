import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DestinationsRoute } from '@/components/routes/DestinationsRoute';

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Explore culture, nature, craft, family and sacred places across Singapadu Village, Gianyar, Bali.',
  alternates: { canonical: '/destinations' },
};

function DestinationsFallback() {
  return (
    <div
      role="status"
      aria-label="Loading destinations"
      className="mx-auto min-h-[70vh] max-w-[1200px] px-6 pb-24 pt-32"
    >
      <div className="h-3 w-28 animate-pulse rounded-sm bg-[var(--tint-brand)]" />
      <div className="mt-5 h-12 max-w-xl animate-pulse rounded-sm bg-[var(--surface-sunken)]" />
      <div className="mt-8 flex gap-3">
        <div className="h-8 w-20 animate-pulse rounded-full bg-[var(--surface-sunken)]" />
        <div className="h-8 w-24 animate-pulse rounded-full bg-[var(--surface-sunken)]" />
        <div className="h-8 w-20 animate-pulse rounded-full bg-[var(--surface-sunken)]" />
      </div>
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={<DestinationsFallback />}>
      <DestinationsRoute />
    </Suspense>
  );
}
