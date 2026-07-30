import {
  type AppPage,
  type NavigationOptions,
  DESTS,
} from '@/data';

export function getNavigationHref(
  page: AppPage,
  options?: NavigationOptions,
): string {
  if (page === 'home') return '/';
  if (page === 'events') return '/events';
  if (page === 'about') return '/about';

  if (page === 'detail') {
    const destination = DESTS.find((item) => item.key === options?.destKey);
    return destination ? `/destinations/${destination.slug}` : '/destinations';
  }

  if (!options?.cat || options.cat === 'All') return '/destinations';

  return `/destinations?category=${encodeURIComponent(options.cat)}`;
}
