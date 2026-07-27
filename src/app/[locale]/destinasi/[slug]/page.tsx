import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DestinationCard } from "@/components/destination/destination-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { createWhatsAppUrl, siteConfig } from "@/content/site";
import { getDictionary } from "@/content/translations";
import { locales } from "@/domain/tourism";
import { isLocale } from "@/lib/i18n";
import { serializeJsonLd } from "@/lib/json-ld";
import {
  getCategory,
  getDestinationBySlug,
  getGoogleMapsUrl,
  getPublishedDestinations,
  getRelatedDestinations,
} from "@/repositories/tourism-repository";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedDestinations().map((destination) => ({
      locale,
      slug: destination.slug[locale],
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const destination = getDestinationBySlug(locale, slug);
  if (!destination) return {};

  const content = destination.content[locale];
  return {
    title: content.title,
    description: content.summary,
    alternates: {
      canonical: `/${locale}/destinasi/${destination.slug[locale]}`,
      languages: {
        id: `/id/destinasi/${destination.slug.id}`,
        en: `/en/destinasi/${destination.slug.en}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.summary,
      type: "website",
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const destination = getDestinationBySlug(locale, slug);
  if (!destination) notFound();

  const dictionary = getDictionary(locale);
  const content = destination.content[locale];
  const category = getCategory(destination.categoryIds[0]);
  const related = getRelatedDestinations(destination.id);
  const mapUrl = getGoogleMapsUrl(destination.mapQuery);
  const whatsappMessage =
    locale === "id"
      ? `Halo! Saya ingin bertanya tentang ${content.title} di Singapadu.`
      : `Hello! I would like to ask about ${content.title} in Singapadu.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: content.title,
    description: content.summary,
    url: `${siteConfig.url}/${locale}/destinasi/${destination.slug[locale]}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: destination.address.street,
      addressLocality: destination.address.village,
      addressRegion: "Gianyar, Bali",
      addressCountry: "ID",
    },
    isAccessibleForFree: destination.price.kind === "free",
  };

  return (
    <main id="main-content">
      <JsonLd
        id={`destination-jsonld-${destination.id}-${locale}`}
        value={serializeJsonLd(jsonLd)}
      />

      <article>
        <header className="detail-hero">
          <Photo
            asset={destination.heroImage}
            className="detail-hero__photo"
            locale={locale}
            priority
            sizes="100vw"
          />
          <span className="detail-hero__veil" />
          <div className="detail-hero__content shell">
            <Link className="detail-hero__back" href={`/${locale}/destinasi`}>
              <Icon name="back" size={18} />
              {dictionary.detail.back}
            </Link>
            <div className="detail-hero__title">
              <p className="eyebrow eyebrow--light">{category?.label[locale]}</p>
              <h1>{content.title}</h1>
              <p>
                <Icon name="pin" size={19} />
                {content.location}
              </p>
            </div>
          </div>
        </header>

        <section className="visit-panel-wrap shell">
          <div className="visit-panel">
            <div className="visit-panel__intro">
              <span className="eyebrow">{dictionary.detail.plan}</span>
              <p>{content.summary}</p>
            </div>
            <div className="visit-fact">
              <Icon name="clock" size={24} />
              <span>{dictionary.detail.hours}</span>
              <strong>{destination.openingHours.display[locale]}</strong>
            </div>
            <div className="visit-fact">
              <Icon name="ticket" size={24} />
              <span>{dictionary.detail.tickets}</span>
              <strong>{destination.price.display[locale]}</strong>
            </div>
            <div className="visit-fact">
              <Icon name="route" size={24} />
              <span>{dictionary.detail.distance}</span>
              <strong>{content.distanceLabel}</strong>
            </div>
            <a
              className="button button--accent visit-panel__action"
              href={createWhatsAppUrl(whatsappMessage)}
              rel="noreferrer"
              target="_blank"
            >
              {dictionary.detail.whatsapp}
              <Icon name="arrow" size={20} />
            </a>
          </div>
          <p className="verification-note">
            <Icon name="spark" size={16} />
            {dictionary.confirm} · {destination.openingHours.lastVerified}
          </p>
        </section>

        <section className="section section--paper detail-story">
          <div className="shell detail-story__grid">
            <div>
              <p className="eyebrow">{dictionary.detail.storyEyebrow}</p>
              <h2>{dictionary.detail.storyTitle}</h2>
            </div>
            <div className="prose prose--large">
              {content.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--ink detail-gallery-section">
          <div className="shell">
            <SectionHeading
              eyebrow={dictionary.detail.galleryEyebrow}
              inverse
              title={dictionary.detail.galleryTitle}
            />
            <div className="detail-gallery">
              {destination.gallery.map((image, index) => (
                <Photo
                  asset={image}
                  className={`detail-gallery__item detail-gallery__item--${index + 1}`}
                  key={image.alt.id}
                  locale={locale}
                  sizes={index === 0 ? "(max-width: 800px) 100vw, 60vw" : "(max-width: 800px) 100vw, 40vw"}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--sand">
          <div className="shell detail-tips">
            <SectionHeading
              eyebrow={dictionary.detail.tipsEyebrow}
              title={dictionary.detail.tipsTitle}
            />
            <ol className="detail-tips__list">
              {content.tips.map((tip, index) => (
                <li key={tip}>
                  <span>0{index + 1}</span>
                  <p>{tip}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="map-section">
          <div className="map-section__visual" aria-hidden="true">
            <span className="map-section__road map-section__road--one" />
            <span className="map-section__road map-section__road--two" />
            <span className="map-section__river" />
            <span className="map-section__pin"><Icon name="pin" size={26} /></span>
          </div>
          <div className="map-section__copy">
            <p className="eyebrow">{dictionary.detail.mapEyebrow}</p>
            <h2>{dictionary.detail.mapTitle}</h2>
            <p>{dictionary.detail.mapBody}</p>
            <a className="button button--dark" href={mapUrl} rel="noreferrer" target="_blank">
              {dictionary.detail.mapOpen}
              <Icon name="arrow" size={20} />
            </a>
          </div>
        </section>

        <section className="section section--paper">
          <div className="shell">
            <SectionHeading
              eyebrow={dictionary.detail.nearbyEyebrow}
              title={dictionary.detail.nearbyTitle}
            />
            <div className="destination-grid destination-grid--related">
              {related.map((item) => (
                <DestinationCard destination={item} key={item.id} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
