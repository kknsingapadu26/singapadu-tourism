This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Guide

Panduan arsitektur, model data, static export, dan alur kontribusi tersedia di [docs/PANDUAN_ARSITEKTUR_DAN_DATA.md](docs/PANDUAN_ARSITEKTUR_DAN_DATA.md).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Image optimization

Put original files into the source directory for the appropriate profile:

| Profile | Source | Generated output | Variants |
| --- | --- | --- | --- |
| Logo | `public/logos-unoptimized` | `public/logos` | Lossless WebP, maximum 512 px |
| Hero | `public/heroes-unoptimized` | `public/heroes` | AVIF and WebP at 768–2560 px |
| Gallery | `public/gallery-unoptimized` | `public/gallery` | AVIF and WebP at 480–1600 px |

Optimize only the profile currently being edited:

```bash
npm run images:logos
npm run images:heroes
npm run images:gallery
```

Optimize everything by omitting the profile:

```bash
npm run images:optimize
```

You can also invoke the script directly when selecting more than one profile:

```bash
node scripts/optimize-images.mjs --profile heroes --profile gallery
```

`npm run dev` optimizes all profiles once and watches every source directory. `npm run build` automatically optimizes all profiles before building. Content hashes skip unchanged sources, stale variants are removed safely, and every output directory contains a `manifest.json` with dimensions and `srcset`-ready paths.

Use generated paths from the manifests in UI code. Do not reference files from an `*-unoptimized` directory on the website.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
