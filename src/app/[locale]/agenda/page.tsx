import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventCard } from "@/components/event/event-card";
import { Icon } from "@/components/ui/icon";
import { createWhatsAppUrl } from "@/content/site";
import { getDictionary } from "@/content/translations";
import { isLocale } from "@/lib/i18n";
import { getPublishedEvents } from "@/repositories/tourism-repository";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.nav.events,
    description: dictionary.events.body,
    alternates: {
      canonical: `/${locale}/agenda`,
      languages: { id: "/id/agenda", en: "/en/agenda" },
    },
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);
  const events = getPublishedEvents();
  const message =
    locale === "id"
      ? "Halo! Saya ingin memastikan jadwal acara di Singapadu."
      : "Hello! I would like to confirm an event schedule in Singapadu.";

  return (
    <main id="main-content">
      <header className="page-hero page-hero--events">
        <div className="page-hero__pattern" aria-hidden="true" />
        <div className="shell page-hero__content">
          <p className="eyebrow eyebrow--light">{dictionary.events.eyebrow}</p>
          <h1>{dictionary.events.title}</h1>
          <p>{dictionary.events.body}</p>
        </div>
      </header>

      <section className="section section--paper events-page">
        <div className="shell">
          <aside className="calendar-note">
            <Icon name="spark" size={24} />
            <p>{dictionary.events.note}</p>
            <a href={createWhatsAppUrl(message)} rel="noreferrer" target="_blank">
              WhatsApp <Icon name="arrow" size={18} />
            </a>
          </aside>
          <div className="events-grid">
            {events.map((event) => (
              <EventCard event={event} key={event.id} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
