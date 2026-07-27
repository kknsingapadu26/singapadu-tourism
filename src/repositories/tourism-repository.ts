import { categories } from "@/content/categories";
import { destinations } from "@/content/destinations";
import { events } from "@/content/events";
import type {
  CategoryId,
  Destination,
  Locale,
  TourismEvent,
} from "@/domain/tourism";

function assertUnique(values: string[], label: string) {
  const seen = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) throw new Error(`Duplicate ${label}: ${value}`);
    seen.add(value);
  }
}

function validateContent() {
  assertUnique(destinations.map((destination) => destination.id), "destination id");
  assertUnique(events.map((event) => event.id), "event id");

  for (const locale of ["id", "en"] as const) {
    assertUnique(
      destinations.map((destination) => destination.slug[locale]),
      `${locale} destination slug`,
    );
  }

  const destinationIds = new Set(destinations.map((destination) => destination.id));
  const categoryIdSet = new Set(categories.map((category) => category.id));
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  for (const destination of destinations) {
    for (const locale of ["id", "en"] as const) {
      if (!slugPattern.test(destination.slug[locale])) {
        throw new Error(`Invalid ${locale} slug for ${destination.id}`);
      }

      const content = destination.content[locale];
      if (!content.title.trim() || !content.summary.trim()) {
        throw new Error(`Missing ${locale} content for ${destination.id}`);
      }
    }

    for (const categoryId of destination.categoryIds) {
      if (!categoryIdSet.has(categoryId)) {
        throw new Error(`Unknown category ${categoryId} on ${destination.id}`);
      }
    }
  }

  for (const event of events) {
    if (event.destinationId && !destinationIds.has(event.destinationId)) {
      throw new Error(`Unknown destination ${event.destinationId} on event ${event.id}`);
    }
  }
}

validateContent();

export function getPublishedDestinations(): Destination[] {
  return destinations.filter((destination) => destination.status === "published");
}

export function getFeaturedDestinations(limit?: number): Destination[] {
  const featured = getPublishedDestinations().filter(
    (destination) => destination.featured,
  );
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getDestinationBySlug(locale: Locale, slug: string) {
  return getPublishedDestinations().find(
    (destination) => destination.slug[locale] === slug,
  );
}

export function getDestinationById(id: string) {
  return getPublishedDestinations().find((destination) => destination.id === id);
}

export function getDestinationsByCategory(categoryId: CategoryId) {
  return getPublishedDestinations().filter((destination) =>
    destination.categoryIds.includes(categoryId),
  );
}

export function getRelatedDestinations(destinationId: string, limit = 3) {
  const current = getDestinationById(destinationId);
  if (!current) return [];

  return getPublishedDestinations()
    .filter((destination) => destination.id !== destinationId)
    .sort((a, b) => {
      const aScore = a.categoryIds.filter((category) =>
        current.categoryIds.includes(category),
      ).length;
      const bScore = b.categoryIds.filter((category) =>
        current.categoryIds.includes(category),
      ).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function getPublishedEvents(): TourismEvent[] {
  return events.filter((event) => event.status === "published");
}

export function getCategory(categoryId: CategoryId) {
  return categories.find((category) => category.id === categoryId);
}

export function getDestinationHref(destination: Destination, locale: Locale) {
  return `/${locale}/destinasi/${destination.slug[locale]}`;
}

export function getGoogleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
