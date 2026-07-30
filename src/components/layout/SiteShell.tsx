'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  type AppPage,
  type Language,
  type Navigate,
  type NavigationOptions,
  DESTS,
  TRANSLATIONS,
} from '@/data';
import { Footer } from './Footer';
import { Header } from './Header';

interface SiteContextValue {
  lang: Language;
  navigate: Navigate;
}

const SiteContext = createContext<SiteContextValue | null>(null);

function navigationHref(page: AppPage, options?: NavigationOptions) {
  if (page === 'home') return '/';
  if (page === 'events') return '/events';
  if (page === 'about') return '/about';

  if (page === 'detail') {
    const destination = DESTS.find((item) => item.key === options?.destKey);
    return destination ? `/destinations/${destination.slug}` : '/destinations';
  }

  if (!options?.cat || options.cat === 'All') return '/destinations';

  const params = new URLSearchParams({ category: options.cat });
  return `/destinations?${params.toString()}`;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used inside SiteShell');
  }
  return context;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState<Language>('en');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const savedLang = localStorage.getItem('sgp-lang');
        if (savedLang === 'en' || savedLang === 'id') {
          setLang(savedLang);
          document.documentElement.lang = savedLang;
        }

        const isDark = localStorage.getItem('sgp-theme') === 'dark';
        setDark(isDark);
        if (isDark) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      } catch {
        // Browser storage may be unavailable; token defaults remain usable.
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSetLang = useCallback((newLang: Language) => {
    setLang(newLang);
    document.documentElement.lang = newLang;
    try {
      localStorage.setItem('sgp-lang', newLang);
    } catch {
      // Keep the in-memory preference when storage is unavailable.
    }
  }, []);

  const handleToggleTheme = useCallback((isDark: boolean) => {
    setDark(isDark);
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('sgp-theme', isDark ? 'dark' : 'light');
    } catch {
      // Keep the in-memory preference when storage is unavailable.
    }
  }, []);

  const navigate = useCallback<Navigate>((page, options) => {
    router.push(navigationHref(page, options));
  }, [router]);

  const activeNavLabel = pathname.startsWith('/destinations')
    ? TRANSLATIONS[lang].nav.destinations
    : pathname.startsWith('/events')
      ? TRANSLATIONS[lang].nav.events
      : pathname.startsWith('/about')
        ? TRANSLATIONS[lang].nav.about
        : TRANSLATIONS[lang].nav.home;

  const contextValue = useMemo(() => ({ lang, navigate }), [lang, navigate]);

  return (
    <SiteContext.Provider value={contextValue}>
      <div className="min-h-screen flex flex-col justify-between bg-[var(--surface-page)] text-[var(--text-primary)]">
        <Header
          lang={lang}
          onSetLang={handleSetLang}
          dark={dark}
          onToggleTheme={handleToggleTheme}
          activeNav={activeNavLabel}
          onNavigate={navigate}
          isTransparent={pathname === '/'}
        />

        <main className="flex-1">{children}</main>

        <Footer lang={lang} onNavigate={navigate} />
      </div>
    </SiteContext.Provider>
  );
}
