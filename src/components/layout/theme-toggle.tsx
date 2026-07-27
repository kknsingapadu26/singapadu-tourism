"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";

import { Icon } from "@/components/ui/icon";

type ThemeToggleProps = {
  darkLabel: string;
  lightLabel: string;
};

export function ThemeToggle({ darkLabel, lightLabel }: ThemeToggleProps) {
  useLayoutEffect(() => {
    if (document.documentElement.dataset.theme) return;

    try {
      const stored = localStorage.getItem("sgp-theme");
      const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.dataset.theme =
        stored === "dark" || (!stored && prefersDark) ? "dark" : "light";
    } catch {
      document.documentElement.dataset.theme = "light";
    }

    window.dispatchEvent(new Event("sgp-theme-change"));
  }, []);

  const dark = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("sgp-theme-change", onStoreChange);
      return () => window.removeEventListener("sgp-theme-change", onStoreChange);
    },
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );

  function toggleTheme() {
    const nextDark = !dark;
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    localStorage.setItem("sgp-theme", nextDark ? "dark" : "light");
    window.dispatchEvent(new Event("sgp-theme-change"));
  }

  return (
    <button
      aria-label={dark ? lightLabel : darkLabel}
      className="icon-button"
      onClick={toggleTheme}
      title={dark ? lightLabel : darkLabel}
      type="button"
    >
      <Icon name={dark ? "sun" : "moon"} size={20} />
    </button>
  );
}
