import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";
import { locales } from "@/domain/tourism";
import { getPublishedDestinations } from "@/repositories/tourism-repository";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = locales.flatMap((locale) => [
    `/${locale}`,
    `/${locale}/destinasi`,
    `/${locale}/agenda`,
    `/${locale}/tentang`,
  ]);
  const destinationPaths = locales.flatMap((locale) =>
    getPublishedDestinations().map(
      (destination) => `/${locale}/destinasi/${destination.slug[locale]}`,
    ),
  );

  return ["/", ...staticPaths, ...destinationPaths].map((pathname) => ({
    url: new URL(pathname, siteConfig.url).toString(),
    lastModified: new Date("2026-07-27"),
    changeFrequency: pathname.includes("agenda") ? "weekly" : "monthly",
    priority: pathname === "/" ? 1 : pathname.split("/").length <= 3 ? 0.8 : 0.7,
  }));
}
