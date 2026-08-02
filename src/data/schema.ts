/** Languages currently available in the public UI and local content source. */
export const LANGUAGES = ['en', 'id'] as const;
export type Language = (typeof LANGUAGES)[number];

/** Canonical destination categories. Keep these values stable because URLs use them. */
export const DESTINATION_CATEGORIES = ['Culture', 'Nature', 'Craft', 'Family', 'Sacred'] as const;
export type DestinationCategory = (typeof DESTINATION_CATEGORIES)[number];

/** UI-only filter values. `All` is not stored on an individual destination. */
export const DESTINATION_FILTERS = ['All', ...DESTINATION_CATEGORIES] as const;
export type DestinationFilter = (typeof DESTINATION_FILTERS)[number];

/** Logical application destinations used by the legacy callback navigation API. */
export const APP_PAGES = ['home', 'destinations', 'detail', 'events', 'about'] as const;
export type AppPage = (typeof APP_PAGES)[number];

/** A value that must be supplied once for every supported language. */
export type Localized<T> = Record<Language, T>;

/** Visitor-facing destination copy. Every field in this object is localized. */
export interface DestinationContent {
  /** Short display name used by cards and detail-page headings. */
  title: string;
  /** Human-readable place or area, not a geocoding value. */
  location: string;
  /** One- or two-sentence card and introductory summary. */
  blurb: string;
  /** Display-ready opening schedule. */
  hours: string;
  /** Display-ready admission or activity price. */
  price: string;
  /** Display-ready distance from the village center. */
  distance: string;
  /** Detail-page narrative paragraphs in their intended order. */
  story: readonly string[];
  /** Visitor facilities and on-site amenities shown on the detail page. */
  facilities: readonly string[];
  /** Practical visit advice rendered as a list. */
  tips: readonly string[];
}

/**
 * A tourism destination with language-neutral identity/media and localized copy.
 *
 * `key` connects destinations to hero slides and in-app navigation. `slug` is the
 * public URL identifier. An external source should preserve both or normalize its
 * own IDs into this shape before exposing the data to components.
 */
export type Destination<TKey extends string = string> = {
  /** Stable internal identifier; do not derive it from translated copy. */
  key: TKey;
  /** Stable, unique, URL-safe identifier used at `/destinations/[slug]`. */
  slug: string;
  /** Whether verified visitor copy is available or the record is still name-only. */
  contentStatus: 'ready' | 'draft';
  /** One canonical category used for filtering and labels. */
  cat: DestinationCategory;
  /** Primary card image URL. Omit it to use the branded placeholder. */
  img?: string;
  /** Placeholder/accent treatment used when suitable photography is unavailable. */
  tone?: 'green' | 'amber' | 'sky' | 'navy';
  /** Optional accessible or editorial label associated with the image. */
  imgLabel?: string;
  /** Text query passed to the map provider; it is not visitor-facing copy. */
  mapQ: string;
  /** Detail gallery. An empty array means that photography has not been supplied. */
  gallery: readonly string[];
} & Localized<DestinationContent>;

/** Visitor-facing event copy. Every field in this object is localized. */
export interface EventContent {
  /** Short uppercase-style event label shown above the title. */
  tag: string;
  /** Display-ready date or date range. */
  date: string;
  /** Event name. */
  title: string;
  /** Concise event summary. */
  desc: string;
  /** Human-readable venue or area. */
  loc: string;
}

/** An event with language-neutral identity/category and localized display copy. */
export type EventItem<TKey extends string = string> = {
  /** Stable internal identifier suitable for future API/CMS reconciliation. */
  key: TKey;
  /** Category reused from destinations for consistent visual labeling. */
  cat: DestinationCategory;
} & Localized<EventContent>;

/** A homepage hero entry that references a destination instead of duplicating it. */
export interface HeroSlide<TDestinationKey extends string = string> {
  /** Foreign key matching `Destination.key`. */
  key: TDestinationKey;
  /** Hero-supported category; sacred content is intentionally excluded here. */
  cat: Exclude<DestinationCategory, 'Sacred'>;
  /** Wide image URL optimized for the full-bleed hero treatment. */
  img?: string;
  /** Branded placeholder treatment used while the image is unavailable. */
  tone?: 'green' | 'amber' | 'sky' | 'navy';
}

/** Site-wide contact details, stored separately from translated page content. */
export interface ContactInfo {
  /** Digits-only WhatsApp number including the country code. */
  whatsappNumber: string;
  email: string;
  address: string;
}

/** Optional arguments accepted when resolving a logical page to a URL. */
export interface NavigationOptionsFor<TDestinationKey extends string = string> {
  /** Destination key required by the detail page. */
  destKey?: TDestinationKey;
  /** Optional initial category used by the destinations index. */
  cat?: DestinationFilter;
}

export type NavigateTo<TDestinationKey extends string = string> = (
  page: AppPage,
  options?: NavigationOptionsFor<TDestinationKey>,
) => void;

/**
 * Contract implemented by any local, API, or CMS-backed tourism content adapter.
 * Components consume this normalized shape and remain independent of its origin.
 */
export interface TourismContentSource<
  TDestination extends Destination = Destination,
  TEvent extends EventItem = EventItem,
  THeroSlide extends HeroSlide = HeroSlide,
  TTranslations extends Localized<unknown> = Localized<unknown>,
> {
  destinations: readonly TDestination[];
  events: readonly TEvent[];
  heroSlides: readonly THeroSlide[];
  translations: TTranslations;
  contact: ContactInfo;
}
