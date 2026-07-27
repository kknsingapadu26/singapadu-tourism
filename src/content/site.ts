export const siteConfig = {
  name: "Singapadu",
  title: "Singapadu Tourism",
  description: {
    id: "Jelajahi tari barong, sanggar kriya, persawahan, dan tradisi hidup Desa Singapadu di Gianyar, Bali.",
    en: "Explore Barong dance, craft studios, rice fields, and living traditions in Singapadu village, Gianyar, Bali.",
  },
  // CHANGE SITE URL HERE when the production domain has been confirmed.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://singapadu-tourism.example",
  whatsapp: "6281239562711",
  phoneDisplay: "+62 812-3956-2711",
  email: "desa@singapadu.example",
  mapQuery: "Desa Singapadu Sukawati Gianyar Bali",
  address: "Desa Singapadu, Kecamatan Sukawati, Kabupaten Gianyar, Bali",
} as const;

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
