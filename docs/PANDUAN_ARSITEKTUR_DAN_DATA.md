# Panduan Arsitektur dan Data Singapadu Tourism

Dokumen ini adalah acuan teknis bagi kontributor Singapadu Tourism. Tujuannya adalah menghasilkan situs daftar tempat wisata yang sepenuhnya statis, mudah dipelihara, dapat divalidasi saat proses build, ramah SEO, dan tetap mudah dikembangkan oleh tim baru.

## 1. Konteks dan keputusan utama

Project menggunakan Next.js 16.2.12, React 19, TypeScript, App Router, dan Tailwind CSS 4. Situs harus dapat diekspor menjadi berkas HTML, CSS, JavaScript, gambar, dan metadata statis tanpa server aplikasi maupun database.

File `Singapadu Tourism_revisi_3.html` dipakai sebagai referensi awal desain dan inventaris konten, bukan sebagai source of truth yang dijalankan langsung. File tersebut merupakan bundle satu halaman berukuran sekitar 10 MB dengan aset tertanam. Konten yang ditemukan di dalamnya meliputi:

- 6 destinasi: Tari Barong di Pura Puseh, Bali Zoo, sanggar ukir batu paras, susur sawah subak, jalur Tukad Oos, dan studio tatah topeng;
- 5 agenda: pentas Barong dan keris, Odalan Pura Puseh, Purnama, Galungan dan Kuningan, serta Ngelawang;
- versi bahasa Indonesia dan Inggris;
- kategori `culture`, `nature`, `craft`, `family`, dan `sacred`;
- gambar utama, galeri, lokasi, peta, ringkasan, jam, harga, jarak, cerita, dan tip kunjungan.

Beberapa informasi pada referensi bersifat contoh atau mudah berubah. Harga, jam operasional, tanggal upacara, kontak, status UNESCO, alamat, dan koordinat harus diverifikasi sebelum dipublikasikan.

Keputusan arsitektur:

1. Data konten lokal adalah source of truth dan masuk ke Git.
2. Halaman membaca data melalui fungsi repository, bukan mengimpor array mentah secara acak.
3. TypeScript menjamin bentuk data saat pengembangan; validasi runtime/build menjaga kualitas konten dari nilai kosong, slug ganda, relasi rusak, atau tanggal tidak valid.
4. Semua route destinasi dibuat pada waktu build dengan `generateStaticParams()`.
5. Server Component adalah pilihan awal. Client Component hanya digunakan untuk interaksi yang membutuhkan state/browser API.
6. URL, konten SEO, dan HTML inti tetap dapat dibaca tanpa JavaScript.
7. Bahasa menjadi bagian URL, bukan hanya state di `localStorage`, agar setiap versi dapat ditautkan dan diindeks.

## 2. Struktur folder target

```text
singapadu-tourism/
├─ public/
│  ├─ images/
│  │  ├─ destinations/<destination-id>/
│  │  ├─ events/<event-id>/
│  │  └─ shared/
│  └─ icons/
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ page.tsx
│  │  │  ├─ destinasi/
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [slug]/page.tsx
│  │  │  ├─ agenda/page.tsx
│  │  │  └─ tentang/page.tsx
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ robots.ts
│  │  ├─ sitemap.ts
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ destination/
│  │  ├─ event/
│  │  └─ ui/
│  ├─ content/
│  │  ├─ destinations.ts
│  │  ├─ events.ts
│  │  ├─ categories.ts
│  │  ├─ site.ts
│  │  └─ translations.ts
│  ├─ domain/
│  │  ├─ destination.ts
│  │  ├─ event.ts
│  │  ├─ shared.ts
│  │  └─ validators.ts
│  ├─ repositories/
│  │  ├─ destination-repository.ts
│  │  └─ event-repository.ts
│  └─ lib/
│     ├─ i18n.ts
│     ├─ json-ld.ts
│     └─ site-url.ts
├─ tests/
│  ├─ content.test.ts
│  └─ routes.test.ts
├─ docs/
│  └─ PANDUAN_ARSITEKTUR_DAN_DATA.md
├─ next.config.ts
└─ package.json
```

Aturan dependensi dibuat satu arah:

```text
app/pages → components → repositories → content
                         ↘ domain/types
```

- `domain` tidak boleh mengimpor UI atau Next.js.
- `content` hanya berisi data dan tipe domain.
- `repositories` menyediakan query seperti `getAllDestinations`, `getDestinationBySlug`, dan `getRelatedDestinations`.
- `components` tidak boleh mencari data sendiri dari internet.
- `app` menyusun halaman, metadata, JSON-LD, dan route statis.

## 3. Konfigurasi static export

Gunakan konfigurasi berikut saat implementasi:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

`next build` akan menghasilkan folder `out/`. Opsi `trailingSlash` membuat hasil lebih portabel untuk static hosting. Optimizer gambar bawaan Next.js membutuhkan server; untuk export statis gunakan gambar lokal yang sudah dioptimalkan sebelum commit dan `unoptimized: true`, atau kelak pasang custom image loader jika memakai layanan gambar eksternal.

Fitur yang tidak boleh menjadi bagian arsitektur inti:

- Server Actions, cookies server, dan session server;
- API route dinamis;
- route dinamis tanpa `generateStaticParams()`;
- ISR, middleware/proxy, rewrite, atau redirect yang membutuhkan server;
- optimizer gambar default Next.js;
- pengambilan konten wajib dari API pada saat request pengguna.

Browser API seperti `localStorage`, `window`, dan `navigator` hanya boleh dipakai di Client Component dan diakses setelah komponen berjalan di browser. Konten inti tidak boleh bergantung padanya.

## 4. Model domain

### 4.1 Tipe dasar bersama

Gunakan nilai internal yang stabil dan tidak diterjemahkan. Label terjemahan ditentukan saat render.

```ts
export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export type LocalizedText = Record<Locale, string>;

export const categoryIds = [
  "culture",
  "nature",
  "craft",
  "family",
  "sacred",
] as const;
export type CategoryId = (typeof categoryIds)[number];

export type ContentStatus = "draft" | "published" | "archived";
export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface ImageAsset {
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
  credit?: string;
  license?: string;
}

export interface SourceReference {
  label: string;
  url?: string;
  checkedAt: string; // YYYY-MM-DD
}
```

Jangan menyimpan semua informasi sebagai string tampilan. Nilai yang perlu difilter, dihitung, diurutkan, atau divalidasi harus memiliki field tersendiri.

### 4.2 Destinasi

```ts
export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface Address {
  street?: string;
  banjar?: string;
  village: "Singapadu" | "Singapadu Kaler";
  district: "Sukawati";
  regency: "Gianyar";
  province: "Bali";
  postalCode?: string;
}

export interface OpeningPeriod {
  days: Weekday[];
  opens: string; // HH:mm, waktu lokal
  closes: string; // HH:mm, waktu lokal
}

export interface OpeningHours {
  timezone: "Asia/Makassar";
  periods: OpeningPeriod[];
  note?: LocalizedText;
  lastVerified: string;
}

export type Price =
  | { kind: "free"; note?: LocalizedText }
  | { kind: "donation"; note?: LocalizedText }
  | { kind: "contact"; note?: LocalizedText }
  | {
      kind: "fixed" | "from";
      currency: "IDR";
      amount: number;
      unit: "person" | "group" | "session";
      note?: LocalizedText;
    };

export interface Destination {
  id: string;
  slug: Record<Locale, string>;
  status: ContentStatus;
  categoryIds: CategoryId[];
  featured: boolean;
  title: LocalizedText;
  summary: LocalizedText;
  story: Record<Locale, string[]>;
  heroImage: ImageAsset;
  gallery: ImageAsset[];
  address: Address;
  geo: GeoPoint;
  mapQuery?: string;
  distanceFromVillageCenterKm?: number;
  openingHours?: OpeningHours;
  price?: Price;
  tips: Record<Locale, string[]>;
  accessibility?: Record<Locale, string[]>;
  contact?: {
    phone?: string; // format internasional, contoh +628123456789
    whatsapp?: string;
    website?: string;
    bookingUrl?: string;
  };
  seo: {
    title: LocalizedText;
    description: LocalizedText;
  };
  sources: SourceReference[];
  updatedAt: string;
}
```

Catatan desain:

- `id` adalah identitas permanen dan tidak berubah saat judul atau slug diubah.
- `slug` boleh berbeda per bahasa, tetapi harus unik dalam locale yang sama.
- `title`, `summary`, `story`, dan `tips` dilokalkan; koordinat, harga, gambar, serta status tidak diduplikasi.
- `distanceFromVillageCenterKm` bertipe angka, bukan teks `"0,4 km dari pusat desa"`.
- harga disimpan sebagai angka rupiah, bukan `"IDR 100 rb"`.
- `geo` wajib diverifikasi; jangan menebak koordinat dari query peta.
- informasi yang belum tersedia lebih baik tidak diisi daripada diberi data palsu.

Contoh ringkas object staging saat data referensi baru mulai dimigrasikan:

```ts
const migratedDestinationDraft: Partial<Destination> &
  Pick<Destination, "id" | "status"> = {
  id: "barong-pura-puseh",
  slug: {
    id: "tari-barong-pura-puseh",
    en: "barong-dance-pura-puseh",
  },
  status: "draft",
  categoryIds: ["culture", "sacred"],
  featured: true,
  title: {
    id: "Tari Barong di Pura Puseh",
    en: "Barong dance at Pura Puseh",
  },
  summary: {
    id: "Pentas Barong Singapadu di panggung Pura Puseh.",
    en: "Singapadu Barong performance at the Pura Puseh stage.",
  },
  distanceFromVillageCenterKm: 0.4,
  // Field wajib lain diisi setelah aset, lokasi, dan fakta diverifikasi.
};
```

Object staging tersebut tidak boleh masuk ke array produksi yang bertipe `Destination[]`. Lengkapi seluruh kontrak dan loloskan validator terlebih dahulu. Status tetap `draft` sampai faktanya disetujui untuk terbit.

### 4.3 Agenda atau acara

Agenda tidak boleh disimpan hanya sebagai teks seperti `"28 Agu"`. Gunakan tanggal ISO dan pisahkan acara berulang dari acara bertanggal tetap.

```ts
export type EventSchedule =
  | {
      kind: "fixed";
      start: string; // ISO 8601, contoh 2026-08-28T19:00:00+08:00
      end?: string;
    }
  | {
      kind: "weekly";
      days: Weekday[];
      startTime: string;
      endTime?: string;
    }
  | {
      kind: "balinese-calendar";
      label: LocalizedText;
      occurrences: string[]; // tanggal Gregorian yang sudah diverifikasi
    };

export interface TourismEvent {
  id: string;
  slug: Record<Locale, string>;
  status: ContentStatus;
  categoryIds: CategoryId[];
  title: LocalizedText;
  description: LocalizedText;
  venueName: LocalizedText;
  destinationId?: string;
  schedule: EventSchedule;
  image?: ImageAsset;
  price?: Price;
  sources: SourceReference[];
  updatedAt: string;
}
```

Untuk kalender pawukon atau tanggal upacara, simpan penjelasan budaya dalam `label`, lalu cantumkan hasil konversi yang telah dikonfirmasi di `occurrences`. Jangan menghitung tanggal ritual sendiri tanpa sumber resmi desa/pura.

### 4.4 Kategori, UI, dan konfigurasi situs

Kategori adalah data referensi kecil:

```ts
export interface Category {
  id: CategoryId;
  label: LocalizedText;
  description?: LocalizedText;
  icon: string;
  order: number;
}
```

Pisahkan tiga kelompok data berikut:

- `site.ts`: nama situs, URL kanonis, kontak resmi desa, alamat kantor, akun sosial;
- `categories.ts`: daftar kategori dan urutannya;
- `translations.ts`: label antarmuka seperti navigasi, tombol, pesan kosong, dan teks aksesibilitas.

Jangan memasukkan label UI ke setiap destinasi dan jangan menyimpan nomor WhatsApp di komponen.

## 5. Repository dan query data

Semua akses konten melewati fungsi murni. Contoh kontrak:

```ts
export function getAllDestinations(locale: Locale): Destination[];
export function getPublishedDestinations(locale: Locale): Destination[];
export function getDestinationBySlug(
  locale: Locale,
  slug: string,
): Destination | undefined;
export function getDestinationsByCategory(
  locale: Locale,
  categoryId: CategoryId,
): Destination[];
export function getRelatedDestinations(
  destinationId: string,
  limit?: number,
): Destination[];
```

Repository bertanggung jawab atas pencarian, filter status, dan urutan yang deterministik. Presentational component hanya menerima props siap tampil. Dengan pola ini, pemindahan source of truth dari file TypeScript ke CMS pada masa depan tidak memaksa perubahan seluruh UI.

## 6. Routing dan internasionalisasi

Struktur URL yang disarankan:

```text
/id/
/id/destinasi/
/id/destinasi/tari-barong-pura-puseh/
/id/agenda/
/id/tentang/
/en/
/en/destinasi/
/en/destinasi/barong-dance-pura-puseh/
/en/agenda/
/en/tentang/
```

Segment teknis sengaja dipertahankan sama pada semua bahasa agar cocok dengan struktur folder dan proses static export. Label navigasinya tetap diterjemahkan. Jika kelak nama segment route ikut diterjemahkan, buat pemetaan terpusat dan perbarui generator route, canonical, alternate, sitemap, serta test secara bersamaan.

Semua kombinasi locale dan slug harus dibuat pada build:

```ts
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPublishedDestinations(locale).map((destination) => ({
      locale,
      slug: destination.slug[locale],
    })),
  );
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  // Ambil data, panggil notFound() bila tidak ada, lalu render halaman.
}
```

Pada Next.js versi project ini, `params` adalah `Promise` dan harus di-`await`. Hindari menyalin contoh lama yang memperlakukannya sebagai object sinkron.

Route `/` sebaiknya menjadi landing page Indonesia yang nyata atau halaman pemilih bahasa yang statis. Jangan mengandalkan redirect server. Setiap halaman terlokalisasi wajib memiliki `alternates.languages` dan canonical URL sendiri.

## 7. Validasi data dan quality gate

TypeScript saja tidak cukup untuk memeriksa string kosong, format tanggal, URL, duplikasi, dan relasi. Tambahkan schema validator seperti Zod saat implementasi, kemudian jalankan validasi melalui test atau script sebelum build.

Minimal validasi otomatis:

- setiap `id` unik;
- setiap slug unik per locale dan hanya memakai huruf kecil, angka, serta tanda hubung;
- setiap locale wajib memiliki title, summary, alt gambar, dan SEO;
- `published` tidak boleh memiliki field wajib kosong;
- setiap `destinationId` pada event mengarah ke destinasi yang ada;
- setiap `src` gambar lokal mengarah ke file yang ada;
- ukuran gambar positif dan rasio sesuai slot UI;
- koordinat berada dalam rentang valid dan, secara bisnis, masuk area yang benar;
- `checkedAt` dan `updatedAt` berformat tanggal ISO;
- tanggal akhir acara tidak lebih awal dari tanggal mulai;
- nomor telepon memakai format internasional;
- URL memakai HTTPS kecuali environment lokal;
- tidak ada dua item menggunakan alt text generik seperti `gambar wisata`.

Quality gate sebelum merge:

```bash
npm run lint
npm run test
npm run build
```

Tambahkan script `test` dan `validate:content` ketika validator diimplementasikan. Build harus gagal apabila konten `published` tidak valid.

## 8. Gambar dan aset

Jangan menyalin gambar base64 dari HTML referensi ke source code. Simpan setiap aset sebagai file mandiri di `public/images`.

Aturan aset:

- gunakan nama deskriptif: `barong-pura-puseh-hero.webp`, bukan `IMG_1234.jpg`;
- pilih WebP atau AVIF untuk foto, SVG hanya untuk ilustrasi/icon yang aman;
- simpan dimensi intrinsik di data agar tidak terjadi layout shift;
- hero idealnya memiliki sumber minimal sekitar 1600 px lebar; thumbnail dibuat lebih kecil;
- kompres sebelum commit dan hindari metadata EXIF yang mengandung informasi pribadi;
- setiap gambar memiliki alt terlokalisasi; gambar dekoratif memakai alt kosong;
- simpan kredit dan lisensi bila aset bukan milik project;
- jangan hotlink gambar pihak ketiga tanpa izin;
- gunakan gambar autentik Singapadu, bukan foto stok dari lokasi lain di Bali.

## 9. SEO dan structured data

Setiap halaman destinasi harus memiliki metadata dari data domain:

- title dan description unik;
- canonical URL absolut;
- pasangan `hreflang` Indonesia dan Inggris;
- Open Graph image;
- sitemap yang memuat seluruh route `published`;
- `robots.txt` dan favicon yang sesuai.

Gunakan JSON-LD `TouristAttraction` untuk destinasi dan `Event` untuk agenda jika field faktualnya lengkap. Data JSON-LD harus berasal dari object yang sama dengan tampilan halaman agar tidak berbeda.

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: destination.title[locale],
  description: destination.summary[locale],
  image: destination.gallery.map((image) => absoluteUrl(image.src)),
  geo: {
    "@type": "GeoCoordinates",
    latitude: destination.geo.latitude,
    longitude: destination.geo.longitude,
  },
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
  }}
/>
```

Penggantian karakter `<` mencegah data konten menyisipkan tag script. Validasi hasil akhir dengan Schema Markup Validator dan Google Rich Results Test. JSON-LD menggunakan tag `<script>` native, bukan `next/script`.

## 10. Aksesibilitas dan UX dasar

- Gunakan elemen semantik: `header`, `nav`, `main`, `article`, `section`, dan `footer`.
- Setiap halaman hanya memiliki satu `h1`; heading berikutnya tidak boleh melompati level tanpa alasan.
- Seluruh fitur dapat digunakan dengan keyboard dan memiliki focus state yang terlihat.
- Filter kategori menggunakan button; perpindahan halaman menggunakan link.
- Menu mobile mengelola fokus dan dapat ditutup dengan Escape.
- Carousel tidak berjalan otomatis tanpa kontrol pause dan menghormati `prefers-reduced-motion`.
- Jangan menyampaikan kategori/status hanya melalui warna.
- Target sentuh minimal 44 × 44 CSS pixel.
- Teks utama tetap tersedia pada HTML hasil build dan tidak menunggu hydration.
- Embed peta diberi judul, lazy-loaded, dan selalu memiliki link alternatif “Buka di Google Maps”.

## 11. Alur penambahan destinasi

1. Dapatkan informasi dari pengelola destinasi, desa, atau sumber resmi.
2. Siapkan foto beserta izin, kredit, dimensi, dan alt text.
3. Buat object baru dengan `status: "draft"` dan ID permanen.
4. Isi seluruh bahasa. Jangan menerbitkan campuran bahasa sebagai hasil akhir.
5. Masukkan sumber dan tanggal pemeriksaan untuk informasi operasional.
6. Jalankan validasi konten, lint, test, dan build.
7. Periksa halaman Indonesia dan Inggris pada ukuran mobile dan desktop.
8. Periksa link peta, WhatsApp, booking, metadata, serta JSON-LD.
9. Minta review fakta kepada pemilik konten/pihak desa.
10. Ubah status menjadi `published` setelah review disetujui.

Contoh checklist pull request:

```md
- [ ] ID dan slug unik
- [ ] Teks Indonesia dan Inggris lengkap
- [ ] Harga/jam/kontak memiliki sumber dan tanggal verifikasi
- [ ] Koordinat serta link peta telah diuji
- [ ] Foto memiliki izin, kredit, dimensi, dan alt text
- [ ] Tampilan mobile, keyboard, dan reduced motion telah diuji
- [ ] Metadata dan JSON-LD telah diperiksa
- [ ] `npm run lint`, `npm run test`, dan `npm run build` lulus
```

## 12. Strategi pengujian

Prioritaskan test yang menjaga kontrak dan hasil statis:

- unit test repository: lookup slug, filter kategori, locale, related items;
- content test: schema, keunikan, relasi, aset, dan tanggal;
- component test: card, filter, language switcher, empty state;
- accessibility test otomatis untuk halaman utama dan detail;
- smoke test terhadap file `out/`: route penting ada dan asset link tidak putus;
- pemeriksaan manual untuk konten budaya, terjemahan, dan foto.

Snapshot HTML besar bukan pengganti test perilaku. Hindari test yang terlalu terikat pada class Tailwind.

## 13. Definition of Done

Sebuah perubahan dianggap selesai apabila:

- sesuai model domain dan tidak menaruh data bisnis di komponen;
- dapat diekspor dengan `next build` tanpa server runtime;
- tidak menambah route dinamis yang tidak diprerender;
- seluruh konten baru memiliki sumber dan status yang jelas;
- lint, validasi, test, dan build lulus;
- route, metadata, gambar, keyboard, dan tampilan responsif telah diperiksa;
- dokumentasi diperbarui bila kontrak data atau keputusan arsitektur berubah.

## 14. Tahapan implementasi yang disarankan

1. Aktifkan static export dan siapkan route locale.
2. Buat tipe domain, schema validator, serta repository.
3. Migrasikan enam destinasi dan lima agenda sebagai `draft`.
4. Verifikasi fakta dan aset bersama pihak desa, lalu terbitkan item yang siap.
5. Bangun listing, filter, detail, agenda, dan tentang dengan Server Components.
6. Tambahkan komponen client kecil untuk menu, filter interaktif, dan preferensi tema bila dibutuhkan.
7. Tambahkan metadata, sitemap, JSON-LD, test, serta pemeriksaan hasil `out/`.

Arsitektur ini sengaja memisahkan fakta, terjemahan, presentasi, dan mekanisme routing. Hasilnya tetap sederhana untuk situs statis, tetapi cukup disiplin untuk bertambah menjadi puluhan destinasi tanpa kembali menjadi satu file besar yang sulit dirawat.
