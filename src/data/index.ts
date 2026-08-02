import { LOCAL_TOURISM_SOURCE } from './localSource';
import type { DestinationKey } from './destinations';
import type { NavigateTo, NavigationOptionsFor } from './schema';

export {
  APP_PAGES,
  DESTINATION_CATEGORIES,
  DESTINATION_FILTERS,
  LANGUAGES,
} from './schema';
export type {
  AppPage,
  ContactInfo,
  Destination,
  DestinationCategory,
  DestinationContent,
  DestinationFilter,
  HeroSlide,
  Language,
  Localized,
  NavigateTo,
  NavigationOptionsFor,
  TourismContentSource,
} from './schema';
export type { DestinationKey, DestinationRecord } from './destinations';
export { LOCAL_TOURISM_SOURCE } from './localSource';

export type NavigationOptions = NavigationOptionsFor<DestinationKey>;
export type Navigate = NavigateTo<DestinationKey>;

/** Public data boundary consumed by the application UI. */
export const TOURISM_CONTENT = LOCAL_TOURISM_SOURCE;

// Compatibility selectors keep existing imports small. New source adapters should
// be wired through TOURISM_CONTENT rather than imported directly by components.
export const DESTS = TOURISM_CONTENT.destinations;
export const HERO_SLIDES = TOURISM_CONTENT.heroSlides;
export const TRANSLATIONS = TOURISM_CONTENT.translations;
export const CONTACT_INFO = TOURISM_CONTENT.contact;
