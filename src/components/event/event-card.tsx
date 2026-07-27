import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { Photo } from "@/components/ui/photo";
import type { Locale, TourismEvent } from "@/domain/tourism";
import { getDestinationById, getDestinationHref } from "@/repositories/tourism-repository";

type EventCardProps = {
  event: TourismEvent;
  locale: Locale;
  compact?: boolean;
};

export function EventCard({ event, locale, compact = false }: EventCardProps) {
  const destination = event.destinationId
    ? getDestinationById(event.destinationId)
    : undefined;

  const card = (
    <article className={`event-card${compact ? " event-card--compact" : ""}`}>
      {!compact ? (
        <Photo
          asset={event.image}
          className="event-card__photo"
          locale={locale}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : null}
      <div className="event-card__content">
        <p className="event-card__date">{event.schedule.display[locale]}</p>
        <h3>{event.title[locale]}</h3>
        <p>{event.description[locale]}</p>
        <p className="event-card__venue">
          <Icon name="pin" size={17} />
          {event.venueName[locale]}
        </p>
      </div>
    </article>
  );

  return destination ? (
    <Link className="event-card-link" href={getDestinationHref(destination, locale)}>
      {card}
    </Link>
  ) : (
    card
  );
}
