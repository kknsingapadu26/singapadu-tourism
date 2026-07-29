export const LANGUAGES = ['en', 'id'] as const;
export type Language = (typeof LANGUAGES)[number];

export const DESTINATION_CATEGORIES = ['Culture', 'Nature', 'Craft', 'Family', 'Sacred'] as const;
export type DestinationCategory = (typeof DESTINATION_CATEGORIES)[number];

export const DESTINATION_FILTERS = ['All', ...DESTINATION_CATEGORIES] as const;
export type DestinationFilter = (typeof DESTINATION_FILTERS)[number];

export const APP_PAGES = ['home', 'destinations', 'detail', 'events', 'about'] as const;
export type AppPage = (typeof APP_PAGES)[number];

export type Localized<T> = Record<Language, T>;

export interface DestinationContent {
  title: string;
  location: string;
  blurb: string;
  hours: string;
  price: string;
  distance: string;
  story: readonly string[];
  tips: readonly string[];
}

export type Destination<TKey extends string = string> = {
  key: TKey;
  cat: DestinationCategory;
  img?: string;
  tone?: 'green' | 'amber' | 'sky' | 'navy';
  imgLabel?: string;
  mapQ: string;
  gallery: readonly [string, string, string, string, ...string[]];
} & Localized<DestinationContent>;

export interface EventContent {
  tag: string;
  date: string;
  title: string;
  desc: string;
  loc: string;
}

export type EventItem<TKey extends string = string> = {
  key: TKey;
  cat: DestinationCategory;
} & Localized<EventContent>;

export interface HeroSlide<TDestinationKey extends string = string> {
  key: TDestinationKey;
  cat: Exclude<DestinationCategory, 'Sacred'>;
  img: string;
}

export interface ContactInfo {
  whatsappNumber: string;
  email: string;
  address: string;
}

export interface NavigationOptionsFor<TDestinationKey extends string = string> {
  destKey?: TDestinationKey;
  cat?: DestinationFilter;
}

export type NavigateTo<TDestinationKey extends string = string> = (
  page: AppPage,
  options?: NavigationOptionsFor<TDestinationKey>,
) => void;

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
