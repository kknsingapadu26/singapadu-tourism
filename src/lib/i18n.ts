import { destinationSlugs } from "@/content/destination-slugs";
import { locales, type Locale } from "@/domain/tourism";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function switchLocalePath(pathname: string, targetLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return `/${targetLocale}`;

  const currentLocale = isLocale(segments[0]) ? segments[0] : "id";
  if (isLocale(segments[0])) segments[0] = targetLocale;
  else segments.unshift(targetLocale);

  if (segments[1] === "destinasi" && segments[2]) {
    const pair = Object.values(destinationSlugs).find(
      (slugs) => slugs[currentLocale] === segments[2],
    );

    if (pair) segments[2] = pair[targetLocale];
  }

  return `/${segments.join("/")}`;
}

export function absoluteUrl(pathname: string, baseUrl: string) {
  return new URL(pathname, baseUrl).toString();
}
