import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary } from "@/content/translations";
import type { Locale } from "@/domain/tourism";

type RootDocumentProps = {
  locale: Locale;
  children: ReactNode;
  homeHref?: string;
};

export function RootDocument({ locale, children, homeHref }: RootDocumentProps) {
  const dictionary = getDictionary(locale);

  return (
    <html
      data-scroll-behavior="smooth"
      lang={locale}
      suppressHydrationWarning
    >
      <body>
        <a className="skip-link" href="#main-content">
          {dictionary.skip}
        </a>
        <SiteHeader homeHref={homeHref} locale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
