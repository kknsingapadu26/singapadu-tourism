'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from './Badge';
import { Icon } from './Icon';
import { ImagePlaceholder } from './ImagePlaceholder';

interface DestinationCardProps {
  title: string;
  category: string;
  location: string;
  blurb: string;
  img?: string;
  imgLabel?: string;
  tone?: 'green' | 'amber' | 'sky' | 'navy';
  price?: string;
  hours?: string;
  eager?: boolean;
  onClick: () => void;
  lang?: 'en' | 'id';
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  title,
  category,
  location,
  blurb,
  img,
  imgLabel,
  tone,
  price,
  hours,
  eager = false,
  onClick,
  lang = 'en'
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col h-full bg-[var(--surface-card)] border border-[var(--border)] rounded-sm overflow-hidden shadow-[var(--shadow-card)] transition-shadow duration-[var(--dur-med)] ease-[var(--ease-out)] cursor-pointer"
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] bg-[var(--surface-sunken)] overflow-hidden">
        {img ? (
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            loading={eager ? 'eager' : 'lazy'}
            className="object-cover transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] group-hover:scale-103"
          />
        ) : (
          <ImagePlaceholder label={imgLabel || title} tone={tone} />
        )}
        <div className="absolute top-3 left-3 z-10">
          <Badge category={category}>{category}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium mb-1.5">
          <Icon name="map-pin" className="w-3.5 h-3.5 text-[var(--brand-primary)] flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors duration-[var(--dur-fast)] line-clamp-1 mb-2">
          {title}
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4 flex-1">
          {blurb}
        </p>

        {/* Footer info & CTA */}
        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between mt-auto">
          {price ? (
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              {price}
            </span>
          ) : (
            <span className="text-xs text-[var(--text-secondary)]">{hours}</span>
          )}

          <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-primary)] group-hover:translate-x-1 transition-transform duration-[var(--dur-fast)]">
            {lang === 'id' ? 'Lihat' : 'Explore'}
            <Icon name="arrow-right" className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
