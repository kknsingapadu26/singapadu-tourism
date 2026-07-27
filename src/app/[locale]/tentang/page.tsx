import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Icon } from "@/components/ui/icon";
import { getDictionary } from "@/content/translations";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.nav.about,
    description: dictionary.about.lead,
    alternates: {
      canonical: `/${locale}/tentang`,
      languages: { id: "/id/tentang", en: "/en/tentang" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  const facts = [
    { icon: "pin", value: dictionary.about.location },
    { icon: "route", value: dictionary.about.access },
    { icon: "temple", value: dictionary.about.office },
  ];

  return (
    <main id="main-content">
      <header className="about-hero">
        <div className="about-hero__pattern" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="shell about-hero__content">
          <p className="eyebrow eyebrow--light">{dictionary.about.eyebrow}</p>
          <h1>{dictionary.about.title}</h1>
          <p>{dictionary.about.lead}</p>
        </div>
      </header>

      <section className="section section--paper about-story">
        <div className="shell about-story__grid">
          <div className="about-story__number" aria-hidden="true">01</div>
          <div className="prose prose--large">
            {dictionary.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--green about-facts">
        <div className="shell">
          <p className="eyebrow eyebrow--light">{dictionary.about.factsTitle}</p>
          <div className="about-facts__grid">
            {facts.map((fact, index) => (
              <article key={fact.value}>
                <span>0{index + 1}</span>
                <Icon name={fact.icon} size={31} />
                <p>{fact.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand partners-section">
        <div className="shell partners-section__grid">
          <div>
            <p className="eyebrow">{dictionary.about.partnersEyebrow}</p>
            <h2>{dictionary.about.partnersTitle}</h2>
            <p>{dictionary.about.partnersBody}</p>
          </div>
          <div className="partner-logos">
            <div className="partner-logo">
              <Image alt="Logo Desa Singapadu" height={120} src="/logos/logo-desa-singapadu.webp" width={120} />
            </div>
            <div className="partner-logo">
              <Image alt="Logo KKN Singapadu" height={120} src="/logos/logo-kkn-singapadu.webp" width={120} />
            </div>
            <div className="partner-logo">
              <Image alt="Logo Politeknik Negeri Bali" height={120} src="/logos/logo-pnb.webp" width={120} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
