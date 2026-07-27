import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RootDocument } from "@/components/layout/root-document";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/content/translations";
import { locales } from "@/domain/tourism";
import { isLocale } from "@/lib/i18n";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};

  const dictionary = getDictionary(rawLocale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `Singapadu Tourism · ${dictionary.nav.home}`,
      template: "%s · Singapadu Tourism",
    },
    description: siteConfig.description[rawLocale],
    alternates: {
      canonical: `/${rawLocale}`,
      languages: { id: "/id", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <RootDocument locale={locale}>{children}</RootDocument>;
}
