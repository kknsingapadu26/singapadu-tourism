import { notFound } from "next/navigation";

import { HomePage } from "@/components/home/home-page";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <HomePage locale={locale} />;
}
