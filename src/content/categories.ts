import type { Category } from "@/domain/tourism";

export const categories = [
  {
    id: "culture",
    label: { id: "Budaya", en: "Culture" },
    description: {
      id: "Tari, gamelan, dan tradisi yang tetap hidup.",
      en: "Dance, gamelan, and traditions that remain alive.",
    },
    icon: "spark",
    order: 1,
  },
  {
    id: "nature",
    label: { id: "Alam", en: "Nature" },
    description: {
      id: "Sawah, sungai, dan pagi yang berjalan pelan.",
      en: "Rice fields, rivers, and unhurried mornings.",
    },
    icon: "leaf",
    order: 2,
  },
  {
    id: "craft",
    label: { id: "Kriya", en: "Craft" },
    description: {
      id: "Batu paras dan kayu pule di tangan para maestro.",
      en: "Paras stone and pule wood in masterful hands.",
    },
    icon: "chisel",
    order: 3,
  },
  {
    id: "family",
    label: { id: "Keluarga", en: "Family" },
    description: {
      id: "Petualangan ringan untuk segala usia.",
      en: "Easy-going adventures for every age.",
    },
    icon: "sun",
    order: 4,
  },
  {
    id: "sacred",
    label: { id: "Sakral", en: "Sacred" },
    description: {
      id: "Ruang suci, etika, dan kalender Bali.",
      en: "Sacred spaces, etiquette, and the Balinese calendar.",
    },
    icon: "temple",
    order: 5,
  },
] satisfies Category[];
