import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DestinationFilter } from "@/components/destination/destination-filter";
import { categories } from "@/content/categories";
import { getDictionary } from "@/content/translations";
import { isLocale } from "@/lib/i18n";
import { getPublishedDestinations } from "@/repositories/tourism-repository";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.nav.destinations,
    description: dictionary.destinations.body,
    alternates: {
      canonical: `/${locale}/destinasi`,
      languages: { id: "/id/destinasi", en: "/en/destinasi" },
    },
  };
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    <main id="main-content">
      <header className="page-hero page-hero--destinations">
        <div className="page-hero__pattern" aria-hidden="true" />
        <div className="shell page-hero__content">
          <p className="eyebrow eyebrow--light">{dictionary.destinations.eyebrow}</p>
          <h1>{dictionary.destinations.title}</h1>
          <p>{dictionary.destinations.body}</p>
        </div>
      </header>
      <section className="section section--paper">
        <div className="shell">
          <DestinationFilter
            allLabel={dictionary.all}
            categories={categories}
            destinations={getPublishedDestinations()}
            emptyLabel={dictionary.destinations.empty}
            filterLabel={dictionary.destinations.filterLabel}
            locale={locale}
          />
        </div>
      </section>
    </main>
  );
}
