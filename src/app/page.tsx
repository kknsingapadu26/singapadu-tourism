'use client';

import React, { useState, useEffect } from 'react';
import {
  APP_PAGES,
  type AppPage,
  type DestinationFilter,
  type DestinationKey,
  type Language,
  type NavigationOptions,
  TRANSLATIONS,
} from '@/data/singapaduData';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Section & View Components
import { Hero } from '@/components/home/Hero';
import { QuickLinks } from '@/components/home/QuickLinks';
import { PlacesToExplore } from '@/components/home/PlacesToExplore';
import { BentoGrid } from '@/components/home/BentoGrid';
import { MustSeeSpotlight } from '@/components/home/MustSeeSpotlight';
import { CraftHighlight } from '@/components/home/CraftHighlight';
import { EventsPreview } from '@/components/home/EventsPreview';
import { TipsSection } from '@/components/home/TipsSection';
import { CtaBanner } from '@/components/home/CtaBanner';

import { DestinationsList } from '@/components/destinations/DestinationsList';
import { DestinationDetail } from '@/components/destinations/DestinationDetail';
import { EventsList } from '@/components/events/EventsList';
import { AboutVillage } from '@/components/about/AboutVillage';

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [dark, setDark] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedDestKey, setSelectedDestKey] = useState<DestinationKey>('barong');
  const [categoryFilter, setCategoryFilter] = useState<DestinationFilter>('All');

  // Initialize theme and language from localStorage
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const savedLang = localStorage.getItem('sgp-lang');
        if (savedLang === 'en' || savedLang === 'id') {
          setLang(savedLang);
          document.documentElement.lang = savedLang;
        }

        const savedTheme = localStorage.getItem('sgp-theme');
        const isDark = savedTheme === 'dark';
        setDark(isDark);
        if (isDark) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      } catch {
        // LocalStorage fallback
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const handleToggleTheme = (isDark: boolean) => {
    setDark(isDark);
    try {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('sgp-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('sgp-theme', 'light');
      }
    } catch {}
  };

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    document.documentElement.lang = newLang;
    try {
      localStorage.setItem('sgp-lang', newLang);
    } catch {}
  };

  const handleNavigate = (page: AppPage, extra?: NavigationOptions) => {
    if (APP_PAGES.includes(page)) {
      setCurrentPage(page);
    }

    if (extra?.destKey) {
      setSelectedDestKey(extra.destKey);
    }

    if (extra?.cat) {
      setCategoryFilter(extra.cat);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeNavLabel =
    currentPage === 'destinations' || currentPage === 'detail'
      ? TRANSLATIONS[lang].nav.destinations
      : currentPage === 'events'
      ? TRANSLATIONS[lang].nav.events
      : currentPage === 'about'
      ? TRANSLATIONS[lang].nav.about
      : TRANSLATIONS[lang].nav.home;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--surface-page)] text-[var(--text-primary)]">
      {/* Navigation Header */}
      <Header
        lang={lang}
        onSetLang={handleSetLang}
        dark={dark}
        onToggleTheme={handleToggleTheme}
        activeNav={activeNavLabel}
        onNavigate={handleNavigate}
        isTransparent={currentPage === 'home'}
      />

      {/* Main Page View Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="animate-sgp-fade">
            <Hero lang={lang} onNavigate={handleNavigate} />
            <QuickLinks lang={lang} onNavigate={handleNavigate} />
            <PlacesToExplore lang={lang} onNavigate={handleNavigate} />
            <BentoGrid lang={lang} onNavigate={handleNavigate} />
            <MustSeeSpotlight lang={lang} onNavigate={handleNavigate} />
            <CraftHighlight lang={lang} onNavigate={handleNavigate} />
            <EventsPreview lang={lang} onNavigate={handleNavigate} />
            <TipsSection lang={lang} />
            <CtaBanner lang={lang} onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === 'destinations' && (
          <div className="animate-sgp-fade">
            <DestinationsList
              lang={lang}
              initialCat={categoryFilter}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {currentPage === 'detail' && (
          <div className="animate-sgp-fade">
            <DestinationDetail
              lang={lang}
              destKey={selectedDestKey}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {currentPage === 'events' && (
          <div className="animate-sgp-fade">
            <EventsList lang={lang} />
          </div>
        )}

        {currentPage === 'about' && (
          <div className="animate-sgp-fade">
            <AboutVillage lang={lang} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={handleNavigate} />
    </div>
  );
}
