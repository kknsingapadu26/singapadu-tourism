'use client';

import React from 'react';
import { type DestinationKey, type Language, type Navigate, TRANSLATIONS, DESTS, CONTACT_INFO } from '@/data';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SectionHeader } from '../ui/SectionHeader';
import { DestinationCard } from '../ui/DestinationCard';
import { Icon } from '../ui/Icon';

interface DestinationDetailProps {
  lang: Language;
  destKey: DestinationKey;
  onNavigate: Navigate;
}

export const DestinationDetail: React.FC<DestinationDetailProps> = ({
  lang,
  destKey,
  onNavigate
}) => {
  const t = TRANSLATIONS[lang];
  const dest = DESTS.find((d) => d.key === destKey) || DESTS[0];
  const loc = dest[lang];

  const waMsg = t.waMsg.replace('{x}', loc.title);
  const waLink = `https://wa.me/${CONTACT_INFO.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(waMsg)}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(dest.mapQ)}&z=15&hl=${lang}&output=embed`;
  const mapDirectUrl = `https://www.google.com/maps?q=${encodeURIComponent(dest.mapQ)}`;

  const related = DESTS.filter((d) => d.key !== dest.key).slice(0, 4);

  // Gallery image fallback helper
  const galleryImgs = dest.gallery && dest.gallery.length >= 4 ? dest.gallery : [
    dest.img || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?auto=format&fit=crop&q=80&w=1600"
  ];

  return (
    <article className="pt-32 pb-24 max-w-[1200px] mx-auto px-6">
      {/* Top Navigation Bar for Detail Page */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap border-b border-[var(--border)] pb-4">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('destinations')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[var(--surface-card)] border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all cursor-pointer shadow-xs"
        >
          <Icon name="arrow-left" className="w-4 h-4" />
          <span>{lang === 'id' ? 'Kembali ke Destinasi' : 'Back to Destinations'}</span>
        </button>

        {/* Home Navigation & Breadcrumbs */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 font-bold text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors cursor-pointer"
          >
            <Icon name="home" className="w-3.5 h-3.5" />
            <span>{t.nav.home}</span>
          </button>
          <span className="text-[var(--text-secondary)] opacity-50">/</span>
          <Breadcrumb
            items={[
              { label: t.nav.destinations, onClick: () => onNavigate('destinations') },
              { label: loc.title }
            ]}
          />
        </div>
      </div>

      {/* Main Wide Cover Image Banner */}
      <div className="rounded-sm overflow-hidden mb-8 border border-[var(--border)] shadow-sm bg-[var(--surface-sunken)]">
        <div className="w-full aspect-[21/9] min-h-[220px] max-h-[460px]">
          <img
            src={dest.img || "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?auto=format&fit=crop&q=80&w=2000"}
            alt={loc.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Main 2-Column Content Layout (1.6fr : 1fr) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Category, Title, Blurb & Story */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Badge category={dest.cat}>{(t.cats as Record<string, string>)[dest.cat]}</Badge>
            <Badge tone="neutral">Singapadu</Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] leading-[1.02] tracking-[-0.02em]">
            {loc.title}
          </h1>

          <p className="text-lg text-[var(--text-primary)] font-medium max-w-[640px] leading-relaxed">
            {loc.blurb}
          </p>

          <div className="flex flex-col gap-4 text-base text-[var(--text-secondary)] leading-relaxed max-w-[640px]">
            {loc.story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Sidebar Box */}
        <aside className="lg:col-span-5 lg:sticky lg:top-32 bg-[var(--surface-card)] border border-[var(--border)] rounded-sm p-6 shadow-[var(--shadow-card)] flex flex-col gap-5">
          <h4 className="text-lg font-bold text-[var(--text-primary)] m-0">
            {t.detail.plan}
          </h4>

          {/* Visit Meta Info */}
          <div className="flex items-start gap-3">
            <Icon name="clock" className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                {t.detail.hours}
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {loc.hours}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Icon name="ticket" className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                {t.detail.tickets}
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {loc.price}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Icon name="map-pin" className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                {t.detail.getting}
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {loc.distance}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button
                variant="primary"
                fullWidth
                icon={<Icon name="message-circle" className="w-4 h-4" />}
              >
                {t.detail.waBtn}
              </Button>
            </a>

            <Button
              variant="outline"
              fullWidth
              icon={<Icon name="map" className="w-4 h-4" />}
              onClick={() => onNavigate('destinations')}
            >
              {t.detail.allBtn}
            </Button>
          </div>
        </aside>
      </div>

      {/* Gallery Section */}
      <div className="mt-20">
        <SectionHeader
          eyebrow={t.detail.galleryEyebrow}
          title={t.detail.galleryTitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 auto-rows-[190px] gap-3">
          {/* Mosaic Item 1: 2x2 Span */}
          <div className="sm:col-span-2 sm:row-span-2 relative overflow-hidden rounded-sm bg-[var(--surface-sunken)] group">
            <img
              src={galleryImgs[0]}
              alt={`${loc.title} gallery 1`}
              className="w-full h-full object-cover transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] group-hover:scale-103"
            />
          </div>

          {/* Mosaic Item 2 */}
          <div className="relative overflow-hidden rounded-sm bg-[var(--surface-sunken)] group">
            <img
              src={galleryImgs[1]}
              alt={`${loc.title} gallery 2`}
              className="w-full h-full object-cover transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] group-hover:scale-103"
            />
          </div>

          {/* Mosaic Item 3 */}
          <div className="relative overflow-hidden rounded-sm bg-[var(--surface-sunken)] group">
            <img
              src={galleryImgs[2]}
              alt={`${loc.title} gallery 3`}
              className="w-full h-full object-cover transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] group-hover:scale-103"
            />
          </div>

          {/* Mosaic Item 4: Full Row Width */}
          <div className="sm:col-span-3 relative overflow-hidden rounded-sm bg-[var(--surface-sunken)] group h-[190px]">
            <img
              src={galleryImgs[3]}
              alt={`${loc.title} gallery 4`}
              className="w-full h-full object-cover transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] group-hover:scale-103"
            />
          </div>
        </div>
      </div>

      {/* Tips & Map Section (2 Columns) */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Tips Column */}
        <div>
          <SectionHeader
            eyebrow={t.detail.tipsEyebrow}
            title={t.detail.tipsTitle}
          />
          <div className="flex flex-col gap-3.5">
            {loc.tips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-[var(--surface-card)] border border-[var(--border)] rounded-sm p-4 text-sm text-[var(--text-primary)]"
              >
                <Icon name="check" className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Column */}
        <div>
          <SectionHeader
            eyebrow={t.detail.mapEyebrow}
            title={t.detail.mapTitle}
          />
          <div className="w-full h-[320px] rounded-sm overflow-hidden border border-[var(--border)] bg-[var(--surface-sunken)]">
            <iframe
              title={loc.title}
              src={mapEmbedUrl}
              className="w-full h-full border-0 block"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <a
            href={mapDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-[var(--brand-primary)] hover:underline"
          >
            <span>{t.detail.mapOpen}</span>
            <Icon name="external-link" className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Nearby Destinations Section (4 Columns) */}
      <div className="mt-20">
        <SectionHeader
          eyebrow={t.detail.nearbyEyebrow}
          title={t.detail.nearbyTitle}
          action={{
            label: t.detail.allBtn,
            onClick: () => onNavigate('destinations')
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <DestinationCard
              key={item.key}
              title={item[lang].title}
              category={(t.cats as Record<string, string>)[item.cat]}
              location={item[lang].location}
              blurb={item[lang].blurb}
              img={item.img}
              imgLabel={item.imgLabel}
              price={item[lang].price}
              hours={item[lang].hours}
              lang={lang}
              onClick={() => onNavigate('detail', { destKey: item.key })}
            />
          ))}
        </div>
      </div>
    </article>
  );
};
