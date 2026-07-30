'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type AppPage, type Language, TRANSLATIONS, DESTS } from '@/data';
import { getNavigationHref } from '@/lib/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Icon } from '../ui/Icon';

interface HeaderProps {
  lang: Language;
  onSetLang: (lang: Language) => void;
  dark: boolean;
  onToggleTheme: (dark: boolean) => void;
  activeNav: string;
  isTransparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onSetLang,
  dark,
  onToggleTheme,
  activeNav,
  isTransparent = false
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [destSubOpen, setDestSubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let animationFrame: number | null = null;

    const handleScroll = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        const nextScrollY = Math.max(window.scrollY, 0);
        const distance = nextScrollY - lastScrollY;

        setScrolled(nextScrollY > 32);

        if (nextScrollY < 32) {
          setHeaderVisible(true);
        } else if (Math.abs(distance) > 6) {
          setHeaderVisible(distance < 0);
        }

        lastScrollY = nextScrollY;
        animationFrame = null;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const closeMobileMenu = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopQuery.addEventListener('change', closeMobileMenu);
    return () => desktopQuery.removeEventListener('change', closeMobileMenu);
  }, []);

  const navItems: Array<{ label: string; key: AppPage; href: string }> = [
    { label: t.nav.home, key: 'home', href: getNavigationHref('home') },
    { label: t.nav.destinations, key: 'destinations', href: getNavigationHref('destinations') },
    { label: t.nav.events, key: 'events', href: getNavigationHref('events') },
    { label: t.nav.about, key: 'about', href: getNavigationHref('about') }
  ];

  const isOverlay = isTransparent && !scrolled;
  const showUtilityBar = !scrolled || headerVisible;
  const usesInverseBrand = isOverlay || menuOpen;
  const headerBgClass = menuOpen
    ? 'bg-[var(--mobile-nav-header)] text-white border-b border-white/12 shadow-[0_6px_20px_rgba(8,40,20,.18)]'
    : isOverlay
      ? 'bg-gradient-to-b from-black/75 via-black/35 to-transparent text-white'
      : 'bg-[var(--surface-card)]/82 backdrop-blur-xl border-b border-[var(--border)] text-[var(--text-primary)] shadow-[0_6px_24px_rgba(15,22,19,.08)]';

  return (
    <>
      <header
        data-testid="site-header"
        data-scrolled={scrolled}
        data-visible={headerVisible}
        className={`fixed top-0 left-0 right-0 z-40 transform-gpu transition-[translate,transform,background-color,border-color,box-shadow,backdrop-filter] duration-[var(--dur-med)] ease-[var(--ease-out)] ${
          headerVisible || menuOpen ? 'translate-y-0' : '-translate-y-full'
        } ${headerBgClass}`}
      >
        {/* Top utility bar (Desktop only) */}
        <div
          className={`hidden lg:block overflow-hidden text-xs transition-[max-height,opacity,padding,border-color] duration-[var(--dur-med)] ease-[var(--ease-out)] ${
            showUtilityBar ? 'max-h-10 py-1.5 opacity-100 border-b border-white/15' : 'max-h-0 py-0 opacity-0 border-transparent'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
            <div className={`flex items-center gap-2 ${isOverlay ? 'text-white/85' : 'text-[var(--text-secondary)]'}`}>
              <Icon name="map-pin" className={`w-3.5 h-3.5 ${isOverlay ? 'text-[var(--green-300)]' : 'text-[var(--brand-primary)]'}`} />
              <span>Sukawati, Gianyar, Bali</span>
              <span className="mx-1">•</span>
              <span>Pemerintah Desa Singapadu & Politeknik Negeri Bali</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSetLang('en')}
                  className={`px-2.5 py-0.5 rounded-sm text-[11px] font-bold tracking-wider transition-colors duration-[var(--dur-fast)] cursor-pointer ${lang === 'en'
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : isOverlay ? 'text-white/80 hover:text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onSetLang('id')}
                  className={`px-2.5 py-0.5 rounded-sm text-[11px] font-bold tracking-wider transition-colors duration-[var(--dur-fast)] cursor-pointer ${lang === 'id'
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : isOverlay ? 'text-white/80 hover:text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  ID
                </button>
              </div>

              {/* Theme Toggle */}
              <div className={`border-l pl-3 ${isOverlay ? 'border-white/35' : 'border-[var(--border-strong)]'}`}>
                <ThemeToggle dark={dark} onToggle={onToggleTheme} contrast={isOverlay ? 'inverse' : 'default'} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 transition-[height] duration-[var(--dur-med)] ease-[var(--ease-out)] ${scrolled ? 'h-16' : 'h-16 sm:h-20'}`}>
          {/* Logo / Crest */}
          <Link
            href={getNavigationHref('home')}
            className="flex items-center gap-3 cursor-pointer text-left group"
          >
            <Image
              src="/logos/logo-kkn-singapadu.webp"
              alt="Logo Desa Singapadu"
              width={40}
              height={40}
              loading="eager"
              className="w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,.65)] group-hover:scale-103 transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)]"
            />
            <div>
              <span className={`block font-extrabold text-lg tracking-tight leading-tight transition-colors duration-[var(--dur-fast)] ${
                usesInverseBrand ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,.65)]' : 'text-[var(--text-primary)] group-hover:text-[var(--brand-primary)]'
              }`}>
                Singapadu
              </span>
              <span className={`hidden sm:block text-[11px] uppercase tracking-[0.08em] font-bold transition-colors duration-[var(--dur-fast)] ${
                usesInverseBrand ? 'text-white/85 drop-shadow-[0_1px_3px_rgba(0,0,0,.65)]' : 'text-[var(--text-secondary)]'
              }`}>
                Village Tourism
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeNav === item.label || (activeNav === '' && item.key === 'home');
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  data-active={isActive}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-[var(--dur-fast)] cursor-pointer relative py-2 ${
                    isOverlay ? 'text-white hover:text-white' : 'text-[var(--text-primary)] hover:text-[var(--brand-primary)]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[var(--accent)] animate-sgp-fade" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
              data-testid="mobile-menu-toggle"
              className={`inline-flex w-10 h-10 items-center justify-center transition-[color,transform] duration-[var(--dur-fast)] ease-[var(--ease-out)] active:scale-[.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] ${
                usesInverseBrand
                  ? 'text-white hover:text-white/75'
                  : 'text-[var(--text-primary)] hover:text-[var(--brand-primary)]'
              }`}
              aria-label={menuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="relative block w-6 h-5" aria-hidden="true">
                <span className={`absolute left-0 top-0.5 block h-0.5 w-6 bg-current transition-[translate,rotate] duration-[var(--dur-med)] ease-[var(--ease-out)] ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
                <span className={`absolute left-0 top-[9px] block h-0.5 w-6 bg-current transition-[opacity,scale] duration-[var(--dur-fast)] ease-[var(--ease-out)] ${menuOpen ? 'scale-x-50 opacity-0' : ''}`} />
                <span className={`absolute left-0 top-[16px] block h-0.5 w-6 bg-current transition-[translate,rotate] duration-[var(--dur-med)] ease-[var(--ease-out)] ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation panel */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          data-testid="mobile-navigation"
          className="md:hidden fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-[var(--mobile-nav-surface)] text-white shadow-2xl animate-sgp-slide-in"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="min-h-full flex flex-col">
            <nav aria-label="Mobile">
              <Link
                href={getNavigationHref('home')}
                onClick={() => setMenuOpen(false)}
                className={`block w-full border-b border-white/8 bg-[var(--mobile-nav-level-1)] px-6 py-5 text-left text-2xl font-extrabold transition-colors duration-[var(--dur-fast)] hover:bg-white/8 ${activeNav === t.nav.home || activeNav === '' ? 'border-l-4 border-l-[var(--accent)]' : ''}`}
              >
                {t.nav.home}
              </Link>

              <div className="border-b border-white/8 bg-[var(--mobile-nav-level-2)]">
                <button
                  onClick={() => setDestSubOpen((open) => !open)}
                  className={`w-full px-6 py-5 text-left text-2xl font-extrabold transition-colors duration-[var(--dur-fast)] hover:bg-white/8 flex items-center justify-between ${activeNav === t.nav.destinations ? 'border-l-4 border-l-[var(--accent)]' : ''}`}
                  aria-expanded={destSubOpen}
                >
                  <span>{t.nav.destinations}</span>
                  <Icon name="chevron-right" className={`w-6 h-6 transition-transform duration-[var(--dur-med)] ease-[var(--ease-out)] ${destSubOpen ? 'rotate-90' : ''}`} />
                </button>

                {destSubOpen && (
                  <div className="border-t border-white/8 bg-black/12 px-6 py-3 animate-sgp-fade">
                    <Link
                      href={getNavigationHref('destinations')}
                      onClick={() => setMenuOpen(false)}
                      className="block w-full py-2 text-left text-sm font-bold text-[var(--green-300)] hover:underline underline-offset-4"
                    >
                      {t.menu.all}
                    </Link>
                    {DESTS.map((d) => (
                      <Link
                        key={d.key}
                        href={getNavigationHref('detail', { destKey: d.key })}
                        onClick={() => setMenuOpen(false)}
                        className="block w-full truncate py-2 text-left text-sm text-white/80 hover:text-white transition-colors duration-[var(--dur-fast)]"
                      >
                        {d[lang].title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={getNavigationHref('events')}
                onClick={() => setMenuOpen(false)}
                className={`block w-full border-b border-white/8 bg-[var(--mobile-nav-level-3)] px-6 py-5 text-left text-2xl font-extrabold transition-colors duration-[var(--dur-fast)] hover:bg-white/8 ${activeNav === t.nav.events ? 'border-l-4 border-l-[var(--accent)]' : ''}`}
              >
                {t.nav.events}
              </Link>

              <Link
                href={getNavigationHref('about')}
                onClick={() => setMenuOpen(false)}
                className={`block w-full border-b border-white/8 bg-[var(--mobile-nav-level-4)] px-6 py-5 text-left text-2xl font-extrabold transition-colors duration-[var(--dur-fast)] hover:bg-white/8 ${activeNav === t.nav.about ? 'border-l-4 border-l-[var(--accent)]' : ''}`}
              >
                {t.nav.about}
              </Link>
            </nav>

            <div className="px-6 py-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-white/70">{t.menu.lang}</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSetLang('en')}
                  className={`min-w-16 rounded-sm border px-4 py-2 text-sm font-bold transition-colors duration-[var(--dur-fast)] ${lang === 'en' ? 'border-white bg-white text-[var(--mobile-nav-surface)]' : 'border-white/55 text-white hover:bg-white/10'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => onSetLang('id')}
                  className={`min-w-16 rounded-sm border px-4 py-2 text-sm font-bold transition-colors duration-[var(--dur-fast)] ${lang === 'id' ? 'border-white bg-white text-[var(--mobile-nav-surface)]' : 'border-white/55 text-white hover:bg-white/10'}`}
                >
                  ID
                </button>
              </div>

              <div className="mt-7">
                <ThemeToggle dark={dark} onToggle={onToggleTheme} variant="full" contrast="inverse" label={t.menu.theme} />
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3 p-6 pt-10">
              <Link
                href={getNavigationHref('about')}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-sm bg-[var(--mobile-nav-action)] px-3 py-4 font-bold transition-colors duration-[var(--dur-fast)] hover:bg-white/16"
              >
                <Icon name="map" className="h-6 w-6" />
                <span>{t.menu.map}</span>
              </Link>
              <Link
                href={getNavigationHref('about')}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-sm bg-[var(--mobile-nav-action)] px-3 py-4 font-bold transition-colors duration-[var(--dur-fast)] hover:bg-white/16"
              >
                <Icon name="message-circle" className="h-6 w-6" />
                <span>{t.menu.contact}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
