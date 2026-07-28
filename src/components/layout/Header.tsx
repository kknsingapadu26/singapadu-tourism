'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, MapPin, Globe } from 'lucide-react';
import { Language, TRANSLATIONS, DESTS } from '@/data/singapaduData';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
  lang: Language;
  onSetLang: (lang: Language) => void;
  dark: boolean;
  onToggleTheme: (dark: boolean) => void;
  activeNav: string;
  onNavigate: (page: string, extra?: Record<string, any>) => void;
  isTransparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onSetLang,
  dark,
  onToggleTheme,
  activeNav,
  onNavigate,
  isTransparent = false
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [destSubOpen, setDestSubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const navItems = [
    { label: t.nav.home, key: 'home' },
    { label: t.nav.destinations, key: 'destinations' },
    { label: t.nav.events, key: 'events' },
    { label: t.nav.about, key: 'about' }
  ];

  const handleNavClick = (key: string) => {
    setMenuOpen(false);
    onNavigate(key);
  };

  const handleDestDetailClick = (destKey: string) => {
    setMenuOpen(false);
    onNavigate('detail', { destKey });
  };

  const headerBgClass = isTransparent && !scrolled
    ? 'bg-gradient-to-b from-black/70 via-black/40 to-transparent text-white'
    : 'bg-[var(--surface-card)]/95 backdrop-blur-md border-b border-[var(--border)] text-[var(--text-primary)] shadow-sm';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerBgClass}`}>
        {/* Top utility bar (Desktop only) */}
        <div className="hidden lg:block border-b border-white/10 dark:border-white/5 py-1.5 text-xs">
          <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[var(--text-secondary)] opacity-90">
              <MapPin className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
              <span>Sukawati, Gianyar, Bali</span>
              <span className="mx-1">•</span>
              <span>Pemerintah Desa Singapadu & Politeknik Negeri Bali</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-neutral-200/50 dark:bg-neutral-800/50 p-0.5 rounded-md">
                <button
                  onClick={() => onSetLang('en')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-wider transition-colors cursor-pointer ${lang === 'en'
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onSetLang('id')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-wider transition-colors cursor-pointer ${lang === 'id'
                    ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  ID
                </button>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle dark={dark} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo / Crest */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer text-left group"
          >
            <img
              src="/logos/logo-kkn-singapadu.webp"
              alt="Logo Desa Singapadu"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="block font-extrabold text-lg tracking-tight leading-tight group-hover:text-[var(--brand-primary)] transition-colors">
                Singapadu
              </span>
              <span className="block text-[11px] uppercase tracking-widest font-semibold text-[var(--text-secondary)] opacity-80">
                Village Tourism
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeNav === item.label || (activeNav === '' && item.key === 'home');
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`text-sm font-semibold tracking-wide transition-colors cursor-pointer relative py-1 ${isActive
                    ? 'text-[var(--brand-primary)]'
                    : 'hover:text-[var(--brand-primary)]'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-primary)] rounded-full animate-sgp-fade" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle & Utility Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-sgp-backdrop"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm bg-[var(--surface-card)] h-full overflow-y-auto z-10 p-6 flex flex-col justify-between shadow-2xl animate-sgp-slide-in">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logos/logo-desa-singapadu.webp"
                    alt="Logo Singapadu"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-extrabold text-base">Singapadu Tourism</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language & Theme Controls */}
              <div className="py-4 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Language</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onSetLang('en')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${lang === 'en' ? 'bg-[var(--brand-primary)] text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-[var(--text-secondary)]'
                      }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => onSetLang('id')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${lang === 'id' ? 'bg-[var(--brand-primary)] text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-[var(--text-secondary)]'
                      }`}
                  >
                    ID
                  </button>
                </div>
              </div>

              <div className="py-4 border-b border-[var(--border)] flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Dark Mode</span>
                <ThemeToggle dark={dark} onToggle={onToggleTheme} variant="full" />
              </div>

              {/* Navigation Items */}
              <div className="py-6 space-y-2">
                <button
                  onClick={() => handleNavClick('home')}
                  className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-base hover:bg-[var(--surface-sunken)] transition-colors"
                >
                  {t.nav.home}
                </button>

                {/* Destinations Accordion */}
                <div>
                  <button
                    onClick={() => setDestSubOpen(!destSubOpen)}
                    className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-base hover:bg-[var(--surface-sunken)] transition-colors flex items-center justify-between"
                  >
                    <span>{t.nav.destinations}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${destSubOpen ? 'rotate-90' : ''}`} />
                  </button>

                  {destSubOpen && (
                    <div className="pl-4 py-2 space-y-1 text-sm">
                      <button
                        onClick={() => handleNavClick('destinations')}
                        className="w-full text-left py-1.5 px-3 font-semibold text-[var(--brand-primary)] hover:underline"
                      >
                        → {t.menu.all}
                      </button>
                      {DESTS.map((d) => (
                        <button
                          key={d.key}
                          onClick={() => handleDestDetailClick(d.key)}
                          className="w-full text-left py-1.5 px-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] block truncate"
                        >
                          {d[lang].title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleNavClick('events')}
                  className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-base hover:bg-[var(--surface-sunken)] transition-colors"
                >
                  {t.nav.events}
                </button>

                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left py-2.5 px-3 rounded-lg font-bold text-base hover:bg-[var(--surface-sunken)] transition-colors"
                >
                  {t.nav.about}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
