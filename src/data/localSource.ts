import type { TourismContentSource } from './schema';
import {
  CONTACT_INFO,
  DESTS,
  EVENTS,
  HERO_SLIDES,
  TRANSLATIONS,
} from './singapaduData';

export const LOCAL_TOURISM_SOURCE = {
  destinations: DESTS,
  events: EVENTS,
  heroSlides: HERO_SLIDES,
  translations: TRANSLATIONS,
  contact: CONTACT_INFO,
} as const satisfies TourismContentSource<
  (typeof DESTS)[number],
  (typeof EVENTS)[number],
  (typeof HERO_SLIDES)[number],
  typeof TRANSLATIONS
>;
