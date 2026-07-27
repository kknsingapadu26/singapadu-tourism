import Link from "next/link";

import { DestinationCard } from "@/components/destination/destination-card";
import { EventCard } from "@/components/event/event-card";
import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories } from "@/content/categories";
import { createWhatsAppUrl } from "@/content/site";
import { getDictionary } from "@/content/translations";
import type { Locale } from "@/domain/tourism";
import {
  getDestinationHref,
  getFeaturedDestinations,
  getPublishedEvents,
} from "@/repositories/tourism-repository";

export function HomePage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const featured = getFeaturedDestinations(4);
  const events = getPublishedEvents().slice(0, 3);
  const hero = featured[0];
  const heroContent = hero.content[locale];
  const whatsappMessage =
    locale === "id"
      ? "Halo! Saya ingin merencanakan kunjungan ke Singapadu."
      : "Hello! I would like to plan a visit to Singapadu.";

  return (
    <main id="main-content">
      <section className="home-hero">
        <Photo
          asset={hero.heroImage}
          className="home-hero__photo"
          locale={locale}
          priority
          sizes="100vw"
        />
        <div className="home-hero__shade" />
        <div className="home-hero__content shell">
          <p className="eyebrow eyebrow--light">{dictionary.home.eyebrow}</p>
          <h1>{dictionary.home.title}</h1>
          <p className="home-hero__intro">{dictionary.home.intro}</p>
          <div className="button-row">
            <Link className="button button--accent" href={`/${locale}/destinasi`}>
              {dictionary.home.heroCta}
              <Icon name="arrow" size={20} />
            </Link>
            <Link className="button button--glass" href={`/${locale}/tentang`}>
              {dictionary.home.heroSecondary}
            </Link>
          </div>
        </div>
        <Link
          className="home-hero__feature"
          href={getDestinationHref(hero, locale)}
        >
          <span>01</span>
          <div>
            <small>{heroContent.location}</small>
            <strong>{heroContent.title}</strong>
          </div>
          <Icon name="arrow" size={22} />
        </Link>
        <div className="home-hero__index" aria-hidden="true">
          <span className="is-active" />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <SectionHeading
            action={
              <Link className="text-link" href={`/${locale}/destinasi`}>
                {dictionary.home.allDestinations}
                <Icon name="arrow" size={20} />
              </Link>
            }
            body={dictionary.home.destinationsBody}
            eyebrow={dictionary.home.destinationsEyebrow}
            title={dictionary.home.destinationsTitle}
          />
          <div className="destination-grid destination-grid--home">
            {featured.slice(0, 3).map((destination, index) => (
              <DestinationCard
                destination={destination}
                featured={index === 0}
                key={destination.id}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--green">
        <div className="shell">
          <SectionHeading
            eyebrow={dictionary.home.experiencesEyebrow}
            inverse
            title={dictionary.home.experiencesTitle}
          />
          <div className="experience-grid">
            {dictionary.experiences.map((experience, index) => {
              const experienceCategoryIds = ["nature", "craft", "family", "sacred"] as const;
              const category = categories.find(
                ({ id }) => id === experienceCategoryIds[index],
              );
              return (
                <Link
                  className="experience-card"
                  href={`/${locale}/destinasi`}
                  key={experience.title}
                >
                  <span className="experience-card__number">0{index + 1}</span>
                  <Icon name={experience.icon} size={32} />
                  <h3>{experience.title}</h3>
                  <p>{experience.body}</p>
                  <span className="experience-card__meta">
                    {category?.label[locale]}
                    <Icon name="arrow" size={18} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="editorial-feature">
        <div className="editorial-feature__photo-wrap">
          <Photo
            asset={featured[2].heroImage}
            className="editorial-feature__photo"
            locale={locale}
            sizes="(max-width: 850px) 100vw, 58vw"
          />
          <span className="editorial-feature__stamp">
            <Icon name="chisel" size={32} />
            Singapadu
          </span>
        </div>
        <div className="editorial-feature__copy">
          <p className="eyebrow">{dictionary.home.craftEyebrow}</p>
          <h2>{dictionary.home.craftTitle}</h2>
          <p>{dictionary.home.craftBody}</p>
          <Link
            className="button button--dark"
            href={getDestinationHref(featured[2], locale)}
          >
            {dictionary.home.craftCta}
            <Icon name="arrow" size={20} />
          </Link>
        </div>
      </section>

      <section className="section section--sand">
        <div className="shell">
          <SectionHeading
            action={
              <Link className="text-link" href={`/${locale}/agenda`}>
                {dictionary.home.allEvents}
                <Icon name="arrow" size={20} />
              </Link>
            }
            eyebrow={dictionary.home.eventsEyebrow}
            title={dictionary.home.eventsTitle}
          />
          <div className="event-row">
            {events.map((event) => (
              <EventCard compact event={event} key={event.id} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell">
          <SectionHeading
            eyebrow={dictionary.home.tipsEyebrow}
            title={dictionary.home.tipsTitle}
          />
          <div className="tips-grid">
            {dictionary.tips.map((tip, index) => (
              <article className="tip-card" key={tip.title}>
                <div className="tip-card__icon">
                  <Icon name={tip.icon} size={25} />
                </div>
                <span>0{index + 1}</span>
                <h3>{tip.title}</h3>
                <p>{tip.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="visit-cta">
        <div className="visit-cta__pattern" aria-hidden="true" />
        <div className="visit-cta__content shell">
          <p className="eyebrow eyebrow--light">{dictionary.home.ctaEyebrow}</p>
          <h2>{dictionary.home.ctaTitle}</h2>
          <p>{dictionary.home.ctaBody}</p>
          <a
            className="button button--accent"
            href={createWhatsAppUrl(whatsappMessage)}
            rel="noreferrer"
            target="_blank"
          >
            {dictionary.home.whatsapp}
            <Icon name="arrow" size={20} />
          </a>
        </div>
      </section>
    </main>
  );
}
