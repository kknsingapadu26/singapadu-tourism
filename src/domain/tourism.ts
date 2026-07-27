export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export type LocalizedText = Record<Locale, string>;

export const categoryIds = [
  "culture",
  "nature",
  "craft",
  "family",
  "sacred",
] as const;
export type CategoryId = (typeof categoryIds)[number];

export type ContentStatus = "draft" | "published" | "archived";
export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export type VisualTone = "temple" | "forest" | "river" | "sunrise" | "stone" | "gold";

export interface ImageAsset {
  src?: string;
  alt: LocalizedText;
  width: number;
  height: number;
  tone: VisualTone;
  credit?: string;
  license?: string;
}

export interface SourceReference {
  label: string;
  url?: string;
  checkedAt: string;
}

export interface Address {
  street?: string;
  banjar?: string;
  village: "Singapadu" | "Singapadu Kaler";
  district: "Sukawati";
  regency: "Gianyar";
  province: "Bali";
}

export interface OpeningPeriod {
  days: readonly Weekday[];
  opens: string;
  closes: string;
}

export interface OpeningHours {
  timezone: "Asia/Makassar";
  periods: OpeningPeriod[];
  display: LocalizedText;
  lastVerified: string;
}

export type Price =
  | { kind: "free"; display: LocalizedText }
  | { kind: "contact"; display: LocalizedText }
  | {
      kind: "fixed" | "from";
      currency: "IDR";
      amount: number;
      unit: "person" | "session";
      display: LocalizedText;
    };

export interface DestinationContent {
  title: string;
  location: string;
  summary: string;
  story: string[];
  tips: string[];
  distanceLabel: string;
}

export interface Destination {
  id: string;
  slug: Record<Locale, string>;
  status: ContentStatus;
  categoryIds: CategoryId[];
  featured: boolean;
  content: Record<Locale, DestinationContent>;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  address: Address;
  mapQuery: string;
  distanceFromVillageCenterKm: number;
  openingHours: OpeningHours;
  price: Price;
  sources: SourceReference[];
  updatedAt: string;
}

export type EventSchedule =
  | {
      kind: "fixed";
      start: string;
      end?: string;
      display: LocalizedText;
    }
  | {
      kind: "weekly";
      days: readonly Weekday[];
      startTime: string;
      endTime?: string;
      display: LocalizedText;
    }
  | {
      kind: "balinese-calendar";
      display: LocalizedText;
      occurrences: string[];
    };

export interface TourismEvent {
  id: string;
  status: ContentStatus;
  categoryIds: CategoryId[];
  title: LocalizedText;
  description: LocalizedText;
  venueName: LocalizedText;
  destinationId?: string;
  schedule: EventSchedule;
  image: ImageAsset;
  sources: SourceReference[];
  updatedAt: string;
}

export interface Category {
  id: CategoryId;
  label: LocalizedText;
  description: LocalizedText;
  icon: string;
  order: number;
}
