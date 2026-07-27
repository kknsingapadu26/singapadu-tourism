# Singapadu Tourism

Situs informasi wisata statis untuk Desa Singapadu, Gianyar, Bali. Implementasi menggunakan Next.js 16 App Router, React 19, dan TypeScript, dengan konten dwibahasa, dark mode, desain responsif, serta static export yang dapat dipasang di hosting file statis tanpa database atau application server.

Panduan arsitektur, aturan model data, dan alur kontribusi yang lebih lengkap tersedia di [docs/PANDUAN_ARSITEKTUR_DAN_DATA.md](docs/PANDUAN_ARSITEKTUR_DAN_DATA.md).

## Menjalankan project

Gunakan Node.js 20 atau lebih baru, lalu jalankan:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Optimasi gambar sengaja tidak dijalankan oleh `dev` maupun `build`.

Perintah utama:

```bash
npm run dev        # development server
npm run lint       # ESLint
npm run typecheck  # pemeriksaan TypeScript tanpa output
npm run build      # static export ke folder out/
npm run check      # lint + typecheck + build
```

Karena `next.config.ts` menggunakan `output: "export"`, hasil produksi berada di `out/` dan harus dilayani sebagai berkas statis. Untuk preview lokal, salah satu pilihan adalah `npx serve out`.

## Route dan bahasa

- `/` dan `/id/` — beranda bahasa Indonesia;
- `/en/` — beranda bahasa Inggris;
- `/{locale}/destinasi/` — katalog dengan filter kategori;
- `/{locale}/destinasi/{slug}/` — detail destinasi;
- `/{locale}/agenda/` — agenda desa;
- `/{locale}/tentang/` — profil desa.

Slug destinasi diterjemahkan per bahasa. Tombol bahasa mempertahankan entitas yang sedang dibaca, misalnya `/id/destinasi/tari-barong-pura-puseh/` berpindah ke `/en/destinasi/barong-dance-pura-puseh/`.

## Mengelola konten

Source of truth berada di `src/content/`, sedangkan bentuk datanya didefinisikan di `src/domain/tourism.ts`. UI membaca konten melalui `src/repositories/tourism-repository.ts`; repository tersebut juga memvalidasi ID, slug, relasi kategori, konten terjemahan, dan data penting lain ketika module dimuat saat build.

Alur penambahan destinasi:

1. Tambahkan slug Indonesia dan Inggris di `src/content/destination-slugs.ts`.
2. Tambahkan entri lengkap di `src/content/destinations.ts`.
3. Isi kedua locale, kategori, lokasi, jam, harga, sumber, serta alt text.
4. Tambahkan aset gambar teroptimasi dan isi `src` pada `ImageAsset` terkait.
5. Jalankan `npm run check` dan periksa kedua versi bahasa.

Selama foto asli belum tersedia, komponen menampilkan ilustrasi abstrak yang responsif. Titik penggantian aset ditandai komentar `CHANGE THE PHOTO HERE`, terutama di `src/components/ui/photo.tsx` dan helper gambar pada berkas konten.

Sebelum deployment publik, ganti URL contoh `https://singapadu-tourism.example` di `src/content/site.ts`. Nilai ini digunakan untuk canonical URL, sitemap, robots, dan structured data.

## Optimasi gambar multi-profile

Letakkan file asli di direktori sumber sesuai kebutuhannya:

| Profile | Sumber | Output | Varian |
| --- | --- | --- | --- |
| Logo | `public/logos-unoptimized` | `public/logos` | lossless WebP, maksimum 512 px |
| Hero | `public/heroes-unoptimized` | `public/heroes` | AVIF + WebP, 768–2560 px |
| Gallery | `public/gallery-unoptimized` | `public/gallery` | AVIF + WebP, 480–1600 px |

Jalankan hanya profile yang sedang dikerjakan:

```bash
npm run images:logos
npm run images:heroes
npm run images:gallery
```

Atau proses semua profile secara manual:

```bash
npm run images:optimize
```

Mode pemantauan juga bersifat opt-in dan dijalankan pada terminal terpisah:

```bash
npm run images:watch
```

Pipeline memakai content hash untuk melewati sumber yang tidak berubah. Menghapus file sumber tidak menghapus hasil optimasi atau entri manifest lama, dan pemrosesan ulang satu nama file tidak menyentuh output lain. Setiap folder output memiliki `manifest.json` berisi dimensi dan path yang siap dipakai untuk `srcset`.

Jangan referensikan folder `*-unoptimized` dari UI. Gunakan hasil di folder output atau path dari manifest.

## Struktur ringkas

```text
src/
├─ app/           route, metadata, sitemap, robots, static params
├─ components/    layout dan komponen UI berdasarkan fitur
├─ content/       data lokal dwibahasa
├─ domain/        tipe dan kontrak data
├─ lib/           helper i18n serta JSON-LD
└─ repositories/  query dan validasi konten
```

Prinsip dependensi: `app → components → repositories → content/domain`. Hindari menaruh data bisnis di komponen, dan gunakan Client Component hanya untuk interaksi yang membutuhkan state atau browser API.
