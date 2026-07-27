"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getDictionary } from "@/content/translations";
import type { Locale } from "@/domain/tourism";
import { switchLocalePath } from "@/lib/i18n";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/layout/theme-toggle";

type SiteHeaderProps = {
  locale: Locale;
  homeHref?: string;
};

export function SiteHeader({ locale, homeHref }: SiteHeaderProps) {
  const dictionary = getDictionary(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const targetLocale: Locale = locale === "id" ? "en" : "id";
  const resolvedHomeHref = homeHref ?? `/${locale}`;

  const navigation = [
    { label: dictionary.nav.home, href: resolvedHomeHref, exact: true },
    { label: dictionary.nav.destinations, href: `/${locale}/destinasi` },
    { label: dictionary.nav.events, href: `/${locale}/agenda` },
    { label: dictionary.nav.about, href: `/${locale}/tentang` },
  ];

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner shell">
          <Link aria-label="Singapadu Tourism" className="brand" href={resolvedHomeHref}>
            <Image
              alt=""
              className="brand__mark"
              height={44}
              priority
              src="/logos/logo-desa-singapadu.webp"
              width={44}
            />
            <span className="brand__type">
              <strong>Singapadu</strong>
              <small>Gianyar · Bali</small>
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="desktop-nav">
            {navigation.map((item) => {
              const active = item.exact
                ? pathname === item.href || (pathname === "/" && locale === "id")
                : pathname.startsWith(item.href);
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className="desktop-nav__link"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="site-header__actions">
            <Link
              aria-label={dictionary.changeLanguage}
              className="locale-link"
              href={switchLocalePath(pathname, targetLocale)}
              hrefLang={targetLocale}
            >
              {targetLocale.toUpperCase()}
            </Link>
            <ThemeToggle
              darkLabel={dictionary.darkMode}
              lightLabel={dictionary.lightMode}
            />
            <button
              aria-expanded={open}
              aria-label={dictionary.menu}
              className="icon-button mobile-menu-button"
              onClick={() => setOpen(true)}
              type="button"
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!open}
        className={`mobile-menu${open ? " is-open" : ""}`}
        inert={!open}
      >
        <div className="mobile-menu__top">
          <span className="eyebrow">Singapadu · Bali</span>
          <button
            aria-label={dictionary.close}
            className="icon-button icon-button--inverse"
            onClick={() => setOpen(false)}
            ref={closeButton}
            type="button"
          >
            <Icon name="close" size={24} />
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="mobile-menu__nav">
          {navigation.map((item, index) => (
            <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
              <Icon name="arrow" size={24} />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <Link href={switchLocalePath(pathname, targetLocale)} hrefLang={targetLocale}>
            {dictionary.changeLanguage}
          </Link>
          <p>{dictionary.footer.blurb}</p>
        </div>
      </div>
    </>
  );
}
