"use client";

import { useMemo, useState } from "react";

import { DestinationCard } from "@/components/destination/destination-card";
import type { Category, CategoryId, Destination, Locale } from "@/domain/tourism";

type DestinationFilterProps = {
  destinations: Destination[];
  categories: Category[];
  locale: Locale;
  allLabel: string;
  filterLabel: string;
  emptyLabel: string;
};

export function DestinationFilter({
  destinations,
  categories,
  locale,
  allLabel,
  filterLabel,
  emptyLabel,
}: DestinationFilterProps) {
  const [active, setActive] = useState<"all" | CategoryId>("all");
  const visible = useMemo(
    () =>
      active === "all"
        ? destinations
        : destinations.filter((destination) =>
            destination.categoryIds.includes(active),
          ),
    [active, destinations],
  );

  return (
    <div className="destination-filter">
      <div aria-label={filterLabel} className="filter-pills" role="group">
        <button
          aria-pressed={active === "all"}
          className="filter-pill"
          onClick={() => setActive("all")}
          type="button"
        >
          {allLabel}
          <span>{destinations.length}</span>
        </button>
        {categories.map((category) => {
          const count = destinations.filter((destination) =>
            destination.categoryIds.includes(category.id),
          ).length;

          return (
            <button
              aria-pressed={active === category.id}
              className="filter-pill"
              key={category.id}
              onClick={() => setActive(category.id)}
              type="button"
            >
              {category.label[locale]}
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="destination-grid destination-grid--listing">
          {visible.map((destination) => (
            <DestinationCard
              destination={destination}
              key={destination.id}
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">{emptyLabel}</p>
      )}
    </div>
  );
}
