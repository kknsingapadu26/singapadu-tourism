import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Desa Wisata Singapadu | Singapadu Village Tourism",
  description: "Explore Singapadu village in Sukawati, Gianyar, Bali. Discover Barong & Keris dance at Pura Puseh, UNESCO subak rice terrace walks, stone and mask carving workshops, and family attractions.",
  keywords: ["Singapadu", "Desa Wisata Singapadu", "Barong Dance", "Sukawati", "Gianyar", "Bali Tourism", "Subak Walk", "Mask Carving"],
  openGraph: {
    title: "Singapadu Village Tourism — Sukawati, Gianyar, Bali",
    description: "The village of Barong dance, mask carving and living Balinese tradition.",
    url: "https://singapadu.desa.id",
    siteName: "Desa Wisata Singapadu",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--surface-page)] text-[var(--text-primary)] transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
