import type { TourismContentSource } from './schema';
import { DESTS, HERO_SLIDES } from './destinations';
import {
  CONTACT_INFO,
  TRANSLATIONS,
} from './singapaduData';

/**
 * Local development adapter for the normalized tourism-content contract.
 * A future API/CMS adapter can replace this export without changing consumers in
 * the component layer, provided it returns the same `TourismContentSource` shape.
 */
export const LOCAL_TOURISM_SOURCE = {
  destinations: DESTS,
  heroSlides: HERO_SLIDES,
  translations: TRANSLATIONS,
  contact: CONTACT_INFO,
} as const satisfies TourismContentSource<
  (typeof DESTS)[number],
  (typeof HERO_SLIDES)[number],
  typeof TRANSLATIONS
>;
