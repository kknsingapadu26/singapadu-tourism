import { LOCAL_TOURISM_SOURCE } from './localSource';
import type { DestinationKey } from './singapaduData';
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
  EventContent,
  EventItem,
  HeroSlide,
  Language,
  Localized,
  NavigateTo,
  NavigationOptionsFor,
  TourismContentSource,
} from './schema';
export type { DestinationKey, DestinationRecord } from './singapaduData';
export { LOCAL_TOURISM_SOURCE } from './localSource';

export type NavigationOptions = NavigationOptionsFor<DestinationKey>;
export type Navigate = NavigateTo<DestinationKey>;

export const TOURISM_CONTENT = LOCAL_TOURISM_SOURCE;
export const DESTS = TOURISM_CONTENT.destinations;
export const EVENTS = TOURISM_CONTENT.events;
export const HERO_SLIDES = TOURISM_CONTENT.heroSlides;
export const TRANSLATIONS = TOURISM_CONTENT.translations;
export const CONTACT_INFO = TOURISM_CONTENT.contact;
