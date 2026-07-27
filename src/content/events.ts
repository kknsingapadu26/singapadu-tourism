import type { TourismEvent, VisualTone } from "@/domain/tourism";

const referenceSource = {
  label: "Singapadu Tourism_revisi_3.html — confirm ceremony dates with the village office",
  checkedAt: "2026-07-27",
} as const;

function eventImage(tone: VisualTone, id: string, en: string) {
  return {
    // CHANGE THE PHOTO HERE: add an optimized image from the gallery profile.
    src: undefined,
    alt: { id, en },
    width: 1400,
    height: 900,
    tone,
  };
}

export const events = [
  {
    id: "barong-performance",
    status: "published",
    categoryIds: ["culture"],
    title: { id: "Tari Barong & keris", en: "Barong & keris dance" },
    description: {
      id: "Sekaa desa mementaskan Barong Ket dengan gamelan lengkap di panggung Pura Puseh. Pertunjukan berlangsung sekitar 60 menit.",
      en: "The village troupe performs Barong Ket with a full gamelan ensemble at the Pura Puseh stage. The performance lasts about 60 minutes.",
    },
    venueName: { id: "Panggung Pura Puseh", en: "Pura Puseh stage" },
    destinationId: "barong",
    schedule: {
      kind: "weekly",
      days: ["tue", "fri"],
      startTime: "19:00",
      endTime: "20:00",
      display: { id: "Selasa & Jumat · 19.00", en: "Tuesday & Friday · 19:00" },
    },
    image: eventImage("temple", "Pentas Barong dan keris", "Barong and keris performance"),
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
  {
    id: "odalan-pura-puseh",
    status: "published",
    categoryIds: ["sacred"],
    title: { id: "Odalan Pura Puseh", en: "Odalan at Pura Puseh" },
    description: {
      id: "Piodalan pura menurut kalender pawukon 210 hari: tiga hari penuh hiasan, iring-iringan, persembahyangan, dan gamelan malam.",
      en: "The temple anniversary follows the 210-day pawukon calendar: three days of decoration, processions, prayer, and night gamelan.",
    },
    venueName: { id: "Pura Puseh", en: "Pura Puseh" },
    destinationId: "barong",
    schedule: {
      kind: "fixed",
      start: "2026-08-28T08:00:00+08:00",
      end: "2026-08-30T22:00:00+08:00",
      display: { id: "28–30 Agustus 2026", en: "28–30 August 2026" },
    },
    image: eventImage("gold", "Persiapan Odalan di pura", "Temple preparations for Odalan"),
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
  {
    id: "purnama",
    status: "published",
    categoryIds: ["sacred"],
    title: { id: "Persembahyangan Purnama", en: "Purnama offerings" },
    description: {
      id: "Setiap purnama, pura dipenuhi banten dan persembahyangan sejak senja. Pengunjung dapat menyaksikan dengan hormat dari jaba pura.",
      en: "On every full moon, temples fill with offerings and evening prayer. Visitors may observe respectfully from the outer courtyard.",
    },
    venueName: { id: "Seluruh pura desa", en: "Village temples" },
    schedule: {
      kind: "balinese-calendar",
      display: { id: "Setiap bulan purnama", en: "Every full moon" },
      occurrences: [],
    },
    image: eventImage("sunrise", "Banten pada hari Purnama", "Offerings on a full-moon day"),
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
  {
    id: "galungan-kuningan",
    status: "published",
    categoryIds: ["culture", "sacred"],
    title: { id: "Galungan & Kuningan", en: "Galungan & Kuningan" },
    description: {
      id: "Hari kemenangan dharma dan kembalinya para leluhur. Penjor melengkung di sepanjang jalan, sementara setiap keluarga membuka sanggahnya.",
      en: "The celebration of dharma and the ancestors' return. Penjor arches line the roads while family shrines open across the village.",
    },
    venueName: { id: "Seluruh desa", en: "Across the village" },
    schedule: {
      kind: "balinese-calendar",
      display: { id: "13 & 23 Januari 2027", en: "13 & 23 January 2027" },
      occurrences: ["2027-01-13", "2027-01-23"],
    },
    image: eventImage("forest", "Penjor Galungan di jalan desa", "Galungan penjor along the village road"),
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
  {
    id: "ngelawang",
    status: "published",
    categoryIds: ["culture"],
    title: { id: "Ngelawang Barong", en: "Ngelawang Barong processions" },
    description: {
      id: "Di antara Galungan dan Kuningan, Barong diarak dari pintu ke pintu untuk menyucikan desa. Sesari seikhlasnya diterima.",
      en: "Between Galungan and Kuningan, Barong is carried door to door to cleanse the village. Small offerings are welcome.",
    },
    venueName: { id: "Gang-gang desa", en: "Village lanes" },
    destinationId: "barong",
    schedule: {
      kind: "balinese-calendar",
      display: { id: "14–22 Januari 2027", en: "14–22 January 2027" },
      occurrences: ["2027-01-14", "2027-01-22"],
    },
    image: eventImage("temple", "Barong Ngelawang melintasi desa", "Ngelawang Barong moving through the village"),
    sources: [referenceSource],
    updatedAt: "2026-07-27",
  },
] satisfies TourismEvent[];
