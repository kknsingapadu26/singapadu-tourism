import Link from "next/link";

import { getCategory, getDestinationHref } from "@/repositories/tourism-repository";
import type { Destination, Locale } from "@/domain/tourism";
import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";

type DestinationCardProps = {
  destination: Destination;
  locale: Locale;
  featured?: boolean;
};

export function DestinationCard({
  destination,
  locale,
  featured = false,
}: DestinationCardProps) {
  const content = destination.content[locale];
  const category = getCategory(destination.categoryIds[0]);

  return (
    <article className={`destination-card${featured ? " destination-card--featured" : ""}`}>
      <Link
        aria-label={`${content.title} — ${locale === "id" ? "buka detail" : "open details"}`}
        className="destination-card__link"
        href={getDestinationHref(destination, locale)}
      >
        <Photo
          asset={destination.heroImage}
          className="destination-card__photo"
          locale={locale}
          sizes={featured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <span className="destination-card__veil" />
        <div className="destination-card__topline">
          <span className="destination-card__category">
            {category?.label[locale]}
          </span>
          <span className="destination-card__distance">{content.distanceLabel}</span>
        </div>
        <div className="destination-card__content">
          <p className="destination-card__location">
            <Icon name="pin" size={16} />
            {content.location}
          </p>
          <h3>{content.title}</h3>
          <p className="destination-card__summary">{content.summary}</p>
          <span className="destination-card__arrow">
            <Icon name="arrow" size={21} />
          </span>
        </div>
      </Link>
    </article>
  );
}
