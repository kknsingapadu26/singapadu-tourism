import type { Metadata } from "next";

import { RootDocument } from "@/components/layout/root-document";
import { siteConfig } from "@/content/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Singapadu Tourism · Gianyar, Bali",
    template: "%s · Singapadu Tourism",
  },
  description: siteConfig.description.id,
  alternates: {
    canonical: "/",
    languages: { id: "/id", en: "/en" },
  },
};

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootDocument homeHref="/" locale="id">
      {children}
    </RootDocument>
  );
}
