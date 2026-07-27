import Image from "next/image";
import Link from "next/link";

import { getDictionary } from "@/content/translations";
import { createWhatsAppUrl, siteConfig } from "@/content/site";
import type { Locale } from "@/domain/tourism";
import { Icon } from "@/components/ui/icon";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const whatsappMessage =
    locale === "id"
      ? "Halo! Saya ingin bertanya tentang kunjungan ke Singapadu."
      : "Hello! I would like to ask about visiting Singapadu.";

  return (
    <footer className="site-footer">
      <div className="site-footer__main shell">
        <div className="site-footer__brand">
          <Image
            alt="Logo Desa Singapadu"
            height={74}
            src="/logos/logo-desa-singapadu.webp"
            width={74}
          />
          <h2>Singapadu</h2>
          <p>{dictionary.footer.blurb}</p>
        </div>

        <div className="site-footer__column">
          <h3>{dictionary.footer.explore}</h3>
          <Link href={`/${locale}/destinasi`}>{dictionary.nav.destinations}</Link>
          <Link href={`/${locale}/agenda`}>{dictionary.nav.events}</Link>
          <Link href={`/${locale}/tentang`}>{dictionary.nav.about}</Link>
        </div>

        <div className="site-footer__column">
          <h3>{dictionary.footer.plan}</h3>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapQuery)}`}
            rel="noreferrer"
            target="_blank"
          >
            Google Maps
          </a>
          <a href={createWhatsAppUrl(whatsappMessage)} rel="noreferrer" target="_blank">
            WhatsApp
          </a>
          <span>{siteConfig.phoneDisplay}</span>
        </div>

        <div className="site-footer__column site-footer__column--contact">
          <h3>{dictionary.footer.contact}</h3>
          <p>{siteConfig.address}</p>
          <a className="round-link" href={createWhatsAppUrl(whatsappMessage)}>
            <span>WhatsApp</span>
            <Icon name="arrow" size={20} />
          </a>
        </div>
      </div>
      <div className="site-footer__bottom shell">
        <p>© {new Date().getFullYear()} Singapadu Tourism</p>
        <p>{dictionary.footer.rights}</p>
      </div>
    </footer>
  );
}
