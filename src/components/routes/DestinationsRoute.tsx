'use client';

import { useSearchParams } from 'next/navigation';
import { DestinationsList } from '@/components/destinations/DestinationsList';
import { useSite } from '@/components/layout/SiteShell';
import {
  DESTINATION_FILTERS,
  type DestinationFilter,
} from '@/data';

function destinationFilter(value: string | null): DestinationFilter {
  return DESTINATION_FILTERS.find((filter) => filter === value) ?? 'All';
}

export function DestinationsRoute() {
  const { lang, navigate } = useSite();
  const searchParams = useSearchParams();
  const initialCat = destinationFilter(searchParams.get('category'));

  const handleFilterChange = (category: DestinationFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    const query = params.toString();
    window.history.pushState(null, '', query ? `/destinations?${query}` : '/destinations');
  };

  return (
    <div className="animate-sgp-route">
      <DestinationsList
        lang={lang}
        initialCat={initialCat}
        onFilterChange={handleFilterChange}
        onNavigate={navigate}
      />
    </div>
  );
}
