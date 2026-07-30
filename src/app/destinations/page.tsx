import type { Metadata } from 'next';
import { DestinationsRoute } from '@/components/routes/DestinationsRoute';
import {
  DESTINATION_FILTERS,
  type DestinationFilter,
} from '@/data';

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Explore culture, nature, craft, family and sacred places across Singapadu Village, Gianyar, Bali.',
  alternates: { canonical: '/destinations' },
};

function destinationFilter(value: string | string[] | undefined): DestinationFilter {
  const candidate = Array.isArray(value) ? value[0] : value;
  return DESTINATION_FILTERS.find((filter) => filter === candidate) ?? 'All';
}

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  return <DestinationsRoute initialCat={destinationFilter(category)} />;
}
